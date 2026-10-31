import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialStudentProfile, initialCourses, evaluationCriteria, facultyAnalyticsData } from '../data/initialData';
import confetti from 'canvas-confetti';

const FeedbackContext = createContext();

export function FeedbackProvider({ children }) {
  // Load courses from localStorage or default
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('mca_feedback_courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [student, setStudent] = useState(initialStudentProfile);
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'completed'
  const [toast, setToast] = useState(null);
  const [activeRole, setActiveRole] = useState('student'); // 'student' | 'faculty'

  // Persist courses changes
  useEffect(() => {
    localStorage.setItem('mca_feedback_courses', JSON.stringify(courses));
  }, [courses]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const submitFeedback = (courseId, { scores, comments, isAnonymous }) => {
    // Calculate average rating
    const numericScores = Object.values(scores);
    const sum = numericScores.reduce((acc, curr) => acc + curr, 0);
    const average = (sum / numericScores.length).toFixed(1);

    const now = new Date();
    const dateFormatted = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const timeFormatted = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) + ' IST';

    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          status: 'completed',
          submissionDetails: {
            date: dateFormatted,
            time: timeFormatted,
            rating: parseFloat(average),
            isAnonymous: Boolean(isAnonymous),
            scores: numericScores,
            comments: comments || "Constructive feedback submitted on course curriculum and pedagogy."
          }
        };
      }
      return course;
    }));

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.65 }
      });
    } catch {
      // ignore in environments without canvas
    }

    showToast(`Evaluation for ${courses.find(c => c.id === courseId)?.name} submitted successfully!`);
  };

  const resetAllData = () => {
    setCourses(initialCourses);
    localStorage.removeItem('mca_feedback_courses');
    showToast('Reset all evaluation records to default demo state.', 'info');
  };

  // Metrics computation
  const totalCourses = courses.length;
  const completedCourses = courses.filter(c => c.status === 'completed').length;
  const pendingCourses = courses.filter(c => c.status === 'pending').length;
  const completionPercentage = totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 1000) / 10 : 0;

  return (
    <FeedbackContext.Provider
      value={{
        student,
        courses,
        filter,
        setFilter,
        totalCourses,
        completedCourses,
        pendingCourses,
        completionPercentage,
        submitFeedback,
        resetAllData,
        toast,
        showToast,
        activeRole,
        setActiveRole,
        evaluationCriteria,
        facultyAnalyticsData
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}

export const useFeedback = () => useContext(FeedbackContext);
