export type ChosenTopic = {
    topic_id: string;
    interest_level: "high" | "medium" | "low";
    knowledge_proficiency: "novice" | "intermediate" | "proficient";
};

export type LearningModes = {
    id: string;
    mode_name: string;
    description: string | null;
}

export type Topic = {
    id: string;
    name: string;
}