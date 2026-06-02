import React from 'react';
import { FaGithub } from 'react-icons/fa';

type FeaturesSectionProps = {
    mode?: 'short' | 'long';
    title?: string;
    className?: string;
};

const content = {
    short: [
        `Discover courses, track progress, and take final quizzes — personalised recommendations and
        progress-saving help you continue learning where you left off.`,
    ],
    long: [
        `plearn is a student-focused learning platform that helps you discover courses, track your
        progress, and build consistent study habits. The app is designed to guide you from course
        enrolment all the way to quiz completion with clear feedback at each step.`,

        `You can browse available courses, access structured course content, and receive recommended
        learning paths based on your preferences. As you study, your content and course progress are
        recorded so you can quickly continue where you left off.`,

        `When you are ready, you can take final quizzes to evaluate your understanding and monitor
        attempts over time. This creates a complete learning journey that combines personalised
        recommendations, progress visibility, and assessment outcomes in one place.`,
    ],
};

const headingSize = {
    short: 'text-2xl',
    long: 'text-3xl',
};

function FeaturesSection({
    mode = 'long',
    title = 'What you can do on plearn',
    className = '',
}: FeaturesSectionProps) {
    const baseClass =
        'max-w-4xl bg-purple-50 border border-purple-100 rounded-2xl p-8 mb-10 shadow-sm';

    const paragraphs = content[mode];

    return (
        <section
            aria-labelledby="features-heading"
            className={`${baseClass} ${className}`}
        >
            <h2
                id="features-heading"
                className={`${headingSize[mode]} font-bold text-purple-800 mb-4`}
            >
                {title}
            </h2>

            {paragraphs.map((paragraph, index) => (
                <p
                    key={index}
                    className={`text-base text-gray-700 leading-7 ${
                        index < paragraphs.length - 1 ? 'mb-4' : ''
                    }`}
                >
                    {paragraph}
                </p>
            ))}

            <div className="mt-6">
                <p className="text-base text-gray-700 leading-7 mb-3">
                    For more details about this project, please refer to the GitHub project page.
                </p>

                <a
                    href="https://github.com/HHMathewChan/plearn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-700 font-semibold hover:text-purple-900 transition-colors"
                    aria-label="View this project on GitHub"
                >
                    <FaGithub className="text-2xl" />
                    <span>View on GitHub</span>
                </a>
            </div>
        </section>
    );
}

export default FeaturesSection;