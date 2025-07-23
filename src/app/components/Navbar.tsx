"use client";
import { Cctv, ChevronDown, LayoutDashboard, TriangleAlert, UsersRound } from "lucide-react";
import React from "react";
import Logo from "../../../public/images/logo.png";
import Avatar from "../../../public/images/avatar.png";
import Image from "next/image";

const Navbar = () => {
  const navItems = [
    { title: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { title: "CCTV", icon: <Cctv className="w-4 h-4" /> },
    { title: "Alerts", icon: <TriangleAlert className="w-4 h-4" /> },
    { title: "Users", icon: <UsersRound className="w-4 h-4" /> },
  ];
  return (
    <div className="w-full text-xl md:text-base font-jakarta p-4 px-6 flex justify-between items-center border-b border-zinc-800">
      <div>
        <Image
          src={Logo}
          alt="logo"
          width={100}
          height={48}
          className="ml-6"
        />
      </div>
      <div className="flex gap-4">
        {navItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            {item.icon}
            <span>{item.title}</span>
          </div>
        ))}
      </div>
      <div className="text-zinc-400 flex items-center gap-2">

<span>
    <Image alt="profile" src={Avatar} width={40} height={40}/>
</span>
<span>
    <p className="text-sm">Mohammed Ajhas</p>
    <p className="text-xs">ajhas@mandiac.com</p>
</span>
<span className="">
    <ChevronDown className="w-4 h-4" />
</span>

      </div>
    </div>
  );
};

export default Navbar;
