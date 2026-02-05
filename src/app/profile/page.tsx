'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { getUserAssessments, deleteAssessment } from '@/lib/db';
import Link from 'next/link';
import { Brain, FileText, Calendar, User, LogOut, ArrowLeft, ArrowRight, Trash2 } from 'lucide-react';
import ConfirmationModal from '@/components/ConfirmationModal';

export default function ProfilePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [assessments, setAssessments] = useState<any[]>([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/');
                return;
            }
            setUser(user);

            // Fetch assessments
            const data = await getUserAssessments(user.id);
            setAssessments(data);
            setLoading(false);
        };

        checkUser();
    }, [router]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    const handleDeleteClick = (id: string) => {
        setSelectedDeleteId(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedDeleteId) return;

        const success = await deleteAssessment(selectedDeleteId);
        if (success) {
            setAssessments(assessments.filter(a => a.id !== selectedDeleteId));
            setDeleteModalOpen(false);
            setSelectedDeleteId(null);
        } else {
            alert('Failed to delete report. Please try again.');
            setDeleteModalOpen(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F9F9F7]">
                <div className="animate-pulse text-stone-400 font-mono text-sm">LOADING PROFILE...</div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#F9F9F7] text-stone-900 font-sans">
            <header className="bg-white border-b border-rose-100 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-rose-600 flex items-center justify-center text-white rounded-full group-hover:bg-rose-700 transition-colors">
                            <Brain size={16} />
                        </div>
                        <span className="font-serif font-bold text-lg text-rose-900">LoveMap</span>
                    </Link>
                    <button
                        onClick={handleSignOut}
                        className="text-xs font-mono text-stone-500 hover:text-rose-600 flex items-center gap-1"
                    >
                        <LogOut size={14} /> SIGN OUT
                    </button>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-rose-900 mb-2">My Reports</h1>
                        <p className="text-stone-500 text-sm break-all">
                            Account: <span className="font-mono text-stone-700">{user?.email}</span>
                        </p>
                    </div>
                    <Link
                        href="/questionnaire"
                        className="btn-clinical text-sm px-6 py-3 w-full md:w-auto text-center"
                    >
                        New Assessment
                    </Link>
                </div>

                {assessments.length === 0 ? (
                    <div className="report-card text-center py-12 bg-white border-dashed border-2 border-stone-200 shadow-none">
                        <FileText className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                        <h3 className="font-serif font-bold text-lg text-stone-700 mb-2">No Reports Yet</h3>
                        <p className="text-stone-500 text-sm mb-6 max-w-sm mx-auto">
                            You haven't generated any compatibility reports yet. Start a new assessment to see your relationship insights.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {assessments.map((item) => {
                            const p1 = item.partner1 || {};
                            const p2 = item.partner2 || {};
                            const date = p1.completedAt ? new Date(p1.completedAt).toLocaleDateString() : 'Unknown Date';
                            const title = p1.yourName ? `${p1.yourName} & ${p1.partnerName || 'Successor'}` : 'Untitled Report';

                            return (
                                <div
                                    key={item.id}
                                    className="report-card bg-white p-0 overflow-hidden flex hover:border-rose-300 transition-all group"
                                >
                                    <Link
                                        href={`/results?couple=${item.id}`}
                                        className="flex-1 p-4 md:p-6 flex justify-between items-center min-w-0"
                                    >
                                        <div className="flex items-start gap-3 md:gap-4 min-w-0">
                                            <div className="w-10 h-10 bg-rose-50 rounded-full flex-shrink-0 flex items-center justify-center text-rose-500 group-hover:bg-rose-100 group-hover:text-rose-600 transition-colors">
                                                <FileText size={20} />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="font-bold text-base md:text-lg text-stone-800 group-hover:text-rose-700 transition-colors truncate pr-2">
                                                    {title}
                                                </h3>
                                                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs font-mono text-stone-400 mt-1">
                                                    <span className="flex items-center gap-1 whitespace-nowrap">
                                                        <Calendar size={12} /> {date}
                                                    </span>
                                                    {p2.result ? (
                                                        <span className="text-green-600 flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                                                            Complete
                                                        </span>
                                                    ) : (
                                                        <span className="text-amber-600 flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                                                            Pending
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <ArrowRight className="text-stone-300 group-hover:text-rose-500 transition-colors ml-2 mr-2 flex-shrink-0" />
                                    </Link>
                                    <button
                                        onClick={() => handleDeleteClick(item.id)}
                                        className="px-4 md:px-6 border-l border-stone-100 flex items-center justify-center text-stone-300 hover:text-rose-600 hover:bg-rose-50 transition-all flex-shrink-0"
                                        title="Delete Report"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                <ConfirmationModal
                    isOpen={deleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                    title="Delete Report?"
                    message="Are you sure you want to delete this assessment? This action cannot be undone and you will lose access to the report permanently."
                    confirmLabel="Delete"
                    isDestructive={true}
                />
            </div>
        </main>
    );
}
