import React from 'react';
import SlideHeader from './common/SlideHeader';
import SolutionItem from './common/SolutionItem';
import HighlightBox from './common/HighlightBox';
import { GraduationCap, Users, Gauge, HandshakeIcon as Handshake, Headphones, RefreshCw, Megaphone, Award, ChartLine, Award as File, Phone, MessageSquare, Video, FileText, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Slide27 = () => {
  const trainingProgram = [
    {
      icon: Users,
      title: "Role-based User Training",
      description: "Different training programs for workers, supervisors, managers, and executives"
    },
    {
      icon: Gauge,
      title: "Management Dashboards Training",
      description: "How to use analytics and dashboards for decision making"
    },
    {
      icon: Handshake,
      title: "Dedicated Support Team",
      description: "Implementation team stays until users are comfortable"
    },
    {
      icon: Headphones,
      title: "24x7 Helpdesk Support",
      description: "Phone, email, chat, and remote support for all users"
    },
    {
      icon: RefreshCw,
      title: "Continuous Improvement",
      description: "Regular feedback sessions and system enhancements"
    }
  ];

  const changeManagement = [
    {
      icon: Megaphone,
      title: "Communication Plan",
      description: "Regular updates to all stakeholders about progress and benefits"
    },
    {
      icon: Users,
      title: "Champions Program",
      description: "Identify and train super-users in each department"
    },
    {
      icon: Award,
      title: "Incentives & Recognition",
      description: "Reward employees who quickly adopt the new system"
    },
    {
      icon: ChartLine,
      title: "Performance Monitoring",
      description: "Track adoption rates and address resistance early"
    }
  ];

  const supportChannels = [
    {
      icon: Phone,
      name: "Phone Support",
      detail: "1800-XXX-XXXX",
      color: "bg-green-500/30",
      iconColor: "text-green-500"
    },
    {
      icon: MessageSquare,
      name: "Live Chat",
      detail: "Available 24x7",
      color: "bg-blue-500/30",
      iconColor: "text-blue-500"
    },
    {
      icon: Video,
      name: "Remote Session",
      detail: "Screen sharing support",
      color: "bg-orange-500/30",
      iconColor: "text-orange-500"
    },
    {
      icon: FileText,
      name: "Knowledge Base",
      detail: "500+ articles & videos",
      color: "bg-purple-500/30",
      iconColor: "text-purple-500"
    }
  ];

  return (
    <div>
      <SlideHeader
        title="Training & Change Management"
        subtitle="Ensuring user adoption and maximizing ERP benefits"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-3">
            <GraduationCap className="w-6 h-6" />
            Comprehensive Training Program:
          </h3>
          
          <div className="space-y-4">
            {trainingProgram.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-5 bg-blue-50 rounded-xl border-l-4 border-blue-500 hover:translate-x-2 transition-transform duration-300"
              >
                <div className="text-blue-500 text-2xl flex-shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-auto bg-gradient-to-br from-gray-800 to-blue-900 rounded-xl shadow-xl p-4"
          >
            <div className="grid grid-cols-4 grid-rows-3 gap-3 h-full">
              <div className="col-span-4 row-span-1 dashboard-widget bg-blue-500/20 flex flex-col justify-center items-center">
                <div className="text-2xl font-bold">Training Portal</div>
                <div className="text-sm">Access training materials anytime</div>
              </div>
              
              <div className="col-span-2 row-span-2 dashboard-widget flex flex-col p-4">
                <div className="text-lg font-bold mb-4">Training Modules</div>
                <div className="flex-1 overflow-y-auto space-y-3">
                  {[
                    { name: "Production Entry", duration: "15 min", progress: 92 },
                    { name: "Quality Inspection", duration: "20 min", progress: 85 },
                    { name: "Inventory Management", duration: "25 min", progress: 78 },
                    { name: "Dashboard Usage", duration: "30 min", progress: 65 }
                  ].map((module, idx) => (
                    <div key={idx} className="bg-white/10 rounded-lg p-3">
                      <div className="font-semibold">{module.name}</div>
                      <div className="text-sm text-gray-300">
                        {module.duration} • {module.progress}% completed
                      </div>
                      <div className="h-1 bg-white/20 rounded-full mt-2 overflow-hidden">
                        <div 
                          className="h-full bg-green-500"
                          style={{ width: `${module.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="col-span-2 row-span-2 dashboard-widget flex flex-col p-4">
                <div className="text-lg font-bold mb-4">Support Channels</div>
                <div className="flex-1 flex flex-col justify-around">
                  {supportChannels.map((channel, idx) => (
                    <div key={idx} className="flex items-center mb-4">
                      <div className={`w-10 h-10 ${channel.color} rounded-full flex items-center justify-center mr-4`}>
                        <channel.icon className={`w-5 h-5 ${channel.iconColor}`} />
                      </div>
                      <div>
                        <div className="font-semibold">{channel.name}</div>
                        <div className="text-sm text-gray-300">{channel.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <HighlightBox 
        title="Change Management Approach:"
        color="green"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {changeManagement.map((item, index) => (
            <SolutionItem
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </HighlightBox>

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-blue-100 mb-6 flex items-center gap-3">
          <File className="w-6 h-6" />
          Certification Program:
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-100 mb-4">We offer ERP certification for your staff:</p>
            <ul className="space-y-3 pl-5">
              <li className="flex items-center gap-2 text-white">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Basic User Certification
              </li>
              <li className="flex items-center gap-2 text-white">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Advanced Power User Certification
              </li>
              <li className="flex items-center gap-2 text-white">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Administrator Certification
              </li>
              <li className="flex items-center gap-2 text-white">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Train-the-Trainer program for internal champions
              </li>
            </ul>
          </div>
          
          <div className="flex justify-center">
            <motion.div
              initial={{ rotate: -5 }}
              animate={{ rotate: 5 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
              className="w-64 h-36 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex flex-col items-center justify-center text-blue-900 font-bold shadow-2xl"
            >
              <Award className="w-16 h-16 mb-4" />
              ERP Certified
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide27;