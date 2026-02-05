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
    // COMMUNICATION SCENARIOS
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
    {
        id: 2,
        category: 'communication',
        scenario: "{{partner}} seems quieter than usual tonight. They say nothing's wrong, but something feels off. What do you do?",
        scenarioHinglish: "Aaj raat {{partner}} thode shaant lag rahe hain. Wo keh rahe hain kuch nahi hua, par kuch toh alag lag raha hai. Aap kya karenge?",
        options: [
            {
                id: '2a',
                text: "I gently let them know I'm here if they want to talk, then give them space without pressuring.",
                textHinglish: "Main pyaar se bolunga/bolungi ki main sunne ke liye hu, fir unhe thoda space dunga/dungi.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '2b',
                text: "I keep asking what's wrong. The uncertainty is killing me. I need to know if it's about us.",
                textHinglish: "Main baar-baar puchunga/puchungi kya hua. Ye suspense mujhe pareshan kar raha hai. Kahin humare baare mein toh nahi?",
                tendency: 'anxious',
                weight: 3
            },
            {
                id: '2c',
                text: "I leave them alone. If they wanted to talk, they would. I'm not going to pry.",
                textHinglish: "Main unhe akela chhod dunga/dungi. Baat karni hoti toh kar nahi apne aap karenge.",
                tendency: 'avoidant',
                weight: 2
            },
            {
                id: '2d',
                text: "I alternate between pushing them to open up and then withdrawing, feeling frustrated and confused.",
                textHinglish: "Kabhi main unhe bolne ke liye force karta/karti hu, kabhi khud chup ho jaata/jaati hu. Samajh nahi aata kya karu.",
                tendency: 'disorganized',
                weight: 2
            }
        ]
    },
    {
        id: 3,
        category: 'communication',
        scenario: "You and {{partner}} have plans tonight, but they call to cancel last minute because a friend needs help. How do you react?",
        scenarioHinglish: "Aap aur {{partner}} ka aaj plan tha, par wo last minute cancel karte hain kyunki unke friend ko help chahiye. Aapka reaction kya hoga?",
        options: [
            {
                id: '3a',
                text: "Disappointed, but I understand. We can reschedule. I hope their friend is okay.",
                textHinglish: "Thoda bura lagega, par samajhta/samajhti hu. Hum fir kabhi plan bana lenge. Hope friend thik ho.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '3b',
                text: "I feel crushed and wonder if their friend is really more important than me. Am I a priority?",
                textHinglish: "Bohot bura lagta hai, kya unka friend mujhse zyada zaroori hai? Kya main priority nahi hu?",
                tendency: 'anxious',
                weight: 3
            },
            {
                id: '3c',
                text: "Honestly, I'm a bit relieved. Maybe I'll use the time to do my own thing.",
                textHinglish: "Sach kahu toh thoda relief mila. Ab main apna kaam kar sakta/sakti hu.",
                tendency: 'avoidant',
                weight: 2
            },
            {
                id: '3d',
                text: "I say it's fine but feel hurt. Later I might bring it up passive-aggressively or pretend I don't care.",
                textHinglish: "Main kehta/kehti hu thik hai, par andar se hurt hota/hoti hu. Baad mein shayad taana maaru.",
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
        scenarioHinglish: "Aap aur {{partner}} ke beech ghamasan jhagda ho raha hai. Maahaul garam hai. Aapka pehla reaction kya hoga?",
        options: [
            {
                id: '4a',
                text: "I take a breath and try to understand their perspective. Let's work through this together.",
                textHinglish: "Main saans leta/leti hu aur unki baat samajhne ki koshish karta/karti hu. Hum saath milkar solve karenge.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '4b',
                text: "I need to resolve this NOW. I can't stand the tension. I'll apologize just to make it stop.",
                textHinglish: "Mujhe ye ABHI solve karna hai. Main ye tension bardasht nahi kar sakta/sakti. Main sorry bol dunga bas khatam karne ke liye.",
                tendency: 'anxious',
                weight: 3
            },
            {
                id: '4c',
                text: "I shut down and walk away. I need space to cool off. This is too much.",
                textHinglish: "Main chup ho jaata/jaati hu aur chale jaata/jaati hu. Mujhe shant hone ke liye space chahiye. Ye bohot zyada hai ho raha hai.",
                tendency: 'avoidant',
                weight: 3
            },
            {
                id: '4d',
                text: "I oscillate between wanting to fix things immediately and wanting to hurt them back.",
                textHinglish: "Kabhi mann karta hai abhi thik karu, kabhi mann karta hai unhe bhi hurt karu.",
                tendency: 'disorganized',
                weight: 2
            }
        ]
    },
    {
        id: 5,
        category: 'conflict',
        scenario: "{{partner}} brings up something you did that hurt them a while ago. You didn't realize it was still bothering them. How do you respond?",
        scenarioHinglish: "{{partner}} purani baat nikaalte hain jo unhe buri lagi thi. Aapko laga tha wo baat khatam ho gayi. Aap kya karenge?",
        options: [
            {
                id: '5a',
                text: "I listen fully, acknowledge their feelings, and we talk about how to prevent it in the future.",
                textHinglish: "Main puri baat sununga/sunungi, unki feelings samjhunga/samjhungi aur aage dhyan rakhunga/rakhungi.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '5b',
                text: "I feel terrible and anxious. I start apologizing profusely and worrying they'll leave me.",
                textHinglish: "Mujhe bohot bura lagta hai aur ghabrahat hota/hoti hai. Main baar-baar maafi maangta/maangti hu ki kahin wo mujhe chhod na de.",
                tendency: 'anxious',
                weight: 2
            },
            {
                id: '5c',
                text: "I get defensive. Why bring up old stuff? I thought we moved past this.",
                textHinglish: "Main defensive ho jaata/jaati hu. Purani baatein kyun nikaal rahe ho? Mujhe laga hum aage badh gaye the.",
                tendency: 'avoidant',
                weight: 3
            },
            {
                id: '5d',
                text: "Part of me wants to comfort them, part of me feels attacked. I'm not sure how to react.",
                textHinglish: "Ek taraf manata hu, dusri taraf lagta hai mujh par attack ho raha hai. Samajh nahi aata kya karu.",
                tendency: 'disorganized',
                weight: 2
            }
        ]
    },
    {
        id: 6,
        category: 'conflict',
        scenario: "After a disagreement, {{partner}} needs space and asks to be alone for a few hours. What happens in your head?",
        scenarioHinglish: "Jhagde ke baad, {{partner}} ko thoda time chahiye aur wo akele rehna chahte hain. Aapke dimaag mein kya chalta hai?",
        options: [
            {
                id: '6a',
                text: "I respect their need for space. We'll reconnect when we're both calmer.",
                textHinglish: "Main unki space ki respect karta/karti hu. Jab dono shant honge tab baat karenge.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '6b',
                text: "Every minute feels like torture. I keep wanting to check on them, apologize, fix it.",
                textHinglish: "Ek-ek minute kaatna mushkil ho jaata hai. Mann karta hai abhi jaa ke manau aur sab thik kar du.",
                tendency: 'anxious',
                weight: 3
            },
            {
                id: '6c',
                text: "Good. I need space too. In fact, maybe I needed it more than they did.",
                textHinglish: "Accha hai. Mujhe bhi space chahiye. Balki mujhe unse zyada zaroorat hai.",
                tendency: 'avoidant',
                weight: 2
            },
            {
                id: '6d',
                text: "I tell myself I'm fine with it, but then feel abandoned. I might text something I regret.",
                textHinglish: "Main khud ko bolta/bolti hu thik hai, par fir lagta hai unhone mujhe chhod diya. Gusse mein kuch galat msg kar sakta/sakti hu.",
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
        scenarioHinglish: "{{partner}} aapki aankhon mein dekh kar kehte hain 'Mujhe aaj tak kisi se itna close feel nahi hua.' Aap andar se kaisa feel karte hain?",
        options: [
            {
                id: '7a',
                text: "Warm and connected. I feel the same way and I'm comfortable telling them.",
                textHinglish: "Bohot accha aur connected lagta hai. Main bhi wahi feel karta/karti hu aur bolne mein comfortable hu.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '7b',
                text: "Overjoyed but also scared. What if I lose this? What if I'm not enough?",
                textHinglish: "Khushi toh bahut hoti hai par kahin na kahin ek darr bhi rehta hai. Ya agar ye sab kho diya toh? Ya agar main utna achha partner nahi ban paya jitna tum deserve karte ho?",
                tendency: 'anxious',
                weight: 2
            },
            {
                id: '7c',
                text: "Uncomfortable. That's a lot of pressure. I might change the subject or make a joke.",
                textHinglish: "Ajeeb lagta hai. Bohot pressure aa jaata hai. Main shayad baat badal du ya mazaak kar du.",
                tendency: 'avoidant',
                weight: 3
            },
            {
                id: '7d',
                text: "I want to lean in, but something makes me want to pull away. It's too intense.",
                textHinglish: "Main paas aana chahta/chahti hu par koi cheez mujhe peeche kheenchti hai. Ye bohot intense hai.",
                tendency: 'disorganized',
                weight: 3
            }
        ]
    },
    {
        id: 8,
        category: 'intimacy',
        scenario: "You and {{partner}} have had an amazing weekend together - totally connected. Now it's Sunday night. How do you feel?",
        scenarioHinglish: "Aap aur {{partner}} ne ek bohot badhiya weekend saath bitaya. Ab Sunday raat ho gayi hai. Aap kaisa feel kar rahe hain?",
        options: [
            {
                id: '8a',
                text: "Content and grateful. I look forward to seeing them again but I'm also fine on my own.",
                textHinglish: "Khush aur satisfied. Dobara milne ka intezaar rahega par main akele bhi thik hu.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '8b',
                text: "Already dreading the separation. When can we see each other again? The week will feel so long.",
                textHinglish: "Abhi se alag hone ka darr lag raha hai. Hum fir kab milenge? Ye hafta katna mushkil hoga.",
                tendency: 'anxious',
                weight: 3
            },
            {
                id: '8c',
                text: "Honestly, I'm looking forward to some alone time. That was a lot of togetherness.",
                textHinglish: "Sach kahu toh mujhe thoda me-time chahiye. Bohot zyada waqt saath bita liya.",
                tendency: 'avoidant',
                weight: 3
            },
            {
                id: '8d',
                text: "Part of me wants it to never end, part of me feels suffocated. I'm emotionally confused.",
                textHinglish: "Kabhi lagta hai ye kabhi khatam na ho, kabhi ghutan hone lagti hai. Main confused hu.",
                tendency: 'disorganized',
                weight: 2
            }
        ]
    },
    {
        id: 9,
        category: 'intimacy',
        scenario: "During a vulnerable moment, {{partner}} starts crying in front of you. What do you do?",
        scenarioHinglish: "Ek emotional moment mein, {{partner}} aapke saamne rone lagte hain. Aap kya karenge?",
        options: [
            {
                id: '9a',
                text: "I hold them close, let them cry, and reassure them I'm here. No words needed.",
                textHinglish: "Main unhe gale lagauga/lagaungi, rone dunga/dungi, aur ehsaas dilauga/dilaungi ki main saath hu.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '9b',
                text: "I immediately try to fix whatever's wrong. Their pain makes me anxious - I need to help NOW.",
                textHinglish: "Main turant problem solve karne ki koshish karta/karti hu. Unhe rota dekh mujhe ghabrahat hoti hai - mujhe abhi help karni hai.",
                tendency: 'anxious',
                weight: 2
            },
            {
                id: '9c',
                text: "I feel awkward and unsure what to do. I might offer practical advice to move past the emotion.",
                textHinglish: "Mujhe awkward lagta hai. Samajh nahi aata kya karu. Shayad main koi practical advice du taaki wo chup ho jaayein.",
                tendency: 'avoidant',
                weight: 3
            },
            {
                id: '9d',
                text: "I want to comfort them but I freeze up. Their vulnerability triggers something uncomfortable in me.",
                textHinglish: "Main unhe chup karana chahta/chahti hu par main jam jaata/jaati hu. Unka rona mujhe uncomfortable kar deta hai.",
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
        scenarioHinglish: "{{partner}} ek party mein ja rahe hain jahan unka/unki attractive ex bhi hoga/hogi. Wo kehte hain kuch nahi hoga. Aapko kaisa lag raha hai?",
        options: [
            {
                id: '10a',
                text: "I trust them. They're with me by choice. I hope they have fun.",
                textHinglish: "Mujhe unpe bharosa hai. Wo apni marzi se mere saath hain. Hope wo enjoy karein.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '10b',
                text: "I say it's fine, but inside I'm a mess. I'll probably check their social media all night.",
                textHinglish: "Main kehta hu thik hai, par andar se darr lag raha hai. Main shayad raat bhar unka social media check karu.",
                tendency: 'anxious',
                weight: 3
            },
            {
                id: '10c',
                text: "Whatever. They can do what they want. I don't want to seem controlling.",
                textHinglish: "Jo karna hai karein. Main controlling nahi dikhna chahta/chahti.",
                tendency: 'avoidant',
                weight: 2
            },
            {
                id: '10d',
                text: "I act like I trust them but then make subtle comments that reveal my insecurity.",
                textHinglish: "Dikhata hu ki trust hai par phir taane maar kar apni insecurity dikha deta hu.",
                tendency: 'disorganized',
                weight: 2
            }
        ]
    },
    {
        id: 11,
        category: 'trust',
        scenario: "You discover {{partner}} has been talking to someone you don't know - just friendly chats. But they never mentioned this person. What's your reaction?",
        scenarioHinglish: "Aapko pata chalta hai ki {{partner}} kisi anjaan se baat kar rahe hain - bas friendly chat. Par unhone kabhi bataya nahi. Aapka reaction?",
        options: [
            {
                id: '11a',
                text: "I casually ask about their new friend. People have lots of connections, no big deal.",
                textHinglish: "Main casually puchta/puchti hu naye friend ke baare mein. Sabke dost hote hain, koi badi baat nahi.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '11b',
                text: "Why didn't they tell me? What are they hiding? I need answers immediately.",
                textHinglish: "Unhone bataya kyun nahi? Kya chupa rahe hain? Mujhe abhi jawaab chahiye.",
                tendency: 'anxious',
                weight: 3
            },
            {
                id: '11c',
                text: "Good. They should have their own social life. I don't need to know everything.",
                textHinglish: "Sahi hai. Unki apni life honi chahiye. Mujhe sab kuch jaanne ki zaroorat nahi.",
                tendency: 'avoidant',
                weight: 2
            },
            {
                id: '11d',
                text: "I pretend not to care but secretly investigate. I feel anxious but don't want to show it.",
                textHinglish: "Main dikhata/dikhati hu ki mujhe farak nahi padta par chhupke pata lagata hu. Ghabrahat hoti hai par dikhana nahi chahta/chahti.",
                tendency: 'disorganized',
                weight: 3
            }
        ]
    },
    {
        id: 12,
        category: 'trust',
        scenario: "{{partner}} mentions they ran into their ex and had coffee. Nothing happened - just catching up. What's your honest reaction?",
        scenarioHinglish: "{{partner}} ne bataya ki wo apne ex se mile aur coffee pee. Bas haal-chaal pucha, aur kuch nahi. Aapka sachha reaction?",
        options: [
            {
                id: '12a',
                text: "I appreciate them being upfront. I trust their judgment. How was the coffee?",
                textHinglish: "Accha laga unhone bata diya. Mujhe unpe bharosa hai. Kaisi thi coffee?",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '12b',
                text: "My stomach drops. Why would they do that? Am I not enough? I need more details.",
                textHinglish: "Dil baith jaata hai. Aisa kyun kiya? Kya main kaafi nahi hu? Mujhe saari details chahiye.",
                tendency: 'anxious',
                weight: 3
            },
            {
                id: '12c',
                text: "I shrug it off. Their past is their past. I'm not going to make a thing of it.",
                textHinglish: "Mujhe farak nahi padta. Unka past unka hai. Main iska issue nahi banaunga/banaungi.",
                tendency: 'avoidant',
                weight: 2
            },
            {
                id: '12d',
                text: "I act cool but later obsess over it. I might bring it up in a fight weeks later.",
                textHinglish: "Main cool banne ki acting karta/karti hu par dimaag mein wahi chalta rehta hai. Baad mein ladai mein shayad ye baat nikalu.",
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
        scenarioHinglish: "{{partner}} ek hafte ke liye akele trip pe jaana chahte hain - phone nahi, bas wo aur nature. Aap kaise handle karenge?",
        options: [
            {
                id: '13a',
                text: "I think it's great they're doing something for themselves. I'll miss them but I support it.",
                textHinglish: "Badhiya hai, wo apne liye kuch kar rahe hain. Miss karunga/karungi par support karta/karti hu.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '13b',
                text: "A whole week with no contact? That's going to be really hard for me. Can they at least check in daily?",
                textHinglish: "Pura hafta bina baat kiye? Ye mere liye bohot mushkil hoga. Kya wo roz ek baar message nahi kar sakte?",
                tendency: 'anxious',
                weight: 3
            },
            {
                id: '13c',
                text: "Honestly, I'm excited about having the place to myself. I could use some alone time too.",
                textHinglish: "Sach kahu toh maza aayega akele rehne mein. Mujhe bhi thoda me-time chahiye tha.",
                tendency: 'avoidant',
                weight: 2
            },
            {
                id: '13d',
                text: "I encourage them to go but then feel abandoned when they leave. I don't know what I want.",
                textHinglish: "Main kehta hu jao, par jab wo chale jaate hain toh akela feel karta hu. Pata nahi kya chahiye mujhe.",
                tendency: 'disorganized',
                weight: 3
            }
        ]
    },
    {
        id: 14,
        category: 'independence',
        scenario: "{{partner}} wants to spend every free moment with you this week. How does that make you feel?",
        scenarioHinglish: "{{partner}} is hafte ka har free pal aapke saath bitana chahte hain. Aapko kaisa lag raha hai?",
        options: [
            {
                id: '14a',
                text: "That sounds lovely, though I'll still make time for my own activities here and there.",
                textHinglish: "Accha laga sunke, par main apne kaam ke liye bhi thoda time nikaal lunga/lungi.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '14b',
                text: "I love it! This is exactly what I want. The more time together, the better.",
                textHinglish: "Maza aa gaya! Yahi toh main chahta/chahti hu. Jitna saath rahein utna accha.",
                tendency: 'anxious',
                weight: 2
            },
            {
                id: '14c',
                text: "That's... a lot. I need my own space. Can we find a balance?",
                textHinglish: "Ye... thoda zyada ho gaya. Mujhe space chahiye. Thoda balance nahi bata sakte?",
                tendency: 'avoidant',
                weight: 3
            },
            {
                id: '14d',
                text: "I want it but also feel trapped. I might agree then cancel at the last minute.",
                textHinglish: "Chahata toh hu, par ghutan bhi hoti hai. Shayad haan bol du aur last minute cancel kar du.",
                tendency: 'disorganized',
                weight: 2
            }
        ]
    },
    {
        id: 15,
        category: 'independence',
        scenario: "You've been spending less time with your friends since being with {{partner}}. They encourage you to go out more without them. How do you interpret this?",
        scenarioHinglish: "Jab se aap {{partner}} ke saath hain, aap doston se kam mil rahe hain. Wo apse kehte hain ki bina unke bahar jaaya karo. Iska kya matlab nikalte hain aap?",
        options: [
            {
                id: '15a',
                text: "They're right. I need to maintain my friendships. They're being supportive of my whole life.",
                textHinglish: "Sahi keh rahe hain. Mujhe dosti nibhani chahiye. Wo meri life ko support kar rahe hain.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '15b',
                text: "Wait, do they not want to spend time with me? Are they pushing me away?",
                textHinglish: "Ruko, kya wo mere saath time nahi bitana chahte? Kya wo mujhe door kar rahe hain?",
                tendency: 'anxious',
                weight: 3
            },
            {
                id: '15c',
                text: "Finally! I've been wanting more friend time but didn't know how to bring it up.",
                textHinglish: "Chalo, accha hua! Main doston se milna chahta/chahti tha par bol nahi paa raha tha.",
                tendency: 'avoidant',
                weight: 2
            },
            {
                id: '15d',
                text: "I'm confused. Do they care or don't they? Is this a test?",
                textHinglish: "Main confused hu. Kya unhe farak padta hai ya nahi? Kya ye koi test hai?",
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
        scenarioHinglish: "Aap kisi bohot mushkil daur se guzar rahe hain. Kya aap {{partner}} ko batayenge?",
        options: [
            {
                id: '16a',
                text: "Yes, I lean on them. That's what partners are for. I trust them with my struggles.",
                textHinglish: "Haan, main unki madad leta/leti hu. Partner isi liye toh hote hain. Mujhe unpe bharosa hai.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '16b',
                text: "Yes, but I worry about being too much or pushing them away with my problems.",
                textHinglish: "Haan, par darr lagta hai ki kahin main unpe bojh na ban jau ya wo door na ho jayein.",
                tendency: 'anxious',
                weight: 2
            },
            {
                id: '16c',
                text: "I deal with it on my own. I don't want to burden them or seem weak.",
                textHinglish: "Main khud sambhaal lunga/lungi. Main unpe bojh nahi banna chahta/chahti na hi kamzor dikhna.",
                tendency: 'avoidant',
                weight: 3
            },
            {
                id: '16d',
                text: "I start to share then shut down. Opening up feels dangerous somehow.",
                textHinglish: "Batana shuru karta/karti hu fir chup ho jaata/jaati hu. Khul ke baat karna safe nahi lagta.",
                tendency: 'disorganized',
                weight: 3
            }
        ]
    },
    {
        id: 17,
        category: 'vulnerability',
        scenario: "{{partner}} asks you deep questions about your childhood and family. How do you respond?",
        scenarioHinglish: "{{partner}} aapke bachpan aur family ke baare mein gehre sawal puchte hain. Aap kya karenge?",
        options: [
            {
                id: '17a',
                text: "I share openly. These conversations bring us closer and I trust them completely.",
                textHinglish: "Khul ke batata/batati hu. Aisi baaton se hum kareeb aate hain.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '17b',
                text: "I share but then worry - was that too much? Will they judge me differently now?",
                textHinglish: "Bata toh deta/deti hu par fir tension hoti hai - kya zyada bol diya? Kya wo mujhe judge karenge?",
                tendency: 'anxious',
                weight: 2
            },
            {
                id: '17c',
                text: "I give surface-level answers. I don't really see the point of digging into all that.",
                textHinglish: "Upar-upar se jawaab deta/deti hu. Purani baatein khodne ka kya fayda?",
                tendency: 'avoidant',
                weight: 3
            },
            {
                id: '17d',
                text: "I feel exposed and want to shut down, but also crave the connection of being truly known.",
                textHinglish: "Darr lagta hai ki sab pata chal gaya, par ye bhi chahta/chahti hu ki koi mujhe sach mein jaane.",
                tendency: 'disorganized',
                weight: 3
            }
        ]
    },
    {
        id: 18,
        category: 'vulnerability',
        scenario: "You made a significant mistake that affected your relationship. {{partner}} finds out. How do you handle it?",
        scenarioHinglish: "Aapse koi badi galti ho gayi jisse rishte pe asar pada. {{partner}} ko pata chal gaya. Aap kya karenge?",
        options: [
            {
                id: '18a',
                text: "I own it completely, apologize sincerely, and work to rebuild trust. We can get through this.",
                textHinglish: "Galti maanta/maanti hu, dil se maafi maangta/maangti hu. Hum isse nikal jayenge.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '18b',
                text: "I'm devastated and can't stop apologizing. I'm terrified this will end us.",
                textHinglish: "Main toot jaata/jaati hu aur maafi maangta rehta/rehti hu. Darr lagta hai rishta khatam na ho jaaye.",
                tendency: 'anxious',
                weight: 3
            },
            {
                id: '18c',
                text: "I get defensive and minimize it. Or I shut down completely. I hate feeling this exposed.",
                textHinglish: "Main defensive ho jaata/jaati hu ya baat ko kum dikhata/dikhati hu. Mujhe apni galti maanna pasand nahi.",
                tendency: 'avoidant',
                weight: 3
            },
            {
                id: '18d',
                text: "I alternate between over-apologizing and getting angry at them for being upset.",
                textHinglish: "Kabhi bohot maafi maangta/maangti hu, kabhi unpe gussa karta/karti hu ki wo naraaz kyun hain.",
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
        scenarioHinglish: "{{partner}} saath rehne (live-in) ki baat karte hain. Aapka pehla reaction kya hai?",
        options: [
            {
                id: '19a',
                text: "Excited! This feels like a natural next step. Let's plan it out together.",
                textHinglish: "Excited! Ye agla step lagta hai. Chalo saath mein plan karte hain.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '19b',
                text: "YES! I've been hoping for this. Does this mean they're really committed to me?",
                textHinglish: "HAAN! Main yahi chahta/chahti tha. Matlab wo sach mein committed hain na?",
                tendency: 'anxious',
                weight: 2
            },
            {
                id: '19c',
                text: "Whoa, that's a big step. I need to think about what I'd be giving up. My space, my freedom...",
                textHinglish: "Arre, ye toh bada faisla hai. Mujhe sochna padega meri azaadi aur space ka kya hoga...",
                tendency: 'avoidant',
                weight: 3
            },
            {
                id: '19d',
                text: "I want it but immediately start thinking about how it could go wrong. I feel both excited and panicked.",
                textHinglish: "Chahta/chahti hu par turant lagta hai ki kuch galat ho jayega. Khushi aur darr dono lagta hai.",
                tendency: 'disorganized',
                weight: 3
            }
        ]
    },
    {
        id: 20,
        category: 'communication',
        scenario: "It's {{partner}}'s birthday and you want to express how much they mean to you. What do you do?",
        scenarioHinglish: "{{partner}} ka birthday hai aur aap batana chahte hain ki wo aapke liye kitne khaas hain. Aap kya karenge?",
        options: [
            {
                id: '20a',
                text: "I plan something meaningful and tell them openly how much I love and appreciate them.",
                textHinglish: "Main kuch special plan karta/karti hu aur khul ke batata/batati hu ki main unse kitna pyaar karta/karti hu.",
                tendency: 'secure',
                weight: 2
            },
            {
                id: '20b',
                text: "I go all out - the perfect gift, the perfect words. I need them to know how much I care.",
                textHinglish: "Main sab kuch perfect karta/karti hu - gift, baatein. Mujhe unhe dikhana hai ki main kitna care karta/karti hu.",
                tendency: 'anxious',
                weight: 2
            },
            {
                id: '20c',
                text: "I get them something nice but struggle with the emotional part. I show love through actions, not words.",
                textHinglish: "Accha gift deta/deti hu par emotional baatein karne mein dikkat hoti hai. Main harkaton se pyaar dikhata/dikhati hu, bolke nahi.",
                tendency: 'avoidant',
                weight: 2
            },
            {
                id: '20d',
                text: "I want to express my feelings but choke up. Big emotional moments make me freeze.",
                textHinglish: "Bolna chahta/chahti hu par awaaz nahi nikalti. Emotional moments mein main jam jaata/jaati hu.",
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
