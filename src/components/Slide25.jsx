import React from 'react';
import SlideHeader from './common/SlideHeader';
 import StatCard from './common/StatCard';
import HighlightBox from './common/HighlightBox';
import { TrendingUp, Handshake, Trophy, Building, ChartLine, DollarSign, UserCheck, Target, CheckCircle, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const Slide25 = () => {
  const impactMetrics = [
    {
      icon: DollarSign,
      title: "Cash Flow Improvement",
      description: "30-45 days faster cash conversion cycle through better collections and inventory management"
    },
    {
      icon: ChartLine,
      title: "Brand Image Enhancement",
      description: "Consistent quality, on-time delivery, and professional operations improve market reputation"
    },
    {
      icon: Handshake,
      title: "Investor Confidence",
      description: "Transparent operations, accurate reporting, and growth potential attract investment"
    },
    {
      icon: Trophy,
      title: "Competitive Advantage",
      description: "Lower costs, faster response times, and better customer service differentiate from competitors"
    }
  ];

  return (
    <div>
      <SlideHeader
        title="ROI & Business Impact"
        subtitle="ERP pays for itself quickly and transforms your textile business"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        <div>
          <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-3">
            <TrendingUp className="w-6 h-6" />
            ERP Pays for Itself Within:
          </h3>
          
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="w-64 h-64 bg-gradient-to-r from-green-500 via-blue-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
                <div className="w-52 h-52 bg-white rounded-full flex flex-col items-center justify-center">
                  <div className="text-5xl font-extrabold text-blue-800">6-12</div>
                  <div className="text-2xl font-bold text-blue-900">Months</div>
                </div>
              </div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-2 -left-6 bg-green-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg"
              >
                70% of clients
              </motion.div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 }}
                className="absolute top-20 -right-8 bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg"
              >
                25% of clients
              </motion.div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9 }}
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg"
              >
                5% of clients
              </motion.div>
            </div>
          </div>
          
          <HighlightBox 
            icon={CheckCircle}
            title="Based on Actual Client Results:"
            color="blue"
          >
            <p className="text-gray-700">
              Our textile ERP clients typically achieve full ROI within 6-12 months through cost savings, productivity improvements, and increased sales.
            </p>
          </HighlightBox>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-3">
            <Target className="w-6 h-6" />
            Improves Key Business Metrics:
          </h3>
          
          <div className="space-y-4">
            {impactMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-5 bg-blue-50 rounded-xl border-l-4 border-blue-500 hover:translate-x-2 transition-transform duration-300"
              >
                <div className="text-blue-500 text-2xl flex-shrink-0">
                  <metric.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">{metric.title}</h4>
                  <p className="text-gray-600">{metric.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <HighlightBox 
            title="5-Year Business Impact:"
            color="green"
          >
            <div className="grid grid-cols-2 gap-6 mt-4">
              <StatCard value="3-5x" label="Business Growth" />
              <StatCard value="40-60%" label="Higher Profitability" />
            </div>
          </HighlightBox>
        </div>
      </div>
    </div>
  );
};

export default Slide25;