import SearchIcon from '/public/emoji/search-icon.svg';

export function Searchbar() {
    return (
        <form className="max-w-md mx-auto mt-6">
            {/*<label htmlFor="default-search"*/}
            {/*       className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>*/}

            <div className="items-center flex gap-3">
                <img src={SearchIcon} width={45} alt={"search-icon"} />

                <input type="search" id="default-search"
                       className="rounded-full block w-full p-4 ps-5 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-red-600 focus:bolder-red-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-600 dark:focus:bolder-red-600"
                       placeholder="다른 사람들은 뭐 먹었지?" required/>
                <button type="submit"
                        className="hidden text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search
                </button>
            </div>
        </form>

    )
}