import { useEffect, useState } from 'react';
import propert_1 from "../assets/property-1.png";
import propert_2 from "../assets/property-2.png";
import propert_3 from "../assets/property-3.png";
import property_4 from "../assets/property-4.png";
import property_5 from "../assets/property-5.png";

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

  const TestimonialDiv = [
    { name: "Performance", company: "Visibility", logo: propert_1, testimonial: "NuHelixX RE gives brokers a unified view of production, pipeline activity, compliance status, and agent performance across the entire organization. Leadership gains clarity without needing additional staff or manual reporting." },
    { name: "AI Oversight", company: "Security", logo: propert_2, testimonial: "AI identifies risk, stalled deals, and performance gaps early—helping brokers take proactive action instead of reacting too late." },
    { name: "Scalable Structure", company: "Costs", logo: propert_3, testimonial: "Support single offices, multi-office brokerages, teams, and hybrid org structures with controlled permissions and clear contact ownership rules." },
    { name: "Operational Efficiency", company: "Costs", logo: property_4, testimonial: "Because NuHelixX RE automates administrative tasks, compliance reminders, pipeline updates, and data entry, brokerages reduce overhead while improving output." },
    { name: "One Platform for Growth", company: "Costs", logo: property_5, testimonial: "Whether managing 5 agents or 500, NuHelixX RE scales seamlessly and eliminates the need to invest in additional tools, assistants, or manual oversight systems." },
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
      <div className="flex flex-col gap-8 md:gap-12 px-4 md:px-8 lg:px-16 mt-8 pb-16">
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
  );
};

export default BrokerageExperience;