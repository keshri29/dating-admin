import React from 'react';
import SlideHeader from './common/SlideHeader';
import HighlightBox from './common/HighlightBox';
import { ShoppingCart, Link, Truck, Undo, History, ClipboardList, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Slide18 = () => {
  const erpHandles = [
    {
      icon: ClipboardList,
      title: "Customer Order Management",
      description: "Online order portal, order tracking, status updates"
    },
    {
      icon: Link,
      title: "Production Order Linking",
      description: "Automatic conversion of customer orders to production orders"
    },
    {
      icon: Truck,
      title: "Delivery Tracking",
      description: "Real-time shipment tracking, delivery confirmation"
    },
    {
      icon: Undo,
      title: "Returns Management",
      description: "Return authorization, inspection, credit note generation"
    },
    {
      icon: History,
      title: "Order History & Analysis",
      description: "Complete order lifecycle tracking, customer behavior analysis"
    }
  ];

  const orderStatus = [
    { status: "Confirmed", count: 42, color: "bg-blue-500" },
    { status: "In Production", count: 18, color: "bg-orange-500" },
    { status: "Ready to Ship", count: 24, color: "bg-green-500" },
    { status: "Delivered", count: 156, color: "bg-purple-500" }
  ];

  return (
    <div>
      <SlideHeader
        title="Order Management System"
        subtitle="Seamless order processing from inquiry to delivery"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            ERP Handles:
          </h3>
          
          <div className="space-y-4">
            {erpHandles.map((item, index) => (
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
          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className=" bg-gradient-to-br from-gray-800 to-blue-900 rounded-xl shadow-xl p-4"
          >
            <div className="grid grid-cols-4 grid-rows-3 gap-3 h-full">
              <div className="col-span-2 row-span-1 dashboard-widget bg-blue-500/20">
                <div className="text-3xl font-bold">42</div>
                <div className="text-sm">New Orders Today</div>
              </div>
              <div className="dashboard-widget bg-orange-500/20">
                <div className="text-2xl font-bold">18</div>
                <div className="text-xs">In Production</div>
              </div>
              <div className="dashboard-widget bg-green-500/20">
                <div className="text-2xl font-bold">24</div>
                <div className="text-xs">Ready to Ship</div>
              </div>
              <div className="col-span-4 row-span-2 dashboard-widget">
                <div className="text-lg font-bold mb-4">Recent Orders</div>
                <div className="overflow-y-auto h-48">
                  {[
                    { id: "ORD-2023-0421", amount: "₹84,500", status: "Shipped" },
                    { id: "ORD-2023-0422", amount: "₹1,24,800", status: "Production" },
                    { id: "ORD-2023-0423", amount: "₹56,300", status: "Confirmed" },
                    { id: "ORD-2023-0424", amount: "₹2,34,000", status: "Production" }
                  ].map((order, idx) => (
                    <div key={idx} className="flex justify-between py-2 border-b border-white/20">
                      <div className="text-sm">{order.id}</div>
                      <div className="text-sm">{order.amount}</div>
                      <div className={`text-sm ${
                        order.status === "Shipped" ? "text-green-400" :
                        order.status === "Production" ? "text-orange-400" :
                        "text-blue-400"
                      }`}>
                        {order.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-2 row-span-1 dashboard-widget bg-purple-500/20">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm">On-time Delivery Rate</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <HighlightBox 
        title="End-to-End Order Lifecycle:"
        color="green"
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center mt-6">
          {[
            { step: 1, title: "Inquiry", desc: "Customer inquiry received" },
            { step: 2, title: "Quotation", desc: "Price & delivery commitment" },
            { step: 3, title: "Order Confirmation", desc: "Order booked in system" },
            { step: 4, title: "Production", desc: "Manufacturing & QC" },
            { step: 5, title: "Delivery & Invoice", desc: "Shipment & billing" }
          ].map((item, index) => (
            <React.Fragment key={index}>
              <div>
                <div className={`w-12 h-12 ${index === 4 ? 'bg-green-500' : 'bg-blue-800'} text-white rounded-full flex items-center justify-center text-lg font-bold mb-2 mx-auto`}>
                  {item.step}
                </div>
                <div className="font-semibold">{item.title}</div>
                <div className="text-sm text-gray-600">{item.desc}</div>
              </div>
              {index < 4 && (
                <div className="hidden md:flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-blue-800" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </HighlightBox>
    </div>
  );
};

export default Slide18;