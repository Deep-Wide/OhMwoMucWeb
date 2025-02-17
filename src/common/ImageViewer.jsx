import {FILE_API_URL} from "../service/FileService.js";

const ImageViewer = ({images}) => {

    return (
        <div className={"flex grid grid-cols-3 gap-3"}>
            {
                images.map((image) => (
                    <div key={image.fileId}
                          className={"w-[100px] h-[100px] border-2 flex items-center justify-center"}>
                        <img src={`${FILE_API_URL}/images/${image?.uniqueFileName}`} alt={image.fileName}/>
                    </div>))
            }
        </div>
    )
}

export default ImageViewer;