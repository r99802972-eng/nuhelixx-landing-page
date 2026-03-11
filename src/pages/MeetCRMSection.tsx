import { useState } from "react";
import { Search, MessageSquare, Users, Home, BarChart3, MousePointer2 } from "lucide-react";
import oldCrmImage from "../assets/Dashboard.png";

export function MeetCRMSection() {
  const [isOn, setIsOn] = useState(true);
  const [query, setQuery] = useState("");

  const features = [
    { icon: <MessageSquare className="w-5 h-5 text-green-500" />, title: "Automated Follow-Ups" },
    { icon: <Users className="w-5 h-5 text-green-500" />, title: "Lead Qualification" },
    { icon: <Home className="w-5 h-5 text-orange-400" />, title: "Property Insights" },
    { icon: <BarChart3 className="w-5 h-5 text-indigo-500" />, title: "Generate Custom Reports" },
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto pt-16 sm:pt-20 md:pt-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 overflow-hidden">
      
      {/* --- Left Side: "OLD" CRM Comparison --- */}
      <div className="relative w-full lg:w-[45%] flex flex-col items-center scale-90 md:scale-95 lg:scale-100 origin-center">
        <div className="absolute top-[-25px] font-bold text-gray-400 tracking-widest text-[10px] md:text-xs uppercase">"OLD" CRM</div>
        
        <div className="relative group">
          <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white transform -rotate-1 transition-transform group-hover:rotate-0 duration-500">
            <img 
              src={oldCrmImage} 
              alt="Legacy CRM" 
              className="w-full opacity-60 grayscale-[0.2]"
            />
            {/* Magnifying Glass Effect Simulation */}
            <div className="absolute top-1/2 left-1/3 w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-gray-800 bg-white/20 backdrop-blur-[2px] shadow-2xl pointer-events-none flex items-center justify-center overflow-hidden">
               <img src={oldCrmImage} alt="magnified" className="absolute w-[400%] max-w-none left-[-150%] top-[-100%] scale-110" />
            </div>
          </div>
          
          {/* Sticky Note Simulations */}
          <div className="absolute -top-4 -left-4 bg-yellow-100 p-1.5 shadow-md rotate-[-5deg] text-[8px] md:text-[10px] w-16 md:w-20 border border-yellow-200">
            Fix Login Bug!
          </div>
          <div className="absolute bottom-10 -right-4 bg-blue-100 p-1.5 shadow-md rotate-[3deg] text-[8px] md:text-[10px] w-16 md:w-20 border border-blue-200">
            Import Export Error
          </div>
        </div>

        <div className="mt-6 text-center max-w-sm px-4">
          <h3 className="text-[#1F1F1F] font-black text-lg md:text-xl uppercase tracking-tighter mb-1">OLD, CLUSTERED, OVERWHELMING</h3>
          <p className="text-gray-500 text-xs md:text-sm leading-tight font-medium">
            Traditional CRMs clutter your workflow with complex dashboards and rigid processes.
          </p>
        </div>
      </div>

      {/* --- Center Arrow Simulation --- */}
      <div className="hidden lg:flex items-center justify-center">
        <div className="w-8 h-[2px] bg-gradient-to-r from-gray-200 to-green-400 relative">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 border-y-[4px] border-y-transparent border-l-[6px] border-l-green-400" />
        </div>
      </div>

      {/* --- Right Side: NEW CMS --- */}
      <div className="w-full lg:w-[50%] flex flex-col items-center lg:items-start text-center lg:text-left">
        <h2 className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-black leading-none text-[#1F1F1F] mb-6">
          MEET YOUR NEW <span className="text-[#BCBF4F]">CMS</span>
        </h2>

        {/* Search Bar & Toggle Container */}
        <div className="w-full max-w-lg bg-white rounded-full shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-gray-100 p-1.5 flex items-center gap-2 md:gap-3 mb-8 hover:shadow-[0_4px_25px_rgb(0,0,0,0.08)] transition-all">
          <div className="pl-3">
            <Search className="w-5 h-5 text-gray-800" />
          </div>
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What can I help you with today?"
            className="flex-1 bg-transparent border-none outline-none text-sm md:text-base text-gray-700 placeholder-gray-400 font-medium"
          />
          <button 
            onClick={() => setIsOn(!isOn)}
            className={`flex items-center gap-2 p-1 pr-3 rounded-full transition-all duration-300 ${isOn ? 'bg-green-500' : 'bg-gray-300'}`}
          >
            <div className={`w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center transition-transform duration-300 ${isOn ? 'translate-x-12 md:translate-x-14' : 'translate-x-0'}`}>
               <MousePointer2 className={`w-3 h-3 transition-colors ${isOn ? 'text-green-500' : 'text-gray-400'}`} />
            </div>
            <span className={`text-[10px] font-bold text-white transition-opacity hidden md:inline ${isOn ? 'opacity-100' : 'opacity-0'}`}>AI ON</span>
          </button>
        </div>

        <div className="space-y-2 md:space-y-3 mb-8 px-4 lg:px-0">
           <h3 className="text-xl md:text-2xl font-bold text-[#1F1F1F]">The Future of CRM is Here.</h3>
           <p className="text-gray-600 max-w-lg text-sm md:text-base font-medium leading-normal">
             Say goodbye to outdated, clustered CRMs. Experience a revolutionary, AI-powered CMS that takes input from simpl bar.
           </p>
        </div>

        {/* Feature Tags */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full px-4 lg:px-0">
           {features.map((f, i) => (
             <div key={i} className="flex items-center gap-2 bg-gray-50/50 p-2.5 rounded-xl border border-gray-100 hover:bg-white hover:shadow-sm transition-all group cursor-default">
                <div className="p-1.5 bg-white rounded-lg shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
                  <div className="scale-75 md:scale-90">{f.icon}</div>
                </div>
                <span className="font-bold text-gray-700 text-xs md:text-sm whitespace-nowrap">{f.title}</span>
             </div>
           ))}
        </div>

        <div className="mt-8 w-full pt-6 border-t border-gray-100 px-4 lg:px-0">
           <h4 className="text-lg font-bold mb-1">Intuitively ask for what you need</h4>
           <p className="text-gray-500 text-xs md:text-sm font-medium">Effortlessly manage everything from one smart search bar</p>
        </div>
      </div>
    </div>
  );
}

export default MeetCRMSection;