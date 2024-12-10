import {useNavigate} from "react-router-dom";
import kakao from "/public/logo/kakao.svg";
import google from "/public/logo/google.svg";
import naver from "/public/logo/naver.svg";
import email from "/public/logo/email.svg";

const Button = ({name, path,
                    nameColor = "#EE5460",
                    color = "#EE5460",
                    border = false,
                    borderColor = "#EE5460",
                    logo,
                    width}) => {
    const navigate = useNavigate();

    const logos = {
        kakao: kakao,
        google: google,
        naver: naver,
        email: email
    };

    return (
        <button
            type="button"
            className="text-white p-3 rounded-xl flex items-center justify-center"
            style={{
                background: color, boxSizing: "border-box",
                ...(border && {border: `1px solid ${borderColor}`, color: nameColor}),
                ...(width && {width: width})
            }}
            onClick={() => navigate(path)}
        >
            {logo && logos[logo] && <img src={logos[logo]} alt={`${logo}-img`} className="mr-2" style={{height: "20px", width: "auto"}} />}
            {name}
        </button>
    );
};

export default Button;
