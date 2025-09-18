import Gamemap from "./gamemap.jsx";
import {useEffect, useState} from "react";
import Block_card from "./Block_card.jsx";
import Delete_move from "./Delete_move.jsx";
import Change_value from "./Change_value.jsx";
import Joker_card from "./Joker_card.jsx";

    export default function Maintictactoe() {
        const size = 5;
        const allCards = ["Block", "Delete", "Change", "Joker"];

        // Spiel
        const [board, setBoard] = useState(Array(size * size).fill(null));
        const [turn, setTurn] = useState("X");
        const [gameOver, setGamover] = useState(false);
        const [text, setText] = useState("");
        const [history, setHistory] = useState([]);
        const [xWins, setXWins] = useState(0);
        const [yWins, setYWins] = useState(0);
        const [moveCount, setMoveCount] = useState(0);
        const [blockedFields, setBlockedFields] = useState([]);

        // Spezial Karten
        const [blockMode, setBlockmode] = useState(false);
        const [deleteMode, setDeleteMode] = useState(false);
        const [changeValueMode, setChangeValue] = useState(false);
        const [jokerMode, setJokerMode] = useState(false);


        // Cards
        const [xCards, setXCards] = useState([]);
        const [oCards, setOCards] = useState([]);

        const [xBlockUsed, setXBlockUsed] = useState(false);
        const [xDeleteUsed, setXDeleteUsed] = useState(false);
        const [xChangeUsed, setXChangeUsed] = useState(false);
        const [xJokerUsed, setXJokerUsed] = useState(false);

        const [oBlockUsed, setOBlockUsed] = useState(false);
        const [oDeleteUsed, setODeleteUsed] = useState(false);
        const [oChangeUsed, setOChangeUsed] = useState(false);
        const [oJokerUsed, setOJokerUsed] = useState(false);


// Mache Zug
        function Makemove(index) {
            if (gameOver) return;
            if (!blockMode && !deleteMode && !changeValueMode && !jokerMode && board[index]) return;
            if (board[index] === "🔒" || board[index] === "🃏") return;


            const newBoard = [...board];

            if (blockMode) {
                newBoard[index] = "🔒";
                setBlockedFields(prev => [
                    ...prev,
                    {index: index, unlockTurn: moveCount + 3}
                ]);
                setBlockmode(false);

                const nextTurn = turn === "X" ? "O" : "X";
                setTurn(nextTurn);
                setText(`Spieler ${nextTurn} ist dran`);

            } else if (deleteMode) {
                newBoard[index] = null;
                setDeleteMode(false);
                const nextTurn = turn === "X" ? "O" : "X";
                setTurn(nextTurn);
                setText(`Spieler ${nextTurn} ist dran`);

            } else if (changeValueMode) {
                if (newBoard[index] === "X") newBoard[index] = "O";
                else if (newBoard[index] === "O") newBoard[index] = "X";
                else newBoard[index] = null;
                setChangeValue(false);
                const nextTurn = turn === "X" ? "O" : "X";
                setTurn(nextTurn);
                setText(`Spieler ${nextTurn} ist dran`);

            } else if (jokerMode) {
                if (isEdgeCell(index)) return;
                newBoard[index] = "🃏";
                setJokerMode(false);
                const nextTurn = turn === "X" ? "O" : "X";
                setTurn(nextTurn);
                setText(`Spieler ${nextTurn} ist dran`);

            } else {
                newBoard[index] = turn;
                const nextTurn = turn === "X" ? "O" : "X";
                setTurn(nextTurn);
                setText(`Spieler ${nextTurn} ist dran`);
                setMoveCount(prev => prev + 1);
            }

            setBoard(newBoard)

        }

// 2 karten Ziehen
        function getRandomCards() {
            const first = allCards[Math.floor(Math.random() * allCards.length)];
            let second
            do {
                second = allCards[Math.floor(Math.random() * allCards.length)];
            } while (second === first);
            return [first, second];
        }

// Checke ob Karte genutzt
        function activateCard(player, card) {
            if (player === "X") {
                // Prüfen, ob Karte schon benutzt wurde
                if (card === "Block" && xBlockUsed) return;
                if (card === "Delete" && xDeleteUsed) return;
                if (card === "Change" && xChangeUsed) return;
                if (card === "Joker" && xJokerUsed) return;

                // Karte aktivieren + Modus setzen
                if (card === "Block") {
                    setBlockmode(true);
                    setXBlockUsed(true);
                }
                if (card === "Delete") {
                    setDeleteMode(true);
                    setXDeleteUsed(true);
                }
                if (card === "Change") {
                    setChangeValue(true);
                    setXChangeUsed(true);
                }
                if (card === "Joker") {
                    setJokerMode(true);
                    setXJokerUsed(true);
                }
            } else {

                if (card === "Block" && oBlockUsed) return;
                if (card === "Delete" && oDeleteUsed) return;
                if (card === "Change" && oChangeUsed) return;
                if (card === "Joker" && oJokerUsed) return;

                if (card === "Block") {
                    setBlockmode(true);
                    setOBlockUsed(true);
                }
                if (card === "Delete") {
                    setDeleteMode(true);
                    setODeleteUsed(true);
                }
                if (card === "Change") {
                    setChangeValue(true);
                    setOChangeUsed(true);
                }
                if (card === "Joker") {
                    setJokerMode(true);
                    setOJokerUsed(true);
                }
            }
        }

// Überprüfe ob index am Rand ist
        function isEdgeCell(index) {
            const row = Math.floor(index / size);
            const col = index % size;
            return (
                row === 0 ||
                row === size - 1 ||
                col === 0 ||
                col === size - 1
            );
        }

// Neustart
        function Reset() {
            setBoard(Array(size * size).fill(null))
            setTurn("X");
            setGamover(false);
            setText("");
            setBlockmode(false);

            setXCards(getRandomCards());
            setOCards(getRandomCards());


            setXBlockUsed(false);
            setXDeleteUsed(false);
            setXChangeUsed(false);
            setXJokerUsed(false);
            setOBlockUsed(false);
            setODeleteUsed(false);
            setOChangeUsed(false);
            setOJokerUsed(false);


            setBlockmode(false);
            setDeleteMode(false);
            setChangeValue(false);
            setJokerMode(false);
        }

// Gewinnenfunktion
        function CheckWinner(allLines, Board) {
            for (let line of allLines) {
                const [a, b, c, d] = line; //Destructuring Assignment
                if (
                    Board[a] !== null &&
                    Board[a] !== "🔒" &&
                    (Board[a] === Board[b] || Board[b] === "🃏") &&
                    (Board[a] === Board[c] || Board[c] === "🃏") &&
                    (Board[a] === Board[d] || Board[d] === "🃏")
                ) {
                    return Board[a];
                }
            }
            return null;
        }

// Alle Linien hinzufügen
        function Getlines() {
            const winLength = 4;
            const horizontalLines = [];
            const verticalLines = [];
            const diagonal1Lines = [];
            const diagonal2Lines = [];
// Reihen
            for (let row = 0; row < size; row++) {
                for (let col = 0; col <= size - winLength; col++) {
                    const line = [];
                    for (let i = 0; i < winLength; i++) {
                        line.push(row * size + (col + i));
                    }
                    horizontalLines.push(line);
                }
            }
// Spalten
            for (let col = 0; col < size; col++) {
                for (let row = 0; row <= size - winLength; row++) {
                    const line = [];
                    for (let i = 0; i < winLength; i++) {
                        line.push((row + i) * size + col);
                    }
                    verticalLines.push(line);
                }
            }
// Diagonale
            for (let row = 0; row <= size - winLength; row++) {
                for (let col = 0; col <= size - winLength; col++) {
                    const line = [];
                    for (let i = 0; i < winLength; i++) {
                        line.push((row + i) * size + (col + i));
                    }
                    diagonal1Lines.push(line);
                }
            }

// Diagonale
            for (let row = 0; row <= size - winLength; row++) {
                for (let col = winLength - 1; col < size; col++) {
                    const line = [];
                    for (let i = 0; i < winLength; i++) {
                        line.push((row + i) * size + (col - i));
                    }
                    diagonal2Lines.push(line);
                }
            }


            const allLines = [
                ...horizontalLines,
                ...verticalLines,
                ...diagonal1Lines,
                ...diagonal2Lines];
            return allLines

            // console.log(allLines)
        }

// Checke auf Sieg
        useEffect(() => {
            const winner = CheckWinner(Getlines(), board);
            if (winner) {
                setGamover(true);
                setText(`Spieler ${winner} hat gewonnen`);
                if (history.length > 7) {
                    setHistory([])
                }
                history.push(winner);
                if (winner === "X") {
                    setXWins(xWins + 1)
                } else {
                    setYWins(yWins + 1)
                }
            }

        }, [board]);

// Entferne Schlösser
        useEffect(() => {
            if (blockedFields.length === 0) return;

            const toUnlock = blockedFields.filter(f => f.unlockTurn <= moveCount);

            if (toUnlock.length > 0) {
                const newBoard = [...board];

                toUnlock.forEach(f => {
                    newBoard[f.index] = null;
                });

                setBoard(newBoard);

                setBlockedFields(prev => prev.filter(f => f.unlockTurn > moveCount));
            }
        }, [moveCount]);
// Rendere 2 Karten
        useEffect(() => {
            setXCards(getRandomCards());
            setOCards(getRandomCards());
        }, []);


        return (
            <>
                <h1>TicTacToe</h1>
                <div className="Container">

                    <div className="Box">
                        <h2>Verlauf</h2>
                        <div>Spieler 1: {xWins}</div>
                        <div>Spieler 2: {yWins}</div>
                        <div>
                            {history.length === 0 ? "Noch kein Spiel beendet" : (
                                <ul>
                                    {history.map((winner, index) => (
                                        <li key={index}>
                                            Spiel {index + 1}: {winner}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div>
                            <button className="reset-button" onClick={Reset}>Reset</button>
                        </div>
                        <div>{text}</div>
                    </div>

                    <div className="board">
                        {board.map((cell, index) => (
                            <Gamemap
                                key={index}
                                value={cell}
                                onClick={() => Makemove(index)}
                            />
                        ))}
                    </div>

                    <div className="RightSide">
                        <div className="CardSlot">
                            <h3>Karten X</h3>
                            {xCards.map((card, i) => (
                                <div key={i}>
                                    {card === "Block" && (
                                        <Block_card
                                            onClick={() => activateCard("X", "Block")}
                                            disabled={xBlockUsed}
                                        />
                                    )}
                                    {card === "Joker" && (
                                        <Joker_card
                                            onClick={() => activateCard("X", "Joker")}
                                            disabled={xJokerUsed}
                                        />
                                    )}
                                    {card === "Delete" && (
                                        <Delete_move
                                            onClick={() => activateCard("X", "Delete")}
                                            disabled={xDeleteUsed}
                                        />
                                    )}
                                    {card === "Change" && (
                                        <Change_value
                                            onClick={() => activateCard("X", "Change")}
                                            disabled={xChangeUsed}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="CardSlot">
                            <h3>Karten O</h3>
                            {oCards.map((card, i) => (
                                <div key={i}>
                                    {card === "Block" && (
                                        <Block_card
                                            onClick={() => activateCard("O", "Block")}
                                            disabled={oBlockUsed}
                                        />
                                    )}
                                    {card === "Joker" && (
                                        <Joker_card
                                            onClick={() => activateCard("O", "Joker")}
                                            disabled={oJokerUsed}
                                        />
                                    )}
                                    {card === "Delete" && (
                                        <Delete_move
                                            onClick={() => activateCard("O", "Delete")}
                                            disabled={oDeleteUsed}
                                        />
                                    )}
                                    {card === "Change" && (
                                        <Change_value
                                            onClick={() => activateCard("O", "Change")}
                                            disabled={oChangeUsed}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </>
        );

    }

