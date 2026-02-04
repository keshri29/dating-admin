 import SlideHeader from './common/SlideHeader';
import ModuleCard from './common/ModuleCard';
import HighlightBox from './common/HighlightBox';
import { CreditCard, HandCoins, DollarSign, PieChart, Scale, File, Building, CheckCircle, TrendingUp } from 'lucide-react';

const Slide16 = () => {
  const modules = [
    {
      icon: CreditCard,
      title: "Accounts Payable",
      description: "Vendor payments, credit management, early payment discounts"
    },
    {
      icon: HandCoins,
      title: "Accounts Receivable",
      description: "Customer collections, credit control, aging analysis"
    },
    {
      icon: DollarSign,
      title: "Cash Flow Management",
      description: "Cash position, forecasting, working capital optimization"
    },
    {
      icon: PieChart,
      title: "Profit & Loss",
      description: "Real-time P&L, department-wise profitability, cost analysis"
    },
    {
      icon: Scale,
      title: "Balance Sheet",
      description: "Assets, liabilities, equity - always up-to-date"
    },
    {
      icon: File,
      title: "Tax Reports",
      description: "GST, TDS, TCS, Income Tax - automated compliance"
    }
  ];

  return (
    <div>
      <SlideHeader
        title="Financial Management"
        subtitle="Complete financial control and visibility for textile businesses"
      />

      <div className="mb-12">
        <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-3">
          <TrendingUp className="w-6 h-6" />
          ERP Manages:
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <ModuleCard
              key={index}
              icon={module.icon}
              title={module.title}
              description={module.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>

      <HighlightBox 
        title="One-Click Financial Visibility:"
        color="green"
      >
        <div className="h-64 bg-gradient-to-br from-gray-800 to-blue-900 rounded-xl shadow-xl p-4 mt-6">
          <div className="grid grid-cols-4 grid-rows-3 gap-3 h-full">
            <div className="dashboard-widget bg-green-500/20">
              <div className="text-2xl font-bold">₹42.5L</div>
              <div className="text-xs">This Month Sales</div>
            </div>
            <div className="dashboard-widget bg-red-500/20">
              <div className="text-2xl font-bold">₹18.3L</div>
              <div className="text-xs">This Month Expenses</div>
            </div>
            <div className="dashboard-widget bg-blue-500/20">
              <div className="text-2xl font-bold">₹24.2L</div>
              <div className="text-xs">Net Profit</div>
            </div>
            <div className="dashboard-widget bg-orange-500/20">
              <div className="text-2xl font-bold">57%</div>
              <div className="text-xs">Gross Margin</div>
            </div>
            <div className="col-span-2 row-span-1 dashboard-widget bg-purple-500/20">
              <div className="text-lg font-bold">Cash Flow: ₹8.7L Positive</div>
              <div className="text-sm">30-day projection: ₹12.4L</div>
            </div>
            <div className="col-span-2 row-span-1 dashboard-widget bg-teal-500/20">
              <div className="text-lg font-bold">ROI: 28.5%</div>
              <div className="text-sm">Year-to-date performance</div>
            </div>
          </div>
        </div>
      </HighlightBox>

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-blue-100 mb-6 flex items-center gap-3">
          <Building className="w-6 h-6" />
          Bank Integration:
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-200 mb-4">ERP integrates directly with banking systems for:</p>
            <ul className="space-y-3 pl-5">
              <li className="flex items-center gap-2 text-white">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Auto bank reconciliation
              </li>
              <li className="flex items-center gap-2 text-white">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Online payment processing
              </li>
              <li className="flex items-center gap-2 text-white">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Real-time balance updates
              </li>
              <li className="flex items-center gap-2 text-white">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Bulk payment processing
              </li>
              <li className="flex items-center gap-2 text-white">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Payment status tracking
              </li>
            </ul>
          </div>
          
          <div className="flex justify-center">
            <div className="w-64 h-32 bg-gradient-to-r from-blue-700 to-blue-900 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-2xl">
              <Building className="w-10 h-10 mr-4" />
              Bank Connect
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide16;