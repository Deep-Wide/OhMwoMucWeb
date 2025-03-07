import {forwardRef} from "react";

const LineInput = forwardRef((
    {
        onClick,
        placeholder,
        textSize = "text-base",
        type = "text",
        onChange,
        id,
        color = "main-color",
        value,
        width="100%",
        disabled=false,
    }, ref) => {

    return (
        <div className={`${textSize}  font-semibold flex justify-center`} onClick={onClick}
             style={{
                 borderBottom: "1.5px solid #D9D9D9",
                 paddingTop: "7px",
                 paddingBottom: "7px",
                 width: width
             }}>
            <input id={id} ref={ref} className={`${textSize} ${color}`} type={type} placeholder={placeholder}
                   style={{width: "100%"}} onChange={onChange} autoComplete="nope" value={value} disabled={disabled} />
        </div>
    )
})

export default LineInput;