 import SlideHeader from './common/SlideHeader';
import { motion } from 'framer-motion';

const Slide2 = () => {
  const agendaItems = [
    { number: '01', title: 'Current Challenges', description: 'Understanding the pain points in today\'s textile industry' },
    { number: '02', title: 'Why Traditional Systems Fail', description: 'Limitations of manual and legacy systems' },
    { number: '03', title: 'ERP as the Solution', description: 'How ERP addresses textile industry challenges' },
    { number: '04', title: 'End-to-End Textile ERP Modules', description: 'Comprehensive coverage of textile processes' },
    { number: '05', title: 'Benefits & ROI', description: 'Tangible business improvements and returns' },
    { number: '06', title: 'Implementation Strategy', description: 'Phased approach for smooth transition' },
    { number: '07', title: 'Future-Ready Textile Business', description: 'Preparing for Industry 4.0 and beyond' },
    { number: '08', title: 'Why Choose Our Solution', description: 'Our expertise and partnership approach' },
  ];

  return (
    <div>
      <SlideHeader 
        title="Agenda"
        subtitle="Comprehensive overview of textile ERP transformation journey"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {agendaItems.map((item, index) => (
          <motion.div
            key={item.number}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-50 p-6 rounded shadow-lg hover:-translate-y-2 transition-all duration-300 border-l-4 border-blue-800 relative overflow-hidden group"
          >
            <div className="absolute -top-3 -left-1 w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center font-extrabold text-lg shadow-lg">
              {item.number}
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-2 mt-2">
              {item.title}
            </h3>
            <p className="text-gray-600">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Slide2;