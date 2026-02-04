 import SlideHeader from './common/SlideHeader';
import ProblemItem from './common/ProblemItem';
import SolutionItem from './common/SolutionItem';
import StatCard from './common/StatCard';
import HighlightBox from './common/HighlightBox';
import {  CreditCard, TrendingUp, UserPlus, Fingerprint, Calendar, CheckCircle, AlertCircle, File, User, User2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Slide8 = () => {
  const problems = [
    {
      icon: User2,
      title: "Unskilled Labor",
      description: "High training costs, low productivity, quality issues"
    },
    {
      icon: User,
      title: "Attendance Fraud",
      description: "Buddy punching, time theft, manual errors"
    },
    {
      icon: CreditCard,
      title: "Salary Disputes",
      description: "Calculation errors, delayed payments, disputes"
    },
    {
      icon: TrendingUp,
      title: "Low Productivity",
      description: "No performance tracking, lack of motivation"
    }
  ];

  const solutions = [
    {
      icon: UserPlus,
      title: "Worker Onboarding",
      description: "Digital profiles, skill categorization, training records"
    },
    {
      icon: Fingerprint,
      title: "Biometric Attendance",
      description: "Eliminates fraud, real-time tracking, integration with payroll"
    },
    {
      icon: Calendar,
      title: "Shift Planning",
      description: "Optimal workforce allocation, compliance with labor laws"
    },
    {
      icon: File,
      title: "Payroll Automation",
      description: "Accurate salary calculation, timely payments, statutory compliance"
    }
  ];

  return (
    <div>
      <SlideHeader
        title="Labor Hiring & Workforce Management"
        subtitle="Transforming human resource management in textile industry"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Problems */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-xl font-bold text-red-500 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Problems Today:
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
        </motion.div>

        {/* Solutions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-bold text-green-500 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            ERP Solution:
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
        </motion.div>
      </div>

      <HighlightBox 
        title="Impact Metrics:"
        color="blue"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
          <StatCard value="40%" label="Reduction in Attendance Fraud" />
          <StatCard value="30%" label="Faster Payroll Processing" />
          <StatCard value="25%" label="Increase in Workforce Productivity" />
          <StatCard value="100%" label="Statutory Compliance" />
        </div>
      </HighlightBox>
    </div>
  );
};

export default Slide8;