import SlideHeader from './common/SlideHeader';
import ProblemItem from './common/ProblemItem';
import SolutionItem from './common/SolutionItem';
import StatCard from './common/StatCard';
import {
  XCircle,
  CheckCircle,
  Database,
  Gauge,
  Brain,
  Expand,
  FileText,
  ChartPie,
  Unlink,
  Scale,
  Cog
} from 'lucide-react';
import { motion } from 'framer-motion';

const Slide5 = () => {
  const traditionalProblems = [
    {
      icon: Database,
      title: "Excel Sheets & Paper Records",
      description: "Prone to errors, difficult to analyze, version control issues"
    },
    {
      icon: FileText,
      title: "Manual Billing & Documentation",
      description: "Time-consuming, error-prone, GST compliance challenges"
    },
    {
      icon: ChartPie,
      title: "No Real-time Analytics",
      description: "Decisions based on outdated information, reactive approach"
    },
    {
      icon: Unlink,
      title: "No Integration",
      description: "Departmental silos, duplicate data entry, communication gaps"
    },
    {
      icon: Scale,
      title: "Limited Scalability",
      description: "Cannot handle business growth, additional locations, or complexity"
    }
  ];

  const erpSolutions = [
    {
      icon: Database,
      title: "Centralized Digital Platform",
      description: "Single source of truth, accessible from anywhere, anytime"
    },
    {
      icon: Cog,
      title: "Process Automation",
      description: "Reduced manual work, faster processing, fewer errors"
    },
    {
      icon: Gauge,
      title: "Real-time Data & Analytics",
      description: "Live dashboards, predictive insights, proactive decisions"
    },
    {
      icon: Brain,
      title: "Smart, Data-driven Decisions",
      description: "AI-powered insights, what-if analysis, optimized operations"
    },
    {
      icon: Expand,
      title: "Scalable Architecture",
      description: "Grows with your business, supports multiple locations, modular"
    }
  ];

  return (
    <div>
      <SlideHeader
        title="Traditional System vs ERP"
        subtitle="Why legacy approaches fail and how ERP transforms operations"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Traditional Systems */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-white to-gray-50 p-6 md:p-8 rounded-2xl shadow-xl border-t-4 border-red-500 hover:-translate-y-1 transition-transform duration-300"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6 flex items-center gap-3">
            <XCircle className="w-8 h-8 text-red-500" />
            Traditional Systems
          </h2>
          <div className="space-y-4">
            {traditionalProblems.map((problem, index) => (
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

        {/* ERP System */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-white to-gray-50 p-6 md:p-8 rounded-2xl shadow-xl border-t-4 border-green-500 hover:-translate-y-1 transition-transform duration-300"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6 flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-500" />
            ERP System
          </h2>
          <div className="space-y-4">
            {erpSolutions.map((solution, index) => (
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

      <hr className="section-divider" />

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-blue-800 mb-6">Transition Impact</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <StatCard value="70%" label="Reduction in Manual Work" delay={0.8} />
          <StatCard value="60%" label="Faster Decision Making" delay={0.9} />
          <StatCard value="95%" label="Data Accuracy" delay={1.0} />
          <StatCard value="50%" label="Lower Operational Cost" delay={1.1} />
        </div>
      </div>
    </div>
  );
};

export default Slide5;
