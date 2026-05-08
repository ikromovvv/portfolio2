import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    closeOnBackdropClick?: boolean;
    closeOnEsc?: boolean;
    className?: string;
};

export default function Modal({
                                  isOpen,
                                  onClose,
                                  children,
                                  closeOnBackdropClick = true,
                                  closeOnEsc = true,
                                  className = "",
                              }: ModalProps) {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const lastFocusedRef = useRef<Element | null>(null);

    useEffect(() => {
        if (!isOpen) return;
        lastFocusedRef.current = document.activeElement;
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKeyDown = (e: KeyboardEvent) => {
            if (closeOnEsc && e.key === "Escape") {
                e.stopPropagation();
                onClose();
            }
        };

        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            document.removeEventListener("keydown", onKeyDown);
            (lastFocusedRef.current as HTMLElement | null)?.focus?.();
        };
    }, [isOpen, closeOnEsc, onClose]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!closeOnBackdropClick) return;

        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black/50"
                    onClick={handleBackdropClick}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        ref={modalRef}
                        tabIndex={-1}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className={`relative z-10 max-h-[90vh] w-full max-w-2xl overflow-auto rounded-lg bg-white dark:bg-neutral-900 dark:text-white p-6 shadow-lg ${className}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

    );
}
