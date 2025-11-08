"use client";

import {
  ArrowDownRight,
  BarChart,
  DollarSign,
  EllipsisVertical,
  Pencil,
  Plus,
  Users,
} from "lucide-react";

// dummy data for card stats
const stats = [
  { title: "Total Users", value: "1,250", icon: <Users className="h-6 w-6 text-sky-500" />, color: "text-sky-500", bgColor: "bg-sky-500/25",},
  { title: "Total Sales", value: "RM 54,320", icon: <DollarSign className="h-6 w-6 text-emerald-500" />, color: "text-emerald-500", bgColor: "bg-emerald-500/25",},
  { title: "Revenue", value: "RM 12,890", icon: <BarChart className="h-6 w-6 text-amber-500" />, color: "text-amber-500", bgColor: "bg-amber-500/25",},
];

export const DashboardMetrics = () => {
  return (
    <div className="flex flex-col gap-6 rounded-4xl bg-cover bg-center p-4 md:h-96 md:justify-between" style={{ backgroundImage: 'url(/mac-wallpaper1.jpg)' }}>
      <div className="flex justify-between items-center">
        <h2 className="rounded-2xl px-4 py-2 text-6xl max-md:text-4xl drop-shadow-50 text-white max-md:gap-6">User Monitoring Dashboard</h2>
        <div className="p-3 bg-white rounded-full w-fit h-fit mr-6 hover:bg-white/50 bg-white/30 backdrop-blur-xs cursor-pointer transition-all ">
          <Pencil className="h-5 w-5  text-whitecursor-pointer"></Pencil>
        </div>
      </div>
      <div className="flex flex-col gap-2 md:flex-row justify-between">
        <div className="flex flex-col gap-2 md:flex-row">
          {stats.map((stat) => (
            <div key={stat.title} className={`flex flex-col justify-between rounded-3xl p-6 drop-shadow-lg transition-all hover:shadow-lg hover:backdrop-blur-sm h-fit ${stat.bgColor} backdrop-blur-xs`}>
              <div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center justify-start gap-2">{stat.icon}<h3 className="text-lg font-medium text-neutral-300">{stat.title}</h3></div>
                  {/* <EllipsisVertical className="cursor-pointer"></EllipsisVertical> */}
                </div>
                <div className="flex items-end justify-between gap-4">
                  <p className="mt-2 text-4xl tracking-tight text-white">{stat.value}</p>
                  <div className="flex p-0.5 bg-white rounded-full mb-1"><ArrowDownRight className="h-7 w-7 -scale-y-100 transform text-black cursor-pointer"></ArrowDownRight></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex h-auto flex-row gap-2 md:flex-col">
          <div className={`flex flex-col justify-between rounded-2xl py-4 px-6 drop-shadow-lg transition-all hover:shadow-lg hover:bg-white/50 h-full bg-white/30 backdrop-blur-xs cursor-pointer`}>
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-medium text-white">Member</h3>
              <Plus></Plus>
            </div>
          </div>
          <div className={`flex flex-col justify-between rounded-2xl py-4 px-6 drop-shadow-lg transition-all hover:shadow-lg hover:bg-white/50 h-full bg-white/30 backdrop-blur-xs cursor-pointer`}>
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-medium text-white">Sales</h3>
            <Plus></Plus>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};