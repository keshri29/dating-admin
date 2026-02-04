/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';

const StatCard = ({ value, label, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-2 transition-transform duration-300"
    >
      <div className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-2">
        {value}
      </div>
      <div className="text-gray-600">{label}</div>
    </motion.div>
  );
};

export default StatCard;