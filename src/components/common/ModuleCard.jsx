/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';

const ModuleCard = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl p-6 shadow-lg hover:-translate-y-2 transition-all duration-300 border-t-4 border-blue-800 relative overflow-hidden group"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-800 to-yellow-400" />
      <div className="text-4xl text-blue-800 mb-4 flex justify-center h-16 items-center">
        {Icon && <Icon className="w-12 h-12" />}
      </div>
      <h3 className="text-xl font-bold text-blue-900 mb-3 text-center">
        {title}
      </h3>
      <p className="text-gray-600 text-center">{description}</p>
    </motion.div>
  );
};

export default ModuleCard;