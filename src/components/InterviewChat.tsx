import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mic, MicOff, ChevronDown, ChevronUp, FileText, MessageSquare } from 'lucide-react';
import PremiumModal from './PremiumModal';

interface ScenarioType {
  company: string;
  role: string;
  additionalInfo?: string;
}

// Main component for conducting the interview
const InterviewChat: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ role: string; content: string; feedback?: string }>>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isInterviewComplete, setIsInterviewComplete] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scenario: ScenarioType = location.state?.scenario || {
    company: 'Default Company',
    role: 'Default Role'
  };
  const interviewType = location.state?.interviewType || 'chat';

  useEffect(() => {
    const initialMessage = `Welcome to your ${interviewType} interview for the ${scenario.role} position at ${scenario.company}. ${
      scenario.additionalInfo ? `Additional context: ${scenario.additionalInfo}` : ''
    } Let's begin with an icebreaker. Can you tell me about a recent challenge you've overcome in your professional life?`;
    setMessages([{ role: 'ai', content: initialMessage }]);
  }, [scenario, interviewType]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleRecordToggle = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start recording logic here
    } else {
      // Stop recording and process audio
      const userResponse = "This is a simulated user response."; // Replace with actual speech-to-text result
      setMessages([...messages, { role: 'user', content: userResponse, feedback: generateFeedback(userResponse) }]);
      
      if (currentQuestion < 4) {
        setTimeout(() => {
          const nextQuestion = getNextQuestion();
          setMessages(prev => [...prev, { role: 'ai', content: nextQuestion }]);
          setCurrentQuestion(currentQuestion + 1);
        }, 1000);
      } else {
        setIsInterviewComplete(true);
      }
    }
  };

  const generateFeedback = (response: string) => {
    // This is where you'd implement the AI feedback logic
    return "Great use of vocabulary! Consider using more complex sentence structures to showcase your language skills.";
  };

  const getNextQuestion = () => {
    const questions = [
      `Can you describe a time when you had to work as part of a team at ${scenario.company} or a similar company?`,
      `What's your approach to learning new technologies or skills that might be relevant to the ${scenario.role} position?`,
      `How do you handle tight deadlines or pressure in a role like ${scenario.role}?`,
      `Can you give an example of a time you showed leadership in a context similar to ${scenario.company}?`,
      `Where do you see yourself professionally in five years, considering your interest in the ${scenario.role} at ${scenario.company}?`
    ];
    return questions[currentQuestion];
  };

  const handleSummary = () => {
    navigate('/summary');
  };

  const handleContinueChat = () => {
    setShowPremiumModal(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-blue-600 p-4 text-white">
        <h2 className="text-xl font-bold">{scenario.role} Interview ({interviewType})</h2>
        <p className="text-sm">{scenario.company}</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
        {isInterviewComplete ? (
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleSummary}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FileText className="mr-2 h-5 w-5" />
              View Summary
            </button>
            <button
              onClick={handleContinueChat}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Continue Chat
            </button>
          </div>
        ) : (
          <button
            onClick={handleRecordToggle}
            className={`w-full py-3 px-4 rounded-full flex items-center justify-center ${
              isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition duration-300`}
          >
            {isRecording ? <MicOff className="mr-2" /> : <Mic className="mr-2" />}
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>
        )}
      </div>
      <PremiumModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
    </div>
  );
};

const Message: React.FC<{ message: { role: string; content: string; feedback?: string } }> = ({ message }) => {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <div className={`mb-4 ${message.role === 'ai' ? 'text-left' : 'text-right'}`}>
      <div className={`inline-block max-w-3/4 p-3 rounded-lg ${
        message.role === 'ai' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-green-100 dark:bg-green-900'
      }`}>
        <p className="text-gray-800 dark:text-gray-200">{message.content}</p>
        {message.feedback && (
          <div className="mt-2">
            <button
              onClick={() => setShowFeedback(!showFeedback)}
              className="text-sm text-blue-500 dark:text-blue-400 flex items-center"
            >
              {showFeedback ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              <span className="ml-1">Feedback</span>
            </button>
            {showFeedback && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{message.feedback}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewChat;