import { Profit } from "@/data/SalesData"

const profit = Profit
const Overview = () => {
  return (
    <div className="bg-white-100 flex items-center justify-center shadow-md min-w-[80%] border min-h-[100%] rounded-xl hover:shadow-xl hover:-translate-y-1.5 duration-200">
        <p></p>
      <div className="flex flex-col xl:flex-row items-center justify-center bg-slate-400 font-bold rounded-xl xl:rounded-none gap-20 min-w-full min-h-[100%] py-24">
            { profit>=0 ?
            <div className="text-white">
                <p className="text-xl ">Profit:</p>
                <h1 className="text-4xl text-green-200 ">{`$${profit}`}</h1>
            </div>:
            <div className="text-white">
            <p className="text-xl ">Loss:</p>
            <h1 className="text-4xl text-red-300 ">{`$${profit}`}</h1>
        </div>
            }
            <div className="text-white">
                <p className="text-xl">Users:</p>
                <h1 className="text-4xl">563</h1>
            </div>
            <div className="text-white">
                <p className="text-xl">Total Sales:</p>
                <h1 className="text-4xl">1043</h1>
            </div>
      </div>
    </div>
  )
}

export default Overview
