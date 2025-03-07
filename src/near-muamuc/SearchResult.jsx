import {Searchbar} from "../community/Searchbar.jsx";
import SearchResultRestaurant from "./SearchResultRestaurant.jsx";

const searchResults = [
    {
        id: 1,
        name: "유니아케이크",
        category: "카페/디저트",
        time: "11:00 - 19:00",
        forks: 20,
        forked: true,
        comment: "떡케이크가 맛있는 집"
    },
    {
        id: 2,
        name: "유니아 분식",
        category: "분식",
        time: "12:00 - 19:00",
        forks: 18,
        forked: false,
        comment: "떡볶이가 맛있는 집"
    },
]

const SearchResult = () => {
    return (
        <div className={"flex rounded-md bg-white p-0 pointer-events-auto"} style={{
            borderWidth: "1.37px",
            borderStyle: "solid",
            borderColor: "#E4E4E4",
            borderRadius: "13.69px",
        }}>
            <div className={"w-full flex flex-col"}>
                <div className={"w-full p-3"}>
                    <Searchbar placeholder={"내 주변 맛집은? "}/>
                </div>
                <div className={"flex flex-col"}>
                    {
                        searchResults.map((item) => (
                            <div key={item.id} className={"hover:bg-gray-100 p-3"}>
                                <SearchResultRestaurant info={item}/>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchResult;