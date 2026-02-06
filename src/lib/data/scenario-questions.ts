// Scenario-based questions that feel personal and real
// Each response option maps to an attachment style tendency

export type AttachmentTendency = 'secure' | 'anxious' | 'avoidant' | 'disorganized';

export interface ScenarioOption {
    id: string;
    text: string;
    tendency: AttachmentTendency;
    weight: number; // How strongly this indicates the tendency (1-3)
    textHinglish?: string;
}

export interface ScenarioQuestion {
    id: number;
    category: 'communication' | 'conflict' | 'intimacy' | 'trust' | 'independence' | 'vulnerability';
    // Template uses {{partner}} for partner name substitution
    scenario: string;
    scenarioHinglish?: string;
    options: ScenarioOption[];
}

export const scenarioQuestions: ScenarioQuestion[] = [
    // 1. COMMUNICATION: Texting delay (Was Q1)
    {
        id: 1,
        category: 'communication',
        scenario: "You send {{partner}} a heartfelt message about how much they mean to you. It's been 3 hours and they haven't replied. What's going through your mind?",
        scenarioHinglish: "Apne {{partner}} ko ek dil se likha message bheja ki wo aapke liye kitne important hain. 3 ghante ho gaye par koi reply nahi aaya. Aapke dimaag mein kya chal raha hai?",
        options: [
            {
                id: '1a',
                text: "They're probably busy with work or something. I'll hear back when they're free.",
                textHinglish: "Wo shayad kaam mein busy honge. Free hote hi reply kar denge.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '1b',
                text: "I check my phone every few minutes. Did I say something wrong? Are they upset with me?",
                textHinglish: "Main baar-baar phone check karta/karti hu. Maine kuch galat toh nahi keh diya? Kya wo naraaz hain?",
                tendency: 'anxious',
                weight: 3
            },
            {
                id: '1c',
                text: "I regret sending such an emotional message. I probably came on too strong.",
                textHinglish: "Mujhe wo emotional message bhejne ka regret ho raha hai. Shayad zyada hi emotional ho gaya/gayi main.",
                tendency: 'avoidant',
                weight: 2
            },
            {
                id: '1d',
                text: "I swing between worrying they're ignoring me and telling myself I don't care either way.",
                textHinglish: "Kabhi lagta hai wo ignore kar rahe hain, kabhi lagta hai mujhe farak nahi padta.",
                tendency: 'disorganized',
                weight: 2
            }
        ]
    },
    // 2. CONFLICT: Partner needs space (Was Q6)
    {
        id: 2,
        category: 'conflict',
        scenario: "After a disagreement, {{partner}} needs space and asks to be alone for a few hours. What happens in your head?",
        scenarioHinglish: "Jhagde ke baad, {{partner}} ko thoda time chahiye aur wo akele rehna chahte hain. Aapke dimaag mein kya chalta hai?",
        options: [
            {
                id: '2a',
                text: "I respect their need for space. We'll reconnect when we're both calmer.",
                textHinglish: "Main unki space ki respect karta/karti hu. Jab dono shant honge tab baat karenge.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '2b',
                text: "Every minute feels like torture. I keep wanting to check on them, apologize, fix it.",
                textHinglish: "Ek-ek minute kaatna mushkil ho jaata hai. Mann karta hai abhi jaa ke manau aur sab thik kar du.",
                tendency: 'anxious',
                weight: 3
            },
            {
                id: '2c',
                text: "Good. I need space too. In fact, maybe I needed it more than they did.",
                textHinglish: "Accha hai. Mujhe bhi space chahiye. Balki mujhe unse zyada zaroorat hai.",
                tendency: 'avoidant',
                weight: 2
            },
            {
                id: '2d',
                text: "I tell myself I'm fine with it, but then feel abandoned. I might text something I regret.",
                textHinglish: "Main khud ko bolta/bolti hu thik hai, par fir lagta hai unhone mujhe chhod diya. Gusse mein kuch galat msg kar sakta/sakti hu.",
                tendency: 'disorganized',
                weight: 3
            }
        ]
    },
    // 3. CONFLICT: Heated argument (Was Q4)
    {
        id: 3,
        category: 'conflict',
        scenario: "You and {{partner}} are in a heated argument. Things are getting tense. What's your instinct?",
        scenarioHinglish: "Aap aur {{partner}} ke beech ghamasan jhagda ho raha hai. Maahaul garam hai. Aapka pehla reaction kya hoga?",
        options: [
            {
                id: '3a',
                text: "I take a breath and try to understand their perspective. Let's work through this together.",
                textHinglish: "Main saans leta/leti hu aur unki baat samajhne ki koshish karta/karti hu. Hum saath milkar solve karenge.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '3b',
                text: "I need to resolve this NOW. I can't stand the tension. I'll apologize just to make it stop.",
                textHinglish: "Mujhe ye ABHI solve karna hai. Main ye tension bardasht nahi kar sakta/sakti. Main sorry bol dunga bas khatam karne ke liye.",
                tendency: 'anxious',
                weight: 3
            },
            {
                id: '3c',
                text: "I shut down and walk away. I need space to cool off. This is too much.",
                textHinglish: "Main chup ho jaata/jaati hu aur chale jaata/jaati hu. Mujhe shant hone ke liye space chahiye. Ye bohot zyada hai ho raha hai.",
                tendency: 'avoidant',
                weight: 3
            },
            {
                id: '3d',
                text: "I oscillate between wanting to fix things immediately and wanting to hurt them back.",
                textHinglish: "Kabhi mann karta hai abhi thik karu, kabhi mann karta hai unhe bhi hurt karu.",
                tendency: 'disorganized',
                weight: 2
            }
        ]
    },
    // 4. INTIMACY: Deep emotional closeness (Was Q7)
    {
        id: 4,
        category: 'intimacy',
        scenario: "{{partner}} looks into your eyes and says 'I've never felt this close to anyone before.' What's your internal reaction?",
        scenarioHinglish: "{{partner}} aapki aankhon mein dekh kar kehte hain 'Mujhe aaj tak kisi se itna close feel nahi hua.' Aap andar se kaisa feel karte hain?",
        options: [
            {
                id: '4a',
                text: "Warm and connected. I feel the same way and I'm comfortable telling them.",
                textHinglish: "Bohot accha aur connected lagta hai. Main bhi wahi feel karta/karti hu aur bolne mein comfortable hu.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '4b',
                text: "Overjoyed but also scared. What if I lose this? What if I'm not enough?",
                textHinglish: "Khushi toh bahut hoti hai par kahin na kahin ek darr bhi rehta hai. Ya agar ye sab kho diya toh? Ya agar main utna achha partner nahi ban paya jitna tum deserve karte ho?",
                tendency: 'anxious',
                weight: 2
            },
            {
                id: '4c',
                text: "Uncomfortable. That's a lot of pressure. I might change the subject or make a joke.",
                textHinglish: "Ajeeb lagta hai. Bohot pressure aa jaata hai. Main shayad baat badal du ya mazaak kar du.",
                tendency: 'avoidant',
                weight: 3
            },
            {
                id: '4d',
                text: "I want to lean in, but something makes me want to pull away. It's too intense.",
                textHinglish: "Main paas aana chahta/chahti hu par koi cheez mujhe peeche kheenchti hai. Ye bohot intense hai.",
                tendency: 'disorganized',
                weight: 3
            }
        ]
    },
    // 5. INDEPENDENCE: Solo trip (Was Q13)
    {
        id: 5,
        category: 'independence',
        scenario: "{{partner}} wants to take a solo trip for a week - no phones, just them and nature. How do you handle it?",
        scenarioHinglish: "{{partner}} ek hafte ke liye akele trip pe jaana chahte hain - phone nahi, bas wo aur nature. Aap kaise handle karenge?",
        options: [
            {
                id: '5a',
                text: "I think it's great they're doing something for themselves. I'll miss them but I support it.",
                textHinglish: "Badhiya hai, wo apne liye kuch kar rahe hain. Miss karunga/karungi par support karta/karti hu.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '5b',
                text: "A whole week with no contact? That's going to be really hard for me. Can they at least check in daily?",
                textHinglish: "Pura hafta bina baat kiye? Ye mere liye bohot mushkil hoga. Kya wo roz ek baar message nahi kar sakte?",
                tendency: 'anxious',
                weight: 3
            },
            {
                id: '5c',
                text: "Honestly, I'm excited about having the place to myself. I could use some alone time too.",
                textHinglish: "Sach kahu toh maza aayega akele rehne mein. Mujhe bhi thoda me-time chahiye tha.",
                tendency: 'avoidant',
                weight: 2
            },
            {
                id: '5d',
                text: "I encourage them to go but then feel abandoned when they leave. I don't know what I want.",
                textHinglish: "Main kehta hu jao, par jab wo chale jaate hain toh akela feel karta hu. Pata nahi kya chahiye mujhe.",
                tendency: 'disorganized',
                weight: 3
            }
        ]
    },
    // 6. INTIMACY: Partner crying (Was Q9)
    {
        id: 6,
        category: 'intimacy',
        scenario: "During a vulnerable moment, {{partner}} starts crying in front of you. What do you do?",
        scenarioHinglish: "Ek emotional moment mein, {{partner}} aapke saamne rone lagte hain. Aap kya karenge?",
        options: [
            {
                id: '6a',
                text: "I hold them close, let them cry, and reassure them I'm here. No words needed.",
                textHinglish: "Main unhe gale lagauga/lagaungi, rone dunga/dungi, aur ehsaas dilauga/dilaungi ki main saath hu.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '6b',
                text: "I immediately try to fix whatever's wrong. Their pain makes me anxious - I need to help NOW.",
                textHinglish: "Main turant problem solve karne ki koshish karta/karti hu. Unhe rota dekh mujhe ghabrahat hoti hai - mujhe abhi help karni hai.",
                tendency: 'anxious',
                weight: 2
            },
            {
                id: '6c',
                text: "I feel awkward and unsure what to do. I might offer practical advice to move past the emotion.",
                textHinglish: "Mujhe awkward lagta hai. Samajh nahi aata kya karu. Shayad main koi practical advice du taaki wo chup ho jaayein.",
                tendency: 'avoidant',
                weight: 3
            },
            {
                id: '6d',
                text: "I want to comfort them but I freeze up. Their vulnerability triggers something uncomfortable in me.",
                textHinglish: "Main unhe chup karana chahta/chahti hu par main jam jaata/jaati hu. Unka rona mujhe uncomfortable kar deta hai.",
                tendency: 'disorganized',
                weight: 3
            }
        ]
    },
    // 7. TRUST: Ex at party (Was Q10)
    {
        id: 7,
        category: 'trust',
        scenario: "{{partner}} is going to a party where their attractive ex will be there. They assure you nothing will happen. How do you feel?",
        scenarioHinglish: "{{partner}} ek party mein ja rahe hain jahan unka/unki attractive ex bhi hoga/hogi. Wo kehte hain kuch nahi hoga. Aapko kaisa lag raha hai?",
        options: [
            {
                id: '7a',
                text: "I trust them. They're with me by choice. I hope they have fun.",
                textHinglish: "Mujhe unpe bharosa hai. Wo apni marzi se mere saath hain. Hope wo enjoy karein.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '7b',
                text: "I say it's fine, but inside I'm a mess. I'll probably check their social media all night.",
                textHinglish: "Main kehta hu thik hai, par andar se darr lag raha hai. Main shayad raat bhar unka social media check karu.",
                tendency: 'anxious',
                weight: 3
            },
            {
                id: '7c',
                text: "Whatever. They can do what they want. I don't want to seem controlling.",
                textHinglish: "Jo karna hai karein. Main controlling nahi dikhna chahta/chahti.",
                tendency: 'avoidant',
                weight: 2
            },
            {
                id: '7d',
                text: "I act like I trust them but then make subtle comments that reveal my insecurity.",
                textHinglish: "Dikhata hu ki trust hai par phir taane maar kar apni insecurity dikha deta hu.",
                tendency: 'disorganized',
                weight: 2
            }
        ]
    },
    // 8. INDEPENDENCE: Clinginess/Time together (Was Q14)
    {
        id: 8,
        category: 'independence',
        scenario: "{{partner}} wants to spend every free moment with you this week. How does that make you feel?",
        scenarioHinglish: "{{partner}} is hafte ka har free pal aapke saath bitana chahte hain. Aapko kaisa lag raha hai?",
        options: [
            {
                id: '8a',
                text: "That sounds lovely, though I'll still make time for my own activities here and there.",
                textHinglish: "Accha laga sunke, par main apne kaam ke liye bhi thoda time nikaal lunga/lungi.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '8b',
                text: "I love it! This is exactly what I want. The more time together, the better.",
                textHinglish: "Maza aa gaya! Yahi toh main chahta/chahti hu. Jitna saath rahein utna accha.",
                tendency: 'anxious',
                weight: 2
            },
            {
                id: '8c',
                text: "That's... a lot. I need my own space. Can we find a balance?",
                textHinglish: "Ye... thoda zyada ho gaya. Mujhe space chahiye. Thoda balance nahi bata sakte?",
                tendency: 'avoidant',
                weight: 3
            },
            {
                id: '8d',
                text: "I want it but also feel trapped. I might agree then cancel at the last minute.",
                textHinglish: "Chahata toh hu, par ghutan bhi hoti hai. Shayad haan bol du aur last minute cancel kar du.",
                tendency: 'disorganized',
                weight: 2
            }
        ]
    },
    // 9. VULNERABILITY: Lean on partner (Was Q16)
    {
        id: 9,
        category: 'vulnerability',
        scenario: "You're going through a really tough time personally. Do you share this with {{partner}}?",
        scenarioHinglish: "Aap kisi bohot mushkil daur se guzar rahe hain. Kya aap {{partner}} ko batayenge?",
        options: [
            {
                id: '9a',
                text: "Yes, I lean on them. That's what partners are for. I trust them with my struggles.",
                textHinglish: "Haan, main unki madad leta/leti hu. Partner isi liye toh hote hain. Mujhe unpe bharosa hai.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '9b',
                text: "Yes, but I worry about being too much or pushing them away with my problems.",
                textHinglish: "Haan, par darr lagta hai ki kahin main unpe bojh na ban jau ya wo door na ho jayein.",
                tendency: 'anxious',
                weight: 2
            },
            {
                id: '9c',
                text: "I deal with it on my own. I don't want to burden them or seem weak.",
                textHinglish: "Main khud sambhaal lunga/lungi. Main unpe bojh nahi banna chahta/chahti na hi kamzor dikhna.",
                tendency: 'avoidant',
                weight: 3
            },
            {
                id: '9d',
                text: "I start to share then shut down. Opening up feels dangerous somehow.",
                textHinglish: "Batana shuru karta/karti hu fir chup ho jaata/jaati hu. Khul ke baat karna safe nahi lagta.",
                tendency: 'disorganized',
                weight: 3
            }
        ]
    },
    // 10. FUTURE: Moving in (Was Q19) - Changed category to match
    {
        id: 10,
        category: 'trust',
        scenario: "{{partner}} brings up moving in together. What's your gut reaction?",
        scenarioHinglish: "{{partner}} saath rehne (live-in) ki baat karte hain. Aapka pehla reaction kya hai?",
        options: [
            {
                id: '10a',
                text: "Excited! This feels like a natural next step. Let's plan it out together.",
                textHinglish: "Excited! Ye agla step lagta hai. Chalo saath mein plan karte hain.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '10b',
                text: "YES! I've been hoping for this. Does this mean they're really committed to me?",
                textHinglish: "HAAN! Main yahi chahta/chahti tha. Matlab wo sach mein committed hain na?",
                tendency: 'anxious',
                weight: 2
            },
            {
                id: '10c',
                text: "Whoa, that's a big step. I need to think about what I'd be giving up. My space, my freedom...",
                textHinglish: "Arre, ye toh bada faisla hai. Mujhe sochna padega meri azaadi aur space ka kya hoga...",
                tendency: 'avoidant',
                weight: 3
            },
            {
                id: '10d',
                text: "I want it but immediately start thinking about how it could go wrong. I feel both excited and panicked.",
                textHinglish: "Chahta/chahti hu par turant lagta hai ki kuch galat ho jayega. Khushi aur darr dono lagta hai.",
                tendency: 'disorganized',
                weight: 3
            }
        ]
    }
];

