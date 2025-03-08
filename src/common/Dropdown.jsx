import { useEffect, useRef, useState } from "react";
import DropdownIcon from "/src/assets/icon/angle-down.svg?react";

const Dropdown = ({ defaultValue, onClickItem, categoryList, width = "170px", height }) => {

    const [value, setValue] = useState(defaultValue)
    const [onClickDropdown, setOnClickDropdown] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOnClickDropdown(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className="relative inline-block w-full" ref={dropdownRef}>
            <div
                className="flex gap-x-2 cursor-pointer border rounded-2xl p-3 justify-center w-full"
                style={{ width }} // 버튼 크기 조절 가
                onClick={() => setOnClickDropdown((prev) => !prev)}
            >
                <div className="font-semibold text-color">{value}</div>
                <DropdownIcon className={`transition-transform duration-300 ${onClickDropdown ? "rotate-180" : ""}`} />
            </div>

            {onClickDropdown && (
                <div
                    id="dropdownHover"
                    className="absolute left-0 top-full mt-1 w-full bg-white border rounded-lg shadow-lg z-10"
                    style={{ width }}
                >
                    <ul className="py-2 text-sm text-gray-700">
                        {categoryList.map((category, index) => (
                            <li key={index}>
                                <span
                                    onClick={() => {
                                        setValue(category.name)
                                        onClickItem(category)
                                        setOnClickDropdown(false)
                                    }}
                                    className="block px-4 py-2 cursor-pointer transition duration-200 hover:bg-gray-100"
                                >
                                    {category.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;