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
    <div className="w-full max-w-[1400px] mx-auto py-8 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 overflow-hidden">

      {/* --- Left Side: "OLD" CRM Comparison --- */}
      <div className="relative w-full max-w-lg lg:w-[45%] flex flex-col items-center scale-[0.75] sm:scale-85 lg:scale-90 transition-transform duration-500 origin-center lg:origin-right">
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
      <div className="w-full max-w-xl lg:w-[50%] flex flex-col items-center lg:items-start text-center lg:text-left scale-90 sm:scale-100 origin-center lg:origin-left">
        <h2 className="text-[2rem] md:text-[3rem] lg:text-[3.5rem] font-black leading-tight tracking-tighter text-[#1F1F1F] mb-4">
          MEET THE <span className="text-[#BCBF4F]">NEW</span>
        </h2>

        {/* Premium AI Input Box (Light Theme - Compact) */}
        <div className="w-full max-w-xl group relative">
          {/* Main Container */}
          <div className="w-full bg-white rounded-[1.5rem] p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 transition-all group-hover:border-gray-200 group-hover:shadow-[0_8px_35px_rgb(0,0,0,0.06)]">
            {/* Header / Placeholder Area */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg md:text-xl font-bold text-gray-900">Imagine Something...</span>
              <Sparkles className="w-4 h-4 text-[#BCBF4F]" />
            </div>

            {/* Content Area (Functional Textarea) */}
            <div className="min-h-[60px] mb-4 relative">
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="What can I help you with today?"
                className="w-full bg-transparent border-none outline-none text-base md:text-lg text-gray-800 placeholder-gray-400 font-medium resize-none overflow-hidden min-h-[60px]"
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
                  <Paperclip className="w-5 h-5" />
                </button>
                <button className="hover:text-gray-900 transition-colors">
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button className="hover:text-gray-900 transition-colors">
                  <Globe className="w-5 h-5" />
                </button>
              </div>

              {/* Send Button */}
              <button
                onClick={() => setIsOn(!isOn)}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all custom-glossy-button group/btn shadow-md ${isOn ? 'bg-green-500' : 'bg-gray-200'}`}
              >
                <SendHorizontal className={`w-5 h-5 transition-colors ${isOn ? 'text-white' : 'text-gray-400'}`} />
                {/* Glossy highlight */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
              </button>
            </div>
          </div>

          {/* Quick Action Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <button className="px-4 py-2 rounded-xl bg-gray-50 border border-gray-100 text-gray-700 text-xs font-bold hover:bg-white hover:shadow-sm hover:border-gray-200 transition-all flex items-center gap-2">
              Create Task
            </button>
            <button className="px-4 py-2 rounded-xl bg-gray-50 border border-gray-100 text-gray-700 text-xs font-bold hover:bg-white hover:shadow-sm hover:border-gray-200 transition-all flex items-center gap-2">
              Analyse Meetings
            </button>
            <button className="px-4 py-2 rounded-xl bg-gray-50 border border-gray-100 text-gray-700 text-xs font-bold hover:bg-white hover:shadow-sm hover:border-gray-200 transition-all flex items-center gap-2">
              More
            </button>
          </div>

          {/* Subtle Glow Background */}
          <div className="absolute -inset-4 bg-gray-100/50 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>

        <div className="space-y-1.5 md:space-y-2 mb-6 px-4 lg:px-0">
          <h3 className="text-lg md:text-xl font-bold text-[#1F1F1F]">The Future of CRM is Here.</h3>
          <p className="text-gray-600 max-w-lg text-xs md:text-sm font-medium leading-normal">
            Say goodbye to outdated, clustered CRMs. Experience a revolutionary, AI-powered CMS that takes input from simpl bar.
          </p>
        </div>

        {/* Feature Tags (Compact) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full px-4 lg:px-0">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-50/50 p-2 rounded-lg border border-gray-100 hover:bg-white hover:shadow-sm transition-all group cursor-default">
              <div className="p-1.5 bg-white rounded-lg shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
                <div className="scale-[0.65] md:scale-[0.8]">{f.icon}</div>
              </div>
              <span className="font-bold text-gray-700 text-[10px] md:text-xs whitespace-nowrap">{f.title}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 w-full pt-4 border-t border-gray-100 px-4 lg:px-0">
          <h4 className="text-base font-bold mb-0.5">Intuitively ask for what you need</h4>
          <p className="text-gray-500 text-[10px] md:text-xs font-medium">Effortlessly manage everything from one smart search bar</p>
        </div>
      </div>
    </div>
  );
}

export default MeetCRMSection;