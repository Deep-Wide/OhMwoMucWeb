"use client";


import {Link} from "react-router-dom";
import {UserContext} from "../context/UserContext.js";
import {useContext, useState} from "react";

export function Topbar() {

    const {loginUser, dispatch} = useContext(UserContext);

    console.log("@@@@@@@: ",loginUser?.nickname)

    return (<nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span
                        className="self-center text-4xl font-bold whitespace-nowrap main-color">오뭐먹</span>
                </a>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a href="#"
                               className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 dark:text-white text-2xl font-semibold secondary-color"
                               aria-current="page">
                                주변뭐먹
                            </a>
                        </li>
                        <li>
                            <a href="#"
                               className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 dark:text-white text-2xl font-semibold secondary-color"
                               aria-current="page">
                                내찜먹
                            </a>
                        </li>
                        <li>
                            <a href="#"
                               className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 dark:text-white text-2xl font-semibold secondary-color"
                               aria-current="page">
                                우리뭐먹
                            </a>
                        </li>
                        <li>
                            <a href="#"
                               className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 dark:text-white text-2xl font-semibold secondary-color"
                               aria-current="page">
                                이거먹
                            </a>
                        </li>
                        <li>
                            <Link to="/muamuc"
                                  className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 dark:text-white text-2xl font-bold main-color"
                                  aria-current="page">
                                뭐먹뭐먹
                            </Link>
                        </li>
                        <li>
                            <a href="#"
                               className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 dark:text-white text-2xl font-semibold secondary-color"
                               aria-current="page">
                                새로운먹
                            </a>
                        </li>
                        <li>
                            <Link to={!!loginUser?.nickname ? "/mypage" : "/login"}
                                  className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 dark:text-white text-2xl font-semibold secondary-color"
                                  aria-current="page">
                                마이페이지
                            </Link>

                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    );
}
