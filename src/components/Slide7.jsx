import React from 'react';
import SlideHeader from './common/SlideHeader';
import ModuleCard from './common/ModuleCard';
import ProcessStep from './common/ProcessStep';
import {
   ShoppingCart,
  Loader,
  Grid3x3,
  Palette,
  Shirt,
  Users,
  Truck,
  Warehouse,
  ClipboardCheck,
  FileText,
  Store,
  BarChart3,
  Factory,
  ArrowRight,
  User2
} from 'lucide-react';
import { motion } from 'framer-motion';

const Slide7 = () => {
  const processSteps = [
    { icon: User2, label: "Labor Hiring", color: "blue" },
    { icon: ShoppingCart, label: "Raw Material", color: "purple" },
    { icon: Loader, label: "Spinning", color: "teal" },
    { icon: Grid3x3, label: "Weaving", color: "green" },
    { icon: Palette, label: "Dyeing", color: "orange" },
    { icon: Shirt, label: "Garmenting", color: "blue" }
  ];

  const completeModules = [
    {
      icon: Users,
      title: "Labor Hiring & Payroll",
      description: "Complete workforce lifecycle management"
    },
    {
      icon: Truck,
      title: "Raw Material Procurement",
      description: "Vendor to warehouse tracking"
    },
    {
      icon: Factory,
      title: "Manufacturing Processes",
      description: "Spinning, weaving, dyeing, printing, garments"
    },
    {
      icon: Warehouse,
      title: "Inventory & Warehouse",
      description: "Multi-location, batch tracking, expiry management"
    },
    {
      icon: ClipboardCheck,
      title: "Quality Control",
      description: "QC checkpoints, defect tracking, compliance"
    },
    {
      icon: FileText,
      title: "Billing & Finance",
      description: "GST-compliant invoicing, accounting, tax reporting"
    },
    {
      icon: Store,
      title: "Retail & Franchise Management",
      description: "Centralized POS, stock tracking, sales monitoring"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Real-time dashboards, predictive analytics, insights"
    }
  ];

  return (
    <div>
      <SlideHeader
        title="End-to-End Textile ERP Coverage"
        subtitle="Comprehensive solution spanning the entire textile manufacturing lifecycle"
      />

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 my-12 flex-wrap">
        {processSteps.map((step, index) => (
          <React.Fragment key={index}>
            <ProcessStep
              icon={step.icon}
              label={step.label}
              color={step.color}
              delay={index * 0.1}
            />
            {index < processSteps.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="text-yellow-500 text-2xl md:rotate-0 rotate-90"
              >
                <ArrowRight className="w-8 h-8" />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-blue-900 mb-6">
          Complete Module Suite:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {completeModules.map((module, index) => (
            <ModuleCard
              key={index}
              icon={module.icon}
              title={module.title}
              description={module.description}
              delay={index * 0.05}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slide7;
