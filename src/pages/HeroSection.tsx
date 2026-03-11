import { ArrowUpRight, ChevronDown, ArrowDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import property_1 from "../assets/property_2.jpg";
import { OurServices } from "./OurServices";

export function Bracket({
  side = "left",
  className = "",
}: {
  side?: "left" | "right";
  className?: string;
}) {
  const transform = side === "right" ? "scaleX(-1)" : undefined;
  return (
    <svg
      viewBox="0 0 100 300"
      className={className}
      style={{ transform }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      aria-hidden
    >
      <path
        d="M18 10 L72 10 L72 40 L48 40 L48 260 L72 260 L72 290 L18 290"
        stroke="#00e676"
        strokeWidth="18"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeroSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);
  const layer1 = useRef<HTMLDivElement | null>(null);
  const layer2 = useRef<HTMLDivElement | null>(null);
  const layer3 = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const costDescRef = useRef<HTMLDivElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  
  // New refs for mobile/tablet
  const mobileCardsContainerRef = useRef<HTMLDivElement | null>(null);
  const mobileHeadlineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 1024;

      // ==================== DESKTOP ANIMATIONS ====================
      if (isDesktop) {
        gsap.set(layer1.current, { x: 0, rotation: 4 });
        gsap.set(layer2.current, { x: 0, rotation: -2 });
        gsap.set(layer3.current, { x: 0, rotation: 2 });
        gsap.set(cardRef.current, { x: 0, y: 0 });
        gsap.set(stackRef.current, { x: 0, scale: 1, y: 0 });

        const cardSpacing = 290;
        const horizontalDistance = window.innerWidth;
        const totalScrollHeight = window.innerHeight * 8;

        const master = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => "+=" + totalScrollHeight,
            scrub: 1,
            pin: true,
          },
        });

        // Headline animation
        if (headlineRef.current) {
          let headlineTween: gsap.core.Tween | null = null;

          ScrollTrigger.create({
            trigger: headlineRef.current,
            start: "top 80%",
            onEnter: () => {
              if (headlineTween) headlineTween.kill();
              headlineTween = gsap.fromTo(
                headlineRef.current,
                { y: 60, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.8,
                  ease: "power2.out",
                  delay: 1.2,
                }
              );
            },
          });
        }

        master.set(stackRef.current, { y: 0 }, 0);

        master.to(
          heroContentRef.current,
          {
            y: -600,
            transitionTimingFunction: "power1.out",
            ease: "power1.out",
          },
          0
        );

        const cardDelay = 0.5;
        master.to(
          stackRef.current,
          { y: 450, scale: 0.9, ease: "power1.out" },
          0
        );

        master.to(
          layer1.current,
          { x: cardSpacing * 1, rotation: 0, left: 0, ease: "power1.out" },
          cardDelay
        );
        master.to(
          layer2.current,
          { x: cardSpacing * 2, rotation: 0, left: 0, ease: "power1.out" },
          cardDelay
        );
        master.to(
          layer3.current,
          { x: cardSpacing * 3, rotation: 0, zIndex: 0, ease: "power1.out" },
          cardDelay
        );

        const costCardVerticalDelay = cardDelay + 1.2;
        master.to(
          cardRef.current,
          { 
            y: 300,
            ease: "power1.out",
            duration: 1
          },
          costCardVerticalDelay
        );

        master.to(
          costDescRef.current,
          {
            x: cardSpacing * 1,
            rotation: 0,
            opacity: 1,
            y: 0,
            ease: "power1.out",
            duration: 1.5,
          },
          costCardVerticalDelay + 0.1
        );

        master.to(
          innerRef.current,
          {
            x: -horizontalDistance,
            ease: "power1.inOut",
          },
          costCardVerticalDelay + 1.5
        );
      } else {
        // ==================== MOBILE & TABLET ====================
        // Clear desktop styles
        gsap.set([layer1.current, layer2.current, layer3.current, cardRef.current, stackRef.current, costDescRef.current], {
          clearProps: "all",
        });

        // Animate headline when it enters viewport
        if (mobileHeadlineRef.current) {
          ScrollTrigger.create({
            trigger: mobileHeadlineRef.current,
            start: "top 80%",
            onEnter: () => {
              gsap.fromTo(
                mobileHeadlineRef.current,
                { y: 50, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.8,
                  ease: "power2.out",
                }
              );
            },
            once: true,
          });
        }

        // Animate each card in sequence
        if (mobileCardsContainerRef.current) {
          const cards = mobileCardsContainerRef.current.querySelectorAll('.mobile-card');
          
          cards.forEach((card, index) => {
            gsap.set(card, { opacity: 0, y: 60 });
            
            ScrollTrigger.create({
              trigger: card,
              start: "top 85%",
              onEnter: () => {
                gsap.to(card, {
                  y: 0,
                  opacity: 1,
                  duration: 0.7,
                  ease: "power2.out",
                  delay: index * 0.1,
                });
              },
              once: true,
            });
          });
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      id="analytics"
      ref={containerRef}
      className="w-full overflow-x-hidden mt-[110vh]"
    >
      <div ref={innerRef} className="flex flex-col lg:flex-row">
        {/* First Screen */}
        <div className="w-full lg:w-screen lg:h-screen flex-shrink-0">
          <div className="min-h-screen bg-[#f5f5f5]">
            {mobileMenuOpen && (
              <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-4">
                <nav className="flex flex-col gap-2">
                  <button className="px-6 py-3 rounded-full text-gray-800 hover:bg-gray-100 transition-colors text-left">
                    About
                  </button>
                  <button className="px-6 py-3 rounded-full text-gray-800 hover:bg-gray-100 transition-colors flex items-center justify-between">
                    Services
                    <ChevronDown size={20} />
                  </button>
                  <button className="px-6 py-3 rounded-full text-gray-800 hover:bg-gray-100 transition-colors text-left">
                    Resources
                  </button>
                  <button className="px-6 py-3 rounded-full text-gray-800 hover:bg-gray-100 transition-colors text-left">
                    Packages
                  </button>
                  <button className="mt-4 px-6 py-3 bg-[#BCBF4F] hover:bg-[#00d066] text-black font-medium rounded-full transition-colors">
                    Book a call
                  </button>
                </nav>
              </div>
            )}

            {/* ==================== DESKTOP CONTENT ==================== */}
            <div ref={heroContentRef} className="hidden lg:block pt-20">
              <main className="px-4 md:px-8 lg:px-16 py-12 md:py-16">
                <div className="max-w-7xl flex justify-center mx-auto">
                  <div className="relative">
                    <div className="flex items-start gap-4 xl:gap-8">
                      <div className="flex-1 leading-[180px]">
                        <h1 className="text-[80px] flex justify-center font-[Duck-cry] xl:text-[200px] font-black tracking-[8px] text-[#1F1F1F] mb-2 xl:mb-4">
                          The DNA of Every
                        </h1>

                        <div className="flex items-start justify-between xl:gap-8">
                          <h2 className="text-[80px] xl:text-[200px] font-[Duck-cry] text-[#1F1F1F] tracking-[8px] font-black">
                            Deal
                          </h2>

                          <div className="relative flex" ref={stackRef}>
                            {/* Layer 1 - AI in our DNA */}
                            <div
                              ref={layer1}
                              className="absolute w-[200px] h-[240px] left-[10px] xl:w-[280px] xl:h-[280px] rounded-[28px] bg-[#B8A3F8] transform rotate-[4deg] shadow-2xl z-0"
                            >
                              <h2 className="absolute inset-0 flex justify-center text-center font-[Duck-cry] tracking-[1px] leading-[1.5] xl:text-[2.5rem] pt-4">
                                AI in our DNA
                              </h2>
                              <p className="absolute font-light bottom-4 left-4 font-[poppins] right-4 text-sm xl:text-base">
                                NuHelixX RE is AI-first — built with
                                intelligence at its core. Automation drives
                                every step: real-time lead scoring, smart
                                follow-ups, and behavior-based property
                                matching. Smarter insights. Stronger
                                connections.
                              </p>
                            </div>

                            {/* Layer 2 - Smart Automation */}
                            <div
                              ref={layer2}
                              className="absolute w-[200px] h-[240px] -left-[13px] xl:w-[280px] xl:h-[280px] rounded-[24px] bg-[#BCBF4F] transform rotate-[-4deg] shadow-lg z-0"
                            >
                              <h2 className="absolute inset-0 flex justify-center text-center font-[Duck-cry] tracking-[1px] leading-[1.5] xl:text-[2.5rem] pt-4">
                                Smart Automation
                              </h2>
                              <p className="absolute font-light bottom-11 left-4 font-[poppins] right-4 text-sm xl:text-base">
                                NuHelixX RE automates the busywork — from
                                tagging leads to scheduling follow-ups. Its AI
                                learns your habits, prioritizes tasks, and keeps
                                your pipeline on track. Less admin. More sales.
                              </p>
                            </div>

                            {/* Layer 3 - Seamless Transactions */}
                            <div
                              ref={layer3}
                              className="absolute w-[200px] h-[240px] xl:w-[280px] xl:h-[280px] rounded-[28px] bg-[#00bfa5] transform z-0"
                            >
                              <h2 className="absolute inset-0 flex justify-center text-center font-[Duck-cry] tracking-[1px] leading-[1.5] xl:text-[2.5rem] pt-4">
                                Seamless Transactions
                              </h2>
                              <p className="absolute bottom-5 left-4 font-[poppins] font-light right-4 text-sm xl:text-base">
                                Manage offers, inspections, and closings in one
                                dashboard. Stay on top of deadlines, documents,
                                and deals — effortlessly. NuHelixX RE gives you
                                clarity, confidence, and a smoother client
                                experience.
                              </p>
                            </div>

                            {/* Cost Card */}
                            <div
                              ref={cardRef}
                              className="w-[200px] h-[200px] xl:w-[280px] xl:h-[280px] rounded-3xl overflow-hidden relative p-1 z-10"
                            >
                              <div className="w-full h-full rounded-3xl overflow-hidden relative">
                                <img
                                  src={property_1}
                                  alt="Cost savings"
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-4 xl:bottom-8 left-4 xl:left-6 text-white">
                                  <div className="text-3xl xl:text-5xl font-bold mb-1">
                                    Cost
                                  </div>
                                  <div className="text-sm xl:text-lg font-medium">
                                    Save-time-and
                                  </div>
                                  <div className="text-sm xl:text-lg font-medium">
                                    money
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Cost Description */}
                            <div
                              ref={costDescRef}
                              className="absolute top-[395px] left-4 w-[200px] xl:w-[800px] bg-[#BCBF4F] shadow-[0_20px_40px_rgba(0,0,0,0.15),0_8px_16px_rgba(0,0,0,0.1)] rounded-2xl p-4 xl:p-8 z-0 opacity-0 text-left"
                            >
                              <p className="font-[poppins] font-light text-xs xl:text-xl leading-relaxed tracking-wide">
                                NuHelixX RE saves both time and money by replacing multiple tools with one platform. Data being entered once and AI handling training, tagging, and follow-ups, agents cut hours of admin work every week — turning wasted time into more revenue and measurable cost savings.
                              </p>
                            </div>
                          </div>

                          <h2 className="text-[80px] xl:text-[200px] font-black text-[#1F1F1F] tracking-[8px] font-[Duck-cry]">
                            in Action
                          </h2>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mt-8 md:mt-12 gap-8">
                      <div className="flex items-center xl:relative xl:-top-[220px] gap-3">
                        <ArrowDown size={20} className="text-gray-800 md:w-6 md:h-6" />
                        <span className="text-base font-[600] md:text-lg text-gray-800">
                          Scroll for more
                        </span>
                      </div>
                      <div className="max-w-md xl:relative xl:-top-[120px]">
                        <p className="text-lg font-[600] md:text-xl text-gray-800 mb-6 md:mb-8 leading-relaxed">
                          NuHelixX RE unifies the entire real estate journey on
                          one platform—giving brokerages full visibility,
                          reducing agent admin work, and delivering clients a
                          seamless, transparent experience from first meeting to
                          final signature.
                        </p>

                        <div className="flex items-center gap-3">
                          <button className="px-6 md:px-8 py-3 md:py-4 bg-[#BCBF4F] hover:bg-[#bbbf4fc8] text-black font-medium rounded-full transition-colors text-sm md:text-base">
                            Get started
                          </button>
                          <button className="w-12 h-12 md:w-14 md:h-14 bg-[#BCBF4F] hover:bg-[#bbbf4fc8] rounded-full flex items-center justify-center transition-colors">
                            <ArrowUpRight size={20} className="text-black md:w-6 md:h-6" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Headline */}
                <div ref={headlineRef} className="transform-gpu opacity-[0] -mt-14">
                  <p>
                    <span className="text-[60px] sm:text-[80px] md:text-[100px] lg:text-[120px] font-[Duck-cry] leading-none font-[600]">
                      One <br />
                      Subscription <br />
                      <div className="flex gap-2 sm:gap-4 items-center leading-none">
                        <p>All</p>
                        <img
                          src="https://43675023.fs1.hubspotusercontent-na1.net/hubfs/43675023/raw_assets/public/ZipcioTheme/img/rocket.svg"
                          alt="Rocket"
                          className="h-[30px] sm:h-[40px] md:h-[50px] lg:h-[60px]"
                        />
                        
                      </div>
                      Features
                    </span>
                  </p>
                </div>
              </main>
            </div>

            {/* ==================== MOBILE & TABLET CONTENT ==================== */}
            <div className="lg:hidden pt-20">
              <div className="px-4 sm:px-6 md:px-8 py-8 md:py-12">
                {/* Main Headline */}
                <div className="mb-8 md:mb-12">
                  <h1 className="text-[36px] sm:text-[48px] md:text-[64px] font-[Duck-cry] font-black leading-tight tracking-tight text-[#1F1F1F] text-center">
                    The DNA of Every<br />Deal in Action
                  </h1>
                </div>

                {/* Introduction Text */}
                <div className="max-w-2xl mx-auto mb-8 md:mb-12">
                  <p className="text-base sm:text-lg md:text-xl text-gray-800 font-[600] leading-relaxed text-center mb-6 md:mb-8">
                    NuHelixX RE unifies the entire real estate journey on
                    one platform—giving brokerages full visibility,
                    reducing agent admin work, and delivering clients a
                    seamless, transparent experience from first meeting to
                    final signature.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-[#BCBF4F] hover:bg-[#bbbf4fc8] text-black font-medium rounded-full transition-colors text-sm md:text-base">
                      Get started
                    </button>
                    <button className="w-12 h-12 md:w-14 md:h-14 bg-[#BCBF4F] hover:bg-[#bbbf4fc8] rounded-full flex items-center justify-center transition-colors">
                      <ArrowUpRight size={20} className="text-black md:w-6 md:h-6" />
                    </button>
                  </div>
                </div>

                {/* Scroll Indicator */}
                <div className="flex items-center justify-center gap-3 mb-12 md:mb-16">
                  <ArrowDown size={20} className="text-gray-800" />
                  <span className="text-base font-[600] text-gray-800">
                    Scroll for more
                  </span>
                </div>
              </div>

              {/* Phase 1: One Subscription Headline */}
              <div className="px-4 sm:px-6 md:px-8 py-12 md:py-16">
                <div ref={mobileHeadlineRef} className="mb-12 md:mb-20">
                  <h2 className="text-[40px] sm:text-[56px] md:text-[72px] font-[Duck-cry] font-[600] leading-tight text-[#1F1F1F] text-center">
                    One<br />
                    Subscription<br />
                    <span className="flex items-center justify-center gap-2 md:gap-4">
                      All
                      <img
                        src="https://43675023.fs1.hubspotusercontent-na1.net/hubfs/43675023/raw_assets/public/ZipcioTheme/img/rocket.svg"
                        alt="Rocket"
                        className="h-[32px] sm:h-[40px] md:h-[52px]"
                      />
                    </span>
                    Features
                  </h2>
                </div>

                {/* Phase 2: Cards in Column */}
                <div ref={mobileCardsContainerRef} className="max-w-md md:max-w-none mx-auto md:mx-0 space-y-10 md:space-y-12 pb-12 md:pb-16">
                  {/* Card 1 - AI in our DNA */}
                  <div className="mobile-card w-full min-h-[320px] sm:min-h-[360px] md:min-h-[450px] rounded-[28px] bg-[#B8A3F8] shadow-xl p-8 sm:p-10 md:p-14">
                    <h3 className="text-3xl sm:text-4xl md:text-7xl font-[Duck-cry] tracking-wide mb-6 text-center">
                      AI in our DNA
                    </h3>
                    <p className="font-[poppins] font-light text-base sm:text-lg md:text-3xl md:leading-tight leading-normal mt-8 md:mt-12">
                      NuHelixX RE is AI-first — built with intelligence at its core. Automation drives every step: real-time lead scoring, smart follow-ups, and behavior-based property matching. Smarter insights. Stronger connections.
                    </p>
                  </div>

                  {/* Card 2 - Smart Automation */}
                  <div className="mobile-card w-full min-h-[320px] sm:min-h-[360px] md:min-h-[450px] rounded-[28px] bg-[#BCBF4F] shadow-xl p-8 sm:p-10 md:p-14">
                    <h3 className="text-3xl sm:text-4xl md:text-7xl font-[Duck-cry] tracking-wide mb-6 text-center">
                      Smart Automation
                    </h3>
                    <p className="font-[poppins] font-light text-base sm:text-lg md:text-3xl md:leading-tight leading-normal mt-8 md:mt-12">
                      NuHelixX RE automates the busywork — from tagging leads to scheduling follow-ups. Its AI learns your habits, prioritizes tasks, and keeps your pipeline on track. Less admin. More sales.
                    </p>
                  </div>

                  {/* Card 3 - Seamless Transactions */}
                  <div className="mobile-card w-full min-h-[320px] sm:min-h-[360px] md:min-h-[450px] rounded-[28px] bg-[#00bfa5] shadow-xl p-8 sm:p-10 md:p-14">
                    <h3 className="text-3xl sm:text-4xl md:text-7xl font-[Duck-cry] tracking-wide mb-6 text-center">
                      Seamless Transactions
                    </h3>
                    <p className="font-[poppins] font-light text-base sm:text-lg md:text-3xl md:leading-tight leading-normal mt-8 md:mt-12">
                      Manage offers, inspections, and closings in one dashboard. Stay on top of deadlines, documents, and deals — effortlessly. NuHelixX RE gives you clarity, confidence, and a smoother client experience.
                    </p>
                  </div>

                  {/* Card 4 - Cost (with image) */}
                  <div className="mobile-card w-full h-[320px] sm:h-[360px] md:h-[450px] rounded-[28px] overflow-hidden shadow-xl">
                    <div className="w-full h-full relative">
                      <img
                        src={property_1}
                        alt="Cost savings"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-6 left-6 text-white">
                        <div className="text-4xl sm:text-5xl md:text-7xl font-bold mb-1">
                          Cost
                        </div>
                        <div className="text-base sm:text-lg md:text-2xl font-medium">
                          Save-time-and
                        </div>
                        <div className="text-base sm:text-lg md:text-2xl font-medium">
                          money
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cost Description */}
                  <div className="mobile-card w-full bg-[#BCBF4F] shadow-xl rounded-[28px] p-8 sm:p-10 md:p-14">
                    <p className="font-[poppins] font-light text-base sm:text-lg md:text-3xl leading-tight">
                      NuHelixX RE saves both time and money by replacing multiple tools with one platform. Data being entered once and AI handling training, tagging, and follow-ups, agents cut hours of admin work every week — turning wasted time into more revenue and measurable cost savings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Screen - OurServices (visible on all devices) */}
        <section className="w-full lg:w-screen bg-[#F5F5F5] min-h-screen flex flex-col flex-shrink-0">
          <OurServices />
        </section>
      </div>
    </main>
  );
}

export default HeroSection;
