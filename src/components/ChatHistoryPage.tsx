import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { format } from 'date-fns';
import { MessageSquare, ArrowRight } from 'lucide-react';

interface Chat {
  id: string;
  date: Date;
  title: string;
}

const ChatHistoryPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      if (user) {
        const chatsRef = collection(db, 'conversations');
        const q = query(
          chatsRef,
          where('userId', '==', user.uid),
          orderBy('date', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const fetchedChats = querySnapshot.docs.map(doc => ({
          id: doc.id,
          date: doc.data().date.toDate(),
          title: doc.data().title || `Chat on ${format(doc.data().date.toDate(), 'PPP')}`,
        }));
        setChats(fetchedChats);
      }
    };

    fetchChats();
  }, [user]);

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="bg-blue-600 px-4 py-5 border-b border-gray-200 sm:px-6">
          <h1 className="text-2xl leading-6 font-bold text-white">Chat History</h1>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {chats.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">No chat history yet. Start a new interview!</p>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {chats.map((chat) => (
                <li key={chat.id} className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MessageSquare className="h-6 w-6 text-blue-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{chat.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{format(chat.date, 'PPP')}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/interview/${chat.id}`)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate('/onboarding')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Start New Interview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHistoryPage;