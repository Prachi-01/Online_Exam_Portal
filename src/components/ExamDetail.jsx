import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig'; // Added auth import
import LoadingSpinner from './LoadingSpinner';

const ExamDetail = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const examDoc = await getDoc(doc(db, 'exams', examId));
        if (!examDoc.exists()) {
          throw new Error('Exam not found');
        }
        setExam({ id: examDoc.id, ...examDoc.data() });
        setError(null);
      } catch (err) {
        console.error("Error loading exam:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [examId]);

  if (loading) return <LoadingSpinner size="lg" />;

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 text-center">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={() => navigate('/exam-list')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Exams
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          ← Back
        </button>
        
        <h1 className="text-2xl font-bold mb-2">{exam?.examName}</h1>
        <p className="text-gray-600 mb-4">{exam?.description}</p>
        
        <div className="flex space-x-4">
          <button
            onClick={() => navigate(`/take-exam/${exam.id}`)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Start Exam
          </button>
          {exam?.createdBy === auth.currentUser?.uid && (
            <button
              onClick={() => navigate(`/edit-exam/${exam.id}`)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit Exam
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamDetail;