import React from 'react';
import { Utensils, AlertCircle, Zap, Swords } from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';

const Loading: React.FC = () => {
  const isConfigured = isSupabaseConfigured();

  if (!isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center cosmic-gradient">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 glass-morphism rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-500/40 hover:scale-110 transition-transform duration-500" style={{ boxShadow: '0 0 40px rgba(255, 59, 48, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.2)' }}>
            <AlertCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-4 font-orbitron">Hyperdrive Not Connected</h2>
          <p className="text-gray-300 mb-6 leading-relaxed font-exo">
            Please connect to the galactic database to use the digital cantina. Click the "Connect to Supabase" button in the top right corner.
          </p>
          <div className="glass-morphism rounded-xl p-6 border border-red-500/30">
            <p className="text-sm text-gray-300 leading-relaxed font-exo">
              <strong className="text-blue-400">Note:</strong> You need to set up your galactic database and configure the environment variables to proceed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center cosmic-gradient">
      <div className="text-center">
        <div className="w-20 h-20 glass-spinner rounded-full animate-spin mx-auto mb-6"></div>
        <div className="flex items-center justify-center space-x-3">
          <img src="/site-icon.png" alt="Loading" className="w-8 h-8 rounded-lg" />
          <span className="text-xl font-medium text-gray-200 font-exo">Loading Galactic Menu...</span>
        </div>
        <p className="text-gray-400 text-sm mt-2 font-exo">Preparing your premium dining experience</p>
        <div className="flex items-center justify-center space-x-2 mt-4">
          <Swords className="w-5 h-5 text-blue-400 animate-pulse" />
          <span className="text-sm text-blue-300 font-orbitron">May the Force be with you</span>
          <Swords className="w-5 h-5 text-blue-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>
    </div>
  );
};

export default Loading;