import { useEffect, useRef, useState } from 'react';
import { Menu } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from '../assets/logo.png';
import backgroundImage from '../assets/background.jpg';
import MeetCRMSection from './MeetCRMSection';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [crmAutoplayStarted, setCrmAutoplayStarted] = useState(false);

  const logoRef = useRef(null);             // FIXED positioned logo — always visible
  const backgroundRef = useRef(null);
  const backgroundOverlayRef = useRef(null);
  const dashboardRef = useRef(null);
  const headerRef = useRef(null);
  const leftNavRef = useRef(null);
  const rightNavRef = useRef(null);
  const heroSectionRef = useRef(null);
  const crmAutoplayTriggeredRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setCrmAutoplayStarted(false);
    crmAutoplayTriggeredRef.current = false;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Logo starts at center of screen
      // fixed position: top: 50%, left: 50%, transform: translate(-50%, -50%)
      // GSAP se header center tak move karega
      gsap.set(logoRef.current, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        width: vw > 768 ? '650px' : '300px',   // starting size — bada (responsive)
        zIndex: 100,
        opacity: 1,
      });

      gsap.set(headerRef.current, {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        boxShadow: 'none',
      });

      gsap.set(backgroundRef.current, {
        y: 400, // Matches the -top-[400px] to perfectly align with top, no white space
      });

      gsap.set([leftNavRef.current, rightNavRef.current], {
        opacity: 0,
        x: 0,
      });

      gsap.set(dashboardRef.current, {
        opacity: 0,
        y: 50
      });

      // ── Scroll timeline ─────────────────────────────────────────────
      const tl = gsap.timeline({ paused: true });

      let headerMaxProgress = 0;
      ScrollTrigger.create({
        trigger: heroSectionRef.current,
        start: 'top top',
        end: '+=150%', // Reduced for a snappier feel
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          if (self.progress > headerMaxProgress) {
            headerMaxProgress = self.progress;
            // Manually tween the timeline's progress forward, never backward
            gsap.to(tl, { progress: headerMaxProgress, duration: 0.5, ease: "none", overwrite: true });
          }

          // Fast-Reverse: If scrolling UP through the pinned area, boost the scroll speed
          if (self.direction === -1 && self.progress < 1 && self.progress > 0) {
            const scrollBoost = Math.abs(self.getVelocity()) * 0.008; 
            if (scrollBoost > 2) {
              window.scrollTo(0, window.scrollY - scrollBoost);
            }
          }
        },
      });

      // Background scroll + fade
      tl.to(backgroundRef.current, {
        y: -vh,
        opacity: 0,
        ease: 'power1.inOut',
        duration: 2,
      }, 0);

      tl.to(backgroundOverlayRef.current, {
        opacity: 0,
        ease: 'power1.inOut',
        duration: 2,
      }, 0);

      // Reveal Dashboard Image (Wait for background to move all the way up)
      tl.to(dashboardRef.current, {
        opacity: 1,
        y: vw > 768 ? 0 : 20, // Slightly lower on mobile to avoid header
        ease: 'power2.out',
        duration: 1.0
      }, 1.3);

      ScrollTrigger.create({
        trigger: heroSectionRef.current,
        start: 'top top-=35%',
        onEnter: () => setCrmAutoplayStarted(true),
        once: true
      });

      // Logo: header ke bilkul center mein
      tl.to(logoRef.current, {
        top: vw > 768 ? '44px' : '40px', // Direct top position in header
        y: 0,
        yPercent: -50,
        width: vw > 1536 ? '200px' : (vw > 768 ? '180px' : '140px'),
        ease: 'power1.inOut',
        duration: 2,
        opacity: 1,
      }, 0);

      // Header white
      tl.to(headerRef.current, {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        duration: 0.3,
      }, 1.95);

      // Nav items — screen size ke hisaab se dynamic x
      const isTablet = vw < 1024;
      const leftX = isTablet ? -205 : -290;
      const rightX = isTablet ? 95 : 160;

      tl.fromTo(leftNavRef.current,
        { x: 0, opacity: 0 },
        { x: leftX, opacity: 1, ease: 'power2.out', duration: 0.7 },
        2.6
      );

      tl.fromTo(rightNavRef.current,
        { x: 0, opacity: 0 },
        { x: rightX, opacity: 1, ease: 'power2.out', duration: 0.7 },
        2.6
      );

    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* 
        Logo — FIXED position, hero section se BAHAR
        overflow:hidden se affect nahi hoga
        hamesha visible rahega
      */}
      <img
        ref={logoRef}
        src={logo}
        alt="NuHelixRE"
        style={{
          position: 'fixed',
          zIndex: 100,
          filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.4))' // Added subtle glow for visibility
        }}
      />

      {/* Fixed Header — nav items ke liye */}
      <div
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 py-3 md:py-4"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center relative h-14">

            {/* Left Nav */}
            <div
              ref={leftNavRef}
              className="absolute left-1/2 flex items-center gap-2 md:gap-4 lg:gap-6"
            >
              <a href="#home" className="text-gray-800 hover:text-[#BCBF4F] font-[500] transition-colors text-xs md:text-sm lg:text-base whitespace-nowrap">
                Home
              </a>
              <a href="#analytics" className="text-gray-800 hover:text-[#BCBF4F] font-[500] transition-colors text-xs md:text-sm lg:text-base whitespace-nowrap">
                Analytics
              </a>
            </div>

            {/* Right Nav */}
            <div
              ref={rightNavRef}
              className="absolute left-1/2 flex items-center gap-2 md:gap-4 lg:gap-6"
            >
              <a href="#services" className="text-gray-800 hover:text-[#BCBF4F] font-[500] transition-colors text-xs md:text-sm lg:text-base whitespace-nowrap">
                Services
              </a>
              <a href="#contact" className="text-gray-800 hover:text-[#BCBF4F] font-[500] transition-colors text-xs md:text-sm lg:text-base whitespace-nowrap">
                Contact Us
              </a>

            </div>

            {/* Sign In — bilkul right corner mein fixed */}
            <a
              href="#signin"
              className="hidden md:block absolute -right-6 lg:right-4 px-3 md:px-5 lg:px-6 py-2 lg:py-2.5 rounded-full bg-[#BCBF4F] text-gray-900 font-[500] transition-all text-xs md:text-sm lg:text-base hover:bg-yellow-500 whitespace-nowrap"
            >
              Sign In
            </a>

            {/* Mobile Menu Button */}
            <button className="md:hidden absolute right-4" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            <button className="absolute top-6 right-6" onClick={() => setMobileMenuOpen(false)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {['Home', 'Analytics', 'Services', 'Contact Us'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`}
                className="text-2xl text-gray-800 hover:text-[#BCBF4F] font-[500] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a href="#signin"
              className="px-8 py-3 rounded-full bg-[#BCBF4F] text-gray-900 font-[500] transition-all text-xl hover:bg-yellow-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </a>
          </div>
        </div>
      )}

      {/* Hero Section — background animation ke liye */}
      <div ref={heroSectionRef} className="relative h-screen w-full overflow-hidden">
        {/* Dashboard Section (Hidden initially, revealed on scroll) */}
        <div
          ref={dashboardRef}
          className="absolute top-[90px] bottom-0 inset-x-0 flex items-start justify-center z-30 pointer-events-none"
        >
          <div className="w-full max-w-[1600px] pointer-events-auto">
            <MeetCRMSection autoplayOnReveal={crmAutoplayStarted} />
          </div>
        </div>

        <div
          ref={backgroundRef}
          className="absolute -top-[400px] inset-x-0 h-[calc(100vh+400px)] bg-cover bg-[center_top] will-change-transform z-20"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div
            ref={backgroundOverlayRef}
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
