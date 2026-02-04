import React from 'react';
import SlideHeader from './common/SlideHeader';
import SolutionItem from './common/SolutionItem';
import HighlightBox from './common/HighlightBox';
import { Cloud, Smartphone, Eye, Building, RefreshCw, Globe, WifiOff, DollarSign, Expand, Zap, CheckCircle, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';

const Slide23 = () => {
  const advantages = [
    {
      icon: Globe,
      title: "Access From Anywhere",
      description: "Work from office, home, or on the go with internet connection"
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native iOS and Android apps for managers and staff"
    },
    {
      icon: Eye,
      title: "Remote Monitoring",
      description: "Monitor production, sales, inventory remotely in real-time"
    },
    {
      icon: Building,
      title: "Multi-location Support",
      description: "Seamlessly manage multiple factories, warehouses, offices"
    },
    {
      icon: RefreshCw,
      title: "Automatic Updates",
      description: "Always on the latest version with new features and security"
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "No Upfront Hardware Cost",
      description: "Pay-as-you-go subscription model, no capital investment"
    },
    {
      icon: Expand,
      title: "Elastic Scalability",
      description: "Automatically scales as your business grows"
    },
    {
      icon: Zap,
      title: "Zero Maintenance",
      description: "We handle all updates, backups, and infrastructure"
    },
    {
      icon: Zap,
      title: "Rapid Deployment",
      description: "Go live in weeks, not months or years"
    }
  ];

  return (
    <div>
      <SlideHeader
        title="Cloud & Mobile ERP"
        subtitle="Access your textile business anytime, anywhere"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-3">
            <Cloud className="w-6 h-6" />
            Cloud ERP Advantages:
          </h3>
          
          <div className="space-y-4">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-5 bg-blue-50 rounded-xl border-l-4 border-blue-500 hover:translate-x-2 transition-transform duration-300"
              >
                <div className="text-blue-500 text-2xl flex-shrink-0">
                  <advantage.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">{advantage.title}</h4>
                  <p className="text-gray-600">{advantage.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative flex justify-center items-center">
          <div className="relative">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-96 h-96 bg-gradient-to-br from-blue-600 to-blue-900 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-2xl"
            >
              <Cloud className="w-12 h-12 mr-4" />
              Cloud ERP
            </motion.div> 
          </div>
        </div>
      </div>

      <HighlightBox 
        title="Perfect for Growing Textile Businesses:"
        color="yellow"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {benefits.map((benefit, index) => (
            <SolutionItem
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </HighlightBox>

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
          <Wifi className="w-6 h-6" />
          Offline Capability:
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-800 mb-4">Mobile apps work even without internet connection:</p>
            <ul className="space-y-3 pl-5">
              <li className="flex items-center gap-2 text-black">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Record production, attendance, transactions offline
              </li>
              <li className="flex items-center gap-2 text-black">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Data syncs automatically when connection restored
              </li>
              <li className="flex items-center gap-2 text-black">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Critical for remote locations with poor connectivity
              </li>
              <li className="flex items-center gap-2 text-black">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Ensures business continuity during network issues
              </li>
            </ul>
          </div>
          
          <div className="flex justify-center">
            <div className="w-48 h-48 relative">
              <div className="absolute inset-0 border-8 border-orange-500/20 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <WifiOff className="w-16 h-16 text-orange-500 mb-4 mx-auto" />
                  <div className="text-xl font-bold text-blue-900">Offline Mode</div>
                  <div className="text-gray-800">Work without internet</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide23;