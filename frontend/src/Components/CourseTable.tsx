/**
 * This is a React component for displaying courses in a table format.
 * Each row represents a course with title, course code, description, copyright information, and enrol action.
 * The component uses the `useCourses` hook to fetch and manage course data.
 */
import { useCourses } from "../Hooks/useCourses";
import { useEnrolment } from "../Hooks/useEnrolment";

const CourseTable: React.FC = () => {
  const { courses, loading, error } = useCourses();
  const { enrol, enrolStatus } = useEnrolment();

  if (loading) {
    return (
      <div className="flex items-centre justify-centre h-64" role="status" aria-label="Loading courses">
        <span className="sr-only">Loading...</span>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-centre" role="alert" aria-live="polite">
        {error}
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="text-centre text-gray-500" role="status">
        No courses available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        <caption className="sr-only">Available courses with enrolment options</caption>
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Course Details
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Course Code
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Copyright Information
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {courses.map((courseWithOwner, index) => (
            <tr key={courseWithOwner.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{courseWithOwner.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{courseWithOwner.description}</p>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {courseWithOwner.course_code}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                <div className="space-y-1">
                  <div>
                    <span className="font-medium">Owner:</span> {courseWithOwner.copyrightOwner.name} ({courseWithOwner.copyrightOwner.type})
                  </div>
                  <div>
                    <span className="font-medium">Licence:</span> {courseWithOwner.copyrightOwner.license_type}
                    {courseWithOwner.copyrightOwner.license_url && (
                      <a
                        href={courseWithOwner.copyrightOwner.license_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline ml-1 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                        aria-label={`View licence details for ${courseWithOwner.title}`}
                      >
                        Details
                      </a>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => enrol(courseWithOwner.id)}
                  disabled={enrolStatus[courseWithOwner.id] === "Processing..."}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colours"
                  aria-label={`Enrol in ${courseWithOwner.title}`}
                >
                  {enrolStatus[courseWithOwner.id] === "Enrolled!" ? "Enrolled" : "Enrol"}
                </button>
                {enrolStatus[courseWithOwner.id] && enrolStatus[courseWithOwner.id] !== "Enrolled!" && ( 
                  <span>{enrolStatus[courseWithOwner.id]}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;