import { getStudentCode } from "../Services/PlatformUserService";
import { useEnrolment } from "../Hooks/useEnrolment";
import {useRecommendationCourseList} from "../Hooks/useRecommendationCourseList";

const RecommendedCourseList: React.FC = () => {
    const { courses, loading, error } = useRecommendationCourseList();
    const { enrol, enrolStatus } = useEnrolment();
    const studentCode = getStudentCode();
    if (!studentCode) {
        return <div className="text-red-600" role="status">Student code is not available.</div>;
    }

    if (loading) return <div>Loading personalised recommendations…</div>;
    if (error) return <div className="text-red-600" role="status">{error}</div>;
    if (!courses || courses.length === 0) return <div>No personalised recommendations found.</div>;

  return (
    // This css enables horizontal scrolling when table content overflows the container width.
    <div className="overflow-x-auto">
      {/* The css means to creates a full-width white table with rounded corners and shadow styling */}
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        { /* The css enables a caption to provide a description of the table for screen readers only */}
        <caption className="sr-only">Available courses with enrolment options</caption>
        <thead className="bg-gray-50">
          <tr>
            {/* First column
            The following css means that the text is left-aligned, small, medium weight, gray color, uppercase, and has wider letter spacing. */}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Course Details
            </th>
            {/* Second column
            The following css means that the text is left-aligned, small, medium weight, gray color, uppercase, and has wider letter spacing. */}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Course Code
            </th>
            {/* Third column
            The following css means that the text is left-aligned, small, medium weight, gray color, uppercase, and has wider letter spacing. */}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Copyright Information
            </th>
            {/* Fourth column for topic information
            The following css means that the text is left-aligned, small, medium weight, gray color, uppercase, and has wider letter spacing. */}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Topic
            </th>
            {/* Fifth column for recommendation score
            The following css means that the text is left-aligned, small, medium weight, gray color, uppercase, and has wider letter spacing. */}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Match Score
            </th>
            {/* Sixth column for enrol action
            The following css means that the text is left-aligned, small, medium weight, gray color, uppercase, and has wider letter spacing. */}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        { /* The css means to create a table body with white background and gray dividing lines */}
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Iterate over courses and display each course's details */}
          {courses.map((recommendation, index) => {
            //for debugging
            console.log('At ReccomendedCourseList.tsx: Rendering recommendation:', recommendation);
            const course = recommendation.course;
            return (
              // The css means to create alternating row colours, odd rows are white and even rows are light gray.
              <tr key={course.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                {/* First column for course details
                The following css means to add horizontal padding of 1.5rem, vertical padding of 1rem, 
                and a text to wrap normally within an element. Newlines and spaces will be collapsed. */}
                <td className="px-6 py-4 whitespace-normal break-words">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                  </div>
                </td>
                {/* Second column for course code */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {course.course_code}
                </td>
                {/* Third column for copyright information */}
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="space-y-1">
                    {course.copyrightOwner ? (
                      <>
                        <div>
                          <span className="font-medium">Owner:</span> {course.copyrightOwner.name} ({course.copyrightOwner.type})
                        </div>
                        <div>
                          <span className="font-medium">Licence:</span> {course.copyrightOwner.license_type}
                          {course.copyrightOwner.license_url && (
                            <a
                              href={course.copyrightOwner.license_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline ml-1 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                              aria-label={`View licence details for ${course.title}`}
                            >
                              Details
                            </a>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="text-gray-400">Copyright information not available</div>
                    )}
                  </div>
                </td>
                {/* Fourth column for topic information */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {course.topic ? (
                    <div>
                      <h4 className="font-medium">{course.topic.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{ course.topic.name}</p>
                    </div>
                  ) : (
                    <div className="text-gray-400">Topic not available</div>
                  )}
                </td>
                {/* Fifth column for recommendation score */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-centre">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {Math.round(recommendation.score * 100)}% match
                    </span>
                  </div>
                </td>
                {/* Sixth column for enrol action */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => enrol(course.id)}
                    disabled={enrolStatus[course.id] === "Processing..."}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colours"
                    aria-label={`Enrol in ${course.title}`}
                  >
                    {enrolStatus[course.id] === "Enrolled!" ? "Enrolled" : "Enrol"}
                  </button>
                  {/* Display enrolment status if course.id is true and enrolStatus is not "Enrolled!" */}
                  {enrolStatus[course.id] && enrolStatus[course.id] !== "Enrolled!" && (
                    <span className="ml-2 text-sm text-gray-600">{enrolStatus[course.id]}</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecommendedCourseList;