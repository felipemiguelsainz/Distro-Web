"use client";

import type { ReactNode } from "react";
import { CursorProvider } from "@/lib/cursor";
import { ModalProvider } from "@/lib/modal";
import DemoModal from "@/components/DemoModal";
import FormModal from "@/components/FormModal";

/**
 * Client-side shell: mounts the custom cursor + modal contexts and renders the
 * two overlays once at the root so any section can open them.
 */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CursorProvider>
      <ModalProvider>
        {children}
        <DemoModal />
        <FormModal />
      </ModalProvider>
    </CursorProvider>
  );
}
