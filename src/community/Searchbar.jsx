import SearchIcon from '/src/assets/emoji/search-icon.svg';

export function Searchbar() {

    const onClickSearchbar = () => {

    }

    const onPressEnterKey = (event) => {
        if (event.key === "Enter") {
            onClickSearchbar()
        }
    }

    return (
        <form className="max-w-md mx-auto mt-6">
            <div className="items-center flex gap-3">
                <img src={SearchIcon} width={45} alt={"search-icon"} />

                <input type="search" id="default-search"
                       className="rounded-full block w-full p-4 ps-5 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-red-600 focus:bolder-red-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-600 dark:focus:bolder-red-600"
                       placeholder="다른 사람들은 뭐 먹었지?" required
                        autoComplete={"off"}
                        onKeyPress={onPressEnterKey}/>
                <button type="submit"
                        className="hidden text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-600 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-red-500 dark:focus:ring-red-700">Search
                </button>
            </div>
        </form>

    )
}