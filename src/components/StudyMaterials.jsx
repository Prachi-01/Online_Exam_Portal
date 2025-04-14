import React from 'react';
import { BookOpenIcon, DocumentTextIcon, FilmIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const StudyMaterial = () => {
  const navigate = useNavigate();
  
  const materials = [
    {
      title: "Physics Fundamentals",
      type: "PDF Guide",
      icon: DocumentTextIcon,
      color: "bg-blue-100 text-blue-600",
      description: "Comprehensive guide covering all basic physics concepts",
      action: () => window.open('/physics-fundamentals.pdf', '_blank')
    },
    {
      title: "Mathematics Formulas",
      type: "Cheat Sheet",
      icon: BookOpenIcon,
      color: "bg-purple-100 text-purple-600",
      description: "Essential formulas for algebra, geometry, and calculus",
      action: () => window.open('/math-formulas.pdf', '_blank')
    },
    {
      title: "Chemistry Experiments",
      type: "Video Series",
      icon: FilmIcon,
      color: "bg-green-100 text-green-600",
      description: "Step-by-step laboratory experiment demonstrations",
      action: () => navigate('/chemistry-videos')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Study Materials</h1>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Back to Home
          </button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {materials.map((material, index) => {
            const Icon = material.icon;
            return (
              <div 
                key={index} 
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                onClick={material.action}
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 rounded-md p-3 ${material.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900">{material.title}</h3>
                      <p className="text-sm text-gray-500">{material.type}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-600">{material.description}</p>
                </div>
                <div className="px-4 py-4 bg-gray-50 text-right">
                  <span className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    View Resource
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudyMaterial;