import { useState } from "react";
import { enrolsInCourse } from "../Services/EnrolmentService";
import { PlatformUserRepository } from "../Repositories/PlatformUserRepository";

export function useEnrolment() {
  const [enrolStatus, setEnrolStatus] = useState<{ [courseId: string]: string }>({});

  const enrol = async (courseId: string) => {
    try {
      const studentCode = PlatformUserRepository.getStudentCode();
      if (!studentCode) throw new Error("Not authenticated as a student.");

      setEnrolStatus(previousDetails => ({ ...previousDetails, [courseId]: "Processing..." }));
      await enrolsInCourse(studentCode, courseId);

      setEnrolStatus(previousDetails => ({ ...previousDetails, [courseId]: "Enrolled!" }));

    } catch (err: any) {
      setEnrolStatus(previousDetails => ({ ...previousDetails, [courseId]: err.message || "Failed" }));
    }
  };

  return { enrol, enrolStatus };
}