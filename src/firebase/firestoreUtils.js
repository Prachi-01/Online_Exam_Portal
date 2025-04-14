import { 
  collection, doc, getDoc, getDocs, 
  addDoc, setDoc, updateDoc, deleteDoc,
  query, where, orderBy, writeBatch,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebaseConfig';

export const getDocument = async (collectionName, docId) => {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const getAllDocuments = async (collectionName, conditions = []) => {
  let q = query(collection(db, collectionName));
  conditions.forEach(([field, op, value]) => {
    q = query(q, where(field, op, value));
  });
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const examUtils = {
  createExam: async (examData, creatorId) => {
    if (!examData.questions || examData.questions.length === 0) {
      throw new Error('Exam must contain at least one question');
    }

    const examWithMetadata = {
      ...examData,
      createdBy: creatorId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isPublished: false
    };

    const docRef = await addDoc(collection(db, 'exams'), examWithMetadata);
    return { id: docRef.id, ...examWithMetadata };
  },

  submitExamAnswers: async (examId, userId, answers) => {
    const batch = writeBatch(db);
    
    const submissionRef = doc(collection(db, 'submissions'));
    batch.set(submissionRef, {
      examId,
      userId,
      answers,
      submittedAt: serverTimestamp(),
      isGraded: false
    });

    const userExamRef = doc(db, 'userExams', `${userId}_${examId}`);
    batch.set(userExamRef, {
      status: 'submitted',
      lastActivity: serverTimestamp()
    }, { merge: true });

    await batch.commit();
    return submissionRef.id;
  }
};

export const adminUtils = {
  verifyAdmin: async (userId) => {
    const adminDoc = await getDoc(doc(db, 'admins', userId));
    return adminDoc.exists();
  }
};