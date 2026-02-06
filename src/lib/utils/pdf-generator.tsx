import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    pdf,
} from '@react-pdf/renderer';
import { attachmentStyles, AttachmentStyleInfo, AttachmentStyle } from '@/lib/data/attachment-styles';
import { getPairingKey, pairingAnalyses, getPersonalizedPairingAnalysis } from '@/lib/data/pairing-analysis';
import { conflictStories } from '@/lib/data/conflict-stories';
import { scenarioQuestions, ScenarioResult, ScenarioQuestion } from '@/lib/data/scenario-questions';

interface AssessmentData {
    coupleId?: string;
    yourName: string;
    answers: Record<number, number>;
    result: ScenarioResult;
    completedAt: string;
}

// PDF Specific Translations
const pdfTranslations = {
    en: {
        coverTitle: "Our Love Story",
        coverSubtitle: "Understanding Guide",
        coverNote: "\"Every love story is beautiful, but ours is my favorite.\"\nThis guide is a gift of understanding,\ncreated with love to help us grow closer together.",
        createdOn: "Created with love on",
        understanding: "Understanding",
        withLove: "With Love",
        messageToPartner: (p1: string, p2: string) => `Dear ${p2 || 'Reader'}, to love ${p1} fully, it helps to understand the unique way their heart connects with yours.`,
        theWayLoves: (name: string) => `The Way ${name} Loves`,
        connectionStyle: (name: string, style: string) => `${name} has a ${style} connection style.`,
        giftIntro: (name: string) => `In relationships, this means ${name} brings beautiful gifts to the table.`,
        makesFeelLoved: (name: string) => `What Makes ${name} Feel Loved`,
        loveLanguage: (name: string) => `Love isn't just a feeling, it's a language. ${name} feels most secure and cherished when their partner understands their core needs.`,
        showsLove: (name: string) => `When ${name} wants to show you love, they often do it in their own special way:`,
        tenderSpots: "Tender Spots",
        growingAreas: (name: string) => `We all have areas where we are still growing. For ${name}, there might be moments where old patterns surface.`,
        blindSpots: (name: string) => `It's also helpful to know that ${name} might have some blind spots.`,
        madeWithLove: "Made with love for",
        storyTitle: "Your Love Story Together",
        danceOfConnection: "The Dance of Your Connection",
        uniqueRhythm: "Your relationship has a unique rhythm.",
        understandingConflicts: "Understanding Your Conflicts",
        conflictIntro: "Every couple has a \"conflict cycle\"—a pattern that happens when stress rises. It's not a sign of failure, but a sign of different needs trying to be met.",
        whyWeReact: "Why We React The Way We Do",
        conflictReaction: (name: string, style: string) => `${name}, when you feel disconnected or stressed, your ${style} side might instinctively`,
        cycleLead: "This interaction can sometimes lead to a cycle where:",
        cycleKey: "Understanding this cycle is the key to breaking it. When you see these patterns happening, try to pause and say, \"This is just our pattern happening, not us.\"",
        growingTogether: "Growing Together",
        growthPotential: "Your love has immense potential for growth.",
        realWorld: "Real World Perspective",
        realWorldCont: "Real World Perspective (Cont.)",
        keepingStrong: "Keeping Love Strong",
        scenariosIntro: "Here are some common scenarios that couples with your specific connection styles often navigate. You might recognize some of these moments.",
        whyBehind: "The \"Why\" Behind the Behavior",
        partnerProtecting: "Now that you understand these patterns, you can see that your partner isn't trying to hurt you. They are just trying to protect themselves in the only way they know how.",
        onSameTeam: "When you see this happening, take a deep breath. Remind yourself: \"My partner is struggling right now, and so am I. We are on the same team.\"",
        conclusion: "Please don't see every conflict as a \"red flag\" or a reason to break up.\nReal love isn't about never fighting; it's about repairing the rupture.\n\nBe calm. Understand each other. Fix it together.\n\nYou have everything you need to make this work.",
        quesRecord: "Questionnaire Ke Jawab",
        quesIntro: "Is document mein relationship assessment ke saare sawal aur jawab darj hain.",
        fightScriptsTitle: "What To Do During a Fight",
        scriptsSubtitle: "Ready-to-Use 2-Line Scripts",
        selfSoothing: "Self-Soothing (Say to yourself)",
        boundary: "Setting Boundaries",
        repair: "Repair Attempt",
        reassurance: "Reassurance",
        scriptsFor: (name: string) => `${name}'s Scripts`,
        deepAnalysisTitle: "Deep Analysis",
        deepAnalysisSubtitle: "Strengths, Risks & Growth",
        strengthsTitle: "Your Unique Strengths",
        risksTitle: "Risk Factors to Watch",
        conflictsTitle: "Common Conflict Loops",
        growthTitle: "Growth Opportunities",
    },
    hinglish: {
        coverTitle: "Humari Love Story",
        coverSubtitle: "Ek Understanding Guide",
        coverNote: "\"Har love story khoobsurat hoti hai, par humari meri favorite hai.\"\nYe guide ek-dusre ko behtar samajhne ka tohfa hai,\nis umeed ke saath ki humara rishta aur gehra ho.",
        createdOn: "Created with love on",
        understanding: "Understanding",
        withLove: "With Love",
        messageToPartner: (p1: string, p2: string) => `Dear ${p2 || 'Reader'}, ${p1} ko poori tarah pyaar karne ke liye, ye samajhna zaroori hai ki unka dil kaise connect karta hai.`,
        theWayLoves: (name: string) => `${name} ka Pyaar karne ka tareeka`,
        connectionStyle: (name: string, style: string) => `${name} ka connection style ${style} hai.`,
        giftIntro: (name: string) => `Iska matlab hai ki relationship mein ${name} ye khoobsurat quality laate hain.`,
        makesFeelLoved: (name: string) => `${name} ko Loved kab feel hota hai`,
        loveLanguage: (name: string) => `Pyaar sirf feeling nahi, ek bhasha hai. ${name} sabse zyaada secure tab feel karte hain jab unka partner unki zarooraton ko samajhta hai.`,
        showsLove: (name: string) => `Jab ${name} pyaar jatana chahte hain, wo aksar ye tareeke apnate hain:`,
        tenderSpots: "Naazuk Pehlu (Tender Spots)",
        growingAreas: (name: string) => `Hum sab kahin na kahin grow kar rahe hain. ${name} ke liye, purane patterns kabhi-kabhi saamne aa sakte hain.`,
        blindSpots: (name: string) => `Ye jaanna bhi zaroori hai ki ${name} ke kuch blind spots ho sakte hain (jo unhe khud nahi dikhte).`,
        madeWithLove: "Made with love for",
        storyTitle: "Aapki Love Story",
        danceOfConnection: "Aapke Connection ka Dance",
        uniqueRhythm: "Aapke rishte ka apna ek rhythm hai.",
        understandingConflicts: "Jhagdon ko Samajhna",
        conflictIntro: "Har couple ka ek \"conflict cycle\" hota hai—jab stress badhta hai. Ye failure nahi hai, bas alag-alag zarooraton ka takraav hai.",
        whyWeReact: "Hum Aisa React Kyun Karte Hain",
        conflictReaction: (name: string, style: string) => `${name}, jab aap disconnected ya stressed feel karte hain, aapka ${style} side shayad aise react karta hai`,
        cycleLead: "Is wajah se kabhi-kabhi aisi situation ban sakti hai jahan:",
        cycleKey: "Is cycle ko samajhna hi ise todne ka raasta hai. Jab aisa ho, to rukein aur sochein: \"Ye bas humara pattern hai, hum nahi.\"",
        growingTogether: "Saath Mein Grow Karna",
        growthPotential: "Aapke pyaar mein grow karne ki bohat shakti hai.",
        realWorld: "Asli Duniya ke Nazariye se",
        realWorldCont: "Asli Duniya ke Nazariye se (Cont.)",
        keepingStrong: "Pyaar Ko Mazboot Rakhna",
        scenariosIntro: "Yahan kuch aisi situations hain jo aapke jaise connection styles wale couples aksar face karte hain. Shayad aap inhe pehchanein.",
        whyBehind: "Bartaav ke Peeche ka \"Kyun\"",
        partnerProtecting: "Ab jab aap in patterns ko samajhte hain, aap dekh sakte hain ki aapka partner aapko chot nahi pahunchana chahta. Wo bas khud ko protect kar rahe hain.",
        onSameTeam: "When you see this happening, take a deep breath. Remind yourself: \"My partner is struggling right now, and so am I. We are on the same team.\"",
        conclusion: "Har jhagde ko \"red flag\" ya breakup ka reason na samjhein.\nAsli pyaar wo nahi jisme jhagde na hon; wo hai jisme tootne ke baad judna aata ho.\n\nShant rahein. Samajhein. Saath mein theek karein.\n\nAapke paas wo sab hai jo is rishte ko safal banane ke liye chahiye.",
        quesRecord: "Questionnaire Ke Jawab",
        quesIntro: "Is document mein relationship assessment ke saare sawal aur jawab darj hain.",
        fightScriptsTitle: "Ladai ke dauraan kya karein",
        scriptsSubtitle: "Bane-banaye jawaab (Scripts)",
        selfSoothing: "Khud ko shant karna (Man mein bolein)",
        boundary: "Hadd tay karna (Boundary banana)",
        repair: "Sulhah ki koshish (Repair)",
        reassurance: "Tasalli dena (Reassurance)",
        scriptsFor: (name: string) => `${name} ke liye Scripts`,
        deepAnalysisTitle: "Gehra Visleshan (Deep Analysis)",
        deepAnalysisSubtitle: "Taaqat, Khatre aur Mauke",
        strengthsTitle: "Aapki Khaas Taaqat (Strengths)",
        risksTitle: "In Cheezon Se Bachein (Risks)",
        conflictsTitle: "Aksar Hone Wale Jhagde (Conflicts)",
        growthTitle: "Saath Badhne Ke Mauke (Growth)",
    }
};

