import SlideHeader from './common/SlideHeader';
import ProblemItem from './common/ProblemItem';
import SolutionItem from './common/SolutionItem';
import StatCard from './common/StatCard';
import HighlightBox from './common/HighlightBox';
import {
  Boxes,
  AlertCircle,
  UserX,
  BarChart3,
  ClipboardCheck,
  Handshake,
  FileText,
  Scale,
  Truck,
  Receipt,
  Check,
  AlertTriangle
} from 'lucide-react';

const Slide10 = () => {
  const problems = [
    {
      icon: Boxes,
      title: "Over-purchasing",
      description: "Excess inventory locking working capital"
    },
    {
      icon: AlertCircle,
      title: "Stock Shortages",
      description: "Production stoppages due to material unavailability"
    },
    {
      icon: UserX,
      title: "Vendor Fraud",
      description: "Overcharging, quality substitution, kickbacks"
    },
    {
      icon: BarChart3,
      title: "No Rate Comparison",
      description: "Missed opportunities for better pricing"
    },
    {
      icon: ClipboardCheck,
      title: "Manual Processes",
      description: "Paper-based POs, manual follow-ups, errors"
    }
  ];

  const solutions = [
    {
      icon: Handshake,
      title: "Vendor Management System",
      description: "Performance rating, compliance tracking, blacklisting"
    },
    {
      icon: FileText,
      title: "Purchase Order Automation",
      description: "Auto-generated POs based on inventory levels and demand"
    },
    {
      icon: Scale,
      title: "Rate Comparison & Negotiation",
      description: "Historical pricing, vendor benchmarking, best price selection"
    },
    {
      icon: Truck,
      title: "Material Receipt Tracking",
      description: "GRN generation, quality checks, quantity verification"
    },
    {
      icon: Receipt,
      title: "3-Way Invoice Matching",
      description: "PO vs GRN vs Invoice matching to prevent overpayment"
    }
  ];

  return (
    <div>
      <SlideHeader
        title="Raw Material Procurement Management"
        subtitle="Optimizing sourcing and material cost management"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Problems */}
        <div>
          <h3 className="text-xl font-bold text-red-500 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Procurement Challenges:
          </h3>
          <div className="space-y-4">
            {problems.map((problem, index) => (
              <ProblemItem
                key={index}
                icon={problem.icon}
                title={problem.title}
                description={problem.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Solutions */}
        <div>
          <h3 className="text-xl font-bold text-green-500 mb-4 flex items-center gap-2">
            <Check className="w-5 h-5" />
            ERP Procurement Solution:
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

      <HighlightBox title="Cost Savings Analysis:" color="yellow">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
          <StatCard value="12-18%" label="Reduction in Material Costs" />
          <StatCard value="40%" label="Faster Procurement Cycle" />
          <StatCard value="25%" label="Lower Inventory Holding" />
          <StatCard value="100%" label="Invoice Accuracy" />
        </div>
      </HighlightBox>
    </div>
  );
};

export default Slide10;
