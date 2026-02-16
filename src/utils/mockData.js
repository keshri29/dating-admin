export const mockLogin = async (email, password) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (email === 'admin@example.com' && password === 'admin123') {
    return {
      user: {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'Super Admin',
        avatar: null,
      },
      token: 'mock-jwt-token',
    };
  }
  
  throw new Error('Invalid credentials');
};

export const mockDashboardData = {
  totalUsers: 15420,
  activeUsers: 3241,
  pendingKYC: 156,
  reportedContent: 43,
  pendingEvents: 27,
  userGrowth: [
    { date: '2024-01', users: 12000 },
    { date: '2024-02', users: 13200 },
    { date: '2024-03', users: 14100 },
    { date: '2024-04', users: 14800 },
    { date: '2024-05', users: 15200 },
    { date: '2024-06', users: 15420 },
  ],
  postsModeration: [
    { date: '2024-01', posts: 450, moderated: 23 },
    { date: '2024-02', posts: 520, moderated: 31 },
    { date: '2024-03', posts: 480, moderated: 28 },
    { date: '2024-04', posts: 610, moderated: 42 },
    { date: '2024-05', posts: 590, moderated: 35 },
    { date: '2024-06', posts: 630, moderated: 38 },
  ],
  alerts: [
    {
      title: 'High number of reports',
      description: '15 new reports in the last hour',
      severity: 'high',
    },
    {
      title: 'KYC backlog',
      description: '156 pending KYC requests',
      severity: 'medium',
    },
    {
      title: 'Spike in signups',
      description: '250 new users in the last 24 hours',
      severity: 'low',
    },
  ],
};

export const mockUsers = Array(50).fill(null).map((_, index) => ({
  id: `user-${index + 1}`,
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  phone: `+1 234-567-${String(index + 1).padStart(4, '0')}`,
  status: ['active', 'suspended', 'deleted'][Math.floor(Math.random() * 3)],
  kycStatus: ['verified', 'pending', 'rejected'][Math.floor(Math.random() * 3)],
  signupDate: new Date(2024, Math.floor(Math.random() * 6), Math.floor(Math.random() * 28) + 1).toISOString(),
  lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  profilePhoto: null,
}));

export const mockKYCRequests = Array(20).fill(null).map((_, index) => ({
  id: `kyc-${index + 1}`,
  userId: `user-${index + 1}`,
  userName: `User ${index + 1}`,
  submissionDate: new Date(2024, Math.floor(Math.random() * 6), Math.floor(Math.random() * 28) + 1).toISOString(),
  documentType: ['Passport', 'Driver License', 'National ID'][Math.floor(Math.random() * 3)],
  status: ['pending', 'approved', 'rejected'][Math.floor(Math.random() * 3)],
  documents: {
    idDocument: 'https://example.com/doc.jpg',
    selfie: 'https://example.com/selfie.jpg',
  },
  personalDetails: {
    fullName: `User ${index + 1}`,
    dateOfBirth: '1990-01-01',
    address: '123 Main St, City, Country',
  },
}));

export const mockReports = Array(15).fill(null).map((_, index) => ({
  id: `report-${index + 1}`,
  contentType: ['post', 'message', 'profile'][Math.floor(Math.random() * 3)],
  contentId: `content-${index + 1}`,
  reporterId: `user-${Math.floor(Math.random() * 50) + 1}`,
  reporterName: `User ${Math.floor(Math.random() * 50) + 1}`,
  reason: ['Spam', 'Harassment', 'Inappropriate content', 'False information'][Math.floor(Math.random() * 4)],
  timestamp: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString(),
  status: ['pending', 'reviewed', 'dismissed', 'actioned'][Math.floor(Math.random() * 4)],
  description: 'This content violates platform guidelines...',
}));

export const mockEvents = Array(25).fill(null).map((_, index) => ({
  id: `event-${index + 1}`,
  title: `Event ${index + 1}`,
  organizer: `Organizer ${Math.floor(Math.random() * 10) + 1}`,
  category: ['Conference', 'Workshop', 'Meetup', 'Webinar'][Math.floor(Math.random() * 4)],
  date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
  time: '19:00',
  location: 'Online',
  status: ['pending', 'approved', 'rejected'][Math.floor(Math.random() * 3)],
  description: 'Event description goes here...',
  media: 'https://example.com/event.jpg',
}));