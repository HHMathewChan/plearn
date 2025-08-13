import React, { useEffect } from 'react';
import { useContentProgress } from '../Hooks/useContentProgress';

interface ContentProgressTickboxProps {
  studentCode: string;
  contentId: string;
  className?: string;
}

export const ContentProgressTickbox: React.FC<ContentProgressTickboxProps> = ({
  studentCode,
  contentId,
  className = '',
}) => {
  const { isCompleted, isLoading, error, toggleContentProgress, checkContentProgress } = 
    useContentProgress({ studentCode, contentId });

  // Load initial progress state when component mounts
  useEffect(() => {
    checkContentProgress();
  }, [checkContentProgress]);

  const handleClick = async () => {
    if (!isLoading) {
      await toggleContentProgress();
    }
  };

  return (
    <div className={`flex items-centre ${className}`}>
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className={`
          w-6 h-6 border-2 border-gray-300 rounded flex items-centre justify-centre
          transition-colours duration-200 ease-in-out
          ${isCompleted ? 'bg-green-500 border-green-500' : 'bg-white hover:border-gray-400'}
          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        `}
        aria-label={isCompleted ? 'Mark content as incomplete' : 'Mark content as complete'}
        title={isCompleted ? 'Click to mark as incomplete' : 'Click to mark as complete'}
      >
        {isLoading && (
          <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin" />
        )}
        {!isLoading && isCompleted && (
          <svg
            className="w-4 h-4 text-white"
            fill="currentColour"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
      {error && (
        <span className="ml-2 text-xs text-red-600" role="alert" title={error}>
          ⚠️
        </span>
      )}
    </div>
  );
};