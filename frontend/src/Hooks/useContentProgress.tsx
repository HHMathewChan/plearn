import { useState, useCallback } from 'react';
import {  createContentProgress as createContentProgressService,
  updateContentProgress as updateContentProgressService,
  getContentProgress as getContentProgressService
} from '../Services/ContentProgressService';

type ProgressStatus = 'not_started' | 'in_progress' | 'completed' | null;

interface UseContentProgressProps {
  studentCode: string;
  contentId: string;
}

interface ContentProgressState {
  status: ProgressStatus | null;
  isCompleted: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useContentProgress = ({ studentCode, contentId }: UseContentProgressProps) => {
  const [state, setState] = useState<ContentProgressState>({
    status: null,
    isCompleted: false,
    isLoading: false,
    error: null,
  });

  /** Type guard to validate runtime values as ProgressStatus 
   * This is used to ensure that the value returned from the service is one of the expected types(exclude null when the value is true).
  */
  const isProgressStatus = (value: unknown): value is Exclude<ProgressStatus, null> => {
    return value === 'not_started' || value === 'in_progress' || value === 'completed';
  };

  /**
   * Get the current content progress status and set the local state to the result
   */
  const getContentProgress = useCallback(async (): Promise<ProgressStatus | null> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    //for debugging
    console.log(`getContentProgress is called for studentCode: ${studentCode}, contentId: ${contentId}`);
    try {
      //Ensure the null value returns from service is not null
      const rawProgressStatus = await getContentProgressService(studentCode, contentId);
      //for debugging
      console.log('Raw Progress Status:', rawProgressStatus);
      const progressStatus: ProgressStatus | null = rawProgressStatus === null? null: (isProgressStatus(rawProgressStatus) ? rawProgressStatus : null);
      //for debugging
      console.log('Progress Status:', progressStatus);
      setState(prev => ({ ...prev,
        status: progressStatus,
        isCompleted: progressStatus === 'completed',
        isLoading: false
      }));
      return progressStatus;
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Failed to get content progress', isLoading: false }));
      return null;
    }
  }, [studentCode, contentId]);

  const createContentProgress = useCallback(async (): Promise<void> => {
    //for debugging
    console.log(`createContentProgress is called for studentCode: ${studentCode}, contentId: ${contentId}`);
    try {
      await createContentProgressService(studentCode, contentId);
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Failed to create content progress' }));
      throw error;
    }
  }, [studentCode, contentId]);

  /**
   * Initialize content progress status
   */
  const initialiseContentProgress = useCallback(async (): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    //for debugging
    console.log('initialiseContentProgress is called...');
    try {
      // Step 1: get current content progress status
      let currentProgressStatus: ProgressStatus | null = await getContentProgress();
      // Step 1b: Create progress record if it doesn't exist
      if (!currentProgressStatus) {
        await createContentProgress();
        currentProgressStatus = await getContentProgress();
      }
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Failed to initialize content progress', isLoading: false }));
    }
  }, [studentCode, contentId, getContentProgress, createContentProgress]);

  const toggleContentProgress = useCallback(async (): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Step 1: get current content progress status
      let currentProgressStatus: ProgressStatus | null = await getContentProgress();
      //for debugging
      console.log('Current Progress Status:', currentProgressStatus);

      // Defensive fallback: ensure we have a ProgressStatus value
      const effectiveProgressStatus: ProgressStatus = currentProgressStatus ?? 'not_started';

      // Step 2: Toggle completion status
      // If currently 'completed' -> set to 'not_started', otherwise set to 'completed'
      const newProgressStatus: ProgressStatus = effectiveProgressStatus === 'completed' ? 'not_started' : 'completed';
      console.log('New Progress Status:', newProgressStatus);
      await updateContentProgressService(studentCode, contentId, newProgressStatus);

      // Update local state to reflect the new status
      setState(prev => ({
        ...prev,
        status: newProgressStatus,
        isCompleted: newProgressStatus === 'completed',
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to update content progress',
      }));
    }
  }, [studentCode, contentId, getContentProgress, createContentProgress]);

  return {
    isCompleted: state.isCompleted,
    isLoading: state.isLoading,
    error: state.error,
    toggleContentProgress,
    getContentProgress,
    initialiseContentProgress
  };
};