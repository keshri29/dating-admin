/* eslint-disable react/prop-types */
const HighlightBox = ({ title, children, icon: Icon, color = 'yellow' }) => {
  const colorClasses = {
    yellow: 'bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400',
    blue: 'bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-400',
    green: 'bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-400',
    red: 'bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-400',
  };

  return (
    <div className={`${colorClasses[color]} p-6 rounded-xl shadow-lg my-8 mb-6`}>
      {title && (
        <div className="flex items-center gap-3 mb-4">
          {Icon && <Icon className="w-5 h-5" />}
          <h4 className="text-xl font-bold text-gray-800">{title}</h4>
        </div>
      )}
      {children}
    </div>
  );
};

export default HighlightBox;