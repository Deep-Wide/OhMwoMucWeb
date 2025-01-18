const Tag = ({name, isSelected , onClick}) => {

    const selectedTheme = "font-bold text-xl main-color"
    const nonSelectedTheme = "font-semibold text-xl secondary-color"

    return (
        <button className={isSelected? selectedTheme : nonSelectedTheme}
                onClick = {onClick}>#{name}</button>
    )
}

export default Tag