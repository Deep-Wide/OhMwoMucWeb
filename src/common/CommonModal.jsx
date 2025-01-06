import {Modal} from "flowbite-react";
import Button from "./Button.jsx";

export default function CommonModal({
                                        openModal,
                                        onClose,
                                        confirmMessage,
                                        onConfirm,
                                        onCancel,
                                        title
                                    }) {

    return (
        <Modal show={openModal} onClose={onClose}>
            <Modal.Header>{title}</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {confirmMessage}
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer className={"flex justify-around"}>
                <Button onBtnClick={() => {
                    onConfirm && onConfirm()
                    onClose()
                }} name={"넹"} width={"5rem"}/>
                <Button color="#9A9A9A" onBtnClick={
                    () => {
                        onCancel && onCancel()
                        onClose()
                    }} name={"아니용"} width={"5rem"}/>
            </Modal.Footer>
        </Modal>
    );
}
