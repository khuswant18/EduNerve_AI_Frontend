import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleQuizClick = () => {
    navigate("/quiz");
  };

  const handleInterviewClick = () => {
    navigate("/interview");
  };

  return (
    <div className="min-h-screen bg-linear-to-br">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xl md:text-2xl text-white/90 font-light">
            Your AI-powered learning companion for interviews and quizzes
          </p>
        </div>

        <div className="flex gap-8 max-w-5xl mx-auto">
          <div 
            onClick={handleQuizClick}
            className=""
          >

            <button className="cursor-pointer w-full bg-linear-to-r text-black py-4 font-semibold text-lg">
              Start Quiz
            </button>
          </div>

          <div 
            onClick={handleInterviewClick}
            className="rounded-3xl"
          >
            
            <button className="cursor-pointer w-full bg-linear-to-r  text-black py-4 font-semibold text-lg">
              Start Interview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
