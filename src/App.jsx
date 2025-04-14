import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';

// Lazy load components
const Home = React.lazy(() => import('./components/Home'));
const Login = React.lazy(() => import('./components/Login'));
const ExamList = React.lazy(() => import('./components/ExamList'));
const ExamDetail = React.lazy(() => import('./components/ExamDetail'));
const TakeExam = React.lazy(() => import('./components/TakeExam'));
const ExamResult = React.lazy(() => import('./components/ExamResult'));
const CreateExam = React.lazy(() => import('./components/CreateExam'));
const AdminTools = React.lazy(() => import('./components/AdminTools'));
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard'));
const Results = React.lazy(() => import('./components/Results'));
const StudyMaterials = React.lazy(() => import('./components/StudyMaterials'));

const App = () => {
  const [user, loading, error] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const adminDoc = await getDoc(doc(db, 'admins', user.uid));
        setIsAdmin(adminDoc.exists());
      }
    };
    checkAdminStatus();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const AdminRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    if (!isAdmin) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {user && <Header isAdmin={isAdmin} />}
        <div className="container mx-auto px-4 py-8">
          <Suspense fallback={
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner size="lg" />
            </div>
          }>
            <Routes>
              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
              <Route path="/exam-list" element={<ProtectedRoute><ExamList /></ProtectedRoute>} />
              <Route path="/exam/:examId" element={<ProtectedRoute><ExamDetail /></ProtectedRoute>} />
              <Route path="/take-exam/:examId" element={<ProtectedRoute><TakeExam /></ProtectedRoute>} />
              <Route path="/exam-result/:examId" element={<ProtectedRoute><ExamResult /></ProtectedRoute>} />
              <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
              <Route path="/study-materials" element={<ProtectedRoute><StudyMaterials /></ProtectedRoute>} />
              <Route path="/create-exam" element={<AdminRoute><CreateExam /></AdminRoute>} />
              <Route path="/admin-tools" element={<AdminRoute><AdminTools /></AdminRoute>} />
              <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
        </div>
        <ToastContainer position="bottom-right" autoClose={5000} />
      </div>
    </ErrorBoundary>
  );
};

export default App;
/*import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Lazy load components
const Home = React.lazy(() => import('./components/Home'));
const Login = React.lazy(() => import('./components/Login'));
const CreateExam = React.lazy(() => import('./components/CreateExam'));
const ExamList = React.lazy(() => import('./components/ExamList'));
const ExamDetail = React.lazy(() => import('./components/ExamDetail'));
const TakeExam = React.lazy(() => import('./components/TakeExam'));
const ExamResult = React.lazy(() => import('./components/ExamResult'));
const AdminTools = React.lazy(() => import('./components/AdminTools'));
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard'));
const Header = React.lazy(() => import('./components/Header'));

const App = () => {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const adminDoc = await getDoc(doc(db, 'admins', user.uid));
        setIsAdmin(adminDoc.exists());
      }
    };
    checkAdminStatus();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  const AdminRoute = ({ children }) => {
    if (!user) return <Navigate to="/login" />;
    if (!isAdmin) return <Navigate to="/" />;
    return children;
  };

  const ProtectedRoute = ({ children }) => {
    if (!user) return <Navigate to="/login" />;
    return children;
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
        {user && <Header isAdmin={isAdmin} />}
        
        <div className="container mx-auto px-4 py-8">
          <Suspense fallback={
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner size="lg" />
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
              
              <Route path="/exam-list" element={
                <ProtectedRoute>
                  <ExamList />
                </ProtectedRoute>
              } />
              
              <Route path="/exam/:examId" element={
                <ProtectedRoute>
                  <ExamDetail />
                </ProtectedRoute>
              } />
              
              <Route path="/take-exam/:examId" element={
                <ProtectedRoute>
                  <TakeExam />
                </ProtectedRoute>
              } />
              
              <Route path="/exam-result/:examId" element={
                <ProtectedRoute>
                  <ExamResult />
                </ProtectedRoute>
              } />
              
              <Route path="/create-exam" element={
                <AdminRoute>
                  <CreateExam />
                </AdminRoute>
              } />
              
              <Route path="/admin-tools" element={
                <AdminRoute>
                  <AdminTools />
                </AdminRoute>
              } />
              
              <Route path="/admin-dashboard" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
        </div>
        
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </ErrorBoundary>
  );
};

export default App;

*/