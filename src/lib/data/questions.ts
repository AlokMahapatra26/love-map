export interface Question {
    id: number;
    text: string;
    dimension: 'anxiety' | 'avoidance';
    reverseScored: boolean;
}

export const questions: Question[] = [
    // Anxiety Dimension (10 questions) - Fear of abandonment, need for reassurance
    {
        id: 1,
        text: "I worry about being abandoned by my partner",
        dimension: "anxiety",
        reverseScored: false,
    },
    {
        id: 2,
        text: "I need a lot of reassurance that I am loved",
        dimension: "anxiety",
        reverseScored: false,
    },
    {
        id: 3,
        text: "I get frustrated when my partner doesn't respond quickly to my messages",
        dimension: "anxiety",
        reverseScored: false,
    },
    {
        id: 4,
        text: "I'm afraid my partner will stop loving me",
        dimension: "anxiety",
        reverseScored: false,
    },
    {
        id: 5,
        text: "My desire for closeness sometimes feels overwhelming to others",
        dimension: "anxiety",
        reverseScored: false,
    },
    {
        id: 6,
        text: "I worry a lot about my relationships",
        dimension: "anxiety",
        reverseScored: false,
    },
    {
        id: 7,
        text: "When I'm not with my partner, I worry about what they're doing",
        dimension: "anxiety",
        reverseScored: false,
    },
    {
        id: 8,
        text: "I often wish my partner's feelings for me were as strong as my feelings for them",
        dimension: "anxiety",
        reverseScored: false,
    },
    {
        id: 9,
        text: "I worry about being alone",
        dimension: "anxiety",
        reverseScored: false,
    },
    {
        id: 10,
        text: "Sometimes I feel the urge to test whether my partner really loves me",
        dimension: "anxiety",
        reverseScored: false,
    },

    // Avoidance Dimension (10 questions) - Discomfort with intimacy, self-reliance
    {
        id: 11,
        text: "I prefer not to show a partner how I feel deep down",
        dimension: "avoidance",
        reverseScored: false,
    },
    {
        id: 12,
        text: "I find it difficult to depend on romantic partners",
        dimension: "avoidance",
        reverseScored: false,
    },
    {
        id: 13,
        text: "I get nervous when partners get too emotionally close to me",
        dimension: "avoidance",
        reverseScored: false,
    },
    {
        id: 14,
        text: "I prefer not to be too emotionally intimate with romantic partners",
        dimension: "avoidance",
        reverseScored: false,
    },
    {
        id: 15,
        text: "I feel uncomfortable when a partner wants to be very close",
        dimension: "avoidance",
        reverseScored: false,
    },
    {
        id: 16,
        text: "I find it easy to get emotionally close to my partner",
        dimension: "avoidance",
        reverseScored: true,
    },
    {
        id: 17,
        text: "I feel comfortable turning to my partner in times of need",
        dimension: "avoidance",
        reverseScored: true,
    },
    {
        id: 18,
        text: "I tell my partner just about everything",
        dimension: "avoidance",
        reverseScored: true,
    },
    {
        id: 19,
        text: "I feel comfortable sharing my private thoughts and feelings with my partner",
        dimension: "avoidance",
        reverseScored: true,
    },
    {
        id: 20,
        text: "I don't feel comfortable opening up emotionally to partners",
        dimension: "avoidance",
        reverseScored: false,
    },
];

export const answerOptions = [
    { value: 1, label: "Strongly Disagree" },
    { value: 2, label: "Disagree" },
    { value: 3, label: "Slightly Disagree" },
    { value: 4, label: "Neutral" },
    { value: 5, label: "Slightly Agree" },
    { value: 6, label: "Agree" },
    { value: 7, label: "Strongly Agree" },
];
