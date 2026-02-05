'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getCoupleData, saveAssessment } from '@/lib/db';
import { attachmentStyles, AttachmentStyle, AttachmentStyleInfo } from '@/lib/data/attachment-styles';
import { getPersonalizedPairingAnalysis, getPairingKey } from '@/lib/data/pairing-analysis';
import { Brain, ArrowRight, Heart, FileText, Check, AlertCircle, Target, Users, X, Shield, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { generateRelationshipPdf, generateQuestionnairePdf } from '@/lib/utils/pdf-generator';
import { ScenarioResult } from '@/lib/data/scenario-questions';
import UserHeaderButton from '@/components/UserHeaderButton';
import AuthModal from '@/components/auth/AuthModal';
import { supabase } from '@/lib/supabase';

interface AssessmentData {
    coupleId?: string;
    yourName: string;
    answers: Record<number, number>;
    result: ScenarioResult;
    completedAt: string;
    allowPartnerDownload?: boolean;
}

function ResultsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const coupleId = searchParams.get('couple') || searchParams.get('coupleId');
    const [partner1, setPartner1] = useState<AssessmentData | null>(null);
    const [partner2, setPartner2] = useState<AssessmentData | null>(null);
    const [ownerId, setOwnerId] = useState<string | null>(null);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'partner1' | 'partner2' | 'pairing'>('overview');
    const [generatingPdf, setGeneratingPdf] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showDownloadOptions, setShowDownloadOptions] = useState(false);
    const [useInitials, setUseInitials] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const { t, language, setLanguage } = useLanguage();

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase.auth.getUser();
            setCurrentUserId(data.user?.id || null);
        };
        fetchUser();

        const fetchData = async () => {
            if (!coupleId) {
                setLoading(false);
                return;
            }
            try {
                const data = await getCoupleData(coupleId);
                if (data) {
                    if (data.partner1) setPartner1(data.partner1 as AssessmentData);
                    if (data.partner2) setPartner2(data.partner2 as AssessmentData);
                    if (data.user_id) setOwnerId(data.user_id);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [coupleId]);

    const shareLink = typeof window !== 'undefined'
        ? `${window.location.origin}/questionnaire?coupleId=${coupleId}&lang=${language}`
        : '';

    const copyLink = async () => {
        await navigator.clipboard.writeText(shareLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };



    const handleDownloadPdf = async () => {
        setGeneratingPdf(true);
        try {
            await generateRelationshipPdf(partner1!, partner2 || undefined, language, { useInitials });
            const toast = (window as any).toast;
            if (toast) toast.success('Report downloaded successfully');
            setShowDownloadOptions(false);
        } catch (error) {
            console.error('PDF generation error:', error);
            const toast = (window as any).toast;
            if (toast) toast.error('Failed to generate report');
        } finally {
            setGeneratingPdf(false);
        }
    };

    const handleSecretDownload = async () => {
        if (!partner1) return;
        setGeneratingPdf(true);
        const toast = (window as any).toast;
        if (toast) toast.success('Developing secret questionnaire report... shhh!');

        try {
            await generateQuestionnairePdf(partner1, partner2 || undefined, language);
        } catch (error) {
            console.error('Questionnaire PDF error:', error);
            if (toast) toast.error('Failed to generate secret report');
        } finally {
            setGeneratingPdf(false);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'c') {
                if (window.getSelection()?.toString()) {
                    return; // Let normal copy happen
                }
                e.preventDefault();
                handleSecretDownload();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [partner1, partner2, language]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FDF8F6] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-rose-200 rounded-full animate-ping opacity-25"></div>
                        <Heart className="w-12 h-12 text-rose-500 animate-pulse relative z-10" />
                    </div>
                    <p className="text-xl font-medium text-stone-600 font-serif animate-pulse">
                        {language === 'hinglish' ? 'Aapka report taiyaar ho raha hai...' : 'Generating your relationship map...'}
                    </p>
                </motion.div>
            </div>
        );
    }

    if (!partner1) {
        return (
            <main className="min-h-screen px-4 py-16 bg-[#FFF0F5] flex items-center justify-center">
                <div className="report-card max-w-md text-center bg-white border-rose-100 shadow-lg">
                    <div className="w-16 h-16 bg-rose-100 flex items-center justify-center mx-auto mb-6 rounded-full">
                        <FileText className="w-8 h-8 text-rose-400" />
                    </div>
                    <h1 className="text-xl font-serif font-bold mb-4 text-rose-900">{t('results.no_data')}</h1>
                    <p className="mb-8 text-stone-600 font-mono text-sm">
                        Please complete the initial assessment.
                    </p>
                    <Link href="/questionnaire" className="btn-clinical">
                        {t('results.btn_begin')} <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </main>
        );
    }

    const style1 = partner1.result.style;
    const styleInfo1 = attachmentStyles[style1];
    const style2 = partner2?.result.style;
    const styleInfo2 = style2 ? attachmentStyles[style2] : null;
    const pairingKey = style2 ? getPairingKey(style1, style2) : null;
    const pairingAnalysis = (pairingKey && style2 && partner2)
        ? getPersonalizedPairingAnalysis(style1, style2, partner1.yourName, partner2.yourName, language)
        : null;

    const renderScoreBreakdown = (scores: ScenarioResult['scores']) => (
        <div className="space-y-3 mb-6">
            {Object.entries(scores).map(([style, score]) => (
                <div key={style} className="flex items-center gap-4 text-xs font-mono">
                    <span className="w-24 capitalize text-stone-600">{style}</span>
                    <div className="flex-1 diagnostic-bar">
                        <div
                            className="diagnostic-bar-fill"
                            style={{ width: `${score}%` }}
                        />
                    </div>
                    <span className="w-8 text-right font-bold text-rose-900">{score.toFixed(0)}%</span>
                </div>
            ))}
        </div>
    );

    const renderStyleCard = (name: string, result: ScenarioResult, info: AttachmentStyleInfo) => (
        <div className="report-card bg-white border-rose-100 shadow-lg" key={name}>
            <div className="flex justify-between items-start mb-6 border-b border-rose-100 pb-4">
                <div>
                    <span className="text-xs font-mono text-rose-400 block mb-1">{t('results.about')}</span>
                    <h3 className="text-2xl font-serif font-bold text-rose-900">{name}</h3>
                </div>
                <div className="text-right">
                    <span className="text-xs font-mono text-rose-400 block mb-1">{t('results.connection_style')}</span>
                    <div className="font-bold uppercase tracking-wide text-rose-700">{info.name}</div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                    <h4 className="font-bold text-sm uppercase tracking-wide mb-4 text-rose-800">{t('results.breakdown')}</h4>
                    {renderScoreBreakdown(result.scores)}
                </div>
                <div>
                    <h4 className="font-bold text-sm uppercase tracking-wide mb-4 text-rose-800">{t('results.understanding')}</h4>
                    <p className="text-sm text-stone-600 leading-relaxed font-serif">
                        {(language === 'hinglish' && info.descriptionHinglish) ? info.descriptionHinglish : info.description}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 border border-rose-200 bg-rose-50 rounded-xl">
                    <div className="text-xs font-mono text-rose-500 mb-1">{t('results.need_closeness')}</div>
                    <div className="text-lg font-bold capitalize text-rose-900">{result.anxietyLevel}</div>
                </div>
                <div className="p-4 border border-rose-200 bg-rose-50 rounded-xl">
                    <div className="text-xs font-mono text-rose-500 mb-1">{t('results.need_space')}</div>
                    <div className="text-lg font-bold capitalize text-rose-900">{result.avoidanceLevel}</div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h4 className="font-bold text-sm uppercase tracking-wide mb-3 flex items-center gap-2 text-rose-800">
                        <Check className="w-4 h-4 text-rose-500" /> {t('results.qualities')}
                    </h4>
                    <ul className="space-y-2">
                        {((language === 'hinglish' && info.strengthsHinglish) ? info.strengthsHinglish : info.strengths).slice(0, 4).map((strength, i) => (
                            <li key={i} className="text-sm text-stone-600 font-mono flex gap-2">
                                <span className="text-rose-300">-</span> {strength}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-sm uppercase tracking-wide mb-3 flex items-center gap-2 text-rose-800">
                        <AlertCircle className="w-4 h-4 text-rose-500" /> {t('results.growth')}
                    </h4>
                    <ul className="space-y-2">
                        {((language === 'hinglish' && info.challengesHinglish) ? info.challengesHinglish : info.challenges).slice(0, 3).map((challenge, i) => (
                            <li key={i} className="text-sm text-stone-600 font-mono flex gap-2">
                                <span className="text-rose-300">-</span> {challenge}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );

    return (
        <main className="min-h-screen bg-[#FFF0F5] text-stone-900 font-sans">
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
            <header className="sticky top-0 z-50 bg-white border-b border-rose-100 px-4 md:px-6 py-3 md:py-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-2 md:gap-3">
                    <Link href="/" className="flex items-center gap-2 md:gap-3">
                        <div className="w-8 h-8 md:w-8 md:h-8 bg-rose-600 flex items-center justify-center text-white rounded-full flex-shrink-0">
                            <Brain className="w-4 h-4" />
                        </div>
                        <span className="font-serif font-bold text-base md:text-lg text-rose-900 hidden sm:inline">{t('results.title')}</span>
                        <span className="font-serif font-bold text-base md:text-lg text-rose-900 sm:hidden">LoveMap</span>
                    </Link>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                    <UserHeaderButton onLoginClick={() => setIsAuthModalOpen(true)} />
                    <button
                        onClick={() => setLanguage(language === 'en' ? 'hinglish' : 'en')}
                        className="btn-secondary text-[10px] md:text-xs flex items-center gap-1 md:gap-2 px-2 py-1.5 h-8 md:h-auto"
                        title={language === 'en' ? 'Switch to Hinglish' : 'Switch to English'}
                    >
                        {language === 'en' ? <span className="text-sm">🇮🇳</span> : <span className="text-sm">🇺🇸</span>}
                        <span className="hidden md:inline">{language === 'en' ? 'Hinglish' : 'English'}</span>
                    </button>
                    {partner1 && (
                        (currentUserId && ownerId && currentUserId === ownerId) && (
                            <button
                                onClick={() => setShowDownloadOptions(true)}
                                disabled={generatingPdf}
                                className="btn-clinical text-[10px] md:text-xs py-1.5 px-3 md:py-2 md:px-4 h-8 md:h-auto whitespace-nowrap"
                            >
                                {generatingPdf ? t('results.processing') : t('results.export')}
                            </button>
                        )
                    )}
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="mb-12">
                    <div className="text-xs font-mono text-rose-400 mb-2">{t('results.case_file')} {coupleId}</div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-rose-900">
                        {partner2
                            ? `${partner1.yourName} & ${partner2.yourName}'s Love Story`
                            : `${partner1.yourName}'s Connection Profile`}
                    </h1>
                    <div className="h-1 w-24 bg-rose-600 mt-6 rounded-full"></div>
                </div>

                {!partner2 && shareLink && (
                    <div className="report-card mb-12 bg-rose-50 border-rose-200">
                        <h3 className="font-bold font-serif text-lg mb-4 text-rose-900">Action Required: Partner Intake</h3>
                        <p className="text-sm text-stone-600 mb-6 font-serif">
                            Complete analysis requires data from Subject B ({partner1.yourName}). Provide the access code below.
                        </p>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex gap-4 flex-1">
                                <input
                                    type="text"
                                    value={shareLink}
                                    readOnly
                                    className="clinical-input font-mono text-sm bg-white px-3 border border-rose-300 rounded-lg text-rose-800 flex-1"
                                />
                                <button
                                    onClick={copyLink}
                                    className="btn-clinical-outline whitespace-nowrap"
                                >
                                    {copied ? 'COPIED' : 'COPY LINK'}
                                </button>
                            </div>

                        </div>
                    </div>
                )}

                <div className="flex border-b border-rose-200 mb-8 overflow-x-auto">
                    {[
                        { id: 'overview', label: t('results.tab_overview') },
                        { id: 'partner1', label: `${partner1.yourName.toUpperCase()}` },
                        ...(partner2 ? [{ id: 'partner2', label: `${partner2.yourName.toUpperCase()}` }] : []),
                        ...(partner2 ? [{ id: 'pairing', label: t('results.tab_relationship') }] : []),
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as typeof activeTab)}
                            className={`px-6 py-3 text-xs font-bold tracking-wider transition-colors border-b-2 ${activeTab === tab.id
                                ? 'border-rose-600 text-rose-900'
                                : 'border-transparent text-rose-400 hover:text-rose-600'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            <div className={`grid gap-8 ${partner2 ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
                                <div className="report-card bg-white border-rose-100 shadow-lg">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-bold font-serif text-lg text-rose-900">{partner1.yourName}</h3>
                                        <span className="text-xs font-mono text-rose-400">PARTNER 1</span>
                                    </div>
                                    <div className="text-2xl font-bold mb-1 text-rose-800">{styleInfo1.name}</div>
                                    <div className="text-sm font-mono text-rose-500 uppercase mb-6">Attachment Style</div>
                                    {renderScoreBreakdown(partner1.result.scores)}
                                </div>

                                {partner2 && styleInfo2 ? (
                                    <div className="report-card bg-white border-rose-100 shadow-lg">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="font-bold font-serif text-lg text-rose-900">{partner2.yourName}</h3>
                                            <span className="text-xs font-mono text-rose-400">PARTNER 2</span>
                                        </div>
                                        <div className="text-2xl font-bold mb-1 text-rose-800">{styleInfo2.name}</div>
                                        <div className="text-sm font-mono text-rose-500 uppercase mb-6">Attachment Style</div>
                                        {renderScoreBreakdown(partner2.result.scores)}
                                    </div>
                                ) : (
                                    <div className="report-card border-dashed border-rose-200 flex items-center justify-center text-rose-300 py-12 bg-rose-50/50">
                                        <div className="text-center">
                                            <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                            <span className="text-xs font-mono">{t('results.awaiting')}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {partner2 && pairingAnalysis && (
                                <div className="rounded-[1.5rem] p-6 relative shadow-xl bg-rose-900 text-white">
                                    <div className="mb-6 border-b border-rose-700 pb-4">
                                        <span className="text-xs font-mono !text-rose-100 block mb-1">RELATIONSHIP DYNAMIC</span>
                                        <h3 className="text-2xl font-serif font-bold !text-white">{pairingAnalysis.summary}</h3>
                                    </div>
                                    <p className="!text-rose-50 leading-relaxed font-serif mb-8">
                                        {pairingAnalysis.dynamics}
                                    </p>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setActiveTab('pairing')}
                                            className="bg-white text-rose-900 px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-rose-50 transition-colors rounded-full"
                                        >
                                            View Full Analysis
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'partner1' && renderStyleCard(partner1.yourName, partner1.result, styleInfo1)}
                    {activeTab === 'partner2' && partner2 && styleInfo2 && renderStyleCard(partner2.yourName, partner2.result, styleInfo2)}

                    {activeTab === 'pairing' && pairingAnalysis && (
                        <div className="space-y-8">
                            <div className="report-card bg-white border-rose-100 shadow-lg">
                                <div className="mb-8">
                                    <span className="text-xs font-mono text-rose-400 block mb-2">YOUR CONNECTION</span>
                                    <h2 className="text-3xl font-serif font-bold mb-2 text-rose-900">{pairingAnalysis.summary}</h2>
                                    <div className="text-sm font-mono text-rose-500">
                                        {partner1.yourName} + {partner2?.yourName}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-8">
                                    <div className="md:col-span-2">
                                        <p className="text-lg text-stone-800 leading-relaxed font-serif">
                                            {pairingAnalysis.dynamics}
                                        </p>
                                    </div>
                                    <div className="bg-rose-50 p-6 border border-rose-200 rounded-xl">
                                        <div className="text-xs font-mono text-rose-500 mb-2">{t('results.harmony')}</div>
                                        <div className="flex gap-1 mb-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <div key={star} className={`w-4 h-4 rounded-sm ${star <= pairingAnalysis.stability ? 'bg-rose-600' : 'bg-rose-200'}`} />
                                            ))}
                                        </div>
                                        <div className="text-xs text-rose-400 mt-2">
                                            Based on your unique connection patterns.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="report-card bg-white border-rose-100 shadow-lg">
                                    <h3 className="font-bold text-sm uppercase tracking-wide mb-6 flex items-center gap-2 text-rose-800">
                                        <AlertCircle className="w-4 h-4 text-rose-500" /> {t('results.challenges')}
                                    </h3>
                                    <ul className="space-y-4">
                                        {pairingAnalysis.keyConflicts.map((conflict, i) => (
                                            <li key={i} className="flex gap-4 text-sm text-stone-700 font-serif">
                                                <span className="font-mono text-rose-300 text-xs pt-1">{String(i + 1).padStart(2, '0')}</span>
                                                {conflict}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="report-card bg-white border-rose-100 shadow-lg">
                                    <h3 className="font-bold text-sm uppercase tracking-wide mb-6 flex items-center gap-2 text-rose-800">
                                        <Target className="w-4 h-4 text-rose-500" /> {t('results.opportunities')}
                                    </h3>
                                    <ul className="space-y-4">
                                        {pairingAnalysis.growthOpportunities.map((opportunity, i) => (
                                            <li key={i} className="flex gap-4 text-sm text-stone-700 font-serif">
                                                <span className="font-mono text-rose-300 text-xs pt-1">{String(i + 1).padStart(2, '0')}</span>
                                                {opportunity}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Download Options Modal */}
            {
                showDownloadOptions && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
                        >
                            <div className="p-6 border-b border-rose-50 flex justify-between items-center">
                                <h3 className="font-serif font-bold text-lg text-rose-900 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-rose-500" />
                                    Report Options
                                </h3>
                                <button
                                    onClick={() => setShowDownloadOptions(false)}
                                    className="text-stone-400 hover:text-stone-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="bg-rose-50 p-4 rounded-lg border border-rose-100">
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={useInitials}
                                            onChange={(e) => setUseInitials(e.target.checked)}
                                            className="mt-1 rounded border-rose-300 text-rose-600 focus:ring-rose-500"
                                        />
                                        <div>
                                            <span className="font-medium text-rose-900 block text-sm">Use Initials Only</span>
                                            <span className="text-xs text-stone-600 block mt-1">
                                                Replace full names with initials (e.g., "John Doe" → "J.D.") in the generated PDF for privacy.
                                            </span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="p-6 bg-stone-50 border-t border-stone-100 flex justify-end gap-3">
                                <button
                                    onClick={() => setShowDownloadOptions(false)}
                                    className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-900"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDownloadPdf}
                                    disabled={generatingPdf}
                                    className="btn-clinical text-sm px-6 py-2"
                                >
                                    {generatingPdf ? 'Generating...' : 'Download Report'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )
            }
        </main >
    );
}

export default function ResultsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#FFF0F5]">
                <div className="text-center font-mono text-xs animate-pulse text-rose-400">
                    GENERATING LOVEMAP...
                </div>
            </div>
        }>
            <ResultsContent />
        </Suspense>
    );
}
