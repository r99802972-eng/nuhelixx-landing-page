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
  const bottomContentRef = useRef<HTMLDivElement>(null);
  const animationTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const autoplayStartedRef = useRef(false);

  useEffect(() => {
    const textToType = "Combine my entire workflow into one platform";
    const isHeroControlled = autoplayOnReveal !== undefined;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(sectionRef.current, { maxWidth: "1100px" }); // Start expanded
      gsap.set(searchStageRef.current, { autoAlpha: 1, y: 0, display: "flex" });
      gsap.set(replyBubbleRef.current, { autoAlpha: 0, y: 10, display: "none" });
      gsap.set(actionButtonsRef.current, { autoAlpha: 0, y: 10, display: "none" });
      gsap.set(dashboardStageRef.current, { autoAlpha: 0, scale: 0.95, y: 10, display: "none" });
      gsap.set(topHeaderRef.current, { autoAlpha: 1 });

      gsap.set(toggleTrackRef.current, { backgroundColor: "#22c55e" });
      gsap.set(toggleKnobRef.current, { x: 26 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        paused: true,
        repeat: 1,
        repeatDelay: 3,
      });

      tl.call(() => {
        setSearchComplete(false);
        if (typingTextRef.current) {
          typingTextRef.current.textContent = "";
        }
        // Reset toggle
        gsap.set(toggleTrackRef.current, { backgroundColor: "#22c55e" });
        gsap.set(toggleKnobRef.current, { x: 26 });
      });

      // 1. Reset states
      tl.to(sectionRef.current, { maxWidth: "1100px", duration: 0.1 }, 0);
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

      // Container width stays expanded
      tl.to(sectionRef.current, {
        maxWidth: "1100px",
        duration: 0.1,
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

        // Bottom section reveal animation
        gsap.from(bottomContentRef.current, {
          y: 60,
          autoAlpha: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bottomContentRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          }
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
  const features = [
    { icon: <MessageSquare className="h-3 w-3 text-[#60d394]" />, title: "AI Conversational Command Interface" },
    { icon: <Users className="h-3 w-3 text-[#60d394]" />, title: "Real-Time AI Call Transcription" },
    { icon: <Home className="h-3 w-3 text-[#ffb26b]" />, title: "Post-Call AI Meeting Detection" },
    { icon: <BarChart3 className="h-3 w-3 text-[#8c92ff]" />, title: "AI Tonal Detection & Analytics" },
    { icon: <MessageSquare className="h-3 w-3 text-[#60d394]" />, title: "Contract management" },
    { icon: <Users className="h-3 w-3 text-[#60d394]" />, title: "Transaction Management" },
    { icon: <Home className="h-3 w-3 text-[#ffb26b]" />, title: "Lead vetting and scoring" },
    { icon: <BarChart3 className="h-3 w-3 text-[#8c92ff]" />, title: "Social Style lead page" },
  ];

  return (
    <div className="relative w-full bg-white text-[#111111] overflow-hidden">
      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-[0.4]"
        style={{ backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)", backgroundSize: "40px 40px" }}
      />
      <BackgroundOrnaments />

      <section
        ref={sectionRef}
        className="relative z-10 mx-auto flex w-full flex-col items-center px-4 pt-12 text-center sm:px-6 lg:pt-16"
      >
        {/* Top Banner Pill */}
        <div className="mb-8 flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-sm">
          <div className="h-2 w-2 rounded-full bg-[#60d394] animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 sm:text-[11px]">
            Now live — AI-powered real estate platform
          </span>
        </div>

        <div
          ref={topHeaderRef}
          className="flex flex-row items-center justify-center gap-4 sm:gap-8"
        >
          <h2 className="font-['Duck-cry'] uppercase leading-[0.9] tracking-[-0.02em] text-[#111111] transition-all duration-500 text-[2.8rem] sm:text-[5rem] lg:text-[7.5rem]">
            Meet <span className="text-[#B7E78A]">Your</span> New CRM
          </h2>

          <div
            ref={toggleTrackRef}
            className="relative h-8 w-[58px] rounded-full bg-[#22c55e] shadow-inner shadow-black/10 transition-all duration-500 shrink-0"
          >
            <div
              ref={toggleKnobRef}
              className="absolute left-[4px] top-[4px] h-[24px] w-[24px] rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.18)]"
            />
          </div>
        </div>

        <p className="mt-8 font-bold text-gray-500 transition-all duration-500 text-[14px] sm:text-[18px] lg:text-[1.2rem] max-w-[600px] leading-relaxed">
          The Complete Real Estate Workflow. One Platform.
        </p>

        {/* Main container for the searchbar UI - Fixed height to prevent layout shift */}
        <div className="relative w-full flex flex-col items-center mt-10 min-h-[450px] sm:min-h-[580px] lg:min-h-[750px]">
          <div className="w-full flex flex-col items-center transition-all duration-500 max-w-[900px]">

            {/* Simple Search Bar UI - New Inspiration Style */}
            <div ref={searchStageRef} className="flex flex-col items-center w-full mb-8">
              <div className="flex w-full items-center gap-4 rounded-full border border-gray-200 bg-white px-6 py-4 shadow-[0_15px_40px_rgba(0,0,0,0.05)] sm:px-8 sm:py-5">
                <Search className="h-5 w-5 shrink-0 text-gray-300 sm:h-6 sm:w-6" />
                <div className="flex min-h-[30px] flex-1 items-center text-left text-[14px] font-medium text-gray-400 sm:text-[18px] md:text-[20px]">
                  <span ref={typingTextRef} className="min-h-[1.5em]" />
                  <span className="ml-1 inline-block h-[1em] w-[1px] animate-pulse bg-gray-400" />
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111111] text-white">
                  <Mic className="h-5 w-5 sm:h-5 sm:w-5" strokeWidth={2.5} />
                </div>
              </div>
            </div>

            {/* AI Reply Bubble - Pill Style */}
            <div
              ref={replyBubbleRef}
              className="flex items-center gap-3 bg-white border border-gray-100 rounded-full px-6 py-3 mb-6 self-center shadow-lg shadow-black/[0.02]"
            >
              <div className="w-8 h-8 rounded-full bg-[#B7E78A] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white fill-white" />
              </div>
              <p className="text-[14px] sm:text-[16px] font-bold text-gray-800">
                No problem! I've already done that.
              </p>
            </div>

            {/* Action Buttons Pills - Light Style */}
            <div
              ref={actionButtonsRef}
              className="flex flex-wrap gap-3 justify-center py-2 mb-4"
            >
              {["Create Task", "Analyze Meetings", "More"].map(btn => (
                <button key={btn} className="px-6 py-3 rounded-full bg-white border border-gray-100 text-[13px] sm:text-[15px] font-bold text-gray-600 shadow-sm transition-all hover:border-[#B7E78A] hover:text-[#111111]">
                  {btn}
                </button>
              ))}
            </div>

            {/* Dashboard Stage (Image) */}
            <div
              ref={dashboardStageRef}
              className="w-full flex flex-col items-center mt-4"
            >
              <div className="w-full overflow-hidden rounded-[2rem] bg-[#f7f8fb] p-3 shadow-[0_25px_60px_rgba(17,17,17,0.15)] ring-1 ring-black/5">
                <img
                  src={dashboardImage}
                  alt="NuHelixX CRM dashboard"
                  className="w-full mx-auto rounded-[1.8rem] object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>



        <div ref={bottomContentRef} className="mt-12 flex flex-col items-center">
          <span className="text-[11px] font-black tracking-[0.2em] uppercase text-[#60d394] mb-4">PLATFORM</span>
          <h3 className="font-['Duck-cry'] uppercase leading-[0.9] tracking-[-0.02em] text-[#111111] transition-all duration-500 text-[2.5rem] sm:text-[4rem] lg:text-[6.5rem] mb-8">
            The Future of CRM <br className="hidden sm:block" /> is <span className="text-gray-200">Here.</span>
          </h3>

          <div className="flex flex-col gap-4 text-center mb-16">
            <p className="mx-auto text-gray-400 max-w-[600px] text-[15px] sm:text-[17px] leading-relaxed">
              We’ve decoded the DNA of your traditional software stack and re-engineered it into a unified, evolutionary platform.
            </p>
            <p className="mx-auto text-gray-400 max-w-[600px] text-[15px] sm:text-[17px] leading-relaxed">
              Say goodbye to software overload. NuHelixX RE powers your entire real estate workflow from one AI-driven command bar.
            </p>
          </div>

          <div className="grid w-full transition-all duration-500 gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-[1200px]">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-1"
              >
                <div className="flex shrink-0 items-center justify-center rounded-xl bg-gray-50 transition-all duration-500 h-10 w-10 group-hover:bg-[#B7E78A]/10">
                  <div className="scale-110">
                    {feature.icon}
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-800 transition-all duration-500 line-clamp-2">{feature.title}</span>
              </div>
            ))}
          </div>

          <p className="mt-16 font-medium text-gray-400 text-center text-[15px] sm:text-[17px] max-w-[600px]">
            Simply tell the platform what you want to accomplish and <span className="font-bold text-[#111111]">NuHelixX RE</span> intelligently handles the rest.
          </p>
        </div>
      </section>
    </div>
  );
}

export default MeetCRMSection;
