import React from 'react';
import SlideHeader from './common/SlideHeader';
import SolutionItem from './common/SolutionItem';
import HighlightBox from './common/HighlightBox';
import { Gauge, TrendingUp, AlertTriangle, Search, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const Slide20 = () => {
  const analyticsFeatures = [
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "Forecast demand, identify trends, anticipate issues"
    },
    {
      icon: AlertTriangle,
      title: "Exception Reporting",
      description: "Alerts for deviations from targets and standards"
    },
    {
      icon: Search,
      title: "Drill-down Capability",
      description: "Click any metric to see underlying details and causes"
    },
    {
      icon: Smartphone,
      title: "Mobile Access",
      description: "Dashboards accessible on smartphones and tablets"
    }
  ];

  return (
    <div>
      <SlideHeader
        title="Analytics & Dashboard"
        subtitle="Data-driven decision making with real-time insights"
      />

      <div className="mb-12">
        <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-3">
          <Gauge className="w-6 h-6" />
          Real-time Dashboards:
        </h3>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="h-96 bg-gradient-to-br from-gray-800 to-blue-900 rounded-xl shadow-xl p-4"
        >
          <div className="grid grid-cols-4 grid-rows-3 gap-3 h-full">
            <div className="dashboard-widget bg-blue-500/20">
              <div className="text-3xl font-bold">₹42.5L</div>
              <div className="text-sm">Today&apos;s Sales</div>
            </div>
            <div className="dashboard-widget bg-green-500/20">
              <div className="text-3xl font-bold">85%</div>
              <div className="text-sm">Production Efficiency</div>
            </div>
            <div className="dashboard-widget bg-orange-500/20">
              <div className="text-3xl font-bold">₹18.3L</div>
              <div className="text-sm">Inventory Value</div>
            </div>
            <div className="dashboard-widget bg-purple-500/20">
              <div className="text-3xl font-bold">24.2%</div>
              <div className="text-sm">Net Profit Margin</div>
            </div>
            
            <div className="col-span-2 row-span-2 dashboard-widget flex flex-col p-4">
              <div className="text-lg font-bold mb-4">Worker Performance</div>
              <div className="flex-1 flex flex-col justify-around">
                {[
                  { dept: "Weaving Dept", value: 92, color: "bg-green-500" },
                  { dept: "Spinning Dept", value: 88, color: "bg-blue-500" },
                  { dept: "Dyeing Dept", value: 78, color: "bg-orange-500" },
                  { dept: "Garmenting", value: 85, color: "bg-purple-500" }
                ].map((item, idx) => (
                  <div key={idx} className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.dept}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color}`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="col-span-2 row-span-2 dashboard-widget flex flex-col p-4">
              <div className="text-lg font-bold mb-4">Order Status</div>
              <div className="flex-1 flex flex-col justify-center">
                {[
                  { status: "Confirmed", count: 42, color: "bg-blue-500" },
                  { status: "In Production", count: 18, color: "bg-orange-500" },
                  { status: "Ready to Ship", count: 24, color: "bg-green-500" },
                  { status: "Delivered", count: 156, color: "bg-purple-500" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center mb-4">
                    <div className={`w-4 h-4 ${item.color} rounded-full mr-3`} />
                    <div className="flex-1">{item.status} ({item.count})</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <HighlightBox 
        title="Decision Making Becomes Data Driven:"
        color="blue"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {analyticsFeatures.map((feature, index) => (
            <SolutionItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </HighlightBox>
    </div>
  );
};

export default Slide20;