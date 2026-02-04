 import SlideHeader from './common/SlideHeader';
import SolutionItem from './common/SolutionItem';
import HighlightBox from './common/HighlightBox';
import { Gauge, User, Clock, Star, Gift, Award, Scale, Handshake, TrendingUp, Info, BookDashed } from 'lucide-react';
import { motion } from 'framer-motion';

const Slide9 = () => {
  const features = [
    {
      icon: BookDashed,
      title: "Machine-wise Output Tracking",
      description: "Real-time monitoring of production against targets"
    },
    {
      icon: User,
      title: "Worker Efficiency Analytics",
      description: "Individual and team productivity metrics"
    },
    {
      icon: Clock,
      title: "Overtime Calculation & Control",
      description: "Automated overtime tracking with approval workflows"
    },
    {
      icon: Star,
      title: "Performance Rating System",
      description: "Objective evaluation based on multiple parameters"
    },
    {
      icon: Gift,
      title: "Incentive Automation",
      description: "Performance-based incentive calculation and disbursement"
    }
  ];

  return (
    <div>
      <SlideHeader
        title="Labor Productivity Tracking"
        subtitle="Data-driven approach to maximize workforce efficiency"
      />

      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
            <Gauge className="w-5 h-5" />
            Key Features:
          </h3>
          
          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-5 bg-blue-50 rounded-xl border-l-4 border-blue-500 hover:translate-x-2 transition-transform duration-300"
              >
                <div className="text-blue-500 text-2xl flex-shrink-0">
                  {feature.icon && <feature.icon className="w-6 h-6" />}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-96 bg-gradient-to-br from-gray-800 to-blue-900 rounded-xl shadow-xl p-4"
          >
            <div className="grid grid-cols-4 grid-rows-3 gap-3 h-full">
              <div className="col-span-2 row-span-1 dashboard-widget">
                <div className="text-3xl font-bold">85%</div>
                <div className="text-sm">Overall Efficiency</div>
              </div>
              <div className="dashboard-widget">
                <div className="text-2xl font-bold">312</div>
                <div className="text-xs">Workers Present</div>
              </div>
              <div className="dashboard-widget">
                <div className="text-2xl font-bold">24</div>
                <div className="text-xs">On Leave</div>
              </div>
              <div className="col-span-4 row-span-1 dashboard-widget">
                <div className="text-sm font-semibold">
                  Top Performer: Rajesh Kumar (Weaving Dept) - 118%
                </div>
              </div>
              <div className="col-span-2 row-span-1 dashboard-widget">
                <div className="text-2xl font-bold">92%</div>
                <div className="text-sm">Spinning Efficiency</div>
              </div>
              <div className="col-span-2 row-span-1 dashboard-widget">
                <div className="text-2xl font-bold">78%</div>
                <div className="text-sm">Dyeing Efficiency</div>
              </div>
            </div>
          </motion.div>
          
          <p className="text-center text-gray-200 mt-10 text-sm">
            <Info className="w-4 h-4 inline mr-1" />
            Live Productivity Dashboard - Real-time monitoring of workforce efficiency
          </p>
        </div>
      </div>

      <HighlightBox 
        title="Business Benefits:"
        color="green"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <SolutionItem
            icon={TrendingUp}
            title="Higher Productivity"
            description="15-25% increase in output through performance tracking"
          />
          <SolutionItem
            icon={Handshake}
            title="Reduced Disputes"
            description="Transparent data eliminates salary and incentive conflicts"
          />
          <SolutionItem
            icon={Scale}
            title="Fair Wage Distribution"
            description="Performance-based compensation improves morale"
          />
          <SolutionItem
            icon={Award}
            title="Motivation System"
            description="Recognition and rewards for top performers"
          />
        </div>
      </HighlightBox>
    </div>
  );
};

export default Slide9;