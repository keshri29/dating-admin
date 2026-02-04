 import SlideHeader from './common/SlideHeader';
import { Building, User, Truck, Store, Phone, Mail, Globe, MapPin, Calendar, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const Slide30 = () => {
  const handleDemo = () => {
    alert("Thank you for your interest! Our sales team will contact you within 24 hours to schedule a personalized demo.");
  };

  const handleContact = () => {
    alert("Please contact our sales team at +91-7488685485 or email support@tridevcloud.in for pricing and implementation details.");
  };

  const handleBrochure = () => {
    alert("Brochure download started. Check your downloads folder for 'TextileERP-Pro-Brochure.pdf'");
  };

  return (
    <div>
      <SlideHeader
        title="Thank You / Call to Action"
        subtitle="Let's build the future of your textile business together"
      />

      <div className="text-center my-8">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-8">Let&apos;s build:</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
          {[
            {
              icon: Building,
              title: "Smart Factory",
              description: "IoT-enabled, data-driven manufacturing with real-time monitoring and control",
              color: "from-blue-50 to-cyan-50",
              border: "border-blue-500"
            },
            {
              icon: User,
              title: "Smart Workforce",
              description: "Productive, motivated, and efficient teams with clear goals and fair incentives",
              color: "from-green-50 to-emerald-50",
              border: "border-green-500"
            },
            {
              icon: Truck,
              title: "Smart Supply Chain",
              description: "Optimized logistics, inventory, and procurement with end-to-end visibility",
              color: "from-orange-50 to-amber-50",
              border: "border-orange-500"
            },
            {
              icon: Store,
              title: "Smart Retail",
              description: "Connected customer experience, omnichannel sales, and data-driven marketing",
              color: "from-purple-50 to-pink-50",
              border: "border-purple-500"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`bg-gradient-to-br ${item.color} p-6 rounded-xl shadow-lg border-l-4 ${item.border}`}
            >
              <item.icon className="w-12 h-12 mb-4 mx-auto" style={{ color: item.border.replace('border-', '') }} />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-blue-800 to-blue-900 text-white p-8 rounded-2xl shadow-2xl max-w-6xl mx-auto relative overflow-hidden"
      >
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-white/5 rounded-full"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-400">
            Your Textile Business + Our ERP = Future Ready Enterprise
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Contact us today for a personalized demo and see how our ERP can transform your textile business operations, reduce costs, and drive growth.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
            <button
              onClick={handleDemo}
              className="cta-button bg-gradient-to-r from-yellow-400 to-orange-500"
            >
              <Calendar className="w-5 h-5" />
              Schedule a Demo
            </button>
            <button
              onClick={handleContact}
              className="cta-button bg-gradient-to-r from-green-500 to-emerald-600"
            >
              <Phone className="w-5 h-5" />
              Contact Sales
            </button>
            <button
              onClick={handleBrochure}
              className="cta-button bg-gradient-to-r from-purple-500 to-purple-700"
            >
              <Download className="w-5 h-5" />
              Download Brochure
            </button>
          </div>
          
          <div className="border-t border-white/20 pt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Mail className="w-5 h-5" />
                  <span className="font-semibold">Email</span>
                </div>
                <div className="text-sm">support@tridevcloud.in</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Phone className="w-5 h-5" />
                  <span className="font-semibold">Phone</span>
                </div>
                <div className="text-sm">+91-7488685485</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Globe className="w-5 h-5" />
                  <span className="font-semibold">Website</span>
                </div>
                <div className="text-sm">https://tridevcloud.in/</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-semibold">Office</span>
                </div>
                <div className="text-sm">Dindoli Surat, Gujarat</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div> 
    </div>
  );
};

export default Slide30;