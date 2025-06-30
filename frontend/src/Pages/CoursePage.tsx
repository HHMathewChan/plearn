/**
 * This is a React component for the course page.
 * It serves as a container for course-related content including the course table.
 * Additional course page features will be added here.
 */
import CourseTable from "../Components/CourseTable";

const CoursePage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Available Courses</h1>

      {/* Content relevant to course will be included here, such as:
      - available courses
      - enrolled courses
      */}
      
      <CourseTable />
    </div>
  );
};

export default CoursePage;