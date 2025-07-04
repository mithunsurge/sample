import React, { useState, useEffect } from 'react';
import { Clock, Users, ChefHat, ArrowRight, Utensils, Star, Sparkles, Zap, Shield, Swords } from 'lucide-react';
import { Link } from 'react-router-dom';
import StarWarsScene from '../components/3D/StarWarsScene';

const Landing: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen cosmic-gradient relative overflow-hidden">
      {/* 3D Star Wars Scene */}
      <StarWarsScene className="scene-3d" />

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute floating-element"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: i % 4 === 0 ? '#00AAFF' : i % 4 === 1 ? '#00FF64' : i % 4 === 2 ? '#FF9500' : '#FF3B30',
              borderRadius: '50%',
              animationDelay: `${Math.random() * 12}s`,
              opacity: 0.4,
              filter: 'blur(0.5px)',
              boxShadow: `0 0 20px ${i % 4 === 0 ? 'rgba(0, 170, 255, 0.8)' : i % 4 === 1 ? 'rgba(0, 255, 100, 0.8)' : i % 4 === 2 ? 'rgba(255, 149, 0, 0.8)' : 'rgba(255, 59, 48, 0.8)'}`,
            }}
          />
        ))}
        
        {/* Enhanced Parallax Background Layers */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 170, 255, 0.12) 0%, transparent 60%)`,
            transition: 'background 0.5s ease',
          }}
        />
        
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            background: `radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(0, 255, 100, 0.08) 0%, transparent 60%)`,
            transition: 'background 0.7s ease',
          }}
        />
      </div>

      {/* Header */}
      <header className="glass-morphism border-b border-white/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center group">
              <div className="w-20 h-20 flex items-center justify-center mr-4 group-hover:scale-125 transition-transform duration-500 icon-glow-large">
                <img src="/site-icon.png" alt="Galactic Cantina" className="w-16 h-16 rounded-full object-cover" />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-bold cosmic-text tracking-wider font-orbitron">Galactic Cantina</span>
                <div className="text-sm text-gray-400 font-medium font-exo">Digital Dining System</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 relative z-10">
        <div className="text-center mb-12 sm:mb-20">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-3 glass-morphism px-8 py-4 rounded-full border border-white/25 mb-8 hover-lift cosmic-glow holographic">
              <Swords className="w-6 h-6 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium font-orbitron">May the Force Be With Your Order</span>
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 sm:mb-8 tracking-tight leading-tight font-orbitron">
            Skip the Queue,<br />
            <span className="cosmic-text text-5xl sm:text-6xl md:text-7xl">Order Like a Jedi</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 font-exo">
            Experience galactic cuisine with cutting-edge technology. Pre-order your favorite meals 
            and skip the cantina rush with our Force-powered ordering system.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-10">
            <div className="flex items-center space-x-3 glass-card px-6 py-4 rounded-xl hover-lift">
              <Clock className="w-6 h-6 text-blue-400" />
              <span className="text-sm font-medium text-white font-exo">Instant Ordering</span>
            </div>
            <div className="flex items-center space-x-3 glass-card px-6 py-4 rounded-xl hover-lift">
              <Shield className="w-6 h-6 text-green-400" />
              <span className="text-sm font-medium text-white font-exo">Galactic Quality</span>
            </div>
            <div className="flex items-center space-x-3 glass-card px-6 py-4 rounded-xl hover-lift">
              <Zap className="w-6 h-6 text-yellow-400" />
              <span className="text-sm font-medium text-white font-exo">Force Technology</span>
            </div>
          </div>
        </div>

        {/* Role Selection Cards */}
        <div className="responsive-grid max-w-5xl mx-auto mb-16">
          {/* Student Card */}
          <Link to="/auth/student" className="group block">
            <div className="glass-card rounded-2xl p-8 hover-lift transition-all duration-700 relative overflow-hidden interactive-card gradient-border enhanced-hover holographic">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full -translate-y-20 translate-x-20 group-hover:scale-200 transition-transform duration-1000"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center w-20 sm:w-24 h-20 sm:h-24 glass-morphism rounded-2xl mb-6 sm:mb-8 group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 cosmic-glow">
                  <Users className="w-10 sm:w-12 h-10 sm:h-12 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors font-orbitron">Padawan Portal</h3>
                <p className="text-gray-300 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg font-exo">
                  Browse galactic menus, place orders instantly, and track your food status in real-time. 
                  Perfect for young Padawans who value quality and efficiency.
                </p>
                <div className="flex items-center text-blue-400 font-semibold group-hover:text-blue-300 transition-colors text-base sm:text-lg font-exo">
                  <Shield className="w-5 sm:w-6 h-5 sm:h-6 mr-3" />
                  <span>Enter Portal</span>
                  <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6 ml-3 transform group-hover:translate-x-4 transition-transform duration-500" />
                </div>
              </div>
            </div>
          </Link>

          {/* Staff Card */}
          <Link to="/auth/staff" className="group block">
            <div className="glass-card rounded-2xl p-8 hover-lift transition-all duration-700 relative overflow-hidden interactive-card gradient-border enhanced-hover holographic">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full -translate-y-20 translate-x-20 group-hover:scale-200 transition-transform duration-1000"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center w-20 sm:w-24 h-20 sm:h-24 glass-morphism rounded-2xl mb-6 sm:mb-8 group-hover:scale-125 group-hover:rotate-12 transition-all duration-700" style={{ boxShadow: '0 0 30px rgba(255, 149, 0, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.15)' }}>
                  <ChefHat className="w-10 sm:w-12 h-10 sm:h-12 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-yellow-300 transition-colors font-orbitron">Jedi Master Portal</h3>
                <p className="text-gray-300 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg font-exo">
                  Manage orders efficiently, update menus dynamically, and streamline operations. 
                  Advanced tools for Jedi Masters of food service management.
                </p>
                <div className="flex items-center text-yellow-400 font-semibold group-hover:text-yellow-300 transition-colors text-base sm:text-lg font-exo">
                  <Shield className="w-5 sm:w-6 h-5 sm:h-6 mr-3" />
                  <span>Enter Portal</span>
                  <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6 ml-3 transform group-hover:translate-x-4 transition-transform duration-500" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Enhanced Features Section */}
        <div className="responsive-grid mb-16">
          {[
            {
              icon: Clock,
              title: "Hyperspace Speed",
              description: "Advanced ordering system eliminates waiting times during peak cantina hours.",
              color: "purple",
              delay: "0s"
            },
            {
              icon: Utensils,
              title: "Galactic Cuisine",
              description: "Curated selection of high-quality dishes from across the galaxy.",
              color: "blue",
              delay: "0.3s"
            },
            {
              icon: Star,
              title: "Force Notifications",
              description: "Real-time updates and intelligent order tracking through the Force.",
              color: "yellow",
              delay: "0.6s"
            }
          ].map((feature, index) => (
            <div key={index} className="text-center group" style={{ animationDelay: feature.delay }}>
              <div className={`w-16 h-16 sm:w-20 sm:h-20 glass-morphism rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-150 group-hover:rotate-180 transition-all duration-700 floating-element`} style={{ 
                boxShadow: feature.color === 'purple' 
                  ? '0 0 30px rgba(88, 86, 214, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.15)'
                  : feature.color === 'blue'
                  ? '0 0 30px rgba(0, 170, 255, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.15)'
                  : '0 0 30px rgba(255, 149, 0, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.15)'
              }}>
                <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4 group-hover:text-blue-300 transition-colors font-orbitron">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors text-sm sm:text-base font-exo">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Landing;