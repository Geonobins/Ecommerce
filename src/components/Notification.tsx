
"use client";

import { Toast } from "flowbite-react";
import { HiCheck,HiExclamation, HiX } from "react-icons/hi";
 type NotificationProps = {
  msg:string
  status:string
 }
export function Notification({msg,status}:NotificationProps) {
  return (
    <div className=" fixed z-50 mx-32  pr-36 pt-2 flex  w-full md:justify-center">
    <div className=" flex flex-col gap-4 items-center justify-center">
      <Toast>
        <div className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${status==="message"?"bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200":"bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200"}`}>
          { status ==="message" &&<HiCheck className="h-5 w-5" />}
          {status === "danger" && <HiExclamation className="h-5 w-5 " />}
          {}
        </div>
        <div className="ml-3 text-sm font-normal">{msg}</div>
        <div></div>
        <Toast.Toggle className="ml-4 items-center flex justify-center"/>
      </Toast>
      {/* <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
          <HiX className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">Item has been deleted.</div>
        <Toast.Toggle />
      </Toast>
      <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
          <HiExclamation className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">Improve password difficulty.</div>
        <Toast.Toggle />
      </Toast> */}
    </div>
    </div>
  );
}
