import React from "react";

export default function Footer() {
  return (
    <footer
      className="max-w-6xl mx-auto text-center text-neutral-500 py-6 border-t border-neutral-200 mt-auto"
      aria-label="Site Footer"
    >
      © {new Date().getFullYear()} BRR Media
    </footer>
  );
}
