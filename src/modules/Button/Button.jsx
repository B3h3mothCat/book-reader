

export default function Button({ children, onClick, disabled }) {


    return (
        <button
            className={`button ${disabled ? 'button--disabled' : ''}`}
            onClick={onClick}
            disabled={disabled}
        >{children}</button>
    )
}