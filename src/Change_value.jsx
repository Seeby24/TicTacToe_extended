export default function Change_value({onClick, disabled}) {

    return(
        <div className="Card">
            <h3> Spezialkarte: Feld ändern!</h3>
            Du kannst den Wert eines belegten Feld ändern
            <button onClick={onClick} disabled={disabled}>Ausführen</button>
        </div>
    )
}