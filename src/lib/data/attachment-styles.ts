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
    descriptionHinglish?: string;
    strengths: string[];
    strengthsHinglish?: string[];
    challenges: string[];
    challengesHinglish?: string[];
    needsFromPartner: string[];
    needsFromPartnerHinglish?: string[];
    blindSpots: string[];
    blindSpotsHinglish?: string[];
    inConflict: string;
    inConflictHinglish?: string;
    showsLove: string;
    showsLoveHinglish?: string;
}

export const attachmentStyles: Record<AttachmentStyle, AttachmentStyleInfo> = {
    secure: {
        name: "Secure Attachment",
        shortName: "Secure",
        icon: "ShieldCheck",
        color: "#22c55e",
        bgColor: "#dcfce7",
        description: "You have a healthy, balanced approach to relationships. You're comfortable with intimacy and independence, able to communicate your needs clearly, and generally trust your partner. You can regulate your emotions well during conflicts and see disagreements as opportunities for growth rather than threats to the relationship.",
        descriptionHinglish: "Aapka relationship approach kaafi healthy aur balanced hai. Aap intimacy aur independence dono mein comfortable feel karte hain, apni needs clear rakhte hain aur partner par trust karte hain. Jhagdo mein aap apne emotions sambhaal lete hain aur disagreements ko rishta tootne ka dar nahi, balki growth ka mauka maante hain.",
        strengths: [
            "Comfortable with both intimacy and independence",
            "Effective at communicating needs and boundaries",
            "Can regulate emotions during conflicts",
            "Trusts partner while maintaining self-identity",
            "Approaches disagreements with curiosity rather than defensiveness",
            "Can apologize sincerely and forgive genuinely",
        ],
        strengthsHinglish: [
            "Pyaar aur space dono mein comfortable",
            "Apni needs aur boundaries clear batana",
            "Jhagdo mein emotions control karna",
            "Partner pe trust, par apni pehchaan bhi maintain karna",
            "Behes ko defensiveness nahi, curiosity se dekhna",
            "Dil se maafi maangna aur maaf karna",
        ],
        challenges: [
            "May not fully understand insecure partners' struggles",
            "Could become frustrated with partners who need more reassurance",
            "Might take emotional stability for granted",
        ],
        challengesHinglish: [
            "Insecure partner ki struggle samajhne mein dikkat",
            "Zyada reassurance maangne wale partner se frustration",
            "Emotional stability ko 'given' maan lena",
        ],
        needsFromPartner: [
            "Mutual respect and open communication",
            "A partner who values both togetherness and personal space",
            "Honest expression of feelings and needs",
            "Consistency and reliability",
        ],
        needsFromPartnerHinglish: [
            "Izzat aur khul ke baat karna",
            "Partner jo saath aur space dono ki value kare",
            "Feelings aur needs ka sachcha expression",
            "Bharosa aur consistency (jo bole wo kare)",
        ],
        blindSpots: [
            "Assuming others process emotions the same way",
            "Underestimating how triggering certain situations can be for insecure partners",
            "Taking relationship security for granted",
        ],
        blindSpotsHinglish: [
            "Ye sochna ki sab aapki tarah hi feel karte hain",
            "Partner ke triggers ko chhota samajhna",
            "Rishte ki security ko halke mein lena",
        ],
        inConflict: "You typically remain calm and seek to understand your partner's perspective. You focus on finding solutions rather than winning arguments, and you're able to repair the relationship after disagreements.",
        inConflictHinglish: "Aap aam taur par shaant rehte hain aur partner ki side samajhne ki koshish karte hain. Aapka focus behas jeetne par nahi, problem solve karne par hota hai, aur aap jhagde ke baad rishta repair kar lete hain.",
        showsLove: "Through consistent presence, open communication, physical affection, quality time together, and supporting your partner's goals and independence.",
        showsLoveHinglish: "Hamesha saath reh kar, khul kar baat karke, pyaar dikha kar, quality time de kar, aur partner ke sapno ko support kar ke.",
    },

    anxious: {
        name: "Anxious Attachment",
        shortName: "Anxious",
        icon: "Waves",
        color: "#eab308",
        bgColor: "#fef9c3",
        description: "You have a deep capacity for love and connection, but often worry about your relationship's security. You may seek frequent reassurance from your partner and feel anxious when they're not available. Your sensitivity to your partner's moods makes you attuned to their needs, but can also lead to overthinking and emotional intensity.",
        descriptionHinglish: "Aap bohat gehra pyaar kar sakte hain, par aksar rishte ki security ko le kar chinta mein rehte hain. Aapko partner se baar-baar reassurance chahiye hoti hai aur jab wo available na ho to ghabrahat hoti hai. Aap partner ka mood turant bhaamp lete hain, par is wajah se overthinking aur emotional stress bhi badh jata hai.",
        strengths: [
            "Deeply loving and committed to relationships",
            "Highly attuned to partner's emotional states",
            "Willing to work hard on relationships",
            "Expressive with feelings and affection",
            "Creates strong emotional bonds",
            "Motivated to resolve conflicts quickly",
        ],
        strengthsHinglish: [
            "Dil se pyaar karne wala aur committed",
            "Partner ke mood ko bina bole samajhna",
            "Rishte ke liye mehnat karne ko taiyaar",
            "Apni feelings aur pyaar khul kar dikhana",
            "Mazboot emotional connection banana",
            "Jhagde jaldi khatam karne ki chahat",
        ],
        challenges: [
            "Tendency to seek constant reassurance",
            "May interpret neutral behaviors as rejection",
            "Can become preoccupied with relationship worries",
            "Difficulty self-soothing during emotional distress",
            "May struggle with boundaries",
            "Can feel responsible for partner's emotions",
        ],
        challengesHinglish: [
            "Baar-baar tasalli (reassurance) maangna",
            "Normal baaton ko bhi rejection samajh lena",
            "Har waqt rishte ki tension lena",
            "Jab upset hon to khud ko shant na kar paana",
            "Boundaries maintain karne mein mushkil",
            "Partner ki happiness ki zimmedari khud pe lena",
        ],
        needsFromPartner: [
            "Consistent reassurance and verbal affirmations of love",
            "Quick responses to messages when possible",
            "Clear communication about feelings and intentions",
            "Patience during moments of anxiety",
            "Help understanding that space doesn't mean rejection",
            "Validation of feelings",
        ],
        needsFromPartnerHinglish: [
            "Lagataar pyaar ka ehsaas aur reassurance",
            "Messages ka jaldi reply (jab possible ho)",
            "Feelings aur iradon par clear baat karna",
            "Ghabrahat ke waqt thoda sabr (patience)",
            "Ye samjhana ki 'space' ka matlab 'breakup' nahi hai",
            "Aapki feelings ko valid maanna",
        ],
        blindSpots: [
            "How pursuit behavior can push partners away",
            "That your need for closeness may feel overwhelming to some",
            "Projecting fears onto ambiguous situations",
            "Difficulty seeing your own value independent of the relationship",
        ],
        blindSpotsHinglish: [
            "Zyada pichhe padne se partner door ho sakta hai",
            "Aapki closeness ki maang kisi ko suffocating lag sakti hai",
            "Jahan kuch nahi hai wahan bhi dar dhoond lena",
            "Rishte ke bahar apni khud ki value na dekh paana",
        ],
        inConflict: "You may become highly emotional, seek immediate resolution, or pursue your partner for reassurance. You might have difficulty letting issues rest and may need help self-soothing before productive conversation is possible.",
        inConflictHinglish: "Aap bohat emotional ho sakte hain aur chahte hain ki jhagda abhi ke abhi solve ho. Aap baat ko chhod nahi paate aur partner ke pichhe pad sakte hain. Baat karne se pehle aapko khud ko shant karne ki zaroorat hoti hai.",
        showsLove: "Through frequent check-ins, verbal expressions of love, physical closeness, acts of devotion, prioritizing the relationship, and being highly responsive to partner's needs.",
        showsLoveHinglish: "Baar-baar haal-chaal puch kar, 'I love you' bol kar, pass reh kar, poori devotion se, rishte ko sabse upar rakh kar, aur partner ki needs ka turant khayal rakh kar.",
    },

    avoidant: {
        name: "Avoidant Attachment",
        shortName: "Avoidant",
        icon: "ShieldOff",
        color: "#3b82f6",
        bgColor: "#dbeafe",
        description: "You value independence and self-reliance highly. While you do form relationships, you may feel uncomfortable with too much emotional closeness or dependency. You tend to process emotions internally and may need space during stressful times. Your independence is a strength, but can sometimes create distance in intimate relationships.",
        descriptionHinglish: "Aap apni azaadi aur khud par nirbhar rehna (self-reliance) bohat pasand karte hain. Aap rishte banate to hain, par bohat zyada emotional closeness ya kisi par depend hona aapko uncomfortable lagta hai. Aap apni feelings apne andar hi rakhte hain aur tension mein akele rehna pasand karte hain. Aapki independence achhi hai, par kabhi-kabhi ye rishte mein doori la sakti hai.",
        strengths: [
            "Self-sufficient and emotionally stable",
            "Brings calm energy to relationships",
            "Respects partner's independence",
            "Logical and solution-oriented in conflicts",
            "Consistent and reliable",
            "Not easily overwhelmed by partner's emotions",
        ],
        strengthsHinglish: [
            "Khud par nirbhar aur emotionally stable",
            "Rishte mein shanti (calm) laana",
            "Partner ki azaadi ki izzat karna",
            "Jhagdo mein logic aur solution par focus karna",
            "Bharosemand aur consistent",
            "Partner ke emotions se jaldi ghabrana nahi",
        ],
        challenges: [
            "Difficulty expressing emotions and vulnerability",
            "May withdraw during emotional conversations",
            "Can seem distant or disconnected to partners",
            "Struggle to ask for or accept help",
            "May prioritize independence over connection",
            "Can shut down or become dismissive under pressure",
        ],
        challengesHinglish: [
            "Feelings aur kamzori dikhane mein mushkil",
            "Emotional baaton ke waqt chup ho jana ya hat jana",
            "Partner ko lag sakta hai ki aap 'pathar dil' hain",
            "Madad mangna ya lena mushkil lagna",
            "Connection se zyada azaadi ko chunna",
            "Pressure mein bilkul chup ho jana ya baat taal dena",
        ],
        needsFromPartner: [
            "Respect for personal space and alone time",
            "Low-pressure approach to emotional discussions",
            "Patience with the pace of emotional opening",
            "Appreciation of non-verbal expressions of love",
            "Understanding that withdrawal isn't rejection",
        ],
        needsFromPartnerHinglish: [
            "Space aur 'me-time' ki respect",
            "Emotional baaton mein pressure na daalna",
            "Khulne mein thoda waqt dene ka sabr",
            "Bina bole pyaar dikhane ke tareekon ko samajhna",
            "Ye samajhna ki door rehne ka matlab nafrat nahi hai",
        ],
        blindSpots: [
            "How withdrawal affects partners emotionally",
            "That avoiding emotions doesn't make them disappear",
            "The connection between childhood experiences and current patterns",
            "How much partners may crave more emotional engagement",
        ],
        blindSpotsHinglish: [
            "Aapka chup rehna partner ko kitna hurt karta hai",
            "Feelings ko ignore karne se wo khatam nahi hoti",
            "Bachpan ki baaton ka aaj ke behavior par asar",
            "Partner ko aapke emotional saath ki kitni zyada zaroorat ho sakti hai",
        ],
        inConflict: "You may need to step away to process emotions, which can frustrate partners who want immediate resolution. You might minimize issues or become logically detached. You may need time before you're ready to discuss emotional topics.",
        inConflictHinglish: "Jhagde mein aapko sochne ke liye door jana padta hai, jisse partner chidh sakta hai. Aap baat ko chhota dikhane ki koshish karte hain ya logic se feelings kaat dete hain. Emotional topic par baat karne ke liye aapko time chahiye hota hai.",
        showsLove: "Through actions rather than words, reliability, providing for partner, giving thoughtful gifts, respecting partner's independence, and being a stable presence.",
        showsLoveHinglish: "Baaton se kam aur kaamon se zyada, zimmedari utha kar, tohfe de kar, partner ki azaadi ki izzat kar ke, aur hamesha wahan mojood reh kar.",
    },

    disorganized: {
        name: "Disorganized Attachment",
        shortName: "Fearful",
        icon: "GitMerge",
        color: "#a855f7",
        bgColor: "#f3e8ff",
        description: "You experience a push-pull in relationships—craving closeness while also fearing it. You may swing between seeking connection and pushing it away, which can feel confusing both to you and your partners. This pattern often stems from early experiences where those who should provide safety also caused distress. With awareness and support, you can develop more secure patterns.",
        descriptionHinglish: "Aap rishton mein ek 'kheecha-taani' feel karte hain—paas aana chahte hain par darr bhi lagta hai. Kabhi aap pyaar dhoondte hain aur kabhi use dhakka de dete hain, jo aapke aur partner dono ke liye confuse karne wala hota hai. Aksar ye purane experiences ki wajah se hota hai jahan jin logon se safety milni thi wahi darr ka kaaran ban gaye. Sahi support se aap secure ho sakte hain.",
        strengths: [
            "Deep capacity for empathy and understanding",
            "Highly perceptive of others' emotions",
            "Can adapt to different relationship dynamics",
            "Often deeply creative and introspective",
            "Strong survivor instincts",
            "Potential for profound personal growth",
        ],
        strengthsHinglish: [
            "Hama-dardi (empathy) aur samajh ki gehri kshamta",
            "Doosron ke emotions ko bohot acche se samajhna",
            "Alag-alag haalaat mein dhal jane ki taqat",
            "Aksar creative aur gehra sochne wale",
            "Mushkilon se bach nikalne ki instinct",
            "Khud ko behtar banane ka bada potential",
        ],
        challenges: [
            "Unpredictable emotional responses",
            "Difficulty trusting despite wanting to",
            "May sabotage relationships unconsciously",
            "Struggle with emotional regulation",
            "Confusion about own needs and wants",
            "May experience intense fear of both abandonment and engulfment",
            "Tendency to push people away",
        ],
        challengesHinglish: [
            "Kab kya reaction aayega pata nahi hota",
            "Chah kar bhi bharosa na kar paana",
            "Anjaane mein rishta kharab kar dena",
            "Emotions sambhalne mein dikkat",
            "Apni needs ko le kar confusion",
            "Akele rehne ka darr aur paas aane ka darr dono lagna",
            "Logon ko door dhakelne ki aadat",
        ],
        needsFromPartner: [
            "Patience with emotional unpredictability",
            "Consistent, non-threatening presence",
            "Clear but gentle communication",
            "Understanding of past wounds without judgment",
            "Help co-regulating during emotional overwhelm",
            "Slow building of trust through repeated positive experiences",
        ],
        needsFromPartnerHinglish: [
            "Mood swings ke saath thoda sabr",
            "Ek jaisa aur safe behavior (daraaye nahi)",
            "Saaf par pyaar se baat karna",
            "Purane zakhmon ko bina judge kiye samajhna",
            "Ghabrahat mein shant hone mein madad",
            "Dheere-dheere bharosa jeetna",
        ],
        blindSpots: [
            "How hot-and-cold behavior affects partners",
            "Unconscious patterns of pushing people away",
            "The connection between past trauma and current reactions",
            "That stability and excitement aren't mutually exclusive",
        ],
        blindSpotsHinglish: [
            "Aapka kabhi garm kabhi narm behavior partner ko tod sakta hai",
            "Bina soche logon ko door karne ki aadat",
            "Purane darr aaj ke rishte ko kaise kharab kar rahe hain",
            "Ki rishta 'stable' hone ke baad bhi 'exciting' ho sakta hai",
        ],
        inConflict: "You may experience intense, rapidly changing emotions. You might alternate between seeking connection and withdrawing. Conflicts can trigger past wounds, leading to responses that seem disproportionate. You may need help grounding and returning to the present moment.",
        inConflictHinglish: "Aapke emotions tezi se badal sakte hain. Kabhi aap paas aana chahenge, kabhi bhaag jana. Jhagde mein purane ghaav taaza ho sakte hain jisse aapka reaction bohat tez ho sakta hai. Aapko shant hone ke liye madad ki zaroorat pad sakti hai.",
        showsLove: "In varying ways depending on your state—sometimes through intense devotion and connection, other times through needing space. When feeling safe, you can be deeply loving, creative, and attuned to your partner.",
        showsLoveHinglish: "Mood ke hisaab se alag tareeke se—kabhi bohat zyada pyaar aur devotion se, kabhi door reh kar. Jab aap safe feel karte hain, to aap bohat gehra aur sachcha pyaar de sakte hain.",
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
