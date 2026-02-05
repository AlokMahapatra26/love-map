'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'hinglish';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
    en: {
        'app.title': 'LoveMap',
        'intro.title': 'LoveMap Assessment: Introduction',
        'intro.subtitle': 'LOVEMAP',
        'intro.desc_partner': 'Subject A ({{name}}) has initiated a dyadic attachment assessment. You are invited to complete the corresponding inventory.',
        'intro.desc_default': 'This instrument is designed to evaluate attachment patterns in close relationships. You will be presented with 20 hypothetical scenarios.',
        'intro.instructions': 'Instructions',
        'intro.step1': 'Read each scenario carefully.',
        'intro.step2': 'Select the response that best matches your instinctive reaction.',
        'intro.step3': 'There are no correct or incorrect responses.',
        'intro.btn_start': 'Proceed to Intake',
        'id.section1': 'SECTION 1.1',
        'id.title_subject': 'Subject Identification',
        'id.label_name': 'First Name',
        'id.placeholder_name': 'Enter subject name',
        'id.btn_back': '[BACK]',
        'id.btn_next': 'Next Section',
        'id.section2': 'SECTION 1.2',
        'id.title_partner': 'Partner Identification',
        'id.desc_partner': 'Please confirm the name of Subject A.',
        'id.desc_default': 'Please identify the partner involved in this assessment.',
        'id.label_partner': 'Partner Name',
        'id.placeholder_partner': 'Enter partner name',
        'id.btn_begin': 'Begin Inventory',
        'q.item': 'ITEM',
        'q.progress': 'PROGRESS',
        'q.category': 'Category:',
        'q.btn_prev': '[PREVIOUS]',
        'q.btn_next': 'Next Question',
        'q.btn_complete': 'Complete Assessment',
        'done.title': 'Assessment Complete',
        'done.desc': 'DATA PROCESSING FINALIZED',
        'done.classification': 'PRELIMINARY CLASSIFICATION',
        'done.btn_report': 'Generate Diagnostic Report',
        'done.processing': 'Merging data with Subject A...',
        'done.ready': 'Report ready for viewing.',
        'loading': 'LOADING PROTOCOL...',
        'results.title': 'LoveMap Report',
        'results.export': 'EXPORT PDF',
        'results.processing': 'PROCESSING...',
        'results.reset': '[RESET]',
        'results.case_file': 'CASE FILE:',
        'results.no_data': 'No Diagnostic Data',
        'results.btn_begin': 'Begin Assessment',
        'results.tab_overview': 'OVERVIEW',
        'results.tab_relationship': 'YOUR RELATIONSHIP',
        'results.tab_strategies': 'GROWING TOGETHER',
        'results.awaiting': 'AWAITING PARTNER DATA',
        'results.about': 'ABOUT',
        'results.connection_style': 'CONNECTION STYLE',
        'results.breakdown': 'SCORE BREAKDOWN',
        'results.understanding': 'UNDERSTANDING YOU',
        'results.need_closeness': 'NEED FOR CLOSENESS',
        'results.need_space': 'NEED FOR SPACE',
        'results.qualities': 'Beautiful Qualities',
        'results.growth': 'Growth Areas',
        'results.tips_for': 'Tips for',
        'results.tips_both': 'Tips for Both of You ♥',
        'results.how_to': 'How to Do It:',
        'results.challenges': 'Challenges to Navigate',
        'results.opportunities': 'Opportunities to Grow Together',
        'results.harmony': 'HARMONY LEVEL',
    },
    hinglish: {
        'app.title': 'LoveMap',
        'intro.title': 'LoveMap Assessment: Shuruwaat',
        'intro.subtitle': 'LOVEMAP',
        'intro.desc_partner': 'Subject A ({{name}}) ne ek relationship assessment shuru kiya hai. Aapko bhi isme hissa lene ke liye invite kiya gaya hai.',
        'intro.desc_default': 'Ye tool aapke relationship patterns ko samajhne ke liye banaya gaya hai. Aapke saamne 20 alag-alag situations hongi.',
        'intro.instructions': 'Rules',
        'intro.step1': 'Har situation ko dhyan se padhein.',
        'intro.step2': 'Jo jawab aapko sabse natural aur sach ke kareeb lage, wahi choose karein.',
        'intro.step3': 'Yahan “ideal” ya perfect dikhne ki zaroorat nahi hai. Jitna honestly aap answer karenge, utna hi aapka relationship long term strong aur real banega. Galat ya unreal answer dena shayad moment mein achha lage, par aage chal kar relationship ko nuksaan pahucha sakta hai',
        'intro.btn_start': 'Proceed',
        'id.section1': 'SECTION 1.1',
        'id.title_subject': 'Subject Identification',
        'id.label_name': 'Your Naam',
        'id.placeholder_name': 'write your name',
        'id.btn_back': '[BACK]',
        'id.btn_next': 'Next Section',
        'id.section2': 'SECTION 1.2',
        'id.title_partner': 'Partner Identification',
        'id.desc_partner': 'Please confirm the name of Subject A.',
        'id.desc_default': 'Please identify the partner involved in this assessment.',
        'id.label_partner': 'Partner Ka Naam',
        'id.placeholder_partner': 'Enter partner name',
        'id.btn_begin': 'Begin Assessment',
        'q.item': 'Question',
        'q.progress': 'Progress',
        'q.category': 'Category:',
        'q.btn_prev': '[BACK]',
        'q.btn_next': 'Next Question',
        'q.btn_complete': 'Complete Assessment',
        'done.title': 'Assessment Complete',
        'done.desc': 'DATA PROCESSING FINALIZED',
        'done.classification': 'PRELIMINARY CLASSIFICATION',
        'done.btn_report': 'Generate Diagnostic Report',
        'done.processing': 'Merging data with Subject A...',
        'done.ready': 'Report ready for viewing.',
        'loading': 'PROTOCOL LOAD HO RAHA HAI...',
        'results.title': 'LoveMap Report',
        'results.export': 'EXPORT PDF',
        'results.processing': 'PROCESS HO RAHA HAI...',
        'results.reset': '[RESET]',
        'results.case_file': 'CASE FILE:',
        'results.no_data': 'Koi Data Nahi Hai',
        'results.btn_begin': 'Test Shuru Karein',
        'results.tab_overview': 'OVERVIEW',
        'results.tab_relationship': 'AAPKA RISHTA',
        'results.tab_strategies': 'SAATH MEIN GROWH',
        'results.awaiting': 'PARTNER KA DATA BAAKI HAI',
        'results.about': 'ISKE BAARE MEIN',
        'results.connection_style': 'CONNECTION STYLE',
        'results.breakdown': 'SCORE BREAKDOWN',
        'results.understanding': 'AAPKO SAMAJHNA',
        'results.need_closeness': 'NAZDIKI KI ZAROORAT',
        'results.need_space': 'SPACE KI ZAROORAT',
        'results.qualities': 'Khoobiyan',
        'results.growth': 'Sudhaar Ke Kshetra',
        'results.tips_for': 'Tips for',
        'results.tips_both': 'Dono Ke Liye Tips ♥',
        'results.how_to': 'Kaise Karein:',
        'results.challenges': 'Challenges Jo Aa Sakte Hain',
        'results.opportunities': 'Saath Badhne Ke Mauke',
        'results.harmony': 'HARMONY LEVEL',
    }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: string): string => {
        return translations[language][key as keyof typeof translations['en']] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
