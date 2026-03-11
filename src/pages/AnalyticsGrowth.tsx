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

const AnalyticsGrowth = () => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let animationId;
    let lastTime = Date.now();
    const scrollSpeed = 50; // pixels per second

    const animate = () => {
      const currentTime = Date.now();
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      scrollContainer.scrollLeft += scrollSpeed * deltaTime;
      
      // When we've scrolled through half the content, reset to start
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }
      
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const features = [
    {
      icon: BarChart3,
      title: 'Real-Time Analytics',
      description: 'Track lead sources, client engagement, and property views as they happen',
      color: 'from-[#6b7c4f] to-[#8a9d6a]',
      bgLight: 'from-green-50 to-emerald-50',
      iconBg: 'bg-[#6b7c4f]/10',
      iconColor: 'text-[#6b7c4f]',
    },
    {
      icon: TrendingUp,
      title: 'Market Trends',
      description:
        'Spot trends by school districts, neighborhoods, and price ranges to stay competitive',
      color: 'from-[#6b7c4f] to-[#8a9d6a]',
      bgLight: 'from-green-50 to-emerald-50',
      iconBg: 'bg-[#6b7c4f]/10',
      iconColor: 'text-[#6b7c4f]',
    },
    {
      icon: FileText,
      title: 'Smart Reports',
      description:
        'Share polished, PDF-ready reports with clients to build trust and showcase results',
      color: 'from-[#6b7c4f] to-[#8a9d6a]',
      bgLight: 'from-green-50 to-emerald-50',
      iconBg: 'bg-[#6b7c4f]/10',
      iconColor: 'text-[#6b7c4f]',
    },
    {
      icon: Zap,
      title: 'Performance Dashboard',
      description: 'Monitor agent performance with dashboards for leads, offers, and closings',
      color: 'from-[#6b7c4f] to-[#8a9d6a]',
      bgLight: 'from-green-50 to-emerald-50',
      iconBg: 'bg-[#6b7c4f]/10',
      iconColor: 'text-[#6b7c4f]',
    },
    {
      icon: Brain,
      title: 'AI Pipeline Insights',
      description: 'Forecast sales with AI-driven pipeline insights to predict outcomes',
      color: 'from-[#6b7c4f] to-[#8a9d6a]',
      bgLight: 'from-green-50 to-emerald-50',
      iconBg: 'bg-[#6b7c4f]/10',
      iconColor: 'text-[#6b7c4f]',
    },
    {
      icon: Scale,
      title: 'Property Comparison',
      description:
        'Compare property performance side by side to guide pricing and marketing strategies',
      color: 'from-[#6b7c4f] to-[#8a9d6a]',
      bgLight: 'from-green-50 to-emerald-50',
      iconBg: 'bg-[#6b7c4f]/10',
      iconColor: 'text-[#6b7c4f]',
    },
    {
      icon: Workflow,
      title: 'Deal Acceleration',
      description: 'Gain visibility into bottlenecks so deals move faster and smoother',
      color: 'from-[#6b7c4f] to-[#8a9d6a]',
      bgLight: 'from-green-50 to-emerald-50',
      iconBg: 'bg-[#6b7c4f]/10',
      iconColor: 'text-[#6b7c4f]',
    },
  ];

  return (
    <section className="">
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-20">
           <div className="text-center font-[Duck-cry] mt-[150px]">
        <h1 className="text-[3rem] tracking-[0.02em] mb-3">
           Analytics & Growth 
        </h1>
          </div>
        </div>

        <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto hide-scrollbar mb-8 cursor-grab active:cursor-grabbing"
        >
          <div className="flex gap-4 w-max">
            {[...features, ...features, ...features].map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 cursor-pointer overflow-hidden font-[poppins] flex-shrink-0"
                  style={{ width: '280px' }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.bgLight} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>

                  <div className="relative z-10">
                    <div
                      className={`${feature.iconBg} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500`}
                    >
                      <Icon className={`${feature.iconColor} w-6 h-6`} />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-gray-600 text-lg leading-relaxed group-hover:text-gray-700 transition-colors">
                      {feature.description}
                    </p>
                  </div>

            
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          <div className="bg-gradient-to-br from-[#6b7c4f] to-[#8a9d6a] rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-[poppins]">
            <div className="text-4xl font-bold mb-2 text-center">3x</div>
            <p className="text-green-100 text-center">Faster deal closings with visibility</p>
          </div>

          <div className="bg-gradient-to-br from-[#6b7c4f] to-[#8a9d6a] rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-[poppins]">
            <div className="text-4xl font-bold mb-2 text-center">10+</div>
            <p className="text-green-100 text-center">Custom analytics dashboards</p>
          </div>

          <div className="bg-gradient-to-br from-[#6b7c4f] to-[#8a9d6a] rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-[poppins]">
            <div className="text-4xl font-bold mb-2 text-center">100%</div>
            <p className="text-green-100 text-center">AI-powered forecasting accuracy</p>
          </div>
        </div>

      
      </div>
    </section>
  );
};

export default AnalyticsGrowth;