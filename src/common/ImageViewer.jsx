import {FILE_API_URL} from "../service/FileService.js";
import deleteCircle from "/src/assets/icon/close-circle.svg"

const ImageViewer = ({images, onClickDelBtn}) => {


    return (<div className={"flex grid grid-cols-3 gap-3"}>
        {images.map((image, index) => (<div key={image.fileId}
                                     className={"w-[100px] h-[100px] border-2 flex items-center justify-center relative"}>
            <img className={"absolute top-[-8px] right-[-8px] bg-white rounded-full"} src={deleteCircle} onClick={()=>{onClickDelBtn(index)}}/>
            <img src={`${FILE_API_URL}/images/${image?.uniqueFileName}`}
                 alt={image.fileName}
                 />
        </div>))}
    </div>)
}

export default ImageViewer;