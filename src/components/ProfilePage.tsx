import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { Calendar, BarChart2, LogOut, Save } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    gender: '',
    dateOfBirth: '',
    goals: [],
    level: '',
    areasToImprove: [],
    previousLearning: [],
    nativeLanguage: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as typeof userData);
        }
      } else {
        // For demo users, get data from sessionStorage
        const demoUserData = sessionStorage.getItem('demoUserData');
        if (demoUserData) {
          setUserData(JSON.parse(demoUserData));
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleInputChange = (field: string, value: string | string[]) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleSave = async () => {
    if (user) {
      await updateDoc(doc(db, 'users', user.uid), userData);
    } else {
      // For demo users, update sessionStorage
      sessionStorage.setItem('demoUserData', JSON.stringify(userData));
    }
    setIsEditing(false);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Clear demo user data
        sessionStorage.removeItem('demoUser');
        sessionStorage.removeItem('demoUserData');
        navigate('/');
      })
      .catch((error) => {
        console.error('Sign out error', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="bg-blue-600 px-4 py-5 border-b border-gray-200 sm:px-6">
          <h1 className="text-2xl leading-6 font-bold text-white">
            Perfil de Usuario
          </h1>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center mb-6">
            <img
              className="h-20 w-20 rounded-full mr-4"
              src={
                user?.photoURL ||
                `https://ui-avatars.com/api/?name=${
                  user?.displayName || 'User'
                }`
              }
              alt="Profile"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {user?.displayName || 'Usuario Demo'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.email || 'demo@example.com'}
              </p>
            </div>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Género
              </label>
              <input
                type="text"
                value={userData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                disabled={!isEditing}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                value={userData.dateOfBirth}
                onChange={(e) =>
                  handleInputChange('dateOfBirth', e.target.value)
                }
                disabled={!isEditing}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Idioma Nativo
              </label>
              <input
                type="text"
                value={userData.nativeLanguage}
                onChange={(e) =>
                  handleInputChange('nativeLanguage', e.target.value)
                }
                disabled={!isEditing}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nivel de Inglés
              </label>
              <input
                type="text"
                value={userData.level}
                onChange={(e) => handleInputChange('level', e.target.value)}
                disabled={!isEditing}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Objetivos de Aprendizaje
              </label>
              <input
                type="text"
                value={userData.goals.join(', ')}
                onChange={(e) =>
                  handleInputChange('goals', e.target.value.split(', '))
                }
                disabled={!isEditing}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Áreas a Mejorar
              </label>
              <input
                type="text"
                value={userData.areasToImprove.join(', ')}
                onChange={(e) =>
                  handleInputChange(
                    'areasToImprove',
                    e.target.value.split(', ')
                  )
                }
                disabled={!isEditing}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Historial de Aprendizaje
              </label>
              <input
                type="text"
                value={userData.previousLearning.join(', ')}
                onChange={(e) =>
                  handleInputChange(
                    'previousLearning',
                    e.target.value.split(', ')
                  )
                }
                disabled={!isEditing}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </form>

          <div className="mt-8 flex justify-between">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Save className="mr-2 h-5 w-5" />
                Guardar Cambios
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <BarChart2 className="mr-2 h-5 w-5" />
                Editar Perfil
              </button>
            )}
            <button
              onClick={() => navigate('/dashboard')} // Aquí cambias el comportamiento
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <BarChart2 className="mr-2 h-5 w-5" />
              Dashboard
            </button>

            <button
              onClick={handleSignOut}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
