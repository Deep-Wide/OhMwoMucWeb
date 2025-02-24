import IconWrapper from "./IconWrapper.jsx";
import React, {useEffect, useState} from "react";

const Title = function ({ children }) {
    return (
        <span className="font-semibold text-lg">{children}</span>
    )
}

const Body = function ({ children }) {
    return (
        <div className="px-4 py-2 bg-white overflow-visible">
            {Array.isArray(children) && children.map(c => (c))}
            {!Array.isArray(children) && children}
        </div>
    )
}

const Count = function ({ children }) {
    return (
        <span className="font-semibold text-lg main-color">{children}</span>
    )
}

const TitleRightArea = function ({ children }) {
   return (
       children
   )
}

const Accordion = ({children}) => {
    const [isActive, setIsActive] = useState(false)
    const [ arrayChildren, setArrayChildren ] = useState([]);

    const toggleAccordion = () => {
        setIsActive(!isActive)
    };

    useEffect(() => {
        if (Array.isArray(children)) {
            setArrayChildren(children);
        } else {
            setArrayChildren([children])
        }

    }, [ children ]);

    return (
        <div className="w-full max-w-md mx-auto space-y-4">
            <div className=" rounded-lg overflow-visible">
                <div
                    className="w-full text-left px-4 py-2 flex justify-between items-center">
                    <div className={"flex justify-between items-center gap-x-3"}>
                        <svg
                            className={`w-5 h-5 transform transition-transform duration-300 cursor-pointer ${
                                isActive ? "" : "rotate-180"
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={toggleAccordion}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                        {arrayChildren.find(c => c.type.name === 'Title')}
                        {arrayChildren.find(c => c.type.name === 'Count')}
                    </div>
                    {arrayChildren.find(c => c.type.name === 'TitleRightArea')}
                </div>
                {isActive && arrayChildren.find(c => c.type.name === 'Body')}
            </div>
        </div>
    )
}

export default Object.assign(Accordion, {Title: Title, Body: Body, Count, TitleRightArea});