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
  { id: "01", number: "/01", title: "CRM CONSULTANT", description: "Great for businesses needing optimal guidance.", img: property_1, section: "brokerage" },
  { id: "02", number: "/02", title: "CRM OPTIMIZER", description: "Ideal for companies that require continuous project support.", img: property_2, section: "agent" },
  { id: "03", number: "/03", title: "CRM LEADER", description: "Ideal for companies requiring ownership of HubSpot CRM.", img: property_3, section: "client" },
  { id: "04", number: "/04", title: "Bespoke Marketing", description: "Ideal for companies requiring ownership of HubSpot CRM.", img: property_1, section: null },
];

function ServiceItem({
  service,
  openSection,
  onToggle,
}: {
  service: Service;
  openSection: string | null;
  onToggle: (section: string | null) => void;
}) {
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

  const isOpen = service.section !== null && openSection === service.section;

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
    onToggle(isOpen ? null : service.section);
  };

  return (
    <div>
      {/* CRM row */}
      <div ref={containerRef} className="relative border-t h-[200px] max-h-[280px] last:border-b overflow-hidden py-14 px-4">
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

      {/* Section seedha CRM row ke neeche open hoga — open prop pass ho raha hai */}
      {service.section === "brokerage" && <BrokerageExperience open={isOpen} />}
      {service.section === "agent" && <AgentExperience open={isOpen} />}
      {service.section === "client" && <ClientExperience open={isOpen} />}
    </div>
  );
}

