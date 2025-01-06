import {Modal} from "flowbite-react";
import {HiOutlineExclamationCircle} from "react-icons/hi";
import Button from "./Button.jsx";

const AlertModal = ({openModal, onClose, message, onConfirm, onCancel}) => {
    return (
        <Modal show={openModal} size="md" onClose={onClose} popup>
            <Modal.Header/>
            <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"/>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        {message}
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button width={"65.48px"} onBtnClick={() => {
                            onConfirm && onConfirm()
                            onClose()
                        }} name={"넹"}/>
                        <Button color="gray" onBtnClick={() => {
                            onCancel && onCancel()
                            onClose()
                        }} name={"아니요"}/>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AlertModal;