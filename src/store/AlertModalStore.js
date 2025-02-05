import {create} from "zustand";

const AlertModalStore = create((set) => ({
    isOpen: false,
    message: "",
    confirm() {
    },
    cancel() {
    },
    setAlertModalInfo: (info) => set((state) => (info))
}))

export default AlertModalStore