import React from 'react';
import SlideHeader from './common/SlideHeader'; 
import HighlightBox from './common/HighlightBox';
import { Hand, History, TrendingDown, AlertTriangle, Brain, TrendingUp, BookDashed, ArrowLeft, ArrowRight, Code} from 'lucide-react';
import { motion } from 'framer-motion';

const Slide29 = () => {
  const fromProblems = [
    { icon: Hand, title: "Manual Processes" },
    { icon: History, title: "Reactive Operations" },
    { icon: TrendingDown, title: "Profit Leakage" },
    { icon: AlertTriangle, title: "Operational Chaos" }
  ];

  const toSolutions = [
    { icon: Code, title: "Digital Transformation" },
    { icon: Brain, title: "Predictive Intelligence" },
    { icon: TrendingUp, title: "Sustainable Profits" },
    { icon: BookDashed, title: "Complete Control" }
  ];

  const journeySteps = [
    { step: 1, title: "Digitization", description: "Paper to digital records", color: "bg-blue-800" },
    { step: 2, title: "Integration", description: "Connect departments & processes", color: "bg-blue-800" },
    { step: 3, title: "Automation", description: "Reduce manual intervention", color: "bg-blue-800" },
    { step: 4, title: "Optimization", description: "Continuous improvement", color: "bg-yellow-400" },
    { step: 5, title: "Innovation", description: "AI, IoT, Industry 4.0", color: "bg-green-500" }
  ];

  return (
    <div>
      <SlideHeader
        title="Vision for Textile Industry"
        subtitle="Transforming textile businesses for the digital age and beyond"
      />

      <div className="text-center my-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block p-8 md:p-12 bg-gradient-to-br from-blue-800 to-blue-900 text-white rounded-2xl shadow-2xl mb-8"
        >
          <div className="text-3xl md:text-4xl font-extrabold mb-4">
            ERP is not just software,
          </div>
          <div className="text-2xl md:text-3xl font-bold text-yellow-400">
            It is Business Transformation
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-12 flex-wrap">
        {/* From Column */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 min-w-[300px]"
        >
          <div className="bg-red-50 p-8 rounded-2xl h-full border-l-4 border-red-500">
            <h3 className="text-2xl text-red-500 mb-6 font-bold flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              From:
            </h3>
            <div className="space-y-4">
              {fromProblems.map((problem, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg">
                  <problem.icon className="w-6 h-6 text-red-500" />
                  <div className="font-medium">{problem.title}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Arrow */}
        <div className="flex items-center justify-center">
          <div className="text-4xl text-yellow-500">
            <ArrowRight className="w-12 h-12" />
          </div>
        </div>

        {/* To Column */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 min-w-[300px]"
        >
          <div className="bg-green-50 p-8 rounded-2xl h-full border-l-4 border-green-500">
            <h3 className="text-2xl text-green-500 mb-6 font-bold flex items-center gap-2">
              To:
              <ArrowRight className="w-5 h-5" />
            </h3>
            <div className="space-y-4">
              {toSolutions.map((solution, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg">
                  <solution.icon className="w-6 h-6 text-green-500" />
                  <div className="font-medium">{solution.title}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <HighlightBox 
        title="The Digital Transformation Journey:"
        color="yellow"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 flex-wrap gap-4">
          {journeySteps.map((step, index) => (
            <React.Fragment key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center flex-1 min-w-[150px]"
              >
                <div className={`w-16 h-16 ${step.color} text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3 ${
                  step.step === 4 ? 'text-blue-900' : 'text-white'
                }`}>
                  {step.step}
                </div>
                <div className="font-semibold text-gray-800">{step.title}</div>
                <div className="text-sm text-gray-600">{step.description}</div>
              </motion.div>
              
              {index < journeySteps.length - 1 && (
                <div className="text-blue-800 text-2xl hidden md:block">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </HighlightBox>
    </div>
  );
};

export default Slide29;