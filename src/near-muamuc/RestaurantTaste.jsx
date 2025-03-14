import React, {useEffect, useState} from "react";
import TasteGood from "/src/assets/emoji/tasteGood.svg?react";
import TasteBad from "/src/assets/emoji/404_icon.svg?react";
import {useNavigate} from "react-router-dom";
import UserStore from "../store/UserStore.js";

const RestaurantTaste = ({title,  onChangeTaste, selectedTastedCode}) => {
    const [selectedTaste, setSelectedTaste] = useState(null)
    const navigate = useNavigate()

    const {loginUser} = UserStore()


    const setTaste = (tasteCode) => {
        if (!loginUser?.id) {
            navigate("/login")
            return
        }

        onChangeTaste(tasteCode)
        setSelectedTaste((prev) => (prev === tasteCode ? null : tasteCode))
    }

    useEffect(() => {
        setSelectedTaste(selectedTastedCode)
    }, [selectedTastedCode])

    return (
        <div className="mb-2">
            <div className="font-semibold text-xm mb-1.5">{title}</div>
            <div className="flex justify-around">
                <div
                    onClick={() => setTaste(1)}
                    className={`flex gap-x-2 items-center p-2 gap-x-[15px] border rounded-xl cursor-pointer border-[2px] ${
                        selectedTaste === 1
                            ? "border-[#EE5460]"
                            : "border-transparent hover:border-gray-500"
                    }`}
                >
                    <TasteGood className={"w-[66px] h-[58px]"}/>
                    <div className={"text-sm"}>짱 맛..!</div>
                </div>
                <div
                    onClick={() => setTaste(2)}
                    className={`flex gap-x-2 items-center p-2 gap-x-[15px] border rounded-xl cursor-pointer border-[2px] ${
                        selectedTaste === 2
                            ? "border-[#7494FF]"
                            : "border-transparent"
                    } hover:border-gray-400`}
                >
                    <TasteBad className={"w-[66px] h-[58px]"}/>
                    <div className={"text-sm"}>노 맛..ㅠ</div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantTaste;