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
  { id: "03", number: "/03", title: "Client Experience", description: "Ideal for companies requiring ownership of HubSpot CRM.", img: property_3, section: "client" },
  // { id: "04", number: "/04", title: "Bespoke Marketing", description: "Ideal for companies requiring ownership of HubSpot CRM.", img: property_1, section: null },
];

function ServiceItem({ service }: { service: Service }) {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const placeholderRef = useRef<HTMLDivElement | null>(null);
  const leftBracketRef = useRef<HTMLDivElement | null>(null);
  const rightBracketRef = useRef<HTMLDivElement | null>(null);
  const descRef = useRef<HTMLDivElement | null>(null);
  const exploreRef = useRef<HTMLButtonElement | null>(null);
  const CrmRef = useRef<HTMLDivElement | null>(null);
  const currentTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const isAnimatingRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia?.("(min-width: 1024px)");
      if (mq && !mq.matches) return;
    }
    const el = containerRef.current;
    const title = titleRef.current;
    const icon = iconRef.current;
    const leftB = leftBracketRef.current;
    const rightB = rightBracketRef.current;
    const desc = descRef.current;
    const explore = exploreRef.current;
    const placeholder = placeholderRef.current;
    if (!el || !title || !icon || !leftB || !rightB || !desc || !explore || !placeholder) return;

    gsap.set([leftB, rightB, desc, explore], { opacity: 0, y: 10 });
    gsap.set(placeholder, { width: 0, display: "inline-block" });
    gsap.set(icon, { opacity: 0, y: 10, scale: 0.8, display: "none", zIndex: 20 });
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
      gsap.set(icon, { display: "flex" });
      const measured = icon.getBoundingClientRect?.().width || 140;
      tl.to(placeholder, { width: measured, duration: 0.45, ease: "power2.out" }, 0);
      tl.to(icon, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.1)" }, 0.05);
      tl.to(title, { opacity: 0.9, duration: 0.35, ease: "power2.out" }, 0.15);
      tl.to(desc, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.25);
      tl.to(explore, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.2)" }, 0.32);
      gsap.set(el, { height: "auto" });
      const autoHeight = el.offsetHeight;
      gsap.set(el, { height: "200px" });
      tl.to(el, { height: autoHeight, duration: 0.45, ease: "power2.out" }, 0);
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
          try { gsap.set(icon, { display: "none" }); } catch (e) {}
          currentTimelineRef.current = null;
          isAnimatingRef.current = false;
        },
      });
      currentTimelineRef.current = tl;
      tl.to([leftB, rightB, desc, explore], { opacity: 0, y: 10, duration: 0.35, ease: "power2.in" }, 0);
      tl.to(icon, { opacity: 0, y: 10, duration: 0.35, ease: "power2.in" }, 0);
      tl.to(placeholder, { width: 0, duration: 0.35, ease: "power2.in" }, 0.05);
      tl.to(title, { opacity: 1, duration: 0.35, ease: "power2.out" }, 0);
      tl.to(el, { height: "200px", duration: 0.35, ease: "power2.in" }, 0.3);
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
      <div ref={containerRef} onClick={handleContainerClick} className={`relative border-t h-[200px] max-h-[280px] last:border-b overflow-hidden py-14 px-4 ${service.section ? 'cursor-pointer hover:bg-gray-50/50 transition-colors' : ''}`}>
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
        <div className="hidden lg:flex items-center justify-between">
          <span className="font-poppins text-sm font-medium text-gray-800 w-12">{service.number}</span>
          <div className="flex-1 flex items-center justify-center relative min-h-[140px] px-4">
            <div ref={leftBracketRef} className="absolute left-8 top-1/2 -translate-y-1/2 text-[160px] font-black text-purple-200 pointer-events-none" />
            <div ref={rightBracketRef} className="absolute right-8 top-1/2 -translate-y-1/2 text-[160px] font-black text-purple-200 pointer-events-none" />
            <div ref={titleRef} className="text-center w-full z-10">
              <div ref={CrmRef} className="flex items-center justify-center gap-4 -top-14 relative">
                <span className="text-[120px] lg:text-[120px]">{leftWord}</span>
                <div ref={placeholderRef} className="inline-block h-[100px] relative" aria-hidden>
                  <div ref={iconRef} className="w-[100px] h-[100px] rounded-xl overflow-hidden bg-transparent shadow-lg flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    {service.img && <img src={service.img} alt={service.title} className="w-full h-full object-cover" />}
                  </div>
                  {service.img && <img src={service.img} alt={service.title} className="hidden md:block lg:hidden w-[100px] h-[100px] rounded-xl overflow-hidden object-cover shadow-lg" />}
                </div>
                <span className="text-[120px] lg:text-[120px]">{rightWords}</span>
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

        <div className="hidden lg:block mt-6 text-center px-4 font-poppins">
          <div ref={descRef} />
          <div className="mt-4"><button ref={exploreRef}></button></div>
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