// Helper (Unchanged)
const t = (lang: string) => (lang === 'hinglish' ? pdfTranslations.hinglish : pdfTranslations.en);

// Helper to convert list to narrative
const toNarrative = (items: string[], prefix: string = ""): string => {
    if (!items || items.length === 0) return "";
    const sentences = items.map(item => {
        const trimmed = item.trim();
        return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
    });
    return prefix + sentences.join(" ");
};

// Helper to convert text to third person (You -> They)
const toThirdPerson = (text: string): string => {
    if (!text) return "";
    let newText = text;
    newText = newText.replace(/\bYou\b/g, "They");
    newText = newText.replace(/\byou\b/g, "they");
    newText = newText.replace(/\bYour\b/g, "Their");
    newText = newText.replace(/\byour\b/g, "their");
    newText = newText.replace(/\bYourself\b/g, "Themselves");
    newText = newText.replace(/\byourself\b/g, "themselves");
    return newText;
};

// Helper: Format name based on options
const formatName = (name: string, useInitials: boolean) => {
    if (!name) return "";
    if (!useInitials) return name;
    return name.split(' ').map(n => n[0].toUpperCase() + '.').join('');
};

// Styles
const styles = StyleSheet.create({
    page: { flexDirection: 'column', backgroundColor: '#FFF8F5', padding: 50, fontFamily: 'Times-Roman' },
    coverPage: { flexDirection: 'column', backgroundColor: '#FFF0F5', padding: 60, fontFamily: 'Times-Roman', justifyContent: 'center', alignItems: 'center' },
    mainTitle: { fontSize: 32, fontFamily: 'Times-Bold', color: '#881337', textAlign: 'center', marginBottom: 10 },
    loveNote: { fontSize: 14, fontFamily: 'Times-Italic', color: '#9F1239', textAlign: 'center', marginTop: 20, marginBottom: 30, lineHeight: 1.8 },
    coupleNames: { fontSize: 24, fontFamily: 'Times-Bold', color: '#BE123C', textAlign: 'center', marginBottom: 40 },
    decorativeLine: { width: 120, height: 2, backgroundColor: '#FCA5A5', marginVertical: 20 },
    dateText: { fontSize: 12, fontFamily: 'Times-Italic', color: '#9F1239', textAlign: 'center' },
    header: { borderBottomWidth: 2, borderBottomColor: '#FECDD3', paddingBottom: 15, marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    headerTitle: { fontSize: 11, fontFamily: 'Times-Bold', color: '#9F1239' },
    headerMeta: { fontSize: 10, fontFamily: 'Times-Italic', textAlign: 'right', color: '#BE123C' },
    section: { marginBottom: 25 },
    sectionTitle: { fontSize: 14, fontFamily: 'Times-Bold', color: '#BE123C', marginBottom: 10 },
    subTitle: { fontSize: 12, fontFamily: 'Times-Bold', color: '#9F1239', marginBottom: 6, marginTop: 8 },
    text: { fontSize: 11, fontFamily: 'Times-Roman', lineHeight: 1.6, marginBottom: 10, color: '#3F3F46', textAlign: 'justify' },
    italicText: { fontSize: 11, fontFamily: 'Times-Italic', lineHeight: 1.6, marginBottom: 10, color: '#52525B' },
    highlightBox: { backgroundColor: '#FFF1F2', borderWidth: 1, borderColor: '#FECDD3', borderRadius: 8, padding: 15, marginBottom: 15 },
    quoteBox: { borderLeftWidth: 3, borderLeftColor: '#FB7185', paddingLeft: 15, marginVertical: 12, marginLeft: 10 },
    quoteText: { fontSize: 12, fontFamily: 'Times-Italic', color: '#9F1239', lineHeight: 1.6 },
    footer: { position: 'absolute', bottom: 40, left: 50, right: 50, borderTopWidth: 1, borderTopColor: '#FECDD3', paddingTop: 12, flexDirection: 'row', justifyContent: 'space-between' },
    footerText: { fontSize: 9, fontFamily: 'Times-Italic', color: '#9F1239' },
    loveMessageBox: { backgroundColor: '#FDF2F8', borderWidth: 2, borderColor: '#FBCFE8', borderRadius: 12, padding: 20, marginVertical: 15, alignItems: 'center' },
    loveMessageText: { fontSize: 12, fontFamily: 'Times-Italic', color: '#9F1239', textAlign: 'center', lineHeight: 1.8 },
});

const RelationshipReport = ({ partner1, partner2, language = 'en', useInitials = false }: { partner1: AssessmentData; partner2?: AssessmentData; language?: 'en' | 'hinglish', useInitials?: boolean }) => {
    const t = pdfTranslations[language as keyof typeof pdfTranslations] || pdfTranslations.en;
    const name1 = formatName(partner1.yourName, useInitials);
    const name2 = partner2 ? formatName(partner2.yourName, useInitials) : '';
    const fullDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const style1 = partner1.result.style as AttachmentStyle;
    const styleInfo1 = attachmentStyles[style1];

    const style2 = partner2?.result.style as AttachmentStyle | undefined;
    const styleInfo2 = style2 ? attachmentStyles[style2] : null;

    const pairingKey = style2 ? getPairingKey(style1, style2) : null;
    const pairingAnalysis = (pairingKey && style2 && name2)
        ? getPersonalizedPairingAnalysis(style1, style2, name1, name2, language)
        : null;

    // Helper to get text based on language for style info (since we import static json)
    const getTxt = (obj: any, key: string): string => {
        if (!obj) return '';
        if (language === 'hinglish' && obj[`${key}Hinglish`]) {
            return obj[`${key}Hinglish`] as string;
        }
        return (obj[key] || '') as string;
    };

    // Prepare stories
    let personalizedStories: { title: string; story: string }[] = [];
    if (pairingKey && style2 && name2) {
        const rawStories = conflictStories[pairingKey] || [];
        let p1Name = name1;
        let p2Name = name2;
        if (pairingKey !== `${style1}-${style2}`) {
            p1Name = name2;
            p2Name = name1;
        }

        personalizedStories = rawStories.map(story => {
            const title = (language === 'hinglish' && story.titleHinglish) ? story.titleHinglish : story.title;
            const text = (language === 'hinglish' && story.storyHinglish) ? story.storyHinglish : story.story;

            return {
                title: title,
                story: text
                    .replace(/\[Partner1\]/g, p1Name)
                    .replace(/\[Partner2\]/g, p2Name)
                    .replace(/\(Secure\)/g, "")
                    .replace(/\(Anxious\)/g, "")
                    .replace(/\(Avoidant\)/g, "")
                    .replace(/\(Disorganized\)/g, "")
            };
        });
    }

    const storiesPerPage = 4;
    const storyChunks = [];
    for (let i = 0; i < personalizedStories.length; i += storiesPerPage) {
        storyChunks.push(personalizedStories.slice(i, i + storiesPerPage));
    }

    const totalPages = partner2 ? (5 + storyChunks.length) : 3;

    return (
        <Document>
            {/* Cover Page */}
            <Page size="A4" style={styles.coverPage}>
                <Text style={{ fontSize: 40, color: '#E11D48', marginBottom: 20 }}>~</Text>
                <Text style={styles.mainTitle}>{t.coverTitle}</Text>
                <Text style={styles.mainTitle}>{t.coverSubtitle}</Text>
                <View style={styles.decorativeLine} />
                <Text style={styles.coupleNames}>
                    {name1}{name2 ? ` & ${name2}` : "'s Journey"}
                </Text>
                <Text style={styles.loveNote}>
                    {t.coverNote}
                </Text>
                <View style={styles.decorativeLine} />
                <Text style={styles.dateText}>{t.createdOn} {fullDate}</Text>
            </Page>

            {/* Page 1: Partner 1 Narrative Profile */}
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>{t.understanding} {name1}</Text>
                    <Text style={styles.headerMeta}>{t.withLove}</Text>
                </View>

                <View style={styles.loveMessageBox}>
                    <Text style={styles.loveMessageText}>
                        {t.messageToPartner(name1, name2 || 'Reader')}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t.theWayLoves(name1)}</Text>
                    <Text style={styles.text}>
                        {t.connectionStyle(name1, styleInfo1.name)} {toThirdPerson(getTxt(styleInfo1, 'description'))}
                    </Text>
                    <Text style={styles.text}>
                        {t.giftIntro(name1)} {toThirdPerson(toNarrative(getTxt(styleInfo1, 'strengths') as unknown as string[], "For instance, "))}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t.makesFeelLoved(name1)}</Text>
                    <Text style={styles.text}>
                        {t.loveLanguage(name1)}
                    </Text>
                    <View style={styles.highlightBox}>
                        <Text style={styles.italicText}>
                            {toThirdPerson(toNarrative(getTxt(styleInfo1, 'needsFromPartner') as unknown as string[], "Specifically, "))}
                        </Text>
                    </View>
                    <Text style={styles.text}>
                        {t.showsLove(name1)}
                    </Text>
                    <View style={styles.quoteBox}>
                        <Text style={styles.quoteText}>{toThirdPerson(getTxt(styleInfo1, 'showsLove'))}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t.tenderSpots}</Text>
                    <Text style={styles.text}>
                        {t.growingAreas(name1)} {toThirdPerson(toNarrative(getTxt(styleInfo1, 'challenges') as unknown as string[], "You might notice "))}
                    </Text>
                    <Text style={styles.text}>
                        {t.blindSpots(name1)} {toThirdPerson(toNarrative(getTxt(styleInfo1, 'blindSpots') as unknown as string[], "Sometimes, they might not realize that "))}
                    </Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>{t.madeWithLove} {name1}{name2 ? ` & ${name2}` : ''}</Text>
                    <Text style={styles.footerText}>Page 1 of {totalPages}</Text>
                </View>
            </Page>

            {/* Pages for Partner 2 (if exists) */}
            {partner2 && styleInfo2 && (
                <Page size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>{t.understanding} {name2}</Text>
                        <Text style={styles.headerMeta}>{t.withLove}</Text>
                    </View>

                    <View style={styles.loveMessageBox}>
                        <Text style={styles.loveMessageText}>
                            {t.messageToPartner(name2, name1)}
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t.theWayLoves(name2)}</Text>
                        <Text style={styles.text}>
                            {t.connectionStyle(name2, styleInfo2.name)} {toThirdPerson(getTxt(styleInfo2, 'description'))}
                        </Text>
                        <Text style={styles.text}>
                            {t.giftIntro(name2)} {toThirdPerson(toNarrative(getTxt(styleInfo2, 'strengths') as unknown as string[], "For instance, "))}
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t.makesFeelLoved(name2)}</Text>
                        <Text style={styles.text}>
                            {t.loveLanguage(name2)}
                        </Text>
                        <View style={styles.highlightBox}>
                            <Text style={styles.italicText}>
                                {toThirdPerson(toNarrative(getTxt(styleInfo2, 'needsFromPartner') as unknown as string[], "Specifically, "))}
                            </Text>
                        </View>
                        <Text style={styles.text}>
                            {t.showsLove(name2)}
                        </Text>
                        <View style={styles.quoteBox}>
                            <Text style={styles.quoteText}>{toThirdPerson(getTxt(styleInfo2, 'showsLove'))}</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t.tenderSpots}</Text>
                        <Text style={styles.text}>
                            {t.growingAreas(name2)} {toThirdPerson(toNarrative(getTxt(styleInfo2, 'challenges') as unknown as string[], "You might notice "))}
                        </Text>
                        <Text style={styles.text}>
                            {t.blindSpots(name2)} {toThirdPerson(toNarrative(getTxt(styleInfo2, 'blindSpots') as unknown as string[], "Sometimes, they might not realize that "))}
                        </Text>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>{t.madeWithLove} {name1} & {name2}</Text>
                        <Text style={styles.footerText}>Page 2 of {totalPages}</Text>
                    </View>
                </Page>
            )}

            {/* Couple Narrative Analysis */}
            {partner2 && pairingAnalysis && (
                <Page size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>{t.storyTitle}</Text>
                        <Text style={styles.headerMeta}>{name1} & {name2}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t.danceOfConnection}</Text>
                        <Text style={styles.text}>
                            {pairingAnalysis.dynamics}
                        </Text>
                        <Text style={styles.text}>
                            {t.uniqueRhythm} {toNarrative(pairingAnalysis.strengths, language === 'en' ? "One of the most beautiful things about your bond is that " : "Aapke rishte ki sabse khoobsurat baat ye hai ki ")}
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t.understandingConflicts}</Text>
                        <Text style={styles.text}>
                            {t.conflictIntro}
                        </Text>
                        <View style={styles.highlightBox}>
                            <Text style={styles.subTitle}>{t.whyWeReact}</Text>
                            <Text style={styles.text}>
                                {t.conflictReaction(name1, styleInfo1.name)} {toThirdPerson(getTxt(styleInfo1, 'inConflict').toLowerCase())}
                            </Text>
                            <Text style={styles.text}>
                                {t.conflictReaction(name2!, styleInfo2!.name)} {toThirdPerson(getTxt(styleInfo2!, 'inConflict').toLowerCase())}
                            </Text>
                        </View>
                        <Text style={styles.text}>
                            {t.cycleLead} {toNarrative(pairingAnalysis.keyConflicts, "")}
                        </Text>
                        <Text style={styles.italicText}>
                            {t.cycleKey}
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t.growingTogether}</Text>
                        <Text style={styles.text}>
                            {t.growthPotential} {toNarrative(pairingAnalysis.growthOpportunities, language === 'en' ? "You have a wonderful opportunity to " : "Aapke paas ek achha mauka hai ")}
                        </Text>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>{t.madeWithLove} {name1} & {name2}</Text>
                        <Text style={styles.footerText}>Page 3 of {totalPages}</Text>
                    </View>
                </Page>
            )}

            {/* Fight Scripts Page */}
            {partner2 && pairingAnalysis && pairingAnalysis.conflictScripts && (
                <Page size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>{t.fightScriptsTitle}</Text>
                        <Text style={styles.headerMeta}>{t.scriptsSubtitle}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.text}>{t.scriptsSubtitle}</Text>

                        {/* Logic to determine which scripts belong to which partner */}
                        {(() => {
                            const isStandardOrder = pairingKey === `${style1}-${style2}`;
                            // if standard: P1 (PDF) -> Partner1 (Data), P2 (PDF) -> Partner2 (Data)
                            // if swapped: P1 (PDF) -> Partner2 (Data), P2 (PDF) -> Partner1 (Data)

                            const p1Scripts = isStandardOrder ? pairingAnalysis.conflictScripts?.partner1 : pairingAnalysis.conflictScripts?.partner2;
                            const p2Scripts = isStandardOrder ? pairingAnalysis.conflictScripts?.partner2 : pairingAnalysis.conflictScripts?.partner1;

                            // Helper to render a partner's block
                            const renderScripts = (name: string, scripts: any) => (
                                <View style={styles.highlightBox}>
                                    <Text style={styles.subTitle}>{t.scriptsFor(name)}</Text>

                                    <Text style={[styles.italicText, { fontSize: 10, color: '#BE123C' }]}>{t.selfSoothing}</Text>
                                    <Text style={styles.text}>"{language === 'hinglish' ? scripts.selfSoothing.hinglish : scripts.selfSoothing.en}"</Text>

                                    <Text style={[styles.italicText, { fontSize: 10, color: '#BE123C' }]}>{t.boundary}</Text>
                                    <Text style={styles.text}>"{language === 'hinglish' ? scripts.boundary.hinglish : scripts.boundary.en}"</Text>

                                    <Text style={[styles.italicText, { fontSize: 10, color: '#BE123C' }]}>{t.repair}</Text>
                                    <Text style={styles.text}>"{language === 'hinglish' ? scripts.repair.hinglish : scripts.repair.en}"</Text>

                                    <Text style={[styles.italicText, { fontSize: 10, color: '#BE123C' }]}>{t.reassurance}</Text>
                                    <Text style={styles.text}>"{language === 'hinglish' ? scripts.reassurance.hinglish : scripts.reassurance.en}"</Text>
                                </View>
                            );

                            return (
                                <>
                                    {p1Scripts && renderScripts(name1, p1Scripts)}
                                    {p2Scripts && renderScripts(name2, p2Scripts)}
                                </>
                            );
                        })()}
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>{t.madeWithLove} {name1} & {name2}</Text>
                        <Text style={styles.footerText}>Page 4 of {totalPages}</Text>
                    </View>
                </Page>
            )}

            {/* Deep Analysis Page */}
            {partner2 && pairingAnalysis && (
                <Page size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>{t.deepAnalysisTitle}</Text>
                        <Text style={styles.headerMeta}>{t.deepAnalysisSubtitle}</Text>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.highlightBox}>
                            <Text style={styles.subTitle}>{t.strengthsTitle}</Text>
                            {/* Use Hinglish if selected, fallback to English */}
                            <Text style={styles.text}>
                                {toNarrative(
                                    (language === 'hinglish' && pairingAnalysis.strengthsHinglish)
                                        ? pairingAnalysis.strengthsHinglish
                                        : pairingAnalysis.strengths,
                                    ""
                                )}
                            </Text>
                        </View>

                        <View style={styles.highlightBox}>
                            <Text style={styles.subTitle}>{t.risksTitle}</Text>
                            <Text style={styles.text}>
                                {toNarrative(
                                    (language === 'hinglish' && pairingAnalysis.riskFactorsHinglish)
                                        ? pairingAnalysis.riskFactorsHinglish
                                        : pairingAnalysis.riskFactors,
                                    ""
                                )}
                            </Text>
                        </View>

                        <Text style={styles.sectionTitle}>{t.conflictsTitle}</Text>
                        <Text style={styles.text}>
                            {toNarrative(
                                (language === 'hinglish' && pairingAnalysis.keyConflictsHinglish)
                                    ? pairingAnalysis.keyConflictsHinglish
                                    : pairingAnalysis.keyConflicts,
                                ""
                            )}
                        </Text>

                        <Text style={styles.sectionTitle}>{t.growthTitle}</Text>
                        <Text style={styles.text}>
                            {toNarrative(
                                (language === 'hinglish' && pairingAnalysis.growthOpportunitiesHinglish)
                                    ? pairingAnalysis.growthOpportunitiesHinglish
                                    : pairingAnalysis.growthOpportunities,
                                ""
                            )}
                        </Text>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>{t.madeWithLove} {name1} & {name2}</Text>
                        <Text style={styles.footerText}>Page 5 of {totalPages}</Text>
                    </View>
                </Page>
            )}

            {/* Real World Perspective Pages (Chunked) */}
            {partner2 && styleInfo2 && storyChunks.map((chunk, chunkIndex) => (
                <Page key={chunkIndex} size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>
                            {chunkIndex === 0 ? t.realWorld : t.realWorldCont}
                        </Text>
                        <Text style={styles.headerMeta}>{t.keepingStrong}</Text>
                    </View>

                    <View style={styles.section}>
                        {chunkIndex === 0 && (
                            <Text style={styles.text}>
                                {t.scenariosIntro}
                            </Text>
                        )}

                        {chunk.map((story, index) => (
                            <View key={index} style={styles.highlightBox}>
                                <Text style={styles.subTitle}>{story.title}</Text>
                                <Text style={styles.text}>{story.story}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Conclusion on the last page */}
                    {chunkIndex === storyChunks.length - 1 && (
                        <View>
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>{t.whyBehind}</Text>
                                <Text style={styles.text}>
                                    {t.partnerProtecting}
                                </Text>
                                <Text style={styles.text}>
                                    {t.onSameTeam}
                                </Text>
                            </View>

                            <View style={styles.loveMessageBox}>
                                <Text style={styles.loveMessageText}>
                                    {t.conclusion}
                                </Text>
                            </View>
                        </View>
                    )}

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>{t.madeWithLove} {name1} & {name2}</Text>
                        <Text style={styles.footerText}>Page {6 + chunkIndex} of {totalPages}</Text>
                    </View>
                </Page>
            ))}
        </Document>
    );
};

