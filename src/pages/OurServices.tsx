import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import UnsureServicesSuit from "./UnsureServicesSuit";
import ClientExperience from "./ClientExperience";
import AnalyticsGrowth from "./AnalyticsGrowth";
import FAQSection from "./Faqs";
import Contact from "./Contact";
import Footer from "./Footer";
import property_1 from "../assets/property_1.jpg";
import property_2 from "../assets/property_2.jpg";
import property_3 from "../assets/property_3.jpg";
import logo from "../assets/image.png";
import AgentExperience from "./AgentExperience";
import TechnologyInnovation from "./TechnologyInnovation";
import FeatureBuilt from "./FeatureBuilt";
import BrokerageExperience from "./BrokerageExperience";

type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  img?: string;
  section: "brokerage" | "agent" | "client" | null;
};

const services: Service[] = [
  { id: "01", number: "/01", title: "Brokerage Experience", description: "Great for businesses needing optimal guidance.", img: property_1, section: "brokerage" },
  { id: "02", number: "/02", title: "Agent Experience", description: "Ideal for companies that require continuous project support.", img: property_2, section: "agent" },
  { id: "03", number: "/03", title: "Customer Experience", description: "Ideal for companies requiring ownership of HubSpot CRM.", img: property_3, section: "client" },
  // { id: "04", number: "/04", title: "Bespoke Marketing", description: "Ideal for companies requiring ownership of HubSpot CRM.", img: property_1, section: null },
];

