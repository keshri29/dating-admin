import React from 'react';
import SlideHeader from './common/SlideHeader';
import ModuleCard from './common/ModuleCard';
import HighlightBox from './common/HighlightBox';
import { UserLock, Key, ClipboardList, HardDrive, Gavel, Award, Shield, CheckCircle, RefreshCw, UserCheck, Video, EyeOff, Smartphone, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';

const Slide22 = () => {
  const securityFeatures = [
    {
      icon: UserLock,
      title: "Role-Based Access Control",
      description: "Granular permissions based on user roles and responsibilities"
    },
    {
      icon: Key,
      title: "Data Encryption",
      description: "End-to-end encryption for data at rest and in transit"
    },
    {
      icon: ClipboardList,
      title: "Audit Trail & Logs",
      description: "Complete record of all system activities and changes"
    },
    {
      icon: HardDrive,
      title: "Backup & Disaster Recovery",
      description: "Automated backups, geo-redundancy, quick recovery"
    },
    {
      icon: Gavel,
      title: "Government Compliance",
      description: "GST, TDS, TCS, Factory Act, Labor Laws compliance"
    },
    {
      icon: Award,
      title: "Certifications",
      description: "ISO 27001, GDPR compliant, regular security audits"
    }
  ];

  const securityLevels = [
    {
      icon: Fingerprint,
      title: "Biometric Access",
      description: "For sensitive operations"
    },
    {
      icon: Smartphone,
      title: "2-Factor Authentication",
      description: "OTP via SMS/Email"
    },
    {
      icon: EyeOff,
      title: "Data Masking",
      description: "Sensitive data protection"
    },
    {
      icon: Video,
      title: "IP Restrictions",
      description: "Access from approved locations only"
    }
  ];

  return (
    <div>
      <SlideHeader
        title="Security & Compliance"
        subtitle="Enterprise-grade security for your textile business data"
      />

      <div className="mb-12">
        <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-3">
          <Shield className="w-6 h-6" />
          Security Features:
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityFeatures.map((feature, index) => (
            <ModuleCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>

      <HighlightBox 
        title="Your Business Data is Safe:"
        color="green"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-6">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 text-2xl">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800">99.9% Uptime SLA</h4>
                <p className="text-gray-600">Guaranteed system availability with 24/7 monitoring</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-500 text-2xl">
                <RefreshCw className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800">Real-time Replication</h4>
                <p className="text-gray-600">Data replicated across multiple secure locations</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 border-[16px] border-green-500/20 border-t-green-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Shield className="w-16 h-16 text-blue-800 mb-4" />
                <div className="text-2xl font-bold text-blue-800">Secure</div>
              </div>
            </div>
          </div>
        </div>
      </HighlightBox>

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
          <UserCheck className="w-6 h-6" />
          Multi-level Security:
        </h3>
        
        <div className="bg-gray-50 p-6 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityLevels.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 bg-blue-800 text-white rounded-full flex items-center justify-center text-xl mb-3 mx-auto">
                  <level.icon className="w-6 h-6" />
                </div>
                <div className="font-semibold text-gray-800">{level.title}</div>
                <div className="text-sm text-gray-600">{level.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide22;