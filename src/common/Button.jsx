import {useNavigate} from "react-router-dom";
import kakao from "/public/logo/kakaoC.svg";
import google from "/public/logo/googleG.svg";
import naver from "/public/logo/naverN.svg";
import email from "/public/logo/email.svg";
import Modal from "./Modal.jsx";
import {useState} from "react";

const Button = ({
                    name, path,
                    nameColor = "#EE5460",
                    color = "#EE5460",
                    border = false,
                    borderColor = "#EE5460",
                    logo,
                    width,
                    confirmMessage
                }) => {
    const navigate = useNavigate();

    const logos = {
        kakao: kakao,
        google: google,
        naver: naver,
        email: email
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const confirmAction = () => {
        setIsModalOpen(true);
    };

    const handleConfirm = () => {
        setIsModalOpen(false);
        !!path && navigate(path);
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
            onClick={() => {
                !!confirmMessage ? confirmAction() : navigate(path);
            }}
        >
            {logo && logos[logo] &&
                <img src={logos[logo]} alt={`${logo}-img`} className="mr-2" style={{height: "20px", width: "auto"}}/>}
            {name}
            {isModalOpen && (
                <Modal
                    confirmMessage={confirmMessage}
                    onConfirm={handleConfirm}
                />
            )}
        </button>
    );
};

export default Button;
