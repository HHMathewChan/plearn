This is continuation of my final year project.
As many existing e-learning platforms offer limited personalisation and struggle to sustain learner motivation. Most platforms still follow a one-size-fits-all approach, which fails to account for learners’ differing prior knowledge, interests, and learning styles. Because online learning relies heavily on self-motivation, this lack of adaptivity often leads to disengagement and poor learning outcomes. 
The project responds to this problem by proposing a personalised, adaptive, and motivating learning platform that tailors content, assessment difficulty, and feedback to individual learners.  

Core Features
1. User Authentication & Management
- User registration with role-based access (student, tutor, admin)
- Secure login with JWT token-based authentication
- Platform user profile management
- Session management with persistent authentication state

2. Course Management
- Browse and view all available courses with metadata
- Course catalogue displaying course details, descriptions, and copyright information
- Course filtering and search capabilities
- Course enrolment system for students
- Enrolled course tracking and management
- Course progress monitoring

3. Personalised Learning Recommendations
- Course recommendation engine based on student learning preferences
- Algorithm using student learning history, topic interest, and difficulty preferences
- Recommendation scoring using:
- Topic performance analysis
- Learning mode matching
- Difficulty level alignment
- Course popularity weighting
- Recommended course list displayed on dashboard

4. Student Learning Preferences
- Learning preference survey/setup during onboarding
- Capture student learning mode preferences (beginner, intermediate, challenging)
- Topic selection with interest levels (high, medium, low)
- Knowledge proficiency assessment (novice, intermediate, proficient)
- Learning preference persistence and retrieval

5. Course Content Management
- Structured course content with multiple content items per course
- Content delivery with multiple content types
- Signed URL generation for secure content access
- Content organisation and sequencing

6. Learning Progress Tracking
- Content progress tracking for individual course materials
- Course progress monitoring with completion status
- Completion date tracking
- Progress visibility for students
- All-or-nothing completion validation for courses

7. Assessment & Quizzes
- Final quiz system for course completion assessment
- Quiz attempt creation and tracking
- Question management with multiple-choice options
- Answer logging and validation
- Quiz result scoring (0-100 scale)
- Active and past attempt logging

8. Student Dashboard
- Display of enrolled courses with progress
- Display of recommended courses
- Quick access to course materials

9. Content Access & Navigation
- Course content page with sequential content viewing
- Content progress indicators
- Navigation between course materials
- Final quiz access after content completion

10. Responsive UI Design
- Tailwind CSS-based responsive interface
- Mobile-friendly layout (flex, grid-based design)
- Accessibility features (ARIA labels, semantic HTML)
- Form validation and error handling
- Loading states and user feedback
- Technical Architecture Features
- Backend (Node.js + Express.js)
- MVC Pattern: Clean separation between controllers, services, and repositories
- Repository Pattern: Data access abstraction layer for maintainability
- Service Layer: Business logic encapsulation
- Middleware Support: CORS, JSON parsing, authentication
- Database Integration: PostgreSQL with pg-promise
- Frontend (React + Vite + TypeScript)
- Component-Based Architecture: Reusable React functional components
- Custom Hooks: useContentProgress, useCourses, useEnrolment, etc.
- Facade Pattern: LoginFacade for simplified authentication flow
- Service Layer: API communication abstraction
- Type Safety: Full TypeScript implementation
- State Management: React hooks for local state
- Data & Storage
- PostgreSQL relational database with proper schema
Encrypted storage for sensitive data
Session storage for temporary user data
File storage integration for course resources (R2 cloud storage)
