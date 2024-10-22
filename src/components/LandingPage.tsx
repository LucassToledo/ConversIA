import React from 'react';
import { Link } from 'react-router-dom';
import { Mic, MessageSquare, BarChart, ArrowRight, Check } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Master Your English Interview Skills</h1>
          <p className="text-xl md:text-2xl mb-8">Practice with AI-powered interviews and get instant feedback</p>
          <Link 
            to="/auth" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Get Started <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
          </Link>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<Mic className="h-12 w-12 text-blue-400" />}
            title="Voice Interaction"
            description="Practice speaking with our advanced speech recognition technology"
          />
          <FeatureCard
            icon={<MessageSquare className="h-12 w-12 text-blue-400" />}
            title="AI Feedback"
            description="Receive personalized feedback on your language skills and interview performance"
          />
          <FeatureCard
            icon={<BarChart className="h-12 w-12 text-blue-400" />}
            title="Progress Tracking"
            description="Monitor your improvement over time with detailed analytics"
          />
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Pricing Plans</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <PricingCard
              title="Basic"
              price="Free"
              features={[
                '3 AI-powered interviews per month',
                'Basic feedback',
                'Limited progress tracking'
              ]}
            />
            <PricingCard
              title="Premium"
              price="$9.99/month"
              features={[
                'Unlimited AI-powered interviews',
                'Advanced personalized feedback',
                'Comprehensive progress tracking',
                'Interview recordings',
                'Priority support'
              ]}
              isPremium
            />
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to ace your next interview?</h2>
          <p className="text-xl mb-8">Join thousands of successful candidates who have improved their skills with InterviewAI</p>
          <Link 
            to="/auth" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Start Practicing Now <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => {
  return (
    <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-filter backdrop-blur-lg">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-blue-100">{description}</p>
    </div>
  );
};

const PricingCard: React.FC<{ title: string; price: string; features: string[]; isPremium?: boolean }> = ({ title, price, features, isPremium }) => {
  return (
    <div className={`bg-white bg-opacity-10 rounded-lg p-6 backdrop-filter backdrop-blur-lg ${isPremium ? 'border-2 border-yellow-400' : ''}`}>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold mb-4">{price}</p>
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="h-5 w-5 text-green-400 mr-2" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        to="/auth"
        className={`block text-center py-2 px-4 rounded-md transition duration-300 ${
          isPremium
            ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {isPremium ? 'Get Premium' : 'Start Free'}
      </Link>
    </div>
  );
};

export default LandingPage;