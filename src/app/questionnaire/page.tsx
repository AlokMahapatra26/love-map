'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, Brain, Activity, FileText } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    scenarioQuestions,
    personalizeScenario,
    calculateScenarioResult,
    ScenarioResult
} from '@/lib/data/scenario-questions';
import { v4 as uuidv4 } from 'uuid';
import { saveAssessment, getCoupleData } from '@/lib/db';

type Step = 'intro' | 'your-name' | 'partner-name' | 'questions' | 'complete';

function QuestionnaireContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [step, setStep] = useState<Step>('intro');
    const [yourName, setYourName] = useState('');
    const [partnerName, setPartnerName] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [result, setResult] = useState<ScenarioResult | null>(null);
    const [coupleId, setCoupleId] = useState<string>('');
    const [isPartner2, setIsPartner2] = useState(false);
    const [partner1Name, setPartner1Name] = useState<string>('');
    const [currentDate, setCurrentDate] = useState<string>('');

    useEffect(() => {
        setCurrentDate(new Date().toLocaleDateString());
    }, []);

    useEffect(() => {
        const urlCoupleId = searchParams.get('couple');

        if (urlCoupleId) {
            setCoupleId(urlCoupleId);
            setIsPartner2(true);
            const p1Data = localStorage.getItem(`lovemap_couple_${urlCoupleId}_partner1`);
            if (p1Data) {
                const parsed = JSON.parse(p1Data);
                setPartner1Name(parsed.yourName);
                setPartnerName(parsed.yourName);
            }

            // Fetch from DB for cross-device support
            getCoupleData(urlCoupleId).then(couple => {
                if (couple && couple.partner1) {
                    setPartner1Name(couple.partner1.yourName);
                    setPartnerName(couple.partner1.yourName);
                    // Sync to local storage
                    localStorage.setItem(`lovemap_couple_${urlCoupleId}_partner1`, JSON.stringify(couple.partner1));
                }
            });
        } else {
            const existingCoupleId = localStorage.getItem('lovemap_current_couple');
            if (existingCoupleId) {
                setCoupleId(existingCoupleId);
            } else {
                const newCoupleId = uuidv4().slice(0, 8);
                setCoupleId(newCoupleId);
                localStorage.setItem('lovemap_current_couple', newCoupleId);
            }
        }
    }, [searchParams]);

    const question = scenarioQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / scenarioQuestions.length) * 100;
    const personalizedScenario = question
        ? personalizeScenario(question.scenario, partnerName || 'Subject B')
        : '';

    const handleAnswer = (optionId: string) => {
        const newAnswers = { ...answers, [question.id]: optionId };
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestion < scenarioQuestions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            const scenarioResult = calculateScenarioResult(answers);
            setResult(scenarioResult);

            const assessmentData = {
                coupleId,
                yourName,
                partnerName,
                answers,
                result: scenarioResult,
                completedAt: new Date().toISOString(),
            };

            if (isPartner2) {
                localStorage.setItem(`lovemap_couple_${coupleId}_partner2`, JSON.stringify(assessmentData));
                localStorage.setItem('lovemap_partner2', JSON.stringify(assessmentData));
                saveAssessment(coupleId, 'partner2', assessmentData);
            } else {
                localStorage.setItem(`lovemap_couple_${coupleId}_partner1`, JSON.stringify(assessmentData));
                localStorage.setItem('lovemap_partner1', JSON.stringify(assessmentData));
                localStorage.setItem('lovemap_current_couple', coupleId);
                saveAssessment(coupleId, 'partner1', assessmentData);
            }

            setStep('complete');
        }
    };

    const goBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 'intro':
                return (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="max-w-2xl mx-auto"
                    >
                        <div className="report-card mb-8 bg-white border-rose-100 shadow-lg">
                            <div className="border-b border-rose-100 pb-4 mb-6 flex justify-between items-center">
                                <h1 className="text-xl font-serif font-bold text-rose-900">LoveMap Assessment: Introduction</h1>
                                <span className="text-xs font-mono text-rose-400">LOVEMAP</span>
                            </div>

                            <p className="text-stone-600 mb-6 leading-relaxed font-serif">
                                {isPartner2 && partner1Name
                                    ? `Subject A (${partner1Name}) has initiated a dyadic attachment assessment. You are invited to complete the corresponding inventory.`
                                    : "This instrument is designed to evaluate attachment patterns in close relationships. You will be presented with 20 hypothetical scenarios."}
                            </p>

                            <div className="bg-rose-50 border border-rose-100 p-6 mb-8 rounded-xl">
                                <h3 className="font-bold text-sm mb-4 uppercase tracking-wide text-rose-800">Instructions</h3>
                                <ul className="space-y-3 text-sm text-stone-600 font-mono">
                                    <li className="flex gap-3">
                                        <span className="text-rose-400">01.</span>
                                        <span>Read each scenario carefully.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-rose-400">02.</span>
                                        <span>Select the response that best matches your instinctive reaction.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-rose-400">03.</span>
                                        <span>There are no correct or incorrect responses.</span>
                                    </li>
                                </ul>
                            </div>

                            <button
                                onClick={() => setStep('your-name')}
                                className="btn-clinical w-full"
                            >
                                Proceed to Intake
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                );

            case 'your-name':
                return (
                    <motion.div
                        key="your-name"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="max-w-xl mx-auto"
                    >
                        <div className="report-card bg-white border-rose-100 shadow-lg">
                            <div className="mb-8">
                                <span className="text-xs font-mono text-rose-400 block mb-2">SECTION 1.1</span>
                                <h2 className="text-2xl font-serif font-bold text-rose-900">Subject Identification</h2>
                            </div>

                            <div className="mb-8">
                                <label className="block text-xs font-bold uppercase tracking-wide mb-2 text-stone-500">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    value={yourName}
                                    onChange={(e) => setYourName(e.target.value)}
                                    placeholder="Enter subject name"
                                    className="clinical-input text-xl border-rose-200 focus:border-rose-500"
                                    onKeyDown={(e) => e.key === 'Enter' && yourName.trim() && setStep('partner-name')}
                                    autoFocus
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <button onClick={() => setStep('intro')} className="text-sm text-stone-500 hover:text-rose-600 font-mono transition-colors">
                                    [BACK]
                                </button>
                                <button
                                    onClick={() => setStep('partner-name')}
                                    disabled={!yourName.trim()}
                                    className="btn-clinical disabled:opacity-50 disabled:shadow-none"
                                >
                                    Next Section
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                );

            case 'partner-name':
                return (
                    <motion.div
                        key="partner-name"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="max-w-xl mx-auto"
                    >
                        <div className="report-card bg-white border-rose-100 shadow-lg">
                            <div className="mb-8">
                                <span className="text-xs font-mono text-rose-400 block mb-2">SECTION 1.2</span>
                                <h2 className="text-2xl font-serif font-bold text-rose-900">Partner Identification</h2>
                            </div>

                            <p className="text-stone-600 mb-6 text-sm">
                                {isPartner2
                                    ? `Please confirm the name of Subject A.`
                                    : "Please identify the partner involved in this assessment."}
                            </p>

                            <div className="mb-8">
                                <label className="block text-xs font-bold uppercase tracking-wide mb-2 text-stone-500">
                                    Partner Name
                                </label>
                                <input
                                    type="text"
                                    value={partnerName}
                                    onChange={(e) => setPartnerName(e.target.value)}
                                    placeholder="Enter partner name"
                                    className="clinical-input text-xl border-rose-200 focus:border-rose-500"
                                    onKeyDown={(e) => e.key === 'Enter' && partnerName.trim() && setStep('questions')}
                                    autoFocus
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <button onClick={() => setStep('your-name')} className="text-sm text-stone-500 hover:text-rose-600 font-mono transition-colors">
                                    [BACK]
                                </button>
                                <button
                                    onClick={() => setStep('questions')}
                                    disabled={!partnerName.trim()}
                                    className="btn-clinical disabled:opacity-50 disabled:shadow-none"
                                >
                                    Begin Inventory
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                );

            case 'questions':
                return (
                    <motion.div
                        key="questions"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="flex justify-between items-end mb-6 font-mono text-xs text-rose-400 border-b border-rose-200 pb-2">
                            <span>ITEM {currentQuestion + 1} / {scenarioQuestions.length}</span>
                            <span>PROGRESS: {Math.round(progress)}%</span>
                        </div>

                        <div className="report-card mb-8 bg-white border-rose-100 shadow-lg">
                            <div className="mb-2">
                                <span className="inline-block px-2 py-1 bg-rose-50 text-rose-600 text-xs font-mono uppercase tracking-wider mb-4 rounded-full">
                                    Category: {question.category}
                                </span>
                            </div>

                            <h2 className="text-xl md:text-2xl font-serif font-medium mb-8 leading-relaxed text-stone-900">
                                {personalizedScenario}
                            </h2>

                            <div className="space-y-4">
                                {question.options.map((option) => {
                                    const isSelected = answers[question.id] === option.id;
                                    return (
                                        <button
                                            key={option.id}
                                            onClick={() => handleAnswer(option.id)}
                                            className={`w-full text-left p-4 border transition-all duration-200 group rounded-xl ${isSelected
                                                ? 'bg-rose-500 text-white border-rose-500 shadow-md'
                                                : 'bg-white border-rose-100 hover:border-rose-300 hover:bg-rose-50'
                                                }`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={`w-6 h-6 border flex items-center justify-center flex-shrink-0 mt-0.5 font-mono text-xs rounded-full ${isSelected ? 'border-white text-white' : 'border-rose-200 text-rose-300 group-hover:border-rose-400'
                                                    }`}>
                                                    {option.id.replace(/[0-9]/g, '').toUpperCase()}
                                                </div>
                                                <span className={`text-sm md:text-base leading-relaxed ${isSelected ? 'text-white' : 'text-stone-700'}`}>
                                                    {option.text}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <button
                                onClick={goBack}
                                disabled={currentQuestion === 0}
                                className="text-sm text-stone-500 hover:text-rose-600 font-mono disabled:opacity-30 transition-colors"
                            >
                                [PREVIOUS]
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={!answers[question.id]}
                                className="btn-clinical disabled:opacity-50 disabled:shadow-none"
                            >
                                {currentQuestion < scenarioQuestions.length - 1 ? 'Next Question' : 'Complete Assessment'}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                );

            case 'complete':
                return (
                    <motion.div
                        key="complete"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="max-w-xl mx-auto"
                    >
                        <div className="report-card text-center bg-white border-rose-100 shadow-lg">
                            <div className="w-16 h-16 bg-rose-100 flex items-center justify-center mx-auto mb-6 rounded-full">
                                <CheckCircle className="w-8 h-8 text-rose-600" />
                            </div>

                            <h2 className="text-2xl font-serif font-bold mb-2 text-rose-900">Assessment Complete</h2>
                            <p className="text-stone-600 mb-8 font-mono text-sm">
                                DATA PROCESSING FINALIZED
                            </p>

                            {result && (
                                <div className="bg-rose-50 border border-rose-100 p-6 mb-8 text-left rounded-xl">
                                    <div className="flex justify-between items-center mb-4 border-b border-rose-200 pb-2">
                                        <span className="text-xs font-mono font-bold text-rose-800">PRELIMINARY CLASSIFICATION</span>
                                        <Activity className="w-4 h-4 text-rose-400" />
                                    </div>
                                    <div className="text-xl font-serif font-bold capitalize mb-4 text-rose-900">
                                        {result.style} Attachment
                                    </div>
                                    <div className="space-y-3">
                                        {Object.entries(result.scores).map(([style, score]) => (
                                            <div key={style} className="flex items-center gap-4 text-xs font-mono">
                                                <span className="w-24 capitalize text-stone-500">{style}</span>
                                                <div className="flex-1 h-2 bg-rose-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-rose-600"
                                                        style={{ width: `${score}%` }}
                                                    />
                                                </div>
                                                <span className="w-8 text-right text-rose-900">{score.toFixed(0)}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={() => router.push(`/results?couple=${coupleId}`)}
                                className="btn-clinical w-full"
                            >
                                Generate Diagnostic Report
                                <ArrowRight className="w-4 h-4" />
                            </button>

                            <p className="mt-6 text-xs text-stone-400 font-mono">
                                {isPartner2
                                    ? "Merging data with Subject A..."
                                    : "Report ready for viewing."}
                            </p>
                        </div>
                    </motion.div>
                );
        }
    };

    return (
        <main className="min-h-screen bg-[#FFF0F5] px-4 py-8 md:py-16 font-sans text-stone-900">
            <header className="max-w-3xl mx-auto mb-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-rose-600 flex items-center justify-center text-white rounded-full">
                        <Brain className="w-4 h-4" />
                    </div>
                    <span className="font-serif font-bold text-rose-900">LoveMap</span>
                </div>
                <div className="text-xs font-mono text-rose-400">
                    {currentDate}
                </div>
            </header>

            <AnimatePresence mode="wait">
                {renderStep()}
            </AnimatePresence>
        </main>
    );
}

export default function QuestionnairePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#FFF0F5]">
                <div className="text-center font-mono text-xs animate-pulse text-rose-400">
                    LOADING PROTOCOL...
                </div>
            </div>
        }>
            <QuestionnaireContent />
        </Suspense>
    );
}
