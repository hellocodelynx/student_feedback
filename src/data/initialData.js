// Initial Mock Data reflecting Stitch screens for MCA Student Feedback Portal

export const initialStudentProfile = {
  name: "Rahul Sharma",
  rollNo: "MCA2023048",
  program: "Master of Computer Applications (MCA)",
  department: "Department of Computer Applications",
  institution: "University Institute of Technology",
  semester: "Semester 3",
  academicYear: "2024–2025",
  cgpa: "8.84",
  attendance: "92.4%",
  email: "rahul.sharma@campus.edu.in",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdbB13DX3S6LDaREWeGpCABXppkGdViFT1u8amho_yeZgCLFJM5PYtlkBWOHFNUDAAuQpSKfGZWOk5f8NJqfE-YFspizpNYhq-rjXLVlPTEPi2ZskqIClb3RiGf0Mml3ImI9sSE-iz44vfpq3kL3sqBzZFqHr_g4sAmXWFvI0D7c2d4FHSswcEn3E3cwUlI9CBM1wBmfYAqnXfYyeIfcXPWgFxEoeIadwAQLaR7KZZ75iHhGJuYLDb",
  evaluationDeadline: "Nov 20, 2024",
  daysRemaining: 4,
};

export const initialCourses = [
  {
    id: "mca-301",
    code: "MCA-301",
    name: "PHP Programming",
    subtitle: "Full Stack Web Architecture & OOP Foundations",
    type: "Theory",
    credits: 4,
    instructor: {
      name: "Prof. Arvind Swaminathan",
      title: "Senior Professor, Web Technologies",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbhRGJzmqg22jeuSrstQm86Mh3WmUrd-1qM0b__kVXcoJsFvGhvOM-OJs6jOveToON6geY0oX2vcmX6pan0efKxbI_Nf5uMKQlySUZ8bBFzVBJoHbpc6cn8uTSkZbzFADD8h_jeM8dUNlTc3mIR43rzy1JeWwWmCy_Xva39dTZYXxmuWrHhce4Q9vpDjpymfodCekiYDTwSAwXeu-BKQJyF2Lxj6a2HE5XbIrsO52rRo3QHyuPct-E",
      cabin: "Room 402, CS Block"
    },
    status: "pending", // "pending" | "completed"
    deadline: "Nov 20, 2024",
    submissionDetails: null
  },
  {
    id: "mca-302",
    code: "MCA-302",
    name: "Java Programming",
    subtitle: "Enterprise Java, Spring Boot & Concurrency",
    type: "Theory",
    credits: 4,
    instructor: {
      name: "Dr. Sunita Kulkarni",
      title: "Professor, Computer Science",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEi4-34_WAJkn4NLYVof5L1lm4RXala7jpEXkh4-aqm0laVlt3NRbauGtQVYEtVOrflGLwtThUhQl_-uffC9IHqQEkoqytV9vG7t65oE7-fBFj39U0cRUVapX0-juqzSyuHCHfdykKNR1VL-eobZqLKVc-9FwXnpSAdfKbGiYf37_ftgU2UDqOW2Rg_D-cMqjll-KCJEqlk-nOxO25TAUcfSKkDDYpvLH7g4in7uKK80qAasRSVZY0",
      cabin: "Room 305, Tech Tower"
    },
    status: "completed",
    deadline: "Nov 20, 2024",
    submissionDetails: {
      date: "Nov 12, 2024",
      time: "14:32 IST",
      rating: 4.8,
      isAnonymous: false,
      scores: [5, 5, 4, 5, 5, 5, 4, 5],
      comments: "Exceptional lectures on Spring Boot microservices and multithreading. Code samples shared on GitHub repository were very thorough and easy to follow."
    }
  },
  {
    id: "mca-303",
    code: "MCA-303",
    name: "Advanced Database Systems",
    subtitle: "Query Optimization, Indexing & Distributed NoSQL",
    type: "Theory",
    credits: 4,
    instructor: {
      name: "Prof. Rajesh Mishra",
      title: "Associate Professor, Data Systems",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
      cabin: "Room 214, CS Annex"
    },
    status: "completed",
    deadline: "Nov 20, 2024",
    submissionDetails: {
      date: "Nov 10, 2024",
      time: "11:15 IST",
      rating: 4.6,
      isAnonymous: true,
      scores: [5, 4, 4, 5, 4, 5, 5, 5],
      comments: "In-depth coverage of B+ Trees and Sharding strategies. Practical query profiling exercises were particularly beneficial for placement preparation."
    }
  },
  {
    id: "mca-304",
    code: "MCA-304",
    name: "Web Technologies Lab",
    subtitle: "Hands-on Fullstack MVC Frameworks & REST APIs",
    type: "Practical",
    credits: 2,
    instructor: {
      name: "Prof. Neha Deshmukh",
      title: "Assistant Professor, Lab Coordinator",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
      cabin: "Software Lab 3"
    },
    status: "pending",
    deadline: "Nov 20, 2024",
    submissionDetails: null
  },
  {
    id: "mca-305",
    code: "MCA-305",
    name: "Data Structures & Algorithms",
    subtitle: "Advanced Dynamic Programming & Graph Algorithms",
    type: "Theory",
    credits: 4,
    instructor: {
      name: "Dr. K. R. Ramanathan",
      title: "Professor & Chair of Algorithms",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
      cabin: "Room 101, Main Block"
    },
    status: "completed",
    deadline: "Nov 20, 2024",
    submissionDetails: {
      date: "Nov 05, 2024",
      time: "16:45 IST",
      rating: 4.9,
      isAnonymous: false,
      scores: [5, 5, 5, 5, 5, 5, 4, 5],
      comments: "The gold standard of theoretical teaching. Dr. Ramanathan simplifies complex NP-complete proofs with absolute clarity."
    }
  },
  {
    id: "mca-306",
    code: "MCA-306",
    name: "Cloud Computing & DevOps",
    subtitle: "Docker Containers, Kubernetes & AWS Architecture",
    type: "Theory",
    credits: 3,
    instructor: {
      name: "Prof. Priya Sengupta",
      title: "Visiting Lead Architect, Cloud Systems",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80",
      cabin: "Cloud Innovation Hub"
    },
    status: "completed",
    deadline: "Nov 20, 2024",
    submissionDetails: {
      date: "Nov 02, 2024",
      time: "09:30 IST",
      rating: 4.7,
      isAnonymous: true,
      scores: [5, 5, 4, 4, 5, 5, 5, 4],
      comments: "Real-world production case studies of Kubernetes failovers and CI/CD pipelines. Very engaging lecture sessions."
    }
  }
];

export const evaluationCriteria = [
  {
    id: 1,
    title: "Clarity of Teaching",
    description: "Clarity of concepts explained during lectures, data structures, and architectural patterns.",
    icon: "psychology"
  },
  {
    id: 2,
    title: "Subject Knowledge & Depth",
    description: "Proficiency in contemporary software engineering paradigms, answering doubts with academic rigor.",
    icon: "auto_stories"
  },
  {
    id: 3,
    title: "Syllabus Coverage & Pace",
    description: "Uniform syllabus progression according to university academic calendar without rushed deliveries.",
    icon: "calendar_today"
  },
  {
    id: 4,
    title: "Practical Lab Demonstrations",
    description: "Live debugging, real-world source code walk-throughs, and interactive laboratory guidance.",
    icon: "terminal"
  },
  {
    id: 5,
    title: "Query Resolution & Accessibility",
    description: "Instructor availability during office hours and prompt resolution of technical student inquiries.",
    icon: "support_agent"
  },
  {
    id: 6,
    title: "Timely Evaluation & Fair Assessment",
    description: "Prompt feedback on internal assessments, assignments, coding tests, and constructive code reviews.",
    icon: "rule"
  },
  {
    id: 7,
    title: "Quality of Study Materials",
    description: "Relevance of shared slide decks, research papers, GitHub repos, and textbook references.",
    icon: "folder_zip"
  },
  {
    id: 8,
    title: "Overall Course Engagement",
    description: "Ability to inspire intellectual curiosity and maintain high classroom energy and attendance.",
    icon: "insights"
  }
];

export const facultyAnalyticsData = {
  overallSatisfaction: "91.8%",
  averageRating: "4.74",
  totalResponses: 142,
  responseRate: "88.75%",
  sentimentClusters: {
    positive: "84.2%",
    neutral: "11.6%",
    flagged: "4.2%"
  },
  criteriaBreakdown: [
    { name: "Clarity of Teaching", score: 4.8, count: 142 },
    { name: "Subject Knowledge", score: 4.9, count: 142 },
    { name: "Syllabus Pace", score: 4.5, count: 142 },
    { name: "Practical Lab Work", score: 4.6, count: 142 },
    { name: "Query Resolution", score: 4.7, count: 142 },
    { name: "Fair Assessment", score: 4.9, count: 142 },
    { name: "Study Materials", score: 4.7, count: 142 },
    { name: "Course Engagement", score: 4.8, count: 142 }
  ],
  studentFeedbackFeed: [
    {
      id: "f1",
      course: "MCA-302 Java Programming",
      timestamp: "Today, 14:32",
      rating: 5.0,
      sentiment: "Positive",
      text: "The Spring Boot microservices assignments were industry-grade. The unit test frameworks helped me crack my technical internship interview!",
      tags: ["Microservices", "Industry Standards", "Great Labs"]
    },
    {
      id: "f2",
      course: "MCA-301 PHP Programming",
      timestamp: "Yesterday, 17:20",
      rating: 4.0,
      sentiment: "Positive",
      text: "Good OOP concepts in PHP 8.2. Requesting more sessions focused on Laravel security headers and JWT authentication.",
      tags: ["OOP", "Laravel", "Security"]
    },
    {
      id: "f3",
      course: "MCA-304 Web Technologies Lab",
      timestamp: "Nov 11, 2024",
      rating: 3.0,
      sentiment: "Neutral",
      text: "Lab infrastructure needs faster SSD machines. Code runs fine but Docker desktop hangs during local environment spin-up.",
      tags: ["Hardware", "Lab Equipment", "Docker"]
    },
    {
      id: "f4",
      course: "MCA-303 Advanced Database Systems",
      timestamp: "Nov 10, 2024",
      rating: 5.0,
      sentiment: "Positive",
      text: "Explain plans and indexing strategies were taught with exceptional precision. Loved the real-time query optimization challenges.",
      tags: ["Query Tuning", "NoSQL", "High Clarity"]
    }
  ]
};
