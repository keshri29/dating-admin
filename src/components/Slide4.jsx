import SlideHeader from './common/SlideHeader';
import ModuleCard from './common/ModuleCard';
import HighlightBox from './common/HighlightBox';
import {
  Users,
  Boxes,
  Truck,
  AlertTriangle,
  ShoppingCart,
  FileText,
  Factory,
  Wallet
} from 'lucide-react';
import { motion } from 'framer-motion';

const Slide4 = () => {
  const problems = [
    {
      icon: Users,
      title: "Labor Management Issues",
      description: "Attendance fraud, salary disputes, unskilled workforce, low productivity"
    },
    {
      icon: Factory,
      title: "No Real-time Production Tracking",
      description: "Lack of visibility into machine utilization, batch status, and efficiency"
    },
    {
      icon: Boxes,
      title: "Stock Mismatch",
      description: "Physical vs system stock differences up to 30%, leading to revenue loss"
    },
    {
      icon: FileText,
      title: "Billing Errors",
      description: "Manual calculation mistakes, GST compliance issues, payment delays"
    },
    {
      icon: Truck,
      title: "Order Delays",
      description: "40% orders delayed due to poor planning and coordination"
    },
    {
      icon: AlertTriangle,
      title: "Quality Issues",
      description: "High rejection rates, customer returns, brand reputation damage"
    },
    {
      icon: Wallet,
      title: "Cash Flow Problems",
      description: "Poor financial visibility, delayed payments, working capital challenges"
    },
    {
      icon: ShoppingCart,
      title: "Franchise/Retail Mismanagement",
      description: "Fake sales reports, stock theft, revenue leakage at retail points"
    }
  ];

  return (
    <div>
      <SlideHeader
        title="Major Problems Faced by Textile Industry"
        subtitle="Critical pain points that reduce profitability and growth"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {problems.map((problem, index) => (
          <ModuleCard
            key={index}
            icon={problem.icon}
            title={problem.title}
            description={problem.description}
            delay={index * 0.1}
          />
        ))}
      </div>

      <HighlightBox title="Impact Analysis:" color="yellow">
        <p className="text-gray-700">
          These problems typically result in <strong>15-30% lower profitability</strong>, <strong>25% higher operational costs</strong>, and <strong>40% longer order-to-cash cycles</strong> compared to digitally transformed competitors.
        </p>
      </HighlightBox>
    </div>
  );
};

export default Slide4;
