export default function Change_value({setChangeValue}) {

    return(
        <div className="Card">
            <h3> Spezialkarte: Feld ändern!</h3>
            Du kannst den Wert eines belegten Feld ändern
            <button onClick={() => setChangeValue(true)}>Ausführen</button>
        </div>
    )
}