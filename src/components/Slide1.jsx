 import { Award, Target } from 'lucide-react';
import StatCard from './common/StatCard';
import { motion } from 'framer-motion';

const Slide1 = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center bg-gradient-to-br from-blue-900 to-blue-800 text-white p-4 md:p-8 rounded-xl">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 md:mb-6 bg-gradient-to-r from-yellow-400 to-white bg-clip-text text-transparent"
      >
        Textile ERP
      </motion.h1>
      
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl md:text-3xl lg:text-4xl text-white/85 mb-8 md:mb-12"
      >
        Digital Transformation for the Modern Textile Industry
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      > 
        <h3 className="text-2xl md:text-3xl mb-2">
          Presented by: <span className="text-yellow-400">Tridev Cloud & IT Solution Pvt. Ltd.</span>
        </h3>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white/10 p-6 md:p-8 rounded-xl border-l-4 border-yellow-400 shadow-lg mb-12">
          <div className="flex items-center gap-3 text-xl md:text-2xl font-semibold mb-4">
            <Target className="w-6 h-6" />
            Vision: One Platform to Control Entire Textile Business
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Slide1;