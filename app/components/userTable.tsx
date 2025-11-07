"use client";

import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { FC, useMemo, useState } from "react";

const avatarColors = [
  { bg: 'bg-sky-100', text: 'text-sky-700' },
  { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  { bg: 'bg-amber-100', text: 'text-amber-700' },
  { bg: 'bg-rose-100', text: 'text-rose-700' },
  { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  { bg: 'bg-pink-100', text: 'text-pink-700' },
  { bg: 'bg-purple-100', text: 'text-purple-700' },
  { bg: 'bg-teal-100', text: 'text-teal-700' },
  { bg: 'bg-cyan-100', text: 'text-cyan-700' },
  { bg: 'bg-lime-100', text: 'text-lime-700' },
];

const getRandomColor = () => {
  const index = Math.floor(Math.random() * avatarColors.length);
  return avatarColors[index];
};

const Avatar: FC<{ name: string }> = ({ name }) => {
  const getInitials = (name: string) => {
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const color = useMemo(() => getRandomColor(), []);

  return (
    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${color.bg} ${color.text}`}>
      {getInitials(name)}
    </div>
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

export const UserTable = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof typeof users[0] | null; direction: 'ascending' | 'descending' }>({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
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
    <div className="mt-8 overflow-x-auto rounded-4xl bg-white shadow-sm">
      <div className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
        <h3 className="text-xl font-semibold text-neutral-900">Users</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          <input type="text" placeholder="Search users by id, name or email" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full rounded-lg bg-neutral-100 py-2 pl-10 pr-4 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-72" />
        </div>
      </div>
      <table className="min-w-full text-left text-sm text-neutral-500">
        <thead className="border-b border-neutral-200">
          <tr>
            <th className="hidden px-6 py-4 font-medium sm:table-cell"><button onClick={() => requestSort('id')} className="flex items-center gap-1">ID <ArrowUpDown className="h-4 w-4" /></button></th>
            <th className="px-6 py-4 font-medium"><button onClick={() => requestSort('name')} className="flex items-center gap-1">User <ArrowUpDown className="h-4 w-4" /></button></th>
            <th className="hidden px-6 py-4 font-medium md:table-cell"><button onClick={() => requestSort('email')} className="flex items-center gap-1">Email <ArrowUpDown className="h-4 w-4" /></button></th>
            <th className="px-6 py-4 font-medium"><button onClick={() => requestSort('status')} className="flex items-center gap-1">Status <ArrowUpDown className="h-4 w-4" /></button></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200">
          {paginatedUsers.length > 0 ? (
            paginatedUsers.map((user) => (
              <tr key={user.id} className="text-neutral-800 transition-colors hover:bg-neutral-100/50">
                <td className="hidden px-6 py-4 font-mono text-xs sm:table-cell">{user.id}</td>
                <td className="px-6 py-4 font-medium"><div className="flex items-center gap-3"><Avatar name={user.name} /><span>{user.name}</span></div></td>
                <td className="hidden px-6 py-4 md:table-cell">{user.email}</td>
                <td className="px-6 py-4"><span className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold ${user.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-neutral-100 text-neutral-800"}`}>{user.status}</span></td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={4} className="py-12 text-center text-neutral-500">No users found.</td></tr>
          )}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="flex items-center justify-end border-t border-neutral-200 px-6 py-3 gap-4">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} aria-label="Previous page" className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 ring-1 ring-inset ring-neutral-300 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"><ChevronLeft className="h-5 w-5" /></button>
          <div className="text-sm text-neutral-600">Page {currentPage} of {totalPages}</div>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} aria-label="Next page" className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 ring-1 ring-inset ring-neutral-300 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"><ChevronRight className="h-5 w-5" /></button>
        </div>
      )}
    </div>
  );
};