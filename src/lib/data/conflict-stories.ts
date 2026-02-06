import { PairingKey } from './pairing-analysis';

export interface ConflictStory {
    title: string;
    story: string;
    titleHinglish: string;
    storyHinglish: string;
}

// export const conflictStories: Record<string, ConflictStory[]> = {
//     // === SECURE PAIRINGS ===
//     'secure-secure': [
//         {
//             title: "The Misunderstanding",
//             story: "[Partner1] forgets to run an errand they promised. [Partner2] feels annoyed but assumes it was an honest mistake. Instead of attacking character ('You never listen'), [Partner2] says, 'I'm frustrated you forgot.' [Partner1] apologizes without getting defensive, and they fix it together.",
//             titleHinglish: "Galatfehmi (The Misunderstanding)",
//             storyHinglish: "[Partner1] koi vaada kiya hua kaam bhool jaate hain. [Partner2] thoda annoyed feel karte hain par sochte hain ki ye galti se hua hoga. Character par attack karne ke bajaye ('Tum kabhi nahi sunte'), [Partner2] kehte hain, 'Main frustrated hoon ki tum bhool gaye.' [Partner1] bina defensive hue sorry bolte hain, aur dono milkar ise fix karte hain."
//         },
//         {
//             title: "The Bad Day",
//             story: "[Partner1] comes home stressed and quiet. [Partner2] notices but doesn't panic. They ask, 'Do you need space or a hug?' [Partner1] asks for 30 minutes of quiet. [Partner2] gives it happily. Later, they reconnect over dinner.",
//             titleHinglish: "Kharab Din (The Bad Day)",
//             storyHinglish: "[Partner1] stressed aur shaant ghar aate hain. [Partner2] notice karte hain par panic nahi karte. Wo poochte hain, 'Kya tumhe space chahiye ya hug?' [Partner1] 30 minute ki shanti maangte hain. [Partner2] khushi se de dete hain. Baad mein, wo dinner par reconnect karte hain."
//         },
//         {
//             title: "The Disagreement",
//             story: "They disagree on where to spend the holidays. Both express their needs clearly without manipulation. They brainstorm a compromise—alternating years—and both feel heard and satisfied.",
//             titleHinglish: "Sehmati Na Hona (The Disagreement)",
//             storyHinglish: "Holidays kahan bitayein is par unki sehmati nahi hoti. Dono apni zarooratein bina manipulation ke saaf taur par batate hain. Wo ek compromise nikaalte hain—saal badalkar—aur dono suna hua aur santusht mehsoos karte hain."
//         },
//         {
//             title: "Financial Styles",
//             story: "[Partner1] is a spender, [Partner2] is a saver. Instead of fighting about 'irresponsibility' or 'stinginess', they sit down and create a budget that includes a 'fun fund' for [Partner1] and a 'security fund' for [Partner2]. They respect each other's psychological need for money.",
//             titleHinglish: "Paison ka Tareeka (Financial Styles)",
//             storyHinglish: "[Partner1] kharchile hain, [Partner2] bachat karte hain. 'Laparwahi' ya 'kanjoosi' par ladne ke bajaye, wo baithkar ek budget banate hain jisme [Partner1] ke liye 'fun fund' aur [Partner2] ke liye 'security fund' hota hai. Wo paison ko lekar ek-dusre ki psychological zaroorat ki izzat karte hain."
//         },
//         {
//             title: "Intimacy Mismatch",
//             story: "One night, [Partner1] wants intimacy but [Partner2] is exhausted. [Partner2] says, 'I love you and I want to connect, but I'm too tired for sex. Can we just cuddle?' [Partner1] accepts this without feeling rejected, knowing that 'no' to sex isn't 'no' to love.",
//             titleHinglish: "Intimacy Mismatch",
//             storyHinglish: "Ek raat, [Partner1] intimacy chahte hain par [Partner2] thake hue hain. [Partner2] kehte hain, 'Main tumse pyaar karta/karti hoon aur connect karna chahta/chahti hoon, par main sex ke liye bohat thaka/thaki hoon. Kya hum sirf cuddle kar sakte hain?' [Partner1] ise bina reject feel kiye accept karte hain, ye jaante hue ki sex ko 'na' kehna pyaar ko 'na' kehna nahi hai."
//         },
//         {
//             title: "Career Shift",
//             story: "[Partner1] wants to quit a stable job to pursue a dream. [Partner2] is worried about stability. Instead of shutting it down, [Partner2] says, 'That scares me, but I want you to be happy. Let's look at the numbers.' They face the risk as a team.",
//             titleHinglish: "Career Badlaav (Career Shift)",
//             storyHinglish: "[Partner1] apna stable job chhodkar sapna poora karna chahte hain. [Partner2] stability ko lekar chintit hain. Ise band karne ke bajaye, [Partner2] kehte hain, 'Mujhe darr lag raha hai, par main tumhe khush dekhna chahta/chahti hoon. Chalo numbers dekhte hain.' Wo risk ka saamna ek team ki tarah karte hain."
//         },
//         {
//             title: "Parenting/Decisions",
//             story: "They disagree on a major decision. They present a united front to the world but debate passionately in private. They don't stop until they find a solution that respects both values. Neither one 'wins' at the expense of the other.",
//             titleHinglish: "Parenting/Faisle",
//             storyHinglish: "Wo ek bade faisle par disagree karte hain. Wo duniya ke saamne ek saath dikhte hain par akele mein jamkar bahas karte hain. Wo tab tak nahi rukte jab tak aisa hal na mile jo dono ki values ki izzat kare. Koi bhi doosre ke nuksan par nahi 'jeetta'."
//         },
//         {
//             title: "A Moment of Jealousy",
//             story: "At a party, [Partner1] feels a pang of jealousy seeing [Partner2] laugh with someone else. On the ride home, [Partner1] admits, 'I felt a bit insecure.' [Partner2] reassures them immediately: 'You're the only one for me.' The feeling dissolves.",
//             titleHinglish: "Jalan ka Pal (A Moment of Jealousy)",
//             storyHinglish: "Ek party mein, [Partner1] ko thodi jalan hoti hai jab wo [Partner2] ko kisi aur ke saath hanste hue dekhte hain. Ghar jaate waqt, [Partner1] maante hain, 'Maine thoda insecure feel kiya.' [Partner2] unhe turant tasalli dete hain: 'Mere liye sirf tum ho.' Wo feeling gayab ho jaati hai."
//         },
//         {
//             title: "Aging & Caretaking",
//             story: "When a parent gets sick, the stress is high. They take turns carrying the emotional load. When [Partner1] breaks down, [Partner2] steps up, and vice versa. They view the challenge as external, not between them.",
//             titleHinglish: "Budhapa aur Dekhbhaal",
//             storyHinglish: "Jab koi parent beemar padta hai, stress badh jata hai. Wo baari-baari emotional bojh uthate hain. Jab [Partner1] tootate hain, [Partner2] sambhal lete hain, aur vice versa. Wo chunauti ko bahari maante hain, apne beech nahi."
//         },
//         {
//             title: "Personal Growth",
//             story: "[Partner1] takes up a time-consuming hobby. [Partner2] misses them but cheers them on. [Partner1] makes sure to carve out quality time to reconnect. They grow individually without growing apart.",
//             titleHinglish: "Khud ki Growth",
//             storyHinglish: "[Partner1] ek naya shauk paalte hain jo waqt leta hai. [Partner2] unhe miss karte hain par hausla badhate hain. [Partner1] reconnect karne ke liye quality time nikaalne ka dhyan rakhte hain. Wo alag-alag grow karte hain bina door hue."
//         }
//     ],
//     'secure-anxious': [
//         {
//             title: "The Unanswered Text",
//             story: "[Partner2] (Anxious) sends a text and doesn't hear back for 3 hours. Their mind starts racing: 'Are they mad?' When [Partner1] (Secure) finally replies, 'Sorry, slammed at work!', [Partner2] feels relief. [Partner1] learns to send a quick 'Busy, text later' to help [Partner2] feel safe.",
//             titleHinglish: "Jawab Na Milna (The Unanswered Text)",
//             storyHinglish: "[Partner2] (Anxious) message bhejte hain aur 3 ghante tak jawab nahi aata. Unka dimaag daudne lagta hai: 'Kya wo gussa hain?' Jab [Partner1] (Secure) finally reply karte hain, 'Sorry, kaam mein phansa tha!', [Partner2] relief feel karte hain. [Partner1] seekhte hain ki ek chhota 'Busy hoon, baad mein text karta hoon' bhejna [Partner2] ko safe feel karata hai."
//         },
//         {
//             title: "The Need for Reassurance",
//             story: "[Partner2] (Anxious) feels insecure and asks, 'Do you still love me?' [Partner1] (Secure) pauses, looks them in the eye, and says, 'I love you, and I'm not going anywhere.' [Partner2] relaxes, learning that their needs aren't 'too much'.",
//             titleHinglish: "Tasalli ki Zaroorat",
//             storyHinglish: "[Partner2] (Anxious) insecure feel karte hain aur poochte hain, 'Kya tum ab bhi mujhse pyaar karte ho?' [Partner1] (Secure) rukte hain, unki aankhon mein dekhte hain aur kehte hain, 'Main tumse pyaar karta hoon, aur main kahin nahi ja raha.' [Partner2] relax ho jaate hain, ye samajhkar ki unki zarooratein 'bohat zyada' nahi hain."
//         },
//         {
//             title: "The Space Issue",
//             story: "[Partner1] (Secure) wants a night out with friends. [Partner2] (Anxious) feels abandoned. [Partner1] reassures them: 'I'm going to have fun, but I can't wait to see you tomorrow.' This bridge of connection helps [Partner2] handle the separation.",
//             titleHinglish: "Space ka Mudda",
//             storyHinglish: "[Partner1] (Secure) doston ke saath bahar jaana chahte hain. [Partner2] (Anxious) akela feel karte hain. [Partner1] unhe tasalli dete hain: 'Main enjoy karne ja raha hoon, par kal tumse milne ka intezaar rahega.' Ye connection [Partner2] ko doori bardasht karne mein madad karta hai."
//         },
//         {
//             title: "The Work Trip",
//             story: "[Partner1] (Secure) travels for work. [Partner2] (Anxious) feels dread. [Partner1] establishes a ritual: a call every night at 9 PM. This predictability acts as a safety anchor for [Partner2], allowing them to sleep soundly.",
//             titleHinglish: "Kaam ka Safar (Work Trip)",
//             storyHinglish: "[Partner1] (Secure) kaam ke liye travel karte hain. [Partner2] (Anxious) darr feel karte hain. [Partner1] ek niyam banate hain: har raat 9 baje call. Ye predictability [Partner2] ke liye safety anchor banti hai, jisse wo araam se so paate hain."
//         },
//         {
//             title: "The Silent Treatment",
//             story: "[Partner2] (Anxious) feels hurt and goes silent to protest. [Partner1] (Secure) doesn't panic or get angry. They say, 'I see you're upset. I'm here when you're ready to talk.' The lack of retaliation makes it safe for [Partner2] to open up.",
//             titleHinglish: "Chuppi (Silent Treatment)",
//             storyHinglish: "[Partner2] (Anxious) hurt feel karte hain aur protest mein chup ho jaate hain. [Partner1] (Secure) panic ya gussa nahi karte. Wo kehte hain, 'Main dekh raha hoon tum upset ho. Jab tum baat karne ke liye taiyaar hoge, main yahin hoon.' Badla na lene ki wajah se [Partner2] ke liye khulna safe ho jata hai."
//         },
//         {
//             title: "Intimacy Speed",
//             story: "[Partner2] (Anxious) wants to move the relationship fast to lock it down. [Partner1] (Secure) slows it down: 'I want to build this right.' [Partner2] initially panics but eventually realizes that [Partner1]'s slow pace is actually a sign of seriousness, not hesitation.",
//             titleHinglish: "Rishte ki Raftaar",
//             storyHinglish: "[Partner2] (Anxious) rishte ko pakka karne ke liye tezi se badhana chahte hain. [Partner1] (Secure) dheema karte hain: 'Main ise sahi tarah se banana chahta hoon.' [Partner2] shuru mein ghabrate hain par samajh jaate hain ki [Partner1] ki dheemi raftaar serious hone ki nishani hai, hichkichahat ki nahi."
//         },
//         {
//             title: "Vulnerability Hangover",
//             story: "[Partner2] (Anxious) overshares early and feels shame. [Partner1] (Secure) listens without judgment and shares something small back. This reciprocity heals the shame.",
//             titleHinglish: "Khulne ka Darr (Vulnerability Hangover)",
//             storyHinglish: "[Partner2] (Anxious) jaldi zyada share kar dete hain aur sharminda hote hain. [Partner1] (Secure) bina judge kiye sunte hain aur khud bhi kuch share karte hain. Ye barabari us sharm ko khatam kar deti hai."
//         },
//         {
//             title: "Social Overwhelm",
//             story: "At a party, [Partner2] (Anxious) feels awkward and clings to [Partner1]. [Partner1] (Secure) doesn't push them away. They stay close until [Partner2] feels settled, then gently encourage them to mingle. [Partner1] acts as a secure base.",
//             titleHinglish: "Social Ghabrahat",
//             storyHinglish: "Ek party mein, [Partner2] (Anxious) awkward feel karte hain aur [Partner1] se chipak jaate hain. [Partner1] (Secure) unhe door nahi karte. Wo tab tak paas rehte hain jab tak [Partner2] settle feel na karein. [Partner1] ek secure base bante hain."
//         },
//         {
//             title: "Conflict Volume",
//             story: "[Partner2] (Anxious) raises their voice in fear. [Partner1] (Secure) stays calm: 'I can't talk when you yell, but I want to hear you. Let's take 5 minutes.' They hold the boundary without withdrawing love.",
//             titleHinglish: "Jhagde ki Awaaz",
//             storyHinglish: "[Partner2] (Anxious) darr ke maare awaaz oonchi karte hain. [Partner1] (Secure) shaant rehte hain: 'Jab tum chillate ho main baat nahi kar sakta, par main tumhe sunna chahta hoon. Chalo 5 minute rukte hain.' Wo boundary banaye rakhte hain bina pyaar kam kiye."
//         },
//         {
//             title: "The Apology",
//             story: "[Partner2] (Anxious) makes a mistake and apologizes profusely, terrified of being left. [Partner1] (Secure) smiles: 'It's okay. You don't have to earn my love back. We're good.' [Partner2] learns that mistakes aren't fatal.",
//             titleHinglish: "Maafi (The Apology)",
//             storyHinglish: "[Partner2] (Anxious) galti karte hain aur baar-baar maafi mangte hain, chhod diye jaane ke darr se. [Partner1] (Secure) muskurate hain: 'Sab theek hai. Tumhe mera pyaar wapas jeetne ki zaroorat nahi hai. Hum theek hain.' [Partner2] seekhte hain ki galtiyaan rishta khatam nahi kartin."
//         }
//     ],
//     'secure-avoidant': [
//         {
//             title: "The 'Talk'",
//             story: "[Partner1] (Secure) wants to discuss feelings. [Partner2] (Avoidant) feels a wall go up. [Partner1] says, 'We don't have to solve it now. Let's talk after dinner.' [Partner2] feels respected, not trapped, and is more willing to engage later.",
//             titleHinglish: "Baat-Cheet (The Talk)",
//             storyHinglish: "[Partner1] (Secure) feelings discuss karna chahte hain. [Partner2] (Avoidant) ek deewar khadi kar lete hain. [Partner1] kehte hain, 'Humein abhi solve karne ki zaroorat nahi hai. Chalo dinner ke baad baat karte hain.' [Partner2] respected feel karte hain, phansa hua nahi, aur baad mein baat karne ke liye taiyaar hote hain."
//         },
//         {
//             title: "The Intimacy Hangover",
//             story: "After a close weekend, [Partner2] (Avoidant) pulls back. [Partner1] (Secure) notices but doesn't take it personally. They focus on their own life. When [Partner2] recharges, they return, grateful that [Partner1] didn't punish them for needing space.",
//             titleHinglish: "Intimacy ka Darr (Intimacy Hangover)",
//             storyHinglish: "Ek kareebi weekend ke baad, [Partner2] (Avoidant) peeche hatate hain. [Partner1] (Secure) notice karte hain par dil pe nahi lete. Wo apni life par focus karte hain. Jab [Partner2] recharge ho jaate hain, wo wapas aate hain, shukraguzaar ki [Partner1] ne space lene ke liye unhe saza nahi di."
//         },
//         {
//             title: "Vulnerability",
//             story: "[Partner1] (Secure) shares a fear. [Partner2] (Avoidant) feels uncomfortable and jokes. [Partner1] gently says, 'I just need you to listen.' [Partner2] takes a breath and stays present, learning that emotions aren't dangerous.",
//             titleHinglish: "Kamzori Dikhana (Vulnerability)",
//             storyHinglish: "[Partner1] (Secure) apna ek darr share karte hain. [Partner2] (Avoidant) uncomfortable feel karte hain aur mazaak karte hain. [Partner1] pyaar se kehte hain, 'Mujhe bas chahiye ki tum suno.' [Partner2] saans lete hain aur maujood rehte hain, ye seekhte hue ki emotions khatarnaak nahi hain."
//         },
//         {
//             title: "The Weekend Away",
//             story: "[Partner1] (Secure) plans a trip. [Partner2] (Avoidant) feels trapped. [Partner1] offers, 'We can take separate cars if you want an escape hatch.' Knowing they *can* leave makes [Partner2] want to stay.",
//             titleHinglish: "Weekend Trip",
//             storyHinglish: "[Partner1] (Secure) trip plan karte hain. [Partner2] (Avoidant) phansa hua feel karte hain. [Partner1] offer karte hain, 'Agar tum chaho to hum alag gaadiyon mein ja sakte hain taaki tumhe azaadi lage.' Ye jaankar ki wo ja *sakte* hain, [Partner2] rukna chahte hain."
//         },
//         {
//             title: "Commitment Fears",
//             story: "[Partner2] (Avoidant) hesitates to move in. [Partner1] (Secure) doesn't pressure but asks, 'What does your fear look like?' They talk about the fear of losing oneself, rather than the logistics of moving.",
//             titleHinglish: "Commitment ka Darr",
//             storyHinglish: "[Partner2] (Avoidant) saath rehne mein hichkichate hain. [Partner1] (Secure) pressure nahi daalte par poochte hain, 'Tumhara darr kaisa dikhta hai?' Wo khud ko kho dene ke darr ke baare mein baat karte hain, na ki ghar badalne ki logistics par."
//         },
//         {
//             title: "Emotional Support",
//             story: "[Partner1] (Secure) is sad. [Partner2] (Avoidant) freezes, not knowing how to fix it. [Partner1] says, 'You don't need to fix it. Just sit with me.' [Partner2] learns that presence is enough.",
//             titleHinglish: "Jazbaati Sahara (Emotional Support)",
//             storyHinglish: "[Partner1] (Secure) udaas hain. [Partner2] (Avoidant) freeze ho jaate hain, samajh nahi aata kaise theek karein. [Partner1] kehte hain, 'Tumhe ise theek karne ki zaroorat nahi hai. Bas mere saath baitho.' [Partner2] seekhte hain ki saath hona hi kaafi hai."
//         },
//         {
//             title: "Nitpicking",
//             story: "[Partner2] (Avoidant) starts criticizing [Partner1]'s chewing (a deactivating strategy). [Partner1] (Secure) asks, 'Are you actually mad about the chewing, or do you need some alone time?' [Partner2] realizes they just need space.",
//             titleHinglish: "Nukta-cheeni (Nitpicking)",
//             storyHinglish: "[Partner2] (Avoidant) [Partner1] ke chabane ki aadat mein kami nikalte hain. [Partner1] (Secure) poochte hain, 'Kya tum sach mein chabane se gussa ho, ya tumhe thoda akela waqt chahiye?' [Partner2] realize karte hain ki unhe bas space chahiye tha."
//         },
//         {
//             title: "Solo Travel",
//             story: "[Partner2] (Avoidant) wants a solo trip. [Partner1] (Secure) says, 'Have a great time!' [Partner2] misses [Partner1] because they weren't guilt-tripped. Independence becomes a way to reconnect.",
//             titleHinglish: "Akele Safar (Solo Travel)",
//             storyHinglish: "[Partner2] (Avoidant) akele trip par jaana chahte hain. [Partner1] (Secure) kehte hain, 'Maze karna!' [Partner2] [Partner1] ko miss karte hain kyunki unhe guilt-trip nahi kiya gaya. Azaadi judne ka ek tareeka ban jaati hai."
//         },
//         {
//             title: "The Ex Factor",
//             story: "[Partner2] (Avoidant) mentions an ex. [Partner1] (Secure) listens without jealousy, knowing they are the one here now. This lack of reactivity makes the 'phantom ex' lose power.",
//             titleHinglish: "Ex ka Zikr (The Ex Factor)",
//             storyHinglish: "[Partner2] (Avoidant) apne ex ka zikr karte hain. [Partner1] (Secure) bina jalan ke sunte hain, ye jaante hue ki ab wo saath hain. Ye reaction na dena 'phantom ex' ki power khatam kar deta hai."
//         },
//         {
//             title: "Opening Up",
//             story: "[Partner2] (Avoidant) shares a tiny feeling. [Partner1] (Secure) validates it hugely. This positive reinforcement teaches [Partner2]'s nervous system that sharing is safe.",
//             titleHinglish: "Khulna (Opening Up)",
//             storyHinglish: "[Partner2] (Avoidant) apni choti si feeling share karte hain. [Partner1] (Secure) use khulke validate karte hain. Ye positive response [Partner2] ko sikhata hai ki share karna safe hai."
//         }
//     ],
//     'secure-disorganized': [
//         {
//             title: "The Push-Pull",
//             story: "[Partner2] (Disorganized) lashes out, then pulls away in shame. [Partner1] (Secure) stays steady. 'I can't be spoken to like that, but I'm here when you're ready.' This consistency helps [Partner2] feel safe enough to return."
//         },
//         {
//             title: "Testing the Bond",
//             story: "[Partner2] (Disorganized) picks a fight to see if [Partner1] (Secure) will leave. [Partner1] remains calm: 'We're arguing, but I'm still on your team.' This confuses [Partner2]'s expectation of abandonment and builds trust."
//         },
//         {
//             title: "Overwhelmed",
//             story: "[Partner2] (Disorganized) shuts down. [Partner1] (Secure) sits nearby without forcing interaction. 'I'm just going to read here.' [Partner2] realizes they don't have to face the storm alone."
//         },
//         {
//             title: "The Meltdown",
//             story: "[Partner2] (Disorganized) spirals into self-hatred. [Partner1] (Secure) holds the hope: 'I know you're hurting, but I see the good in you.' They act as an external regulator for [Partner2]'s emotions."
//         },
//         {
//             title: "Trust Issues",
//             story: "[Partner2] (Disorganized) accuses [Partner1] of lying. [Partner1] shows their phone calmly. 'I have nothing to hide.' Transparency helps quiet the paranoia."
//         },
//         {
//             title: "Dissociation",
//             story: "[Partner2] (Disorganized) checks out during conflict. [Partner1] (Secure) helps ground them: 'Feel your feet on the floor. You're here. You're safe.' They wait until [Partner2] is back before continuing."
//         },
//         {
//             title: "Sabotage",
//             story: "On a perfect date, [Partner2] (Disorganized) picks a fight. [Partner1] (Secure) recognizes the fear of happiness. 'It's okay to have a good time. We deserve this.' They gently steer the night back to joy."
//         },
//         {
//             title: "Intimacy Triggers",
//             story: "[Partner2] (Disorganized) flinches at touch. [Partner1] (Secure) asks, 'Is this okay?' every step of the way. This consent-based approach rebuilds a sense of agency."
//         },
//         {
//             title: "The Corrective Experience",
//             story: "[Partner2] (Disorganized) expects punishment after a mistake. [Partner1] (Secure) offers forgiveness. This rewires [Partner2]'s brain to understand that love isn't conditional."
//         },
//         {
//             title: "Boring Consistency",
//             story: "[Partner1] (Secure) shows up on time, every time. [Partner2] (Disorganized) initially finds this boring or suspicious, but eventually, this 'boring' consistency becomes the foundation of their healing."
//         }
//     ],

