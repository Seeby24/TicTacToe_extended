    export default function Block_card({onClick, disabled}){

        return(
            <div className="Card">
                <h3> Spezialkarte: Sperren!</h3>
                Du kannst ein Feld 3 Runden lang für den Gegner Sperren.
                <button onClick={onClick} disabled={disabled}>Ausführen</button>
            </div>
        )
    }