import React from 'react';
import SlideHeader from './common/SlideHeader';
import ModuleCard from './common/ModuleCard';
import HighlightBox from './common/HighlightBox';
import { Brain, User, Box, BookDashed, Bell, Route, TrendingUp, Building } from 'lucide-react';
import { motion } from 'framer-motion';

const Slide21 = () => {
  const capabilities = [
    {
      icon: Brain,
      title: "Demand Prediction",
      description: "AI algorithms forecast demand based on multiple factors"
    },
    {
      icon: User,
      title: "Fraud Detection",
      description: "Pattern recognition to identify fraudulent activities"
    },
    {
      icon: Box,
      title: "Auto Stock Reordering",
      description: "Intelligent replenishment based on consumption patterns"
    },
    {
      icon: BookDashed,
      title: "Predictive Maintenance",
      description: "Machine learning to predict equipment failures before they happen"
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Context-aware notifications for exceptions and opportunities"
    },
    {
      icon: Building,
      title: "Industry 4.0 Ready",
      description: "IoT integration, smart factory capabilities, digital twin"
    }
  ];

  const automationExamples = [
    {
      icon: Box,
      title: "Smart Inventory Management",
      description: "System automatically creates purchase orders when stock reaches reorder level, considering lead time, seasonality, and demand forecasts.",
      color: "from-blue-50 to-blue-100",
      border: "border-blue-500"
    },
    {
      icon: BookDashed,
      title: "Predictive Maintenance",
      description: "Analyzes machine sensor data to predict failures 7-14 days in advance, scheduling maintenance during non-production hours.",
      color: "from-green-50 to-green-100",
      border: "border-green-500"
    },
    {
      icon: TrendingUp,
      title: "Dynamic Pricing",
      description: "AI analyzes market conditions, competitor pricing, and demand to recommend optimal pricing for maximum profitability.",
      color: "from-orange-50 to-orange-100",
      border: "border-orange-500"
    },
    {
      icon: Route,
      title: "Optimal Production Scheduling",
      description: "Considers machine availability, worker skills, material availability, and order priorities to create the most efficient production schedule.",
      color: "from-purple-50 to-purple-100",
      border: "border-purple-500"
    }
  ];

  return (
    <div>
      <SlideHeader
        title="Automation & AI Ready ERP"
        subtitle="Future-proof textile business with intelligent automation"
      />

      <div className="mb-12">
        <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-3">
          <Building className="w-6 h-6" />
          Future-Ready ERP Capabilities:
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((capability, index) => (
            <ModuleCard
              key={index}
              icon={capability.icon}
              title={capability.title}
              description={capability.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>

      <HighlightBox 
        title="Intelligent Automation Examples:"
        color="yellow"
      >
        <div className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {automationExamples.slice(0, 2).map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`bg-gradient-to-br ${example.color} p-6 rounded-xl border-l-4 ${example.border}`}
              >
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <example.icon className="w-5 h-5" />
                  {example.title}
                </h4>
                <p className="text-gray-700">{example.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {automationExamples.slice(2).map((example, index) => (
              <motion.div
                key={index + 2}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 2) * 0.2 }}
                className={`bg-gradient-to-br ${example.color} p-6 rounded-xl border-l-4 ${example.border}`}
              >
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <example.icon className="w-5 h-5" />
                  {example.title}
                </h4>
                <p className="text-gray-700">{example.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </HighlightBox>

      <div className="text-center mt-12">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="inline-block p-6 md:p-8 bg-gradient-to-br from-blue-800 to-blue-900 text-white rounded-2xl font-bold text-xl md:text-2xl shadow-2xl"
        >
          <Building className="w-8 h-8 inline mr-4" />
          Industry 4.0 Ready Textile Manufacturing
        </motion.div>
      </div>
    </div>
  );
};

export default Slide21;