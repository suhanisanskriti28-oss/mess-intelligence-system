export const createComplaint = async (title, description, category, authorId, authorName) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newComplaint = {
        id: Date.now().toString(),
        title,
        description,
        category,
        authorId,
        authorName,
        votes: {},
        voteCount: 0,
        status: 'open',
        createdAt: { toDate: () => new Date() } // Mocking Firebase Timestamp
      };

      const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
      complaints.push({ ...newComplaint, createdAt: Date.now() }); // save raw timestamp to storage
      localStorage.setItem('complaints', JSON.stringify(complaints));

      resolve({ success: true, id: newComplaint.id });
    }, 500);
  });
};

export const getComplaints = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
      // Re-add the mock toDate function for compatibility with components
      const formatted = complaints.map(c => ({
        ...c,
        createdAt: typeof c.createdAt === 'number' 
          ? { toDate: () => new Date(c.createdAt) } 
          : { toDate: () => new Date() }
      }));
      // Sort desc
      formatted.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
      resolve(formatted);
    }, 200);
  });
};

export const voteOnComplaint = async (complaintId, userId, voteValue) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
      const complaintIndex = complaints.findIndex(c => c.id === complaintId);
      
      if (complaintIndex !== -1) {
        const data = complaints[complaintIndex];
        const currentVotes = data.votes || {};
        let newVoteCount = data.voteCount || 0;
        const previousUserVote = currentVotes[userId] || 0;
        
        if (previousUserVote === voteValue) {
          newVoteCount -= voteValue;
          currentVotes[userId] = 0;
        } else {
          newVoteCount = newVoteCount - previousUserVote + voteValue;
          currentVotes[userId] = voteValue;
        }
        
        data.votes = currentVotes;
        data.voteCount = newVoteCount;
        complaints[complaintIndex] = data;
        
        localStorage.setItem('complaints', JSON.stringify(complaints));
        resolve({ success: true, newVoteCount, newVotes: currentVotes });
      } else {
        resolve({ success: false, error: "Complaint not found" });
      }
    }, 200);
  });
};

export const markComplaintResolved = async (complaintId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
      const complaintIndex = complaints.findIndex(c => c.id === complaintId);
      
      if (complaintIndex !== -1) {
        complaints[complaintIndex].status = 'resolved';
        localStorage.setItem('complaints', JSON.stringify(complaints));
        resolve({ success: true });
      } else {
        resolve({ success: false, error: "Complaint not found" });
      }
    }, 200);
  });
};
