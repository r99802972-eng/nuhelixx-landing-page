import { useEffect, useState } from 'react';
import { Bot, Workflow, Shield, User, Users } from 'lucide-react';

function AgentExperience({ open = false }: { open?: boolean }) {
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

  const features = [
    { id: 1, title: 'Smart Automation', description: 'AI takes care of repetitive tasks like tagging leads, sending reminders, drafting messages, summarizing calls, and managing follow-ups. Agents cut down on busy work and spend more time with clients, knowing the system is always running in the background to support them.', icon: Bot },
    { id: 2, title: 'Seamless Workflow', description: 'Every stage of the process—from lead capture to contract signing—lives in one platform. Agents avoid juggling multiple tools and enjoy a streamlined workflow that makes closing deals faster and easier.', icon: Workflow },
    { id: 3, title: 'Client Confidence', description: 'Clients stay connected with instant alerts, property updates, and secure messaging. Agents build stronger relationships and trust by delivering a smoother, more transparent experience from the first call to the final signature.', icon: Shield },
    { id: 4, title: 'Independent Agent Support', description: 'Solo agents gain the full power of a team without hiring staff. NuHelixX RE automates follow-up, notes, marketing, pipeline updates, and transaction tracking so independent agents can operate at scale with minimal administrative load.', icon: User },
    { id: 5, title: 'Agent–Broker Efficiency', description: 'Agent–brokers can manage both production and leadership effortlessly. NuHelixX RE provides pipeline visibility, routing controls, and compliance tracking—reducing the need for assistants while improving operational accuracy.', icon: Users },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {features.slice(0, 3).map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.id} className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden font-[poppins]">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-rose-100 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 text-rose-600">
                    <Icon className="w-8 h-8" />
                  </div>
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
                  <div className="w-20 h-20 bg-rose-100 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 text-rose-600">
                    <Icon className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="relative text-xl font-bold text-slate-900 mb-4 text-center">{feature.title}</h3>
                <p className="relative text-slate-600 leading-relaxed text-base">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AgentExperience;