import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, RefreshCw, User, MessageSquare } from 'lucide-react';

const Summary: React.FC = () => {
  const navigate = useNavigate();

  // This would typically come from your app's state management
  const feedbacks = [
    "Great use of vocabulary in discussing team collaboration.",
    "Consider using more complex sentence structures when describing your approach to learning.",
    "Good example of leadership, but try to be more specific about the outcomes.",
    "Excellent use of professional terminology when discussing future goals.",
    "Work on reducing filler words to sound more confident."
  ];

  const vocabularyCount = 120; // This would be calculated based on the user's responses
  const estimatedLevel = getEstimatedLevel(vocabularyCount);

  function getEstimatedLevel(count: number): string {
    if (count <= 80) return 'A2';
    if (count <= 100) return 'B1';
    if (count <= 130) return 'B2';
    return 'C1';
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-blue-600 px-4 py-5 border-b border-gray-200 sm:px-6">
          <h1 className="text-2xl leading-6 font-bold text-white">Interview Summary</h1>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Feedback Highlights</h2>
          <ul className="space-y-3">
            {feedbacks.map((feedback, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 text-green-500">✓</span>
                <p className="ml-3 text-sm text-gray-700">{feedback}</p>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Vocabulary Analysis</h2>
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Unique Words Used</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">{vocabularyCount}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Estimated Level</p>
                <p className="mt-1 text-3xl font-semibold text-blue-600">{estimatedLevel}</p>
              </div>
              <BarChart className="h-16 w-16 text-blue-500" />
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => navigate('/onboarding')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Start Another Interview
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <User className="mr-2 h-5 w-5" />
              Go to Profile
            </button>
            <button
              onClick={() => navigate('/interview')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Continue Conversation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;