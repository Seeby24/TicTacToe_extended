export default function Joker_card({setJokerMode}) {

    return(
        <div className="Card">
            <h3> Spezialkarte: J!</h3>
            Das Feld wird für beide gewertet.
            <button onClick={() => setJokerMode(true)}>Ausführen</button>
        </div>
    )
}