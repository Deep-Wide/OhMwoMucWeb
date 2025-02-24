import dotsVertical from "/src/assets/icon/dots-vertical.svg";
import { useState } from "react";

const DropdownHover = ({ menus, commentId }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative inline-block">
            {/* 아이콘 */}
            <img
                src={dotsVertical}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="cursor-pointer"
            />

            {/* 드롭다운 메뉴 */}
            {isHovered && (
                <div
                    id="dropdownHover"
                    className="absolute top-[-100%] left-0 -translate-x- z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-24 dark:bg-gray-700"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        {menus.map((menu, index) => (
                            <li key={index}>
                                <span
                                    onClick={()=>menu.onClick(commentId)}
                                    className="select-none block px-4 py-2 transition duration-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    {menu.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownHover;
