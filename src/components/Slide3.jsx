 import SlideHeader from './common/SlideHeader';
import ProblemItem from './common/ProblemItem';
import HighlightBox from './common/HighlightBox';
import { AlertTriangle, DollarSign, TrendingUp, Package, Clock, EyeOff, FileText, Unlink } from 'lucide-react';
import { motion } from 'framer-motion';

const Slide3 = () => {
  const problems = [
    {
      icon: DollarSign,
      title: "Rising Labor Costs",
      description: "Increasing wage pressures and shortage of skilled workforce"
    },
    {
      icon: TrendingUp,
      title: "Raw Material Price Fluctuation",
      description: "Unpredictable cotton, polyester, and dye prices affecting margins"
    },
    {
      icon: Package,
      title: "Inventory Losses",
      description: "15-25% material wastage due to poor tracking and management"
    },
    {
      icon: Clock,
      title: "Production Delays",
      description: "Average 20% delay in order delivery affecting customer satisfaction"
    },
    {
      icon: EyeOff,
      title: "Poor Visibility",
      description: "Lack of real-time insights across spinning, weaving, dyeing, and garmenting"
    },
    {
      icon: FileText,
      title: "Manual Reporting",
      description: "Error-prone Excel sheets and paper-based documentation"
    },
    {
      icon: Unlink,
      title: "Disconnected Departments",
      description: "Silos between procurement, production, inventory, and sales teams"
    }
  ];

  return (
    <div className=''>
      <SlideHeader
        title="Textile Industry Today"
        subtitle="Reality check - Challenges in the modern textile landscape"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <HighlightBox 
          icon={AlertTriangle}
          title="Critical Problem Statement:"
          color="red"
        >
          <p className="text-xl md:text-2xl font-semibold text-gray-800">
            Data is scattered, decisions are slow, and profits are leaking through operational inefficiencies.
          </p>
        </HighlightBox>
      </motion.div>

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
  );
};

export default Slide3;