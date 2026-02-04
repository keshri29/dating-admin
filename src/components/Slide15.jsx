import React from 'react';
import SlideHeader from './common/SlideHeader';
import ProblemItem from './common/ProblemItem';
import SolutionItem from './common/SolutionItem';
import StatCard from './common/StatCard';
import HighlightBox from './common/HighlightBox';
import { Calculator, File, Clock, Receipt, Scale, Truck, Book, CreditCard, ArrowRight, CogIcon, AlertCircle, Send, User } from 'lucide-react';

const Slide15 = () => {
  const challenges = [
    {
      icon: Calculator,
      title: "Manual Billing Errors",
      description: "Calculation mistakes, wrong pricing, incorrect quantities"
    },
    {
      icon: File,
      title: "GST Compliance Issues",
      description: "Incorrect tax calculation, filing delays, penalties"
    },
    {
      icon: Clock,
      title: "Delayed Payments",
      description: "Slow invoicing leads to cash flow issues"
    },
    {
      icon: Receipt,
      title: "Complex Pricing",
      description: "Multiple rate structures, discounts, schemes hard to manage"
    }
  ];

  const solutions = [
    {
      icon: User,
      title: "Automated Invoice Generation",
      description: "Auto-created from delivery notes with accurate calculations"
    },
    {
      icon: Scale,
      title: "GST Compliant Billing",
      description: "Auto tax calculation, HSN/SAC codes, GST returns filing"
    },
    {
      icon: Truck,
      title: "E-way Bill Integration",
      description: "Auto generation of e-way bills for goods movement"
    },
    {
      icon: Book,
      title: "Customer Ledger Management",
      description: "Real-time account statements, credit limit tracking"
    },
    {
      icon: CreditCard,
      title: "Payment Tracking & Reconciliation",
      description: "Auto matching of payments against invoices"
    }
  ];

  const workflowSteps = [
    { icon: Truck, label: "Delivery Note", description: "Goods dispatched to customer" },
    { icon: File, label: "Auto Invoice", description: "System generates invoice" },
    { icon: Send, label: "E-invoice & E-way", description: "Auto generation & sending" },
    { icon: CreditCard, label: "Payment Tracking", description: "Auto reconciliation" }
  ];

  return (
    <div>
      <SlideHeader
        title="Automated Billing & Invoicing"
        subtitle="Streamlined financial processes with compliance and accuracy"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Challenges */}
        <div>
          <h3 className="text-xl font-bold text-red-500 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Billing Challenges:
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
            <File className="w-5 h-5" />
            ERP Billing Solution:
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
        title="Billing Process Improvement:"
        color="blue"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
          <StatCard value="80%" label="Faster Invoice Processing" />
          <StatCard value="100%" label="GST Compliance" />
          <StatCard value="60%" label="Reduction in Billing Errors" />
          <StatCard value="15 Days" label="Faster Payment Collection" />
        </div>
      </HighlightBox>

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-blue-100 mb-6 flex items-center gap-3">
          <CogIcon className="w-6 h-6" />
          Automated Workflow:
        </h3>
        
        <div className="bg-gray-50 p-6 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
            {workflowSteps.map((step, index) => (
              <React.Fragment key={index}>
                <div>
                  <div className="w-14 h-14 bg-blue-800 text-white rounded-full flex items-center justify-center text-xl mb-3 mx-auto">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div className="font-semibold text-gray-800">{step.label}</div>
                  <div className="text-sm text-gray-600">{step.description}</div>
                </div>
                
                {index < workflowSteps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center">
                    <ArrowRight className="w-8 h-8 text-blue-800" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide15;