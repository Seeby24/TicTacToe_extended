export default function Joker_card({onClick, disabled}) {

    return(
        <div className="Card">
            <h3> Spezialkarte: J!</h3>
            Das Feld wird für beide gewertet.
            Nur im 3x3 Feld
            <button onClick={onClick} disabled={disabled}>Ausführen</button>
        </div>
    )
}