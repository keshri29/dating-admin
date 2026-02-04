import React from 'react';
import SlideHeader from './common/SlideHeader';
import ModuleCard from './common/ModuleCard';
import ProcessStep from './common/ProcessStep';
import HighlightBox from './common/HighlightBox';
import { motion } from 'framer-motion';
import { Circle, Grid3x3, Palette, Stamp, Shirt, Eye, ClipboardList, BookDashed, Box, Clock, ArrowRight} from 'lucide-react';

const Slide11 = () => {
  const processSteps = [
    { icon: Circle, label: "Spinning", color: "purple" },
    { icon: Grid3x3, label: "Weaving", color: "teal" },
    { icon: Palette, label: "Dyeing", color: "green" },
    { icon: Stamp, label: "Printing", color: "orange" },
    { icon: Shirt, label: "Garmenting", color: "teal" }
  ];

  const erpTracks = [
    {
      icon: ClipboardList,
      title: "Work Orders",
      description: "Digital work orders with specifications, quantities, deadlines"
    },
    {
      icon: BookDashed,
      title: "Machine Utilization",
      description: "OEE tracking, downtime analysis, maintenance scheduling"
    },
    {
      icon: Box,
      title: "Batch Tracking",
      description: "Complete traceability from raw material to finished goods"
    },
    {
      icon: Clock,
      title: "Process Monitoring",
      description: "Real-time status, delays, bottlenecks identification"
    }
  ];

  return (
    <div>
      <SlideHeader
        title="Manufacturing Process Control"
        subtitle="End-to-end visibility and control across textile manufacturing"
      />

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 my-12 flex-wrap">
        {processSteps.map((step, index) => (
          <React.Fragment key={index}>
            <ProcessStep
              icon={step.icon}
              label={step.label}
              color={step.color}
              delay={index * 0.1}
            />
            {index < processSteps.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="text-yellow-500 text-2xl md:rotate-0 rotate-90"
              >
                <ArrowRight className="w-8 h-8" />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>

      <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
        <Eye className="w-6 h-6" />
        ERP Tracks Everything:
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {erpTracks.map((track, index) => (
          <ModuleCard
            key={index}
            icon={track.icon}
            title={track.title}
            description={track.description}
            delay={index * 0.1}
          />
        ))}
      </div>

      <HighlightBox 
        title="Production Intelligence:"
        color="blue"
      >
        <p className="text-gray-700">
          ERP provides real-time insights into <strong>machine efficiency</strong>, <strong>operator performance</strong>, <strong>quality metrics</strong>, and <strong>production costs</strong> at every stage of manufacturing.
        </p>
      </HighlightBox>
    </div>
  );
};

export default Slide11;