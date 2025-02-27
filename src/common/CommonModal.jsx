import {Modal} from "flowbite-react";
import Button from "./Button.jsx";

export default function CommonModal({
                                        openModal,
                                        onClose,
                                        modalBody,
                                        onConfirm,
                                        onCancel,
                                        title,
                                        confirmBtnName,
                                        cancelBtnName,
                                    }) {

    return (
        <Modal show={openModal} onClose={onClose}>
            <Modal.Header>{title}</Modal.Header>
            <Modal.Body>
                <div className="space-y-6 flex justify-center">
                    {modalBody && modalBody()}
                </div>
            </Modal.Body>
            <Modal.Footer className={"flex justify-around"}>
                {confirmBtnName && <Button onBtnClick={() => {
                    onConfirm && onConfirm()
                    onClose()
                }} name={confirmBtnName} width={"5rem"}/>}
                {cancelBtnName && <Button color="#9A9A9A" onBtnClick={
                    () => {
                        onCancel && onCancel()
                        onClose()
                    }} name={cancelBtnName} width={"5rem"}/>}
            </Modal.Footer>
        </Modal>
    );
}
