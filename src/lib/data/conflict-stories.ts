import { PairingKey } from './pairing-analysis';

export interface ConflictStory {
    title: string;
    story: string;
}

export const conflictStories: Record<string, ConflictStory[]> = {
    // === SECURE PAIRINGS ===
    'secure-secure': [
        {
            title: "The Misunderstanding",
            story: "[Partner1] forgets to run an errand they promised. [Partner2] feels annoyed but assumes it was an honest mistake. Instead of attacking character ('You never listen'), [Partner2] says, 'I'm frustrated you forgot.' [Partner1] apologizes without getting defensive, and they fix it together."
        },
        {
            title: "The Bad Day",
            story: "[Partner1] comes home stressed and quiet. [Partner2] notices but doesn't panic. They ask, 'Do you need space or a hug?' [Partner1] asks for 30 minutes of quiet. [Partner2] gives it happily. Later, they reconnect over dinner."
        },
        {
            title: "The Disagreement",
            story: "They disagree on where to spend the holidays. Both express their needs clearly without manipulation. They brainstorm a compromise—alternating years—and both feel heard and satisfied."
        },
        {
            title: "Financial Styles",
            story: "[Partner1] is a spender, [Partner2] is a saver. Instead of fighting about 'irresponsibility' or 'stinginess', they sit down and create a budget that includes a 'fun fund' for [Partner1] and a 'security fund' for [Partner2]. They respect each other's psychological need for money."
        },
        {
            title: "Intimacy Mismatch",
            story: "One night, [Partner1] wants intimacy but [Partner2] is exhausted. [Partner2] says, 'I love you and I want to connect, but I'm too tired for sex. Can we just cuddle?' [Partner1] accepts this without feeling rejected, knowing that 'no' to sex isn't 'no' to love."
        },
        {
            title: "Career Shift",
            story: "[Partner1] wants to quit a stable job to pursue a dream. [Partner2] is worried about stability. Instead of shutting it down, [Partner2] says, 'That scares me, but I want you to be happy. Let's look at the numbers.' They face the risk as a team."
        },
        {
            title: "Parenting/Decisions",
            story: "They disagree on a major decision. They present a united front to the world but debate passionately in private. They don't stop until they find a solution that respects both values. Neither one 'wins' at the expense of the other."
        },
        {
            title: "A Moment of Jealousy",
            story: "At a party, [Partner1] feels a pang of jealousy seeing [Partner2] laugh with someone else. On the ride home, [Partner1] admits, 'I felt a bit insecure.' [Partner2] reassures them immediately: 'You're the only one for me.' The feeling dissolves."
        },
        {
            title: "Aging & Caretaking",
            story: "When a parent gets sick, the stress is high. They take turns carrying the emotional load. When [Partner1] breaks down, [Partner2] steps up, and vice versa. They view the challenge as external, not between them."
        },
        {
            title: "Personal Growth",
            story: "[Partner1] takes up a time-consuming hobby. [Partner2] misses them but cheers them on. [Partner1] makes sure to carve out quality time to reconnect. They grow individually without growing apart."
        }
    ],
    'secure-anxious': [
        {
            title: "The Unanswered Text",
            story: "[Partner2] (Anxious) sends a text and doesn't hear back for 3 hours. Their mind starts racing: 'Are they mad?' When [Partner1] (Secure) finally replies, 'Sorry, slammed at work!', [Partner2] feels relief. [Partner1] learns to send a quick 'Busy, text later' to help [Partner2] feel safe."
        },
        {
            title: "The Need for Reassurance",
            story: "[Partner2] (Anxious) feels insecure and asks, 'Do you still love me?' [Partner1] (Secure) pauses, looks them in the eye, and says, 'I love you, and I'm not going anywhere.' [Partner2] relaxes, learning that their needs aren't 'too much'."
        },
        {
            title: "The Space Issue",
            story: "[Partner1] (Secure) wants a night out with friends. [Partner2] (Anxious) feels abandoned. [Partner1] reassures them: 'I'm going to have fun, but I can't wait to see you tomorrow.' This bridge of connection helps [Partner2] handle the separation."
        },
        {
            title: "The Work Trip",
            story: "[Partner1] (Secure) travels for work. [Partner2] (Anxious) feels dread. [Partner1] establishes a ritual: a call every night at 9 PM. This predictability acts as a safety anchor for [Partner2], allowing them to sleep soundly."
        },
        {
            title: "The Silent Treatment",
            story: "[Partner2] (Anxious) feels hurt and goes silent to protest. [Partner1] (Secure) doesn't panic or get angry. They say, 'I see you're upset. I'm here when you're ready to talk.' The lack of retaliation makes it safe for [Partner2] to open up."
        },
        {
            title: "Intimacy Speed",
            story: "[Partner2] (Anxious) wants to move the relationship fast to lock it down. [Partner1] (Secure) slows it down: 'I want to build this right.' [Partner2] initially panics but eventually realizes that [Partner1]'s slow pace is actually a sign of seriousness, not hesitation."
        },
        {
            title: "Vulnerability Hangover",
            story: "[Partner2] (Anxious) overshares early and feels shame. [Partner1] (Secure) listens without judgment and shares something small back. This reciprocity heals the shame."
        },
        {
            title: "Social Overwhelm",
            story: "At a party, [Partner2] (Anxious) feels awkward and clings to [Partner1]. [Partner1] (Secure) doesn't push them away. They stay close until [Partner2] feels settled, then gently encourage them to mingle. [Partner1] acts as a secure base."
        },
        {
            title: "Conflict Volume",
            story: "[Partner2] (Anxious) raises their voice in fear. [Partner1] (Secure) stays calm: 'I can't talk when you yell, but I want to hear you. Let's take 5 minutes.' They hold the boundary without withdrawing love."
        },
        {
            title: "The Apology",
            story: "[Partner2] (Anxious) makes a mistake and apologizes profusely, terrified of being left. [Partner1] (Secure) smiles: 'It's okay. You don't have to earn my love back. We're good.' [Partner2] learns that mistakes aren't fatal."
        }
    ],
    'secure-avoidant': [
        {
            title: "The 'Talk'",
            story: "[Partner1] (Secure) wants to discuss feelings. [Partner2] (Avoidant) feels a wall go up. [Partner1] says, 'We don't have to solve it now. Let's talk after dinner.' [Partner2] feels respected, not trapped, and is more willing to engage later."
        },
        {
            title: "The Intimacy Hangover",
            story: "After a close weekend, [Partner2] (Avoidant) pulls back. [Partner1] (Secure) notices but doesn't take it personally. They focus on their own life. When [Partner2] recharges, they return, grateful that [Partner1] didn't punish them for needing space."
        },
        {
            title: "Vulnerability",
            story: "[Partner1] (Secure) shares a fear. [Partner2] (Avoidant) feels uncomfortable and jokes. [Partner1] gently says, 'I just need you to listen.' [Partner2] takes a breath and stays present, learning that emotions aren't dangerous."
        },
        {
            title: "The Weekend Away",
            story: "[Partner1] (Secure) plans a trip. [Partner2] (Avoidant) feels trapped. [Partner1] offers, 'We can take separate cars if you want an escape hatch.' Knowing they *can* leave makes [Partner2] want to stay."
        },
        {
            title: "Commitment Fears",
            story: "[Partner2] (Avoidant) hesitates to move in. [Partner1] (Secure) doesn't pressure but asks, 'What does your fear look like?' They talk about the fear of losing oneself, rather than the logistics of moving."
        },
        {
            title: "Emotional Support",
            story: "[Partner1] (Secure) is sad. [Partner2] (Avoidant) freezes, not knowing how to fix it. [Partner1] says, 'You don't need to fix it. Just sit with me.' [Partner2] learns that presence is enough."
        },
        {
            title: "Nitpicking",
            story: "[Partner2] (Avoidant) starts criticizing [Partner1]'s chewing (a deactivating strategy). [Partner1] (Secure) asks, 'Are you actually mad about the chewing, or do you need some alone time?' [Partner2] realizes they just need space."
        },
        {
            title: "Solo Travel",
            story: "[Partner2] (Avoidant) wants a solo trip. [Partner1] (Secure) says, 'Have a great time!' [Partner2] misses [Partner1] because they weren't guilt-tripped. Independence becomes a way to reconnect."
        },
        {
            title: "The Ex Factor",
            story: "[Partner2] (Avoidant) mentions an ex. [Partner1] (Secure) listens without jealousy, knowing they are the one here now. This lack of reactivity makes the 'phantom ex' lose power."
        },
        {
            title: "Opening Up",
            story: "[Partner2] (Avoidant) shares a tiny feeling. [Partner1] (Secure) validates it hugely. This positive reinforcement teaches [Partner2]'s nervous system that sharing is safe."
        }
    ],
    'secure-disorganized': [
        {
            title: "The Push-Pull",
            story: "[Partner2] (Disorganized) lashes out, then pulls away in shame. [Partner1] (Secure) stays steady. 'I can't be spoken to like that, but I'm here when you're ready.' This consistency helps [Partner2] feel safe enough to return."
        },
        {
            title: "Testing the Bond",
            story: "[Partner2] (Disorganized) picks a fight to see if [Partner1] (Secure) will leave. [Partner1] remains calm: 'We're arguing, but I'm still on your team.' This confuses [Partner2]'s expectation of abandonment and builds trust."
        },
        {
            title: "Overwhelmed",
            story: "[Partner2] (Disorganized) shuts down. [Partner1] (Secure) sits nearby without forcing interaction. 'I'm just going to read here.' [Partner2] realizes they don't have to face the storm alone."
        },
        {
            title: "The Meltdown",
            story: "[Partner2] (Disorganized) spirals into self-hatred. [Partner1] (Secure) holds the hope: 'I know you're hurting, but I see the good in you.' They act as an external regulator for [Partner2]'s emotions."
        },
        {
            title: "Trust Issues",
            story: "[Partner2] (Disorganized) accuses [Partner1] of lying. [Partner1] shows their phone calmly. 'I have nothing to hide.' Transparency helps quiet the paranoia."
        },
        {
            title: "Dissociation",
            story: "[Partner2] (Disorganized) checks out during conflict. [Partner1] (Secure) helps ground them: 'Feel your feet on the floor. You're here. You're safe.' They wait until [Partner2] is back before continuing."
        },
        {
            title: "Sabotage",
            story: "On a perfect date, [Partner2] (Disorganized) picks a fight. [Partner1] (Secure) recognizes the fear of happiness. 'It's okay to have a good time. We deserve this.' They gently steer the night back to joy."
        },
        {
            title: "Intimacy Triggers",
            story: "[Partner2] (Disorganized) flinches at touch. [Partner1] (Secure) asks, 'Is this okay?' every step of the way. This consent-based approach rebuilds a sense of agency."
        },
        {
            title: "The Corrective Experience",
            story: "[Partner2] (Disorganized) expects punishment after a mistake. [Partner1] (Secure) offers forgiveness. This rewires [Partner2]'s brain to understand that love isn't conditional."
        },
        {
            title: "Boring Consistency",
            story: "[Partner1] (Secure) shows up on time, every time. [Partner2] (Disorganized) initially finds this boring or suspicious, but eventually, this 'boring' consistency becomes the foundation of their healing."
        }
    ],

    // === ANXIOUS PAIRINGS ===
    'anxious-anxious': [
        {
            title: "The Spiral",
            story: "One partner feels insecure and asks for reassurance. The other interprets this as 'I'm not doing enough' and gets insecure too. Both end up crying. They need to learn to self-soothe before trying to soothe each other."
        },
        {
            title: "Constant Contact",
            story: "They text 24/7. If one stops, the other panics. This creates a 'merged' relationship. A healthy step is spending an evening apart and realizing the bond survives."
        },
        {
            title: "Over-Giving",
            story: "Both try to 'save' the other's mood. If one is sad, the other feels guilty. They learn that it's okay for their partner to be upset without it being a relationship emergency."
        },
        {
            title: "The Scorecard",
            story: "They keep track of affection. 'I did this for you, why didn't you do this for me?' They need to learn generous giving without strings attached."
        },
        {
            title: "Jealousy Loop",
            story: "One gets jealous, the other gets jealous back. They realize they are both terrified of the same thing: loss. Admitting this shared fear brings them closer than the fighting does."
        },
        {
            title: "Decision Paralysis",
            story: "Neither wants to choose dinner for fear of disappointing the other. They need to practice assertiveness: 'I want pizza.' 'Okay, cool.' It's safe to have preferences."
        },
        {
            title: "Burnout",
            story: "They spend every moment together and get sick of each other but are afraid to say it. Taking a solo walk is a victory for the relationship."
        },
        {
            title: "Mind Reading",
            story: "'You should have known I was sad.' They rely on telepathy. They need to practice explicit communication: 'I am feeling sad and I need a hug.'"
        },
        {
            title: "Crisis Bonding",
            story: "They bond over drama and shared anxiety. They need to learn to bond over peace and quiet, which can initially feel 'empty' to them."
        },
        {
            title: "Separation Anxiety",
            story: "One goes on a trip. They FaceTime 5 times a day. Cutting it down to 1 meaningful call allows them to actually miss each other and have something to talk about."
        }
    ],
    'anxious-avoidant': [
        {
            title: "The Classic Chase",
            story: "[Partner1] (Anxious) feels a disconnect and moves closer. [Partner2] (Avoidant) feels engulfed and steps back. [Partner1] panics and chases. The cycle stops when [Partner1] backs off, giving [Partner2] room to return."
        },
        {
            title: "The Homecoming",
            story: "[Partner2] (Avoidant) comes home tired. [Partner1] (Anxious) asks many questions. [Partner2] gives one-word answers. [Partner1] feels rejected. A better way: [Partner2] asks for 15 mins to decompress first, then connects."
        },
        {
            title: "Vulnerability Hangover",
            story: "They share a close moment. The next day, [Partner2] (Avoidant) feels 'too exposed' and becomes cold. [Partner1] (Anxious) thinks 'What did I do wrong?' Understanding this 'hangover' helps [Partner1] wait patiently."
        },
        {
            title: "Protest Behavior",
            story: "[Partner1] (Anxious) tries to make [Partner2] jealous to get a reaction. [Partner2] (Avoidant) withdraws in disgust. [Partner1] needs to say 'I feel lonely' instead of acting out."
        },
        {
            title: "The Phantom Ex",
            story: "[Partner2] (Avoidant) idealizes an ex to keep distance. [Partner1] (Anxious) competes with the ghost. They need to focus on the reality of *this* relationship, warts and all."
        },
        {
            title: "Sex vs. Intimacy",
            story: "They use sex to reconnect, but avoid emotional intimacy. [Partner1] feels used, [Partner2] feels pressured. They need to practice talking without touching to build emotional safety."
        },
        {
            title: "The 'Perfect' Date",
            story: "[Partner2] (Avoidant) is perfect for one night, then disappears. [Partner1] (Anxious) chases that high. They need to aim for consistent 'good enough' connection rather than sporadic intensity."
        },
        {
            title: "Criticism vs Defensiveness",
            story: "[Partner1] (Anxious) criticizes ('You never...'). [Partner2] (Avoidant) defends and walls off. [Partner1] needs to use 'I feel' statements to lower [Partner2]'s defenses."
        },
        {
            title: "The Ultimatum",
            story: "[Partner1] (Anxious) threatens to leave. [Partner2] (Avoidant) calls the bluff. [Partner1] stays, losing respect. They need to set real boundaries they can stick to."
        },
        {
            title: "Healing Moment",
            story: "[Partner2] (Avoidant) stays in the room during a conflict instead of leaving. [Partner1] (Anxious) lowers their voice. A small but massive victory for the relationship."
        }
    ],
    'anxious-disorganized': [
        {
            title: "The Minefield",
            story: "[Partner1] (Anxious) tries to get close. [Partner2] (Disorganized) wants closeness but gets triggered and lashes out. [Partner1] tries harder to 'soothe', which feels like suffocation. [Partner2] needs clear, calm boundaries."
        },
        {
            title: "Hot and Cold",
            story: "[Partner2] (Disorganized) is warm one minute, icy the next. [Partner1] (Anxious) feels like they are on a rollercoaster. [Partner1] needs to learn that [Partner2]'s mood shifts aren't always about them."
        },
        {
            title: "The Rescue Mission",
            story: "[Partner2] (Disorganized) is in crisis. [Partner1] (Anxious) jumps in to save them, neglecting their own needs. True healing happens when [Partner1] supports [Partner2] in helping themselves."
        },
        {
            title: "Adding Chaos",
            story: "[Partner1] (Anxious) adds nervous energy to [Partner2]'s (Disorganized) chaos. They spiral together. [Partner1] needs to practice being the 'calm anchor', even when it's hard."
        },
        {
            title: "Walking on Eggshells",
            story: "[Partner1] (Anxious) is terrified of triggering a rage. They become hyper-vigilant. They need to detach with love: 'I love you, but I can't be around you when you're like this.'"
        },
        {
            title: "The Victim Triangle",
            story: "They switch roles between Victim, Rescuer, and Persecutor. Recognizing the game is the only way to stop playing. 'I'm not your savior, and I'm not your enemy. I'm your partner.'"
        },
        {
            title: "Intimacy Triggers",
            story: "[Partner1] (Anxious) pushes for closeness. [Partner2] (Disorganized) feels engulfed and attacks. [Partner1] feels abused. They need to move *very* slowly, respecting [Partner2]'s window of tolerance."
        },
        {
            title: "Abandonment Cycles",
            story: "[Partner2] (Disorganized) breaks up impulsively. [Partner1] (Anxious) begs them to stay. They need to respect the breakup to break the cycle. Often, [Partner2] returns when the pressure is off."
        },
        {
            title: "Shared Trauma",
            story: "They bond over past pain. It feels deep, but it keeps them stuck in the past. They need to build a future based on shared values, not shared wounds."
        },
        {
            title: "Therapy",
            story: "This pairing is intense. They often need a third party (therapist) to mediate. Admitting they need help is a sign of strength, not failure."
        }
    ],

    // === AVOIDANT PAIRINGS ===
    'avoidant-avoidant': [
        {
            title: "The Roommates",
            story: "Both are happy to do their own thing. They rarely fight, but rarely connect deep. Days go by without real contact. One needs to brave the discomfort and say, 'I miss you.'"
        },
        {
            title: "The Standoff",
            story: "A problem arises. Both retreat to process. The issue festers. They need to schedule a time to talk so avoidance doesn't become the default."
        },
        {
            title: "Independence vs. Neglect",
            story: "They value independence so much they live parallel lives. When one needs support, they hesitate to ask. Learning to lean on each other strengthens their independence."
        },
        {
            title: "The Dry Spell",
            story: "They stop having sex because it requires vulnerability. Scheduling intimacy can help bridge the gap without the pressure of spontaneous emotion."
        },
        {
            title: "The 'Fine' Trap",
            story: "'How are you?' 'Fine.' 'Good.' They stay on the surface. They need to ask specific questions: 'What was the hardest part of your day?'"
        },
        {
            title: "Parallel Play",
            story: "They sit in the same room on phones. It's comfortable, but is it connection? They need to put phones down for 10 mins and just look at each other."
        },
        {
            title: "Illness",
            story: "One gets sick. The other feels awkward caretaking. Learning to bring soup without being asked is a huge act of love for this pairing."
        },
        {
            title: "Future Planning",
            story: "They avoid talking about marriage/kids because it's 'heavy'. They need to have the scary conversation to ensure they are on the same page."
        },
        {
            title: "Emotional Cheating",
            story: "They might open up to a stranger because it's safer than opening up to a partner. They need to bring that emotional energy back home."
        },
        {
            title: "The Breakthrough",
            story: "One admits, 'I'm lonely.' The other admits, 'Me too.' The wall cracks, and they realize they are in this together."
        }
    ],
    'avoidant-disorganized': [
        {
            title: "The False Calm",
            story: "[Partner1] (Avoidant) keeps things surface. [Partner2] (Disorganized) feels the lack of depth and provokes a fight to feel *something*. [Partner1] retreats, confirming [Partner2]'s fears."
        },
        {
            title: "Triggering Safety",
            story: "[Partner1] (Avoidant) needs distance to feel safe. [Partner2] (Disorganized) interprets distance as danger. They trigger each other's core safety wounds. They need to find a 'safe distance'."
        },
        {
            title: "The Shutdown",
            story: "During conflict, [Partner1] (Avoidant) goes numb. [Partner2] (Disorganized) explodes. They end up in a stalemate. Writing letters can be a safer way to communicate."
        },
        {
            title: "The Explosion",
            story: "[Partner1] (Avoidant) ignores an issue. [Partner2] (Disorganized) explodes. [Partner1] uses the explosion as proof that 'emotions are crazy'. They need to address issues *before* the explosion."
        },
        {
            title: "The Test",
            story: "[Partner2] (Disorganized) pushes buttons. [Partner1] (Avoidant) gives nothing (stonewalling). This is painful for [Partner2]. [Partner1] needs to say, 'I'm overwhelmed,' not just go silent."
        },
        {
            title: "Gaslighting",
            story: "[Partner1] (Avoidant) denies feelings. [Partner2] (Disorganized) trusts their gut but feels crazy. [Partner1] needs to be honest: 'I am feeling something, I just can't show it.'"
        },
        {
            title: "The Affair",
            story: "[Partner2] (Disorganized) seeks intensity elsewhere. [Partner1] (Avoidant) feels relieved to be let off the hook, then betrayed. They need to bring the intensity back to the relationship."
        },
        {
            title: "Reconnection",
            story: "[Partner1] (Avoidant) does a practical act of service. [Partner2] (Disorganized) appreciates the tangible love. Actions often speak louder than words here."
        },
        {
            title: "Healing",
            story: "[Partner1] (Avoidant) stays present when [Partner2] (Disorganized) cries. Just staying is the work. It teaches [Partner2] they aren't 'too much'."
        },
        {
            title: "Empathy",
            story: "[Partner2] (Disorganized) realizes [Partner1] isn't cold, just scared. [Partner1] realizes [Partner2] isn't crazy, just hurt. Compassion breaks the cycle."
        }
    ],

    // === DISORGANIZED PAIRINGS ===
    'disorganized-disorganized': [
        {
            title: "The Storm",
            story: "Both carry trauma. A small disagreement triggers 'fight or flight' in both. It feels like a chaotic storm. They need a 'safe word' to stop the interaction immediately."
        },
        {
            title: "The Yo-Yo",
            story: "They break up and get back together repeatedly. The highs are ecstatic, the lows devastating. Stability feels 'boring'. Learning to sit with 'boring' safety is key."
        },
        {
            title: "Trigger Stacking",
            story: "One's bad mood triggers the other's fear, which triggers the first's anger. It escalates instantly. They need 'time-outs'—20 mins apart to regulate."
        },
        {
            title: "The Mirror",
            story: "They see their own trauma in the other and hate it. They need to have compassion for themselves to have it for the other."
        },
        {
            title: "Violence/Aggression",
            story: "Conflicts can get intense quickly. Safety is the priority. Walking away is necessary. 'I love you enough to walk away before I say something I regret.'"
        },
        {
            title: "The Highs",
            story: "Makeup sex is intense. They mistake intensity for intimacy. They need to value the quiet moments, like drinking coffee together in silence."
        },
        {
            title: "Paranoia",
            story: "Both are suspicious. Transparency (showing phones, sharing locations) can help build trust initially until the nervous systems settle."
        },
        {
            title: "Substance Use",
            story: "Using substances to numb pain is common. Sobriety is often the first step to a real relationship. You can't connect if you aren't there."
        },
        {
            title: "The Kids",
            story: "If they have kids, they fear repeating trauma. Breaking the cycle for the next generation is a powerful motivator to do the hard work."
        },
        {
            title: "Hope",
            story: "When they both commit to healing, they can be the most empathetic partners because they *know* the darkness. They can heal together."
        }
    ]
};

// Helper to handle reverse keys (e.g., anxious-secure -> secure-anxious)
export const getStories = (key: string): ConflictStory[] => {
    if (conflictStories[key]) return conflictStories[key];

    const [p1, p2] = key.split('-');
    const reverseKey = `${p2}-${p1}`;

    if (conflictStories[reverseKey]) {
        return conflictStories[reverseKey];
    }

    return [];
};
