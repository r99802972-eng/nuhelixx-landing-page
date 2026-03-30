import { useState, useEffect, useRef } from "react";
import { MessageSquare, Users, Home, BarChart3, Paperclip, Globe, SendHorizontal, Sparkles, Mic } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import legacyImage from "../assets/2790161.jpg";
import dashboardImage from "../assets/Dashboard.png";

gsap.registerPlugin(ScrollTrigger);

export function MeetCRMSection() {
  const [isOn, setIsOn] = useState(true);
  const [value, setValue] = useState("");

  // Refs for animation
  const sectionRef = useRef<HTMLDivElement>(null);
  const micIconRef = useRef<HTMLDivElement>(null);
  const typingTextRef = useRef<HTMLSpanElement>(null);
  const aiResponseRef = useRef<HTMLDivElement>(null);
  const legacySectionRef = useRef<HTMLDivElement>(null);
  const dashboardSectionRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline that triggers when section comes into view
      const tl = gsap.timeline({
        repeat: -1, // Repeat infinitely
        repeatDelay: 5, // Wait 5 seconds after each completion
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center+=100",
          toggleActions: "play pause resume reset", // Play when enters, pause when leaves, resume when back, reset when back past start
        }
      });

      // Initial state reset for looping
      tl.set(typingTextRef.current, { innerText: "" })
        .set(textareaRef.current, { opacity: 1 })
        .set(aiResponseRef.current, { autoAlpha: 0 })
        .set(legacySectionRef.current, { autoAlpha: 1, scale: 1 })
        .set(dashboardSectionRef.current, { autoAlpha: 0 })
        .set(micIconRef.current, { scale: 1, color: "#9ca3af", backgroundColor: "transparent", boxShadow: "none" });

      // 1. Mic icon pulses/presses (turns red or scales)
      tl.to(micIconRef.current, {
        scale: 1.15,
        color: "#ef4444", // Red for recording
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        boxShadow: "0 0 0 4px rgba(239, 68, 68, 0.2)",
        duration: 0.3,
        ease: "power2.out",
      })
      .to(micIconRef.current, {
        boxShadow: "0 0 0 8px rgba(239, 68, 68, 0)", // Pulse effect
        repeat: 3,
        yoyo: true,
        duration: 0.7,
        ease: "sine.inOut"
      }, "+=0.2");

      // 2. Animate typing "Combine my entire workflow into one platform"
      const textToType = "Combine my entire workflow into one platform";
      tl.to(textareaRef.current, { opacity: 0, duration: 0.2 }, "-=2.5"); // Hide placeholder early
      
      tl.to({}, { 
        duration: 2.5, 
        onUpdate: function() {
          if (typingTextRef.current) {
             const progress = Math.floor(this.progress() * textToType.length);
             typingTextRef.current.innerText = textToType.substring(0, progress);
          }
        },
        ease: "none"
      }, "-=2.2");

      // 3. Mic icon finishes recording
      tl.to(micIconRef.current, {
        scale: 1,
        color: "#9ca3af", // Back to gray-400
        backgroundColor: "transparent",
        boxShadow: "none",
        duration: 0.3
      });

      // 4. AI response appears
      tl.fromTo(aiResponseRef.current, 
        { autoAlpha: 0, y: 15 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "back.out(1.2)" },
        "+=0.2"
      );

      // 5. Left section crossfade to New CRM Image
      tl.to(legacySectionRef.current, { autoAlpha: 0, scale: 0.95, duration: 0.8, ease: "power2.inOut" }, "+=0.3")
      tl.fromTo(dashboardSectionRef.current, 
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "<" // start at same time as legacy fade-out
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: <MessageSquare className="w-5 h-5 text-green-500" />, title: "AI Conversational Command Interface" },
    { icon: <Users className="w-5 h-5 text-green-500" />, title: "Real-Time AI Call Transcription" },
    { icon: <Home className="w-5 h-5 text-orange-400" />, title: "Post-Call AI Meeting Detection" },
    { icon: <BarChart3 className="w-5 h-5 text-indigo-500" />, title: "AI Tonal Detection & Analytics" },
  ];

  return (
    <div ref={sectionRef} className="w-full max-w-[1400px] mx-auto py-8 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 overflow-hidden">

      {/* --- Left Side: "OLD" CRM Comparison -> Transforms to "NEW" CRM --- */}
      <div className="relative w-full max-w-lg lg:w-[45%] grid grid-cols-1 grid-rows-1 items-center scale-[0.85] sm:scale-95 lg:scale-105 origin-center lg:origin-right min-h-[450px]">
        
        {/* Legacy CRM Container */}
        <div ref={legacySectionRef} className="col-start-1 row-start-1 flex flex-col items-center z-10">
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

        {/* New CRM Dashboard Container (hidden initially by GSAP autoAlpha: 0) */}
        <div ref={dashboardSectionRef} className="col-start-1 row-start-1 flex flex-col items-center z-20 invisible opacity-0">
          <div className="absolute -top-6 font-bold text-[#BCBF4F] tracking-[0.2em] text-[10px] md:text-xs uppercase drop-shadow-sm">EVOLUTIONARY PLATFORM</div>

          <div className="relative group w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-white transform rotate-1 transition-transform group-hover:rotate-0 duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
              {/* Fake UI header */}
              <div className="w-full h-6 bg-gray-50 border-b border-gray-100 flex items-center px-3 gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
              </div>
              <img
                src={dashboardImage}
                alt="New CMS Dashboard"
                className="w-full object-cover max-h-[300px] object-top"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/90 to-transparent pointer-events-none" />
            </div>
            
            {/* Sparkle details floating nearby */}
            <div className="absolute -top-4 -right-4 p-2 bg-white rounded-xl shadow-lg border border-gray-100 animate-bounce delay-150">
              <Sparkles className="w-5 h-5 text-[#BCBF4F]" />
            </div>
            <div className="absolute -bottom-2 -left-3 p-1.5 bg-green-50 rounded-xl shadow border border-green-100 animate-pulse">
              <Mic className="w-4 h-4 text-green-500" />
            </div>
          </div>

          <div className="mt-6 text-center max-w-sm px-4">
            <h3 className="text-[#1F1F1F] font-black text-lg md:text-xl uppercase tracking-tighter mb-1">UNIFIED & INTELLIGENT</h3>
            <p className="text-gray-500 text-xs md:text-sm leading-tight font-medium">
              NuHelixX RE powers your entire real estate workflow from one AI-driven command bar.
            </p>
          </div>
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
          MEET THE <span className="text-[#BCBF4F]">NEW CMS</span>
        </h2>

        {/* Premium AI Input Box */}
        <div className="w-full max-w-xl group relative z-30">
          <div className="w-full bg-white rounded-[1.5rem] p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 transition-all group-hover:border-gray-200 group-hover:shadow-[0_8px_35px_rgb(0,0,0,0.06)]">
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg md:text-xl font-bold text-gray-900">Imagine Something...</span>
              <Sparkles className="w-4 h-4 text-[#BCBF4F]" />
            </div>

            <div className="min-h-[60px] mb-4 relative flex items-start">
              <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="What can I help you with today?"
                className="w-full bg-transparent border-none outline-none text-base md:text-lg text-gray-800 placeholder-gray-400 font-medium resize-none overflow-hidden min-h-[60px] relative z-20"
                rows={2}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = target.scrollHeight + 'px';
                }}
              />
              {/* Simulated Typing Layer - sits behind textarea so that textarea is actually functional, but here we just hide the textarea to show typing */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
                <span ref={typingTextRef} className="text-base md:text-lg text-gray-800 font-medium"></span>
              </div>
            </div>

            {/* Bottom Toolbar */}
            <div className="flex items-center justify-between mt-auto relative z-20">
              <div className="flex items-center gap-1.5 sm:gap-3">
                <button className="text-gray-400 p-1.5 rounded-full hover:bg-gray-50 hover:text-gray-900 transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
                <div ref={micIconRef} className="text-gray-400 p-1.5 rounded-full flex items-center justify-center transition-all hover:bg-gray-50 hover:text-gray-900 cursor-pointer">
                  <Mic className="w-5 h-5" />
                </div>
                <button className="text-gray-400 p-1.5 rounded-full hover:bg-gray-50 hover:text-gray-900 transition-colors">
                  <Globe className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={() => setIsOn(!isOn)}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all custom-glossy-button group/btn shadow-md ${isOn ? 'bg-green-500' : 'bg-gray-200'}`}
              >
                <SendHorizontal className={`w-5 h-5 transition-colors ${isOn ? 'text-white' : 'text-gray-400'}`} />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
              </button>
            </div>
          </div>
          
          <div className="absolute -inset-4 bg-gray-100/50 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>

        {/* AI Response Text/Bubble (Revealed by GSAP) */}
        <div ref={aiResponseRef} className="invisible opacity-0 w-full mt-4 p-4 rounded-xl bg-green-50/80 border border-green-100/60 shadow-sm backdrop-blur-sm self-start text-left ml-4 relative">
           <div className="absolute top-0 left-6 -translate-y-full w-0 h-0 border-l-[8px] border-r-[8px] border-b-[10px] border-l-transparent border-r-transparent border-b-green-50/80 border-solid" />
           <div className="flex items-center gap-3">
             <div className="p-1.5 bg-[#BCBF4F] rounded-lg">
               <Sparkles className="w-4 h-4 text-white" />
             </div>
             <div>
                <span className="text-gray-800 text-sm font-bold block">No problem! I've already done that.</span>
             </div>
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

        <div className="space-y-1.5 md:space-y-2 my-6 px-4 lg:px-0">
          <h3 className="text-lg md:text-xl font-bold text-[#1F1F1F]">The Future of CRM is Here.</h3>
          <p className="text-gray-600 max-w-lg text-xs md:text-sm font-medium leading-normal">
            Say goodbye to outdated, clustered CRMs. Experience a revolutionary, AI-powered CMS that takes input from simple bar.
          </p>
        </div>

        {/* Feature Tags */}
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