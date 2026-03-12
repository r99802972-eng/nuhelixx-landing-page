import { useState } from "react";
import { MessageSquare, Users, Home, BarChart3, Paperclip, LayoutGrid, Globe, SendHorizontal, Sparkles } from "lucide-react";
import legacyImage from "../assets/2790161.jpg";

export function MeetCRMSection() {
  const [isOn, setIsOn] = useState(true);
  const [value, setValue] = useState("");

  const features = [
    { icon: <MessageSquare className="w-5 h-5 text-green-500" />, title: "AI Conversational Command Interface" },
    { icon: <Users className="w-5 h-5 text-green-500" />, title: "Real-Time AI Call Transcription" },
    { icon: <Home className="w-5 h-5 text-orange-400" />, title: "Post-Call AI Meeting Detection" },
    { icon: <BarChart3 className="w-5 h-5 text-indigo-500" />, title: "AI Tonal Detection & Analytics" },
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto py-4 md:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-14 overflow-hidden">
      
      {/* --- Left Side: "OLD" CRM Comparison --- */}
      <div className="relative w-full max-w-lg lg:w-[45%] flex flex-col items-center scale-[0.7] sm:scale-80 lg:scale-85 transition-transform duration-500 origin-center lg:origin-right">
        <div className="absolute -top-6 font-bold text-gray-400 tracking-[0.2em] text-[10px] md:text-xs uppercase">LEGACY SYSTEM</div>

        <div className="relative group">
          <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white transform -rotate-1 transition-transform group-hover:rotate-0 duration-500">
            <img
              src={legacyImage}
              alt="Legacy CRM"
              className="w-full opacity-40 grayscale blur-[0.5px]"
            />
            {/* Magnifying Glass Effect Simulation */}
            <div className="absolute top-1/2 left-1/3 w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-gray-800 bg-white/20 backdrop-blur-[2px] shadow-2xl pointer-events-none flex items-center justify-center overflow-hidden">
              <img src={legacyImage} alt="magnified" className="absolute w-[400%] max-w-none left-[-150%] top-[-100%] scale-110" />
            </div>
          </div>

          {/* Sticky Note Simulations */}
          <div className="absolute -top-4 -left-4 bg-yellow-100 p-1.5 shadow-md rotate-[-5deg] text-[8px] md:text-[10px] w-16 md:w-20 border border-yellow-200">
            Fix Login Bug!
          </div>
          <div className="absolute top-1/2 -right-6 bg-blue-100 p-1.5 shadow-md rotate-[3deg] text-[8px] md:text-[10px] w-16 md:w-20 border border-blue-200 flex flex-col">
            Import Export Error
          </div>
        </div>

        <div className="mt-4 text-center">
          <h3 className="text-base md:text-lg font-black text-gray-800 uppercase tracking-tight">OLD, CLUSTERED, OVERWHELMING</h3>
          <p className="text-gray-500 max-w-[280px] text-[10px] md:text-xs font-medium leading-relaxed mt-1">
            Traditional CRMs clutter your workflow with complex dashboards and rigid processes.
          </p>
        </div>
      </div>

      {/* --- Transition Arrow --- */}
      <div className="hidden lg:flex items-center justify-center text-[#BCBF4F] z-10 scale-75">
        <div className="w-10 h-0.5 bg-current relative">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-current rotate-45" />
        </div>
      </div>

      {/* --- Right Side: NEW CMS --- */}
      <div className="w-full max-w-xl lg:w-[50%] flex flex-col items-center lg:items-start text-center lg:text-left scale-[0.85] sm:scale-95 origin-center lg:origin-left">
        <h2 className="text-[1.8rem] md:text-[2.5rem] lg:text-[3rem] font-black leading-tight tracking-tighter text-[#1F1F1F] mb-3">
          MEET THE <span className="text-[#BCBF4F]">NEW</span>
        </h2>

        {/* Premium AI Input Box (Light Theme - Compact) */}
        <div className="w-full max-w-xl group relative">
          {/* Main Container */}
          <div className="w-full bg-white rounded-[1.25rem] p-3 sm:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 transition-all group-hover:border-gray-200 group-hover:shadow-[0_8px_35px_rgb(0,0,0,0.06)]">
            {/* Header / Placeholder Area */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base md:text-lg font-bold text-gray-900">Imagine Something...</span>
              <Sparkles className="w-4 h-4 text-[#BCBF4F]" />
            </div>

            {/* Content Area (Functional Textarea) */}
            <div className="min-h-[50px] mb-3 relative">
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="What can I help you with today?"
                className="w-full bg-transparent border-none outline-none text-sm md:text-base text-gray-800 placeholder-gray-400 font-medium resize-none overflow-hidden min-h-[50px]"
                rows={2}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = target.scrollHeight + 'px';
                }}
              />
            </div>

            {/* Bottom Toolbar */}
            <div className="flex items-center justify-between mt-auto">
              {/* Left Icons */}
              <div className="flex items-center gap-3 text-gray-400">
                <button className="hover:text-gray-900 transition-colors">
                  <Paperclip className="w-4 h-4" />
                </button>
                <button className="hover:text-gray-900 transition-colors">
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button className="hover:text-gray-900 transition-colors">
                  <Globe className="w-4 h-4" />
                </button>
              </div>

              {/* Send Button */}
              <button
                onClick={() => setIsOn(!isOn)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all custom-glossy-button group/btn shadow-md ${isOn ? 'bg-green-500' : 'bg-gray-200'}`}
              >
                <SendHorizontal className={`w-4 h-4 transition-colors ${isOn ? 'text-white' : 'text-gray-400'}`} />
                {/* Glossy highlight */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
              </button>
            </div>
          </div>

          {/* Quick Action Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <button className="px-3.5 py-1.5 rounded-xl bg-gray-50 border border-gray-100 text-gray-700 text-[10px] font-bold hover:bg-white hover:shadow-sm hover:border-gray-200 transition-all flex items-center gap-2">
              Create Task
            </button>
            <button className="px-3.5 py-1.5 rounded-xl bg-gray-50 border border-gray-100 text-gray-700 text-[10px] font-bold hover:bg-white hover:shadow-sm hover:border-gray-200 transition-all flex items-center gap-2">
              Analyse Meetings
            </button>
            <button className="px-3.5 py-1.5 rounded-xl bg-gray-50 border border-gray-100 text-gray-700 text-[10px] font-bold hover:bg-white hover:shadow-sm hover:border-gray-200 transition-all flex items-center gap-2">
              More
            </button>
          </div>

          {/* Subtle Glow Background */}
          <div className="absolute -inset-4 bg-gray-100/50 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>

        <div className="space-y-1 md:space-y-1.5 mb-5 px-4 lg:px-0 mt-5">
          <h3 className="text-base md:text-lg font-bold text-[#1F1F1F]">The Future of CRM is Here.</h3>
          <p className="text-gray-600 max-w-lg text-[10px] md:text-xs font-medium leading-normal">
            Say goodbye to outdated, clustered CRMs. Experience a revolutionary, AI-powered CMS that takes input from simpl bar.
          </p>
        </div>

        {/* Feature Tags (Compact) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 w-full px-4 lg:px-0">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-50/50 p-1.5 rounded-lg border border-gray-100 hover:bg-white hover:shadow-sm transition-all group cursor-default">
              <div className="p-1 bg-white rounded shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
                <div className="scale-[0.55] md:scale-[0.7]">{f.icon}</div>
              </div>
              <span className="font-bold text-gray-700 text-[9px] md:text-[10px] whitespace-nowrap">{f.title}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 w-full pt-3 border-t border-gray-100 px-4 lg:px-0">
          <h4 className="text-sm font-bold mb-0.5">Intuitively ask for what you need</h4>
          <p className="text-gray-500 text-[9px] md:text-[10px] font-medium">Effortlessly manage everything from one smart search bar</p>
        </div>
      </div>
    </div>
  );
}

export default MeetCRMSection;