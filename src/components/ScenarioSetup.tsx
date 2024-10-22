import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, MessageSquare, Phone, Video } from 'lucide-react';

// Component for setting up the interview scenario
const ScenarioSetup: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scenario = location.state?.scenario;
  const [interviewType, setInterviewType] = useState('');

  const interviewTypes = [
    { type: 'email', icon: <Mail size={24} />, label: 'Email' },
    { type: 'chat', icon: <MessageSquare size={24} />, label: 'Chat' },
    { type: 'call', icon: <Phone size={24} />, label: 'Phone Call' },
    { type: 'video', icon: <Video size={24} />, label: 'Video Call' },
  ];

  const handleStartInterview = () => {
    navigate('/interview', { state: { scenario, interviewType } });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Setup Your Interview</h2>
        
        {scenario && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Selected Scenario:</h3>
            <p className="text-gray-600 dark:text-gray-400">{scenario.role} at {scenario.company}</p>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Choose Interview Type:</h3>
          <div className="grid grid-cols-2 gap-4">
            {interviewTypes.map((type) => (
              <button
                key={type.type}
                onClick={() => setInterviewType(type.type)}
                className={`flex flex-col items-center justify-center p-4 rounded-md ${
                  interviewType === type.type
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                } transition duration-300`}
              >
                {type.icon}
                <span className="mt-2 text-sm">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleStartInterview}
          disabled={!interviewType}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start Interview
        </button>
      </div>
    </div>
  );
};

export default ScenarioSetup;