 import SlideHeader from './common/SlideHeader';
import ProblemItem from './common/ProblemItem';
import SolutionItem from './common/SolutionItem';
import StatCard from './common/StatCard';
import HighlightBox from './common/HighlightBox';
import { Scale, User, Boxes, Search, Barcode, RefreshCw, Box, MapPin, Bell, CheckCircle, Smartphone, Warehouse, AlertTriangle, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Slide14 = () => {
  const problems = [
    {
      icon: Scale,
      title: "Stock Mismatch",
      description: "Physical vs system differences up to 30%"
    },
    {
      icon: User,
      title: "Theft & Pilferage",
      description: "Lack of tracking leading to inventory shrinkage"
    },
    {
      icon: Calendar,
      title: "Material Expiry",
      description: "Chemicals, dyes expiring due to poor FIFO management"
    },
    {
      icon: Boxes,
      title: "Overstocking",
      description: "Excess inventory blocking working capital"
    },
    {
      icon: Search,
      title: "Lost Items",
      description: "Difficulty locating materials in large warehouses"
    }
  ];

  const solutions = [
    {
      icon: Barcode,
      title: "Barcode/RFID Tracking",
      description: "Every item scanned at every movement point"
    },
    {
      icon: RefreshCw,
      title: "Real-time Stock Updates",
      description: "Instant inventory updates across all locations"
    },
    {
      icon: Box,
      title: "Batch & Lot Tracking",
      description: "Complete traceability from receipt to dispatch"
    },
    {
      icon: MapPin,
      title: "Location-wise Storage",
      description: "Optimized storage, picking paths, space utilization"
    },
    {
      icon: Bell,
      title: "Automated Alerts",
      description: "Low stock, expiry, slow-moving items notifications"
    }
  ];

  return (
    <div>
      <SlideHeader
        title="Inventory & Warehouse Automation"
        subtitle="Real-time visibility and control over textile inventory"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Problems */}
        <div>
          <h3 className="text-xl font-bold text-red-500 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Inventory Problems:
          </h3>
          <div className="space-y-4">
            {problems.map((problem, index) => (
              <ProblemItem
                key={index}
                icon={problem.icon}
                title={problem.title}
                description={problem.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Solutions */}
        <div>
          <h3 className="text-xl font-bold text-green-500 mb-4 flex items-center gap-2">
            <Warehouse className="w-5 h-5" />
            ERP Inventory Features:
          </h3>
          <div className="space-y-4">
            {solutions.map((solution, index) => (
              <SolutionItem
                key={index}
                icon={solution.icon}
                title={solution.title}
                description={solution.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>

      <HighlightBox 
        title="Inventory Optimization Results:"
        color="blue"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
          <StatCard value="99.5%" label="Inventory Accuracy" />
          <StatCard value="30%" label="Reduction in Inventory Holding" />
          <StatCard value="70%" label="Faster Picking & Dispatch" />
          <StatCard value="95%" label="Reduction in Stock-outs" />
        </div>
      </HighlightBox>

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
          <Smartphone className="w-6 h-6" />
          Mobile Warehouse Management:
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-700 mb-4">ERP includes mobile apps for warehouse staff with features:</p>
            <ul className="space-y-3 pl-5">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Barcode scanning using mobile camera
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Real-time stock inquiry
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Pick/pack/ship confirmation
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Cycle counting and stock taking
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Putaway with location guidance
              </li>
            </ul>
          </div>
          
          <div className="flex justify-center">
            <motion.div
              initial={{ rotate: -5 }}
              animate={{ rotate: 5 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-[2rem] p-5 shadow-2xl"
            >
              <div className="w-full h-full bg-gray-900/30 rounded-2xl p-4 flex flex-col items-center">
                <div className="text-center text-white mb-4">
                  <div className="font-semibold text-lg">Warehouse App</div>
                  <div className="text-sm text-gray-300">Scan • Pick • Dispatch</div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-3 w-full mb-3 text-white">
                  <div className="font-medium">Item: Cotton Yarn 40s</div>
                  <div className="text-sm text-gray-300">Location: A-12-05</div>
                </div>
                
                <div className="my-8">
                  <Barcode className="w-16 h-16 text-green-400" />
                </div>
                
                <div className="text-white text-sm text-center">
                  Scan barcode to update stock
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide14;