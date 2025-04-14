import { useState } from 'react';
import { doc, setDoc, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { toast } from 'react-toastify';

const AdminTools = () => {
  const [email, setEmail] = useState('');
  const [uid, setUid] = useState('');
  const [message, setMessage] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchUsers = async () => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', searchEmail));
      const querySnapshot = await getDocs(q);
      setSearchResults(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      toast.error('Search failed: ' + error.message);
    }
  };

  const grantAdmin = async () => {
    try {
      if (!email || !uid) throw new Error('Both email and UID are required');

      await setDoc(doc(db, 'admins', uid), {
        email: email,
        assignedAt: serverTimestamp(),
        assignedBy: auth.currentUser.email,
        assignedById: auth.currentUser.uid
      });

      // Create audit log
      await setDoc(doc(collection(db, 'audit_logs')), {
        action: 'grant_admin',
        targetUser: email,
        performedBy: auth.currentUser.email,
        timestamp: serverTimestamp()
      });

      toast.success(`Admin privileges granted to ${email}`);
      setEmail('');
      setUid('');
    } catch (error) {
      toast.error('Error: ' + error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Admin Management Tools</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Grant Admin Privileges</h2>
          
          <div>
            <label className="block text-sm font-medium mb-1">User Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="user@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">User UID</label>
            <input
              type="text"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Paste user UID here"
            />
          </div>
          
          <button
            onClick={grantAdmin}
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Grant Admin Privileges
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Find User</h2>
          
          <div className="flex space-x-2">
            <input
              type="email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Search by email"
            />
            <button
              onClick={searchUsers}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Search
            </button>
          </div>

          {searchResults.length > 0 && (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">UID</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map(user => (
                    <tr key={user.id} className="border-t hover:bg-gray-50">
                      <td className="p-2">{user.email}</td>
                      <td className="p-2">
                        <button 
                          onClick={() => setUid(user.id)}
                          className="text-blue-500 hover:underline"
                        >
                          {user.id}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTools;