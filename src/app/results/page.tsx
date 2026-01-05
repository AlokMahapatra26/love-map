'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Copy,
    Check,
    AlertCircle,
    Target,
    Shield,
    MessageCircle,
    Download,
    FileText,
    Brain,
    Activity,
    Clipboard,
    Scale,
    User,
    Users
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { attachmentStyles } from '@/lib/data/attachment-styles';
import { ScenarioResult } from '@/lib/data/scenario-questions';
import {
    getPairingKey,
    pairingAnalyses,
    getPersonalizedPairingAnalysis,
    getStrategiesForPairing,
    Strategy
} from '@/lib/data/pairing-analysis';
import { getCoupleData } from '@/lib/db';

interface AssessmentData {
    coupleId?: string;
    yourName: string;
    partnerName: string;
    answers: Record<number, string>;
    result: ScenarioResult;
    completedAt: string;
}

function ResultsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [partner1, setPartner1] = useState<AssessmentData | null>(null);
    const [partner2, setPartner2] = useState<AssessmentData | null>(null);
    const [copied, setCopied] = useState(false);
    const [coupleId, setCoupleId] = useState<string>('');
    const [activeTab, setActiveTab] = useState<'overview' | 'partner1' | 'partner2' | 'pairing' | 'strategies'>('overview');
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

    useEffect(() => {
        const urlCoupleId = searchParams.get('couple');
        const storedCoupleId = localStorage.getItem('lovemap_current_couple');
        const currentCoupleId = urlCoupleId || storedCoupleId || '';

        setCoupleId(currentCoupleId);

        if (currentCoupleId) {
            const p1 = localStorage.getItem(`lovemap_couple_${currentCoupleId}_partner1`);
            const p2 = localStorage.getItem(`lovemap_couple_${currentCoupleId}_partner2`);

            if (p1) setPartner1(JSON.parse(p1));
            if (p2) setPartner2(JSON.parse(p2));

            // Fetch from DB
            getCoupleData(currentCoupleId).then(couple => {
                if (couple) {
                    if (couple.partner1) {
                        setPartner1(couple.partner1);
                        localStorage.setItem(`lovemap_couple_${currentCoupleId}_partner1`, JSON.stringify(couple.partner1));
                    }
                    if (couple.partner2) {
                        setPartner2(couple.partner2);
                        localStorage.setItem(`lovemap_couple_${currentCoupleId}_partner2`, JSON.stringify(couple.partner2));
                    }
                }
            });
        } else {
            const p1 = localStorage.getItem('lovemap_partner1');
            const p2 = localStorage.getItem('lovemap_partner2');

            if (p1) setPartner1(JSON.parse(p1));
            if (p2) setPartner2(JSON.parse(p2));
        }
    }, [searchParams]);

    const shareLink = typeof window !== 'undefined' && coupleId
        ? `${window.location.origin}/questionnaire?couple=${coupleId}`
        : '';

    const copyLink = async () => {
        await navigator.clipboard.writeText(shareLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const resetAssessments = () => {
        if (coupleId) {
            localStorage.removeItem(`lovemap_couple_${coupleId}_partner1`);
            localStorage.removeItem(`lovemap_couple_${coupleId}_partner2`);
        }
        localStorage.removeItem('lovemap_partner1');
        localStorage.removeItem('lovemap_partner2');
        localStorage.removeItem('lovemap_current_couple');
        router.push('/questionnaire');
    };

    const handleDownloadPdf = async () => {
        setIsGeneratingPdf(true);
        try {
            const { generateRelationshipPdf } = await import('@/lib/utils/pdf-generator');
            const p1Data = {
                coupleId: partner1!.coupleId,
                partnerName: partner1!.yourName,
                answers: partner1!.answers as unknown as Record<number, number>,
                result: {
                    style: partner1!.result.style,
                    anxietyScore: partner1!.result.anxietyLevel === 'high' ? 5 : partner1!.result.anxietyLevel === 'moderate' ? 3.5 : 2,
                    avoidanceScore: partner1!.result.avoidanceLevel === 'high' ? 5 : partner1!.result.avoidanceLevel === 'moderate' ? 3.5 : 2,
                    anxietyLevel: partner1!.result.anxietyLevel,
                    avoidanceLevel: partner1!.result.avoidanceLevel,
                },
                completedAt: partner1!.completedAt,
            };

            const p2Data = partner2 ? {
                coupleId: partner2.coupleId,
                partnerName: partner2.yourName,
                answers: partner2.answers as unknown as Record<number, number>,
                result: {
                    style: partner2.result.style,
                    anxietyScore: partner2.result.anxietyLevel === 'high' ? 5 : partner2.result.anxietyLevel === 'moderate' ? 3.5 : 2,
                    avoidanceScore: partner2.result.avoidanceLevel === 'high' ? 5 : partner2.result.avoidanceLevel === 'moderate' ? 3.5 : 2,
                    anxietyLevel: partner2.result.anxietyLevel,
                    avoidanceLevel: partner2.result.avoidanceLevel,
                },
                completedAt: partner2.completedAt,
            } : undefined;

            await generateRelationshipPdf(p1Data, p2Data);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
        } finally {
            setIsGeneratingPdf(false);
        }
    };

    if (!partner1) {
        return (
            <main className="min-h-screen px-4 py-16 bg-[#FFF0F5] flex items-center justify-center">
                <div className="report-card max-w-md text-center bg-white border-rose-100 shadow-lg">
                    <div className="w-16 h-16 bg-rose-100 flex items-center justify-center mx-auto mb-6 rounded-full">
                        <FileText className="w-8 h-8 text-rose-400" />
                    </div>
                    <h1 className="text-xl font-serif font-bold mb-4 text-rose-900">No Diagnostic Data</h1>
                    <p className="mb-8 text-stone-600 font-mono text-sm">
                        Please complete the initial assessment protocol.
                    </p>
                    <Link href="/questionnaire" className="btn-clinical">
                        Begin Assessment <ArrowRight className="w-4 h-4" />
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
        ? getPersonalizedPairingAnalysis(style1, style2, partner1.yourName, partner2.yourName)
        : null;
    const strategies = style2 ? getStrategiesForPairing(style1, style2) : null;

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

    const renderStyleCard = (name: string, result: ScenarioResult, info: typeof styleInfo1) => (
        <div className="report-card bg-white border-rose-100 shadow-lg">
            <div className="flex justify-between items-start mb-6 border-b border-rose-100 pb-4">
                <div>
                    <span className="text-xs font-mono text-rose-400 block mb-1">ABOUT</span>
                    <h3 className="text-2xl font-serif font-bold text-rose-900">{name}</h3>
                </div>
                <div className="text-right">
                    <span className="text-xs font-mono text-rose-400 block mb-1">CONNECTION STYLE</span>
                    <div className="font-bold uppercase tracking-wide text-rose-700">{info.name}</div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                    <h4 className="font-bold text-sm uppercase tracking-wide mb-4 text-rose-800">Score Breakdown</h4>
                    {renderScoreBreakdown(result.scores)}
                </div>
                <div>
                    <h4 className="font-bold text-sm uppercase tracking-wide mb-4 text-rose-800">Understanding You</h4>
                    <p className="text-sm text-stone-600 leading-relaxed font-serif">
                        {info.description}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 border border-rose-200 bg-rose-50 rounded-xl">
                    <div className="text-xs font-mono text-rose-500 mb-1">NEED FOR CLOSENESS</div>
                    <div className="text-lg font-bold capitalize text-rose-900">{result.anxietyLevel}</div>
                </div>
                <div className="p-4 border border-rose-200 bg-rose-50 rounded-xl">
                    <div className="text-xs font-mono text-rose-500 mb-1">NEED FOR SPACE</div>
                    <div className="text-lg font-bold capitalize text-rose-900">{result.avoidanceLevel}</div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h4 className="font-bold text-sm uppercase tracking-wide mb-3 flex items-center gap-2 text-rose-800">
                        <Check className="w-4 h-4 text-rose-500" /> Beautiful Qualities
                    </h4>
                    <ul className="space-y-2">
                        {info.strengths.slice(0, 4).map((strength, i) => (
                            <li key={i} className="text-sm text-stone-600 font-mono flex gap-2">
                                <span className="text-rose-300">-</span> {strength}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-sm uppercase tracking-wide mb-3 flex items-center gap-2 text-rose-800">
                        <AlertCircle className="w-4 h-4 text-rose-500" /> Growth Areas
                    </h4>
                    <ul className="space-y-2">
                        {info.challenges.slice(0, 3).map((challenge, i) => (
                            <li key={i} className="text-sm text-stone-600 font-mono flex gap-2">
                                <span className="text-rose-300">-</span> {challenge}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );

    const renderStrategyCard = (strategy: Strategy) => (
        <div key={strategy.id} className="border border-rose-200 p-6 mb-4 bg-white hover:bg-rose-50 transition-colors rounded-xl shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold font-serif text-lg text-rose-900">{strategy.title}</h4>
                <span className="text-xs font-mono uppercase border border-rose-200 text-rose-500 px-2 py-1 rounded-full">
                    {strategy.category}
                </span>
            </div>
            <p className="text-sm text-stone-600 mb-4 leading-relaxed font-serif">
                {strategy.description}
            </p>
            <div className="bg-rose-50 p-4 border border-rose-100 rounded-lg">
                <h5 className="text-xs font-bold uppercase mb-3 text-rose-800">How to Do It:</h5>
                <ol className="space-y-2 font-mono text-xs">
                    {strategy.howTo.map((step, i) => (
                        <li key={i} className="flex gap-3">
                            <span className="text-rose-400">{String(i + 1).padStart(2, '0')}.</span>
                            <span className="text-stone-700">{step}</span>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );

    return (
        <main className="min-h-screen bg-[#FFF0F5] text-stone-900 font-sans">
            <header className="sticky top-0 z-50 bg-white border-b border-rose-100 px-6 py-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-rose-600 flex items-center justify-center text-white rounded-full">
                        <Brain className="w-4 h-4" />
                    </div>
                    <span className="font-serif font-bold text-lg text-rose-900">Diagnostic Report</span>
                </div>
                <div className="flex items-center gap-4">
                    {partner1 && (
                        <button
                            onClick={handleDownloadPdf}
                            disabled={isGeneratingPdf}
                            className="btn-clinical text-xs py-2 px-4"
                        >
                            {isGeneratingPdf ? 'PROCESSING...' : 'EXPORT PDF'}
                        </button>
                    )}
                    <button
                        onClick={resetAssessments}
                        className="text-xs font-mono text-rose-400 hover:text-rose-600"
                    >
                        [RESET]
                    </button>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="mb-12">
                    <div className="text-xs font-mono text-rose-400 mb-2">CASE FILE: {coupleId}</div>
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
                            Complete analysis requires data from Subject B ({partner1.partnerName}). Provide the access code below.
                        </p>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={shareLink}
                                readOnly
                                className="clinical-input font-mono text-sm bg-white px-3 border border-rose-300 rounded-lg text-rose-800"
                            />
                            <button
                                onClick={copyLink}
                                className="btn-clinical-outline whitespace-nowrap"
                            >
                                {copied ? 'COPIED' : 'COPY LINK'}
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex border-b border-rose-200 mb-8 overflow-x-auto">
                    {[
                        { id: 'overview', label: 'OVERVIEW' },
                        { id: 'partner1', label: `${partner1.yourName.toUpperCase()}` },
                        ...(partner2 ? [{ id: 'partner2', label: `${partner2.yourName.toUpperCase()}` }] : []),
                        ...(partner2 ? [{ id: 'pairing', label: 'YOUR RELATIONSHIP' }] : []),
                        ...(partner2 ? [{ id: 'strategies', label: 'GROWING TOGETHER' }] : []),
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
                                            <span className="text-xs font-mono">AWAITING PARTNER DATA</span>
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
                                        <div className="text-xs font-mono text-rose-500 mb-2">HARMONY LEVEL</div>
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
                                        <AlertCircle className="w-4 h-4 text-rose-500" /> Challenges to Navigate
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
                                        <Target className="w-4 h-4 text-rose-500" /> Opportunities to Grow Together
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

                    {activeTab === 'strategies' && strategies && (
                        <div className="space-y-12">
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-px bg-rose-200 flex-1"></div>
                                    <h3 className="font-bold font-mono text-sm uppercase text-rose-800">Tips for {partner1.yourName}</h3>
                                    <div className="h-px bg-rose-200 flex-1"></div>
                                </div>
                                {strategies.forPartner1.map(renderStrategyCard)}
                            </div>

                            {partner2 && (
                                <div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="h-px bg-rose-200 flex-1"></div>
                                        <h3 className="font-bold font-mono text-sm uppercase text-rose-800">Tips for {partner2.yourName}</h3>
                                        <div className="h-px bg-rose-200 flex-1"></div>
                                    </div>
                                    {strategies.forPartner2.map(renderStrategyCard)}
                                </div>
                            )}

                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-px bg-rose-200 flex-1"></div>
                                    <h3 className="font-bold font-mono text-sm uppercase text-rose-800">Tips for Both of You ♥</h3>
                                    <div className="h-px bg-rose-200 flex-1"></div>
                                </div>
                                {strategies.forCouple.map(renderStrategyCard)}
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </main>
    );
}

export default function ResultsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#FFF0F5]">
                <div className="text-center font-mono text-xs animate-pulse text-rose-400">
                    INITIALIZING DIAGNOSTIC ENGINE...
                </div>
            </div>
        }>
            <ResultsContent />
        </Suspense>
    );
}
