export default function Cards({setBlockmode}){

    return(
        <div className="Card">
            <h3> Spezialkarte: Sperren!</h3>
            Du kannst ein Feld 3 Runden lang für den Gegner Sperren.
            <button onClick={() => setBlockmode(true)}>Ausführen</button>
        </div>
    )
}