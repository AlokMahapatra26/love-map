// Scenario-based questions that feel personal and real
// Each response option maps to an attachment style tendency

export type AttachmentTendency = 'secure' | 'anxious' | 'avoidant' | 'disorganized';

export interface ScenarioOption {
    id: string;
    text: string;
    tendency: AttachmentTendency;
    weight: number; // How strongly this indicates the tendency (1-3)
}

export interface ScenarioQuestion {
    id: number;
    category: 'communication' | 'conflict' | 'intimacy' | 'trust' | 'independence' | 'vulnerability';
    // Template uses {{partner}} for partner name substitution
    scenario: string;
    options: ScenarioOption[];
}

export const scenarioQuestions: ScenarioQuestion[] = [
    // COMMUNICATION SCENARIOS
    {
        id: 1,
        category: 'communication',
        scenario: "You send {{partner}} a heartfelt message about how much they mean to you. It's been 3 hours and they haven't replied. What's going through your mind?",
        options: [
            {
                id: '1a',
                text: "They're probably busy with work or something. I'll hear back when they're free.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '1b',
                text: "I check my phone every few minutes. Did I say something wrong? Are they upset with me?",
                tendency: 'anxious',
                weight: 3
            },
            {
                id: '1c',
                text: "I regret sending such an emotional message. I probably came on too strong.",
                tendency: 'avoidant',
                weight: 2
            },
            {
                id: '1d',
                text: "I swing between worrying they're ignoring me and telling myself I don't care either way.",
                tendency: 'disorganized',
                weight: 2
            }
        ]
    },
    {
        id: 2,
        category: 'communication',
        scenario: "{{partner}} seems quieter than usual tonight. They say nothing's wrong, but something feels off. What do you do?",
        options: [
            {
                id: '2a',
                text: "I gently let them know I'm here if they want to talk, then give them space without pressuring.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '2b',
                text: "I keep asking what's wrong. The uncertainty is killing me. I need to know if it's about us.",
                tendency: 'anxious',
                weight: 3
            },
            {
                id: '2c',
                text: "I leave them alone. If they wanted to talk, they would. I'm not going to pry.",
                tendency: 'avoidant',
                weight: 2
            },
            {
                id: '2d',
                text: "I alternate between pushing them to open up and then withdrawing, feeling frustrated and confused.",
                tendency: 'disorganized',
                weight: 2
            }
        ]
    },
    {
        id: 3,
        category: 'communication',
        scenario: "You and {{partner}} have plans tonight, but they call to cancel last minute because a friend needs help. How do you react?",
        options: [
            {
                id: '3a',
                text: "Disappointed, but I understand. We can reschedule. I hope their friend is okay.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '3b',
                text: "I feel crushed and wonder if their friend is really more important than me. Am I a priority?",
                tendency: 'anxious',
                weight: 3
            },
            {
                id: '3c',
                text: "Honestly, I'm a bit relieved. Maybe I'll use the time to do my own thing.",
                tendency: 'avoidant',
                weight: 2
            },
            {
                id: '3d',
                text: "I say it's fine but feel hurt. Later I might bring it up passive-aggressively or pretend I don't care.",
                tendency: 'disorganized',
                weight: 2
            }
        ]
    },

    // CONFLICT SCENARIOS
    {
        id: 4,
        category: 'conflict',
        scenario: "You and {{partner}} are in a heated argument. Things are getting tense. What's your instinct?",
        options: [
            {
                id: '4a',
                text: "I take a breath and try to understand their perspective. Let's work through this together.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '4b',
                text: "I need to resolve this NOW. I can't stand the tension. I'll apologize just to make it stop.",
                tendency: 'anxious',
                weight: 3
            },
            {
                id: '4c',
                text: "I shut down and walk away. I need space to cool off. This is too much.",
                tendency: 'avoidant',
                weight: 3
            },
            {
                id: '4d',
                text: "I oscillate between wanting to fix things immediately and wanting to hurt them back.",
                tendency: 'disorganized',
                weight: 2
            }
        ]
    },
    {
        id: 5,
        category: 'conflict',
        scenario: "{{partner}} brings up something you did that hurt them a while ago. You didn't realize it was still bothering them. How do you respond?",
        options: [
            {
                id: '5a',
                text: "I listen fully, acknowledge their feelings, and we talk about how to prevent it in the future.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '5b',
                text: "I feel terrible and anxious. I start apologizing profusely and worrying they'll leave me.",
                tendency: 'anxious',
                weight: 2
            },
            {
                id: '5c',
                text: "I get defensive. Why bring up old stuff? I thought we moved past this.",
                tendency: 'avoidant',
                weight: 3
            },
            {
                id: '5d',
                text: "Part of me wants to comfort them, part of me feels attacked. I'm not sure how to react.",
                tendency: 'disorganized',
                weight: 2
            }
        ]
    },
    {
        id: 6,
        category: 'conflict',
        scenario: "After a disagreement, {{partner}} needs space and asks to be alone for a few hours. What happens in your head?",
        options: [
            {
                id: '6a',
                text: "I respect their need for space. We'll reconnect when we're both calmer.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '6b',
                text: "Every minute feels like torture. I keep wanting to check on them, apologize, fix it.",
                tendency: 'anxious',
                weight: 3
            },
            {
                id: '6c',
                text: "Good. I need space too. In fact, maybe I needed it more than they did.",
                tendency: 'avoidant',
                weight: 2
            },
            {
                id: '6d',
                text: "I tell myself I'm fine with it, but then feel abandoned. I might text something I regret.",
                tendency: 'disorganized',
                weight: 3
            }
        ]
    },

    // INTIMACY SCENARIOS
    {
        id: 7,
        category: 'intimacy',
        scenario: "{{partner}} looks into your eyes and says 'I've never felt this close to anyone before.' What's your internal reaction?",
        options: [
            {
                id: '7a',
                text: "Warm and connected. I feel the same way and I'm comfortable telling them.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '7b',
                text: "Overjoyed but also scared. What if I lose this? What if I'm not enough?",
                tendency: 'anxious',
                weight: 2
            },
            {
                id: '7c',
                text: "Uncomfortable. That's a lot of pressure. I might change the subject or make a joke.",
                tendency: 'avoidant',
                weight: 3
            },
            {
                id: '7d',
                text: "I want to lean in, but something makes me want to pull away. It's too intense.",
                tendency: 'disorganized',
                weight: 3
            }
        ]
    },
    {
        id: 8,
        category: 'intimacy',
        scenario: "You and {{partner}} have had an amazing weekend together - totally connected. Now it's Sunday night. How do you feel?",
        options: [
            {
                id: '8a',
                text: "Content and grateful. I look forward to seeing them again but I'm also fine on my own.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '8b',
                text: "Already dreading the separation. When can we see each other again? The week will feel so long.",
                tendency: 'anxious',
                weight: 3
            },
            {
                id: '8c',
                text: "Honestly, I'm looking forward to some alone time. That was a lot of togetherness.",
                tendency: 'avoidant',
                weight: 3
            },
            {
                id: '8d',
                text: "Part of me wants it to never end, part of me feels suffocated. I'm emotionally confused.",
                tendency: 'disorganized',
                weight: 2
            }
        ]
    },
    {
        id: 9,
        category: 'intimacy',
        scenario: "During a vulnerable moment, {{partner}} starts crying in front of you. What do you do?",
        options: [
            {
                id: '9a',
                text: "I hold them close, let them cry, and reassure them I'm here. No words needed.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '9b',
                text: "I immediately try to fix whatever's wrong. Their pain makes me anxious - I need to help NOW.",
                tendency: 'anxious',
                weight: 2
            },
            {
                id: '9c',
                text: "I feel awkward and unsure what to do. I might offer practical advice to move past the emotion.",
                tendency: 'avoidant',
                weight: 3
            },
            {
                id: '9d',
                text: "I want to comfort them but I freeze up. Their vulnerability triggers something uncomfortable in me.",
                tendency: 'disorganized',
                weight: 3
            }
        ]
    },

    // TRUST SCENARIOS
    {
        id: 10,
        category: 'trust',
        scenario: "{{partner}} is going to a party where their attractive ex will be there. They assure you nothing will happen. How do you feel?",
        options: [
            {
                id: '10a',
                text: "I trust them. They're with me by choice. I hope they have fun.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '10b',
                text: "I say it's fine, but inside I'm a mess. I'll probably check their social media all night.",
                tendency: 'anxious',
                weight: 3
            },
            {
                id: '10c',
                text: "Whatever. They can do what they want. I don't want to seem controlling.",
                tendency: 'avoidant',
                weight: 2
            },
            {
                id: '10d',
                text: "I act like I trust them but then make subtle comments that reveal my insecurity.",
                tendency: 'disorganized',
                weight: 2
            }
        ]
    },
    {
        id: 11,
        category: 'trust',
        scenario: "You discover {{partner}} has been talking to someone you don't know - just friendly chats. But they never mentioned this person. What's your reaction?",
        options: [
            {
                id: '11a',
                text: "I casually ask about their new friend. People have lots of connections, no big deal.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '11b',
                text: "Why didn't they tell me? What are they hiding? I need answers immediately.",
                tendency: 'anxious',
                weight: 3
            },
            {
                id: '11c',
                text: "Good. They should have their own social life. I don't need to know everything.",
                tendency: 'avoidant',
                weight: 2
            },
            {
                id: '11d',
                text: "I pretend not to care but secretly investigate. I feel anxious but don't want to show it.",
                tendency: 'disorganized',
                weight: 3
            }
        ]
    },
    {
        id: 12,
        category: 'trust',
        scenario: "{{partner}} mentions they ran into their ex and had coffee. Nothing happened - just catching up. What's your honest reaction?",
        options: [
            {
                id: '12a',
                text: "I appreciate them being upfront. I trust their judgment. How was the coffee?",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '12b',
                text: "My stomach drops. Why would they do that? Am I not enough? I need more details.",
                tendency: 'anxious',
                weight: 3
            },
            {
                id: '12c',
                text: "I shrug it off. Their past is their past. I'm not going to make a thing of it.",
                tendency: 'avoidant',
                weight: 2
            },
            {
                id: '12d',
                text: "I act cool but later obsess over it. I might bring it up in a fight weeks later.",
                tendency: 'disorganized',
                weight: 2
            }
        ]
    },

    // INDEPENDENCE SCENARIOS
    {
        id: 13,
        category: 'independence',
        scenario: "{{partner}} wants to take a solo trip for a week - no phones, just them and nature. How do you handle it?",
        options: [
            {
                id: '13a',
                text: "I think it's great they're doing something for themselves. I'll miss them but I support it.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '13b',
                text: "A whole week with no contact? That's going to be really hard for me. Can they at least check in daily?",
                tendency: 'anxious',
                weight: 3
            },
            {
                id: '13c',
                text: "Honestly, I'm excited about having the place to myself. I could use some alone time too.",
                tendency: 'avoidant',
                weight: 2
            },
            {
                id: '13d',
                text: "I encourage them to go but then feel abandoned when they leave. I don't know what I want.",
                tendency: 'disorganized',
                weight: 3
            }
        ]
    },
    {
        id: 14,
        category: 'independence',
        scenario: "{{partner}} wants to spend every free moment with you this week. How does that make you feel?",
        options: [
            {
                id: '14a',
                text: "That sounds lovely, though I'll still make time for my own activities here and there.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '14b',
                text: "I love it! This is exactly what I want. The more time together, the better.",
                tendency: 'anxious',
                weight: 2
            },
            {
                id: '14c',
                text: "That's... a lot. I need my own space. Can we find a balance?",
                tendency: 'avoidant',
                weight: 3
            },
            {
                id: '14d',
                text: "I want it but also feel trapped. I might agree then cancel at the last minute.",
                tendency: 'disorganized',
                weight: 2
            }
        ]
    },
    {
        id: 15,
        category: 'independence',
        scenario: "You've been spending less time with your friends since being with {{partner}}. They encourage you to go out more without them. How do you interpret this?",
        options: [
            {
                id: '15a',
                text: "They're right. I need to maintain my friendships. They're being supportive of my whole life.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '15b',
                text: "Wait, do they not want to spend time with me? Are they pushing me away?",
                tendency: 'anxious',
                weight: 3
            },
            {
                id: '15c',
                text: "Finally! I've been wanting more friend time but didn't know how to bring it up.",
                tendency: 'avoidant',
                weight: 2
            },
            {
                id: '15d',
                text: "I'm confused. Do they care or don't they? Is this a test?",
                tendency: 'disorganized',
                weight: 2
            }
        ]
    },

    // VULNERABILITY SCENARIOS
    {
        id: 16,
        category: 'vulnerability',
        scenario: "You're going through a really tough time personally. Do you share this with {{partner}}?",
        options: [
            {
                id: '16a',
                text: "Yes, I lean on them. That's what partners are for. I trust them with my struggles.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '16b',
                text: "Yes, but I worry about being too much or pushing them away with my problems.",
                tendency: 'anxious',
                weight: 2
            },
            {
                id: '16c',
                text: "I deal with it on my own. I don't want to burden them or seem weak.",
                tendency: 'avoidant',
                weight: 3
            },
            {
                id: '16d',
                text: "I start to share then shut down. Opening up feels dangerous somehow.",
                tendency: 'disorganized',
                weight: 3
            }
        ]
    },
    {
        id: 17,
        category: 'vulnerability',
        scenario: "{{partner}} asks you deep questions about your childhood and family. How do you respond?",
        options: [
            {
                id: '17a',
                text: "I share openly. These conversations bring us closer and I trust them completely.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '17b',
                text: "I share but then worry - was that too much? Will they judge me differently now?",
                tendency: 'anxious',
                weight: 2
            },
            {
                id: '17c',
                text: "I give surface-level answers. I don't really see the point of digging into all that.",
                tendency: 'avoidant',
                weight: 3
            },
            {
                id: '17d',
                text: "I feel exposed and want to shut down, but also crave the connection of being truly known.",
                tendency: 'disorganized',
                weight: 3
            }
        ]
    },
    {
        id: 18,
        category: 'vulnerability',
        scenario: "You made a significant mistake that affected your relationship. {{partner}} finds out. How do you handle it?",
        options: [
            {
                id: '18a',
                text: "I own it completely, apologize sincerely, and work to rebuild trust. We can get through this.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '18b',
                text: "I'm devastated and can't stop apologizing. I'm terrified this will end us.",
                tendency: 'anxious',
                weight: 3
            },
            {
                id: '18c',
                text: "I get defensive and minimize it. Or I shut down completely. I hate feeling this exposed.",
                tendency: 'avoidant',
                weight: 3
            },
            {
                id: '18d',
                text: "I alternate between over-apologizing and getting angry at them for being upset.",
                tendency: 'disorganized',
                weight: 3
            }
        ]
    },

    // FUTURE SCENARIOS
    {
        id: 19,
        category: 'trust',
        scenario: "{{partner}} brings up moving in together. What's your gut reaction?",
        options: [
            {
                id: '19a',
                text: "Excited! This feels like a natural next step. Let's plan it out together.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '19b',
                text: "YES! I've been hoping for this. Does this mean they're really committed to me?",
                tendency: 'anxious',
                weight: 2
            },
            {
                id: '19c',
                text: "Whoa, that's a big step. I need to think about what I'd be giving up. My space, my freedom...",
                tendency: 'avoidant',
                weight: 3
            },
            {
                id: '19d',
                text: "I want it but immediately start thinking about how it could go wrong. I feel both excited and panicked.",
                tendency: 'disorganized',
                weight: 3
            }
        ]
    },
    {
        id: 20,
        category: 'communication',
        scenario: "It's {{partner}}'s birthday and you want to express how much they mean to you. What do you do?",
        options: [
            {
                id: '20a',
                text: "I plan something meaningful and tell them openly how much I love and appreciate them.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '20b',
                text: "I go all out - the perfect gift, the perfect words. I need them to know how much I care.",
                tendency: 'anxious',
                weight: 2
            },
            {
                id: '20c',
                text: "I get them something nice but struggle with the emotional part. I show love through actions, not words.",
                tendency: 'avoidant',
                weight: 2
            },
            {
                id: '20d',
                text: "I want to express my feelings but choke up. Big emotional moments make me freeze.",
                tendency: 'disorganized',
                weight: 2
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

    // Normalize scores to percentage
    const totalPossible = scenarioQuestions.length * 3; // max weight * questions
    const normalizedScores = {
        secure: (scores.secure / totalPossible) * 100,
        anxious: (scores.anxious / totalPossible) * 100,
        avoidant: (scores.avoidant / totalPossible) * 100,
        disorganized: (scores.disorganized / totalPossible) * 100
    };

    // Determine primary style
    const styleEntries = Object.entries(scores) as [keyof typeof scores, number][];
    styleEntries.sort((a, b) => b[1] - a[1]);
    const primaryStyle = styleEntries[0][0];

    // Calculate anxiety and avoidance levels for compatibility with existing system
    // Anxious + Disorganized = high anxiety
    // Avoidant + Disorganized = high avoidance
    const anxietyScore = (scores.anxious * 2 + scores.disorganized) / (totalPossible * 3) * 7;
    const avoidanceScore = (scores.avoidant * 2 + scores.disorganized) / (totalPossible * 3) * 7;

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
    if (scores.anxious > totalPossible * 0.3) {
        dominantTraits.push('Needs reassurance', 'Highly attuned to partner');
    }
    if (scores.avoidant > totalPossible * 0.3) {
        dominantTraits.push('Values independence', 'Needs personal space');
    }
    if (scores.disorganized > totalPossible * 0.3) {
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
