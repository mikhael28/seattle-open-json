import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '../components/ui/button';

interface Slide {
  title: string;
  content: React.ReactNode;
  gradient: string;
}

const PresentationMode: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slides: Slide[] = [
    {
      title: 'Welcome to Seattle Open JSON',
      gradient: 'from-blue-600 via-purple-600 to-pink-600',
      content: (
        <div className="text-center space-y-8">
          <h1 className="text-7xl font-bold mb-8">The Blueprint</h1>
          
          <p className="text-2xl max-w-3xl mx-auto opacity-90 mt-8">
            Audit a sitemap based on Seattle's Code, and send back for review before scheduling a meeting weeks out.
          </p>
        </div>
      ),
    },
    {
      title: 'The Problem',
      gradient: 'from-red-500 via-orange-500 to-yellow-500',
      content: (
        <div className="space-y-8">
          <h2 className="text-6xl font-bold mb-12">The Challenge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-2xl">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <h3 className="text-3xl font-semibold mb-4">⏱️ Long Wait Times</h3>
              <p className="text-xl opacity-90">
                Seattle homeowners face extended delays in permit approvals, often waiting months for simple projects
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <h3 className="text-3xl font-semibold mb-4">📋 Complex Requirements</h3>
              <p className="text-xl opacity-90">
                Understanding site map requirements and permit documentation is overwhelming for most homeowners
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <h3 className="text-3xl font-semibold mb-4">❌ Frequent Rejections</h3>
              <p className="text-xl opacity-90">
                Site maps are often rejected due to missing information or incorrect formatting
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <h3 className="text-3xl font-semibold mb-4">💰 Increased Costs</h3>
              <p className="text-xl opacity-90">
                Delays and rejections lead to higher costs for homeowners and contractors
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Our Solution',
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      content: (
        <div className="space-y-8">
          <h2 className="text-6xl font-bold mb-12">How We Help</h2>
          <div className="space-y-6 text-2xl max-w-5xl mx-auto">
           
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl transform hover:scale-105 transition-transform">
              <h3 className="text-4xl font-semibold mb-4">✅ Automated Requirements Checker</h3>
              <p className="text-xl opacity-90">
                Instantly identify what's missing from your site map before you submit - no more guesswork
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl transform hover:scale-105 transition-transform">
              <h3 className="text-4xl font-semibold mb-4">📊Make updates</h3>
              <p className="text-xl opacity-90">
                Update the blueprint with our simple drawing tools
              </p>
            </div>
          </div>
        </div>
      ),
    },

    {
      title: 'Requirements Validator',
      gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
      content: (
        <div className="space-y-8">
          <h2 className="text-6xl font-bold mb-12">Smart Requirements Validation</h2>
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <h3 className="text-3xl font-semibold mb-4">🔍 Real-Time Analysis</h3>
              <p className="text-xl opacity-90">
                Our system analyzes your site map against Seattle's official requirements as you draw
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <h3 className="text-3xl font-semibold mb-4">⚠️ Instant Feedback</h3>
              <p className="text-xl opacity-90">
                Get immediate alerts about missing elements, incorrect dimensions, or non-compliant features
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <h3 className="text-3xl font-semibold mb-4">💡 Helpful Suggestions</h3>
              <p className="text-xl opacity-90">
                Receive context-aware suggestions on what to add and how to fix issues before submission
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border-2 border-yellow-400">
              <h3 className="text-3xl font-semibold mb-4">🎯 Reduce Rejections</h3>
              <p className="text-xl opacity-90 font-semibold">
                Catch errors BEFORE you submit - dramatically reducing rejection rates and wait times
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Additional Tools',
      gradient: 'from-fuchsia-600 via-purple-600 to-indigo-600',
      content: (
        <div className="space-y-8">
          <h2 className="text-6xl font-bold mb-12">Complete Toolkit</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xl">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <h3 className="text-3xl font-semibold mb-4">📚 Emerald City Guide</h3>
              <p className="text-xl opacity-90">
                Comprehensive resource guide for navigating Seattle's permitting process
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <h3 className="text-3xl font-semibold mb-4">📊 Permit Data Explorer</h3>
              <p className="text-xl opacity-90">
                Interactive visualization of historical permit data across Seattle
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <h3 className="text-3xl font-semibold mb-4">🗺️ Interactive Maps</h3>
              <p className="text-xl opacity-90">
                Explore zoning, schools, and city services across Seattle neighborhoods
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <h3 className="text-3xl font-semibold mb-4">🤖 AI Assistant</h3>
              <p className="text-xl opacity-90">
                Get instant answers to your permitting questions with our chat assistant
              </p>
            </div>
          </div>
        </div>
      ),
    },
  

  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Escape') {
        exitFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  useEffect(() => {
    // Enter fullscreen on mount
    enterFullscreen();
  }, []);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const enterFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(() => {
        // Fullscreen request failed, that's ok
        setIsFullscreen(false);
      });
      setIsFullscreen(true);
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setIsFullscreen(false);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className={`fixed inset-0 z-[100] ${isFullscreen ? '' : 'relative h-screen'}`}>
      {/* Slide Container */}
      <div
        className={`w-full h-full bg-gradient-to-br ${currentSlideData.gradient} text-white flex items-center justify-center p-12 transition-all duration-500`}
      >
        {/* Content */}
        <div className="max-w-7xl w-full">
          {currentSlideData.content}
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-6">
          <Button
            variant="secondary"
            size="lg"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="rounded-full w-14 h-14 p-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/50 disabled:opacity-30"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          {/* Slide Indicators */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-white w-12'
                    : 'bg-white/50 w-3 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="secondary"
            size="lg"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="rounded-full w-14 h-14 p-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/50 disabled:opacity-30"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>

        {/* Exit Button */}
        <Button
          variant="ghost"
          size="lg"
          onClick={exitFullscreen}
          className="absolute top-8 right-8 rounded-full w-14 h-14 p-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/50"
          aria-label="Exit presentation"
        >
          <X className="h-8 w-8" />
        </Button>

        {/* Slide Counter */}
        <div className="absolute top-8 left-8 text-2xl font-semibold bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/50">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>
    </div>
  );
};

export default PresentationMode;
