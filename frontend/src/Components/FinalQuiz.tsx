import { useState, useEffect } from 'react';
import {fetchFinalQuizWithQuestions} from '../Services/FinalQuizService';
import type{ FinalQuizStructure } from '../Types/FinalQuizTypes';

const FinalQuiz: React.FC<{ courseId: string }> = ({ courseId }) => {
    const [quizData, setQuizData] = useState<FinalQuizStructure | null>(null);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const data = await fetchFinalQuizWithQuestions(courseId);
                setQuizData(data);
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizData();
    }, [courseId]);

    const handleOptionChange = (questionId: string, optionId: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: optionId }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Placeholder for submit logic
        console.log('Quiz submitted:', answers);
    };

    if (loading) return <div>Loading...</div>;
    if (!quizData) return <div>No quiz data available.</div>;

    return (
        <form onSubmit={handleSubmit}>
            {quizData.questions.map(question => (
                <div key={question.id}>
                    <h2>{question.question_text}</h2>
                    {question.options.map(option => (
                        <div key={option.id}>
                            <label>
                                <input
                                    type="radio"
                                    name={question.id}
                                    value={option.id}
                                    checked={answers[question.id] === option.id}
                                    onChange={() => handleOptionChange(question.id, option.id)}
                                />
                                {option.option_text}
                            </label>
                        </div>
                    ))}
                </div>
            ))}
            <button type="submit">Submit Quiz</button>
        </form>
    );
};

export default FinalQuiz;