//     // === ANXIOUS PAIRINGS ===
//     'anxious-anxious': [
//         {
//             title: "The Spiral",
//             story: "One partner feels insecure and asks for reassurance. The other interprets this as 'I'm not doing enough' and gets insecure too. Both end up crying. They need to learn to self-soothe before trying to soothe each other."
//         },
//         {
//             title: "Constant Contact",
//             story: "They text 24/7. If one stops, the other panics. This creates a 'merged' relationship. A healthy step is spending an evening apart and realizing the bond survives."
//         },
//         {
//             title: "Over-Giving",
//             story: "Both try to 'save' the other's mood. If one is sad, the other feels guilty. They learn that it's okay for their partner to be upset without it being a relationship emergency."
//         },
//         {
//             title: "The Scorecard",
//             story: "They keep track of affection. 'I did this for you, why didn't you do this for me?' They need to learn generous giving without strings attached."
//         },
//         {
//             title: "Jealousy Loop",
//             story: "One gets jealous, the other gets jealous back. They realize they are both terrified of the same thing: loss. Admitting this shared fear brings them closer than the fighting does."
//         },
//         {
//             title: "Decision Paralysis",
//             story: "Neither wants to choose dinner for fear of disappointing the other. They need to practice assertiveness: 'I want pizza.' 'Okay, cool.' It's safe to have preferences."
//         },
//         {
//             title: "Burnout",
//             story: "They spend every moment together and get sick of each other but are afraid to say it. Taking a solo walk is a victory for the relationship."
//         },
//         {
//             title: "Mind Reading",
//             story: "'You should have known I was sad.' They rely on telepathy. They need to practice explicit communication: 'I am feeling sad and I need a hug.'"
//         },
//         {
//             title: "Crisis Bonding",
//             story: "They bond over drama and shared anxiety. They need to learn to bond over peace and quiet, which can initially feel 'empty' to them."
//         },
//         {
//             title: "Separation Anxiety",
//             story: "One goes on a trip. They FaceTime 5 times a day. Cutting it down to 1 meaningful call allows them to actually miss each other and have something to talk about."
//         }
//     ],
//     'anxious-avoidant': [
//         {
//             title: "The Classic Chase",
//             story: "[Partner1] (Anxious) feels a disconnect and moves closer. [Partner2] (Avoidant) feels engulfed and steps back. [Partner1] panics and chases. The cycle stops when [Partner1] backs off, giving [Partner2] room to return."
//         },
//         {
//             title: "The Homecoming",
//             story: "[Partner2] (Avoidant) comes home tired. [Partner1] (Anxious) asks many questions. [Partner2] gives one-word answers. [Partner1] feels rejected. A better way: [Partner2] asks for 15 mins to decompress first, then connects."
//         },
//         {
//             title: "Vulnerability Hangover",
//             story: "They share a close moment. The next day, [Partner2] (Avoidant) feels 'too exposed' and becomes cold. [Partner1] (Anxious) thinks 'What did I do wrong?' Understanding this 'hangover' helps [Partner1] wait patiently."
//         },
//         {
//             title: "Protest Behavior",
//             story: "[Partner1] (Anxious) tries to make [Partner2] jealous to get a reaction. [Partner2] (Avoidant) withdraws in disgust. [Partner1] needs to say 'I feel lonely' instead of acting out."
//         },
//         {
//             title: "The Phantom Ex",
//             story: "[Partner2] (Avoidant) idealizes an ex to keep distance. [Partner1] (Anxious) competes with the ghost. They need to focus on the reality of *this* relationship, warts and all."
//         },
//         {
//             title: "Sex vs. Intimacy",
//             story: "They use sex to reconnect, but avoid emotional intimacy. [Partner1] feels used, [Partner2] feels pressured. They need to practice talking without touching to build emotional safety."
//         },
//         {
//             title: "The 'Perfect' Date",
//             story: "[Partner2] (Avoidant) is perfect for one night, then disappears. [Partner1] (Anxious) chases that high. They need to aim for consistent 'good enough' connection rather than sporadic intensity."
//         },
//         {
//             title: "Criticism vs Defensiveness",
//             story: "[Partner1] (Anxious) criticizes ('You never...'). [Partner2] (Avoidant) defends and walls off. [Partner1] needs to use 'I feel' statements to lower [Partner2]'s defenses."
//         },
//         {
//             title: "The Ultimatum",
//             story: "[Partner1] (Anxious) threatens to leave. [Partner2] (Avoidant) calls the bluff. [Partner1] stays, losing respect. They need to set real boundaries they can stick to."
//         },
//         {
//             title: "Healing Moment",
//             story: "[Partner2] (Avoidant) stays in the room during a conflict instead of leaving. [Partner1] (Anxious) lowers their voice. A small but massive victory for the relationship."
//         }
//     ],
//     'anxious-disorganized': [
//         {
//             title: "The Minefield",
//             story: "[Partner1] (Anxious) tries to get close. [Partner2] (Disorganized) wants closeness but gets triggered and lashes out. [Partner1] tries harder to 'soothe', which feels like suffocation. [Partner2] needs clear, calm boundaries."
//         },
//         {
//             title: "Hot and Cold",
//             story: "[Partner2] (Disorganized) is warm one minute, icy the next. [Partner1] (Anxious) feels like they are on a rollercoaster. [Partner1] needs to learn that [Partner2]'s mood shifts aren't always about them."
//         },
//         {
//             title: "The Rescue Mission",
//             story: "[Partner2] (Disorganized) is in crisis. [Partner1] (Anxious) jumps in to save them, neglecting their own needs. True healing happens when [Partner1] supports [Partner2] in helping themselves."
//         },
//         {
//             title: "Adding Chaos",
//             story: "[Partner1] (Anxious) adds nervous energy to [Partner2]'s (Disorganized) chaos. They spiral together. [Partner1] needs to practice being the 'calm anchor', even when it's hard."
//         },
//         {
//             title: "Walking on Eggshells",
//             story: "[Partner1] (Anxious) is terrified of triggering a rage. They become hyper-vigilant. They need to detach with love: 'I love you, but I can't be around you when you're like this.'"
//         },
//         {
//             title: "The Victim Triangle",
//             story: "They switch roles between Victim, Rescuer, and Persecutor. Recognizing the game is the only way to stop playing. 'I'm not your savior, and I'm not your enemy. I'm your partner.'"
//         },
//         {
//             title: "Intimacy Triggers",
//             story: "[Partner1] (Anxious) pushes for closeness. [Partner2] (Disorganized) feels engulfed and attacks. [Partner1] feels abused. They need to move *very* slowly, respecting [Partner2]'s window of tolerance."
//         },
//         {
//             title: "Abandonment Cycles",
//             story: "[Partner2] (Disorganized) breaks up impulsively. [Partner1] (Anxious) begs them to stay. They need to respect the breakup to break the cycle. Often, [Partner2] returns when the pressure is off."
//         },
//         {
//             title: "Shared Trauma",
//             story: "They bond over past pain. It feels deep, but it keeps them stuck in the past. They need to build a future based on shared values, not shared wounds."
//         },
//         {
//             title: "Therapy",
//             story: "This pairing is intense. They often need a third party (therapist) to mediate. Admitting they need help is a sign of strength, not failure."
//         }
//     ],