// Questionnaire Report Component
const QuestionnaireReport = ({ partner1, partner2, language = 'en' }: { partner1: AssessmentData; partner2?: AssessmentData; language?: 'en' | 'hinglish' }) => {
    const t = pdfTranslations[language as keyof typeof pdfTranslations] || pdfTranslations.en;
    const name1 = partner1.yourName;
    const name2 = partner2?.yourName || "Partner 2";
    const fullDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>{t.quesRecord}</Text>
                    <Text style={styles.headerMeta}>{fullDate}</Text>
                </View>

                <Text style={styles.coupleNames}>
                    {name1} & {partner2 ? name2 : "..."}
                </Text>

                <View style={styles.section}>
                    <Text style={styles.text}>
                        {t.quesIntro}
                    </Text>
                </View>

                {scenarioQuestions.map((q: ScenarioQuestion, index: number) => {
                    const p1Answer = partner1.answers[q.id];
                    const p2Answer = partner2?.answers[q.id];

                    // Display text logic
                    const scenario = (language === 'hinglish' && q.scenarioHinglish) ? q.scenarioHinglish : q.scenario;

                    const p1Option = q.options.find((o) => o.id === p1Answer.toString());
                    const p2Option = partner2 ? q.options.find((o) => o.id === p2Answer?.toString()) : null;

                    const p1Text = (language === 'hinglish' && p1Option?.textHinglish) ? p1Option.textHinglish : p1Option?.text;
                    const p2Text = (language === 'hinglish' && p2Option?.textHinglish) ? p2Option.textHinglish : p2Option?.text;

                    return (
                        <View key={q.id} style={{ marginBottom: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                            <Text style={{ fontSize: 10, fontFamily: 'Times-Bold', color: '#881337', marginBottom: 5 }}>
                                {index + 1}. {scenario}
                            </Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: '48%' }}>
                                    <Text style={{ fontSize: 9, color: '#666', marginBottom: 2 }}>{name1}:</Text>
                                    <Text style={{ fontSize: 9 }}>{p1Text || '-'}</Text>
                                </View>

                                {partner2 && (
                                    <View style={{ width: '48%' }}>
                                        <Text style={{ fontSize: 9, color: '#666', marginBottom: 2 }}>{name2}:</Text>
                                        <Text style={{ fontSize: 9 }}>{p2Text || '-'}</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    );
                })}

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Confidential Record</Text>
                    <Text style={styles.footerText}>LoveMap</Text>
                </View>
            </Page>
        </Document>
    );
};

export async function generateRelationshipPdf(
    partner1: AssessmentData,
    partner2?: AssessmentData,
    language: 'en' | 'hinglish' = 'en',
    options?: { useInitials?: boolean }
): Promise<void> {
    const blob = await pdf(<RelationshipReport partner1={partner1} partner2={partner2} language={language} useInitials={options?.useInitials} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `LoveMap-Analysis-${partner1.yourName}-${partner2?.yourName || 'Single'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export async function generateQuestionnairePdf(
    partner1: AssessmentData,
    partner2?: AssessmentData,
    language: 'en' | 'hinglish' = 'en'
): Promise<void> {
    const blob = await pdf(<QuestionnaireReport partner1={partner1} partner2={partner2} language={language} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `LoveMap-Questionnaire-${partner1.yourName}-${partner2?.yourName || 'Single'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
