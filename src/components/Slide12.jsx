 import SlideHeader from './common/SlideHeader';
import SolutionItem from './common/SolutionItem';
import HighlightBox from './common/HighlightBox';
import { TrendingUp, Calendar, BookDashed, User, BarChart, Ban, Rocket, Currency, TruckElectric } from 'lucide-react';
import { motion } from 'framer-motion';

const Slide12 = () => {
  const erpProvides = [
    {
      icon: TrendingUp,
      title: "Demand Forecasting",
      description: "AI-powered prediction based on historical data, seasonality, trends"
    },
    {
      icon: Calendar,
      title: "Intelligent Production Scheduling",
      description: "Optimal sequencing based on machine availability, priorities, constraints"
    },
    {
      icon: BookDashed,
      title: "Machine Allocation & Utilization",
      description: "Balanced workload distribution, preventive maintenance scheduling"
    },
    {
      icon: User,
      title: "Manpower Planning",
      description: "Right skill allocation, shift planning, overtime optimization"
    },
    {
      icon: BarChart,
      title: "Capacity Utilization Optimization",
      description: "Maximize throughput while minimizing costs and bottlenecks"
    }
  ];

  const businessResults = [
    {
      icon: Ban,
      title: "Zero Idle Time",
      description: "Optimized scheduling eliminates machine and labor idle time"
    },
    {
      icon: TruckElectric,
      title: "On-time Delivery",
      description: "95%+ on-time delivery through accurate planning and tracking"
    },
    {
      icon: Currency,
      title: "Reduced WIP",
      description: "30-40% reduction in work-in-progress inventory"
    },
    {
      icon: Rocket,
      title: "Faster Throughput",
      description: "20-30% increase in production throughput"
    }
  ];

  return (
    <div>
      <SlideHeader
        title="Production Planning & Scheduling"
        subtitle="Optimized planning for maximum efficiency and on-time delivery"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
            <BookDashed className="w-5 h-5" />
            ERP Provides:
          </h3>
          
          <div className="space-y-4">
            {erpProvides.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-5 bg-blue-50 rounded-xl border-l-4 border-blue-500 hover:translate-x-2 transition-transform duration-300"
              >
                <div className="text-blue-500 text-2xl flex-shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-96 bg-gradient-to-br from-gray-800 to-blue-900 rounded-xl shadow-xl p-4"
          >
            <div className="grid grid-cols-4 grid-rows-3 gap-3 h-full">
              <div className="col-span-2 row-span-1 dashboard-widget bg-green-500/20">
                <div className="text-3xl font-bold">94%</div>
                <div className="text-sm">Capacity Utilization</div>
              </div>
              <div className="dashboard-widget bg-blue-500/20">
                <div className="text-2xl font-bold">42</div>
                <div className="text-xs">Active Orders</div>
              </div>
              <div className="dashboard-widget bg-orange-500/20">
                <div className="text-2xl font-bold">18</div>
                <div className="text-xs">Pending Orders</div>
              </div>
              <div className="col-span-4 row-span-2 dashboard-widget flex flex-col justify-center p-4">
                <div className="text-lg font-bold mb-4">Production Schedule - Next 7 Days</div>
                <div className="flex justify-between text-sm mb-3">
                  <div>Today: 8 batches</div>
                  <div>Day 2: 10 batches</div>
                  <div>Day 3: 9 batches</div>
                  <div>Day 4: 7 batches</div>
                </div>
                <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-green-500"></div>
                </div>
              </div>
              <div className="col-span-2 row-span-1 dashboard-widget bg-purple-500/20">
                <div className="text-2xl font-bold">6%</div>
                <div className="text-sm">Machine Downtime</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <HighlightBox 
        title="Business Results:"
        color="green"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {businessResults.map((result, index) => (
            <SolutionItem
              key={index}
              icon={result.icon}
              title={result.title}
              description={result.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </HighlightBox>
    </div>
  );
};

export default Slide12;