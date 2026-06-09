"use client";

import Image from "next/image";
import { useModal } from "@/lib/modal";
import MagneticButton from "./MagneticButton";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const { openModal } = useModal();

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
        <button className="nav-link" onClick={() => scrollTo("features")}>
          Funcionalidades
        </button>
        <button className="nav-link" onClick={() => scrollTo("vendedores")}>
          Rendimiento
        </button>
        <button className="nav-link" onClick={() => scrollTo("industrias")}>
          Industrias
        </button>
      </div>
      <MagneticButton className="nav-cta" onClick={() => openModal("form")}>
        Solicitar demo
      </MagneticButton>
    </nav>
  );
}
