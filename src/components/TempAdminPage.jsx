// src/components/TempAdminPage.jsx
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const TempAdminPage = () => {
  const createAdminDoc = async () => {
    try {
      await setDoc(doc(db, 'admins', 'Bv8TUCy4C1VyrKsv3NWfZccOnyJ2'), {
        assignedAt: serverTimestamp(),
        assignedBy: 'manual',
        email: 'admin@example.com'
      });
      alert('Admin document created successfully!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md">
        <h2 className="text-xl font-bold mb-4">Temporary Admin Creator</h2>
        <button
          onClick={createAdminDoc}
          className="w-full py-2 bg-red-500 text-white rounded"
        >
          Create Admin Document
        </button>
      </div>
    </div>
  );
};

export default TempAdminPage;