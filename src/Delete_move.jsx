export default function Delete_move({setDeleteMode}) {

    return(
        <div className="Card">
            <h3> Spezialkarte: Löschen!</h3>
            Du kannst ein Feld wieder leer machen!
            <button onClick={() => setDeleteMode(true)}>Ausführen</button>
        </div>
    )
}