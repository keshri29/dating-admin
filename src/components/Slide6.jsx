import SlideHeader from './common/SlideHeader';
import ModuleCard from './common/ModuleCard';
import HighlightBox from './common/HighlightBox';
import {
  Settings,
  Users,
  ShoppingCart,
  Factory,
  Boxes,
  Map,
 } from 'lucide-react';
import { motion } from 'framer-motion';

const Slide6 = () => {
  const coreModules = [
    {
      icon: Users,
      title: "Labor Management",
      description: "Attendance, payroll, skill management, workforce planning"
    },
    {
      icon: ShoppingCart,
      title: "Procurement",
      description: "Vendor management, purchase orders, raw material tracking"
    },
    {
      icon: Factory,
      title: "Production",
      description: "Spinning, weaving, dyeing, printing, garment manufacturing"
    },
    {
      icon: Boxes,
      title: "Inventory",
      description: "Raw material, WIP, finished goods, multi-location tracking"
    }
  ];

  return (
    <div>
      <SlideHeader
        title="What is Textile ERP?"
        subtitle="A single integrated platform managing your entire textile value chain"
      />

      <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 mb-12">
        <div className="flex-1">
          <p className="text-xl text-gray-700 mb-6 font-medium">
            A <strong className="text-blue-800">Textile ERP</strong> is a comprehensive software solution that integrates and automates all core business processes from <span className="text-blue-800 font-semibold">cotton purchase to final garment sale</span>.
          </p>
          
          <HighlightBox 
            icon={Map}
            title="Holistic Integration:"
            color="blue"
          >
            <p className="text-gray-700">
              Unlike generic ERP systems, Textile ERP is specifically designed for the unique requirements of spinning, weaving, dyeing, printing, and garment manufacturing processes.
            </p>
          </HighlightBox>
        </div>

        <div className="flex-1 flex justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-64 h-64 md:w-72 md:h-72 bg-gradient-to-br from-blue-800 to-blue-900 rounded-full flex items-center justify-center text-white font-bold text-center p-8 shadow-2xl"
          >
            <div>
              <div className="text-4xl mb-4">
                <Settings className="w-12 h-12 mx-auto" />
              </div>
              <div className="text-xl md:text-2xl">
                One Unified Platform
                <br />
                <span className="text-yellow-400">Entire Business</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
        <Map className="w-6 h-6" />
        Core Modules:
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {coreModules.map((module, index) => (
          <ModuleCard
            key={index}
            icon={module.icon}
            title={module.title}
            description={module.description}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
};

export default Slide6;
