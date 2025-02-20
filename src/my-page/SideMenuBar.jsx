import AngleRight from '/src/assets/icon/angle-right.svg?react';

const SideMenuBar = ({menus, targetMenuIndex, onClickMenu}) => {

    return (
        <div className={"border gap-y-4 flex flex-col items-center h-fit p-10"} style={{
            borderWidth: "1.37px",
            borderStyle: "solid",
            borderColor: "#E4E4E4",
            borderRadius: "13.69px"
        }}>
            {menus && menus.map((menu, index) => (
                <div key={index} className={"flex cursor-pointer justify-between w-[300px]"} onClick={() => {
                    onClickMenu(index)
                }}>
                    <span className={`text-lg ${targetMenuIndex === index? "main-color font-semibold" : "text-color font-medium" }`}>
                        {menu.name}
                    </span>
                    <AngleRight style={{color: `${targetMenuIndex === index? "#EE5460" : "#676767" }`}}/>
                </div>
            ))}
        </div>
    )
}

export default SideMenuBar