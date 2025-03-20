import {useEffect, useState} from "react";

const TimeInput = ({onChangeTime}) => {

    const [hour, setHour] = useState('10');
    const [minute, setMinute] = useState('00');

    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))

    const minutes = Array.from({ length: 6 }, (_, i) => (i * 10).toString().padStart(2, '0'))

    const handleHourChange = (e) => setHour(e.target.value)
    const handleMinuteChange = (e) => setMinute(e.target.value)

    useEffect(() => {
        onChangeTime(`#${hour}:${minutes}`)
    }, [hour, minutes])

    return (
        <div className={"flex"}>
            <div className={"flex gap-[8px] w-full items-center"}>

                {/* 시간 선택 */}
                <select value={hour} onChange={handleHourChange} >
                    {hours.map(h => (
                        <option key={h} value={h}>{h}</option>
                    ))}
                </select>
                :
                {/* 분 선택 */}
                <select value={minute} onChange={handleMinuteChange}>
                    {minutes.map(m => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default TimeInput