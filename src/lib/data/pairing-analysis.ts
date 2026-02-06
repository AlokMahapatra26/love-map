import { AttachmentStyle } from './attachment-styles';

export type PairingKey =
    | 'secure-secure' | 'secure-anxious' | 'secure-avoidant' | 'secure-disorganized'
    | 'anxious-anxious' | 'anxious-avoidant' | 'anxious-disorganized'
    | 'avoidant-avoidant' | 'avoidant-disorganized'
    | 'disorganized-disorganized';

export interface PairingAnalysis {
    stability: number; // 1-5
    summary: string;
    summaryHinglish?: string;
    dynamics: string;
    dynamicsHinglish?: string;
    keyConflicts: string[];
    keyConflictsHinglish?: string[];
    strengths: string[];
    strengthsHinglish?: string[];
    riskFactors: string[];
    riskFactorsHinglish?: string[];
    growthOpportunities: string[];
    growthOpportunitiesHinglish?: string[];
    conflictScripts?: ConflictScripts;
}

export interface ConflictScripts {
    partner1: PartnerConflictScripts;
    partner2: PartnerConflictScripts;
}

export interface PartnerConflictScripts {
    selfSoothing: { en: string; hinglish: string };
    boundary: { en: string; hinglish: string };
    repair: { en: string; hinglish: string };
    reassurance: { en: string; hinglish: string };
}

// ... (keep Strategy interface and others unchanged)

// Normalize pairing key (order doesn't matter for same-type pairings)
export function getPairingKey(style1: AttachmentStyle, style2: AttachmentStyle): PairingKey {
    const order: AttachmentStyle[] = ['secure', 'anxious', 'avoidant', 'disorganized'];
    const idx1 = order.indexOf(style1);
    const idx2 = order.indexOf(style2);

    if (idx1 <= idx2) {
        return `${style1}-${style2}` as PairingKey;
    }
    return `${style2}-${style1}` as PairingKey;
}

// Update getPersonalizedPairingAnalysis to handle Hinglish
export function getPersonalizedPairingAnalysis(
    style1: AttachmentStyle,
    style2: AttachmentStyle,
    name1: string,
    name2: string,
    language: 'en' | 'hinglish' = 'en'
): PairingAnalysis {
    const key = getPairingKey(style1, style2);
    const analysis = pairingAnalyses[key];

    // Deep copy to avoid mutating the original
    const personalized = JSON.parse(JSON.stringify(analysis));

    const replaceText = (text: string) => {
        if (!text) return text;
        let newText = text;

        // Handle "Both partners" for all pairings
        newText = newText.replace(/Both partners/gi, `${name1} and ${name2}`);

        if (style1 !== style2) {
            // Different styles - we can be specific
            // Replace for Partner 1's style
            const p1StyleRegex = new RegExp(`The ${style1} partner`, 'gi');
            newText = newText.replace(p1StyleRegex, name1);

            const p1StyleRegex2 = new RegExp(`${style1} partner`, 'gi');
            newText = newText.replace(p1StyleRegex2, name1);

            // Replace for Partner 2's style
            const p2StyleRegex = new RegExp(`The ${style2} partner`, 'gi');
            newText = newText.replace(p2StyleRegex, name2);

            const p2StyleRegex2 = new RegExp(`${style2} partner`, 'gi');
            newText = newText.replace(p2StyleRegex2, name2);
        }

        return newText;
    };

    // For Hinglish, we might want to just return the static translation for now 
    // as dynamic replacement in mixed lang is hard without specific tokens.
    // Or we can try basic replacement if names are used.

    if (language === 'hinglish') {
        // If Hinglish content exists, return it, otherwise fallback to English
        personalized.summary = analysis.summaryHinglish || replaceText(analysis.summary);
        personalized.dynamics = analysis.dynamicsHinglish || replaceText(analysis.dynamics);
        personalized.keyConflicts = (analysis.keyConflictsHinglish || analysis.keyConflicts).map((t: string) => replaceText(t)); // Simple map for now
        personalized.strengths = (analysis.strengthsHinglish || analysis.strengths).map((t: string) => replaceText(t));
        personalized.riskFactors = (analysis.riskFactorsHinglish || analysis.riskFactors).map((t: string) => replaceText(t));
        personalized.growthOpportunities = (analysis.growthOpportunitiesHinglish || analysis.growthOpportunities).map((t: string) => replaceText(t));
    } else {
        personalized.summary = replaceText(personalized.summary);
        personalized.dynamics = replaceText(personalized.dynamics);
        personalized.keyConflicts = personalized.keyConflicts.map(replaceText);
        personalized.strengths = personalized.strengths.map(replaceText);
        personalized.riskFactors = personalized.riskFactors.map(replaceText);
        personalized.growthOpportunities = personalized.growthOpportunities.map(replaceText);
    }

    return personalized;
}

