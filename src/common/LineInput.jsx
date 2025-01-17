const LineInput = ({placeholder, textSize = "text-base", type = "text", onChange, id}) => {

    return (
        <div className={`${textSize} font-semibold flex justify-center`}
             style={{
                 borderBottom: "1.5px solid #D9D9D9",
                 paddingTop: "7px",
                 paddingBottom: "7px",
                 width: "100%"
             }}>
            <input id={id} className={`${textSize} main-color`} type={type} placeholder={placeholder}
                   style={{width: "100%"}} onChange={onChange} autoComplete="off"/>
        </div>
    )
}

export default LineInput;