function ServiceItem({ service }: { service: Service }) {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const leftBracketRef = useRef<HTMLDivElement | null>(null);
  const rightBracketRef = useRef<HTMLDivElement | null>(null);
  const xSlotRef = useRef<HTMLSpanElement | null>(null);
  const xTextRef = useRef<HTMLSpanElement | null>(null);
  const xLogoRef = useRef<HTMLImageElement | null>(null);
  const currentTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const isAnimatingRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia?.("(min-width: 1024px)");
      if (mq && !mq.matches) return;
    }
    const el = containerRef.current;
    const title = titleRef.current;
    const leftB = leftBracketRef.current;
    const rightB = rightBracketRef.current;
    const xSlot = xSlotRef.current;
    const xText = xTextRef.current;
    const xLogo = xLogoRef.current;
    if (!el || !title || !leftB || !rightB || !xSlot || !xText || !xLogo) return;

    gsap.set([leftB, rightB], { opacity: 0, y: 10 });
    gsap.set(xSlot, { width: 48 });
    gsap.set(xLogo, { opacity: 0, scale: 0.8 });
    gsap.set(xText, { opacity: 1 });
    gsap.set(el, { height: "200px", overflow: "hidden" });

    const killCurrent = () => {
      if (currentTimelineRef.current) {
        try { currentTimelineRef.current.kill(); } catch (e) {}
        currentTimelineRef.current = null;
      }
    };

    const onEnter = () => {
      killCurrent();
      isAnimatingRef.current = true;
      const tl = gsap.timeline();
      currentTimelineRef.current = tl;
      tl.to([leftB, rightB], { x: 0, opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0);
      tl.to(title, { opacity: 0.9, duration: 0.35, ease: "power2.out" }, 0.15);
      tl.to(xSlot, { width: 90, duration: 0.3, ease: "power2.out" }, 0.02);
      tl.to(xText, { opacity: 0, duration: 0.2, ease: "power2.out" }, 0.05);
      tl.to(xLogo, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.2)" }, 0.08);
      tl.eventCallback("onComplete", () => {
        currentTimelineRef.current = null;
        isAnimatingRef.current = false;
      });
    };

    const onLeave = () => {
      killCurrent();
      isAnimatingRef.current = true;
      const tl = gsap.timeline({
        onComplete: () => {
          currentTimelineRef.current = null;
          isAnimatingRef.current = false;
        },
      });
      currentTimelineRef.current = tl;
      tl.to([leftB, rightB], { opacity: 0, y: 10, duration: 0.35, ease: "power2.in" }, 0);
      tl.to(xSlot, { width: 48, duration: 0.25, ease: "power2.in" }, 0);
      tl.to(xLogo, { opacity: 0, scale: 0.8, duration: 0.2, ease: "power2.in" }, 0);
      tl.to(xText, { opacity: 1, duration: 0.2, ease: "power2.out" }, 0.1);
      tl.to(title, { opacity: 1, duration: 0.35, ease: "power2.out" }, 0);
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      killCurrent();
    };
  }, []);

  const [leftWord, ...rest] = service.title.split(" ");
  const rightWords = rest.join(" ");
  const experiencePrefix = "E";
  const experienceSuffix = "perience";

  const handleSeeMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (service.section === null) return;
    setIsOpen(prev => !prev);
  };

  const handleContainerClick = () => {
    if (service.section === null) return;
    setIsOpen(prev => !prev);
  };

  return (
    <div>
      {/* CRM row */}
      <div ref={containerRef} onClick={handleContainerClick} className={`relative border-t h-[200px] max-h-[280px] last:border-b overflow-hidden py-14 px-4 ${service.section ? "cursor-pointer transition-colors" : ""}`}>
        {/* Mobile */}
        <div className="flex lg:hidden items-center gap-3 md:gap-4 bg-white/5 p-3 md:p-4 rounded-lg">
          <div className="w-20 md:w-28 flex-shrink-0">
            {service.img && <img src={service.img} alt={service.title} className="w-20 h-16 md:w-28 md:h-20 object-cover rounded-md shadow-sm" />}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs md:text-sm text-gray-500 font-medium">{service.number}</div>
                <div className="mt-1 font-poppins font-semibold text-lg md:text-2xl leading-tight">
                  <span className="block">{leftWord} <span className="inline-block ml-1 md:ml-2">{rightWords}</span></span>
                </div>
              </div>
              {service.section && (
                <button onClick={handleSeeMore} className="text-xs md:text-sm text-gray-400 hover:text-gray-700 transition-colors">
                  {isOpen ? "/ See less" : "/ See more"}
                </button>
              )}
            </div>
            <p className="mt-2 md:mt-3 text-xs md:text-sm text-gray-600 font-poppins">{service.description}</p>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid lg:grid-cols-[96px_minmax(0,1fr)_96px] items-center relative">
          <span className="font-poppins text-sm font-medium text-gray-800 w-24 text-left">{service.number}</span>
          <div className="relative min-h-[140px] px-4">
            <div ref={leftBracketRef} className="absolute left-8 top-1/2 -translate-y-1/2 text-[160px] font-black text-purple-200 pointer-events-none" />
            <div ref={rightBracketRef} className="absolute right-8 top-1/2 -translate-y-1/2 text-[160px] font-black text-purple-200 pointer-events-none" />
            <div ref={titleRef} className="absolute inset-0 z-10 flex items-center justify-center text-center">
              <div className="flex items-center justify-center gap-2 -top-14 relative normal-case">
                <span className="text-[120px] lg:text-[120px]">{leftWord}</span>
                <span className="text-[120px] lg:text-[120px] inline-flex items-center">
                  <span>{experiencePrefix}</span>
                  <span ref={xSlotRef} className="relative inline-flex h-[138px] w-[36px] items-center justify-center overflow-visible">
                    <span ref={xTextRef} className="absolute inset-0 flex items-center justify-center">
                      x
                    </span>
                    <img
                      ref={xLogoRef}
                      src={logo}
                      alt="NuHelixX logo mark"
                      className="absolute inset-0 h-[138px] w-full object-contain translate-y-[10px]"
                    />
                  </span>
                  <span>{experienceSuffix}</span>
                </span>
              </div>
            </div>
          </div>
          {service.section ? (
            <button onClick={handleSeeMore} className="font-poppins text-sm font-medium text-gray-800 w-24 text-right hover:text-black transition-colors">
              {isOpen ? "/ See less" : "/ See more"}
            </button>
          ) : (
            <span className="font-poppins text-sm font-medium text-gray-800 w-24 text-right">/ See more</span>
          )}
        </div>
      </div>

      {/* Content seedha neeche open hoga */}
      {service.section === "brokerage" && <BrokerageExperience open={isOpen} />}
      {service.section === "agent" && <AgentExperience open={isOpen} />}
      {service.section === "client" && <ClientExperience open={isOpen} />}
    </div>
  );
}

export function OurServices() {
  return (
    <section className="pt-2 lg:pt-10 font-[Duck-cry]">
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="font-poppins flex flex-col lg:flex-row justify-between w-full lg:w-[80%] gap-4 lg:gap-0 mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-poppins">/ Our Services</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>
          <h2 className="experts-h2 font-poppins text-lg lg:text-[1.2rem]" data-testid="services-title">
            We are experts in revenue operations.
          </h2>
        </div>

        <UnsureServicesSuit />

        <div className=" mt-52 flex flex-col justify-center">
          {services.map((s) => (
            <ServiceItem key={s.id} service={s} />
          ))}
        </div>

        <AnalyticsGrowth />
        <TechnologyInnovation />
        <FeatureBuilt />
        <FAQSection />
        <Contact />
        <Footer />
      </div>
    </section>
  );
}
