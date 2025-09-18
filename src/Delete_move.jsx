export default function Delete_move({onClick, disabled}) {

    return(
        <div className="Card">
            <h3> Spezialkarte: Löschen!</h3>
            Du kannst ein Feld wieder leer machen!
            <button onClick={onClick} disabled={disabled}>Ausführen</button>
        </div>
    )
}