import { useState, useCallback } from "react";
import { studentHasLearningPreferences } from "../Services/StudentLearningPreferenceService";
import { getStudentCode } from "../Services/PlatformUserService";

export const useStudentLearningPreference = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [result, setResult] = useState<any>(null);
    

    const checkPreferences = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const studentCode = getStudentCode();
            if (!studentCode) {
                throw new Error("Student code is not available");
            }
            const data = await studentHasLearningPreferences(studentCode);
            setResult(data);
            return data;
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { checkPreferences, loading, error, result };
};