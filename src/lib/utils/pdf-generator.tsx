import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    pdf,
} from '@react-pdf/renderer';
import { AttachmentResult, attachmentStyles } from '@/lib/data/attachment-styles';
import { getPairingKey, pairingAnalyses, getStrategiesForPairing, getPersonalizedPairingAnalysis } from '@/lib/data/pairing-analysis';
import { conflictStories } from '@/lib/data/conflict-stories';

interface AssessmentData {
    coupleId?: string;
    partnerName: string;
    answers: Record<number, number>;
    result: AttachmentResult;
    completedAt: string;
}

// Helper to convert list to narrative
const toNarrative = (items: string[], prefix: string = ""): string => {
    if (!items || items.length === 0) return "";
    const sentences = items.map(item => {
        // Ensure item ends with punctuation if it's a full sentence, otherwise add it
        const trimmed = item.trim();
        return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
    });
    return prefix + sentences.join(" ");
};

// Helper to convert text to third person (You -> They)
const toThirdPerson = (text: string): string => {
    if (!text) return "";
    let newText = text;
    // Replace You/you with They/they
    newText = newText.replace(/\bYou\b/g, "They");
    newText = newText.replace(/\byou\b/g, "they");
    // Replace Your/your with Their/their
    newText = newText.replace(/\bYour\b/g, "Their");
    newText = newText.replace(/\byour\b/g, "their");
    // Replace Yourself/yourself
    newText = newText.replace(/\bYourself\b/g, "Themselves");
    newText = newText.replace(/\byourself\b/g, "themselves");

    return newText;
};

// Styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFF8F5',
        padding: 50,
        fontFamily: 'Times-Roman',
    },
    coverPage: {
        flexDirection: 'column',
        backgroundColor: '#FFF0F5',
        padding: 60,
        fontFamily: 'Times-Roman',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainTitle: {
        fontSize: 32,
        fontFamily: 'Times-Bold',
        color: '#881337',
        textAlign: 'center',
        marginBottom: 10,
    },
    loveNote: {
        fontSize: 14,
        fontFamily: 'Times-Italic',
        color: '#9F1239',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 30,
        lineHeight: 1.8,
    },
    coupleNames: {
        fontSize: 24,
        fontFamily: 'Times-Bold',
        color: '#BE123C',
        textAlign: 'center',
        marginBottom: 40,
    },
    decorativeLine: {
        width: 120,
        height: 2,
        backgroundColor: '#FCA5A5',
        marginVertical: 20,
    },
    dateText: {
        fontSize: 12,
        fontFamily: 'Times-Italic',
        color: '#9F1239',
        textAlign: 'center',
    },
    header: {
        borderBottomWidth: 2,
        borderBottomColor: '#FECDD3',
        paddingBottom: 15,
        marginBottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 11,
        fontFamily: 'Times-Bold',
        color: '#9F1239',
    },
    headerMeta: {
        fontSize: 10,
        fontFamily: 'Times-Italic',
        textAlign: 'right',
        color: '#BE123C',
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 14,
        fontFamily: 'Times-Bold',
        color: '#BE123C',
        marginBottom: 10,
    },
    subTitle: {
        fontSize: 12,
        fontFamily: 'Times-Bold',
        color: '#9F1239',
        marginBottom: 6,
        marginTop: 8,
    },
    text: {
        fontSize: 11,
        fontFamily: 'Times-Roman',
        lineHeight: 1.6,
        marginBottom: 10,
        color: '#3F3F46',
        textAlign: 'justify',
    },
    italicText: {
        fontSize: 11,
        fontFamily: 'Times-Italic',
        lineHeight: 1.6,
        marginBottom: 10,
        color: '#52525B',
    },
    highlightBox: {
        backgroundColor: '#FFF1F2',
        borderWidth: 1,
        borderColor: '#FECDD3',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
    },
    quoteBox: {
        borderLeftWidth: 3,
        borderLeftColor: '#FB7185',
        paddingLeft: 15,
        marginVertical: 12,
        marginLeft: 10,
    },
    quoteText: {
        fontSize: 12,
        fontFamily: 'Times-Italic',
        color: '#9F1239',
        lineHeight: 1.6,
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        left: 50,
        right: 50,
        borderTopWidth: 1,
        borderTopColor: '#FECDD3',
        paddingTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerText: {
        fontSize: 9,
        fontFamily: 'Times-Italic',
        color: '#9F1239',
    },
    loveMessageBox: {
        backgroundColor: '#FDF2F8',
        borderWidth: 2,
        borderColor: '#FBCFE8',
        borderRadius: 12,
        padding: 20,
        marginVertical: 15,
        alignItems: 'center',
    },
    loveMessageText: {
        fontSize: 12,
        fontFamily: 'Times-Italic',
        color: '#9F1239',
        textAlign: 'center',
        lineHeight: 1.8,
    },
});

