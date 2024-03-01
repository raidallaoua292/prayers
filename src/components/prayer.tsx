
type PrayerProps = {
    name: string;
    time: string;
};



export default function prayer({name, time}: PrayerProps) {
  return (
    <>
        <div
            className="block max-w-[200px] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <div className="relative overflow-hidden bg-cover bg-no-repeat">
            <img
            className="rounded-t-lg"
            src="https://tecdn.b-cdn.net/img/new/standard/nature/182.jpg"
            alt="" />
        </div>
        <div className="p-6 flex flex-col items-center ">
            <h2 className="text-3xl font-medium mb-2">{name}</h2>
            <h1 className="text-7xl font-thin mb-2">{time}</h1>
            
        </div>
        </div>
    </>
  )
}
