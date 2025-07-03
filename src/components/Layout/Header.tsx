import React from 'react';
import { LogOut, User, ShoppingCart, Utensils, Crown, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  title: string;
  showCart?: boolean;
  cartCount?: number;
  onCartClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, showCart = false, cartCount = 0, onCartClick }) => {
  const { user, signOut } = useAuth();

  return (
    <header className="glass-morphism border-b border-white/15 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center group">
              <div className="w-16 h-16 flex items-center justify-center cosmic-glow mr-4 group-hover:scale-110 transition-transform duration-300 icon-glow">
                <img src="/site-icon.png" alt="Cosmic Cantina" className="w-12 h-12 rounded-full object-cover" />
              </div>
              <div>
                <span className="text-xl font-bold cosmic-text tracking-wide">Cosmic Cantina</span>
                <div className="text-xs text-gray-400 font-medium">Digital Dining System</div>
              </div>
            </div>
            <div className="ml-8">
              <h1 className="text-lg font-medium text-gray-200">{title}</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {showCart && (
              <button
                onClick={onCartClick}
                className="relative p-3 text-gray-400 hover:text-white transition-all duration-300 hover-lift rounded-xl glass-morphism hover:bg-white/10 group"
              >
                <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold pulse-glow">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
            
            <div className="flex items-center space-x-3 glass-morphism-strong rounded-xl px-4 py-3 border border-white/15 hover-lift">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  user?.role === 'staff' 
                    ? 'bg-yellow-500/15' 
                    : 'bg-blue-500/15'
                }`} style={{ 
                  boxShadow: user?.role === 'staff' 
                    ? '0 0 15px rgba(255, 149, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                    : '0 0 15px rgba(0, 122, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                }}>
                  {user?.role === 'staff' ? (
                    <Crown className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <Shield className="w-5 h-5 text-blue-400" />
                  )}
                </div>
                <div>
                  <span className="text-sm font-medium text-white">{user?.full_name}</span>
                  {user?.role === 'student' && user?.registration_number && (
                    <div className="text-xs text-gray-400">({user.registration_number})</div>
                  )}
                  <div className={`text-xs capitalize font-medium ${
                    user?.role === 'staff' ? 'text-yellow-400' : 'text-blue-400'
                  }`}>
                    {user?.role === 'staff' ? 'Staff Member' : 'Student'}
                  </div>
                </div>
              </div>
              <button
                onClick={signOut}
                className="p-2 text-gray-400 hover:text-red-400 transition-all duration-300 rounded-lg hover:bg-white/10 hover:scale-110"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;