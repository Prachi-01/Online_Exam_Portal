import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';

const ExamReview = () => {
  const { examId, submissionId } = useParams();
  const [exam, setExam] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get exam data
        const examDoc = await getDoc(doc(db, 'exams', examId));
        if (!examDoc.exists()) throw new Error('Exam not found');
        setExam({ id: examDoc.id, ...examDoc.data() });

        // Get submission data
        const submissionDoc = await getDoc(doc(db, 'submissions', submissionId));
        if (!submissionDoc.exists()) throw new Error('Submission not found');
        setSubmission({ id: submissionDoc.id, ...submissionDoc.data() });

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [examId, submissionId]);

  if (loading) {
    return <LoadingSpinner size="lg" />;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">
          Review: {exam?.examName}
        </h1>

        <div className="mb-8 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Your Score</h2>
          <div className="flex items-center space-x-4">
            <div className="text-4xl font-bold text-blue-600">
              {submission?.score}%
            </div>
            <div>
              {submission?.score >= 70 ? (
                <span className="text-green-600">Passed</span>
              ) : (
                <span className="text-red-600">Needs Improvement</span>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {exam?.questions?.map((question, index) => {
            const userAnswer = submission?.answers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;

            return (
              <div 
                key={question.id} 
                className={`p-4 border rounded-lg ${
                  isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium">
                    {index + 1}. {question.text}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded ${
                    isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium">Your answer: {userAnswer || 'Not answered'}</p>
                  {!isCorrect && (
                    <p className="text-sm font-medium">Correct answer: {question.correctAnswer}</p>
                  )}
                </div>

                {question.explanation && (
                  <div className="mt-3 p-3 bg-gray-100 rounded text-sm">
                    <p className="font-medium">Explanation:</p>
                    <p>{question.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ExamReview;

