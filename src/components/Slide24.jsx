import React from 'react';
import SlideHeader from './common/SlideHeader';
import HighlightBox from './common/HighlightBox';
import SolutionItem from './common/SolutionItem';
import { TrendingDown, TrendingUp, X, Clock, Trophy, Eye, Scale, Shield, Expand, Users, CheckCircle, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';

const Slide24 = () => {
  const benefits = [
    {
      value: "30-40%",
      title: "Cost Reduction",
      description: "Through process automation, waste elimination, and optimal resource utilization"
    },
    {
      value: "25%",
      title: "Productivity Increase",
      description: "Better workforce utilization, reduced idle time, optimized workflows"
    },
    {
      value: "Zero",
      title: "Stock Mismatch",
      description: "Real-time inventory tracking eliminates discrepancies between physical and system stock"
    },
    {
      value: "70% Faster",
      title: "Billing Process",
      description: "Automated invoicing, payment tracking, and reconciliation"
    },
    {
      value: "Higher",
      title: "Profit Margins",
      description: "Cost savings, efficiency improvements, and better pricing strategies"
    },
    {
      value: "95%",
      title: "Customer Satisfaction",
      description: "On-time delivery, consistent quality, and responsive service"
    }
  ];

  const additionalBenefits = [
    {
      icon: Clock,
      title: "Faster Decision Making",
      description: "Real-time data and analytics enable quick, informed decisions"
    },
    {
      icon: Eye,
      title: "Complete Visibility",
      description: "360-degree view of business operations from anywhere"
    },
    {
      icon: Scale,
      title: "Regulatory Compliance",
      description: "Automated compliance with GST, labor laws, and industry standards"
    },
    {
      icon: Shield,
      title: "Risk Mitigation",
      description: "Early warning systems, fraud detection, and backup systems"
    },
    {
      icon: Expand,
      title: "Business Scalability",
      description: "Easy to add new products, locations, and business lines"
    },
    {
      icon: Users,
      title: "Employee Satisfaction",
      description: "Reduced manual work, clear expectations, timely payments"
    }
  ];

  return (
    <div>
      <SlideHeader
        title="Business Benefits"
        subtitle="Tangible improvements with Textile ERP implementation"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-8 text-center shadow-lg hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-800 to-yellow-400"></div>
            <div className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-3">
              {benefit.value}
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-3">
              {benefit.title}
            </h3>
            <p className="text-gray-600">{benefit.description}</p>
          </motion.div>
        ))}
      </div>

      <hr className="section-divider" />

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
          <TrendingUp className="w-6 h-6" />
          Additional Benefits:
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {additionalBenefits.map((benefit, index) => (
            <SolutionItem
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>

      <HighlightBox 
        title="Typical ROI Calculation for Mid-size Textile Unit (Annual Turnover: ₹50 Crores):"
        color="green"
      >
        <div className="space-y-4 mt-6">
          {[
            { label: "Cost Reduction (35% of operational costs)", amount: "₹3.5 Crores" },
            { label: "Productivity Increase (25% of labor costs)", amount: "₹1.2 Crores" },
            { label: "Inventory Reduction (30% of carrying costs)", amount: "₹0.8 Crores" },
            { label: "Improved Collections (15 days faster)", amount: "₹0.6 Crores" }
          ].map((item, index) => (
            <div key={index} className="flex justify-between pb-3 border-b border-gray-200">
              <div>{item.label}</div>
              <div className="font-semibold">{item.amount}</div>
            </div>
          ))}
          
          <div className="flex justify-between text-lg font-bold pt-2">
            <div>Total Annual Benefits</div>
            <div>₹6.1 Crores</div>
          </div>
          
          <div className="flex justify-between text-xl font-bold text-green-600 pt-4 border-t-2">
            <div>ERP Investment (One-time + Annual)</div>
            <div>₹0.8 Crores</div>
          </div>
        </div>
      </HighlightBox>
    </div>
  );
};

export default Slide24;