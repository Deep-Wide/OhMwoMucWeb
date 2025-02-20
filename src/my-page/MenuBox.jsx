import {useEffect, useState} from "react";

const Title = function ({ children }) {
    return (
        <div className={"text-lg font-semibold text-color"}>{children}</div>
    )
}

const Body = function ({children}) {
    return (
        <div>
            {children}
        </div>
    )
}

const MenuBox = ({children}) => {

    const [arrayChildren, setArrayChildren] = useState([])

    useEffect(() => {
        if (Array.isArray(children)) {
            setArrayChildren(children);
        } else {
            setArrayChildren([children])
        }

    }, [ children ]);

    return (
        <div className={"border gap-y-4 flex flex-col w-[521px]"} style={{
            borderWidth: "1.37px",
            borderStyle: "solid",
            borderColor: "#E4E4E4",
            borderRadius: "13.69px",
            padding: "30px"
        }}>
            {arrayChildren.find(c => c.type.name === 'Title')}
            {arrayChildren.find(c => c.type.name === 'Body')}
        </div>
    )
}

export default Object.assign(MenuBox, {Title, Body})