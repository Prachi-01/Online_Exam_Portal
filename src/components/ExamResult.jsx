import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ExamResult = () => {
  const { examId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="max-w-md bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-xl font-bold text-red-500 mb-4">No Exam Results Available</h2>
          <button
            onClick={() => navigate('/exam-list')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Exams
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Result Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Exam Results</h1>
              <p className="mt-2 opacity-90">
                {state.score >= 70 ? 'Excellent performance!' : 'Keep practicing to improve!'}
              </p>
            </div>
            <span className="text-5xl">
              {state.score >= 70 ? '🎉' : '📝'}
            </span>
          </div>
        </div>

        {/* Main Result */}
        <div className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-48 h-48 mb-8 md:mb-0">
              <CircularProgressbar
                value={state.score}
                text={`${state.score}%`}
                styles={{
                  path: {
                    stroke: state.score >= 70 ? '#10B981' : '#EF4444',
                    strokeLinecap: 'round',
                  },
                  text: {
                    fill: '#1F2937',
                    fontSize: '28px',
                    fontWeight: 'bold',
                  },
                  trail: {
                    stroke: '#E5E7EB',
                  },
                }}
                strokeWidth={10}
              />
            </div>
            
            <div className="flex-1 md:pl-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800">Correct Answers</h3>
                  <p className="text-3xl font-bold text-blue-600">
                    {state.correctCount || 'N/A'}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800">Total Questions</h3>
                  <p className="text-3xl font-bold text-blue-600">
                    {state.totalQuestions || 'N/A'}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800">Time Taken</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {state.timeTaken || 'N/A'}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800">Date Completed</h3>
                  <p className="text-xl font-bold text-blue-600">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 bg-gray-50 border-t flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => navigate(`/exam/${examId}`)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow hover:shadow-md"
          >
            Review Exam Questions
          </button>
          <button
            onClick={() => navigate('/exam-list')}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors shadow hover:shadow-md"
          >
            Back to Exams List
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamResult;