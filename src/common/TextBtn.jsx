export function TextBtn({name, color = "black", fontSize = "text-base", onClick}) {

    const onButtonClick = () => {
        onClick && onClick();
    }

    return (
        <div className={`font-semibold cursor-pointer ${fontSize}`}
             style={{color: color}}
             onClick={onButtonClick}>
            {name}
        </div>
    )
}