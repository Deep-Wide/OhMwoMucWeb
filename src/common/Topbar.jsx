"use client";


import {Link, useLocation} from "react-router-dom";
import UserStore from "../store/UserStore.js";
import {useEffect, useState} from "react";
import AlertModalStore from "../store/AlertModalStore.js";


export function Topbar() {

    const {loginUser} = UserStore()
    const {setAlertModalInfo} = AlertModalStore()
    const [targetMenuIndex, setTargetMenuIndex] = useState(0)
    const location = useLocation()

    const setTopbarTargetMenu = () => {
        let menuIndex = menus.filter(menu => menu.link === `/${location.pathname.split('/')[1]}`).map(menu => menu.id)
        if (menuIndex.length < 1) menuIndex = -1
        setTargetMenuIndex(menuIndex)
    }

    const menus = [
        {
            id: 0,
            name: "주변뭐먹",
            link: '/near-muamuc'
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

    useEffect(() => {
        setTopbarTargetMenu()
    }, [location.pathname])

    return (<nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to={"/near-muamuc"} className={"flex items-center space-x-3 rtl:space-x-reverse"}>
                    <span
                        className="self-center text-4xl font-bold whitespace-nowrap main-color">오뭐먹</span>
                </Link>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {menus.map((menu) => {
                            return (
                                <li key={menu.id}>
                                    {menu.link === '#' ? (
                                        <button
                                            onClick={() => setAlertModalInfo({
                                                isOpen: true,
                                                message: "아직 개발 중인 기능입니다. 조금만 기다려주세용!! (아니요 눌러도 어쩔 수 없지롱 !!)"
                                            })}
                                            className="cursor-pointer block py-2 px-3 text-white rounded md:bg-transparent md:p-0 dark:text-white text-2xl font-bold secondary-color"
                                        >
                                            {menu.name}
                                        </button>
                                    ) : (
                                        <Link to={menu.link} className={`cursor-pointer block py-2 px-3 text-white rounded md:bg-transparent md:p-0 dark:text-white text-2xl font-bold ${targetMenuIndex == menu.id ? "main-color" : "secondary-color"}`}>
                                            {menu.name}
                                        </Link>
                                    )}
                                </li>

                            )
                        })}

                    </ul>
                </div>
            </div>
        </nav>

    );
}
