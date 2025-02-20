import {useState} from "react";

const ImageToggle = ({
                         size,
                         imagePath = "/src/assets/icon/default-profile.svg",
                         alt,
                         onClickImage,
                         hoverMessage,
                     }) => {
    const [eclipseImage, setEclipseImage] = useState(false);

    return (
        <div
            className="cursor-pointer flex relative"
            style={{width: `${size}px`, height: `${size}px`}} // 인라인 스타일로 크기 설정
            onClick={onClickImage}
            onMouseEnter={() => setEclipseImage(true)}
            onMouseLeave={() => setEclipseImage(false)}
        >
            {eclipseImage && (
                <div className={"absolute flex items-center justify-center"} style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    zIndex: 1,
                }}>
                    <div className={"absolute text-sm text-white"} style={{
                        zIndex: 3
                    }}>
                        {hoverMessage}
                    </div>
                    <div
                        className="absolute top-0 left-0 bg-black opacity-40 rounded-full"
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            zIndex: 2,
                        }}
                    >
                    </div>
                </div>
            )}
            <img
                className="cursor-pointer rounded-full object-cover"
                src={imagePath}
                alt={alt}
                style={{width: `${size}px`, height: `${size}px`, zIndex: 0}}
            />
        </div>
    );
};

export default ImageToggle;
