"use client";
import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <nav className={`navbar ${menuOpen ? "active" : ""}`}>
        <Link href="/" className="active" onClick={() => setMenuOpen(false)}>Home</Link>
      </nav>
    </header>
  );
};

export default Header;