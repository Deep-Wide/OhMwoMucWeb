import {forwardRef} from "react";

const InputBox = forwardRef(({name, placeholder, type="text", id, onKeyPress, value, onChange}, ref) => {
    return (
        <div>
            <div className={`font-semibold main-color text-lg select-none`}>
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
                <input placeholder={placeholder} type={type} style={{width:'100%'}} autoComplete={"off"} onKeyDown={onKeyPress} value={value} ref={ref} onChange={onChange}/>
            </div>

        </div>
    )
})

export default InputBox;
