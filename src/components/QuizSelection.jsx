import { useState } from "react";
import { useNavigate } from "react-router-dom";

function QuizSelection() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubtopics, setSelectedSubtopics] = useState([]);

  const quizCategories = {
    dsa: {
      title: "DSA Quiz", 
      color: "bg-black",
      hoverColor: "hover:bg-black-600",
      textColor: "text-blackj-500",
      subtopics: ["Arrays", "Strings", "Linked Lists", "Trees", "Graphs", "Sorting", "Searching", "Dynamic Programming", "Recursion", "Stack & Queue"]
    },
    development: {
      title: "Development Quiz",
      color: "bg-black",
      hoverColor: "hover:bg-black-600",
      textColor: "text-blackj-500",
      subtopics: ["React", "Node.js", "JavaScript", "TypeScript", "HTML/CSS", "REST APIs", "MongoDB", "PostgreSQL", "Git", "Docker"]
    },
    sql: {
      title: "SQL Quiz",
      color: "bg-black",
      hoverColor: "hover:bg-black-600",
      textColor: "text-blackj-500",
      subtopics: ["SELECT Queries", "JOIN Operations", "Aggregate Functions", "Subqueries", "Indexes", "Transactions", "Stored Procedures", "Views", "Normalization", "Database Design"]
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubtopics([]);
  };

  const handleSubtopicToggle = (subtopic) => {
    setSelectedSubtopics(prev => 
      prev.includes(subtopic)
        ? prev.filter(s => s !== subtopic)
        : [...prev, subtopic]
    );
  };

  const handleStartQuiz = () => {
    if (selectedSubtopics.length === 0) {
      alert("Please select at least one subtopic!");
      return;
    }

    navigate("/quiz/test", {
      state: {
        category: selectedCategory,
        subtopics: selectedSubtopics
      }
    });
  };

  const handleBack = () => {
    if (selectedCategory) {
      setSelectedCategory(null);
      setSelectedSubtopics([]);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br  py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={handleBack}
          className="mb-8 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-300 font-semibold"
        >
          ← Back
        </button>

        <h1 className="text-5xl font-bold text-black text-center mb-12">
          Choose Your Quiz
        </h1>

        {!selectedCategory ? (
          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(quizCategories).map(([key, category]) => (
              <div
                key={key}
                onClick={() => handleCategoryClick(key)}
                className={`bg-white rounded-3xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105}`}
              >
                <div className={`text-7xl mb-6 ${category.textColor}`}>
                  {category.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{category.title}</h2>
                {/* <p className="text-gray-600 mb-6">{category.subtopics.length} topics available</p> */}
                <button
                  className={`w-full ${category.hoverColor} text-black py-3 font-semibold transition-all duration-300`}
                >
                  Select 
                </button> 
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8">
            <div className="text-center mb-8">
              <span className="text-7xl mb-4 inline-block">
                {quizCategories[selectedCategory].icon}
              </span>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{quizCategories[selectedCategory].title}</h2>
              <p className="text-gray-600">Select subtopics you want to be tested on</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {quizCategories[selectedCategory].subtopics.map((subtopic) => (
                <div
                  key={subtopic}
                  onClick={() => handleSubtopicToggle(subtopic)}
                  className={`px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-300 font-medium text-center ${
                    selectedSubtopics.includes(subtopic)
                      ? `${quizCategories[selectedCategory].color} text-white border-transparent`
                      : `bg-white ${quizCategories[selectedCategory].borderColor} ${quizCategories[selectedCategory].textColor} hover:bg-gray-50`
                  }`}
                >
                  {subtopic}
                  {selectedSubtopics.includes(subtopic) && (
                    <span className="ml-2">✓</span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-6 border-t-2">
              <div className="text-lg font-semibold text-gray-700">
                {selectedSubtopics.length} topic(s) selected
              </div>
              <button
                onClick={handleStartQuiz}
                disabled={selectedSubtopics.length === 0}
                className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                  selectedSubtopics.length > 0
                    ? `${quizCategories[selectedCategory].color} ${quizCategories[selectedCategory].hoverColor} text-white hover:shadow-lg`
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Start Quiz ({selectedSubtopics.length} topics)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizSelection;
