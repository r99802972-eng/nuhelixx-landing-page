// import React, { useEffect } from 'react';
// import { Search, Mic } from 'lucide-react';
// import gsap from 'gsap';

// const HeroContent = () => {
//   const containerRef = React.useRef(null);

//   useEffect(() => {
//     // Fade in HeroContent after Header animation completes (3.5 seconds)
//     gsap.fromTo(
//       containerRef.current,
//       { opacity: 0 },
//       { 
//         opacity: 1, 
//         duration: 0, 
//         delay: 3,
//         ease: 'power2.inOut'
//       }
//     );
//   }, []);

//   return (
//     <div 
//       ref={containerRef}
//       className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center py-16 md:py-24 opacity-0"
//     >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center max-w-4xl mx-auto">
//           {/* Main Heading */}
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
//             Meet Your New{' '}
//             <span className="bg-gradient-to-r from-[#BCBF4F] to-green-500 bg-clip-text text-transparent">
//               CRM
//             </span>
//           </h1>

//           {/* Subtitle */}
//           <p className="text-lg md:text-xl text-gray-600 mb-12">
//             Powerful customer relationship management designed for modern businesses
//           </p>

//           {/* Search Bar with Voice Input */}
//           <div className="flex justify-center mb-8">
//             <div className="w-full max-w-xl">
//               <div className="relative flex items-center bg-white border-2 border-gray-300 rounded-full shadow-lg hover:shadow-xl transition-shadow">
//                 {/* Search Icon */}
//                 <Search className="w-6 h-6 text-gray-400 ml-6" />

//                 {/* Input Field */}
//                 <input
//                   type="text"
//                   placeholder="Search features, help, or integrations..."
//                   className="flex-1 bg-transparent outline-none px-6 py-4 text-gray-700 placeholder-gray-400"
//                 />

//                 {/* Voice Icon */}
//                 <button className="hover:bg-gray-100 p-3 rounded-full mr-2 transition-colors">
//                   <Mic className="w-6 h-6 text-gray-600" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* CTA Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button className="px-8 py-3 bg-[#BCBF4F] hover:bg-yellow-500 text-gray-900 font-semibold rounded-full transition-colors">
//               Start Free Trial
//             </button>
//             <button className="px-8 py-3 border-2 border-gray-300 hover:border-[#BCBF4F] text-gray-900 font-semibold rounded-full transition-colors">
//               Watch Demo
//             </button>
//           </div>

//           {/* Stats Section */}
//           <div className="mt-16 grid grid-cols-3 gap-8 md:gap-12">
//             <div>
//               <p className="text-3xl md:text-4xl font-bold text-[#BCBF4F] mb-2">500+</p>
//               <p className="text-sm md:text-base text-gray-600">Active Businesses</p>
//             </div>
//             <div>
//               <p className="text-3xl md:text-4xl font-bold text-[#BCBF4F] mb-2">98%</p>
//               <p className="text-sm md:text-base text-gray-600">Satisfaction Rate</p>
//             </div>
//             <div>
//               <p className="text-3xl md:text-4xl font-bold text-[#BCBF4F] mb-2">24/7</p>
//               <p className="text-sm md:text-base text-gray-600">Support Available</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroContent;
