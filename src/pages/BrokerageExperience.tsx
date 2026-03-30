import { useEffect, useState } from "react";
import {
  BarChart3,
  Building2,
  Settings2,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const BrokerageExperience = ({ open = false }: { open?: boolean }) => {
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
    {
      id: 1,
      title: "Performance Visibility",
      description:
        "NuHelixX RE gives brokers a unified view of production, pipeline activity, compliance status, and agent performance across the entire organization. Leadership gains clarity without needing additional staff or manual reporting.",
      icon: BarChart3,
    },
    {
      id: 2,
      title: "AI Oversight",
      description:
        "AI identifies risk, stalled deals, and performance gaps early, helping brokers take proactive action instead of reacting too late.",
      icon: ShieldCheck,
    },
    {
      id: 3,
      title: "Scalable Structure",
      description:
        "Support single offices, multi-office brokerages, teams, and hybrid org structures with controlled permissions and clear contact ownership rules.",
      icon: Building2,
    },
    {
      id: 4,
      title: "Operational Efficiency",
      description:
        "Because NuHelixX RE automates administrative tasks, compliance reminders, pipeline updates, and data entry, brokerages reduce overhead while improving output.",
      icon: Settings2,
    },
    {
      id: 5,
      title: "One Platform for Growth",
      description:
        "Whether managing 5 agents or 500, NuHelixX RE scales seamlessly and eliminates the need to invest in additional tools, assistants, or manual oversight systems.",
      icon: TrendingUp,
    },
  ];

  if (!visible) return null;

  return (
    <div
      style={{
        opacity: animate ? 1 : 0,
        transform: animate ? "translateY(0)" : "translateY(-10px)",
        transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
        overflow: "visible",
        willChange: "opacity, transform",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {features.slice(0, 3).map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden font-[poppins]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 text-emerald-700">
                    <Icon className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="relative text-xl font-bold text-slate-900 mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="relative text-slate-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.slice(3).map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden font-[poppins]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 text-emerald-700">
                    <Icon className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="relative text-xl font-bold text-slate-900 mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="relative text-slate-600 leading-relaxed text-base">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BrokerageExperience;
