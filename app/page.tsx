"use client";
import {
  Bell,
  Sun,
  Moon,
  Users,
  DollarSign,
  ChevronDown,
  User,
  BarChart,
  X,
  ArrowUpDown,
  Search,
  Info,
  EllipsisVertical,
  ArrowDownRight,
  Plus,
  Pencil,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useMemo, useRef } from "react";
 
const stats = [
  { title: "Total Users", value: "1,250", icon: <Users className="h-6 w-6 text-sky-500" />, color: "text-sky-500", bgColor: "bg-sky-500/25",},
  { title: "Total Sales", value: "RM 54,320", icon: <DollarSign className="h-6 w-6 text-emerald-500" />, color: "text-emerald-500", bgColor: "bg-emerald-500/25",},
  { title: "Revenue", value: "RM 12,890", icon: <BarChart className="h-6 w-6 text-amber-500" />, color: "text-amber-500", bgColor: "bg-amber-500/25",},
];

const MiniLineChart = ({ data, labels, strokeColor, prefix }: { data: number[]; labels: string[]; strokeColor: string; prefix: string }) => {
  if (!data || data.length < 2) return null;

  const width = 100;
  const height = 30;
  const padding = 2;

  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue === 0 ? 1 : maxValue - minValue;

  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; value: number; label: string } | null>(null);

  const pointsWithCoords = data.map((d, i) => {
    const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - ((d - minValue) / range) * (height - padding * 2) - padding;
    return { x, y, value: d, label: labels[i] };
  });

  const points = pointsWithCoords.map(p => `${p.x},${p.y}`).join(" ");

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    const svgPoint = pt.matrixTransform(svg.getScreenCTM()?.inverse());

    const closestPoint = pointsWithCoords.reduce((prev, curr) => {
      return (Math.abs(curr.x - svgPoint.x) < Math.abs(prev.x - svgPoint.x) ? curr : prev);
    });

    setHoveredPoint(closestPoint);
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-8 w-full cursor-pointer overflow-visible"
      preserveAspectRatio="none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        points={points}
        className={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {hoveredPoint && (
        <>
          <circle cx={hoveredPoint.x} cy={hoveredPoint.y} r="2" fill="white" stroke="currentColor" strokeWidth="1" className={strokeColor} />
          <foreignObject x={hoveredPoint.x - 35} y={hoveredPoint.y - 40} width="70" height="35">
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              className="flex flex-col items-center justify-center rounded-md bg-neutral-800 px-2 py-1 text-xs text-white shadow-lg"
            >
              <span className="font-bold">{prefix}{hoveredPoint.value.toLocaleString()}</span>
              <span className="text-neutral-400 dark:text-neutral-500">{hoveredPoint.label}</span>
            </div>
          </foreignObject>
        </>
      )}
    </svg>
  );
};

