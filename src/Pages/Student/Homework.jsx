import React, { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
import { Loader2 } from 'lucide-react';
import HomeworkHeader from '../../Components/Student/Homework/Header';
import HomeworkStats from '../../Components/Student/Homework/Stats';
import HomeworkFilters from '../../Components/Student/Homework/Filter';
import HomeworkList from '../../Components/Student/Homework/List';
import HomeworkCalendar from '../../Components/Student/Homework/Calendar';
import AssignmentForm from '../../Components/Student/Homework/AssignmentForm';

const HomeworkPage = () => {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'pending', 'submitted', 'graded'
  const [filterCourse, setFilterCourse] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [dateRange, setDateRange] = useState('this-week');

  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({
    totalAssignments: 0,
    pendingAssignments: 0,
    submittedAssignments: 0,
    averageGrade: 0
  });

  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submissionContent, setSubmissionContent] = useState('');
  const [formAnswers, setFormAnswers] = useState({}); // { questionId: answerText }
  const [submitting, setSubmitting] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const openSubmitModal = async (assignment) => {
    setSelectedAssignment(assignment);
    setSubmissionContent('');
    setFormAnswers({});
    setIsSubmitModalOpen(true);
    setLoadingDetails(true);

    try {
      const res = await apiClient.get(`/api/assignment/${assignment._id}`);
      // Support both single object return or wrapped in { data: ... }
      const fullAssignment = res.data.data || res.data;
      setSelectedAssignment(fullAssignment);
    } catch (err) {
      console.error("Failed to fetch assignment details", err);
      // Fallback to what we have or show error? 
      // For now, we stick with the list data but maybe show a toast
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleFormAnswerChange = (questionId, value) => {
    setFormAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmitAssignment = async (e) => {
    e.preventDefault();
    if (!selectedAssignment) return;
    setSubmitting(true);

    let contentPayload;

    if (selectedAssignment.type === 'form') {
      const questions = selectedAssignment.content?.questions || [];
      // Format answers as array of objects: { questionId, answer }
      // Or simply pass the answers object if backend supports it.
      // Based on typical patterns, let's send an array with question text context too if needed,
      // but usually just ID and Answer is enough.
      contentPayload = {
        answers: Object.keys(formAnswers).map(qId => ({
          questionId: qId,
          answer: formAnswers[qId]
        }))
      };
    } else {
      contentPayload = { text: submissionContent };
    }

    try {
      await apiClient.post('/api/submission/submit', {
        assignmentId: selectedAssignment._id,
        content: contentPayload
      });
      // Refresh data
      window.location.reload();
    } catch (err) {
      console.error("Submission failed", err);
      alert("Failed to submit assignment");
    } finally {
      setSubmitting(false);
      setIsSubmitModalOpen(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get('/api/assignment/my-assignments');
        const data = res.data.data; // New wrapper { data: [...] }

        let assignmentList = Array.isArray(data) ? data : [];
        setAssignments(assignmentList);

        // Extract Unique Courses
        const courseMap = new Map();
        assignmentList.forEach(a => {
          if (a.courseId && typeof a.courseId === 'object') {
            if (!courseMap.has(a.courseId._id)) {
              courseMap.set(a.courseId._id, a.courseId.title);
            }
          }
        });

        const uniqueCourses = Array.from(courseMap.entries()).map(([id, title]) => ({ id, name: title }));
        setCourses([{ id: 'all', name: 'All Courses' }, ...uniqueCourses]);

        // Calculate Stats
        const total = assignmentList.length;
        const submitted = assignmentList.filter(a => a.status === 'submitted' || a.status === 'graded').length;
        const pending = total - submitted;

        // Calculate Average Grade
        const graded = assignmentList.filter(a => a.status === 'graded' && a.grade != null);
        const avg = graded.length > 0
          ? graded.reduce((acc, curr) => acc + curr.grade, 0) / graded.length
          : 0;

        setStats({
          totalAssignments: total,
          pendingAssignments: pending,
          submittedAssignments: submitted,
          averageGrade: Math.round(avg * 10) / 10
        });

      } catch (error) {
        console.error("Error fetching homework:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    );
  }

  const studentData = {
    name: 'My Dashboard', // Fallback or could fetch user info
    ...stats
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <HomeworkHeader
        studentData={studentData}
        onBack={() => window.history.back()}
      />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Statistics */}
        <div className="mb-6">
          <HomeworkStats
            activeTab={activeTab}
            onTabChange={setActiveTab}
            studentData={studentData}
          />
        </div>

        {/* Filters and Controls */}
        <div className="mb-6">
          <HomeworkFilters
            filterCourse={filterCourse}
            viewMode={viewMode}
            dateRange={dateRange}
            courses={courses}
            onCourseChange={setFilterCourse}
            onViewModeChange={setViewMode}
            onDateRangeChange={setDateRange}
          />
        </div>

        {/* Main Content */}
        {viewMode === 'list' ? (
          <HomeworkList
            activeTab={activeTab}
            filterCourse={filterCourse}
            dateRange={dateRange}
            assignments={assignments}
            onSubmit={openSubmitModal}
          />
        ) : (
          <HomeworkCalendar
            activeTab={activeTab}
            filterCourse={filterCourse}
            dateRange={dateRange}
            assignments={assignments}
          />
        )}
      </div>

      {/* Submission Modal */}
      {isSubmitModalOpen && selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-2">Submit: {selectedAssignment.title}</h3>
            <p className="text-sm text-gray-500 mb-6 border-b pb-4">
              {selectedAssignment.description}
            </p>

            {loadingDetails ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-red-600" />
              </div>
            ) : (
              <form onSubmit={handleSubmitAssignment}>
                {selectedAssignment.type === 'form' ? (
                  <AssignmentForm
                    questions={selectedAssignment.content?.questions || []}
                    answers={formAnswers}
                    onAnswerChange={handleFormAnswerChange}
                  />
                ) : (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Work / Answer</label>
                    <textarea
                      className="w-full border rounded-lg p-3 h-32 focus:ring-red-500 focus:border-red-500"
                      placeholder="Type your answer here..."
                      value={submissionContent}
                      onChange={e => setSubmissionContent(e.target.value)}
                      required
                    ></textarea>
                  </div>
                )}

                <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Submit Assignment'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeworkPage;