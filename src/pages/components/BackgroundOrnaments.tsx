import { useEffect, useRef } from "react";
import { Dna } from "lucide-react";
import gsap from "gsap";
import logo from "../../assets/transparent_2.png";

const BackgroundOrnaments = () => {
  const ornamentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Subtle floating animation for particles and helix
    const ctx = gsap.context(() => {
      gsap.to(".ornament-floating", {
        y: -15,
        x: 8,
        duration: "random(5, 8)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 1,
          from: "random"
        }
      });

      // Rotation for helixes
      gsap.to(".helix-rotate", {
        rotation: "+=2",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, ornamentsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ornamentsRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Mesh Gradients - Subtle blobs of color */}
      <div className="absolute -top-[15%] -left-[10%] w-[50%] h-[50%] bg-[#B7E78A]/10 blur-[140px] rounded-full hidden lg:block" />
      <div className="absolute -bottom-[15%] -right-[10%] w-[50%] h-[50%] bg-blue-100/30 blur-[140px] rounded-full hidden lg:block" />
      
      {/* DNA Helix Ornaments - Left */}
      <div className="absolute left-[-5%] top-1/4 opacity-[0.03] ornament-floating helix-rotate hidden lg:block">
        <Dna size={500} className="text-[#111111] rotate-[15deg]" />
      </div>
      
      {/* DNA Helix Ornaments - Right */}
      <div className="absolute right-[-5%] top-1/3 opacity-[0.03] ornament-floating helix-rotate hidden lg:block">
        <Dna size={500} className="text-[#111111] rotate-[-15deg]" />
      </div>

      {/* Floating Logos - Brand Presence */}
      <div className="absolute left-10 top-[15%] opacity-[0.05] ornament-floating hidden xl:block">
        <img src={logo} alt="" className="w-48 grayscale brightness-0" />
      </div>

      <div className="absolute right-10 bottom-[15%] opacity-[0.05] ornament-floating hidden xl:block">
        <img src={logo} alt="" className="w-48 grayscale brightness-0" />
      </div>

      {/* Vertical Typography Accents - Technical Feel */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-12 opacity-[0.08] hidden xl:flex">
        <span className="text-[10px] font-black tracking-[0.5em] uppercase [writing-mode:vertical-rl] rotate-180">
          Evolutionary Platform
        </span>
        <div className="w-[1px] h-24 bg-[#111111]" />
        <span className="text-[10px] font-black tracking-[0.5em] uppercase [writing-mode:vertical-rl] rotate-180">
          AI Powered CRM
        </span>
      </div>

      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-12 opacity-[0.08] hidden xl:flex">
        <span className="text-[10px] font-black tracking-[0.5em] uppercase [writing-mode:vertical-rl]">
          Decoding Real Estate
        </span>
        <div className="w-[1px] h-24 bg-[#111111]" />
        <span className="text-[10px] font-black tracking-[0.5em] uppercase [writing-mode:vertical-rl]">
          Built To Scale
        </span>
      </div>

      {/* Floating Particles - Glowing dots */}
      {[...Array(8)].map((_, i) => (
        <div 
          key={i}
          className="ornament-floating absolute w-2 h-2 rounded-full bg-[#B7E78A] opacity-[0.2] blur-[1px] hidden lg:block"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
      
      {/* Technical Line Accents */}
      <div className="absolute left-0 top-0 w-full h-full border-x border-[#111111]/[0.02] hidden 2xl:block mx-10" />
    </div>
  );
};

export default BackgroundOrnaments;
