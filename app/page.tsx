"use client";
import { useState, useEffect } from "react";
import { DashboardMetrics } from "./components/cards";
import { Header } from "./components/header";
import { Lightbox } from "./components/lightbox";
import { UserTable } from "./components/userTable";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#f2f7f8] font-sans">
      <Header onInfoClick={() => setIsModalOpen(true)} />

      <main className="flex-1 p-6">
        <DashboardMetrics />
        <UserTable />
      </main>

      <Lightbox isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
