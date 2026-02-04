/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';

const SolutionItem = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex items-start gap-4 p-5 bg-green-50 rounded-xl border-l-4 border-green-500 hover:translate-x-2 transition-transform duration-300 mb-3"
    >
      <div className="text-green-500 text-2xl flex-shrink-0">
        {Icon && <Icon className="w-6 h-6" />}
      </div>
      <div>
        <h4 className="font-semibold text-gray-800 mb-1">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

export default SolutionItem;