"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ModalId = "demo" | "form";

type ModalState = Record<ModalId, boolean>;

type ModalContextValue = {
  modals: ModalState;
  openModal: (id: ModalId) => void;
  closeModal: (id: ModalId) => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within a ModalProvider");
  return ctx;
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modals, setModals] = useState<ModalState>({ demo: false, form: false });

  const openModal = useCallback(
    (id: ModalId) => setModals((m) => ({ ...m, [id]: true })),
    [],
  );
  const closeModal = useCallback(
    (id: ModalId) => setModals((m) => ({ ...m, [id]: false })),
    [],
  );

  // Esc closes any open modal — same as the original keydown handler.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModals({ demo: false, form: false });
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}
