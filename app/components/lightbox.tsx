"use client";

import { X } from "lucide-react";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Lightbox = ({ isOpen, onClose }: LightboxProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-lg rounded-xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-500 transition-colors hover:text-neutral-800"
          aria-label="Close instructions"
        >
          <X />
        </button>
        <h2 id="modal-title" className="text-2xl font-bold text-neutral-900">Dashboard Instructions</h2>
        <p className="mt-4 text-neutral-600">This is a modern, responsive dashboard UI. You can interact with various elements:</p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-neutral-600">
          <li>Toggle between light and dark modes using the sun/moon icon.</li>
          <li>Sort the user table by clicking on the "Name" column header.</li>
          <li>The layout is responsive and will adapt to different screen sizes.</li>
        </ul>
      </div>
    </div>
  );
};