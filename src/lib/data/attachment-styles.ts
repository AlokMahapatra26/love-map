export type AttachmentStyle = 'secure' | 'anxious' | 'avoidant' | 'disorganized';

export interface AttachmentResult {
    style: AttachmentStyle;
    anxietyScore: number;
    avoidanceScore: number;
    anxietyLevel: 'low' | 'moderate' | 'high';
    avoidanceLevel: 'low' | 'moderate' | 'high';
}

export interface AttachmentStyleInfo {
    name: string;
    shortName: string;
    icon: string;
    color: string;
    bgColor: string;
    description: string;
    strengths: string[];
    challenges: string[];
    needsFromPartner: string[];
    blindSpots: string[];
    inConflict: string;
    showsLove: string;
}

export const attachmentStyles: Record<AttachmentStyle, AttachmentStyleInfo> = {
    secure: {
        name: "Secure Attachment",
        shortName: "Secure",
        icon: "ShieldCheck",
        color: "#22c55e",
        bgColor: "#dcfce7",
        description: "You have a healthy, balanced approach to relationships. You're comfortable with intimacy and independence, able to communicate your needs clearly, and generally trust your partner. You can regulate your emotions well during conflicts and see disagreements as opportunities for growth rather than threats to the relationship.",
        strengths: [
            "Comfortable with both intimacy and independence",
            "Effective at communicating needs and boundaries",
            "Can regulate emotions during conflicts",
            "Trusts partner while maintaining self-identity",
            "Approaches disagreements with curiosity rather than defensiveness",
            "Can apologize sincerely and forgive genuinely",
        ],
        challenges: [
            "May not fully understand insecure partners' struggles",
            "Could become frustrated with partners who need more reassurance",
            "Might take emotional stability for granted",
        ],
        needsFromPartner: [
            "Mutual respect and open communication",
            "A partner who values both togetherness and personal space",
            "Honest expression of feelings and needs",
            "Consistency and reliability",
        ],
        blindSpots: [
            "Assuming others process emotions the same way",
            "Underestimating how triggering certain situations can be for insecure partners",
            "Taking relationship security for granted",
        ],
        inConflict: "You typically remain calm and seek to understand your partner's perspective. You focus on finding solutions rather than winning arguments, and you're able to repair the relationship after disagreements.",
        showsLove: "Through consistent presence, open communication, physical affection, quality time together, and supporting your partner's goals and independence.",
    },

    anxious: {
        name: "Anxious Attachment",
        shortName: "Anxious",
        icon: "Waves",
        color: "#eab308",
        bgColor: "#fef9c3",
        description: "You have a deep capacity for love and connection, but often worry about your relationship's security. You may seek frequent reassurance from your partner and feel anxious when they're not available. Your sensitivity to your partner's moods makes you attuned to their needs, but can also lead to overthinking and emotional intensity.",
        strengths: [
            "Deeply loving and committed to relationships",
            "Highly attuned to partner's emotional states",
            "Willing to work hard on relationships",
            "Expressive with feelings and affection",
            "Creates strong emotional bonds",
            "Motivated to resolve conflicts quickly",
        ],
        challenges: [
            "Tendency to seek constant reassurance",
            "May interpret neutral behaviors as rejection",
            "Can become preoccupied with relationship worries",
            "Difficulty self-soothing during emotional distress",
            "May struggle with boundaries",
            "Can feel responsible for partner's emotions",
        ],
        needsFromPartner: [
            "Consistent reassurance and verbal affirmations of love",
            "Quick responses to messages when possible",
            "Clear communication about feelings and intentions",
            "Patience during moments of anxiety",
            "Help understanding that space doesn't mean rejection",
        ],
        blindSpots: [
            "How pursuit behavior can push partners away",
            "That your need for closeness may feel overwhelming to some",
            "Projecting fears onto ambiguous situations",
            "Difficulty seeing your own value independent of the relationship",
        ],
        inConflict: "You may become highly emotional, seek immediate resolution, or pursue your partner for reassurance. You might have difficulty letting issues rest and may need help self-soothing before productive conversation is possible.",
        showsLove: "Through frequent check-ins, verbal expressions of love, physical closeness, acts of devotion, prioritizing the relationship, and being highly responsive to partner's needs.",
    },

    avoidant: {
        name: "Avoidant Attachment",
        shortName: "Avoidant",
        icon: "ShieldOff",
        color: "#3b82f6",
        bgColor: "#dbeafe",
        description: "You value independence and self-reliance highly. While you do form relationships, you may feel uncomfortable with too much emotional closeness or dependency. You tend to process emotions internally and may need space during stressful times. Your independence is a strength, but can sometimes create distance in intimate relationships.",
        strengths: [
            "Self-sufficient and emotionally stable",
            "Brings calm energy to relationships",
            "Respects partner's independence",
            "Logical and solution-oriented in conflicts",
            "Consistent and reliable",
            "Not easily overwhelmed by partner's emotions",
        ],
        challenges: [
            "Difficulty expressing emotions and vulnerability",
            "May withdraw during emotional conversations",
            "Can seem distant or disconnected to partners",
            "Struggle to ask for or accept help",
            "May prioritize independence over connection",
            "Can shut down or become dismissive under pressure",
        ],
        needsFromPartner: [
            "Respect for personal space and alone time",
            "Low-pressure approach to emotional discussions",
            "Patience with the pace of emotional opening",
            "Appreciation of non-verbal expressions of love",
            "Understanding that withdrawal isn't rejection",
        ],
        blindSpots: [
            "How withdrawal affects partners emotionally",
            "That avoiding emotions doesn't make them disappear",
            "The connection between childhood experiences and current patterns",
            "How much partners may crave more emotional engagement",
        ],
        inConflict: "You may need to step away to process emotions, which can frustrate partners who want immediate resolution. You might minimize issues or become logically detached. You may need time before you're ready to discuss emotional topics.",
        showsLove: "Through actions rather than words, reliability, providing for partner, giving thoughtful gifts, respecting partner's independence, and being a stable presence.",
    },

    disorganized: {
        name: "Disorganized Attachment",
        shortName: "Fearful",
        icon: "GitMerge",
        color: "#a855f7",
        bgColor: "#f3e8ff",
        description: "You experience a push-pull in relationships—craving closeness while also fearing it. You may swing between seeking connection and pushing it away, which can feel confusing both to you and your partners. This pattern often stems from early experiences where those who should provide safety also caused distress. With awareness and support, you can develop more secure patterns.",
        strengths: [
            "Deep capacity for empathy and understanding",
            "Highly perceptive of others' emotions",
            "Can adapt to different relationship dynamics",
            "Often deeply creative and introspective",
            "Strong survivor instincts",
            "Potential for profound personal growth",
        ],
        challenges: [
            "Unpredictable emotional responses",
            "Difficulty trusting despite wanting to",
            "May sabotage relationships unconsciously",
            "Struggle with emotional regulation",
            "Confusion about own needs and wants",
            "May experience intense fear of both abandonment and engulfment",
        ],
        needsFromPartner: [
            "Patience with emotional unpredictability",
            "Consistent, non-threatening presence",
            "Clear but gentle communication",
            "Understanding of past wounds without judgment",
            "Help co-regulating during emotional overwhelm",
            "Slow building of trust through repeated positive experiences",
        ],
        blindSpots: [
            "How hot-and-cold behavior affects partners",
            "Unconscious patterns of pushing people away",
            "The connection between past trauma and current reactions",
            "That stability and excitement aren't mutually exclusive",
        ],
        inConflict: "You may experience intense, rapidly changing emotions. You might alternate between seeking connection and withdrawing. Conflicts can trigger past wounds, leading to responses that seem disproportionate. You may need help grounding and returning to the present moment.",
        showsLove: "In varying ways depending on your state—sometimes through intense devotion and connection, other times through needing space. When feeling safe, you can be deeply loving, creative, and attuned to your partner.",
    },
};

