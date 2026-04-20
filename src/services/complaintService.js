import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  serverTimestamp,
  getDoc
} from 'firebase/firestore';
import { db } from './firebase';

export const submitComplaint = async (userId, title, description, category, authorName) => {
  try {
    const newComplaint = {
      userId,
      title,
      description,
      category,
      authorName,
      status: 'open',
      voteCount: 0,
      votes: {}, // Object map: { userId: voteValue (1 or -1) }
      createdAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'complaints'), newComplaint);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error submitting complaint:", error);
    return { success: false, error };
  }
};

export const fetchAllComplaints = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'complaints'));
    const complaints = [];
    querySnapshot.forEach((doc) => {
      complaints.push({ id: doc.id, ...doc.data() });
    });
    
    // Process local timestamps if serverTimestamp hasn't resolved yet
    complaints.sort((a, b) => {
      const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : Date.now();
      const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : Date.now();
      return timeB - timeA; // Descending
    });
    
    return complaints;
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return [];
  }
};

export const voteComplaint = async (complaintId, userId, voteValue) => {
  try {
    const complaintRef = doc(db, 'complaints', complaintId);
    const complaintSnap = await getDoc(complaintRef);
    
    if (complaintSnap.exists()) {
      const data = complaintSnap.data();
      const currentVotes = data.votes || {};
      const previousVote = currentVotes[userId] || 0;
      
      let newVoteCount = data.voteCount || 0;
      
      // Remove previous vote weight, add new vote weight
      newVoteCount = newVoteCount - previousVote + voteValue;
      
      const newVotes = { ...currentVotes, [userId]: voteValue };
      
      await updateDoc(complaintRef, {
        voteCount: newVoteCount,
        votes: newVotes
      });
      return { success: true, voteCount: newVoteCount, votes: newVotes };
    }
    return { success: false };
  } catch (error) {
    console.error("Error voting:", error);
    return { success: false, error };
  }
};