//     // === AVOIDANT PAIRINGS ===
//     'avoidant-avoidant': [
//         {
//             title: "The Roommates",
//             story: "Both are happy to do their own thing. They rarely fight, but rarely connect deep. Days go by without real contact. One needs to brave the discomfort and say, 'I miss you.'"
//         },
//         {
//             title: "The Standoff",
//             story: "A problem arises. Both retreat to process. The issue festers. They need to schedule a time to talk so avoidance doesn't become the default."
//         },
//         {
//             title: "Independence vs. Neglect",
//             story: "They value independence so much they live parallel lives. When one needs support, they hesitate to ask. Learning to lean on each other strengthens their independence."
//         },
//         {
//             title: "The Dry Spell",
//             story: "They stop having sex because it requires vulnerability. Scheduling intimacy can help bridge the gap without the pressure of spontaneous emotion."
//         },
//         {
//             title: "The 'Fine' Trap",
//             story: "'How are you?' 'Fine.' 'Good.' They stay on the surface. They need to ask specific questions: 'What was the hardest part of your day?'"
//         },
//         {
//             title: "Parallel Play",
//             story: "They sit in the same room on phones. It's comfortable, but is it connection? They need to put phones down for 10 mins and just look at each other."
//         },
//         {
//             title: "Illness",
//             story: "One gets sick. The other feels awkward caretaking. Learning to bring soup without being asked is a huge act of love for this pairing."
//         },
//         {
//             title: "Future Planning",
//             story: "They avoid talking about marriage/kids because it's 'heavy'. They need to have the scary conversation to ensure they are on the same page."
//         },
//         {
//             title: "Emotional Cheating",
//             story: "They might open up to a stranger because it's safer than opening up to a partner. They need to bring that emotional energy back home."
//         },
//         {
//             title: "The Breakthrough",
//             story: "One admits, 'I'm lonely.' The other admits, 'Me too.' The wall cracks, and they realize they are in this together."
//         }
//     ],
//     'avoidant-disorganized': [
//         {
//             title: "The False Calm",
//             story: "[Partner1] (Avoidant) keeps things surface. [Partner2] (Disorganized) feels the lack of depth and provokes a fight to feel *something*. [Partner1] retreats, confirming [Partner2]'s fears."
//         },
//         {
//             title: "Triggering Safety",
//             story: "[Partner1] (Avoidant) needs distance to feel safe. [Partner2] (Disorganized) interprets distance as danger. They trigger each other's core safety wounds. They need to find a 'safe distance'."
//         },
//         {
//             title: "The Shutdown",
//             story: "During conflict, [Partner1] (Avoidant) goes numb. [Partner2] (Disorganized) explodes. They end up in a stalemate. Writing letters can be a safer way to communicate."
//         },
//         {
//             title: "The Explosion",
//             story: "[Partner1] (Avoidant) ignores an issue. [Partner2] (Disorganized) explodes. [Partner1] uses the explosion as proof that 'emotions are crazy'. They need to address issues *before* the explosion."
//         },
//         {
//             title: "The Test",
//             story: "[Partner2] (Disorganized) pushes buttons. [Partner1] (Avoidant) gives nothing (stonewalling). This is painful for [Partner2]. [Partner1] needs to say, 'I'm overwhelmed,' not just go silent."
//         },
//         {
//             title: "Gaslighting",
//             story: "[Partner1] (Avoidant) denies feelings. [Partner2] (Disorganized) trusts their gut but feels crazy. [Partner1] needs to be honest: 'I am feeling something, I just can't show it.'"
//         },
//         {
//             title: "The Affair",
//             story: "[Partner2] (Disorganized) seeks intensity elsewhere. [Partner1] (Avoidant) feels relieved to be let off the hook, then betrayed. They need to bring the intensity back to the relationship."
//         },
//         {
//             title: "Reconnection",
//             story: "[Partner1] (Avoidant) does a practical act of service. [Partner2] (Disorganized) appreciates the tangible love. Actions often speak louder than words here."
//         },
//         {
//             title: "Healing",
//             story: "[Partner1] (Avoidant) stays present when [Partner2] (Disorganized) cries. Just staying is the work. It teaches [Partner2] they aren't 'too much'."
//         },
//         {
//             title: "Empathy",
//             story: "[Partner2] (Disorganized) realizes [Partner1] isn't cold, just scared. [Partner1] realizes [Partner2] isn't crazy, just hurt. Compassion breaks the cycle."
//         }
//     ],

