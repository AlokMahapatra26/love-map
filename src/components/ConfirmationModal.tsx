'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X, Trash2 } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    isDestructive?: boolean;
}

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    isDestructive = false
}: ConfirmationModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden"
                >
                    <div className="p-6 text-center">
                        <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${isDestructive ? 'bg-rose-100 text-rose-500' : 'bg-stone-100 text-stone-500'}`}>
                            {isDestructive ? <Trash2 size={24} /> : <AlertCircle size={24} />}
                        </div>
                        <h3 className="font-serif font-bold text-xl text-stone-900 mb-2">{title}</h3>
                        <p className="text-stone-600 text-sm leading-relaxed mb-6">
                            {message}
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                className="flex-1 px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-50 rounded-lg transition-colors"
                            >
                                {cancelLabel}
                            </button>
                            <button
                                onClick={onConfirm}
                                className={`flex-1 px-4 py-2 text-sm font-bold text-white rounded-lg shadow-sm transition-colors ${isDestructive
                                        ? 'bg-rose-600 hover:bg-rose-700'
                                        : 'bg-stone-900 hover:bg-stone-800'
                                    }`}
                            >
                                {confirmLabel}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
