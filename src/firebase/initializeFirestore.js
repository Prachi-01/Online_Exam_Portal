import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

const initializeCollections = async () => {
  // Check if already initialized
  const examsSnapshot = await getDocs(collection(db, 'exams'));
  if (!examsSnapshot.empty) return;

  // 1. Create sample exam
  await setDoc(doc(collection(db, 'exams')), {
    examName: "Physics Practice Test",
    description: "Covers basic mechanics",
    duration: 30,
    createdBy: "system",
    createdAt: new Date(),
    questions: [
      {
        id: "q1",
        text: "What is the unit of force?",
        options: ["Newton", "Joule", "Watt"],
        correctAnswer: "Newton",
        points: 2
      }
    ]
  });

  // 2. Create admin user (replace with actual admin UID)
  await setDoc(doc(db, 'admins', 'ADMIN_USER_UID_HERE'), {
    assignedAt: new Date()
  });

  console.log("Firestore collections initialized!");
};

export default initializeCollections;