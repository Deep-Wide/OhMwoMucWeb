import example from "/src/assets/example/food/cake.png"

const SearchResultRestaurant = ({info}) => {

    return (
        <div className={"flex flex-col gap-y-2"}>
            <div className={"flex justify-between items-center"}>
                <div className={"flex w-[130px]"}>
                    <div className={"font-semibold text-xl"}>{info.name}</div>
                </div>
                <div className={"text-sm"}>{info.category}</div>
                <div className={"text-sm"}>{info.time}</div>
            </div>
            <div className={"flex justify-between w-[351px]"}>
                <div className={"flex flex-col justify-between w-[213px]"}>
                    <div className={"flex items-center justify-between"}>
                        <div className={"flex gap-x-2 items-center"}>
                            <div className={"flex"}>
                                <div className={"text-color text-sm"}>포킹 지수</div>
                            </div>
                            <div className={"font-semibold main-color"}>{info.forks}</div>
                        </div>
                        {info.forked ?
                            <div className={"flex gap-x-1"}>
                                <div className={"text-color text-sm"}>내가</div>
                                <div className={"main-color text-sm font-semibold"}>포킹한</div>
                                <div className={"text-color text-sm"}>맛집</div>
                            </div> :
                            <div className={"flex gap-x-1"}>
                                <div className={"text-color text-sm"}>나도</div>
                                <div className={"main-color text-sm font-semibold"}>포킹하기</div>
                            </div>
                        }
                    </div>
                    <div className={"font-semibold text-lg justify-center text-color flex"}>"{info.comment}"</div>
                </div>
                <div>
                    <img src={example}/>
                </div>
            </div>

        </div>
    )
}

export default SearchResultRestaurant;