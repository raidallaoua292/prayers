import LoctionSearch from "./LoctionSearch"
import Prayer from "./prayer"
import axios from "axios"
import moment, { Moment } from "moment"
import "moment/dist/locale/ar-dz"
import { useEffect, useState } from "react"


moment.locale('ar-dz')

export default function MainContent() {

    type Timings = {
        key: string;
        name: string;
        time: string;
    }[]

    const [nextPrayerIndex, setNextPrayerIndex] = useState<number>(4)
    const [timings, setTimings] = useState([
        {key: "Fajr", name: "الفجر", time: "05:00"},
        {key: "Dhuhr", name: "الظهر", time: "12:00"},
        {key: "Asr", name: "العصر", time: "15:00"},
        {key: "Maghrib", name: "المغرب", time: "18:00"},
        {key: "Isha", name: "العشاء", time: "20:00"}
    ])
    
    const [city, setCity] = useState({
        dspName: "الجزائر",
        apiName: "Algiers",
        country : "Algeria"
    })

    const [date, setDate] = useState({
        date: "14 فيفري 2021",
        time: "12:00:00",
    })

    const [timer, setTimer] = useState('')
    
    useEffect(() => {
        axios.get(`http://api.aladhan.com/v1/timingsByCity?city=${city.apiName}&country=${city.country}&method=8`)
            .then((res) => {
                // const prayer(res.data.data.timings)
                setTimings(timings.map((timing) => {
                    return {
                        ...timing,
                        time: res.data.data.timings[timing.key]
                    }
                }))
                console.log(res.data.data.timings)
            })
            .catch((err) => {
                console.log(err)
            })
           
    }, [city])

    const getNextPrayerIndex = (momentNow:Moment, timings:Timings) => {
        let nextPrayerIndex = 0;
        for (let i = 0; i < timings.length; i++) {
            if (momentNow.isBefore(moment(timings[i].time, 'HH:mm'), 'second')) {
                nextPrayerIndex = i;
                break;
            }
        }
        return nextPrayerIndex;
    };

    function setUpcountDown() {
        const momentNow = moment();
        setNextPrayerIndex(getNextPrayerIndex(momentNow, timings));
        
        // now after knowing what the next prayer is, we can setup the countdown timer by getting the prayer's time
        // and subtracting it from the current time
        let remrimingTime = moment(timings[nextPrayerIndex].time, 'HH:mm').diff(momentNow)
        console.log(remrimingTime)

        if (remrimingTime < 0) {
            const midnightDiff = moment('23:59:59', 'HH:mm:ss').diff(momentNow)
            const fajrToMidnightDiff = moment(timings[nextPrayerIndex].time, 'HH:mm').diff(
                moment('00:00:00', 'HH:mm:ss'),
            )
            remrimingTime = fajrToMidnightDiff + midnightDiff
        }
        const duration = moment.duration(remrimingTime)
        const hours = duration.hours()
        const minutes = duration.minutes()
        const seconds = duration.seconds()
        console.log(`${hours}:${minutes}:${seconds}`)
        setTimer(`${hours}:${minutes}:${seconds}`)
    }

    useEffect(() => {
        setInterval(() => {
            setDate({
                // arabic date
                date: moment().format("LL"),
                time: moment().format('LTS')
            })
        }, 1000)
    
        const interval = setInterval(() => {
            setUpcountDown()
        }, 1000)
        return () => clearInterval(interval)
    }, [timings, nextPrayerIndex])


    const handelChange = (displayName:string , apiName : string, countryCode :string) => {
        setCity({
            dspName: displayName,
            apiName: apiName,
            country: countryCode
        })
    }
    return (
        <>
            <div className=" py-6 rounded-lg container text-center text-emerald-600 bg-emerald-100">
                <LoctionSearch handelChange={handelChange} />
                <div className="flex justify-around items-center w-full max-md:flex-col max-md:gap-3">
                    <div className="p-4 rounded-lg border-2 ">
                        {/* date and time */}
                        <h3 className="text-2xl font-bold mb-2">{date.date} , {date.time}</h3>
                        {/* location */}
                        <h1 className="text-3xl font-bold mb-2">{city.dspName} </h1>
                    </div>
                    <div className="p-4 rounded-lg border-2 ">
                        {/* date and time */}
                        <h3 className="text-2xl font-bold mb-2">
                            الوقت المتبقي للصلاة {timings[nextPrayerIndex].name}
                        </h3>
                        {/* location */}
                        <h1 className="text-3xl font-bold mb-2">{timer}</h1>
                    </div>
                </div>
                <hr className="my-6 h-0.5 border-t-0 bg-neutral-200 opacity-50 dark:opacity-50" />
                <div className="flex gap-7 justify-around flex-wrap">
                    {timings.map((timing) => {
                        return <Prayer key={timing.key} name={timing.name} time={timing.time} />
                    })}
                </div>

            </div>
        </>
    )
}
