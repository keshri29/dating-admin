import React from 'react';
import SlideHeader from './common/SlideHeader';
import HighlightBox from './common/HighlightBox';
import { Calendar, Users, ClipboardList, Database, GraduationCap, Rocket, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Slide26 = () => {
  const timelinePhases = [
    {
      phase: "Phase 1: Requirement Study",
      duration: "2-3 weeks",
      description: "Detailed analysis of current processes, pain points, and customization needs",
      items: ["Process mapping workshops", "Gap analysis", "Customization specifications"]
    },
    {
      phase: "Phase 2: Customization & Configuration",
      duration: "4-6 weeks",
      description: "System setup based on your specific textile business requirements",
      items: ["Master data setup", "Workflow configuration", "Report customization"]
    },
    {
      phase: "Phase 3: Data Migration",
      duration: "2-3 weeks",
      description: "Careful migration from legacy systems to new ERP",
      items: ["Customer/vendor data", "Product catalog", "Opening balances"]
    },
    {
      phase: "Phase 4: Training & Testing",
      duration: "3-4 weeks",
      description: "Comprehensive training and system testing",
      items: ["User training sessions", "UAT (User Acceptance Testing)", "Parallel run validation"]
    },
    {
      phase: "Phase 5: Go-live & Support",
      duration: "System launch",
      description: "System launch with full support team on standby",
      items: ["Go-live weekend", "Hypercare support (2 weeks)", "Regular support handover"]
    }
  ];

  const timelineColors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-orange-500",
    "bg-purple-500",
    "bg-red-500"
  ];

  return (
    <div>
      <SlideHeader
        title="Implementation Strategy"
        subtitle="Phased approach for smooth transition with zero business disruption"
      />

      <div className="relative max-w-4xl mx-auto my-12">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-800 to-yellow-400 hidden md:block"></div>
        
        {timelinePhases.map((phase, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`relative mb-12 ${index % 2 === 0 ? 'md:mr-auto md:pr-12 md:pl-0' : 'md:ml-auto md:pl-12 md:pr-0'}`}
            style={{ width: '90%', maxWidth: '500px' }}
          >
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-800">
              <h3 className="text-xl font-bold text-blue-800 mb-2">{phase.phase}</h3>
              <p className="text-gray-600 mb-3">{phase.description}</p>
              <ul className="space-y-1 pl-5">
                {phase.items.map((item, idx) => (
                  <li key={idx} className="text-gray-700 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-sm text-gray-500 font-semibold">
                Duration: {phase.duration}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <HighlightBox 
        title="Typical Implementation Timeline:"
        color="yellow"
      >
        <div className="space-y-6 mt-6">
          {timelinePhases.map((phase, index) => (
            <div key={index} className="flex items-center">
              <div className="w-32 text-right pr-4 font-semibold text-gray-700">
                {phase.duration.includes("weeks") 
                  ? phase.duration 
                  : "Week " + (17 - timelinePhases.length + index)}
                :
              </div>
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className={`h-full ${timelineColors[index]} rounded-full`}
                  />
                </div>
                <div className="mt-2 text-sm text-gray-600">{phase.phase.split(":")[0]}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8 font-semibold text-blue-800 text-lg">
          Total: 4-5 Months from Kick-off to Go-live
        </div>
      </HighlightBox>
    </div>
  );
};

export default Slide26;