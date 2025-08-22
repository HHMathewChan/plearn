export interface QuestionOption {
    id: string;
    option_text: string;
}

export interface Question {
    id: string;
    question_text: string;
    difficulty: string;
    options: QuestionOption[];
}

export interface FinalQuizStructure {
    id: string;
    title: string;
    questions: Question[];
}