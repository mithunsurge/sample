import React, { useState, useRef } from 'react';
import { LogOut, User, ShoppingCart, Utensils, Crown, Shield, X, Swords } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  title: string;
  showCart?: boolean;
  cartCount?: number;
  onCartClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, showCart = false, cartCount = 0, onCartClick }) => {
  const { user, signOut } = useAuth();
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleIconClick = () => {
    clickCountRef.current += 1;
    
    console.log(`Click count: ${clickCountRef.current}`);
    
    // Clear existing timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    
    // If this is the second click within the timeout period, show the modal
    if (clickCountRef.current === 2) {
      console.log('Double click detected! Showing modal...');
      setShowQuoteModal(true);
      clickCountRef.current = 0; // Reset counter
      return;
    }
    
    // Set timeout to reset click count
    clickTimeoutRef.current = setTimeout(() => {
      console.log('Resetting click count');
      clickCountRef.current = 0;
    }, 300); // 300ms window for double click
  };

  return (
    <>
      <header className="glass-morphism border-b border-white/20 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18 py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center group">
                <button 
                  onClick={handleIconClick}
                  className="w-16 h-16 flex items-center justify-center cosmic-glow mr-4 group-hover:scale-125 transition-transform duration-500 icon-glow cursor-pointer rounded-full bg-transparent border-none p-0"
                  style={{ outline: 'none' }}
                >
                  <img 
                    src="/site-icon.png" 
                    alt="Galactic Cantina" 
                    className="w-12 h-12 rounded-full object-cover pointer-events-none" 
                  />
                </button>
                <div>
                  <span className="text-xl font-bold cosmic-text tracking-wide font-orbitron">Galactic Cantina</span>
                  <div className="text-xs text-gray-400 font-medium font-exo">Digital Dining System</div>
                </div>
              </div>
              <div className="ml-8">
                <h1 className="text-lg font-medium text-gray-200 font-exo">{title}</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {showCart && (
                <button
                  onClick={onCartClick}
                  className="relative p-3 text-gray-400 hover:text-white transition-all duration-500 hover-lift rounded-xl glass-morphism hover:bg-white/15 group"
                >
                  <ShoppingCart className="w-6 h-6 group-hover:scale-125 transition-transform duration-300" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold pulse-glow">
                      {cartCount}
                    </span>
                  )}
                </button>
              )}
              
              <div className="flex items-center space-x-3 glass-morphism-strong rounded-xl px-4 py-3 border border-white/20 hover-lift">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-500 ${
                    user?.role === 'staff' 
                      ? 'bg-yellow-500/20' 
                      : 'bg-blue-500/20'
                  }`} style={{ 
                    boxShadow: user?.role === 'staff' 
                      ? '0 0 20px rgba(255, 149, 0, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.15)' 
                      : '0 0 20px rgba(0, 170, 255, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.15)' 
                  }}>
                    {user?.role === 'staff' ? (
                      <Crown className="w-5 h-5 text-yellow-400" />
                    ) : (
                      <Swords className="w-5 h-5 text-blue-400" />
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-white font-exo">{user?.full_name}</span>
                    {user?.role === 'student' && user?.registration_number && (
                      <div className="text-xs text-gray-400 font-exo">({user.registration_number})</div>
                    )}
                    <div className={`text-xs capitalize font-medium font-orbitron ${
                      user?.role === 'staff' ? 'text-yellow-400' : 'text-blue-400'
                    }`}>
                      {user?.role === 'staff' ? 'Jedi Master' : 'Padawan'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={signOut}
                  className="p-2 text-gray-400 hover:text-red-400 transition-all duration-500 rounded-lg hover:bg-white/15 hover:scale-125"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Star Wars Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-lg animate-in fade-in duration-500" 
            onClick={() => setShowQuoteModal(false)} 
          />
          <div className="relative glass-morphism-strong rounded-2xl p-8 max-w-md w-full border border-white/30 animate-in zoom-in-95 slide-in-from-bottom-4 duration-700 holographic">
            {/* Close button */}
            <button
              onClick={() => setShowQuoteModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-white/15 rounded-lg transition-colors duration-300"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>

            {/* Enhanced Parallax background effect */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full -translate-y-20 translate-x-20 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-yellow-500/25 to-orange-500/25 rounded-full translate-y-16 -translate-x-16 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-full -translate-x-12 -translate-y-12 animate-pulse" style={{ animationDelay: '3s' }}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 glass-morphism rounded-full flex items-center justify-center mx-auto mb-6 cosmic-glow-strong">
                <img src="/site-icon.png" alt="Galactic Cantina" className="w-16 h-16 rounded-full object-cover" />
              </div>
              
              <div className="mb-6">
                <div className="text-2xl font-bold cosmic-text mb-4 font-orbitron">Master Windu Speaks</div>
                <blockquote className="text-lg text-gray-200 leading-relaxed italic font-exo">
                  "You are on this council, but we do not grant you the rank of Master."
                </blockquote>
                <cite className="block text-sm text-gray-400 mt-4 font-medium font-exo">— Mace Windu</cite>
              </div>

              <div className="flex items-center justify-center space-x-3 text-sm text-gray-500 font-exo">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <span>The Force is strong with this one</span>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.7s' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;