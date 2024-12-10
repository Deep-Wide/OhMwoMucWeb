const Badge = ( { name } ) => {
    return (
        <div
            className={"cursor-pointer"}
            style={{
            width: "fit-content",
            paddingTop: "5.29px",
            paddingBottom: "5.29px",
            paddingLeft: "6.61px",
            paddingRight: "6.61px",
            borderStyle: "solid",
            borderColor: "#D9D9D9",
            borderWidth: "0.66px",
            borderRadius: "20px"
        }}>
            <span className={"secondary-color"}>
                #{ name }
            </span>
        </div>
    )
}

export default Badge