import React from 'react';
import SlideHeader from './common/SlideHeader';
import ModuleCard from './common/ModuleCard';
import SolutionItem from './common/SolutionItem';
import HighlightBox from './common/HighlightBox';
import { Users, ShoppingCart, MessageSquare, Headphones, Megaphone, TrendingUp, RefreshCw, Heart, UserPlus, CheckCircle, Smartphone, Map, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const Slide19 = () => {
  const features = [
    {
      icon: Map,
      title: "Customer Database",
      description: "Centralized customer profiles with complete history"
    },
    {
      icon: ShoppingCart,
      title: "Buying History & Analysis",
      description: "Purchase patterns, preferences, value analysis"
    },
    {
      icon: MessageSquare,
      title: "Feedback & Satisfaction",
      description: "Customer feedback collection, NPS tracking"
    },
    {
      icon: Headphones,
      title: "Complaint Management",
      description: "Issue tracking, resolution, response time monitoring"
    },
    {
      icon: Megaphone,
      title: "Marketing Campaigns",
      description: "Targeted promotions, new product announcements"
    },
    {
      icon: TrendingUp,
      title: "Sales Pipeline Management",
      description: "Lead tracking, opportunity management, forecasting"
    }
  ];

  const businessResults = [
    {
      icon: RefreshCw,
      title: "Repeat Customers",
      description: "35-50% increase in repeat business through better engagement"
    },
    {
      icon: Heart,
      title: "Brand Loyalty",
      description: "Higher customer retention and reduced churn"
    },
    {
      icon: DollarSign,
      title: "Cross-selling",
      description: "25% higher cross-selling through understanding customer needs"
    },
    {
      icon: UserPlus,
      title: "Customer Acquisition",
      description: "30% lower cost of acquiring new customers"
    }
  ];

  return (
    <div>
      <SlideHeader
        title="CRM - Customer Relationship Management"
        subtitle="Building lasting relationships with textile customers"
      />

      <div className="mb-12">
        <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-3">
          <Users className="w-6 h-6" />
          CRM Features:
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <ModuleCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>

      <HighlightBox 
        title="Business Results:"
        color="green"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
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

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
          <Smartphone className="w-6 h-6" />
          Customer Portal:
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-900 mb-4">ERP includes a customer self-service portal with:</p>
            <ul className="space-y-3 pl-5">
              <li className="flex items-center gap-2 text-black">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Order placement and tracking
              </li>
              <li className="flex items-center gap-2 text-black">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Account statements and invoices
              </li>
              <li className="flex items-center gap-2 text-black">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Product catalog and pricing
              </li>
              <li className="flex items-center gap-2 text-black">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Complaint registration and tracking
              </li>
              <li className="flex items-center gap-2 text-black">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Credit limit and payment status
              </li>
            </ul>
          </div>
          
          <div className="flex justify-center">
            <motion.div
              initial={{ rotate: -5 }}
              animate={{ rotate: 5 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
              className="bg-gradient-to-br from-purple-700 to-purple-900 rounded-[2rem] p-5 shadow-2xl"
            >
              <div className="w-full h-full bg-white/10 rounded-2xl p-4 flex flex-col">
                <div className="text-center text-white mb-4">
                  <div className="font-semibold text-lg">Customer Portal</div>
                  <div className="text-sm text-gray-300">Welcome, Textile Traders</div>
                </div>
                
                <div className="bg-white/20 rounded-lg p-3 mb-3 text-white">
                  <div className="font-medium">Orders: 5 Active</div>
                  <div className="text-sm text-gray-300">Latest: ORD-2023-0421</div>
                </div>
                
                <div className="bg-white/20 rounded-lg p-3 mb-3 text-white">
                  <div className="font-medium">Credit Available: ₹4,85,000</div>
                </div>
                
                <div className="mt-auto text-center">
                  <div className="text-sm text-gray-300">Last Login: Today 10:42 AM</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide19;