//     // === DISORGANIZED PAIRINGS ===
//     'disorganized-disorganized': [
//         {
//             title: "The Storm",
//             story: "Both carry trauma. A small disagreement triggers 'fight or flight' in both. It feels like a chaotic storm. They need a 'safe word' to stop the interaction immediately."
//         },
//         {
//             title: "The Yo-Yo",
//             story: "They break up and get back together repeatedly. The highs are ecstatic, the lows devastating. Stability feels 'boring'. Learning to sit with 'boring' safety is key."
//         },
//         {
//             title: "Trigger Stacking",
//             story: "One's bad mood triggers the other's fear, which triggers the first's anger. It escalates instantly. They need 'time-outs'—20 mins apart to regulate."
//         },
//         {
//             title: "The Mirror",
//             story: "They see their own trauma in the other and hate it. They need to have compassion for themselves to have it for the other."
//         },
//         {
//             title: "Violence/Aggression",
//             story: "Conflicts can get intense quickly. Safety is the priority. Walking away is necessary. 'I love you enough to walk away before I say something I regret.'"
//         },
//         {
//             title: "The Highs",
//             story: "Makeup sex is intense. They mistake intensity for intimacy. They need to value the quiet moments, like drinking coffee together in silence."
//         },
//         {
//             title: "Paranoia",
//             story: "Both are suspicious. Transparency (showing phones, sharing locations) can help build trust initially until the nervous systems settle."
//         },
//         {
//             title: "Substance Use",
//             story: "Using substances to numb pain is common. Sobriety is often the first step to a real relationship. You can't connect if you aren't there."
//         },
//         {
//             title: "The Kids",
//             story: "If they have kids, they fear repeating trauma. Breaking the cycle for the next generation is a powerful motivator to do the hard work."
//         },
//         {
//             title: "Hope",
//             story: "When they both commit to healing, they can be the most empathetic partners because they *know* the darkness. They can heal together."
//         }
//     ]
// };

// Helper to handle reverse keys (e.g., anxious-secure -> secure-anxious)

export interface ConflictStory {
    title: string;
    story: string;
    titleHinglish: string;
    storyHinglish: string;
}

