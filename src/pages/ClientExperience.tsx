import { useEffect, useState } from 'react';
import { Search, TrendingUp, Users } from 'lucide-react';

const ClientExperience = ({ open = false }: { open?: boolean }) => {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
    } else {
      setAnimate(false);
      const timer = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const experiences = [
    { title: 'For Buyers', icon: Search, description: 'Stay ahead of the market with instant alerts the moment a new property matches your search. Save and organize favorites, add personal notes to each listing, and communicate directly with your agent through built-in messaging. NuHelixX RE makes it simple to track every option, compare properties, and move quickly when the right home appears.', gradient: 'from-[#f5f5dc] to-[#f5f5dc]', iconBg: 'bg-yellow-100/40', iconColor: 'text-yellow-800', accentColor: 'bg-yellow-700' },
    { title: 'For Sellers', icon: TrendingUp, description: 'Gain real-time visibility into how your property is performing on the market. Track views, inquiries, and engagement patterns. With NuHelixX RE, you always know the level of activity around your listing—helping you and your agent make smarter pricing and marketing decisions.', gradient: 'from-[#f5f5dc] to-[#f5f5dc]', iconBg: 'bg-yellow-100/40', iconColor: 'text-yellow-800', accentColor: 'bg-yellow-700' },
    { title: 'For Both', icon: Users, description: 'Whether buying or selling, NuHelixX RE keeps everything simple and connected. Request showings or meetings with one click, exchange documents securely, and stay updated at every stage. From first conversation to closing day, the entire experience is faster, clearer, and stress-free.', gradient: 'from-[#f5f5dc] to-[#f5f5dc]', iconBg: 'bg-yellow-100/40', iconColor: 'text-yellow-800', accentColor: 'bg-yellow-700' },
  ];

  if (!visible) return null;

  return (
    <div
      style={{
        opacity: animate ? 1 : 0,
        transform: animate ? 'translateY(0)' : 'translateY(-10px)',
        transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
        overflow: 'visible',
        willChange: 'opacity, transform',
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 pb-16 px-4 md:px-8 lg:px-16">
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
  );
};

export default ClientExperience;