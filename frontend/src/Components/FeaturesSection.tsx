import React from 'react';

type FeaturesSectionProps = {
    mode?: 'short' | 'long';
    title?: string;
    className?: string;
};

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
    mode = 'long',
    title = 'What you can do on plearn',
    className = '',
}) => {
    const baseClass = 'max-w-4xl bg-purple-50 border border-purple-100 rounded-2xl p-8 mb-10 shadow-sm';

    if (mode === 'short') {
        return (
            <section aria-labelledby="features-heading" className={`${baseClass} ${className}`}>
                <h2 id="features-heading" className="text-2xl font-bold text-purple-800 mb-3">
                    {title}
                </h2>
                <p className="text-base text-gray-700 leading-7">
                    Discover courses, track progress, and take final quizzes — personalised recommendations and
                    progress-saving help you continue learning where you left off.
                </p>
            </section>
        );
    }

    return (
        <section aria-labelledby="features-heading" className={`${baseClass} ${className}`}>
            <h2 id="features-heading" className="text-3xl font-bold text-purple-800 mb-4">
                {title}
            </h2>
            <p className="text-base text-gray-700 leading-7 mb-4">
                plearn is a student-focused learning platform that helps you discover courses, track your
                progress, and build consistent study habits. The app is designed to guide you from course
                enrolment all the way to quiz completion with clear feedback at each step.
            </p>
            <p className="text-base text-gray-700 leading-7 mb-4">
                You can browse available courses, access structured course content, and receive recommended
                learning paths based on your preferences. As you study, your content and course progress are
                recorded so you can quickly continue where you left off.
            </p>
            <p className="text-base text-gray-700 leading-7">
                When you are ready, you can take final quizzes to evaluate your understanding and monitor
                attempts over time. This creates a complete learning journey that combines personalised
                recommendations, progress visibility, and assessment outcomes in one place.
            </p>
        </section>
    );
};

export default FeaturesSection;