export const conflictStories: Record<string, ConflictStory[]> = {

    // === SECURE PAIRINGS ===
    'secure-secure': [
        {
            title: "The Misunderstanding",
            story: "[Partner1] forgets to complete an important errand they promised earlier in the week. [Partner2] feels irritated and slightly hurt because they were relying on it. However, instead of attacking [Partner1]'s personality, they calmly explain, 'I felt stressed when this didn’t happen because I was counting on you.' [Partner1] listens without becoming defensive, acknowledges the mistake, apologizes sincerely, and asks how they can repair the situation. They work together to fix the problem and feel closer because they handled conflict respectfully.",
            titleHinglish: "Galatfehmi",
            storyHinglish: "[Partner1] ek important kaam bhool jaate hain jo unhone pehle promise kiya tha. [Partner2] thoda irritate aur hurt feel karte hain kyunki wo us kaam par depend kar rahe the. Par [Partner2] character attack nahi karte, balki shaanti se kehte hain, 'Mujhe stress feel hua jab ye kaam nahi hua, kyunki main tum par depend kar raha/rahi tha/thi.' [Partner1] bina defensive hue sunte hain, apni galti accept karte hain aur sincerely sorry bolte hain. Dono milkar problem solve karte hain aur emotionally aur close feel karte hain."
        },
        {
            title: "The Bad Day",
            story: "[Partner1] returns home visibly exhausted after a difficult day filled with pressure and criticism at work. They become quiet and withdrawn. [Partner2] notices the change but doesn't assume rejection or panic. Instead, they gently ask, 'Do you want space or comfort right now?' [Partner1] asks for some quiet time. [Partner2] respects this without feeling unwanted. Later in the evening, [Partner1] naturally opens up, and they reconnect emotionally during dinner.",
            titleHinglish: "Kharab Din",
            storyHinglish: "[Partner1] ek stressful aur exhausting din ke baad ghar aate hain. Wo zyada baat nahi karte aur chup ho jaate hain. [Partner2] is change ko notice karte hain par panic nahi karte. Wo pyaar se poochte hain, 'Tumhe abhi space chahiye ya comfort?' [Partner1] thoda quiet time maangte hain. [Partner2] ise respect karte hain bina reject feel kiye. Baad mein [Partner1] khud open up karte hain aur dono dinner ke time emotionally reconnect karte hain."
        },
        {
            title: "The Disagreement",
            story: "The couple disagrees about where to spend their holidays. Both partners feel strongly about their preferences because of family traditions. Instead of competing to 'win', they express why their choice matters emotionally. They brainstorm options and create a plan to alternate holiday locations every year. Both partners feel respected and emotionally validated.",
            titleHinglish: "Holiday Par Asahmati",
            storyHinglish: "Dono partners holidays kahan spend karein is par disagree karte hain. Dono ki strong emotional reasons hoti hain family traditions ki wajah se. Jeetne ki koshish karne ke bajaye, wo apni feelings explain karte hain. Baad mein wo solution nikaalte hain ki har saal alternate location choose karenge. Dono ko respect aur validation feel hoti hai."
        },
        {
            title: "Financial Styles",
            story: "[Partner1] enjoys spending money on experiences and gifts, while [Partner2] feels safe saving money for future security. This difference initially creates tension. Instead of shaming each other, they discuss their emotional relationship with money. They create a balanced budget including savings goals and guilt-free spending allowances, respecting each other's psychological needs.",
            titleHinglish: "Paise Sambhalne Ka Style",
            storyHinglish: "[Partner1] experiences aur gifts par paise kharch karna pasand karte hain, jabki [Partner2] future security ke liye paise bachana safe feel karte hain. Shuru mein isse tension hoti hai. Par dono ek-dusre ko blame nahi karte. Wo baithkar discuss karte hain ki paisa unke liye emotionally kya represent karta hai. Baad mein balanced budget banate hain jisme saving bhi hoti hai aur guilt-free spending bhi."
        },
        {
            title: "Intimacy Mismatch",
            story: "One evening, [Partner1] desires physical intimacy, but [Partner2] feels physically and mentally exhausted after a long week. [Partner2] communicates openly, 'I love you and want closeness, but I don’t have energy for sex tonight. Can we just cuddle and talk?' [Partner1] accepts this without taking rejection personally, understanding that intimacy has many forms.",
            titleHinglish: "Intimacy Ka Difference",
            storyHinglish: "Ek raat [Partner1] physical intimacy chahte hain, par [Partner2] kaafi tired hote hain. [Partner2] honestly kehte hain, 'Main tumse pyaar karta/karti hoon aur close feel karna chahta/chahti hoon, par aaj sex ke liye energy nahi hai. Kya hum cuddle kar sakte hain?' [Partner1] ise rejection nahi samajhte aur samajhte hain ki intimacy sirf physical nahi hoti."
        },
        {
            title: "Career Shift",
            story: "[Partner1] wants to leave a stable job to pursue a dream career that feels meaningful but risky. [Partner2] feels anxious about financial security. Instead of dismissing the dream, they discuss fears openly. Together, they evaluate finances, create a backup plan, and support each other emotionally while facing uncertainty as a team.",
            titleHinglish: "Career Change",
            storyHinglish: "[Partner1] ek stable job chhodkar apna passion pursue karna chahte hain, jo risky lagta hai. [Partner2] financial stability ko lekar anxious feel karte hain. Dream ko reject karne ke bajaye, wo apne fears openly discuss karte hain. Dono milkar financial planning aur backup plan banate hain aur ek team ki tarah risk face karte hain."
        },
        {
            title: "A Moment of Jealousy",
            story: "During a social gathering, [Partner1] notices [Partner2] laughing comfortably with someone attractive. They experience a brief wave of insecurity. Instead of suppressing or accusing, they later share honestly, 'I felt insecure for a moment today.' [Partner2] reassures them warmly and expresses appreciation, strengthening trust.",
            titleHinglish: "Jalan Ka Moment",
            storyHinglish: "Ek social gathering mein [Partner1] dekhte hain ki [Partner2] kisi attractive insaan ke saath comfortable hoke has rahe hain. [Partner1] thoda insecure feel karte hain. Accuse karne ke bajaye, wo baad mein honestly share karte hain, 'Aaj mujhe thoda insecure feel hua.' [Partner2] pyaar se reassurance dete hain aur appreciation express karte hain."
        },
        {
            title: "Aging & Caretaking",
            story: "When a parent becomes seriously ill, emotional and logistical stress increases dramatically. The couple supports each other by taking turns carrying responsibilities and emotional burdens. They openly express vulnerability and remind each other that the problem is external, not between them.",
            titleHinglish: "Bimari Aur Responsibility",
            storyHinglish: "Jab kisi parent ki health serious ho jati hai, stress aur responsibility badh jati hai. Dono partners ek-dusre ka support karte hain aur responsibilities share karte hain. Wo openly vulnerability express karte hain aur yaad dilate hain ki problem unke beech nahi, balki external situation hai."
        },
        {
            title: "Personal Growth",
            story: "[Partner1] develops a new hobby requiring significant time and attention. [Partner2] initially feels lonely but chooses to support their growth. [Partner1] ensures they create intentional quality time together. Both partners grow individually while maintaining emotional connection.",
            titleHinglish: "Personal Growth",
            storyHinglish: "[Partner1] ek naya hobby start karte hain jo kaafi time leta hai. [Partner2] shuru mein thoda lonely feel karte hain, par support karte hain. [Partner1] consciously quality time plan karte hain. Dono individually grow karte hain bina emotionally door hue."
        }
    ],
    'secure-anxious': [
        {
            title: "The Unanswered Text",
            story: "[Partner2] sends a loving message during the day but receives no reply for several hours. Their mind slowly fills with worry, imagining something is wrong or that they upset their partner. When [Partner1] finally replies explaining they were overwhelmed with work, they also add, 'I should have sent a quick message. I didn’t forget you.' Over time, [Partner1] learns that small reassurance messages help [Partner2] feel emotionally safe and grounded.",
            titleHinglish: "Message Ka Reply Na Aana",
            storyHinglish: "[Partner2] din mein ek pyaara message bhejte hain par kai ghanto tak reply nahi aata. Dheere dheere unka dimaag worry aur overthinking se bhar jata hai. Jab [Partner1] reply karte hain aur batate hain ki wo kaam mein busy the, wo yeh bhi kehte hain, 'Mujhe ek chhota message bhejna chahiye tha, maine tumhe ignore nahi kiya.' Dheere dheere [Partner1] seekh jaate hain ki chhoti reassurance anxious partner ko safe feel karati hai."
        },
        {
            title: "The Need for Reassurance",
            story: "[Partner2] occasionally feels insecure and asks if the relationship is still strong. Instead of dismissing the fear, [Partner1] pauses and responds with eye contact and warmth. They remind [Partner2] of specific things they love and appreciate. This consistent reassurance helps reduce anxiety and builds trust over time.",
            titleHinglish: "Tasalli Ki Zaroorat",
            storyHinglish: "[Partner2] kabhi kabhi insecure feel karte hain aur poochte hain ki relationship ab bhi strong hai ya nahi. [Partner1] is fear ko ignore nahi karte. Wo calmly aankhon mein dekh kar pyaar aur appreciation express karte hain. Yeh repeated reassurance dheere dheere anxiety kam kar deta hai aur trust strong karta hai."
        },
        {
            title: "The Space Issue",
            story: "[Partner1] plans an evening out with friends. [Partner2] suddenly feels abandoned and anxious. [Partner1] responds by reassuring emotional connection without canceling independence. They say, 'I’ll enjoy my time, but I’m excited to talk to you later.' This balance teaches [Partner2] that space does not equal rejection.",
            titleHinglish: "Space Ka Issue",
            storyHinglish: "[Partner1] friends ke saath bahar jaane ka plan banate hain. [Partner2] ko achanak akelapan aur anxiety feel hoti hai. [Partner1] independence cancel nahi karte, par emotional reassurance dete hain: 'Main enjoy karunga/karungi, par baad mein tumse baat karne ka wait rahega.' Yeh balance [Partner2] ko sikhata hai ki space rejection nahi hota."
        },
        {
            title: "The Work Trip",
            story: "[Partner1] travels for work frequently, which triggers abandonment fear in [Partner2]. Instead of ignoring this, they create a ritual of nightly calls or voice notes. This predictability becomes an emotional anchor, helping [Partner2] stay calm and connected despite physical distance.",
            titleHinglish: "Work Trip Ka Stress",
            storyHinglish: "[Partner1] kaam ke liye travel karte hain, jo [Partner2] ke abandonment fear ko trigger karta hai. Isse ignore karne ke bajaye, wo daily call ya voice note ka routine bana lete hain. Yeh predictable connection [Partner2] ko emotional stability deta hai."
        },
        {
            title: "The Silent Treatment",
            story: "[Partner2] feels hurt during an argument and becomes quiet as a way to express pain. [Partner1] does not react with anger or withdrawal. Instead, they say gently, 'I can see you’re hurting. I’m here when you’re ready to talk.' This calm response allows [Partner2] to feel emotionally safe enough to reopen communication.",
            titleHinglish: "Chup Ho Jana",
            storyHinglish: "[Partner2] argument ke baad hurt feel karke chup ho jaate hain. [Partner1] gussa ya distance nahi create karte. Wo shaanti se kehte hain, 'Mujhe pata hai tum hurt ho. Jab tum ready ho baat karne ke liye, main yahin hoon.' Yeh response anxious partner ko emotionally safe feel karata hai."
        },
        {
            title: "Intimacy Speed",
            story: "[Partner2] wants to accelerate the relationship quickly because stability feels safer. [Partner1] prefers a slower pace to build emotional foundation. They explain their intention lovingly: 'I’m going slow because I want this to last.' Over time, [Partner2] learns that patience can represent seriousness, not lack of interest.",
            titleHinglish: "Relationship Ki Speed",
            storyHinglish: "[Partner2] relationship jaldi strong banana chahte hain kyunki unhe stability safe lagti hai. [Partner1] slow pace choose karte hain taaki strong emotional base ban sake. Wo pyaar se samjhate hain, 'Main slow isliye hoon kyunki main chahta/chahti hoon ki yeh long-term chale.' Dheere dheere [Partner2] patience ko seriousness samajhne lagte hain."
        },
        {
            title: "Vulnerability Hangover",
            story: "[Partner2] shares deeply personal feelings early in the relationship and later feels embarrassed or exposed. [Partner1] responds with acceptance and shares something personal as well. This mutual vulnerability removes shame and strengthens emotional intimacy.",
            titleHinglish: "Zyada Khul Jaane Ka Darr",
            storyHinglish: "[Partner2] relationship mein jaldi apni personal baatein share kar dete hain aur baad mein sharm feel karte hain. [Partner1] judge nahi karte, balki acceptance dikhate hain aur khud bhi vulnerability share karte hain. Yeh mutual openness shame ko dissolve karta hai."
        },
        {
            title: "Social Overwhelm",
            story: "At a social gathering, [Partner2] feels awkward and overwhelmed. They stay physically close to [Partner1]. Instead of pushing independence aggressively, [Partner1] offers steady presence until [Partner2] feels comfortable enough to socialize gradually.",
            titleHinglish: "Social Situation Anxiety",
            storyHinglish: "Ek party ya gathering mein [Partner2] awkward aur anxious feel karte hain. Wo [Partner1] ke paas rehna chahte hain. [Partner1] unhe force nahi karte mingle karne ke liye. Wo steady support dete hain jab tak [Partner2] naturally comfortable feel na karein."
        },
        {
            title: "Conflict Volume",
            story: "[Partner2] raises their voice during conflict due to fear of losing connection. [Partner1] calmly sets a boundary: 'I want to understand you, but I can’t when voices get loud. Let’s pause and talk calmly.' This protects both partners while maintaining emotional connection.",
            titleHinglish: "Jhagde Ki Awaaz",
            storyHinglish: "[Partner2] conflict mein darr ki wajah se awaaz oonchi kar dete hain. [Partner1] calmly boundary set karte hain: 'Main tumhe samajhna chahta/chahti hoon, par jab awaaz oonchi hoti hai toh mushkil hota hai. Chalo thoda pause lete hain.' Yeh dono partners ko emotionally safe rakhta hai."
        },
        {
            title: "The Apology",
            story: "[Partner2] makes a small mistake and apologizes repeatedly, fearing rejection. [Partner1] reassures them that mistakes are normal in healthy relationships. They respond warmly, emphasizing security rather than punishment. This helps [Partner2] slowly unlearn fear-based attachment patterns.",
            titleHinglish: "Maafi Ka Darr",
            storyHinglish: "[Partner2] ek chhoti galti ke baad baar baar maafi mangte hain kyunki unhe chhod diye jaane ka darr hota hai. [Partner1] reassurance dete hain ki healthy relationship mein mistakes normal hoti hain. Wo pyaar se respond karte hain, jisse [Partner2] dheere dheere fear-based patterns chhodna seekhte hain."
        }
    ],
    'secure-avoidant': [
        {
            title: "The Talk",
            story: "[Partner1] wants to discuss emotional concerns. [Partner2] immediately feels overwhelmed and defensive. Instead of forcing conversation, [Partner1] suggests discussing later after both feel relaxed. This reduces pressure and allows [Partner2] to participate without feeling trapped.",
            titleHinglish: "Serious Baat-Cheet",
            storyHinglish: "[Partner1] emotional concern discuss karna chahte hain. [Partner2] overwhelm feel karte hain. [Partner1] conversation force nahi karte, balki kehte hain ki baad mein shaanti se baat karenge. Yeh pressure kam karta hai aur [Partner2] ko comfortable banata hai."
        },
        {
            title: "The Intimacy Hangover",
            story: "After a deeply emotional or intimate weekend, [Partner2] suddenly becomes distant to regain emotional balance. [Partner1] notices but focuses on personal routines instead of chasing. This respectful distance allows [Partner2] to return feeling safe rather than pressured.",
            titleHinglish: "Intimacy Ke Baad Distance",
            storyHinglish: "Ek emotional ya romantic weekend ke baad [Partner2] suddenly distance bana lete hain taaki emotional balance wapas aa sake. [Partner1] ise personal rejection nahi samajhte aur apni routine follow karte hain. Yeh respectful distance [Partner2] ko naturally wapas aane deta hai."
        },
        {
            title: "Vulnerability",
            story: "[Partner1] shares a personal fear hoping for emotional support. [Partner2] feels uncomfortable and attempts to joke or deflect. [Partner1] gently explains they only need listening, not fixing. This teaches [Partner2] that emotional presence is safe and valuable.",
            titleHinglish: "Vulnerability Dikhana",
            storyHinglish: "[Partner1] apna ek personal darr share karte hain. [Partner2] uncomfortable feel karke mazaak karne lagte hain. [Partner1] pyaar se samjhate hain ki unhe sirf sunne ki zaroorat hai. Yeh [Partner2] ko sikhata hai ki emotions dangerous nahi hote."
        },
        {
            title: "The Weekend Away",
            story: "[Partner1] plans a romantic getaway. [Partner2] feels trapped by continuous closeness. [Partner1] reassures independence by suggesting flexible plans and optional alone time. Knowing they have freedom makes [Partner2] more willing to stay emotionally present.",
            titleHinglish: "Weekend Trip Pressure",
            storyHinglish: "[Partner1] romantic trip plan karte hain. [Partner2] continuous closeness se trapped feel karte hain. [Partner1] flexibility aur optional alone time suggest karte hain. Freedom ka feeling [Partner2] ko emotionally present rehne mein help karta hai."
        },
        {
            title: "Commitment Fears",
            story: "[Partner2] hesitates to take major relationship steps like moving in together. [Partner1] avoids pressure and instead explores emotional fears behind commitment. Understanding fear of losing independence allows deeper connection and realistic planning.",
            titleHinglish: "Commitment Ka Darr",
            storyHinglish: "[Partner2] saath rehne jaise bade steps lene mein hesitate karte hain. [Partner1] pressure nahi banate, balki emotional fears samajhne ki koshish karte hain. Independence kho dene ka darr samajhne se deeper connection banne lagta hai."
        },



        {
            title: "Emotional Support",
            story: "[Partner1] feels deeply sad after a personal disappointment and looks for comfort. [Partner2] freezes because they don’t know how to emotionally respond and worry they might say the wrong thing. [Partner1] gently reassures them, 'You don’t need to fix anything. Just sit with me.' This teaches [Partner2] that emotional presence matters more than solutions.",
            titleHinglish: "Emotional Support Seekhna",
            storyHinglish: "[Partner1] ek personal disappointment ke baad udaas feel karte hain aur comfort chahte hain. [Partner2] freeze ho jaate hain kyunki unhe samajh nahi aata kya bolna chahiye. [Partner1] pyaar se kehte hain, 'Tumhe kuch fix karne ki zaroorat nahi hai. Bas mere saath baitho.' Yeh [Partner2] ko sikhata hai ki emotional presence hi kaafi hoti hai."
        },
        {
            title: "Nitpicking",
            story: "[Partner2] starts criticizing small habits of [Partner1], like chewing loudly or small daily routines. This is often an unconscious attempt to create emotional distance. Instead of reacting defensively, [Partner1] calmly asks, 'Are you upset about this, or do you need some personal space?' This self-awareness helps [Partner2] recognize their emotional needs.",
            titleHinglish: "Choti Choti Complaints",
            storyHinglish: "[Partner2] [Partner1] ki choti habits par complain karna shuru kar dete hain, jaise chewing ya routine habits. Yeh aksar emotional distance create karne ki unconscious koshish hoti hai. [Partner1] defensive hone ke bajaye calmly poochte hain, 'Kya tum sach mein is baat se upset ho, ya tumhe thoda personal space chahiye?' Yeh [Partner2] ko apni emotions samajhne mein help karta hai."
        },
        {
            title: "Solo Travel",
            story: "[Partner2] expresses desire to travel alone for self-reflection. Instead of feeling rejected, [Partner1] supports independence and encourages them to enjoy the trip. Because [Partner2] does not feel guilt or pressure, they naturally reconnect with warmth and appreciation after returning.",
            titleHinglish: "Akele Travel Karna",
            storyHinglish: "[Partner2] self-reflection ke liye solo travel karna chahte hain. [Partner1] ise rejection nahi samajhte, balki support karte hain. Jab guilt ya pressure nahi hota, [Partner2] trip ke baad aur zyada appreciation aur connection feel karte hain."
        },
        {
            title: "The Ex Factor",
            story: "[Partner2] casually mentions an ex while sharing a past memory. [Partner1] listens without reacting with jealousy or insecurity. Their emotional confidence removes tension and allows honest conversation about past relationships without threat.",
            titleHinglish: "Ex Ka Zikr",
            storyHinglish: "[Partner2] apni past memory share karte hue ex ka mention kar dete hain. [Partner1] jealousy ya insecurity se react nahi karte. Unka emotional confidence honest conversation ko possible banata hai."
        },
        {
            title: "Opening Up",
            story: "[Partner2] shares a very small emotional detail, which feels huge to them internally. [Partner1] responds warmly, validates the feeling, and expresses gratitude for the trust. This positive reinforcement slowly retrains [Partner2]'s emotional comfort zone.",
            titleHinglish: "Dil Khulna",
            storyHinglish: "[Partner2] ek chhoti emotional baat share karte hain jo unke liye internally bahut badi hoti hai. [Partner1] warm response dete hain aur trust ke liye appreciation dikhate hain. Yeh positive response [Partner2] ko emotional sharing mein comfortable banata hai."
        }
    ],
    'secure-disorganized': [
        {
            title: "The Push-Pull",
            story: "[Partner2] reacts strongly during a disagreement, expressing anger and then suddenly withdrawing out of shame. [Partner1] remains calm and grounded, clearly setting boundaries while staying emotionally available. Over time, this consistency teaches [Partner2] that conflict does not lead to abandonment.",
            titleHinglish: "Door Aur Paas Ka Cycle",
            storyHinglish: "[Partner2] disagreement mein strong react karte hain, pehle gussa aur phir guilt mein distance bana lete hain. [Partner1] calm rehte hain, boundary set karte hain aur emotionally available bhi rehte hain. Dheere dheere [Partner2] samajhne lagte hain ki jhagra ka matlab chhod dena nahi hota."
        },
        {
            title: "Testing the Bond",
            story: "[Partner2] unconsciously creates arguments before major relationship milestones to test whether [Partner1] will leave. [Partner1] responds calmly and reassures commitment. This challenges [Partner2]'s fear-based expectations and builds deeper trust.",
            titleHinglish: "Relationship Test Karna",
            storyHinglish: "[Partner2] important milestones se pehle jhagra create karte hain taaki check kar sakein ki [Partner1] chhodenge ya nahi. [Partner1] calmly commitment reassure karte hain. Yeh [Partner2] ke abandonment fears ko challenge karta hai."
        },
        {
            title: "Overwhelmed Shutdown",
            story: "[Partner2] becomes emotionally overwhelmed and shuts down completely during stress. [Partner1] sits nearby doing a calm activity without forcing conversation. This silent companionship reduces pressure and helps [Partner2] regulate emotions safely.",
            titleHinglish: "Emotional Overload",
            storyHinglish: "[Partner2] stress mein emotionally overwhelm hoke completely shutdown ho jaate hain. [Partner1] unke paas quietly baithte hain bina conversation force kiye. Yeh silent companionship [Partner2] ko emotional regulation mein help karta hai."
        },
        {
            title: "The Meltdown",
            story: "[Partner2] spirals into intense self-criticism and believes they are unlovable after making a mistake. [Partner1] gently reminds them of their strengths and continues offering emotional stability. This external reassurance helps rebuild self-worth gradually.",
            titleHinglish: "Self-Doubt Breakdown",
            storyHinglish: "[Partner2] galti ke baad self-hatred mein chale jaate hain aur khud ko unlovable feel karte hain. [Partner1] unhe pyaar se unki strengths yaad dilate hain aur emotional stability provide karte hain. Yeh reassurance dheere dheere self-worth rebuild karta hai."
        },
        {
            title: "Trust Issues",
            story: "[Partner2] accuses [Partner1] of dishonesty during moments of insecurity. Instead of reacting with anger, [Partner1] calmly offers transparency and reassurance. This helps calm paranoid fears and strengthens trust through consistent honesty.",
            titleHinglish: "Trust Problem",
            storyHinglish: "[Partner2] insecurity mein [Partner1] par jhooth bolne ka doubt karte hain. [Partner1] gussa nahi karte aur calmly transparency dikhate hain. Yeh repeated honesty trust rebuild karti hai."
        },
        {
            title: "Dissociation During Conflict",
            story: "[Partner2] mentally disconnects during arguments and appears emotionally absent. [Partner1] notices signs like blank staring or lack of response and gently helps them ground by encouraging slow breathing or physical grounding techniques. They wait patiently until [Partner2] feels emotionally present again before continuing the conversation.",
            titleHinglish: "Jhagde Mein Disconnect Ho Jana",
            storyHinglish: "[Partner2] argument ke dauran mentally disconnect ho jaate hain aur emotionally absent lagte hain. [Partner1] is sign ko notice karte hain aur unhe slow breathing ya grounding technique se help karte hain. Wo patiently wait karte hain jab tak [Partner2] emotionally present feel na kare."
        },
        {
            title: "Sabotaging Good Moments",
            story: "[Partner2] unconsciously creates arguments during happy or peaceful moments because safety feels unfamiliar. [Partner1] recognizes this pattern and gently reassures them that happiness is allowed and safe. Over time, positive experiences become less triggering for [Partner2].",
            titleHinglish: "Khushi Ko Sabotage Karna",
            storyHinglish: "[Partner2] kabhi kabhi happy moments mein jhagra create kar dete hain kyunki unhe safety unfamiliar lagti hai. [Partner1] is pattern ko samajh kar gently reassure karte hain ki khush rehna safe hai. Dheere dheere [Partner2] positive moments ko accept karna seekhte hain."
        },
        {
            title: "Intimacy Triggers",
            story: "[Partner2] becomes uncomfortable with physical or emotional closeness due to past trauma triggers. [Partner1] practices consent-based intimacy, frequently checking comfort levels and allowing full control. This helps rebuild trust and safety in closeness.",
            titleHinglish: "Intimacy Ka Trigger",
            storyHinglish: "[Partner2] physical ya emotional closeness se uncomfortable ho jaate hain past trauma ki wajah se. [Partner1] har step par consent aur comfort check karte hain. Yeh trust aur safety gradually rebuild karta hai."
        },
        {
            title: "The Corrective Experience",
            story: "[Partner2] expects punishment or rejection after making mistakes because of past relationship experiences. Instead, [Partner1] offers forgiveness and understanding. This creates a new emotional memory that love can be stable and unconditional.",
            titleHinglish: "Naya Emotional Experience",
            storyHinglish: "[Partner2] galti ke baad punishment ya rejection expect karte hain. Par [Partner1] forgiveness aur understanding dikhate hain. Yeh naya emotional experience [Partner2] ko sikhata hai ki pyaar stable aur unconditional ho sakta hai."
        },
        {
            title: "Boring Consistency",
            story: "[Partner1] consistently keeps promises, communicates clearly, and shows predictable behaviour. Initially, [Partner2] finds this stability suspicious or boring because they are used to emotional chaos. Gradually, this steady reliability becomes deeply comforting and healing.",
            titleHinglish: "Stable Aur Predictable Pyaar",
            storyHinglish: "[Partner1] hamesha promises follow karte hain aur predictable behaviour dikhate hain. Shuru mein [Partner2] ise boring ya suspicious feel karte hain kyunki wo emotional chaos ke aadat mein hote hain. Dheere dheere yeh stability healing ban jati hai."
        }
    ],


    // === ANXIOUS PAIRINGS ===

    'anxious-anxious': [
        {
            title: "The Emotional Spiral",
            story: "Both partners become insecure simultaneously during minor misunderstandings. One asks for reassurance, and the other feels pressure and self-doubt, causing both to spiral emotionally. Healing begins when they learn emotional self-regulation before supporting each other.",
            titleHinglish: "Emotion Ka Spiral",
            storyHinglish: "Chhoti misunderstanding mein dono partners ek saath insecure ho jaate hain. Ek reassurance maangta hai aur doosra pressure feel karta hai, jisse dono emotional spiral mein chale jaate hain. Healing tab start hoti hai jab dono pehle khud ko regulate karna seekhte hain."
        },
        {
            title: "Constant Contact Dependency",
            story: "The couple communicates continuously throughout the day. This creates intense closeness but also emotional exhaustion. When one partner delays responding, panic and overthinking begin. They slowly practice healthy independence and learn that connection survives small distances.",
            titleHinglish: "Har Waqt Contact Ki Habit",
            storyHinglish: "Dono partners din bhar contact mein rehte hain. Yeh closeness create karta hai par emotional exhaustion bhi laata hai. Jab ek reply delay karta hai toh panic start ho jata hai. Dheere dheere wo healthy independence practice karte hain."
        },
        {
            title: "Over-Giving and Emotional Saving",
            story: "Both partners try to fix each other's sadness immediately, believing it is their responsibility. This leads to burnout and emotional pressure. Growth begins when they learn that loving someone does not mean eliminating every uncomfortable feeling.",
            titleHinglish: "Zyada Emotional Responsibility Lena",
            storyHinglish: "Dono partners ek-dusre ki sadness fix karne ki responsibility le lete hain. Yeh burnout create karta hai. Growth tab hoti hai jab wo samajhte hain ki pyaar ka matlab har emotion ko fix karna nahi hota."
        },
        {
            title: "Keeping Score",
            story: "Both partners track acts of affection and feel hurt when balance seems unequal. They begin learning generosity without expectation, realizing emotional giving should come from love rather than obligation.",
            titleHinglish: "Score Rakhna",
            storyHinglish: "Dono partners affection ka score rakhte hain aur jab balance unequal lagta hai toh hurt feel karte hain. Dheere dheere wo expectation ke bina dena seekhte hain."
        },
        {
            title: "Jealousy Feedback Loop",
            story: "When one partner becomes jealous, the other mirrors the insecurity. This creates repeated emotional conflict. They eventually realize both share the same fear of losing love, and expressing vulnerability reduces jealousy intensity.",
            titleHinglish: "Jalan Ka Loop",
            storyHinglish: "Ek partner jealous hota hai toh doosra bhi insecure ho jata hai. Yeh repeated conflict create karta hai. Jab dono apna same fear accept karte hain, jealousy kam hone lagti hai."
        },
        {
            title: "Decision Anxiety",
            story: "Both partners avoid making decisions to prevent disappointing each other. This creates frustration and delays. They practice expressing personal preferences confidently and learn disagreement does not damage love.",
            titleHinglish: "Decision Lene Ka Darr",
            storyHinglish: "Dono partners decisions avoid karte hain taaki ek-dusre ko disappoint na karein. Yeh frustration create karta hai. Dheere dheere wo apni preferences confidently express karna seekhte hain."
        },
        {
            title: "Emotional Burnout",
            story: "Spending excessive time together leads to emotional fatigue, but both fear requesting personal space. Learning to take individual breaks strengthens emotional energy and prevents resentment.",
            titleHinglish: "Relationship Burnout",
            storyHinglish: "Har waqt saath rehne se emotional fatigue ho jata hai, par dono space maangne se darte hain. Individual breaks lena relationship ko healthy banata hai."
        },
        {
            title: "Mind Reading Expectations",
            story: "Both expect their partner to automatically understand emotional needs without communication. Misunderstandings occur frequently until they learn to clearly express feelings and requests.",
            titleHinglish: "Mind Reading Expectation",
            storyHinglish: "Dono expect karte hain ki partner bina bole feelings samajh le. Isse misunderstandings hoti hain. Clear communication seekhne se problems kam hoti hain."
        },
        {
            title: "Crisis Bonding",
            story: "The relationship feels most connected during stressful or dramatic situations. Calm and peaceful moments feel unfamiliar. Learning to enjoy stability becomes an important growth milestone.",
            titleHinglish: "Drama Mein Bond Karna",
            storyHinglish: "Relationship drama ya stress mein strongest feel hota hai. Peaceful moments unfamiliar lagte hain. Stability enjoy karna unke liye growth ban jata hai."
        },
        {
            title: "Separation Anxiety",
            story: "During travel or temporary distance, they increase calls excessively out of fear. Gradually reducing frequency while improving quality of conversations strengthens trust and independence.",
            titleHinglish: "Doori Ka Darr",
            storyHinglish: "Travel ya distance mein wo bahut zyada calls karte hain fear ki wajah se. Dheere dheere frequency kam aur conversation quality better karne se trust build hota hai."
        }
    ],
    'anxious-avoidant': [
        {
            title: "The Chase Cycle",
            story: "[Partner1] senses emotional distance and tries to move closer through texting, calls, or reassurance seeking. [Partner2] feels overwhelmed by intensity and withdraws further. The cycle repeats until [Partner1] learns to slow down pursuit, allowing [Partner2] space to reconnect voluntarily.",
            titleHinglish: "Chase Aur Distance Cycle",
            storyHinglish: "[Partner1] emotional distance feel karke zyada texting ya reassurance maangne lagte hain. [Partner2] intensity se overwhelm hoke aur distance bana lete hain. Yeh cycle tab break hota hai jab [Partner1] pursuit slow karna seekhte hain aur [Partner2] ko voluntarily reconnect karne ka space milta hai."
        },
        {
            title: "The Homecoming Disconnect",
            story: "[Partner2] returns home exhausted from work and emotionally drained. [Partner1] immediately seeks conversation and emotional connection. [Partner2] responds with short answers, which makes [Partner1] feel rejected. Improvement begins when [Partner2] requests decompression time before reconnecting emotionally.",
            titleHinglish: "Ghar Aane Ka Disconnect",
            storyHinglish: "[Partner2] kaam se thak kar ghar aate hain. [Partner1] turant emotional conversation chahte hain. [Partner2] short responses dete hain jisse [Partner1] reject feel karte hain. Jab [Partner2] pehle thoda decompress time maangte hain, tab connection better hone lagta hai."
        },
        {
            title: "Vulnerability Hangover",
            story: "After emotional closeness or deep sharing, [Partner2] feels exposed and distances themselves the next day. [Partner1] interprets this as rejection. Understanding this pattern helps [Partner1] remain patient and avoid emotional escalation.",
            titleHinglish: "Vulnerability Ke Baad Distance",
            storyHinglish: "Deep emotional sharing ke baad [Partner2] next day distance bana lete hain. [Partner1] ise rejection samajh lete hain. Jab wo is pattern ko samajhne lagte hain, tab patience aur stability develop hoti hai."
        },
        {
            title: "Protest Behaviour",
            story: "[Partner1] tries to trigger jealousy or emotional reaction to gain reassurance. [Partner2] responds by emotionally shutting down, feeling manipulated. Growth occurs when [Partner1] learns to express loneliness honestly instead of acting indirectly.",
            titleHinglish: "Indirect Reaction Lena",
            storyHinglish: "[Partner1] jealousy create karke reaction lena chahte hain. [Partner2] ise manipulation samajhkar emotionally shutdown ho jaate hain. Jab [Partner1] direct loneliness express karna seekhte hain, tab conflict kam hota hai."
        },
        {
            title: "The Phantom Ex",
            story: "[Partner2] compares current relationship with past partners or idealizes previous relationships to maintain emotional distance. [Partner1] feels insecure competing with memories. Healing begins when both focus on present relationship realities instead of imagined comparisons.",
            titleHinglish: "Ex Ki Comparison",
            storyHinglish: "[Partner2] past partner ko idealize karte hain ya comparison karte hain. [Partner1] insecure feel karte hain. Jab dono present relationship par focus karte hain, tab emotional safety improve hoti hai."
        },
        {
            title: "Sex vs Emotional Intimacy",
            story: "The couple often reconnects physically but avoids deeper emotional conversations. [Partner1] may feel emotionally unseen, while [Partner2] feels pressured by emotional intensity. Practicing emotional conversations without physical intimacy strengthens long-term connection.",
            titleHinglish: "Physical Aur Emotional Intimacy Ka Difference",
            storyHinglish: "Couple physical closeness use karta hai reconnect karne ke liye par emotional conversations avoid karta hai. [Partner1] emotionally unseen feel karta hai aur [Partner2] emotional pressure feel karta hai. Emotional talks practice karne se relationship stable hota hai."
        },
        {
            title: "The Perfect Date Pattern",
            story: "[Partner2] creates intense romantic moments followed by sudden withdrawal. [Partner1] chases emotional highs. They grow when they shift focus from dramatic intensity toward consistent, stable connection.",
            titleHinglish: "Perfect Date Ka Pattern",
            storyHinglish: "[Partner2] ekdum intense romantic moments create karte hain aur phir suddenly distance bana lete hain. [Partner1] emotional highs chase karta hai. Stable aur consistent connection seekhna healing laata hai."
        },
        {
            title: "Criticism vs Defensiveness",
            story: "[Partner1] expresses hurt through criticism. [Partner2] responds defensively and withdraws emotionally. When [Partner1] shifts toward expressing feelings using vulnerability instead of blame, defensive reactions reduce significantly.",
            titleHinglish: "Criticism Aur Defensive Reaction",
            storyHinglish: "[Partner1] hurt ko criticism ke through express karta hai. [Partner2] defensive ho jaata hai. Jab [Partner1] blame ke bajaye feelings express karta hai, tab conflict kam hota hai."
        },
        {
            title: "The Ultimatum Pattern",
            story: "[Partner1] threatens breakup during emotional panic. [Partner2] distances further or challenges the threat. Trust erodes. Growth occurs when [Partner1] sets genuine boundaries instead of emotional threats.",
            titleHinglish: "Breakup Threat Pattern",
            storyHinglish: "[Partner1] panic mein breakup threaten karta hai. [Partner2] aur distance bana leta hai. Trust weak ho jata hai. Real boundaries set karna relationship ko healthy banata hai."
        },
        {
            title: "Small Healing Victory",
            story: "[Partner2] chooses to remain physically present during conflict rather than leaving the room. [Partner1] responds by lowering emotional intensity. This small moment becomes a powerful breakthrough in trust building.",
            titleHinglish: "Healing Ka Chhota Moment",
            storyHinglish: "[Partner2] conflict mein room chhodne ke bajaye present rehta hai. [Partner1] bhi emotional intensity kam karta hai. Yeh chhota step trust build karne mein powerful ban jata hai."
        }
    ],
    'anxious-disorganized': [
        {
            title: "The Emotional Minefield",
            story: "[Partner1] seeks closeness for comfort, but [Partner2] experiences closeness as emotional threat and lashes out unpredictably. [Partner1] tries harder to soothe, unintentionally overwhelming [Partner2]. Healing begins when clear, calm boundaries are established.",
            titleHinglish: "Emotional Minefield",
            storyHinglish: "[Partner1] comfort ke liye closeness chahte hain, par [Partner2] closeness ko threat samajhkar unpredictable react karte hain. [Partner1] aur zyada soothe karne ki koshish karta hai. Clear boundaries relationship stabilize karti hain."
        },
        {
            title: "Hot and Cold Pattern",
            story: "[Partner2] shifts rapidly between warmth and emotional distance. [Partner1] feels confused and unstable. Growth begins when [Partner1] learns emotional fluctuations are often trauma responses rather than intentional rejection.",
            titleHinglish: "Hot Aur Cold Behaviour",
            storyHinglish: "[Partner2] kabhi warm aur kabhi distant behave karte hain. [Partner1] confused feel karta hai. Jab wo samajhne lagta hai ki yeh trauma response hai, tab emotional stability improve hoti hai."
        },
        {
            title: "The Rescue Mission",
            story: "[Partner2] experiences frequent emotional crises. [Partner1] tries to fix everything, neglecting their own emotional needs. Long-term healing occurs when [Partner1] supports growth without taking full responsibility for regulation.",
            titleHinglish: "Rescue Karne Ki Habit",
            storyHinglish: "[Partner2] emotional crisis mein rehta hai aur [Partner1] sab fix karne ki responsibility le leta hai. Apni needs ignore karna burnout create karta hai. Balanced support healing laata hai."
        },
        {
            title: "Adding Chaos",
            story: "[Partner1]'s anxiety adds nervous emotional energy to [Partner2]'s already unstable emotional state. Both spiral together. Progress happens when [Partner1] practices becoming a calm emotional anchor.",
            titleHinglish: "Double Emotional Chaos",
            storyHinglish: "[Partner1] ki anxiety [Partner2] ke unstable emotional state ko aur chaotic bana deti hai. Dono spiral karte hain. Calm emotional anchor banna healing laata hai."
        },
        {
            title: "Walking on Eggshells",
            story: "[Partner1] becomes hyper-aware of triggering [Partner2]'s emotional reactions. They suppress their own needs. Growth begins when they learn to express love while maintaining self-protection and emotional boundaries.",
            titleHinglish: "Eggshell Par Chalna",
            storyHinglish: "[Partner1] constantly trigger hone se bachne ki koshish karta hai aur apni needs suppress karta hai. Self-protection aur boundaries relationship ko healthier banati hain."
        },



        {
            title: "The Victim Triangle",
            story: "Both partners repeatedly shift between victim, rescuer, and aggressor roles during conflict. This creates emotional exhaustion and confusion. Healing begins when they recognize this dynamic and consciously choose collaborative partnership instead of role switching.",
            titleHinglish: "Victim-Rescuer Cycle",
            storyHinglish: "Conflict mein dono partners kabhi victim, kabhi rescuer aur kabhi aggressor ban jaate hain. Yeh emotional exhaustion create karta hai. Jab wo is pattern ko pehchan kar collaboration choose karte hain, tab healing start hoti hai."
        },
        {
            title: "Intimacy Overload",
            story: "[Partner1] pushes strongly for emotional closeness while [Partner2] feels overwhelmed and reacts aggressively or withdraws. Moving slowly and respecting emotional tolerance windows helps stabilize the relationship.",
            titleHinglish: "Intimacy Ka Overload",
            storyHinglish: "[Partner1] emotional closeness strongly push karta hai aur [Partner2] overwhelm hoke react karta hai ya distance bana leta hai. Slow pace aur emotional limits respect karna relationship stable banata hai."
        },
        {
            title: "Abandonment Cycles",
            story: "[Partner2] impulsively ends the relationship during emotional overload. [Partner1] begs for reconciliation. The cycle repeats until [Partner1] respects separation boundaries, which often reduces panic-driven breakups.",
            titleHinglish: "Breakup Aur Patchup Cycle",
            storyHinglish: "[Partner2] emotional overload mein impulsively breakup karta hai aur [Partner1] reconciliation ke liye plead karta hai. Jab [Partner1] boundaries respect karta hai, tab panic-driven breakup kam hone lagte hain."
        },
        {
            title: "Shared Trauma Bonding",
            story: "The couple bonds deeply over shared painful past experiences. While it creates strong connection, it can trap them in trauma-focused identity. Healing occurs when they build shared goals and future-focused connection.",
            titleHinglish: "Shared Trauma Bond",
            storyHinglish: "Dono past pain ke through deeply bond karte hain. Yeh strong connection banata hai par kabhi kabhi trauma identity mein phasa deta hai. Future goals build karna healing laata hai."
        },
        {
            title: "Seeking Therapy Support",
            story: "Due to intense emotional cycles, the couple seeks professional therapy guidance. Learning emotional regulation skills together strengthens communication and relationship safety.",
            titleHinglish: "Therapy Lena",
            storyHinglish: "Intense emotional patterns ke wajah se couple therapy leta hai. Emotional regulation skills seekhne se relationship safer aur stable hota hai."
        }
    ],


    // === AVOIDANT PAIRINGS ===

    'avoidant-avoidant': [
        {
            title: "The Roommate Dynamic",
            story: "Both partners live comfortably side by side, focusing on individual routines and responsibilities. Conflict is rare, but emotional depth is limited. Progress begins when one partner bravely expresses missing emotional connection.",
            titleHinglish: "Roommate Jaisa Relationship",
            storyHinglish: "Dono partners apni routine mein comfortable rehte hain aur conflict kam hota hai. Par emotional depth kam hoti hai. Jab ek partner emotional closeness express karta hai, tab connection grow karne lagta hai."
        },
        {
            title: "The Emotional Standoff",
            story: "During conflict, both partners withdraw to process emotions privately. Issues remain unresolved. Scheduling structured conversations helps them face problems directly without emotional overwhelm.",
            titleHinglish: "Silent Standoff",
            storyHinglish: "Conflict mein dono partners withdraw kar jaate hain aur issues unresolved reh jaate hain. Structured conversation schedule karna problem solving mein help karta hai."
        },
        {
            title: "Independence vs Neglect",
            story: "Both partners value independence strongly, which slowly turns into emotional neglect. Learning to ask for support strengthens both emotional connection and individual strength.",
            titleHinglish: "Independence Aur Emotional Neglect",
            storyHinglish: "Dono independence value karte hain par kabhi kabhi emotional neglect ho jata hai. Support maangna connection strong banata hai."
        },
        {
            title: "The Dry Emotional Phase",
            story: "Physical intimacy and emotional sharing both reduce because vulnerability feels uncomfortable. Scheduling intentional connection time helps rebuild closeness gradually.",
            titleHinglish: "Dry Phase",
            storyHinglish: "Physical aur emotional intimacy kam ho jati hai kyunki vulnerability uncomfortable lagti hai. Planned connection time closeness wapas laata hai."
        },
        {
            title: "Surface Level Communication",
            story: "Conversations remain limited to daily tasks and logistics. Asking deeper emotional questions gradually strengthens connection and emotional awareness.",
            titleHinglish: "Surface Level Baatein",
            storyHinglish: "Baatein sirf routine aur tasks tak limited rehti hain. Deeper emotional questions poochna connection strong karta hai."
        }
    ],
    'avoidant-disorganized': [
        {
            title: "False Emotional Calm",
            story: "[Partner1] keeps emotional distance to feel safe, while [Partner2] feels emotional emptiness and provokes arguments to create intensity. Understanding each other's safety patterns helps balance connection.",
            titleHinglish: "False Calm Pattern",
            storyHinglish: "[Partner1] distance maintain karta hai safety ke liye aur [Partner2] emotional emptiness feel karke conflict create karta hai. Ek dusre ke safety patterns samajhna balance laata hai."
        },
        {
            title: "Triggering Safety Needs",
            story: "[Partner1] requires emotional distance to regulate, while [Partner2] experiences distance as abandonment. Establishing predictable communication routines helps stabilize emotional reactions.",
            titleHinglish: "Safety Trigger Conflict",
            storyHinglish: "[Partner1] distance chahte hain aur [Partner2] use abandonment samajhta hai. Predictable communication routine stability laata hai."
        },
        {
            title: "Conflict Shutdown vs Explosion",
            story: "[Partner1] shuts down emotionally during arguments, while [Partner2] reacts explosively. Writing thoughts in messages or letters creates safer communication channels.",
            titleHinglish: "Shutdown Aur Explosion Pattern",
            storyHinglish: "[Partner1] shutdown karta hai aur [Partner2] explode karta hai. Writing communication safe expression provide karta hai."
        },
        {
            title: "The Emotional Test",
            story: "[Partner2] provokes emotional reaction to confirm care. [Partner1] withdraws further. Learning to verbalize overwhelm instead of silence reduces emotional damage.",
            titleHinglish: "Reaction Test Karna",
            storyHinglish: "[Partner2] reaction lene ke liye provoke karta hai aur [Partner1] aur distance bana leta hai. Overwhelm verbally express karna conflict kam karta hai."
        },
        {
            title: "Empathy Breakthrough",
            story: "Both partners slowly realize their behaviours come from fear and past pain rather than lack of love. This realization creates compassion and emotional healing.",
            titleHinglish: "Empathy Ka Breakthrough",
            storyHinglish: "Dono samajhne lagte hain ki unka behaviour fear aur pain se aata hai, pyaar ki kami se nahi. Yeh compassion healing laata hai."
        }
    ],


    // === DISORGANIZED PAIRINGS ===

    'disorganized-disorganized': [
        {
            title: "The Emotional Storm",
            story: "Minor disagreements quickly trigger intense fight-or-flight responses in both partners. They create a mutual safe word to immediately pause arguments and regulate emotions before continuing discussions.",
            titleHinglish: "Emotional Storm",
            storyHinglish: "Chhoti disagreement bhi intense emotional storm bana deti hai. Safe word use karna argument pause karne aur regulate karne mein help karta hai."
        },
        {
            title: "The Breakup-Reunion Loop",
            story: "The relationship repeatedly cycles between dramatic breakups and passionate reunions. Stability initially feels boring but becomes healing when both learn emotional regulation.",
            titleHinglish: "Breakup-Patchup Loop",
            storyHinglish: "Relationship repeatedly breakup aur patchup cycle mein rehta hai. Stability boring lagti hai par dheere dheere healing ban jati hai."
        },
        {
            title: "Trigger Stacking",
            story: "One partner's bad mood triggers fear in the other, which triggers anger back. They learn to take timed emotional breaks to prevent escalation.",
            titleHinglish: "Trigger Stack Hona",
            storyHinglish: "Ek partner ka mood doosre ka fear trigger karta hai aur phir anger escalate hota hai. Timed emotional breaks escalation rokta hai."
        },
        {
            title: "Mirror Trauma Effect",
            story: "Both partners see reflections of their own trauma in each other, causing frustration and self-rejection. Developing self-compassion helps build mutual compassion.",
            titleHinglish: "Mirror Trauma Effect",
            storyHinglish: "Dono ek dusre mein apni trauma reflection dekhte hain. Self-compassion develop karna mutual healing laata hai."
        },
        {
            title: "Choosing Healing Together",
            story: "When both partners commit to personal healing, they develop extraordinary empathy and emotional depth. Their shared journey becomes a powerful foundation for long-term stability.",
            titleHinglish: "Saath Mein Healing Choose Karna",
            storyHinglish: "Jab dono personal healing commit karte hain, wo extraordinary empathy develop karte hain. Unki shared healing journey relationship ka strong foundation ban jati hai."
        }
    ]

};





export const getStories = (key: string): ConflictStory[] => {
    if (conflictStories[key]) return conflictStories[key];

    const [p1, p2] = key.split('-');
    const reverseKey = `${p2}-${p1}`;

    if (conflictStories[reverseKey]) {
        return conflictStories[reverseKey];
    }

    return [];
};