export function OurServices() {
  const [openSection, setOpenSection] = useState<string | null>(null);

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

        <div className="space-y-2 mt-52 flex flex-col justify-center">
          {services.map((s) => (
            <ServiceItem
              key={s.id}
              service={s}
              openSection={openSection}
              onToggle={(section) => setOpenSection(section)}
            />
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


// BrokerageExperience 
import { ChevronRight } from 'lucide-react';
import propert_1 from "../assets/property-1.png";
import propert_2 from "../assets/property-2.png";
import propert_3 from "../assets/property-3.png";
import property_4 from "../assets/property-4.png";
import property_5 from "../assets/property-5.png";

// CHANGE: open prop add kiya — baaki sab SAME hai
const BrokerageExperience = ({ open = false }: { open?: boolean }) => {
  const TestimonialDiv = [
    {
      name: "Performance",
      company: "Visibility",
      logo: propert_1,
      testimonial: "NuHelixX RE gives brokers a unified view of production, pipeline activity, compliance status, and agent performance across the entire organization. Leadership gains clarity without needing additional staff or manual reporting.",
    },
    {
      name: "AI Oversight",
      company: "Security",
      logo: propert_2,
      testimonial: "AI identifies risk, stalled deals, and performance gaps early—helping brokers take proactive action instead of reacting too late.",
    },
    {
      name: "Scalable Structure",
      company: "Costs",
      logo: propert_3,
      testimonial: "\u201cSupport single offices, multi-office brokerages, teams, and hybrid org structures with controlled permissions and clear contact ownership rules.\u201d",
    },
    {
      name: "Operational Efficiency",
      company: "Costs",
      logo: property_4,
      testimonial: "\u201cBecause NuHelixX RE automates administrative tasks, compliance reminders, pipeline updates, and data entry, brokerages reduce overhead while improving output.\u201d",
    },
    {
      name: "One Platform for Growth",
      company: "Costs",
      logo: property_5,
      testimonial: "\u201cWhether managing 5 agents or 500, NuHelixX RE scales seamlessly and eliminates the need to invest in additional tools, assistants, or manual oversight systems.\u201d",
    },
  ];

  return (
    <section className="min-h-[100vh] flex flex-col gap-16 md:gap-20 lg:gap-32 mt-12 px-4 md:px-8 lg:px-16">
      <div className="text-center mt-8 md:mt-12 lg:mt-16">
        {/* CHANGE: button hata diya — heading sirf display ke liye */}
        <div className="flex items-center justify-center gap-4 mx-auto">
          <h1 className="font-[Duck-cry] leading-none text-[48px] sm:text-[60px] md:text-[80px] lg:text-[120px]">
            BROKERAGE <br />
            EXPERIENCE
          </h1>
          <ChevronRight
            className={`h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
          />
        </div>
      </div>

      {/* SAME accordion logic — bas open prop se chalta hai */}
      <div
        className={`grid justify-items-start transition-all duration-500 ease-in-out ${
          open ? 'grid-rows-[1fr] opacity-100 mt-0' : 'grid-rows-[0fr] opacity-0 mt-0'
        }`}
      >
        <div className="overflow-hidden w-full">
          <div className="flex flex-col gap-8 md:gap-12">
            {TestimonialDiv.map((item, index) => (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-3 font-[poppins] mt-6 md:mt-8 lg:mt-12 border-t pt-6 md:pt-8 gap-4 lg:gap-6 items-center">
                <div className="font-[500] text-sm md:text-base lg:text-lg text-center order-1">
                  <div className="text-lg md:text-xl lg:text-2xl font-semibold">{item.name}</div>
                  <div className="text-gray-500 text-sm md:text-base">{item.company}</div>
                </div>
                <div className="flex justify-center items-center order-2">
                  <div className="h-[150px] md:h-[200px] lg:h-[200px] w-[160px] md:w-[200px] lg:w-[220px] relative rounded-2xl overflow-hidden">
                    <img src={item.logo} alt={item.name} className="w-full h-full object-cover rounded-2xl" />
                  </div>
                </div>
                <div className="font-[500] text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed text-center order-3 lg:col-span-1 lg:text-left">
                  {item.testimonial}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrokerageExperience;

// AgentExperience
import { Bot, Workflow, Shield, User, Users, ChevronRight } from 'lucide-react';

// CHANGE: open prop add kiya — baaki sab SAME hai
function AgentExperience({ open = false }: { open?: boolean }) {
  const features = [
    { id: 1, title: 'Smart Automation', description: 'AI takes care of repetitive tasks like tagging leads, sending reminders, drafting messages, summarizing calls, and managing follow-ups. Agents cut down on busy work and spend more time with clients, knowing the system is always running in the background to support them.', icon: Bot },
    { id: 2, title: 'Seamless Workflow', description: 'Every stage of the process—from lead capture to contract signing—lives in one platform. Agents avoid juggling multiple tools and enjoy a streamlined workflow that makes closing deals faster and easier.', icon: Workflow },
    { id: 3, title: 'Client Confidence', description: 'Clients stay connected with instant alerts, property updates, and secure messaging. Agents build stronger relationships and trust by delivering a smoother, more transparent experience from the first call to the final signature.', icon: Shield },
    { id: 4, title: 'Independent Agent Support', description: 'Solo agents gain the full power of a team without hiring staff. NuHelixX RE automates follow-up, notes, marketing, pipeline updates, and transaction tracking so independent agents can operate at scale with minimal administrative load.', icon: User },
    { id: 5, title: 'Agent\u2013Broker Efficiency', description: 'Agent\u2013brokers can manage both production and leadership effortlessly. NuHelixX RE provides pipeline visibility, routing controls, and compliance tracking\u2014reducing the need for assistants while improving operational accuracy.', icon: Users },
  ];

  return (
    <div className="min-h-screen mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* CHANGE: button hata diya — heading sirf display ke liye */}
        <div className="text-center mt-[40px] lg:mt-[70px]">
          <div className="flex items-center justify-center gap-4 mx-auto">
            <h1 className="font-[Duck-cry] leading-none text-[60px] sm:text-[80px] lg:text-[120px]">
              AGENT <br />
              EXPERIENCE
            </h1>
            <ChevronRight
              className={`h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
            />
          </div>
        </div>

        {/* SAME accordion logic — bas open prop se chalta hai */}
        <div className={`grid justify-items-start transition-all duration-500 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100 mt-14' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 mt-[200px]">
              {features.slice(0, 3).map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.id} className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden font-[poppins]">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center mb-6">
                      <div className="w-20 h-20 bg-rose-100 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 text-rose-600 font-black text-2xl">X</div>
                    </div>
                    <h3 className="relative text-xl font-bold text-slate-900 mb-4 text-center">{feature.title}</h3>
                    <p className="relative text-slate-600 leading-relaxed text-sm">{feature.description}</p>
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.slice(3).map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.id} className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden font-[poppins]">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center mb-6">
                      <div className="w-20 h-20 bg-rose-100 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 text-rose-600 font-black text-2xl">X</div>
                    </div>
                    <h3 className="relative text-xl font-bold text-slate-900 mb-4 text-center">{feature.title}</h3>
                    <p className="relative text-slate-600 leading-relaxed text-base">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentExperience;

// client ClientExperience

import { Search, TrendingUp, Users, ChevronRight } from 'lucide-react';

// CHANGE: open prop add kiya — baaki sab SAME hai
const ClientExperience = ({ open = false }: { open?: boolean }) => {
  const experiences = [
    { title: 'For Buyers', icon: Search, description: 'Stay ahead of the market with instant alerts the moment a new property matches your search. Save and organize favorites, add personal notes to each listing, and communicate directly with your agent through built-in messaging. NuHelixX RE makes it simple to track every option, compare properties, and move quickly when the right home appears.', gradient: 'from-[#f5f5dc] to-[#f5f5dc]', iconBg: 'bg-yellow-100/40', iconColor: 'text-yellow-800', accentColor: 'bg-yellow-700' },
    { title: 'For Sellers', icon: TrendingUp, description: 'Gain real-time visibility into how your property is performing on the market. Track views, inquiries, and engagement patterns. With NuHelixX RE, you always know the level of activity around your listing\u2014helping you and your agent make smarter pricing and marketing decisions.', gradient: 'from-[#f5f5dc] to-[#f5f5dc]', iconBg: 'bg-yellow-100/40', iconColor: 'text-yellow-800', accentColor: 'bg-yellow-700' },
    { title: 'For Both', icon: Users, description: 'Whether buying or selling, NuHelixX RE keeps everything simple and connected. Request showings or meetings with one click, exchange documents securely, and stay updated at every stage. From first conversation to closing day, the entire experience is faster, clearer, and stress-free.', gradient: 'from-[#f5f5dc] to-[#f5f5dc]', iconBg: 'bg-yellow-100/40', iconColor: 'text-yellow-800', accentColor: 'bg-yellow-700' },
  ];

  return (
    <section className="mt-16">
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-center mt-[40px] lg:mt-[70px]">
            {/* CHANGE: button hata diya — heading sirf display ke liye */}
            <div className="flex items-center justify-center gap-4 mx-auto">
              <h1 className="font-[Duck-cry] leading-none text-[60px] sm:text-[80px] lg:text-[120px]">
                CLIENT <br />
                EXPERIENCE
              </h1>
              <ChevronRight
                className={`h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
              />
            </div>
          </div>
        </div>

        {/* SAME accordion logic — bas open prop se chalta hai */}
        <div className={`grid justify-items-start transition-all duration-500 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100 mt-14' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
          <div className="overflow-hidden w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-[200px]">
              {experiences.map((experience, index) => {
                const Icon = experience.icon;
                return (
                  <div key={index} className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden font-[poppins]">
                    <div className={`absolute inset-0 bg-gradient-to-br ${experience.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    <div className="relative z-10">
                      <div className={`${experience.accentColor} w-1 h-16 rounded-full mb-6 transform group-hover:h-20 transition-all duration-500`}></div>
                      <div className={`${experience.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        <Icon className={`${experience.iconColor} w-8 h-8`} />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">{experience.title}</h3>
                      <p className="text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">{experience.description}</p>
                      <div className="mt-6 flex items-center text-sm font-semibold text-gray-400 group-hover:text-gray-700 transition-colors">
                        <span>Learn more</span>
                        <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientExperience;