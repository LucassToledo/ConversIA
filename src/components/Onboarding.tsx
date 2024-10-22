import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Book, Target, BarChart2, Globe, Languages } from 'lucide-react';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useStore } from '../store/useStore';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const { language, setLanguage } = useStore();
  const [userData, setUserData] = useState({
    gender: '',
    dateOfBirth: '',
    goals: [],
    level: '',
    areasToImprove: [],
    previousLearning: [],
    nativeLanguage: 'Español Latino',
  });

  useEffect(() => {
    const checkUserData = async () => {
      const user = auth.currentUser;
      const isDemoUser = sessionStorage.getItem('demoUser') === 'true';

      if (user && !isDemoUser) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          navigate('/profile');
        }
      }
    };
    checkUserData();
  }, [navigate]);

  const steps = [
    { title: 'Información Personal', icon: <User size={24} /> },
    { title: 'Idioma Nativo', icon: <Languages size={24} /> },
    { title: 'Objetivos de Aprendizaje', icon: <Target size={24} /> },
    { title: 'Nivel Actual', icon: <BarChart2 size={24} /> },
    { title: 'Áreas a Mejorar', icon: <Book size={24} /> },
    { title: 'Historial de Aprendizaje', icon: <Globe size={24} /> },
  ];

  const handleInputChange = (field: string, value: string | string[]) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleNext = async () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      const user = auth.currentUser;
      const isDemoUser = sessionStorage.getItem('demoUser') === 'true';

      if (user && !isDemoUser) {
        await setDoc(doc(db, 'users', user.uid), userData);
      } else {
        // For demo users, store data in sessionStorage
        sessionStorage.setItem('demoUserData', JSON.stringify(userData));
      }
      navigate('/profile');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Género
              </label>
              <select
                value={userData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="">Selecciona tu género</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
                <option value="other">Otro</option>
                <option value="prefer-not-to-say">Prefiero no decirlo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                value={userData.dateOfBirth}
                onChange={(e) =>
                  handleInputChange('dateOfBirth', e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Idioma Nativo
            </label>
            <select
              value={userData.nativeLanguage}
              onChange={(e) =>
                handleInputChange('nativeLanguage', e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="Español Latino">Español Latino</option>
              <option value="Español de España">Español de España</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
        );
      case 2:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Objetivos de Aprendizaje
            </label>
            <div className="space-y-2">
              {[
                'Mejorar fluidez',
                'Preparar entrevistas de trabajo',
                'Ampliar vocabulario',
                'Mejorar pronunciación',
              ].map((goal) => (
                <label key={goal} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={userData.goals.includes(goal)}
                    onChange={(e) => {
                      const newGoals = e.target.checked
                        ? [...userData.goals, goal]
                        : userData.goals.filter((g) => g !== goal);
                      handleInputChange('goals', newGoals);
                    }}
                    className="mr-2"
                  />
                  {goal}
                </label>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nivel Actual de Inglés
            </label>
            <select
              value={userData.level}
              onChange={(e) => handleInputChange('level', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">Selecciona tu nivel</option>
              <option value="A1">Puedo decir "hola" y mi nombre (A1)</option>
              <option value="A2">
                Puedo tener conversaciones básicas (A2)
              </option>
              <option value="B1">
                Puedo mantener una conversación simple (B1)
              </option>
              <option value="B2">Puedo expresar ideas complejas (B2)</option>
              <option value="C1">Puedo comunicarme con fluidez (C1)</option>
              <option value="C2">Tengo un dominio casi nativo (C2)</option>
            </select>
          </div>
        );
      case 4:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Áreas a Mejorar
            </label>
            <div className="space-y-2">
              {[
                'Pronunciación',
                'Gramática',
                'Vocabulario técnico',
                'Comprensión auditiva',
                'Expresión escrita',
              ].map((area) => (
                <label key={area} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={userData.areasToImprove.includes(area)}
                    onChange={(e) => {
                      const newAreas = e.target.checked
                        ? [...userData.areasToImprove, area]
                        : userData.areasToImprove.filter((a) => a !== area);
                      handleInputChange('areasToImprove', newAreas);
                    }}
                    className="mr-2"
                  />
                  {area}
                </label>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Historial de Aprendizaje
            </label>
            <div className="space-y-2">
              {[
                'Cursos online',
                'Clases presenciales',
                'Intercambios',
                'Viajes al extranjero',
                'Autodidacta',
              ].map((method) => (
                <label key={method} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={userData.previousLearning.includes(method)}
                    onChange={(e) => {
                      const newMethods = e.target.checked
                        ? [...userData.previousLearning, method]
                        : userData.previousLearning.filter((m) => m !== method);
                      handleInputChange('previousLearning', newMethods);
                    }}
                    className="mr-2"
                  />
                  {method}
                </label>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 px-4 py-5 border-b border-gray-200 sm:px-6">
          <h2 className="text-2xl leading-6 font-bold text-white">
            Bienvenido a InterviewAI
          </h2>
          <p className="mt-1 text-sm text-blue-200">Conozcámonos mejor</p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between mb-8">
            {steps.map((s, index) => (
              <div
                key={index}
                className={`flex flex-col items-center ${
                  index <= step ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <div
                  className={`rounded-full p-2 ${
                    index <= step ? 'bg-blue-100' : 'bg-gray-200'
                  }`}
                >
                  {s.icon}
                </div>
                <span className="text-xs mt-1">{s.title}</span>
              </div>
            ))}
          </div>
          {renderStep()}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {step < steps.length - 1 ? 'Siguiente' : 'Finalizar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
