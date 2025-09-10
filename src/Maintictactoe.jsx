import Gamemap from "./gamemap.jsx";
import {useEffect, useState} from "react";
import Block_card from "./Block_card.jsx";
import Delete_move from "./Delete_move.jsx";
import Change_value from "./Change_value.jsx";

export default function Maintictactoe() {
    const size = 5;
    const [board, setBoard] = useState(Array(size * size).fill(null));
    const [turn, setTurn] = useState("X");
    const [gameOver, setGamover] = useState(false);
    const [text, setText] = useState("");
    const [history,setHistory] = useState([]);
    const [xwins,setXWins] = useState(0);
    const [ywins,setYWins] = useState(0);
    const [blockmode,setBlockmode] = useState(false);
    const [deletemode,setDeleteMode] = useState(false);
    const [ChangeValue,setChangeValue] = useState(false);
    const [blockedFields,setBlockedFields] = useState([])
    const [moveCount, setMoveCount]  = useState(0)

// Mache Zug
    function Makemove(index) {
        if (gameOver === false) {
            if (!deletemode && !ChangeValue && board[index] || board[index] === "🔒") return;
            const newBoard = [...board];
            if(blockmode){
                newBoard[index] = "🔒";
                setBlockedFields(prev => [
                    ...prev,
                    { index: index, unlockTurn: moveCount + 3 }
                ]);
                setBlockmode(false);
                const nextTurn = turn === "X" ? "O" : "X";
                setTurn(nextTurn);
                setText(`Spieler ${nextTurn} ist dran`);
            }
            else if (deletemode){
                newBoard[index] = null
                setDeleteMode(false)
                const nextTurn = turn === "X" ? "O" : "X";
                setTurn(nextTurn);
                setText(`Spieler ${nextTurn} ist dran`);
            }
            else if (ChangeValue){
                if(newBoard[index] === "X" ){
                    newBoard[index] = "O";
                }
                else if(newBoard[index] === "O"){
                    newBoard[index] = "X";
                }
                else {
                    newBoard[index] = null;
                }
                setChangeValue(false);
                const nextTurn = turn === "X" ? "O" : "X";
                setTurn(nextTurn);
                setText(`Spieler ${nextTurn} ist dran`);
            }
            else {
                newBoard[index] = turn;

                const nextTurn = turn === "X" ? "O" : "X";
                setTurn(nextTurn);
                setText(`Spieler ${nextTurn} ist dran`);
                setMoveCount(prev => prev + 1);
            }

            setBoard(newBoard)
        }
    }



// Neustart
    function Reset() {
        setBoard(Array(size * size).fill(null))
        setTurn("X");
        setGamover(false);
        setText("");
        setBlockmode(false);
    }

// Gewinnenfunktion
    function CheckWinner(allLines, Board) {
        for (let line of allLines) {
            const [a, b, c, d] = line; //Destructuring Assignment
            if (
                Board[a] !== null &&
                Board[a] !== "🔒" &&
                Board[a] === Board[b] &&
                Board[b] === Board[c] &&
                Board[c] === Board[d]
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
            if(history.length > 7) {
                setHistory([])
            }
            history.push(winner);
            if(winner==="X"){
                setXWins(xwins+1)
            }
            else{
                setYWins(ywins+1)
            }
            }

    }, [board]);

// Entferne Schlösser
    useEffect(() => {
        if(blockedFields.length === 0) return;

        const toUnlock = blockedFields.filter(f => f.unlockTurn <= moveCount);

        if(toUnlock.length > 0){
            const newBoard = [...board];

            toUnlock.forEach(f => {
                newBoard[f.index] = null;
            });

            setBoard(newBoard);

            setBlockedFields(prev => prev.filter(f => f.unlockTurn > moveCount));
        }
    }, [moveCount]);


    return (
        <>
            <h1>TicTacToe</h1>
            <div className="Container">

                <div className="Box">
                    <h2>Verlauf</h2>
                    <div>Spieler 1: {xwins}</div>
                    <div>Spieler 2: {ywins}</div>
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
                        <div>
                            <Block_card setBlockmode={setBlockmode}/>
                        </div>
                    </div>
                    <div className="CardSlot">
                        <h3>Karten O</h3>
                        <div>
                           <Delete_move setDeleteMode={setDeleteMode}/>
                        </div>
                        <div>
                            <Change_value setChangeValue={setChangeValue}/>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );
}
