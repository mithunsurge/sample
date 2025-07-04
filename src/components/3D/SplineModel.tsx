import React, { Suspense, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Loader2 } from 'lucide-react';

interface SplineModelProps {
  className?: string;
  fallbackContent?: React.ReactNode;
}

const SplineModel: React.FC<SplineModelProps> = ({ className = '', fallbackContent }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Fallback 3D-like visual component
  const FallbackVisual = () => (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Animated cosmic orb */}
      <div className="relative">
        {/* Main orb */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full glass-morphism-strong border border-white/30 flex items-center justify-center cosmic-glow-strong animate-pulse">
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 backdrop-blur-xl border border-white/20 flex items-center justify-center">
            <img 
              src="/site-icon.png" 
              alt="Cosmic Cantina" 
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover"
            />
          </div>
        </div>
        
        {/* Orbiting elements */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full opacity-80"></div>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full opacity-60"></div>
          </div>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2">
            <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full opacity-70"></div>
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full opacity-50"></div>
          </div>
        </div>
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute floating-element"
            style={{
              left: `${Math.random() * 200 - 100}px`,
              top: `${Math.random() * 200 - 100}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          >
            <div 
              className="w-1 h-1 bg-white rounded-full opacity-40"
              style={{
                boxShadow: '0 0 6px rgba(255, 255, 255, 0.6)'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`relative ${className}`}>
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Loading 3D Experience...</p>
          </div>
        </div>
      )}

      {/* Error state or fallback */}
      {(hasError || fallbackContent) && !isLoading && (
        <div className="absolute inset-0 z-10">
          {fallbackContent || <FallbackVisual />}
        </div>
      )}

      {/* Spline Model */}
      <Suspense fallback={null}>
        <div className={`w-full h-full ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}>
          <Spline
            scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
            onLoad={handleLoad}
            onError={handleError}
            style={{
              width: '100%',
              height: '100%',
              background: 'transparent'
            }}
          />
        </div>
      </Suspense>

      {/* Always show fallback if no Spline URL is working */}
      {!hasError && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <FallbackVisual />
        </div>
      )}
    </div>
  );
};

export default SplineModel;