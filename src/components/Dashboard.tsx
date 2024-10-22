import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Coffee, Briefcase, Code, ChevronRight } from 'lucide-react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

// Dashboard component for user's main interface
const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [remainingCafecitos, setRemainingCafecitos] = useState(3);
  const [userCompleted, setUserCompleted] = useState(false);

  useEffect(() => {
    const checkUserCompletion = async () => {
      const user = auth.currentUser;
      const isDemoUser = sessionStorage.getItem('demoUser') === 'true';

      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserCompleted(true);
        } else {
          navigate('/onboarding');
        }
      } else if (isDemoUser) {
        // Permitir el acceso al usuario demo sin autenticación
        setUserCompleted(true);
      } else {
        navigate('/auth'); // Redirigir si no es demo ni autenticado
      }
    };

    checkUserCompletion();
  }, [navigate]);

  const predefinedScenarios = [
    { company: 'Google', role: 'Growth Manager', icon: <Coffee size={24} /> },
    { company: 'Meta', role: 'Full Stack Dev', icon: <Code size={24} /> },
    {
      company: 'Amazon',
      role: 'Product Management',
      icon: <Briefcase size={24} />,
    },
  ];

  const handleScenarioSelect = (scenario: (typeof predefinedScenarios)[0]) => {
    if (remainingCafecitos > 0) {
      setRemainingCafecitos(remainingCafecitos - 1);
      navigate('/scenario-setup', { state: { scenario } });
    } else {
      navigate('/upgrade');
    }
  };

  const handleCustomScenario = () => {
    navigate('/custom-scenario');
  };

  if (!userCompleted) {
    return null; // or a loading indicator
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Welcome to InterviewAI
        </h1>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Today's Cafecitos
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex">
              {[...Array(3)].map((_, index) => (
                <Coffee
                  key={index}
                  size={24}
                  className={
                    index < remainingCafecitos
                      ? 'text-yellow-500'
                      : 'text-gray-300'
                  }
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {remainingCafecitos} / 3 remaining
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Predefined Scenarios
          </h2>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {predefinedScenarios.map((scenario, index) => (
              <li key={index} className="py-4">
                <button
                  onClick={() => handleScenarioSelect(scenario)}
                  className="w-full flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">{scenario.icon}</div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {scenario.company}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {scenario.role}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Custom Scenario
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Create your own interview scenario tailored to your needs.
          </p>
          <button
            onClick={handleCustomScenario}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Create Custom Scenario
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
