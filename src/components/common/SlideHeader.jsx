/* eslint-disable react/prop-types */

const SlideHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-8 md:mb-12 pb-6 border-b-2 border-blue-800 relative">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-900 mb-3">
        {title}
      </h1>
      <p className="text-lg md:text-xl text-gray-600 font-medium">
        {subtitle}
      </p>
      <div className="absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
    </div>
  );
};

export default SlideHeader;