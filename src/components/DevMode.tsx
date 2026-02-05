import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap } from 'lucide-react';
import { scenarioQuestions, AttachmentTendency } from '@/lib/data/scenario-questions';

interface DevModeProps {
    onFillAnswers: (answers: Record<number, string>) => void;
}

export function DevMode({ onFillAnswers }: DevModeProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'x') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const generateAnswers = (style: AttachmentTendency) => {
        const answers: Record<number, string> = {};

        scenarioQuestions.forEach(q => {
            // Find the option that matches the requested style
            // If multiple match (rare), take the first one
            // If none match (shouldn't happen), take a random one
            const option = q.options.find(o => o.tendency === style) || q.options[0];
            answers[q.id] = option.id;
        });

        onFillAnswers(answers);
        setIsOpen(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full border-2 border-rose-500"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2 text-rose-600 font-bold font-mono">
                                <Zap className="w-5 h-5" />
                                <span>DEV MODE: AUTO-FILL</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-rose-50 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-stone-400" />
                            </button>
                        </div>

                        <p className="mb-6 text-sm text-stone-600">
                            Select an attachment style to automatically fill all questionnaire answers according to that profile.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { id: 'secure', label: 'Secure', color: 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200' },
                                { id: 'anxious', label: 'Anxious', color: 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200' },
                                { id: 'avoidant', label: 'Avoidant', color: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200' },
                                { id: 'disorganized', label: 'Disorganized', color: 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200' }
                            ].map((style) => (
                                <button
                                    key={style.id}
                                    onClick={() => generateAnswers(style.id as AttachmentTendency)}
                                    className={`p-4 rounded-lg border font-bold text-sm transition-all shadow-sm hover:shadow-md active:scale-95 ${style.color}`}
                                >
                                    {style.label}
                                </button>
                            ))}
                        </div>

                        <div className="mt-6 pt-4 border-t border-stone-100 text-xs text-center text-stone-400 font-mono">
                            Press ESC or Ctrl+X to close
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
