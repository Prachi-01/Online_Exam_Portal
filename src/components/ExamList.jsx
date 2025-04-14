import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { AcademicCapIcon, ClockIcon, CalendarIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const ExamList = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'exams'));
        const examsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate()?.toLocaleDateString() || 'Unknown'
        }));
        setExams(examsData);
      } catch (err) {
        setError('Failed to load exams. Please try again later.');
        console.error("Error fetching exams:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" /> Back to Home
          </button>
          {auth.currentUser && (
            <button
              onClick={() => navigate('/create-exam')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Create New Exam
            </button>
          )}
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Available Exams</h1>
        
        {error ? (
          <div className="rounded-md bg-red-50 p-4 mb-8">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        ) : exams.length === 0 ? (
          <div className="text-center bg-white py-16 px-6 rounded-lg shadow">
            <AcademicCapIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No exams available</h3>
            <p className="mt-1 text-sm text-gray-500">
              There are currently no published exams. Check back later or create one if you're an admin.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {exams.map((exam) => (
              <div key={exam.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">{exam.examName}</h3>
                  <p className="mt-2 text-sm text-gray-600">{exam.description}</p>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    <span>{exam.duration} minutes</span>
                  </div>
                </div>
                <div className="px-4 py-4 bg-gray-50 flex justify-between">
                  <button
                    onClick={() => navigate(`/exam/${exam.id}`)}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => navigate(`/take-exam/${exam.id}`)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Take Exam
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamList;
