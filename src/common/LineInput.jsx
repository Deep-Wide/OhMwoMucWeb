const LineInput = ({ref, placeholder, textSize = "text-base", type = "text", onChange, id, value}) => {

    return (
        <div className={`${textSize} font-semibold flex justify-center`}
             style={{
                 borderBottom: "1.5px solid #D9D9D9",
                 paddingTop: "7px",
                 paddingBottom: "7px",
                 width: "100%"
             }}>
            <input id={id} ref = {ref} className={`${textSize} main-color`} type={type} placeholder={placeholder}
                   style={{width: "100%"}} onChange={onChange} autoComplete="off" value={value}/>
        </div>
    )
}

export default LineInput;