import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { BoxIcon, ListIcon, SettingsIcon } from "lucide-react";
import useTranslations from "@/hooks/useTranslations";

const Sidebar = () => {
  const {user} = useAuth0()
  const isAdmin = user?.nickname === "admin";

  const t = useTranslations();

  const menus = [
    { name: t["User"], link: "/home/profile", icon: AiOutlineUser },
    ...(isAdmin
      ? [
          { name: t["Dashboard"], link: "/home/profile/dashboard", icon: MdOutlineDashboard },
          { name: t["Inventory"], link: "/home/profile/actions", icon: RiSettings4Line, margin: true },
          { name: t["Orders"], link: "/home/profile/orderslist", icon: ListIcon },
        ]
      : []),
      {name: t["My Orders"], link: "/home/profile/myorders", icon: BoxIcon},
      {name: t["Settings"], link: "/home/profile/settings", icon: SettingsIcon}
  ];
  const [open, setOpen] = useState(false);

  return (
    <section className="flex md:mt-36  xl:mt-24 2xl:mt-0 gap-6 p-2 sticky">
      <div
        className={`bg-slate-100 min-h-screen rounded-xl ${open ? "md:w-72" : "w-16"} duration-500 text-slate-400 px-4 shadow-xl` }
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer text-teal-950"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus.map((menu, i) => (
            <NavLink
              to={menu.link}
              key={i}
              end
              className={({ isActive }) =>
                `${menu.margin ? "mt-5 border-t-2" : ""}
                group flex items-center text-sm gap-3.5 font-medium p-2 
                ${isActive ? "bg-white w-full" : ""}
                hover:bg-slate-200 duration-500 rounded-md`
              }
            >
              <div>{React.createElement(menu.icon, { size: "20", className: "text-slate-400" })}</div>
              <h2
                style={{ transitionDelay: `${i + 3}00ms` }}
                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
              >
                {menu.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu.name}
              </h2>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
