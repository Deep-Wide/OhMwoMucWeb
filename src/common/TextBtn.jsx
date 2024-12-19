export function TextBtn({name, color= "black", fontSize = "text-base"}) {
    return (
        <div className={`font-semibold cursor-pointer ${fontSize}`}
             style={{color: color}}>
            {name}
        </div>
    )
}