const initialUsers = [
  { id: 1, name: "Ahmad bin Ismail", email: "ahmad.i@example.com", status: "Active" },
  { id: 2, name: "Siti Nurhaliza", email: "siti.n@example.com", status: "Inactive" },
  { id: 3, name: "Lim Wei Kiat", email: "lim.wk@example.com", status: "Active" },
  { id: 4, name: "Priya a/p Muthu", email: "priya.m@example.com", status: "Active" },
  { id: 5, name: "Muhammad Hafiz", email: "m.hafiz@example.com", status: "Inactive" },
  { id: 6, name: "Nurul Aina", email: "nurul.aina@example.com", status: "Active" },
  { id: 7, name: "Tan Ah Kow", email: "tan.ak@example.com", status: "Active" },
  { id: 8, name: "Fatimah binti Ali", email: "fatimah.ali@example.com", status: "Inactive" },
  { id: 9, name: "Ravi a/l Kumar", email: "ravi.k@example.com", status: "Active" },
  { id: 10, name: "Zulaikha binti Razak", email: "zulaikha.r@example.com", status: "Active" },
  { id: 11, name: "Chan Mei Ling", email: "chan.ml@example.com", status: "Active" },
  { id: 12, name: "Amirul Hakim", email: "amirul.h@example.com", status: "Inactive" },
  { id: 13, name: "Devi a/p Subramaniam", email: "devi.s@example.com", status: "Active" },
  { id: 14, "name": "Iskandar Zulkarnain", "email": "iskandar.z@example.com", "status": "Active" },
  { id: 15, "name": "Aisyah Humaira", "email": "aisyah.h@example.com", "status": "Inactive" }
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof typeof users[0] | null; direction: 'ascending' | 'descending' }>({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    if (isMobileSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isMobileSearchOpen]);

  const itemsPerPage = 10;

  const filteredAndSortedUsers = useMemo(() => {
    let sortableUsers = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(user.id).includes(searchTerm)
    );

    if (sortConfig.key !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, searchTerm, sortConfig]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedUsers, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);


  const requestSort = (key: keyof typeof users[0]) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f2f7f8] font-sans">
      {/* header */}
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-neutral-200/80 bg-white/80 px-4 backdrop-blur-sm sm:px-6">
        {isMobileSearchOpen ? (
          <div className="flex w-full items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                className="w-full rounded-lg bg-neutral-100 py-2 pl-10 pr-4 text-sm text-neutral-900 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button onClick={() => setIsMobileSearchOpen(false)} className="text-sm font-medium text-blue-600">Cancel</button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4">
              <div className="text-xl font-bold text-neutral-900">
                Juris Technologies Sdn Bhd
              </div>
              <div className="hidden flex-1 max-w-md lg:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full rounded-lg bg-neutral-100 py-2 pl-10 pr-4 text-sm text-neutral-900 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setIsMobileSearchOpen(true)} aria-label="Open search" className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-200/75 hover:text-neutral-800 lg:hidden">
                <Search size={20} />
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                aria-label="Show instructions"
                className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-200/75 hover:text-neutral-800"
              >
                <Info size={20} />
              </button>
              <button aria-label="Notifications" className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-200/75 hover:text-neutral-800">
                <Bell size={20} />
              </button>
              <button aria-label="User profile" className="flex items-center gap-2 rounded-full p-1 pl-2 transition-colors hover:bg-neutral-200/75">
                <span className="hidden text-sm font-semibold text-neutral-700 sm:inline">Azief Zulhazrey</span>
                <User className="h-8 w-8 rounded-full bg-neutral-300 p-1.5 text-neutral-600" />
              </button>
            </div>
          </>
        )}
      </header>

      <main className="flex-1 p-6">
        <div className="flex flex-col gap-6 rounded-4xl bg-cover bg-center p-4 md:h-96 md:justify-between" style={{ backgroundImage: 'url(/mac-wallpaper1.jpg)' }}>
          <div className="flex justify-between items-center">
            <h2 className="rounded-2xl px-4 py-2 text-6xl max-md:text-4xl drop-shadow-50 text-white max-md:gap-6">User Monitoring Dashboard</h2>
            <div className="p-2 bg-white rounded-full w-fit h-fit mr-6 hover:bg-white/50 bg-white/30 backdrop-blur-xs cursor-pointer transition-all ">
              <Pencil className="h-6 w-6  text-whitecursor-pointer"></Pencil>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:flex-row justify-between">
            <div className="flex flex-col gap-2 md:flex-row">
              {stats.map((stat, index) => (
                <div key={stat.title} className={`flex flex-col justify-between rounded-3xl p-6 drop-shadow-lg transition-all hover:shadow-lg hover:backdrop-blur-sm h-fit ${stat.bgColor} backdrop-blur-xs`}>
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center justify-start gap-2">
                        {stat.icon}
                        <h3 className="text-lg font-medium text-neutral-300">{stat.title}</h3>
                      </div>
                      <EllipsisVertical className="cursor-pointer"></EllipsisVertical>
                    </div>
                    <div className="flex items-end justify-between gap-4">
                      <p className="mt-2 text-4xl tracking-tight text-white">{stat.value}</p>
                      <div className="flex p-0.5 bg-white rounded-full mb-1">
                        <ArrowDownRight className="h-7 w-7 -scale-y-100 transform text-black cursor-pointer"></ArrowDownRight>
                      </div>
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

        <div className="mt-8 overflow-x-auto rounded-4xl bg-white shadow-sm">
          <div className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
            <h3 className="text-xl font-semibold text-neutral-900">Users</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input
                type="text"
                placeholder="Search users by id, name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg bg-neutral-100 py-2 pl-10 pr-4 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-72"
              />
            </div>
          </div>
          <table className="min-w-full text-left text-sm text-neutral-500">
            <thead className="border-b border-neutral-200">
              <tr>
                <th className="hidden px-6 py-4 font-medium sm:table-cell">
                  <button onClick={() => requestSort('id')} className="flex items-center gap-1">
                    ID <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="px-6 py-4 font-medium">
                  <button onClick={() => requestSort('name')} className="flex items-center gap-1">
                    User <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="hidden px-6 py-4 font-medium md:table-cell">
                  <button onClick={() => requestSort('email')} className="flex items-center gap-1">
                    Email <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="px-6 py-4 font-medium">
                  <button onClick={() => requestSort('status')} className="flex items-center gap-1">
                    Status <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <tr key={user.id} className="text-neutral-800 transition-colors hover:bg-neutral-100/50">
                    <td className="hidden px-6 py-4 font-mono text-xs sm:table-cell">{user.id}</td>
                    <td className="px-6 py-4 font-medium">{user.name}</td>
                    <td className="hidden px-6 py-4 md:table-cell">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold ${
                          user.status === "Active"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-neutral-100 text-neutral-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-neutral-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {totalPages > 1 && (
            <div className="flex items-center justify-end border-t border-neutral-200 px-6 py-3 gap-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 ring-1 ring-inset ring-neutral-300 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="text-sm text-neutral-600">
                Page {currentPage} of {totalPages}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 ring-1 ring-inset ring-neutral-300 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* lightbox */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="relative w-full max-w-lg rounded-xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-500 transition-colors hover:text-neutral-800"
              aria-label="Close instructions"
            >
              <X />
            </button>
            <h2 id="modal-title" className="text-2xl font-bold text-neutral-900">
              Dashboard Instructions
            </h2>
            <p className="mt-4 text-neutral-600">
              This is a modern, responsive dashboard UI. You can interact with various elements:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-neutral-600">
              <li>Toggle between light and dark modes using the sun/moon icon.</li>
              <li>Sort the user table by clicking on the "Name" column header.</li>
              <li>The layout is responsive and will adapt to different screen sizes.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