export const pairingAnalyses: Record<PairingKey, PairingAnalysis> = {
    'secure-secure': {
        stability: 5,
        summary: "The Gold Standard",
        summaryHinglish: "Sone Jaisa Khara Rishta (Gold Standard)",
        dynamics: "This is the most stable and satisfying pairing. Both partners bring emotional maturity, effective communication skills, and the ability to balance intimacy with independence. Conflicts are handled constructively, and both partners feel safe to be vulnerable.",
        dynamicsHinglish: "Ye sabse stable aur satisfying jodi hai. Dono partners samajhdaar hain, baat karne mein achhe hain, aur pyaar-space ka balance banana jaante hain. Jhagde araam se suljha liye jaate hain aur dono ek doosre ke saath khul kar rehne mein safe feel karte hain.",
        keyConflicts: [
            "May take relationship health for granted",
            "Could become complacent about nurturing the relationship",
            "Might underestimate the need for continued effort",
        ],
        keyConflictsHinglish: [
            "Rishte ko 'granted' le lena (sab to theek hi hai)",
            "Mehnat karna chhod dena kyunki sab smooth hai",
            "Rishte ko hamesha taaza rakhne ki zaroorat bhool jana",
        ],
        strengths: [
            "Natural, easy communication",
            "Effective conflict resolution",
            "Both comfortable with vulnerability",
            "Healthy balance of togetherness and independence",
            "Strong foundation of trust",
        ],
        strengthsHinglish: [
            "Baat-cheet mein assani aur natural flow",
            "Jhagde suljhane ka sahi tareeka",
            "Dono dil ki baat khul kar bolte hain",
            "Saath rehna aur alag rehna, dono balanced hai",
            "Bharose ki mazboot neeve (foundation)",
        ],
        riskFactors: [
            "External stressors (work, family) if not managed together",
            "Taking each other for granted over time",
            "Assuming the other always knows what you need",
        ],
        riskFactorsHinglish: [
            "Bahar ki tension (kaam, family) agar saath mil kar na sambhalein",
            "Waqt ke saath ek doosre ki kadar kam ho jana",
            "Ye sochna ki 'wo to sab jaanta hi hai'",
        ],
        growthOpportunities: [
            "Deepen already strong connection",
            "Model healthy relationship for others",
            "Support each other's individual growth",
            "Build shared meaning and legacy",
        ],
        growthOpportunitiesHinglish: [
            "Apne strong connection ko aur gehra karein",
            "Doosron ke liye ek misaal banein",
            "Ek doosre ki personal growth mein madad karein",
            "Saath mil kar kuch bada karein (goals/dreams)",
        ],
        conflictScripts: {
            partner1: {
                selfSoothing: {
                    en: "I am safe. We can solve this together.",
                    hinglish: "Main safe hoon. Hum ise saath mil kar suljha lenge."
                },
                boundary: {
                    en: "I need a moment to think before we continue.",
                    hinglish: "Mujhe thoda sochne ka waqt chahiye aage baat karne se pehle."
                },
                repair: {
                    en: "I'm sorry I got defensive. I want to understand your point.",
                    hinglish: "Sorry main defensive ho gaya tha. Main tumhari baat samajhna chahta hoon."
                },
                reassurance: {
                    en: "We are a team. We will get through this.",
                    hinglish: "Hum ek team hain. Hum isse nikal lenge."
                }
            },
            partner2: {
                selfSoothing: {
                    en: "My partner loves me, even when we disagree.",
                    hinglish: "Mera partner mujhse pyaar karta hai, bhale hi humari behas ho."
                },
                boundary: {
                    en: "Let's take a break and come back in 20 minutes.",
                    hinglish: "Chalo break lete hain aur 20 minute baad baat karenge."
                },
                repair: {
                    en: "I appreciate you listening to me.",
                    hinglish: "Meri baat sunne ke liye shukriya."
                },
                reassurance: {
                    en: "I'm right here with you.",
                    hinglish: "Main yahin hoon tumhare saath."
                }
            }
        },
    },

    'secure-anxious': {
        stability: 4,
        summary: "The Anchor and the Yearner",
        summaryHinglish: "The Anchor and the Yearner",
        dynamics: "The secure partner can provide a stable, reassuring presence that helps the anxious partner develop more security over time. However, the secure partner must be patient with reassurance needs while setting healthy boundaries. This pairing has strong potential for the anxious partner to 'earn' secure attachment.",
        dynamicsHinglish: "Secure partner ek mazboot sahara (anchor) banta hai jo Anxious partner ko shanti aur bharosa deta hai. Secure partner ko thoda sabr rakhna padta hai jab partner ko tasalli chahiye ho. Agar sahi se handle kiya jaye, to Anxious partner bhi dheere-dheere Secure ban sakta hai.",
        keyConflicts: [
            "Anxious partner may need more reassurance than secure partner naturally provides",
            "Secure partner might feel overwhelmed by emotional intensity at times",
            "Different response times to messages/calls can cause friction",
            "Anxious partner may misinterpret secure partner's independence as rejection",
        ],
        keyConflictsHinglish: [
            "Anxious partner ko Secure partner se zyada tasalli chahiye hoti hai",
            "Secure partner kabhi-kabhi emotional pressure feel kar sakta hai",
            "Message/Call ka reply late aane par anxious partner ko tension hona",
            "Secure partner ke 'me-time' ko Anxious partner rejection samajh leta hai",
        ],
        strengths: [
            "Secure partner provides consistent emotional availability",
            "Anxious partner brings emotional depth and devotion",
            "Opportunity for anxious partner to develop security",
            "Secure partner's calm can help regulate anxious partner",
        ],
        strengthsHinglish: [
            "Secure partner hamesha emotionally available rehta hai",
            "Anxious partner gehra pyaar aur devotion lata hai",
            "Anxious partner ke paas Secure banne ka mauka hota hai",
            "Secure partner ki shanti Anxious partner ko bhi shant karti hai",
        ],
        riskFactors: [
            "Secure partner becoming frustrated with constant reassurance needs",
            "Anxious partner's fears triggering pursuit behavior",
            "Secure partner withdrawing when feeling overwhelmed",
        ],
        riskFactorsHinglish: [
            "Tasalli dete-dete Secure partner ka thak jana",
            "Anxious partner ka darr ke maare ki ye mujhe chor ke chale na jaye isliye pichhe pad jana",
            "Preshan ho kar Secure partner ka door ho jana",
        ],
        growthOpportunities: [
            "Anxious partner learning self-soothing from secure partner",
            "Secure partner developing deeper empathy for anxiety",
            "Building communication protocols for reassurance",
            "Creating predictable rituals that reduce anxiety",
        ],
        growthOpportunitiesHinglish: [
            "Anxious partner ka khud ko shant karna seekhna",
            "Secure partner ka anxious partner ki ghabrahat ko behtar samajhna",
            "Tasalli dene ke liye fix tareeke banana",
            "Aise rituals banana jisse tension kam ho (jaise roz goodnight call)",
        ],
        conflictScripts: {
            partner1: { // Secure
                selfSoothing: {
                    en: "Their anxiety is not an attack on me. I can stay calm.",
                    hinglish: "Unki ghabrahat mujh par hamla nahi hai. Main shant reh sakta/sakti hoon."
                },
                boundary: {
                    en: "I love you, but I can't talk when you're shouting. Let's take 10 mins.",
                    hinglish: "Main tumse pyaar karta hoon, par chillate hue baat nahi kar sakta. 10 min rukte hain."
                },
                repair: {
                    en: "I see you're hurting. I'm here.",
                    hinglish: "Main samajh sakta hoon tumhe dukh ho raha hai. Main yahin hoon."
                },
                reassurance: {
                    en: "I am not leaving. We are okay.",
                    hinglish: "Main kahin nahi ja raha. Hum theek hain."
                }
            },
            partner2: { // Anxious
                selfSoothing: {
                    en: "They need space, not because they don't love me, but to think.",
                    hinglish: "Unhe space chahiye, isliye nahi ki pyaar nahi karte, balki sochne ke liye."
                },
                boundary: {
                    en: "I need reassurance right now, not logic.",
                    hinglish: "Mujhe abhi tasalli chahiye, logic nahi."
                },
                repair: {
                    en: "I got scared and overwhelmed. Sorry I lashed out.",
                    hinglish: "Main darr gaya/gayi tha/thi aur ghabra gaya/gayi tha/thi. Sorry maine gussa kiya."
                },
                reassurance: {
                    en: "I trust you. I just got triggered.",
                    hinglish: "Mujhe tumpe bharosa hai. Bas main trigger ho gaya/gayi tha/thi."
                }
            }
        },
    },

    'secure-avoidant': {
        stability: 4,
        summary: "The Connector and the Independent",
        summaryHinglish: "Jodnewala aur Azaad Panchhi",
        dynamics: "The secure partner's patience and respect for boundaries can help the avoidant partner gradually open up. The avoidant partner benefits from a non-pressuring presence, while the secure partner must advocate for their intimacy needs without creating pressure.",
        dynamicsHinglish: "Secure partner ka sabr aur boundaries ki izzat karna Avoidant partner ko khulne mein madad karta hai. Avoidant partner ko ye achha lagta hai ki koi unpe pressure nahi daal raha. Secure partner ko apni zarooratein batani chahiye, par bina pressure banaye.",
        keyConflicts: [
            "Different needs for emotional closeness and sharing",
            "Secure partner may want more verbal affirmation",
            "Avoidant partner needs space that secure partner might not understand",
            "Timing of emotional conversations can be challenging",
        ],
        keyConflictsHinglish: [
            "Pyaar dikhane aur baat karne ki alag-alag zarooratein",
            "Secure partner chahta hai ki pyaar bol kar dikhaya jaye",
            "Avoidant partner ko space chahiye jo shayad samajh na aaye",
            "Emotional baaton ka sahi time milna mushkil ho sakta hai",
        ],
        strengths: [
            "Secure partner doesn't take withdrawal personally",
            "Avoidant partner provides stability and consistency",
            "Mutual respect for independence",
            "Low drama, practical approach to problems",
        ],
        strengthsHinglish: [
            "Avoidant ke door jaane ko Secure partner dil pe nahi leta",
            "Avoidant partner stability aur consistency deta hai",
            "Ek doosre ki azaadi ki izzat karna",
            "Kam drama, problems ko practical tareeke se suljhana",
        ],
        riskFactors: [
            "Secure partner sacrificing their needs for connection",
            "Avoidant partner never fully opening up",
            "Emotional intimacy remaining shallow",
        ],
        riskFactorsHinglish: [
            "Secure partner ka apni zarooraton ko maar dena",
            "Avoidant partner ka kabhi poori tarah na khulna",
            "Rishta upar-upar se theek, par gehra nahi",
        ],
        growthOpportunities: [
            "Avoidant partner practicing vulnerability in safe environment",
            "Secure partner learning to appreciate different love languages",
            "Building bridges between action-based and verbal expressions of love",
            "Avoidant partner developing emotional vocabulary",
        ],
        growthOpportunitiesHinglish: [
            "Avoidant partner ka dheere-dheere khulne ki practice karna",
            "Secure partner ka pyaar ke alag tareekon (actions) ko samajhna",
            "Bolne aur karne wale pyaar ke beech pul banana",
            "Avoidant partner ka apni feelings ke liye shabd dhoondna",
        ],
        conflictScripts: {
            partner1: { // Secure
                selfSoothing: {
                    en: "His distance is his safety, not my rejection.",
                    hinglish: "Uska door jana uski safety hai, mera rejection nahi."
                },
                boundary: {
                    en: "I feel lonely when you shut down. Can we talk later?",
                    hinglish: "Jab tum chup ho jate ho to mujhe akela feel hota hai. Kya baad mein baat karein?"
                },
                repair: {
                    en: "I didn't mean to pressure you. Take your time.",
                    hinglish: "Mera maksad pressure dalna nahi tha. Apna time lo."
                },
                reassurance: {
                    en: "I respect your need for space. I'll be here.",
                    hinglish: "Main tumhare space ki izzat karta hoon. Main yahin milunga."
                }
            },
            partner2: { // Avoidant
                selfSoothing: {
                    en: "I am not trapped. I can take a break.",
                    hinglish: "Main phasa nahi hoon. Main break le sakta hoon."
                },
                boundary: {
                    en: "I need an hour alone to decompress.",
                    hinglish: "Mujhe ek ghanta akela rehna hai shant hone ke liye."
                },
                repair: {
                    en: "I shut down because I was overwhelmed. I'm back now.",
                    hinglish: "Main chup ho gaya tha kyunki main ghabra gaya tha. Ab main wapas aa gaya hoon."
                },
                reassurance: {
                    en: "I love you, I just needed quiet.",
                    hinglish: "Main tumse pyaar karta hoon, bas mujhe shanti chahiye thi."
                }
            }
        },
    },

    'secure-disorganized': {
        stability: 3,
        summary: "The Steady Rock and the Storm",
        summaryHinglish: "Chattan aur Toofan",
        dynamics: "The secure partner's consistency can be healing for the disorganized partner, but the unpredictable push-pull dynamics require significant patience and understanding. The secure partner must not take hot-and-cold behavior personally while maintaining healthy boundaries.",
        dynamicsHinglish: "Secure partner ki stability Disorganized partner ke liye dawai ka kaam karti hai. Par Disorganized partner ka kabhi paas aana aur kabhi door jana bardaasht karne ke liye bohat sabr chahiye. Secure partner ko unke mood swings ko dil pe nahi lena chahiye.",
        keyConflicts: [
            "Disorganized partner's unpredictable emotional swings",
            "Secure partner may feel confused by contradictory signals",
            "Past trauma can be triggered unexpectedly",
            "Building trust takes much longer than expected",
        ],
        keyConflictsHinglish: [
            "Disorganized partner ke achanak badalte moods",
            "Secure partner confuse ho sakta hai (abhi haan, abhi naa)",
            "Purane ghaav achanak ubhar sakte hain",
            "Bharosa banne mein kaafi waqt lagta hai",
        ],
        strengths: [
            "Secure partner provides corrective emotional experience",
            "Consistent, non-threatening love can facilitate healing",
            "Secure partner's emotional regulation helps both",
            "Potential for profound transformation",
        ],
        strengthsHinglish: [
            "Secure partner ek naya aur achha experience deta hai",
            "Lagataar aur bina daraye pyaar karne se healing hoti hai",
            "Secure partner ka shant rehna dono ko sambhal leta hai",
            "Rishte mein aur insaan mein bada badlaav aa sakta hai",
        ],
        riskFactors: [
            "Secure partner becoming exhausted by unpredictability",
            "Disorganized partner's fear leading to sabotage",
            "Secure partner taking on caretaker role",
            "Trauma responses being triggered during intimacy",
        ],
        riskFactorsHinglish: [
            "Disorganised partner ke mood swings se secure partner ka thak jana",
            "Disorganized partner ka darr ke karan rishta kharab karna",
            "Secure partner ka 'caretaker' ya 'nurse' ban jana",
            "Pyaar ke waqt purane darr ka samne aana",
        ],
        growthOpportunities: [
            "Disorganized partner learning that safety and love can coexist",
            "Both developing deeper patience and understanding",
            "Creating new, positive relationship templates",
            "Professional support accelerating healing",
        ],
        growthOpportunitiesHinglish: [
            "Disorganized partner ka seekhna ki safety aur pyaar saath ho sakte hain",
            "Dono ka aur zyada sabr aur samajh banana",
            "Rishte ka naya aur positive tareeka seekhna",
            "Therapy ya expert ki madad se jaldi sudhaar",
        ],
        conflictScripts: {
            partner1: { // Secure
                selfSoothing: {
                    en: "This storm will pass. I am the rock.",
                    hinglish: "Ye toofan guzar jayega. Main mazboot hoon."
                },
                boundary: {
                    en: "I can't continue this conversation if it's abusive.",
                    hinglish: "Agar baat badtameezi par aayi to main baat nahi karunga."
                },
                repair: {
                    en: "Let's restart. I love you.",
                    hinglish: "Chalo phir se shuru karte hain. I love you."
                },
                reassurance: {
                    en: "You are safe with me. I'm not going to hurt you.",
                    hinglish: "Tum mere saath safe ho. Main tumhe chot nahi pahunchaunga."
                }
            },
            partner2: { // Disorganized
                selfSoothing: {
                    en: "He is not my past. He is safe.",
                    hinglish: "Ye mera ateet nahi hai. Ye safe hai."
                },
                boundary: {
                    en: "I feel chaotic. Please give me space but don't leave.",
                    hinglish: "Mera dimaag ulajh raha hai. Thoda space do, par mujhe chhod ke mat jao."
                },
                repair: {
                    en: "I pushed you away because I was scared. Sorry.",
                    hinglish: "Maine tumhe door kiya kyunki main darr gaya/gayi tha/thi. Sorry."
                },
                reassurance: {
                    en: "Thank you for staying. I care about you.",
                    hinglish: "Rukne ke liye shukriya. Mujhe tumhari fikr hai."
                }
            }
        },
    },

    'anxious-anxious': {
        stability: 3,
        summary: "The Double Flame",
        summaryHinglish: "Do Jwalamukhi",
        dynamics: "Both partners deeply understand each other's need for connection and reassurance. The relationship can be intensely loving, but both may struggle with mutual dependency on each other for emotional regulation. Without external support, anxiety can amplify.",
        dynamicsHinglish: "Dono ek doosre ki pyaar aur tasalli ki zaroorat ko bohat achhe se samajhte hain. Pyaar bohat gehra ho sakta hai, par dono ek doosre par had se zyada depend ho sakte hain. Agar dhyaan na diya to ghabrahat dugni ho sakti hai.",
        keyConflicts: [
            "Both seeking reassurance simultaneously during stress",
            "Potential for codependency",
            "Anxiety feeding off each other in a spiral",
            "Difficulty giving space when both crave closeness",
            "Competition for whose needs get met first",
        ],
        keyConflictsHinglish: [
            "Tension mein dono ko ek saath tasalli chahiye hoti hai",
            "Ek doosre ke bina jeena mushkil ho jana (Codependency)",
            "Ek ki ghabrahat se doosre ki ghabrahat badhna",
            "Dono ko chipakna hai, to space kaun de?",
            "Ye race ki 'pehle mujhe sambhalo'",
        ],
        strengths: [
            "Deep mutual understanding of emotional needs",
            "Neither feels 'too much' for the other",
            "Strong motivation to work on relationship",
            "Verbal expressions of love flow easily",
            "Emotional attunement and responsiveness",
        ],
        strengthsHinglish: [
            "Ek doosre ke emotions ko poori tarah samajhna",
            "Koi kisi ko 'chipku' ya 'zyada' nahi lagta",
            "Rishte ko bachane ki dono mein chahat",
            "Pyaar ka izhaar asaani se karna",
            "Ek doosre ke dukh-dard ko mehsoos karna",
        ],
        riskFactors: [
            "Escalating anxiety without a grounding influence",
            "Losing individual identity in the relationship",
            "Burnout from constant emotional intensity",
            "Difficulty making decisions independently",
        ],
        riskFactorsHinglish: [
            "Koi shant karane wala nahi, to tension badhti hi jati hai",
            "Rishte mein khud ko kho dena",
            "Har waqt emotional rehne se thakawat",
            "Akele faisle lene mein dikkat",
        ],
        growthOpportunities: [
            "Both learning self-soothing techniques together",
            "Building individual hobbies and friendships",
            "Developing trust in the relationship's stability",
            "Creating rituals that satisfy reassurance needs efficiently",
        ],
        growthOpportunitiesHinglish: [
            "Dono ka saath mein khud ko shant karna seekhna",
            "Apne alag shauk aur dost banana",
            "Rishte ki mazbooti par bharosa paida karna",
            "Tasalli ke liye aasaan tareeke dhoondna",
        ],
        conflictScripts: {
            partner1: { // Anxious
                selfSoothing: {
                    en: "We're just scared. We love each other.",
                    hinglish: "Hum bas dare hue hain. Hum pyaar karte hain."
                },
                boundary: {
                    en: "We are both spiraling. Let's pause for 5 mins.",
                    hinglish: "Hum dono ghabra rahe hain. 5 minute rukte hain."
                },
                repair: {
                    en: "I'm sorry I fed into the panic. Let's breathe.",
                    hinglish: "Sorry maine panic badha diya. Saans lete hain."
                },
                reassurance: {
                    en: "We are not breaking up. We are just fighting.",
                    hinglish: "Hum alag nahi ho rahe. Bas ladayi ho rahi hai."
                }
            },
            partner2: { // Anxious
                selfSoothing: {
                    en: "This feeling is temporary. It will pass.",
                    hinglish: "Ye feeling temporary hai. Guzar jayegi."
                },
                boundary: {
                    en: "I need to calm down before I say something hurtful.",
                    hinglish: "Kuch galat bolne se pehle mujhe shant hona hoga."
                },
                repair: {
                    en: "I love you. Let's hug.",
                    hinglish: "I love you. Gale lagte hain."
                },
                reassurance: {
                    en: "You are my person. I am yours.",
                    hinglish: "Tum mere ho. Main tumhara hoon."
                }
            }
        },
    },

    'anxious-avoidant': {
        stability: 2,
        summary: "The Pursuer and the Distancer",
        summaryHinglish: "Ek Bhagta hai, Ek Pichha Karta hai",
        dynamics: "This is the most challenging pairing, characterized by a painful push-pull cycle. The anxious partner pursues connection, which triggers the avoidant partner to withdraw, which increases the anxious partner's panic, creating a destructive loop. Breaking this cycle requires conscious effort from both.",
        dynamicsHinglish: "Ye sabse mushkil jodi hai. Isme ek 'pakdam-pakdai' ka painful cycle chalta hai. Anxious partner paas aana chahta hai, Avoidant partner bhaagta hai. Jitna wo bhaagta hai, Anxious utna darta hai aur pichha karta hai. Is cycle ko todne ke liye dono ko mehnat karni hogi.",
        keyConflicts: [
            "Classic pursuit-withdrawal cycle",
            "Anxious partner feels rejected; avoidant feels smothered",
            "Different definitions of 'enough' closeness",
            "Timing of emotional conversations is always off",
            "Each partner's coping triggers the other's fears",
            "Fundamental misunderstanding of what the other needs",
        ],
        keyConflictsHinglish: [
            "Wahi purana 'tum bhaago main pakdun' khel",
            "Anxious ko lagta hai thukra diya, Avoidant ko lagta hai daboch liya",
            "'Kitna pyaar kaafi hai' ispe alag rai",
            "Baat karne ka timing hamesha galat hota hai",
            "Ek ka bachaav doosre ke liye hamla ban jata hai",
            "Ek doosre ki zaroorat ko na samajhna",
        ],
        strengths: [
            "Strong initial attraction (familiar dynamics)",
            "Potential for profound growth if cycle is broken",
            "Both have something to teach the other",
            "Success here means mastering relationship skills",
        ],
        strengthsHinglish: [
            "Shuruwaat mein zabardast attraction (filmi type)",
            "Agar cycle toot jaye to bohat growth ho sakti hai",
            "Dono ek doosre ko wo sikha sakte hain jo unke paas nahi hai",
            "Agar ye rishta chal gaya, to aap relationship expert ban jayenge",
        ],
        riskFactors: [
            "Exhaustion from constant conflict cycle",
            "Anxious partner's self-esteem eroding",
            "Avoidant partner checking out emotionally",
            "Both confirming their worst fears about relationships",
        ],
        riskFactorsHinglish: [
            "Roz ke jhagdo se thak jana",
            "Anxious partner ka confidence khatam ho jana",
            "Avoidant partner ka dil se door ho jana",
            "Dono ka ye maan lena ki 'rishte hote hi bekaar hain'",
        ],
        growthOpportunities: [
            "Learning to meet in the middle",
            "Anxious partner developing self-reliance",
            "Avoidant partner practicing vulnerability",
            "Breaking generational patterns",
            "Developing communication skills neither had before",
        ],
        growthOpportunitiesHinglish: [
            "Beech ka raasta nikalna seekhna",
            "Anxious partner ka khud par nirbhar hona",
            "Avoidant partner ka khulna seekhna",
            "Khandani patterns ko todna",
            "Baat karne ka wo tareeka seekhna jo pehle nahi aata tha",
        ],
        conflictScripts: {
            partner1: { // Anxious
                selfSoothing: {
                    en: "I am okay on my own for a bit.",
                    hinglish: "Main thodi der akela theek hoon."
                },
                boundary: {
                    en: "I can give you space, but please tell me when you'll be back.",
                    hinglish: "Main space de sakta hoon, par bata do kab wapas aaoge."
                },
                repair: {
                    en: "I panicked and chased you. Sorry.",
                    hinglish: "Main darr gaya tha aur pichha kiya. Sorry."
                },
                reassurance: {
                    en: "Take your time. I'll be doing my own thing.",
                    hinglish: "Time lo. Main apna kaam kar raha hoon."
                }
            },
            partner2: { // Avoidant
                selfSoothing: {
                    en: "They want connection, not to control me.",
                    hinglish: "Wo pyaar chahte hain, mujh par kabza nahi."
                },
                boundary: {
                    en: "I am feeling flooded. I need a timeout.",
                    hinglish: "Mera dimaag bhar gaya hai. Break chahiye."
                },
                repair: {
                    en: "Sorry I disappeared. I needed to reset.",
                    hinglish: "Sorry main gayab ho gaya. Mujhe reset hona tha."
                },
                reassurance: {
                    en: "We are good. I just need to recharge.",
                    hinglish: "Hum theek hain. Bas mujhe recharge hona hai."
                }
            }
        },
    },

    'anxious-disorganized': {
        stability: 2,
        summary: "The Seeker and the Conflicted",
        summaryHinglish: "Dhoondne Wala aur Uljha Hua",
        dynamics: "Both partners crave connection but experience it differently. The anxious partner's consistent pursuit may initially feel safe to the disorganized partner, but can become overwhelming. When the disorganized partner's avoidant side activates, the anxious partner's fears are triggered.",
        dynamicsHinglish: "Dono ko pyaar chahiye par alag tareeke se. Anxious partner ka lagataar pyaar dena shuru mein Disorganized partner ko achha lagta hai, par baad mein bhaari padne lagta hai. Jab Disorganized partner door hota hai, to Anxious partner darr jata hai.",
        keyConflicts: [
            "Disorganized partner's hot-and-cold triggers anxious partner's fears",
            "High emotional intensity from both sides",
            "Difficulty establishing predictable patterns",
            "Both may feel they're giving more than receiving",
            "Trust-building is slow and easily disrupted",
        ],
        keyConflictsHinglish: [
            "Disorganized ka kabhi narm kabhi garm hona Anxious ko darata hai",
            "Dono taraf se high drama/emotions",
            "Aaj kaisa mood hoga, pata nahi chalta",
            "Dono ko lagta hai wahi zyada kar rahe hain",
            "Bharosa banna mushkil, tootna aasaan",
        ],
        strengths: [
            "Mutual understanding of emotional depth",
            "Neither dismisses the other's feelings",
            "Both highly motivated to make it work",
            "Capacity for intense connection when aligned",
        ],
        strengthsHinglish: [
            "Emotions ki gehrai ko dono samajhte hain",
            "Koi kisi ki feelings ko mazaak nahi banata",
            "Rishta bachane ki dono ki chahat",
            "Jab saath hote hain to connection bohat gehra hota hai",
        ],
        riskFactors: [
            "Emotional volatility exhausting both partners",
            "Anxious partner feeling perpetually insecure",
            "Disorganized partner feeling trapped by intensity",
            "Conflict escalation without resolution",
        ],
        riskFactorsHinglish: [
            "Emotions ke utaar-chadhaav se thakawat",
            "Anxious partner hamesha insecurity mein rehta hai",
            "Disorganized partner ko ghutan feel hona",
            "Jhagda badhta jata hai, sulajhta nahi",
        ],
        growthOpportunities: [
            "Learning co-regulation techniques",
            "Building secure patterns together",
            "Both developing emotional regulation skills",
            "Professional support can accelerate progress",
        ],
        growthOpportunitiesHinglish: [
            "Ek doosre ko shant karna seekhna",
            "Saath mil kar secure tareeke banana",
            "Apne emotions ko control karna seekhna",
            "Expert ki madad se jaldi improvement",
        ],
        conflictScripts: {
            partner1: { // Anxious
                selfSoothing: {
                    en: "Their mood swing is not my fault.",
                    hinglish: "Unka mood swing meri galti nahi hai."
                },
                boundary: {
                    en: "Please don't push me away like that. It hurts.",
                    hinglish: "Aise dhakka mat maaro. Dard hota hai."
                },
                repair: {
                    en: "I won't overwhelm you. Let's take it slow.",
                    hinglish: "Main tumpe bojh nahi banunga. Dheere chalte hain."
                },
                reassurance: {
                    en: "I am consistent. I am here.",
                    hinglish: "Main hamesha waisa hi hoon. Main yahin hoon."
                }
            },
            partner2: { // Disorganized
                selfSoothing: {
                    en: "It is safe to be close.",
                    hinglish: "Paas aana safe hai."
                },
                boundary: {
                    en: "I feel suffocated. Back up a little please.",
                    hinglish: "Ghutan ho rahi hai. Thoda pichhe hato please."
                },
                repair: {
                    en: "My fear took over. I want to be close.",
                    hinglish: "Mera darr haavi ho gaya tha. Main paas aana chahta/chahti hoon."
                },
                reassurance: {
                    en: "I'm not leaving, I'm just struggling.",
                    hinglish: "Main ja nahi raha/rahi, bas pareshan hoon."
                }
            }
        },
    },

    'avoidant-avoidant': {
        stability: 3,
        summary: "The Parallel Lives",
        summaryHinglish: "Do Alag Duniyayein",
        dynamics: "Both partners value independence and may create a relationship that looks functional but lacks emotional depth. They understand each other's need for space but may never develop true intimacy. The relationship can feel more like roommates than partners.",
        dynamicsHinglish: "Dono ko apni azaadi pasand hai. Rishta upar se theek lagta hai par andar gehrai nahi hoti. Wo space ki zaroorat samajhte hain par kabhi dil se dil nahi milta. Partners kam, roommates zyada lagte hain.",
        keyConflicts: [
            "Neither initiates emotional conversations",
            "Intimacy needs go unspoken and unmet",
            "Problems are avoided rather than addressed",
            "Relationship can drift apart without drama",
            "Neither pursues closeness when distance grows",
        ],
        keyConflictsHinglish: [
            "Koi bhi dil ki baat shuru nahi karta",
            "Pyaar ki zaroorat dab kar reh jati hai",
            "Problems ko solve karne ki jagah taal diya jata hai",
            "Bina ladai ke rishta khatam ho sakta hai",
            "Doori badhne par koi paas aane ki koshish nahi karta",
        ],
        strengths: [
            "Mutual respect for independence",
            "Low conflict and drama",
            "Neither feels smothered",
            "Practical, logistical harmony",
            "Both feel 'understood' in their need for space",
        ],
        strengthsHinglish: [
            "Ek doosre ki azaadi ki izzat",
            "Kam ladai aur drama",
            "Koi ghutan mehsoos nahi karta",
            "Ghar ke kaam aur logistcs smooth rehte hain",
            "Dono khush hain ki koi chipak nahi raha",
        ],
        riskFactors: [
            "Emotional desert—connected but not intimate",
            "Important issues never addressed",
            "Growing apart without noticing",
            "Vulnerability never practiced or deepened",
        ],
        riskFactorsHinglish: [
            "Sukha rishta—naam ka saath, par dil se door",
            "Zaroori baaton par kabhi charcha nahi hoti",
            "Pata bhi nahi chalta kab alag ho gaye",
            "Khul kar baat karna kabhi seekh hi nahi paate",
        ],
        growthOpportunities: [
            "Scheduling intentional connection time",
            "Both practicing small vulnerabilities",
            "Learning to express needs verbally",
            "Building emotional vocabulary together",
        ],
        growthOpportunitiesHinglish: [
            "Milne aur baat karne ka time fix karna",
            "Chhoti-chhoti baatein share karna shuru karna",
            "Apni zarooratein bol kar batana",
            "Emotions ke baare mein baat karna seekhna",
        ],
        conflictScripts: {
            partner1: { // Avoidant
                selfSoothing: {
                    en: "It's okay to need connection. It doesn't make me weak.",
                    hinglish: "Connection chahiye hona okay hai. Ye kamzori nahi hai."
                },
                boundary: {
                    en: "We are ignoring the issue. Let's actually talk about it.",
                    hinglish: "Hum baat ko taal rahe hain. Chalo baat karte hain."
                },
                repair: {
                    en: "I withdrew again. I want to try to stay present.",
                    hinglish: "Main phir pichhe hat gaya. Main rukna chahta hoon."
                },
                reassurance: {
                    en: "I value our relationship, even if I don't say it often.",
                    hinglish: "Main rishte ki kadar karta hoon, bhale hi kam bolta hoon."
                }
            },
            partner2: { // Avoidant
                selfSoothing: {
                    en: "I can express my feelings without losing myself.",
                    hinglish: "Main apni feelings bata sakta hoon bina khud ko khoye."
                },
                boundary: {
                    en: "I can't read your mind. Please tell me.",
                    hinglish: "Main mann ki baat nahi padh sakta. Please batao."
                },
                repair: {
                    en: "I want to be closer, even if it's scary.",
                    hinglish: "Main paas aana chahta hoon, bhale hi darr lag raha ho."
                },
                reassurance: {
                    en: "You matter to me.",
                    hinglish: "Tum mere liye mayne rakhte ho."
                }
            }
        },
    },

    'avoidant-disorganized': {
        stability: 2,
        summary: "The Space-Seeker and the Torn",
        summaryHinglish: "Doori Chahne Wala aur Bikhra Hua",
        dynamics: "The avoidant partner's distance may initially feel safe for the disorganized partner's fear of engulfment. However, when the disorganized partner's anxious side emerges seeking connection, the avoidant partner withdraws further. Both partners feel misunderstood.",
        dynamicsHinglish: "Avoidant partner ki doori shuru mein Disorganized partner ko safe lagti hai (kyunki unhe paas aane se darr lagta hai). Par jab Disorganized partner ko achanak pyaar chahiye hota hai, to Avoidant partner aur door ho jata hai. Dono ko lagta hai koi unhe samajh nahi raha.",
        keyConflicts: [
            "Disorganized partner's changing needs confuse avoidant partner",
            "Avoidant withdrawal triggers disorganized partner's abandonment fears",
            "Neither knows how to bridge the emotional gap",
            "Conflict can feel impossible to resolve",
            "Both may feel the relationship is 'too hard'",
        ],
        keyConflictsHinglish: [
            "Disorganized partner ki badalti needs Avoidant ko confuse karti hain",
            "Avoidant ka door jana Disorganized ko darata hai",
            "Khaayi kaise bharein, kisi ko nahi pata",
            "Jhagda suljhana namumkin lagta hai",
            "Dono ko lagta hai 'ye rishta bohat mushkil hai'",
        ],
        strengths: [
            "Both understand the need for space",
            "Potential for very gradual trust-building",
            "When both in 'calm' states, harmony is possible",
        ],
        strengthsHinglish: [
            "Dono space ki value samajhte hain",
            "Dheere-dheere bharosa ban sakta hai",
            "Jab dono shant hon, to achha waqt guzar sakta hai",
        ],
        riskFactors: [
            "Emotional needs perpetually unmet",
            "Communication breaking down",
            "Both feeling lonely within the relationship",
            "Avoidant partner checking out entirely",
        ],
        riskFactorsHinglish: [
            "Pyaar ki zaroorat kabhi poori nahi hoti",
            "Baat-cheet band ho jana",
            "Saath reh kar bhi akela feel karna",
            "Avoidant partner ka poori tarah alag ho jana",
        ],
        growthOpportunities: [
            "Learning to read each other's cues",
            "Building predictable check-in rituals",
            "Both practicing staying present during discomfort",
            "Professional guidance strongly recommended",
        ],
        growthOpportunitiesHinglish: [
            "Ek doosre ke ishaare samajhna",
            "Haal-chaal puchne ka routine banana",
            "Jab uncomfortable lage tab bhi bhaagna nahi",
            "Expert ki salah lena zaroori hai",
        ],
        conflictScripts: {
            partner1: { // Avoidant
                selfSoothing: {
                    en: "Their chaos doesn't have to consume me.",
                    hinglish: "Unka hungama mujhe khatam nahi karega."
                },
                boundary: {
                    en: "I cannot help you when you are screaming.",
                    hinglish: "Jab tum chilla rahe ho main madad nahi kar sakta."
                },
                repair: {
                    en: "I'm sorry I checked out. It was too much.",
                    hinglish: "Sorry main dhyan nahi de raha tha. Bohat zyada ho gaya tha."
                },
                reassurance: {
                    en: "I'm not abandoning you. I'm just sitting here quietly.",
                    hinglish: "Main tumhe chhod nahi raha. Bas chup baitha hoon."
                }
            },
            partner2: { // Disorganized
                selfSoothing: {
                    en: "Silence is not abandonment.",
                    hinglish: "Khamoshi ka matlab chhodna nahi hota."
                },
                boundary: {
                    en: "Please say something. Your silence scares me.",
                    hinglish: "Kuch to bolo. Tumhari chuppi darati hai."
                },
                repair: {
                    en: "I pushed for a reaction because I was scared.",
                    hinglish: "Maine reaction ke liye uksaya kyunki main darr gaya tha."
                },
                reassurance: {
                    en: "I respect your space. I'll wait.",
                    hinglish: "Main tumhare space ki izzat karta hoon. Main intezaar karunga."
                }
            }
        },
    },

    'disorganized-disorganized': {
        stability: 1,
        summary: "The Storm Meets Storm",
        summaryHinglish: "Toofan se Takraya Toofan",
        dynamics: "This is the most volatile pairing. Both partners experience the push-pull of wanting connection while fearing it, leading to unpredictable dynamics. Without significant self-awareness and likely professional support, the relationship can become chaotic and retraumatizing.",
        dynamicsHinglish: "Ye sabse khatarnak jodi hai. Dono paas aana chahte hain par darte bhi hain. Iska nateeja bohat confusion aur drama hota hai. Bina samajhdaari aur therapy ke, ye rishta bohat chaotic ho sakta hai aur purane zakhmon ko kureed sakta hai.",
        keyConflicts: [
            "Extreme unpredictability from both sides",
            "Each partner's triggers activate the other's",
            "Trust is very difficult to establish and maintain",
            "Conflict can escalate rapidly and destructively",
            "Neither has a 'calm anchor' to provide stability",
        ],
        keyConflictsHinglish: [
            "Dono taraf se kuch bhi ho sakta hai (unpredictable)",
            "Ek ka gussa doosre ko bhadka deta hai",
            "Bharosa karna aur tikana bohat mushkil",
            "Jhagde bohat jaldi aur bure tareeke se badhte hain",
            "Koi bhi shant nahi hai jo doosre ko sambhaal le",
        ],
        strengths: [
            "Profound mutual understanding of inner conflict",
            "Neither judges the other's complexity",
            "When connected, intimacy can be deep",
            "Both know what it means to struggle",
        ],
        strengthsHinglish: [
            "Andar ki ladai ko dono samajhte hain",
            "Koi kisi ko 'paagal' ya 'complex' bol kar judge nahi karta",
            "Connection bana to bohat gehra hota hai",
            "Dono ko pata hai ki dard kya hota hai",
        ],
        riskFactors: [
            "Chaos becoming normalized",
            "Retraumatizing each other",
            "Relationship becoming destructive",
            "Neither able to provide stability for the other",
        ],
        riskFactorsHinglish: [
            "Hungame ko hi 'normal' maan lena",
            "Ek doosre ko phir se chot pahunchana",
            "Rishta barbaadi ki taraf jana",
            "Koi kisi ko sahara nahi de paata",
        ],
        growthOpportunities: [
            "Committing to individual therapy",
            "Building external support systems",
            "Learning grounding techniques together",
            "Celebrating small wins and stability moments",
            "Possibility of profound healing if both commit fully",
        ],
        growthOpportunitiesHinglish: [
            "Alag-alag therapy lena",
            "Bahar (dost/family) se madad lena",
            "Shant rehne ki techniques seekhna",
            "Chhoti khushiyon aur shanti ke palon ko celebrate karna",
            "Agar dono chahein to sabse gehri healing ho sakti hai",
        ],
        conflictScripts: {
            partner1: { // Disorganized
                selfSoothing: {
                    en: "We are triggering each other's trauma. Time out.",
                    hinglish: "Hum ek doosre ke ghaav kureed rahe hain. Time out."
                },
                boundary: {
                    en: "This is becoming toxic. We need to stop now.",
                    hinglish: "Ye zehreela ho raha hai. Abhi rukna hoga."
                },
                repair: {
                    en: "That wasn't me, that was my trauma. I'm sorry.",
                    hinglish: "Wo main nahi tha, wo mera trauma tha. Sorry."
                },
                reassurance: {
                    en: "We are both safe. We are not our past.",
                    hinglish: "Hum dono safe hain. Hum humara ateet nahi hain."
                }
            },
            partner2: { // Disorganized
                selfSoothing: {
                    en: "I can choose a different response.",
                    hinglish: "Main alag tarah se react kar sakta hoon."
                },
                boundary: {
                    en: "I need to step away to protect us.",
                    hinglish: "Humare liye mujhe hatna padega."
                },
                repair: {
                    en: "I want to heal with you, not fight.",
                    hinglish: "Main tumhare saath theek hona chahta hoon, ladna nahi."
                },
                reassurance: {
                    en: "We can build a safe life together.",
                    hinglish: "Hum saath safe zindagi bana sakte hain."
                }
            }
        },
    },
};
export interface Strategy {
    id: string;
    title: string;
    description: string;
    howTo: string[];
    forStyle?: AttachmentStyle | 'both';
    category: 'communication' | 'conflict' | 'intimacy' | 'self-care' | 'trust' | 'growth';
}

