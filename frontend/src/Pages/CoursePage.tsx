/**
 * This is a React component for the course page.
 * It serves as a container for course-related content including the course table.
 * Additional course page features will be added here.
 */
import CourseTable from "../Components/CourseTable";
import EnrolledCourseTable from "../Components/EnrolledCourseTable";
import RecommendedCourseTable from "../Components/RecommendedCourseTable";

const CoursePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Recommended Courses Section */}
      <section>
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Recommended Courses</h1>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Based on Your Interests</h2>
          <RecommendedCourseTable />
        </div>
      </section>

      {/* Available Courses Section */}
      <section>
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Available Courses</h1>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Browse and Enrol</h2>
          <CourseTable />
        </div>
      </section>

      {/* Enrolled Courses Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-900">My Enrolled Courses</h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-centre justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Your Learning Journey</h3>
            <span className="text-sm text-gray-500">
              Track your progress and access course materials
            </span>
          </div>
          <EnrolledCourseTable />
        </div>
      </section>
    </div>
  );
};

export default CoursePage;