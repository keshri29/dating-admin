/* eslint-disable react/prop-types */
 import { motion } from 'framer-motion';

const ProcessStep = ({ icon: Icon, label, color = 'blue', delay = 0 }) => {
  const colorClasses = {
    blue: 'from-blue-800 to-blue-900',
    purple: 'from-purple-800 to-purple-900',
    teal: 'from-teal-800 to-teal-900',
    green: 'from-green-800 to-green-900',
    orange: 'from-orange-800 to-orange-900',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={`w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br ${colorClasses[color]} text-white flex flex-col items-center justify-center shadow-xl`}
    >
      {Icon && <Icon className="w-8 h-8 md:w-10 md:h-10 mb-2" />}
      <span className="text-xs md:text-sm text-center font-medium">{label}</span>
    </motion.div>
  );
};

export default ProcessStep;