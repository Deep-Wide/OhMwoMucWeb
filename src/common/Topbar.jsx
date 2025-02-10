"use client";


import {Link} from "react-router-dom";
import UserStore from "../store/UserStore.js";
import {useState} from "react";


export function Topbar() {

    const {loginUser} = UserStore()
    const [targetMenuIndex, setTargetMenuIndex] = useState(0)

const menus = [
    {
        id: 0,
        name: "주변뭐먹",
        link: '#'
    }
    ,
    {
        id: 1,
        name: "우리뭐먹",
        link: '#'

    }
    ,
    {
        id: 2,
        name: "이거먹",
        link: '#'
    }
    ,
    {
        id: 3,
        name: "뭐먹뭐먹",
        link: '/muamuc'
    }
    ,
    {
        id: 4,
        name: "마이페이지",
        link: !!loginUser?.nickname ? "/mypage" : "/login"
    }
    ,
]

    return (<nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span
                        className="self-center text-4xl font-bold whitespace-nowrap main-color">오뭐먹</span>
                </a>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {menus.map((menu) => {
                            return (
                                <li key={menu.id}>
                                    <Link to= {menu.link}
                                          className={`block py-2 px-3 text-white rounded md:bg-transparent md:p-0 dark:text-white text-2xl font-bold ${targetMenuIndex == menu.id ? "main-color" : "secondary-color"}`}
                                          aria-current="page"
                                          onClick={() => {
                                              setTargetMenuIndex(menu.id)
                                          }}>
                                        {menu.name}
                                    </Link>
                                </li>
                            )
                        })}
                        {/*<li>*/}
                        {/*    <a href="#"*/}
                        {/*       className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 dark:text-white text-2xl font-semibold secondary-color"*/}
                        {/*       aria-current="page">*/}
                        {/*        주변뭐먹*/}
                        {/*    </a>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                        {/*    <a href="#"*/}
                        {/*       className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 dark:text-white text-2xl font-semibold secondary-color"*/}
                        {/*       aria-current="page">*/}
                        {/*        우리뭐먹*/}
                        {/*    </a>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                        {/*    <a href="#"*/}
                        {/*       className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 dark:text-white text-2xl font-semibold secondary-color"*/}
                        {/*       aria-current="page">*/}
                        {/*        이거먹*/}
                        {/*    </a>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                        {/*    <Link to="/muamuc"*/}
                        {/*          className={`block py-2 px-3 text-white rounded md:bg-transparent md:p-0 dark:text-white text-2xl font-bold ${targetMenuIndex == "muamuc" ? "main-color" : "secondary-color"}`}*/}
                        {/*          aria-current="page"*/}
                        {/*          onClick={() => {*/}
                        {/*              setTargetMenu(4)*/}
                        {/*          }}>*/}
                        {/*        뭐먹뭐먹*/}
                        {/*    </Link>*/}
                        {/*</li>*/}

                        {/*<li>*/}
                        {/*    <Link to={!!loginUser?.nickname ? "/mypage" : "/login"}*/}
                        {/*          className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 dark:text-white text-2xl font-semibold secondary-color"*/}
                        {/*          aria-current="page">*/}
                        {/*        마이페이지*/}
                        {/*    </Link>*/}

                        {/*</li>*/}
                    </ul>
                </div>
            </div>
        </nav>

    );
}