const RelationshipReport = ({ partner1, partner2 }: { partner1: AssessmentData; partner2?: AssessmentData }) => {
    const name1 = partner1.partnerName;
    const name2 = partner2?.partnerName;
    const fullDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const style1 = partner1.result.style;
    const styleInfo1 = attachmentStyles[style1];

    const style2 = partner2?.result.style;
    const styleInfo2 = style2 ? attachmentStyles[style2] : null;

    const pairingKey = style2 ? getPairingKey(style1, style2) : null;
    const pairingAnalysis = (pairingKey && style2 && name2)
        ? getPersonalizedPairingAnalysis(style1, style2, name1, name2)
        : null;
    const strategies = style2 ? getStrategiesForPairing(style1, style2) : null;

    // Prepare stories
    let personalizedStories: { title: string; story: string }[] = [];
    if (pairingKey && style2 && name2) {
        const rawStories = conflictStories[pairingKey] || [];

        // Determine name mapping based on key order
        let p1Name = name1;
        let p2Name = name2;
        if (pairingKey !== `${style1}-${style2}`) {
            p1Name = name2;
            p2Name = name1;
        }

        personalizedStories = rawStories.map(story => ({
            title: story.title,
            story: story.story
                .replace(/\[Partner1\]/g, p1Name)
                .replace(/\[Partner2\]/g, p2Name)
                .replace(/\(Secure\)/g, "")
                .replace(/\(Anxious\)/g, "")
                .replace(/\(Avoidant\)/g, "")
                .replace(/\(Disorganized\)/g, "")
        }));
    }

    // Chunk stories for pagination
    const storiesPerPage = 4;
    const storyChunks = [];
    for (let i = 0; i < personalizedStories.length; i += storiesPerPage) {
        storyChunks.push(personalizedStories.slice(i, i + storiesPerPage));
    }

    // Calculate total pages
    // Cover(1) + P1(1) + P2(1) + Couple(1) + Strategies(1) + Stories(chunks)
    // Actually: Cover is unnumbered in footer logic? No, footer says "Page 1 of X".
    // In previous code:
    // Page 1: Partner 1
    // Page 2: Partner 2
    // Page 3: Couple
    // Page 4: Strategies
    // Page 5+: Stories
    const totalPages = partner2 ? (4 + storyChunks.length) : 3;

    return (
        <Document>
            {/* Cover Page */}
            <Page size="A4" style={styles.coverPage}>
                <Text style={{ fontSize: 40, color: '#E11D48', marginBottom: 20 }}>~</Text>
                <Text style={styles.mainTitle}>Our Love Story</Text>
                <Text style={styles.mainTitle}>Understanding Guide</Text>
                <View style={styles.decorativeLine} />
                <Text style={styles.coupleNames}>
                    {name1}{name2 ? ` & ${name2}` : "'s Journey"}
                </Text>
                <Text style={styles.loveNote}>
                    "Every love story is beautiful, but ours is my favorite."{"\n"}
                    This guide is a gift of understanding,{"\n"}
                    created with love to help us grow closer together.
                </Text>
                <View style={styles.decorativeLine} />
                <Text style={styles.dateText}>Created with love on {fullDate}</Text>
            </Page>

            {/* Page 1: Partner 1 Narrative Profile */}
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Understanding {name1}</Text>
                    <Text style={styles.headerMeta}>With Love</Text>
                </View>

                <View style={styles.loveMessageBox}>
                    <Text style={styles.loveMessageText}>
                        Dear {name2 || 'Reader'}, to love {name1} fully, it helps to understand the unique way their heart connects with yours.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>The Way {name1} Loves</Text>
                    <Text style={styles.text}>
                        {name1} has a {styleInfo1.name} connection style. {toThirdPerson(styleInfo1.description)}
                    </Text>
                    <Text style={styles.text}>
                        In relationships, this means {name1} brings beautiful gifts to the table. {toThirdPerson(toNarrative(styleInfo1.strengths, "For instance, "))}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>What Makes {name1} Feel Loved</Text>
                    <Text style={styles.text}>
                        Love isn't just a feeling, it's a language. {name1} feels most secure and cherished when their partner understands their core needs.
                    </Text>
                    <View style={styles.highlightBox}>
                        <Text style={styles.italicText}>
                            {toThirdPerson(toNarrative(styleInfo1.needsFromPartner, "Specifically, "))}
                        </Text>
                    </View>
                    <Text style={styles.text}>
                        When {name1} wants to show you love, they often do it in their own special way:
                    </Text>
                    <View style={styles.quoteBox}>
                        <Text style={styles.quoteText}>{toThirdPerson(styleInfo1.showsLove)}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Tender Spots</Text>
                    <Text style={styles.text}>
                        We all have areas where we are still growing. For {name1}, there might be moments where old patterns surface. {toThirdPerson(toNarrative(styleInfo1.challenges, "You might notice "))}
                    </Text>
                    <Text style={styles.text}>
                        It's also helpful to know that {name1} might have some blind spots. {toThirdPerson(toNarrative(styleInfo1.blindSpots, "Sometimes, they might not realize that "))}
                    </Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Made with love for {name1}{name2 ? ` & ${name2}` : ''}</Text>
                    <Text style={styles.footerText}>Page 1 of {totalPages}</Text>
                </View>
            </Page>

            {/* Pages for Partner 2 (if exists) */}
            {partner2 && styleInfo2 && (
                <Page size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Understanding {name2}</Text>
                        <Text style={styles.headerMeta}>With Love</Text>
                    </View>

                    <View style={styles.loveMessageBox}>
                        <Text style={styles.loveMessageText}>
                            Dear {name1}, to love {name2} fully, it helps to understand the unique way their heart connects with yours.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>The Way {name2} Loves</Text>
                        <Text style={styles.text}>
                            {name2} has a {styleInfo2.name} connection style. {toThirdPerson(styleInfo2.description)}
                        </Text>
                        <Text style={styles.text}>
                            In relationships, this means {name2} brings beautiful gifts to the table. {toThirdPerson(toNarrative(styleInfo2.strengths, "For instance, "))}
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>What Makes {name2} Feel Loved</Text>
                        <Text style={styles.text}>
                            Love isn't just a feeling, it's a language. {name2} feels most secure and cherished when their partner understands their core needs.
                        </Text>
                        <View style={styles.highlightBox}>
                            <Text style={styles.italicText}>
                                {toThirdPerson(toNarrative(styleInfo2.needsFromPartner, "Specifically, "))}
                            </Text>
                        </View>
                        <Text style={styles.text}>
                            When {name2} wants to show you love, they often do it in their own special way:
                        </Text>
                        <View style={styles.quoteBox}>
                            <Text style={styles.quoteText}>{toThirdPerson(styleInfo2.showsLove)}</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Tender Spots</Text>
                        <Text style={styles.text}>
                            We all have areas where we are still growing. For {name2}, there might be moments where old patterns surface. {toThirdPerson(toNarrative(styleInfo2.challenges, "You might notice "))}
                        </Text>
                        <Text style={styles.text}>
                            It's also helpful to know that {name2} might have some blind spots. {toThirdPerson(toNarrative(styleInfo2.blindSpots, "Sometimes, they might not realize that "))}
                        </Text>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Made with love for {name1} & {name2}</Text>
                        <Text style={styles.footerText}>Page 2 of {totalPages}</Text>
                    </View>
                </Page>
            )}

            {/* Couple Narrative Analysis */}
            {partner2 && pairingAnalysis && (
                <Page size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Your Love Story Together</Text>
                        <Text style={styles.headerMeta}>{name1} & {name2}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>The Dance of Your Connection</Text>
                        <Text style={styles.text}>
                            {pairingAnalysis.dynamics}
                        </Text>
                        <Text style={styles.text}>
                            Your relationship has a unique rhythm. {toNarrative(pairingAnalysis.strengths, "One of the most beautiful things about your bond is that ")}
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Understanding Your Conflicts</Text>
                        <Text style={styles.text}>
                            Every couple has a "conflict cycle"—a pattern that happens when stress rises. It's not a sign of failure, but a sign of different needs trying to be met.
                        </Text>
                        <View style={styles.highlightBox}>
                            <Text style={styles.subTitle}>Why We React The Way We Do</Text>
                            <Text style={styles.text}>
                                {name1}, when you feel disconnected or stressed, your {styleInfo1.name} side might instinctively {toThirdPerson(styleInfo1.inConflict.toLowerCase())}
                            </Text>
                            <Text style={styles.text}>
                                {name2}, in response to stress, your {styleInfo2!.name} side tends to {toThirdPerson(styleInfo2!.inConflict.toLowerCase())}
                            </Text>
                        </View>
                        <Text style={styles.text}>
                            This interaction can sometimes lead to a cycle where: {toNarrative(pairingAnalysis.keyConflicts, "")}
                        </Text>
                        <Text style={styles.italicText}>
                            Understanding this cycle is the key to breaking it. When you see these patterns happening, try to pause and say, "This is just our pattern happening, not us."
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Growing Together</Text>
                        <Text style={styles.text}>
                            Your love has immense potential for growth. {toNarrative(pairingAnalysis.growthOpportunities, "You have a wonderful opportunity to ")}
                        </Text>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Made with love for {name1} & {name2}</Text>
                        <Text style={styles.footerText}>Page 3 of {totalPages}</Text>
                    </View>
                </Page>
            )}

            {/* Strategies Page - Narrative Style */}
            {strategies && partner2 && (
                <Page size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Nurturing Your Love</Text>
                        <Text style={styles.headerMeta}>Action Guide</Text>
                    </View>

                    <Text style={styles.italicText}>
                        Love is a verb. Here are some gentle ways you can show up for each other every day.
                    </Text>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>For {name1}</Text>
                        {strategies.forPartner1.slice(0, 2).map((strategy) => (
                            <View key={strategy.id} style={{ marginBottom: 15 }}>
                                <Text style={styles.subTitle}>{strategy.title}</Text>
                                <Text style={styles.text}>{strategy.description}</Text>
                                <Text style={styles.text}>
                                    Try this: {toNarrative(strategy.howTo.slice(0, 3), "")}
                                </Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>For {name2}</Text>
                        {strategies.forPartner2.slice(0, 2).map((strategy) => (
                            <View key={strategy.id} style={{ marginBottom: 15 }}>
                                <Text style={styles.subTitle}>{strategy.title}</Text>
                                <Text style={styles.text}>{strategy.description}</Text>
                                <Text style={styles.text}>
                                    Try this: {toNarrative(strategy.howTo.slice(0, 3), "")}
                                </Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Something to Do Together</Text>
                        {strategies.forCouple.slice(0, 1).map((strategy) => (
                            <View key={strategy.id} style={styles.highlightBox}>
                                <Text style={styles.subTitle}>{strategy.title}</Text>
                                <Text style={styles.text}>{strategy.description}</Text>
                                <Text style={styles.text}>
                                    How to practice: {toNarrative(strategy.howTo.slice(0, 4), "")}
                                </Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Made with love for {name1} & {name2}</Text>
                        <Text style={styles.footerText}>Page 4 of {totalPages}</Text>
                    </View>
                </Page>
            )}

            {/* Real World Perspective Pages (Chunked) */}
            {partner2 && styleInfo2 && storyChunks.map((chunk, chunkIndex) => (
                <Page key={chunkIndex} size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>
                            {chunkIndex === 0 ? "Real World Perspective" : "Real World Perspective (Cont.)"}
                        </Text>
                        <Text style={styles.headerMeta}>Keeping Love Strong</Text>
                    </View>

                    <View style={styles.section}>
                        {chunkIndex === 0 && (
                            <Text style={styles.text}>
                                Here are some common scenarios that couples with your specific connection styles often navigate. You might recognize some of these moments.
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
                                <Text style={styles.sectionTitle}>The "Why" Behind the Behavior</Text>
                                <Text style={styles.text}>
                                    Now that you understand these patterns, you can see that your partner isn't trying to hurt you. They are just trying to protect themselves in the only way they know how.
                                </Text>
                                <Text style={styles.text}>
                                    When you see this happening, take a deep breath. Remind yourself: "My partner is struggling right now, and so am I. We are on the same team."
                                </Text>
                            </View>

                            <View style={styles.loveMessageBox}>
                                <Text style={styles.loveMessageText}>
                                    Please don't see every conflict as a "red flag" or a reason to break up.
                                    Real love isn't about never fighting; it's about repairing the rupture.
                                    {"\n"}{"\n"}
                                    Be calm. Understand each other. Fix it together.
                                    {"\n"}
                                    You have everything you need to make this work.
                                </Text>
                            </View>
                        </View>
                    )}

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Made with love for {name1} & {name2}</Text>
                        <Text style={styles.footerText}>Page {5 + chunkIndex} of {totalPages}</Text>
                    </View>
                </Page>
            ))}
        </Document>
    );
};

export async function generateRelationshipPdf(
    partner1: AssessmentData,
    partner2?: AssessmentData
): Promise<void> {
    const blob = await pdf(<RelationshipReport partner1={partner1} partner2={partner2} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const names = partner2
        ? `${partner1.partnerName}_and_${partner2.partnerName}`
        : partner1.partnerName;
    link.download = `Love_Story_${names.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
