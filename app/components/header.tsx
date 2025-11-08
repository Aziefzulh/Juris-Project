"use client";

import { Bell, Info, Search, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface HeaderProps {
  onInfoClick: () => void;
}

export const Header = ({ onInfoClick }: HeaderProps) => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isMobileSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isMobileSearchOpen]);

  return (
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
            {/* <div className="hidden flex-1 max-w-md lg:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full rounded-lg bg-neutral-100 py-2 pl-10 pr-4 text-sm text-neutral-900 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div> */}
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

          <div className="flex items-center gap-2">
            <button onClick={() => setIsMobileSearchOpen(true)} aria-label="Open search" className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-200/75 hover:text-neutral-800 lg:hidden">
              <Search size={20} />
            </button>
            <button
              onClick={onInfoClick}
              aria-label="Show instructions"
              className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-200/75 hover:text-neutral-800 cursor-pointer"
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
  );
};