// Helper to substitute partner name in scenarios
export function personalizeScenario(scenario: string, partnerName: string): string {
    return scenario.replace(/\{\{partner\}\}/g, partnerName);
}

// Calculate attachment style from scenario responses
export interface ScenarioResult {
    style: 'secure' | 'anxious' | 'avoidant' | 'disorganized';
    scores: {
        secure: number;
        anxious: number;
        avoidant: number;
        disorganized: number;
    };
    dominantTraits: string[];
    anxietyLevel: 'low' | 'moderate' | 'high';
    avoidanceLevel: 'low' | 'moderate' | 'high';
}

export function calculateScenarioResult(answers: Record<number, string>): ScenarioResult {
    const scores = {
        secure: 0,
        anxious: 0,
        avoidant: 0,
        disorganized: 0
    };

    // Tally up scores based on selected options
    for (const [questionId, optionId] of Object.entries(answers)) {
        const question = scenarioQuestions.find(q => q.id === parseInt(questionId));
        if (question) {
            const selectedOption = question.options.find(o => o.id === optionId);
            if (selectedOption) {
                scores[selectedOption.tendency] += selectedOption.weight;
            }
        }
    }

    // Normalize scores to percentage based on TOTAL ACTUAL SCORE
    const totalScore = scores.secure + scores.anxious + scores.avoidant + scores.disorganized;

    // Prevent division by zero if no questions answered (shouldn't happen in flow)
    const effectiveTotal = totalScore > 0 ? totalScore : 1;

    const normalizedScores = {
        secure: (scores.secure / effectiveTotal) * 100,
        anxious: (scores.anxious / effectiveTotal) * 100,
        avoidant: (scores.avoidant / effectiveTotal) * 100,
        disorganized: (scores.disorganized / effectiveTotal) * 100
    };

    // Determine primary style
    const styleEntries = Object.entries(scores) as [keyof typeof scores, number][];
    styleEntries.sort((a, b) => b[1] - a[1]);
    const primaryStyle = styleEntries[0][0];

    // Calculate anxiety and avoidance levels for compatibility with existing system
    // Normalization factor changed since we are using relative weights now
    // We Map the relative dominance to high/low scales
    const anxietyScore = ((scores.anxious + scores.disorganized) / effectiveTotal) * 7;
    const avoidanceScore = ((scores.avoidant + scores.disorganized) / effectiveTotal) * 7;

    const getLevel = (score: number): 'low' | 'moderate' | 'high' => {
        if (score < 2.5) return 'low';
        if (score < 4.5) return 'moderate';
        return 'high';
    };

    // Determine dominant traits based on top scores
    const dominantTraits: string[] = [];
    if (scores.secure > scores.anxious && scores.secure > scores.avoidant) {
        dominantTraits.push('Emotionally balanced', 'Comfortable with intimacy');
    }
    if (scores.anxious > effectiveTotal * 0.3) {
        dominantTraits.push('Needs reassurance', 'Highly attuned to partner');
    }
    if (scores.avoidant > effectiveTotal * 0.3) {
        dominantTraits.push('Values independence', 'Needs personal space');
    }
    if (scores.disorganized > effectiveTotal * 0.3) {
        dominantTraits.push('Complex emotional responses', 'Push-pull dynamic');
    }

    return {
        style: primaryStyle,
        scores: normalizedScores,
        dominantTraits,
        anxietyLevel: getLevel(anxietyScore),
        avoidanceLevel: getLevel(avoidanceScore)
    };
}
