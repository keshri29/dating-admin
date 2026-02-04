import { useState, useEffect } from 'react';
import { 
  Building,
  ChevronLeft, ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
 
import Slide1 from './components/Slide1';
import Slide2 from './components/Slide2';
import Slide3 from './components/Slide3';
import Slide4 from './components/Slide4';
import Slide5 from './components/Slide5';
import Slide6 from './components/Slide6';
import Slide7 from './components/Slide7';
import Slide8 from './components/Slide8';
import Slide9 from './components/Slide9';
import Slide10 from './components/Slide10';
import Slide11 from './components/Slide11';
import Slide12 from './components/Slide12';
import Slide13 from './components/Slide13';
import Slide14 from './components/Slide14';
import Slide15 from './components/Slide15';
import Slide16 from './components/Slide16';
import Slide17 from './components/Slide17';
import Slide18 from './components/Slide18';
import Slide19 from './components/Slide19';
import Slide20 from './components/Slide20';
import Slide21 from './components/Slide21';
import Slide22 from './components/Slide22';
import Slide23 from './components/Slide23';
import Slide24 from './components/Slide24';
import Slide25 from './components/Slide25';
import Slide26 from './components/Slide26';
import Slide27 from './components/Slide27';
import Slide28 from './components/Slide28';
import Slide29 from './components/Slide29';
import Slide30 from './components/Slide30';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 30;

  const slides = [
    <Slide1 key={1} />,
    <Slide2 key={2} />,
    <Slide3 key={3} />,
    <Slide4 key={4} />,
    <Slide5 key={5} />,
    <Slide6 key={6} />,
    <Slide7 key={7} />,
    <Slide8 key={8} />,
    <Slide9 key={9} />,
    <Slide10 key={10} />,
    <Slide11 key={11} />,
    <Slide12 key={12} />,
    <Slide13 key={13} />,
    <Slide14 key={14} />,
    <Slide15 key={15} />,
    <Slide16 key={16} />,
    <Slide17 key={17} />,
    <Slide18 key={18} />,
    <Slide19 key={19} />,
    <Slide20 key={20} />,
    <Slide21 key={21} />,
    <Slide22 key={22} />,
    <Slide23 key={23} />,
    <Slide24 key={24} />,
    <Slide25 key={25} />,
    <Slide26 key={26} />,
    <Slide27 key={27} />,
    <Slide28 key={28} />,
    <Slide29 key={29} />,
    <Slide30 key={30} />
  ];

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevSlide();
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'Home') {
        goToSlide(0);
      } else if (e.key === 'End') {
        goToSlide(totalSlides - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch/swipe support
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      const swipeThreshold = 50;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const progressPercentage = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div className="min-h-screen text-gray-800 overflow-hidden flex flex-col">
      {/* Header */}
      <header className="bg-blue-950/95 text-white px-4 md:px-8 py-3 md:py-4 flex flex-col md:flex-row justify-between items-center shadow-xl z-50">
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-0">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-blue-900">
            <Building className="w-6 h-6" />
          </div>
          <div className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-yellow-400 to-white bg-clip-text text-transparent">
            TextileERP Pro
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="text-sm md:text-base font-semibold">
            Slide {currentSlide + 1} of {totalSlides}
          </div>
          <div className="w-32 md:w-48 h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="hidden md:block text-lg font-semibold">
          Digital Transformation for Textile Industry
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 overflow-y-auto"
          >
            <div className="h-full p-4 md:p-8 lg:p-12 bg-white">
              {slides[currentSlide]}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-blue-950/95 text-white px-4 md:px-8 py-3 md:py-4 flex flex-col md:flex-row justify-between items-center shadow-xl z-50">
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-0">
          <div className="flex gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-yellow-400 scale-110' 
                    : 'bg-white/30 hover:bg-orange-500 hover:scale-125'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={prevSlide}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/15 hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300 flex items-center justify-center hover:scale-110 hover:shadow-lg"
            title="Previous Slide (Left Arrow)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/15 hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300 flex items-center justify-center hover:scale-110 hover:shadow-lg"
            title="Next Slide (Right Arrow)"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;