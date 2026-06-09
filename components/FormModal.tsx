"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { useModal } from "@/lib/modal";

type FormData = {
  nombre: string;
  apellido: string;
  email: string;
  empresa: string;
  equipo: string;
};

const initialForm: FormData = {
  nombre: "",
  apellido: "",
  email: "",
  empresa: "",
  equipo: "",
};

export default function FormModal() {
  const { modals, closeModal } = useModal();
  const open = modals.form;

  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  const set =
    (key: keyof FormData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit() {
    if (!form.email || !form.email.includes("@")) {
      emailRef.current?.focus();
      return;
    }

    // The API route already exists — this POST is wired but non-blocking, so the
    // success screen shows regardless of backend state. Swap the route's body to
    // send email / push to CRM / persist when ready.
    try {
      await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {
      /* ignore for now — success screen is enough */
    }

    setSubmitted(true);
  }

  return (
    <div
      className={`overlay${open ? " open" : ""}`}
      id="form-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal("form");
      }}
    >
      <div className="modal">
        <button className="modal-close" onClick={() => closeModal("form")}>
          <i className="ti ti-x" />
        </button>

        {!submitted ? (
          <div>
            <p className="modal-title">Solicitar demo</p>
            <p className="modal-sub">
              Te contactamos en menos de 24hs para coordinar una demo con datos
              reales.
            </p>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Nombre</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Felipe"
                  value={form.nombre}
                  onChange={set("nombre")}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Apellido</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="García"
                  value={form.apellido}
                  onChange={set("apellido")}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                ref={emailRef}
                className="form-input"
                type="email"
                placeholder="felipe@empresa.com"
                value={form.email}
                onChange={set("email")}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Empresa</label>
              <input
                className="form-input"
                type="text"
                placeholder="Distribuidora XYZ"
                value={form.empresa}
                onChange={set("empresa")}
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                ¿Cuántos vendedores tiene tu equipo?
              </label>
              <select
                className="form-input"
                style={{ cursor: "pointer" }}
                value={form.equipo}
                onChange={set("equipo")}
              >
                <option value="">Seleccioná</option>
                <option>1 a 5</option>
                <option>6 a 15</option>
                <option>16 a 30</option>
                <option>Más de 30</option>
              </select>
            </div>
            <button className="form-submit" onClick={handleSubmit}>
              Enviar solicitud →
            </button>
          </div>
        ) : (
          <div className="form-success">
            <i className="ti ti-circle-check" />
            <p>¡Solicitud recibida!</p>
            <span>
              Te vamos a contactar en menos de 24hs para coordinar la demo.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
