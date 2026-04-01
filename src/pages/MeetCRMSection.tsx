import { useEffect, useRef, useState } from "react";
import { BarChart3, Home, MessageSquare, Mic, Search, Users, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dashboardImage from "../assets/Dashboard.png";
import BackgroundOrnaments from "./components/BackgroundOrnaments";

gsap.registerPlugin(ScrollTrigger);

type MeetCRMSectionProps = {
  autoplayOnReveal?: boolean;
};

export function MeetCRMSection({ autoplayOnReveal }: MeetCRMSectionProps) {
  const [searchComplete, setSearchComplete] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const typingTextRef = useRef<HTMLSpanElement>(null);
  const searchStageRef = useRef<HTMLDivElement>(null);
  const replyBubbleRef = useRef<HTMLDivElement>(null);
  const dashboardStageRef = useRef<HTMLDivElement>(null);
  const toggleTrackRef = useRef<HTMLDivElement>(null);
  const toggleKnobRef = useRef<HTMLDivElement>(null);
  const actionButtonsRef = useRef<HTMLDivElement>(null);
  const topHeaderRef = useRef<HTMLDivElement>(null);
  const animationTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const autoplayStartedRef = useRef(false);

  useEffect(() => {
    const textToType = "Combine my entire workflow into one platform";
    const isHeroControlled = autoplayOnReveal !== undefined;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(sectionRef.current, { maxWidth: "780px" }); // Start large for search
      gsap.set(searchStageRef.current, { autoAlpha: 1, y: 0, display: "flex" });
      gsap.set(replyBubbleRef.current, { autoAlpha: 0, y: 10, display: "none" });
      gsap.set(actionButtonsRef.current, { autoAlpha: 0, y: 10, display: "none" });
      gsap.set(dashboardStageRef.current, { autoAlpha: 0, scale: 0.95, y: 10, display: "none" });
      gsap.set(topHeaderRef.current, { autoAlpha: 1 });

      gsap.set(toggleTrackRef.current, { backgroundColor: "#22c55e" });
      gsap.set(toggleKnobRef.current, { x: 14 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        paused: true,
        repeat: -1,
        repeatDelay: 3,
      });

      tl.call(() => {
        setSearchComplete(false);
        if (typingTextRef.current) {
          typingTextRef.current.textContent = "";
        }
      });

      // 1. Reset states
      tl.to(sectionRef.current, { maxWidth: "780px", duration: 0.4 }, 0);
      tl.to(topHeaderRef.current, { autoAlpha: 1, duration: 0.1 }, 0);

      // 2. Typing animation
      tl.to(
        {},
        {
          duration: 2.2,
          ease: "none",
          onUpdate: function () {
            if (typingTextRef.current) {
              const progress = Math.floor(this.progress() * textToType.length);
              typingTextRef.current.textContent = textToType.slice(0, progress);
            }
          },
        },
        0.5
      );

      // 3. Show the reply bubble
      tl.set(replyBubbleRef.current, { display: "flex" });
      tl.to(replyBubbleRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
      }, "+=0.3");

      // 4. Show action buttons
      tl.set(actionButtonsRef.current, { display: "flex" });
      tl.to(actionButtonsRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
      }, "-=0.2");

      // 5. Toggle switch logic
      tl.to(toggleTrackRef.current, {
        backgroundColor: "#e5e7eb",
        duration: 0.35,
      }, "+=1.0")
        .to(toggleKnobRef.current, {
          x: 0,
          duration: 0.35,
        }, "<");

      // 6. Fade out search sequence and SHRINK for Dashboard
      tl.to([searchStageRef.current, replyBubbleRef.current, actionButtonsRef.current], {
        autoAlpha: 0,
        y: -10,
        duration: 0.4,
        display: "none",
      }, "+=3.0");

      // Shrink container width for the image phase
      tl.to(sectionRef.current, {
        maxWidth: "540px",
        duration: 0.5,
        ease: "power2.inOut"
      }, "<");

      // Set searchComplete true for background text and feature label change
      tl.call(() => setSearchComplete(true));

      // 7. Transition in Dashboard Image
      tl.set(dashboardStageRef.current, { display: "flex" });
      tl.to(dashboardStageRef.current, {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
      }, "<0.1");

      animationTimelineRef.current = tl;

      if (!isHeroControlled) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top center+=120",
          once: true,
          onEnter: () => {
            if (!autoplayStartedRef.current) {
              autoplayStartedRef.current = true;
              tl.restart();
            }
          },
        });
      }
    }, sectionRef);

    return () => {
      animationTimelineRef.current = null;
      autoplayStartedRef.current = false;
      ctx.revert();
    };
  }, [autoplayOnReveal]);

  useEffect(() => {
    if (autoplayOnReveal === undefined || !autoplayOnReveal) return;
    if (autoplayStartedRef.current) return;

    autoplayStartedRef.current = true;
    animationTimelineRef.current?.restart();
  }, [autoplayOnReveal]);

  // Phase 1 (Search) and Phase 2 (Dashboard) labels
  const features = searchComplete
    ? [
      { icon: <MessageSquare className="h-3 w-3 text-[#60d394]" />, title: "Contract management" },
      { icon: <Users className="h-3 w-3 text-[#60d394]" />, title: "Transaction Management" },
      { icon: <Home className="h-3 w-3 text-[#ffb26b]" />, title: "Lead vetting and scoring" },
      { icon: <BarChart3 className="h-3 w-3 text-[#8c92ff]" />, title: "Social Style lead page" },
    ]
    : [
      { icon: <MessageSquare className="h-3 w-3 text-[#60d394]" />, title: "AI Conversational Command Interface" },
      { icon: <Users className="h-3 w-3 text-[#60d394]" />, title: "Real-Time AI Call Transcription" },
      { icon: <Home className="h-3 w-3 text-[#ffb26b]" />, title: "Post-Call AI Meeting Detection" },
      { icon: <BarChart3 className="h-3 w-3 text-[#8c92ff]" />, title: "AI Tonal Detection & Analytics" },
    ];

  return (
    <div className="relative w-full overflow-hidden bg-[#fafafa]">
      <BackgroundOrnaments />

      <section
        ref={sectionRef}
        className="relative z-10 mx-auto flex w-full flex-col items-center px-4 py-0.5 text-center sm:px-4 md:py-1 lg:px-5 lg:py-1"
      >
        <div
          ref={topHeaderRef}
          className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2 h-6"
        >
          <h2 className="font-black uppercase leading-none tracking-[-0.04em] text-[#111111] transition-all duration-500 text-[1.1rem] sm:text-[1.3rem] lg:text-[1.6rem]">
            MEET <span className="text-[#B7E78A]">YOUR</span> NEW CRM
          </h2>

          <div
            ref={toggleTrackRef}
            className="relative h-4 w-[28px] rounded-full bg-[#22c55e] shadow-inner shadow-black/10 transition-all duration-500 scale-100"
          >
            <div
              ref={toggleKnobRef}
              className="absolute left-[2px] top-[2px] h-[12px] w-[12px] rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.18)]"
            />
          </div>
        </div>

        <p className="mt-1 font-extrabold text-[#111111] transition-all duration-500 text-[10px] sm:text-[11px] lg:text-[0.85rem]">
          The Complete Real Estate Workflow. One Platform.
        </p>

        {/* Main container for the search/reply/dashboard UI */}
        <div className={`relative w-full flex flex-col items-center transition-all duration-500 ${searchComplete ? 'mt-1 max-w-[480px]' : 'mt-4 max-w-[620px]'}`}>

          {/* Simple Search Bar UI */}
          <div ref={searchStageRef} className="flex flex-col items-center w-full mb-3">
            <div className="flex w-full items-center gap-2 rounded-full border-[2px] border-[#111111] bg-white px-3 py-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.04)] sm:px-4 sm:py-2.5">
              <Search className="h-3.5 w-3.5 shrink-0 text-[#111111] sm:h-4 sm:w-4" strokeWidth={2.5} />
              <div className="flex min-h-[20px] flex-1 items-center text-left text-[10px] font-medium text-[#111111] sm:text-[12px] md:text-[13px]">
                <span ref={typingTextRef} className="min-h-[1.5em]" />
                <span className="ml-0.5 inline-block h-[1em] w-[1.5px] animate-pulse bg-[#111111]" />
              </div>
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[#111111]">
                <Mic className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* AI Reply Bubble */}
          <div
            ref={replyBubbleRef}
            className="flex items-center gap-3 bg-green-50/60 border border-green-100 rounded-2xl p-4 mb-3 self-center sm:self-start max-w-[95%] text-left"
          >
            <div className="w-8 h-8 rounded-xl bg-green-200/40 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-green-600 fill-green-600" />
            </div>
            <p className="text-sm font-semibold text-gray-800">
              No problem! I've already done that.
            </p>
          </div>

          {/* Action Buttons Pills */}
          <div
            ref={actionButtonsRef}
            className="flex flex-wrap gap-2 justify-center py-1 mb-2"
          >
            {["Create Task", "Analyse Meetings", "More"].map(btn => (
              <button key={btn} className="px-4 py-2 rounded-xl bg-gray-50/80 border border-gray-100 text-[11px] font-bold text-gray-600">
                {btn}
              </button>
            ))}
          </div>

          {/* Dashboard Stage (Image) - Increased scale for visibility */}
          <div
            ref={dashboardStageRef}
            className="w-full flex flex-col items-center"
          >
            <div className="w-full overflow-hidden rounded-[0.8rem] bg-[#f7f8fb] p-1 shadow-[0_12px_32px_rgba(17,17,17,0.08)] ring-1 ring-black/5">
              <img
                src={dashboardImage}
                alt="NuHelixX CRM dashboard"
                className="w-full mx-auto rounded-[0.6rem] object-cover object-top"
              />
            </div>
          </div>
        </div>

        <div className={`transition-all duration-500 ${searchComplete ? 'mt-2 space-y-1' : 'mt-8 space-y-2'}`}>
          <h3 className={`font-black leading-[1.2] tracking-[-0.04em] text-[#111111] transition-all duration-500 ${searchComplete ? 'text-[1rem] lg:text-[1.1rem]' : 'text-[1.2rem] lg:text-[1.5rem]'}`}>
            The Future of CRM is Here.
          </h3>
          <h4 className="text-sm font-semibold text-gray-900">We’ve decoded the DNA of your traditional software stack and re-engineered it into a unified, evolutionary platform.  </h4>

          <p className={`mx-auto transition-all duration-500 text-[#444444] ${searchComplete ? 'max-w-[440px] text-[10px] sm:text-[11px]' : 'max-w-[540px] text-xs sm:text-[0.95rem]'}`}>
            {searchComplete
              ? "Experience a revolutionary, AI-powered platform that takes input from a simple bar and manages your entire real estate desk across all devices."
              : "Say goodbye to software overload. NuHelixX RE powers your entire real estate workflow from one AI-driven command bar."}
          </p>
        </div>

        <div className={`grid w-full transition-all duration-500 gap-2 sm:grid-cols-2 ${searchComplete ? 'mt-3 max-w-[480px]' : 'mt-6 max-w-[620px]'}`}>
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`flex items-center gap-3 rounded-xl border border-[#ececf1] bg-white text-left shadow-[0_8px_16px_rgba(0,0,0,0.03)] transition-all duration-500 ${searchComplete ? 'px-2 py-2' : 'px-3 py-3'}`}
            >
              <div className={`flex shrink-0 items-center justify-center rounded-lg border border-[#ededf0] bg-white transition-all duration-500 ${searchComplete ? 'h-7 w-7' : 'h-9 w-10'}`}>
                {feature.icon}
              </div>
              <span className={`font-medium text-[#444444] transition-all duration-500 ${searchComplete ? 'text-[10px] sm:text-[11px]' : 'text-[11px] sm:text-[12.5px]'}`}>{feature.title}</span>
            </div>
          ))}
        </div>

        <p className={`mt-4 font-extrabold text-[#111111] transition-all duration-500 ${searchComplete ? 'text-[8.5px] sm:text-[9.5px]' : 'text-[10px] sm:text-[11.5px] px-2'}`}>
          {searchComplete
            ? "Effortlessly manage your whole workflow from one application."
            : "Simply tell the platform what you want to accomplish and NuHelixX RE intelligently handles the rest."}
        </p>
      </section>
    </div>
  );
}

export default MeetCRMSection;
