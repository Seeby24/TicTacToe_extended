export default function Gamemap({ value, onClick }) {
    return (
        <button onClick={onClick}>
            {value}
        </button>
    );
}
