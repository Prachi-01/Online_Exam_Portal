// src/components/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import LoadingSpinner from './LoadingSpinner';
import { AcademicCapIcon, ChartBarIcon, BookOpenIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  if (loading) return <LoadingSpinner size="lg" />;
  if (!user) navigate('/login');

  const features = [
    {
      name: 'Take Exams',
      description: 'Test your knowledge with our timed exams and get immediate results',
      icon: AcademicCapIcon,
      action: () => navigate('/exam-list'),
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      name: 'View Results',
      description: 'Review your performance with detailed analytics and feedback',
      icon: ChartBarIcon,
      action: () => navigate('/results'),
      color: 'bg-green-100 text-green-600'
    },
    {
      name: 'Study Materials',
      description: 'Access curated resources to help you prepare for upcoming exams',
      icon: BookOpenIcon,
      action: () => navigate('/materials'),
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const upcomingExams = [
    {
      name: 'Final Physics Exam',
      date: `June 15, ${currentYear}`,
      time: '10:00 AM',
      duration: '90 minutes',
      color: 'border-blue-500'
    },
    {
      name: 'Mathematics Test',
      date: `June 18, ${currentYear}`,
      time: '2:00 PM',
      duration: '60 minutes',
      color: 'border-green-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Welcome back, <span className="text-indigo-600">{user?.displayName || 'Student'}!</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Ready for your next learning session?
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mb-12">
          {features.map((feature) => (
            <div
              key={feature.name}
              onClick={feature.action}
              className="cursor-pointer overflow-hidden rounded-lg bg-white shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="p-6">
                <div className={`flex items-center justify-center h-12 w-12 rounded-md ${feature.color}`}>
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">{feature.name}</h3>
                <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Get started
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Upcoming Exams</h3>
          </div>
          <div className="bg-white divide-y divide-gray-200">
            {upcomingExams.map((exam, idx) => (
              <div key={idx} className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-l-4 ${exam.color}`}>
                <dt className="text-sm font-medium text-gray-500">Exam</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-semibold">
                  {exam.name}
                </dd>
                <dt className="text-sm font-medium text-gray-500">Date & Time</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {exam.date} • {exam.time}
                </dd>
                <dt className="text-sm font-medium text-gray-500">Duration</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {exam.duration}
                </dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;