// Calculate scores and determine attachment style
export function calculateAttachmentStyle(answers: Record<number, number>): AttachmentResult {
    const ANXIETY_THRESHOLD = 3.5;
    const AVOIDANCE_THRESHOLD = 3.5;

    let anxietySum = 0;
    let avoidanceSum = 0;
    let anxietyCount = 0;
    let avoidanceCount = 0;

    // Questions 1-10 are anxiety, 11-20 are avoidance
    // Reverse scored: 16, 17, 18, 19
    const reverseScored = [16, 17, 18, 19];

    for (const [questionId, value] of Object.entries(answers)) {
        const id = parseInt(questionId);
        let score = value;

        // Apply reverse scoring
        if (reverseScored.includes(id)) {
            score = 8 - value; // 7-point scale, so 8 - value gives reverse
        }

        if (id <= 10) {
            anxietySum += score;
            anxietyCount++;
        } else {
            avoidanceSum += score;
            avoidanceCount++;
        }
    }

    const anxietyScore = anxietyCount > 0 ? anxietySum / anxietyCount : 0;
    const avoidanceScore = avoidanceCount > 0 ? avoidanceSum / avoidanceCount : 0;

    const anxietyLevel = anxietyScore > ANXIETY_THRESHOLD ? 'high' : 'low';
    const avoidanceLevel = avoidanceScore > AVOIDANCE_THRESHOLD ? 'high' : 'low';

    let style: AttachmentStyle;

    if (anxietyLevel === 'low' && avoidanceLevel === 'low') {
        style = 'secure';
    } else if (anxietyLevel === 'high' && avoidanceLevel === 'low') {
        style = 'anxious';
    } else if (anxietyLevel === 'low' && avoidanceLevel === 'high') {
        style = 'avoidant';
    } else {
        style = 'disorganized';
    }

    return {
        style,
        anxietyScore: Math.round(anxietyScore * 100) / 100,
        avoidanceScore: Math.round(avoidanceScore * 100) / 100,
        anxietyLevel,
        avoidanceLevel,
    };
}
