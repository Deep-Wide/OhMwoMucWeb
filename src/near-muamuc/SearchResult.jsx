import SearchResultRestaurant from "./SearchResultRestaurant.jsx";
import {useEffect, useState} from "react";
import SearchIcon from "../assets/emoji/search-icon.svg";

const SearchResult = ({searchResults, isOpen, onClickResult, onChangeSearchKeyword, onSearch, onUpdateFork}) => {

    const [searchKeyword, setSearchKeyword] = useState("");

    const onPressEnterKey = (event) => {
        if (event.key === "Enter") {
            onSearch()
        }
    }

    useEffect(() => {
        onChangeSearchKeyword(searchKeyword)
    }, [searchKeyword])

    return (
        <>
            {
                isOpen &&
                <div className={"flex rounded-md bg-white p-0 pointer-events-auto h-[65.5vh]"} style={{
                    borderWidth: "1.37px",
                    borderStyle: "solid",
                    borderColor: "#E4E4E4",
                    borderRadius: "13.69px",
                    minWidth: "367.18px"
                }}>
                    <div className={"w-full flex flex-col"}>
                        <div className={"w-full p-3"}>
                            <div className="max-w-md mx-auto">
                                <div className="items-center flex gap-3">
                                    <img src={SearchIcon} width={45} alt={"search-icon"}/>
                                    <input type="search" id="default-search"
                                           className="rounded-full block w-full p-4 ps-5 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-red-600 focus:bolder-red-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-600 dark:focus:bolder-red-600"
                                           placeholder={"주변에서 뭐 먹지?"} required
                                           autoComplete={"off"}
                                           value={searchKeyword}
                                           onChange={(e) => {
                                               setSearchKeyword(e.target.value)
                                           }}
                                           onKeyUp={onPressEnterKey}
                                    />
                                    <button type="submit"
                                            className="hidden text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-600 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-red-500 dark:focus:ring-red-700">Search
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={"flex flex-col overflow-y-auto"} style={{ maxHeight: "calc(65.5vh - 80px)" }}>
                            {
                                searchResults.map((item) => (
                                    <div key={item.id} className={"hover:bg-gray-100 p-3"}>
                                        <SearchResultRestaurant restaurantInfo={item} onClickResult={onClickResult} onUpdateFork={onUpdateFork}/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default SearchResult;