export interface PairingStrategies {
    forPartner1: Strategy[];
    forPartner2: Strategy[];
    forCouple: Strategy[];
}

// Strategies organized by attachment style and category
export const strategiesLibrary: Strategy[] = [
    // === FOR SECURE PARTNERS ===
    {
        id: 'sec-growth-1',
        title: 'Continue Growing Together',
        description: 'Even with secure attachment, there\'s always room to deepen your connection.',
        howTo: [
            'Schedule regular "vision" conversations about your future',
            'Try new experiences together to keep the relationship fresh',
            'Keep dating each other, even years into the relationship',
            'Share your evolving dreams and aspirations',
            'Celebrate your relationship milestones',
        ],
        forStyle: 'secure',
        category: 'growth',
    },
    {
        id: 'sec-growth-2',
        title: 'Be Your Partner\'s Safe Haven',
        description: 'Your stability is a gift—use it to help your partner feel safe to grow.',
        howTo: [
            'Create space for your partner to express difficult emotions',
            'Listen without immediately trying to fix things',
            'Validate their feelings even when you don\'t fully understand',
            'Offer reassurance when they seem uncertain',
            'Remember that your calm presence is healing for them',
        ],
        forStyle: 'secure',
        category: 'intimacy',
    },
    {
        id: 'sec-comm-1',
        title: 'Express Needs Clearly',
        description: 'Don\'t assume your partner knows what you need—speak up kindly.',
        howTo: [
            'Check in with yourself: what do you actually need right now?',
            'Use "I" statements to express your needs',
            'Be specific about what would help you',
            'Appreciate your partner\'s efforts to meet your needs',
            'Model healthy communication for your relationship',
        ],
        forStyle: 'secure',
        category: 'communication',
    },
    {
        id: 'sec-comm-2',
        title: 'Don\'t Take the Relationship for Granted',
        description: 'Security is wonderful, but still requires active nurturing.',
        howTo: [
            'Express appreciation daily, not just on special occasions',
            'Notice and acknowledge the small things your partner does',
            'Keep romance alive with surprises and dates',
            'Ask about their day with genuine curiosity',
            'Say "I love you" and mean it, often',
        ],
        forStyle: 'secure',
        category: 'intimacy',
    },
    {
        id: 'sec-trust-1',
        title: 'Maintain Your Own Identity',
        description: 'A healthy relationship includes two whole individuals.',
        howTo: [
            'Keep pursuing your own hobbies and interests',
            'Maintain friendships outside the relationship',
            'Support your partner having their own space too',
            'Bring your individual growth back to enrich the relationship',
            'Stay curious about your own personal development',
        ],
        forStyle: 'secure',
        category: 'trust',
    },

    // === FOR ANXIOUS PARTNERS ===
    {
        id: 'anx-self-1',
        title: 'The 5-4-3-2-1 Grounding Technique',
        description: 'When you feel relationship anxiety rising, use this sensory grounding technique to return to the present moment.',
        howTo: [
            'Notice 5 things you can see around you',
            'Touch 4 different textures',
            'Listen for 3 distinct sounds',
            'Identify 2 things you can smell',
            'Notice 1 thing you can taste',
            'Breathe deeply and ask: "Am I safe right now?"',
        ],
        forStyle: 'anxious',
        category: 'self-care',
    },
    {
        id: 'anx-self-2',
        title: 'The Reassurance Journal',
        description: 'Create a collection of evidence that your relationship is secure, to revisit when anxiety spikes.',
        howTo: [
            'Get a dedicated notebook or app',
            'Record loving things your partner says and does',
            'Screenshot sweet messages',
            'Write down moments when they chose you',
            'When anxious, read through your evidence',
            'Add to it regularly as new moments happen',
        ],
        forStyle: 'anxious',
        category: 'self-care',
    },
    {
        id: 'anx-self-3',
        title: 'The Pause Before Pursuit',
        description: 'Train yourself to wait before acting on anxiety-driven urges to pursue your partner.',
        howTo: [
            'When you feel the urge to text/call repeatedly, set a timer for 20 minutes',
            'During the wait, do something physical—walk, stretch, clean',
            'Ask yourself: "What am I actually needing right now?"',
            'Consider if there\'s a way to meet that need yourself',
            'After the timer, reassess if contact is still needed',
            'If yes, send one calm, clear message',
        ],
        forStyle: 'anxious',
        category: 'self-care',
    },
    {
        id: 'anx-self-4',
        title: 'Building Your Identity Garden',
        description: 'Nurture parts of yourself that exist outside the relationship to reduce dependency.',
        howTo: [
            'List 5 things you enjoyed before this relationship',
            'Schedule at least one "you" activity weekly',
            'Maintain friendships independent of your partner',
            'Set a personal goal unrelated to the relationship',
            'Notice when you feel complete on your own',
            'Celebrate solo accomplishments',
        ],
        forStyle: 'anxious',
        category: 'growth',
    },
    {
        id: 'anx-self-5',
        title: 'The Thought Detective',
        description: 'Challenge anxious thoughts before they spiral into panic.',
        howTo: [
            'Write down the anxious thought exactly as it appears',
            'Ask: "What evidence supports this thought?"',
            'Ask: "What evidence contradicts this thought?"',
            'Consider: "What would I tell a friend who had this thought?"',
            'Rewrite the thought in a more balanced way',
            'Rate your anxiety before and after (1-10)',
        ],
        forStyle: 'anxious',
        category: 'self-care',
    },
    {
        id: 'anx-comm-1',
        title: 'The Clear Request Formula',
        description: 'Express needs without blaming or overwhelming your partner.',
        howTo: [
            'Start with: "I feel [emotion] when [specific situation]"',
            'Then: "What I need is [specific, doable request]"',
            'End with: "Would you be willing to [action]?"',
            'Keep requests small and achievable',
            'Avoid "always" and "never" statements',
            'Thank your partner for listening',
        ],
        forStyle: 'anxious',
        category: 'communication',
    },
    {
        id: 'anx-comm-2',
        title: 'The Reassurance Request Menu',
        description: 'Give your partner specific ways to reassure you, rather than expecting them to guess.',
        howTo: [
            'Make a list of things that help you feel secure',
            'Rank them from quick/easy to more involved',
            'Share this list with your partner during a calm moment',
            'When anxious, ask for something specific from the list',
            'Example: "Could you tell me one thing you appreciate about me?"',
            'Update the list as you learn what works best',
        ],
        forStyle: 'anxious',
        category: 'communication',
    },

    // === FOR AVOIDANT PARTNERS ===
    {
        id: 'avo-vuln-1',
        title: 'The Vulnerability Ladder',
        description: 'Practice opening up in small, manageable steps.',
        howTo: [
            'Start by sharing something low-stakes (a minor frustration at work)',
            'Notice you survived and weren\'t rejected',
            'Next time, share something slightly more personal',
            'Gradually increase emotional depth over weeks',
            'Celebrate each step, no matter how small',
            'Recognize vulnerability is a skill that improves with practice',
        ],
        forStyle: 'avoidant',
        category: 'intimacy',
    },
    {
        id: 'avo-vuln-2',
        title: 'The Emotion Naming Practice',
        description: 'Develop your emotional vocabulary to better express what you\'re feeling.',
        howTo: [
            'Set a daily reminder to check in with yourself',
            'Ask: "What am I feeling right now?"',
            'Go beyond "fine" or "nothing"—use specific words',
            'Keep an emotion wheel handy for reference',
            'Try to name at least 3 emotions daily to your partner',
            'Notice that naming emotions doesn\'t make them worse',
        ],
        forStyle: 'avoidant',
        category: 'self-care',
    },
    {
        id: 'avo-vuln-3',
        title: 'The Stay Practice',
        description: 'Train yourself to remain present during emotional conversations instead of withdrawing.',
        howTo: [
            'Notice when you feel the urge to shut down or leave',
            'Say: "I\'m feeling overwhelmed but I\'m going to stay"',
            'Focus on your breath—slow, deep breaths',
            'Ask for a brief pause if needed: "Can we take 5 minutes?"',
            'Return to the conversation after the pause',
            'Recognize that staying is an act of love',
        ],
        forStyle: 'avoidant',
        category: 'conflict',
    },
    {
        id: 'avo-vuln-4',
        title: 'The Appreciation Expression',
        description: 'Practice verbalizing your positive feelings about your partner.',
        howTo: [
            'Set a goal to express one appreciation daily',
            'Be specific: not "you\'re great" but "I loved how you..."',
            'Try different formats: verbal, written, text',
            'Notice your partner\'s positive reaction',
            'Recognize that words matter even if actions feel more natural',
            'Track your expressions to build the habit',
        ],
        forStyle: 'avoidant',
        category: 'communication',
    },
    {
        id: 'avo-vuln-5',
        title: 'The Need for Space Script',
        description: 'Communicate your need for alone time without making your partner feel rejected.',
        howTo: [
            'Explain that needing space is about recharging, not rejection',
            'Use: "I need some time to process. I love you and I\'ll be back in [time]"',
            'Give a specific timeframe for reconnection',
            'Follow through on your return time',
            'Initiate connection when you return',
            'Thank your partner for understanding',
        ],
        forStyle: 'avoidant',
        category: 'communication',
    },

    // === FOR DISORGANIZED PARTNERS ===
    {
        id: 'dis-reg-1',
        title: 'The Window of Tolerance Check',
        description: 'Monitor your emotional state to stay in a zone where you can think clearly.',
        howTo: [
            'Learn your signs of hyper-arousal (racing heart, panic)',
            'Learn your signs of hypo-arousal (numbness, shutdown)',
            'Check in regularly: "Am I in my window right now?"',
            'If outside your window, use grounding techniques',
            'Request breaks during conversations if needed',
            'Return when you\'re back in your window',
        ],
        forStyle: 'disorganized',
        category: 'self-care',
    },
    {
        id: 'dis-reg-2',
        title: 'The Safety Anchor',
        description: 'Create physical or mental cues that help you feel safe in the present.',
        howTo: [
            'Choose a physical object that brings comfort (stone, ring, photo)',
            'Practice using it to ground yourself when calm',
            'When triggered, touch or look at your anchor',
            'Pair it with a calming phrase: "I am safe. This is now. This is not then."',
            'Build the association through regular practice',
            'Have anchors in different places (home, car, work)',
        ],
        forStyle: 'disorganized',
        category: 'self-care',
    },
    {
        id: 'dis-comm-1',
        title: 'The Meta-Communication',
        description: 'Name what\'s happening in the moment to prevent old patterns.',
        howTo: [
            '"I notice I\'m feeling the urge to push you away right now"',
            '"Part of me wants to run, but I\'m choosing to stay"',
            '"I\'m scared, and that\'s making me act distant"',
            'Ask your partner to hear, not fix',
            'This builds awareness and prevents acting out unconsciously',
            'Celebrate moments of awareness, even if behavior isn\'t perfect',
        ],
        forStyle: 'disorganized',
        category: 'communication',
    },

    // === FOR COUPLES ===
    {
        id: 'couple-comm-1',
        title: 'The Weekly State of the Union',
        description: 'A structured weekly check-in to address issues before they escalate.',
        howTo: [
            'Schedule a consistent time each week (e.g., Sunday evening)',
            'Each partner shares: one appreciation, one concern, one request',
            'Listen without interrupting or defending',
            'Validate your partner\'s experience even if you disagree',
            'Choose one small action item each',
            'End with a statement of commitment to the relationship',
        ],
        forStyle: 'both',
        category: 'communication',
    },
    {
        id: 'couple-comm-2',
        title: 'The Speaker-Listener Technique',
        description: 'A structured way to discuss difficult topics without escalating.',
        howTo: [
            'One person holds a designated object and speaks',
            'Speaker uses "I" statements to share feelings',
            'Listener reflects back what they heard',
            'Speaker confirms or clarifies',
            'Switch roles—pass the object',
            'Continue until both feel heard',
        ],
        forStyle: 'both',
        category: 'conflict',
    },
    {
        id: 'couple-comm-3',
        title: 'The Repair Attempt Recognition',
        description: 'Learn to notice and accept your partner\'s attempts to reconnect after conflict.',
        howTo: [
            'Discuss common repair attempts you each make (humor, touch, apology)',
            'Agree to recognize these as peace offerings',
            'When you notice a repair attempt, acknowledge it',
            'Even if still upset, try to accept the olive branch',
            'Accepting a repair doesn\'t mean the issue is resolved',
            'It means you\'re choosing connection over being right',
        ],
        forStyle: 'both',
        category: 'conflict',
    },
    {
        id: 'couple-conflict-1',
        title: 'The Time-Out Protocol',
        description: 'A structured way to take breaks during heated conflicts.',
        howTo: [
            'Agree on a signal that means "I need a break" (hand gesture, code word)',
            'When someone signals, stop immediately—no last words',
            'Agree on a specific time to return (20-60 minutes)',
            'During the break, self-soothe—don\'t rehearse arguments',
            'The person who called the break initiates return',
            'Return by acknowledging your own contribution first',
        ],
        forStyle: 'both',
        category: 'conflict',
    },
    {
        id: 'couple-conflict-2',
        title: 'The Softened Startup',
        description: 'Begin difficult conversations in a way that reduces defensiveness.',
        howTo: [
            'Start with "I" not "You"',
            'Describe the situation without blame',
            'Express your feeling clearly',
            'State a positive need (what you want, not what you don\'t want)',
            'Be polite and appreciative',
            'Avoid stored-up grievances—address one issue at a time',
        ],
        forStyle: 'both',
        category: 'communication',
    },
    {
        id: 'couple-intimacy-1',
        title: 'The 6-Second Kiss',
        description: 'A simple daily practice to maintain physical and emotional connection.',
        howTo: [
            'Kiss for at least 6 seconds every day',
            'Make it intentional—not a quick peck',
            'Do this at a consistent time (before leaving, before bed)',
            'Stay present during the kiss—no multitasking',
            '6 seconds is long enough to trigger bonding hormones',
            'Notice how it changes the tone of your connection',
        ],
        forStyle: 'both',
        category: 'intimacy',
    },
    {
        id: 'couple-intimacy-2',
        title: 'The Daily Appreciation Ritual',
        description: 'Express gratitude to your partner every day to build positivity.',
        howTo: [
            'Each day, tell your partner one thing you appreciate about them',
            'Be specific and varied—not the same thing every day',
            'Link it to something they did or a quality they showed',
            'Say it directly, not via text',
            'Receive your partner\'s appreciation gracefully',
            'Notice how this shifts the overall tone of your relationship',
        ],
        forStyle: 'both',
        category: 'intimacy',
    },
    {
        id: 'couple-trust-1',
        title: 'The Predictability Building',
        description: 'Create consistency to build trust and reduce anxiety.',
        howTo: [
            'Identify small promises you can keep daily',
            'Follow through consistently—even on small things',
            'If you can\'t keep a promise, communicate early',
            'Create rituals: morning text, evening debrief, weekly date',
            'Predictability is not boring—it\'s the foundation of trust',
            'Track your reliability together',
        ],
        forStyle: 'both',
        category: 'trust',
    },
    {
        id: 'couple-trust-2',
        title: 'The Trigger Map',
        description: 'Create shared understanding of each other\'s emotional triggers.',
        howTo: [
            'Each partner identifies their top 3-5 triggers',
            'Explain the origin (when possible) and typical reaction',
            'Discuss what helps when triggered',
            'Create signals to use when triggered',
            'Agree to approach triggers with curiosity, not judgment',
            'Update the map as you learn more',
        ],
        forStyle: 'both',
        category: 'trust',
    },
    {
        id: 'couple-growth-1',
        title: 'The Attachment Check-In',
        description: 'Regularly assess progress toward more secure attachment.',
        howTo: [
            'Monthly, discuss: "How have we grown in the past month?"',
            'Each share one way you\'ve become more secure',
            'Acknowledge one area still needing growth',
            'Celebrate progress, no matter how small',
            'Adjust strategies based on what\'s working',
            'Recommit to the journey together',
        ],
        forStyle: 'both',
        category: 'growth',
    },
    {
        id: 'couple-growth-2',
        title: 'The Dreams and Goals Dialogue',
        description: 'Keep investing in shared vision and individual support.',
        howTo: [
            'Regularly discuss each person\'s dreams and goals',
            'Ask: "How can I support you in this?"',
            'Share your own dreams vulnerably',
            'Find areas of overlap to build shared meaning',
            'Celebrate each other\'s individual growth',
            'Create joint goals that excite both of you',
        ],
        forStyle: 'both',
        category: 'growth',
    },
];

// Get strategies for a specific pairing
export function getStrategiesForPairing(
    style1: AttachmentStyle,
    style2: AttachmentStyle
): PairingStrategies {
    const partner1Strategies = strategiesLibrary.filter(
        s => s.forStyle === style1 || s.forStyle === undefined
    ).slice(0, 5);

    const partner2Strategies = strategiesLibrary.filter(
        s => s.forStyle === style2 || s.forStyle === undefined
    ).slice(0, 5);

    const coupleStrategies = strategiesLibrary.filter(
        s => s.forStyle === 'both'
    ).slice(0, 8);

    return {
        forPartner1: partner1Strategies,
        forPartner2: partner2Strategies,
        forCouple: coupleStrategies,
    };
}
