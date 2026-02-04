import React from 'react';
import SlideHeader from './common/SlideHeader';
import StatCard from './common/StatCard';
import HighlightBox from './common/HighlightBox';
import { Building, BookDashed, Expand, MapPin, Tag, Handshake, Award, Medal, Star, File, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Slide28 = () => {
  const differentiators = [
    {
      icon: Building,
      title: "Textile Domain Expertise",
      description: "20+ years specializing in textile ERP, deep understanding of spinning, weaving, dyeing, garmenting processes"
    },
    {
      icon: BookDashed,
      title: "Custom Workflows",
      description: "Tailored to your specific business processes, not a one-size-fits-all solution"
    },
    {
      icon: Expand,
      title: "Scalable Solution",
      description: "Grows with your business from small unit to large enterprise with multiple locations"
    },
    {
      icon: MapPin,
      title: "Local Support",
      description: "Presence in major textile clusters with local language support and quick response"
    },
    {
      icon: Tag,
      title: "Affordable Pricing",
      description: "Flexible pricing models - per user, per module, or enterprise license"
    },
    {
      icon: Handshake,
      title: "Long-term Partnership",
      description: "We grow with you, providing continuous enhancements and support"
    }
  ];

  const awards = [
    {
      icon: Award,
      title: "Best Textile ERP 2022",
      description: "Textile Technology Magazine",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Medal,
      title: "Top 10 ERP Vendors",
      description: "Manufacturing Excellence Awards",
      color: "from-green-500 to-green-700"
    },
    {
      icon: Star,
      title: "Customer Excellence",
      description: "4.8/5 Rating (500+ clients)",
      color: "from-blue-500 to-blue-700"
    },
    {
      icon: File,
      title: "ISO 27001 Certified",
      description: "Information Security Management",
      color: "from-purple-500 to-purple-700"
    }
  ];

  return (
    <div>
      <SlideHeader
        title="Why Choose Our Textile ERP"
        subtitle="Differentiators that make us the preferred choice for textile industry"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {differentiators.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-8 text-center shadow-lg hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-800 to-yellow-400"></div>
            <div className="text-4xl text-blue-800 mb-4 flex justify-center">
              <item.icon className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-3">
              {item.title}
            </h3>
            <p className="text-gray-600">{item.description}</p>
          </motion.div>
        ))}
      </div>

      <HighlightBox 
        title="Awards & Recognition:"
        color="blue"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-6">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${award.color} rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-lg`}>
                <award.icon className="w-8 h-8" />
              </div>
              <div className="font-semibold text-gray-800">{award.title}</div>
              <div className="text-sm text-gray-600">{award.description}</div>
            </motion.div>
          ))}
        </div>
      </HighlightBox>

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-blue-100 mb-6 flex items-center gap-3">
          <TrendingUp className="w-6 h-6" />
          Client Success Metrics:
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard value="500+" label="Textile Clients" />
          <StatCard value="98%" label="Retention Rate" />
          <StatCard value="4.8/5" label="Customer Satisfaction" />
          <StatCard value="15+" label="Years Average Client Tenure" />
        </div>
      </div>
    </div>
  );
};

export default Slide28;