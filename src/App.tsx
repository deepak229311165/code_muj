import React, { useState, useEffect } from 'react';
import { Brain, Code, Calculator, Puzzle, ChevronRight, Trophy, Clock, LogIn, UserPlus } from 'lucide-react';
import { problems } from './services/api';
import AuthModal from './components/AuthModal';
import CodeEditor from './components/CodeEditor';

interface Problem {
  _id: string;
  title: string;
  category: string;
  difficulty: string;
  description: string;
  timeEstimate: string;
  testCases: Array<{
    input: string;
    output: string;
  }>;
}

const categories = [
  { name: 'all', icon: Brain, label: 'All Problems' },
  { name: 'Algorithms', icon: Code, label: 'Algorithms' },
  { name: 'Mathematics', icon: Calculator, label: 'Mathematics' },
  { name: 'Logic', icon: Puzzle, label: 'Logic' }
];

const getDifficultyColor = (difficulty: string) => {
  switch(difficulty) {
    case 'Easy': return 'bg-green-200 text-green-900';
    case 'Medium': return 'bg-yellow-200 text-yellow-900';
    case 'Hard': return 'bg-red-200 text-red-900';
    default: return 'bg-gray-200 text-gray-900';
  }
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [problemsList, setProblemsList] = useState<Problem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setIsLoading(true);
      const response = await problems.getAll({
        category: selectedCategory !== 'all' ? selectedCategory : undefined
      });
      setProblemsList(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch problems');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, [selectedCategory]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const handleLogin = (token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleSolveProblem = async (problemId: string) => {
    try {
      await problems.update(problemId, { solved: true });
      fetchProblems();
    } catch (err) {
      console.error('Failed to update problem status:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-6 px-8 rounded-md shadow-md">
          <h1 className="text-4xl font-extrabold mb-2">CodeMUJ</h1>
          <p className="text-lg opacity-90">Enhance your analytical thinking with our curated set of problems</p>
        </div>
        
        <div className="flex gap-4">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          ) : (
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <LogIn className="w-4 h-4 mr-2" /> Login
            </button>
          )}
        </div>
      </div>

      {selectedProblem ? (
        <CodeEditor
          problem={selectedProblem}
          onSolve={handleSolveProblem}
        />
      ) : (
        <>
          {/* Category Buttons */}
          <div className="flex gap-3 overflow-x-auto pb-2 mb-6">
            {categories.map(({ name, icon: Icon, label }) => (
              <button
                key={name}
                onClick={() => setSelectedCategory(name)}
                className={`flex items-center px-4 py-2 rounded-md text-sm shadow-md transition-all duration-150 ${
                  selectedCategory === name 
                    ? 'bg-indigo-700 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" /> {label}
              </button>
            ))}
          </div>

          {/* Problems Grid */}
          {isLoading ? (
            <div className="text-center py-8">Loading problems...</div>
          ) : error ? (
            <div className="text-center text-red-600 py-8">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {problemsList.map((problem) => (
                <div key={problem._id} className="bg-white p-5 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">{problem.title}</h3>
                    <span className={`px-3 py-1 rounded-md text-xs ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{problem.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {problem.timeEstimate}
                    </span>
                    <button 
                      onClick={() => setSelectedProblem(problem)}
                      className="text-indigo-600 hover:underline flex items-center"
                    >
                      Solve Now <ChevronRight className="ml-1 w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}

export default App;
