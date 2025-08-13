import { useState, useCallback } from 'react';
import { ContentProgressService } from '../Services/ContentProgressService';

interface UseContentProgressProps {
  studentCode: string;
  contentId: string;
}

interface ContentProgressState {
  isCompleted: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useContentProgress = ({ studentCode, contentId }: UseContentProgressProps) => {
  const [state, setState] = useState<ContentProgressState>({
    isCompleted: false,
    isLoading: false,
    error: null,
  });

  const checkContentProgress = useCallback(async (): Promise<boolean> => {
    try {
      const hasProgress = await ContentProgressService.hasContentProgress(studentCode, contentId);
      setState(prev => ({ ...prev, isCompleted: hasProgress }));
      return hasProgress;
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Failed to check content progress' }));
      return false;
    }
  }, [studentCode, contentId]);

  const createContentProgress = useCallback(async (): Promise<void> => {
    try {
      await ContentProgressService.createContentProgress(studentCode, contentId);
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Failed to create content progress' }));
      throw error;
    }
  }, [studentCode, contentId]);

  const toggleContentProgress = useCallback(async (): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Step 1: Check if content progress record exists
      const hasProgress = await checkContentProgress();

      // Step 1b: Create progress record if it doesn't exist
      if (!hasProgress) {
        await createContentProgress();
      }

      // Step 2: Toggle completion status
      const newStatus = state.isCompleted ? 'not_started' : 'complete';
      await ContentProgressService.updateContentProgress(studentCode, contentId, newStatus);

      // Update local state
      setState(prev => ({
        ...prev,
        isCompleted: !prev.isCompleted,
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to update content progress',
      }));
    }
  }, [studentCode, contentId, state.isCompleted, checkContentProgress, createContentProgress]);

  return {
    isCompleted: state.isCompleted,
    isLoading: state.isLoading,
    error: state.error,
    toggleContentProgress,
    checkContentProgress,
  };
};