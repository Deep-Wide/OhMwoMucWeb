const InputBox = ({name, placeholder, type="text"}) => {
    return (
        <div>
            <div className={`font-semibold main-color text-lg`}>
                {name}
            </div>
            <div style={{
                marginTop: "6px",
                border: "solid 1.97px #EE5460",
                padding: "8.84px, 0px, 8.84px, 9.83px",
                paddingTop: "8.84px",
                paddingLeft: "9.83px",
                paddingRight: "9.83px",
                paddingBottom: "8.84px",
                borderRadius: "4.91px"
            }}>
                <input placeholder={placeholder} type={type} style={{width:'100%'}}/>
            </div>

        </div>
    )
}

export default InputBox;
