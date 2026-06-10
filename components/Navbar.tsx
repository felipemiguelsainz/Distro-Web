"use client";

import Image from "next/image";
import { useState } from "react";
import { useModal } from "@/lib/modal";
import MagneticButton from "./MagneticButton";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const LINKS = [
  { id: "features", label: "Funcionalidades" },
  { id: "vendedores", label: "Rendimiento" },
  { id: "industrias", label: "Industrias" },
];

export default function Navbar() {
  const { openModal } = useModal();
  const [menuOpen, setMenuOpen] = useState(false);

  function goTo(id: string) {
    setMenuOpen(false);
    scrollTo(id);
  }

  return (
    <nav>
      <a className="nav-logo" href="#">
        <Image
          src="/logo-distro.png"
          alt="Distro"
          width={28}
          height={28}
          priority
        />
        Distro
      </a>

      <div className="nav-links">
        {LINKS.map((l) => (
          <button
            key={l.id}
            className="nav-link"
            onClick={() => scrollTo(l.id)}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="nav-right">
        <MagneticButton className="nav-cta" onClick={() => openModal("form")}>
          Solicitar demo
        </MagneticButton>
        <button
          className={`nav-toggle${menuOpen ? " open" : ""}`}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`nav-mobile${menuOpen ? " open" : ""}`}>
        {LINKS.map((l) => (
          <button
            key={l.id}
            className="nav-mobile-link"
            onClick={() => goTo(l.id)}
          >
            {l.label}
          </button>
        ))}
        <button
          className="nav-mobile-cta"
          onClick={() => {
            setMenuOpen(false);
            openModal("form");
          }}
        >
          Solicitar demo →
        </button>
      </div>
    </nav>
  );
}
