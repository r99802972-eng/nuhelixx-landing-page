import {
  BarChart3,
  TrendingUp,
  FileText,
  Zap,
  Brain,
  Scale,
  Workflow,
} from 'lucide-react';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StatCard = ({ number, suffix, label, delay = 0 }: { number: number | string; suffix: string; label: string; delay?: number }) => {
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = countRef.current;
    if (!el) return;

    const targetValue = typeof number === 'string' ? parseInt(number.replace(/\D/g, '')) : number;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: targetValue,
            duration: 2,
            snap: { innerText: 1 },
            ease: 'power2.out',
            delay,
          }
        );
      },
    });
  }, [number, delay]);

  return (
    <div className="relative group bg-white/40 backdrop-blur-md border border-white/20 rounded-[2rem] p-8 md:p-12 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:shadow-[0_20px_50px_rgba(107,124,79,0.15)] transition-all duration-500 hover:-translate-y-2 overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <TrendingUp size={120} className="text-[#6b7c4f]" />
      </div>
      <div className="relative z-10 text-center">
        <div className="flex items-center justify-center font-[Duck-cry] text-5xl md:text-7xl font-bold text-[#1F1F1F] mb-4">
          <div ref={countRef}>0</div>
          <span>{suffix}</span>
        </div>
        <p className="font-[poppins] text-gray-600 text-lg md:text-xl font-medium tracking-tight">
          {label}
        </p>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#6b7c4f]/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
    </div>
  );
};

const AnalyticsGrowth = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: BarChart3,
      title: 'Real-Time Analytics',
      description: 'Track lead sources, client engagement, and property views as they happen',
    },
    {
      icon: TrendingUp,
      title: 'Market Trends',
      description: 'Spot trends by school districts, neighborhoods, and price ranges to stay competitive',
    },
    {
      icon: FileText,
      title: 'Smart Reports',
      description: 'Share polished, PDF-ready reports with clients to build trust and showcase results',
    },
    {
      icon: Zap,
      title: 'Performance Dashboard',
      description: 'Monitor agent performance with dashboards for leads, offers, and closings',
    },
    {
      icon: Brain,
      title: 'AI Pipeline Insights',
      description: 'Forecast sales with AI-driven pipeline insights to predict outcomes',
    },
    {
      icon: Scale,
      title: 'Property Comparison',
      description: 'Compare property performance side by side to guide pricing and marketing strategies',
    },
    {
      icon: Workflow,
      title: 'Deal Acceleration',
      description: 'Gain visibility into bottlenecks so deals move faster and smoother',
    },
  ];

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const tl = gsap.to(marquee, {
      xPercent: -50,
      duration: 30,
      ease: 'none',
      repeat: -1,
    });

    const handleMouseEnter = () => gsap.to(tl, { timeScale: 0.1, duration: 0.6 });
    const handleMouseLeave = () => gsap.to(tl, { timeScale: 1, duration: 0.6 });

    marquee.parentElement?.addEventListener('mouseenter', handleMouseEnter);
    marquee.parentElement?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      tl.kill();
      marquee.parentElement?.removeEventListener('mouseenter', handleMouseEnter);
      marquee.parentElement?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="relative py-32 bg-[#f5f5f5] overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#6b7c4f]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[0%] left-[-10%] w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-24">
          <div className="font-[Duck-cry] mt-[150px]">
            <h1 className="text-6xl md:text-[5.5rem] font-[Duck-cry] text-[#1F1F1F] mb-8 leading-[0.9] tracking-tight">
              Analytics & Growth 
            </h1>
          </div>
          <p className="max-w-2xl mx-auto font-[poppins] text-gray-500 text-lg md:text-xl font-light leading-relaxed">
            Harness the power of real-time data to drive smarter decisions and accelerate your brokerage's trajectory.
          </p>
        </div>

        {/* Marquee Section */}
        <div className="relative mb-36 mt-12 overflow-hidden">
          {/* Masking gradients */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#f5f5f5] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#f5f5f5] to-transparent z-20 pointer-events-none" />

          <div 
            ref={marqueeRef} 
            className="flex w-fit py-10"
          >
            {/* Set 1 */}
            <div className="flex gap-8 px-4">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    className="w-[320px] bg-white/70 backdrop-blur-sm border border-white/50 rounded-[2.5rem] p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(107,124,79,0.12)] hover:border-[#6b7c4f]/20 transition-all duration-500 group flex-shrink-0"
                  >
                    <div className="bg-[#6b7c4f]/10 w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner">
                      <Icon className="text-[#6b7c4f] w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1F1F1F] mb-4 font-[poppins] whitespace-normal">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 text-base leading-relaxed font-[poppins] font-light whitespace-normal">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
            {/* Set 2 (Identical for seamless loop) */}
            <div className="flex gap-8 px-4">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={`clone-${idx}`}
                    className="w-[320px] bg-white/70 backdrop-blur-sm border border-white/50 rounded-[2.5rem] p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(107,124,79,0.12)] hover:border-[#6b7c4f]/20 transition-all duration-500 group flex-shrink-0"
                  >
                    <div className="bg-[#6b7c4f]/10 w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner">
                      <Icon className="text-[#6b7c4f] w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1F1F1F] mb-4 font-[poppins] whitespace-normal">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 text-base leading-relaxed font-[poppins] font-light whitespace-normal">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Big Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-14 px-4 sm:px-0">
          <StatCard 
            number={3} 
            suffix="x" 
            label="Faster deal closings with visibility" 
            delay={0.1}
          />
          <StatCard 
            number={10} 
            suffix="+" 
            label="Custom analytics dashboards" 
            delay={0.25}
          />
          <StatCard 
            number={100} 
            suffix="%" 
            label="AI-powered forecasting accuracy" 
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};

export default AnalyticsGrowth;