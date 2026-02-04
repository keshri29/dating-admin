 import SlideHeader from './common/SlideHeader';
import ProblemItem from './common/ProblemItem';
import SolutionItem from './common/SolutionItem';
import StatCard from './common/StatCard';
import HighlightBox from './common/HighlightBox';
import { XCircle, Undo, Ban, File, ClipboardCheck, Bug, Search, AlertCircle, Check, ProjectorIcon, Box, ArrowRight, Circle, Truck  } from 'lucide-react';

const Slide13 = () => {
  const challenges = [
    {
      icon: XCircle,
      title: "High Rejection Rates",
      description: "15-25% material rejection at various stages"
    },
    {
      icon: Undo,
      title: "Customer Returns",
      description: "Quality issues leading to returns and replacements"
    },
    {
      icon: Ban,
      title: "Brand Damage",
      description: "Poor quality affecting brand reputation and customer trust"
    },
    {
      icon: File,
      title: "Compliance Issues",
      description: "Failure to meet regulatory and customer standards"
    }
  ];

  const solutions = [
    {
      icon: ClipboardCheck,
      title: "Staged QC Checkpoints",
      description: "Incoming, in-process, final inspection points with digital checklists"
    },
    {
      icon: Bug,
      title: "Defect Tracking & Analysis",
      description: "Categorization, quantification, and trending of defects"
    },
    {
      icon: Search,
      title: "Root Cause Analysis",
      description: "Identify underlying causes using Fishbone, 5-Why methodologies"
    },
    {
      icon: File,
      title: "Compliance Management",
      description: "Track certifications (OEKO-TEX, GOTS, BCI), audit readiness"
    }
  ];

  return (
    <div>
      <SlideHeader
        title="Quality Control & Compliance"
        subtitle="Building quality into every step of the textile manufacturing process"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Challenges */}
        <div>
          <h3 className="text-xl font-bold text-red-500 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Quality Challenges:
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
            <Check className="w-5 h-5" />
            ERP Quality Solution:
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
        title="Quality Improvement Metrics:"
        color="blue"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
          <StatCard value="60-70%" label="Reduction in Defects" />
          <StatCard value="90%" label="Faster Root Cause Analysis" />
          <StatCard value="50%" label="Lower Customer Returns" />
          <StatCard value="100%" label="Audit Compliance" />
        </div>
      </HighlightBox>

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
          <ProjectorIcon className="w-6 h-6" />
          Quality Control Workflow:
        </h3>
        
        <div className="bg-gray-50 p-6 rounded-xl">
          <div className="flex flex-col md:flex-row justify-between items-center text-center gap-6 md:gap-0">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-blue-800 text-white rounded-full flex items-center justify-center text-xl mb-3">
                <Box className="w-6 h-6" />
              </div>
              <div className="font-semibold">Raw Material Inspection</div>
            </div>
            
            <ArrowRight className="w-8 h-8 text-blue-800 md:rotate-0 rotate-90" />
            
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-blue-800 text-white rounded-full flex items-center justify-center text-xl mb-3">
                <Circle className="w-6 h-6" />
              </div>
              <div className="font-semibold">In-process QC</div>
            </div>
            
            <ArrowRight className="w-8 h-8 text-blue-800 md:rotate-0 rotate-90" />
            
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-blue-800 text-white rounded-full flex items-center justify-center text-xl mb-3">
                <Circle className="w-6 h-6" />
              </div>
              <div className="font-semibold">Final Inspection</div>
            </div>
            
            <ArrowRight className="w-8 h-8 text-blue-800 md:rotate-0 rotate-90" />
            
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center text-xl mb-3">
                <Truck className="w-6 h-6" />
              </div>
              <div className="font-semibold">Dispatch</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide13;