/**
 * This is a React component for displaying courses in a table format.
 * Each card represents a course with title, course code, description, and copyright information.
 * The component uses the `useCourses` hook to fetch and manage course data.
 */
import { useCourses } from "../Hooks/useCourses";

const CourseTable: React.FC = () => {
  const { courses, loading, error } = useCourses();

  if (loading) {
    return <div className="flex items-centre justify-centre h-64">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-centre">{error}</div>;
  }

  if (!courses || courses.length === 0) {
    return <div className="text-centre text-gray-500">No courses available</div>;
  }

  return (
    <div className="grid gap-4">
      {courses.map(course_with_owner => (
        <div key={course_with_owner.id} className="p-4 rounded-2xl shadow bg-white hover:shadow-lg transition-all">
          <h2 className="text-xl font-semibold">{course_with_owner.title}</h2>
          <p className="text-gray-700 mb-2">{course_with_owner.description}</p>
          <div className="text-sm text-gray-500 mt-2 border-t pt-2">
            <div>
              <span className="font-medium">Course Code:</span> {course_with_owner.course_code}
            </div>
            <div>
              <span className="font-medium">Copyright Owner:</span> {course_with_owner.copyrightOwner.name} ({course_with_owner.copyrightOwner.type})
            </div>
            <div>
              <span className="font-medium">Licence:</span> {course_with_owner.copyrightOwner.license_type}{" "}
              {course_with_owner.copyrightOwner.license_url && (
                <a
                  href={course_with_owner.copyrightOwner.license_url}
                  target="_blank" // Opens the linked document in a new window or tab
                  rel="noopener noreferrer" // prevent the new page from accessing the original page's window object
                  className="text-blue-600 underline ml-1"
                >
                  Details
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseTable;