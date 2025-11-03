// Mock data for EduNerve AI platform

export const careerPaths = {
  "Software Engineer": [
    "Data Structures",
    "Algorithms",
    "System Design",
    "Object-Oriented Programming",
    "Database Management",
    "Web Development",
    "API Design",
    "Testing & Debugging",
  ],
  "Data Scientist": [
    "Statistics",
    "Machine Learning",
    "Python Programming",
    "Data Visualization",
    "SQL",
    "Deep Learning",
    "Feature Engineering",
    "Model Deployment",
  ],
  "Product Manager": [
    "Product Strategy",
    "User Research",
    "Agile Methodologies",
    "Roadmap Planning",
    "Stakeholder Management",
    "Market Analysis",
    "Metrics & Analytics",
    "Communication Skills",
  ],
  "UI/UX Designer": [
    "Design Principles",
    "User Research",
    "Wireframing",
    "Prototyping",
    "Visual Design",
    "Interaction Design",
    "Usability Testing",
    "Design Systems",
  ],
}

export const learningGoals = [
  "Get job-ready in 3 months",
  "Improve technical skills",
  "Prepare for interviews",
  "Learn new technologies",
  "Career transition",
  "Skill enhancement",
]

export const content = {
  "Data Structures": {
    lms: {
      title: "Data Structures Fundamentals",
      description: "Master essential data structures for coding interviews",
      modules: [
        { id: 1, title: "Arrays & Strings", duration: "45 min", completed: false },
        { id: 2, title: "Linked Lists", duration: "60 min", completed: false },
        { id: 3, title: "Stacks & Queues", duration: "50 min", completed: false },
        { id: 4, title: "Trees & Graphs", duration: "90 min", completed: false },
      ],
    },
    quiz: {
      title: "Data Structures Quiz",
      questions: [
        {
          id: 1,
          question: "What is the time complexity of accessing an element in an array by index?",
          options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
          correct: 0,
        },
        {
          id: 2,
          question: "Which data structure uses LIFO (Last In First Out)?",
          options: ["Queue", "Stack", "Array", "Linked List"],
          correct: 1,
        },
        {
          id: 3,
          question: "What is the best case time complexity for searching in a Binary Search Tree?",
          options: ["O(n)", "O(1)", "O(log n)", "O(n log n)"],
          correct: 2,
        },
      ],
    },
    interview: {
      title: "Data Structures Interview Prep",
      questions: [
        "Explain the difference between an array and a linked list.",
        "How would you implement a stack using queues?",
        "Describe how a hash table works and its time complexity.",
        "What is the difference between BFS and DFS?",
      ],
    },
  },
  Algorithms: {
    lms: {
      title: "Algorithm Design & Analysis",
      description: "Learn to design efficient algorithms",
      modules: [
        { id: 1, title: "Sorting Algorithms", duration: "60 min", completed: false },
        { id: 2, title: "Searching Algorithms", duration: "45 min", completed: false },
        { id: 3, title: "Dynamic Programming", duration: "90 min", completed: false },
        { id: 4, title: "Greedy Algorithms", duration: "75 min", completed: false },
      ],
    },
    quiz: {
      title: "Algorithms Quiz",
      questions: [
        {
          id: 1,
          question: "What is the average time complexity of Quick Sort?",
          options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
          correct: 1,
        },
        {
          id: 2,
          question: "Which algorithm uses divide and conquer strategy?",
          options: ["Bubble Sort", "Merge Sort", "Selection Sort", "Insertion Sort"],
          correct: 1,
        },
        {
          id: 3,
          question: "What is the space complexity of recursive Fibonacci?",
          options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
          correct: 1,
        },
      ],
    },
    interview: {
      title: "Algorithms Interview Prep",
      questions: [
        "Explain the difference between dynamic programming and greedy algorithms.",
        "How does binary search work? What are its prerequisites?",
        "Describe the merge sort algorithm and its time complexity.",
        "What is memoization and how does it optimize recursive algorithms?",
      ],
    },
  },
  "System Design": {
    lms: {
      title: "System Design Principles",
      description: "Design scalable distributed systems",
      modules: [
        { id: 1, title: "Scalability Basics", duration: "60 min", completed: false },
        { id: 2, title: "Load Balancing", duration: "50 min", completed: false },
        { id: 3, title: "Caching Strategies", duration: "55 min", completed: false },
        { id: 4, title: "Database Design", duration: "70 min", completed: false },
      ],
    },
    quiz: {
      title: "System Design Quiz",
      questions: [
        {
          id: 1,
          question: "What is horizontal scaling?",
          options: [
            "Adding more power to existing servers",
            "Adding more servers to the system",
            "Optimizing code performance",
            "Reducing database queries",
          ],
          correct: 1,
        },
        {
          id: 2,
          question: "Which caching strategy removes the least recently used item?",
          options: ["FIFO", "LIFO", "LRU", "LFU"],
          correct: 2,
        },
        {
          id: 3,
          question: "What is the CAP theorem?",
          options: [
            "Consistency, Availability, Partition tolerance",
            "Cache, API, Performance",
            "Compute, Allocate, Process",
            "Create, Access, Persist",
          ],
          correct: 0,
        },
      ],
    },
    interview: {
      title: "System Design Interview Prep",
      questions: [
        "Design a URL shortening service like bit.ly",
        "How would you design a social media feed?",
        "Explain how you would design a distributed cache",
        "Design a rate limiting system for an API",
      ],
    },
  },
  "Machine Learning": {
    lms: {
      title: "Machine Learning Fundamentals",
      description: "Introduction to ML algorithms and concepts",
      modules: [
        { id: 1, title: "Supervised Learning", duration: "75 min", completed: false },
        { id: 2, title: "Unsupervised Learning", duration: "60 min", completed: false },
        { id: 3, title: "Neural Networks", duration: "90 min", completed: false },
        { id: 4, title: "Model Evaluation", duration: "50 min", completed: false },
      ],
    },
    quiz: {
      title: "Machine Learning Quiz",
      questions: [
        {
          id: 1,
          question: "What is overfitting in machine learning?",
          options: [
            "Model performs well on training data but poorly on test data",
            "Model performs poorly on both training and test data",
            "Model performs well on test data but poorly on training data",
            "Model has too few parameters",
          ],
          correct: 0,
        },
        {
          id: 2,
          question: "Which algorithm is used for classification?",
          options: ["Linear Regression", "K-Means", "Logistic Regression", "PCA"],
          correct: 2,
        },
        {
          id: 3,
          question: "What does the learning rate control in gradient descent?",
          options: ["Number of iterations", "Step size in parameter updates", "Number of features", "Batch size"],
          correct: 1,
        },
      ],
    },
    interview: {
      title: "Machine Learning Interview Prep",
      questions: [
        "Explain the bias-variance tradeoff",
        "What is the difference between L1 and L2 regularization?",
        "How does a decision tree work?",
        "Explain cross-validation and why it's important",
      ],
    },
  },
}
