import {Modal} from "flowbite-react";
import {HiOutlineExclamationCircle} from "react-icons/hi";
import Button from "./Button.jsx";
import AlertModalStore from "../store/AlertModalStore.js";

const AlertModal = ({openModal, message, onConfirm, onCancel}) => {

    const {setAlertModalInfo} = AlertModalStore()
    const closeModal = () => {
        setAlertModalInfo({isOpen: false, message: "", confirm: null})
    }

    return (
        <Modal show={openModal} size="md" onClose={closeModal} popup>
            <Modal.Header/>
            <Modal.Body>
                <div className="text-center" style={{wordBreak: 'keep-all'}}>
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"/>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        {message}
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button width={"65.48px"} onBtnClick={() => {
                            onConfirm && onConfirm()
                            closeModal()
                        }} name={"넹"}/>
                        <Button color="gray" onBtnClick={() => {
                            onCancel && onCancel()
                            closeModal()
                        }} name={"아니요"}/>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AlertModal;