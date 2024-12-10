import Title from "./Title.jsx";
import InputBox from "./InputBox.jsx";
import Button from "../common/Button.jsx";

export default function Information() {
    return (
        <div className={"flex justify-center pt-11"}>
            <div className={"flex flex-col gap-16"}>
                <Title name={"정보입력"}/>
                <div className={"flex flex-col gap-y-7"} style={{width: "340px"}}>

                    <InputBox name={"닉네임"} placeholder={"닉네임 입력"}/>

                    <div>
                        <div className={`font-semibold secondary-color text-lg mb-3`}>
                            약관동의
                        </div>

                        <div className="flex flex-col gap-y-3">
                            <div className={"flex items-center"}>
                                <input id="link-checkbox" type="checkbox" value=""
                                       className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-700 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="link-checkbox"
                                       className="ms-2 text-base font-medium text-gray-900 dark:text-gray-300">모두
                                    동의</label>
                            </div>
                            <div style={{paddingLeft: "15px"}} className="flex columns-2">
                                <input id="link-checkbox" type="checkbox" value=""
                                       className="mt-0.5 w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-700 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <div className={"flex flex-col gap-y-1"}>
                                    <Term name={"(필수) 오뭐먹 약관 및 동의사항"}/>
                                    <Term name={"(필수) 서비스 이용약관"}/>
                                    <Term name={"(필수) 개인정보 수집 및 이용"}/>
                                    <Term name={"(필수) 위치정보 수집 및 이용"}/>
                                </div>
                            </div>
                            <div style={{paddingLeft: "15px"}} className="flex columns-2">

                                <input id="link-checkbox" type="checkbox" value=""
                                       className="mt-0.5 w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-700 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <div className={"flex flex-col"}>
                                    <Term name={"(선택) 마케팅 정보 수신 동의"}/>
                                </div>
                            </div>
                        </div>

                    </div>
                    <Button name={"완료"} width={"100%"} path={"/"}/>
                </div>
            </div>
        </div>
    )
}

export function Term({name}) {
    return (
        <label
            className="ms-2 text-sm text-gray-900 dark:text-gray-300">
            {name}
        </label>
    )
}