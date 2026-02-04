 import SlideHeader from './common/SlideHeader';
import ProblemItem from './common/ProblemItem';
import SolutionItem from './common/SolutionItem';
import HighlightBox from './common/HighlightBox';
import { EyeOff, TrendingUp,  Truck, Monitor, Box, BarChart, Percent, Award, Info, Store, Server, StoreIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Slide17 = () => {
  const challenges = [
    {
      icon: EyeOff,
      title: "No Visibility of Franchise Stock",
      description: "Can't see what's available at retail outlets"
    },
    {
      icon: TrendingUp,
      title: "Fake Sales Reports",
      description: "Underreporting of actual sales by franchisees"
    },
    {
      icon: TrendingUp,
      title: "Revenue Leakage",
      description: "Unaccounted sales, theft, mismanagement"
    },
    {
      icon: Truck,
      title: "Stock Replenishment Issues",
      description: "Manual ordering leads to stock-outs or overstocking"
    },
    {
      icon: Info,
      title: "Lack of Customer Data",
      description: "No real-time insights into customer behavior"
    }
  ];

  const solutions = [
    {
      icon: Monitor,
      title: "Centralized POS System",
      description: "Cloud-based POS with real-time sales data"
    },
    {
      icon: Box,
      title: "Franchise Stock Tracking",
      description: "Real-time visibility of stock at all outlets"
    },
    {
      icon: BarChart,
      title: "Sales Monitoring & Analytics",
      description: "Real-time sales dashboards, performance comparison"
    },
    {
      icon: Percent,
      title: "Automated Commission Calculation",
      description: "Based on actual sales, targets, incentives"
    },
    {
      icon: Award,
      title: "Loyalty Programs",
      description: "Customer loyalty tracking, rewards, promotions"
    }
  ];

  return (
    <div>
      <SlideHeader
        title="Retail & Franchise Management"
        subtitle="Unified control over distributed retail network"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
         <div>
          <h3 className="text-xl font-bold text-red-500 mb-4 flex items-center gap-2">
            <StoreIcon className="w-5 h-5" />
            Retail Challenges:
          </h3>
          <div className="space-y-4">
            {challenges.map((challenge, index) => (
              <ProblemItem
                key={index}
                icon={challenge.icon}
                title={challenge.title}
                description={challenge.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Solutions */}
        <div>
          <h3 className="text-xl font-bold text-green-500 mb-4 flex items-center gap-2">
            <Store className="w-5 h-5" />
            ERP Retail Solution:
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
        title="Centralized Retail Network:"
        color="yellow"
      >
        <div className="text-center">
          <div className="inline-block w-24 h-24 bg-gradient-to-br from-blue-800 to-blue-900 rounded-full items-center justify-center text-white font-bold text-lg mb-6 shadow-xl">
             <br />
            HQ
          </div>
          
          <div className="flex justify-center gap-8 md:gap-12 mt-8 flex-wrap">
            {[1, 2, 3, 4, 5].map((store) => (
              <div key={store} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center text-white mb-3 mx-auto shadow-lg">
                  <Store className="w-6 h-6" />
                </div>
                <div className="font-medium">Store {store}</div>
                <div className="text-sm text-gray-600">Sales: ₹{(store * 0.6 + 1.8).toFixed(1)}L</div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-gray-600 text-sm">
            <Info className="w-4 h-4 inline mr-1" />
            All stores connected in real-time to central ERP
          </div>
        </div>
      </HighlightBox>
    </div>
  );
};

export default Slide17;