import { useEffect, useRef, useState, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from '../assets/transparent_2.png';
import backgroundImage from '../assets/background.jpg';
import MeetCRMSection from './MeetCRMSection';
import { navLock, heroScrollTriggerRef } from './HeroSection';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [crmAutoplayStarted, setCrmAutoplayStarted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const logoRef = useRef(null);
  const backgroundRef = useRef(null);
  const backgroundOverlayRef = useRef(null);
  const dashboardRef = useRef(null);
  const headerRef = useRef(null);
  const leftNavRef = useRef(null);
  const rightNavRef = useRef(null);
  const heroSectionRef = useRef(null);
  const mobileLogoRef = useRef<HTMLImageElement>(null);
  const isNavigatingRef = useRef(false);

  const handleNav = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (id === 'home') {
      isNavigatingRef.current = true;
      navLock.active = true;
      window.scrollTo({ top: 0, behavior: 'auto' });
      setTimeout(() => { isNavigatingRef.current = false; navLock.active = false; }, 600);
      return;
    }

    const targetId = id === 'analytics' ? 'analytics-growth' : id;
    const target = document.getElementById(targetId);
    if (!target) return;

    isNavigatingRef.current = true;
    navLock.active = true;

    const heroST = heroScrollTriggerRef.current;
    let scrollTarget: number;

    if (heroST && window.innerWidth >= 1024) {
      const servicesEl = document.getElementById('services');
      let targetFromRoot = 0;
      let el: HTMLElement | null = target;
      while (el) { targetFromRoot += el.offsetTop; el = el.offsetParent as HTMLElement | null; }
      let servicesFromRoot = 0;
      let sel: HTMLElement | null = servicesEl;
      while (sel) { servicesFromRoot += sel.offsetTop; sel = sel.offsetParent as HTMLElement | null; }
      const offsetWithinServices = targetFromRoot - servicesFromRoot;
      scrollTarget = heroST.end + offsetWithinServices - 80;
    } else {
      let top = 0;
      let el: HTMLElement | null = target;
      while (el) { top += el.offsetTop; el = el.offsetParent as HTMLElement | null; }
      scrollTarget = top - 80;
    }

    window.scrollTo({ top: Math.max(0, scrollTarget), behavior: 'auto' });
    setTimeout(() => { isNavigatingRef.current = false; navLock.active = false; }, 600);
  }, []);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // ── DESKTOP GSAP animation (only lg+) ──────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 1024) return;

    setCrmAutoplayStarted(false);
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      gsap.set(logoRef.current, {
        position: 'fixed',
        top: '42%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        width: vw > 1536 ? '650px' : '500px',
        zIndex: 100,
        opacity: 1,
      });

      gsap.set(headerRef.current, {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        boxShadow: 'none',
      });

      gsap.set(backgroundRef.current, { y: 0 });
      gsap.set([leftNavRef.current, rightNavRef.current], { opacity: 0, x: 0 });
      gsap.set(dashboardRef.current, { opacity: 0, y: 50 });

      const tl = gsap.timeline({ paused: true });
      tl.call(() => setCrmAutoplayStarted(true), [], 1.3);

      let headerMaxProgress = 0;
      ScrollTrigger.create({
        trigger: heroSectionRef.current,
        start: 'top top',
        end: '+=80%',
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          if (isNavigatingRef.current) return;
          if (self.progress > headerMaxProgress) {
            headerMaxProgress = self.progress;
            gsap.to(tl, { progress: headerMaxProgress, duration: 0.5, ease: 'none', overwrite: true });
          }
          if (self.direction === -1 && self.progress < 1 && self.progress > 0) {
            const scrollBoost = Math.abs(self.getVelocity()) * 0.008;
            if (scrollBoost > 2) window.scrollTo(0, window.scrollY - scrollBoost);
          }
        },
      });

      tl.to(backgroundRef.current, { y: -vh, opacity: 0, ease: 'power1.inOut', duration: 2 }, 0);
      tl.to(backgroundOverlayRef.current, { opacity: 0, ease: 'power1.inOut', duration: 2 }, 0);
      tl.to(dashboardRef.current, { opacity: 1, y: 0, ease: 'power2.out', duration: 1.0 }, 1.3);

      tl.to(logoRef.current, {
        top: '44px',
        y: 0,
        yPercent: -50,
        width: vw > 1536 ? '200px' : '180px',
        ease: 'power1.inOut',
        duration: 2,
        opacity: 1,
      }, 0);

      tl.to(headerRef.current, { backgroundColor: 'rgba(255, 255, 255, 1)', duration: 0.3 }, 1.95);

      const leftX = vw > 1536 ? -320 : vw > 1280 ? -290 : -240;
      const rightX = vw > 1536 ? 180 : vw > 1280 ? 160 : 130;

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

  // ── MOBILE/TABLET: simple scroll-based navbar ──────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth >= 1024) return;

    setCrmAutoplayStarted(true); // auto start CRM on mobile

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Mobile logo fade in on load
      if (mobileLogoRef.current) {
        gsap.fromTo(mobileLogoRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.3 }
        );
      }

      // Mobile header background on scroll
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: '+=200',
        onUpdate: (self) => {
          if (headerRef.current) {
            const alpha = Math.min(self.progress * 5, 1);
            gsap.set(headerRef.current, {
              backgroundColor: `rgba(255,255,255,${alpha})`,
              boxShadow: alpha > 0.5 ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
            });
          }
        },
      });

      // Dashboard reveal on mobile — simple fade
      if (dashboardRef.current) {
        gsap.set(dashboardRef.current, { opacity: 1, y: 0 });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── DESKTOP: GSAP animated logo (lg+) ── */}
      <img
        ref={logoRef}
        src={logo}
        alt="NuHelixRE"
        className="hidden lg:block"
        style={{
          position: 'fixed',
          zIndex: 100,
          filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.4))',
        }}
      />

      {/* ── FIXED HEADER ── */}
      <div
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50"
        style={{ backgroundColor: 'rgba(255,255,255,0)' }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── MOBILE & TABLET navbar (hidden on lg+) ── */}
          <div className="flex lg:hidden items-center justify-between h-16 sm:h-18">
            {/* Mobile Logo */}
            <img
              ref={mobileLogoRef}
              src={logo}
              alt="NuHelixRE"
              className="h-10 sm:h-12 w-auto object-contain"
              style={{ opacity: 0 }}
            />
            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* ── DESKTOP navbar center layout (lg+) ── */}
          <div className="hidden lg:flex items-center justify-center relative h-14">
            {/* Left Nav */}
            <div ref={leftNavRef} className="absolute left-1/2 flex items-center gap-4 xl:gap-6">
              <a href="#home" onClick={(e) => handleNav(e, 'home')} className="text-gray-800 hover:text-[#84B900] font-[500] transition-colors text-sm xl:text-base whitespace-nowrap">Home</a>
              <a href="#analytics" onClick={(e) => handleNav(e, 'analytics')} className="text-gray-800 hover:text-[#84B900] font-[500] transition-colors text-sm xl:text-base whitespace-nowrap">Analytics</a>
            </div>
            {/* Right Nav */}
            <div ref={rightNavRef} className="absolute left-1/2 flex items-center gap-4 xl:gap-6">
              <a href="#services" onClick={(e) => handleNav(e, 'services')} className="text-gray-800 hover:text-[#84B900] font-[500] transition-colors text-sm xl:text-base whitespace-nowrap">Services</a>
              <a href="#contact" onClick={(e) => handleNav(e, 'contact')} className="text-gray-800 hover:text-[#84B900] font-[500] transition-colors text-sm xl:text-base whitespace-nowrap">Contact Us</a>
            </div>
            {/* Sign In */}
            <a
              href="#signin"
              className="absolute right-0 px-5 xl:px-6 py-2 xl:py-2.5 rounded-full border border-gray-800 bg-transparent text-gray-800 font-[500] transition-all text-sm xl:text-base hover:bg-gray-100 whitespace-nowrap"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>

      {/* ── MOBILE FULLSCREEN MENU ── */}
      <div
        className={`fixed inset-0 z-[60] bg-white lg:hidden flex flex-col transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Top bar inside menu */}
        <div className="flex items-center justify-between px-4 sm:px-6 h-16 sm:h-18 border-b border-gray-100">
          <img src={logo} alt="NuHelixRE" className="h-10 sm:h-12 w-auto object-contain" />
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col items-center justify-center flex-1 gap-6 sm:gap-8 px-6">
          {[
            { label: 'Home', id: 'home' },
            { label: 'Analytics', id: 'analytics' },
            { label: 'Services', id: 'services' },
            { label: 'Contact Us', id: 'contact' },
          ].map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNav(e, item.id)}
              className="text-2xl sm:text-3xl font-[500] text-gray-800 hover:text-[#84B900] transition-colors"
              style={{
                transitionDelay: mobileMenuOpen ? `${i * 60}ms` : '0ms',
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(10px)',
                opacity: mobileMenuOpen ? 1 : 0,
                transition: 'color 0.2s, transform 0.3s ease, opacity 0.3s ease',
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#signin"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 px-8 py-3 rounded-full border-2 border-gray-800 text-gray-800 font-[500] text-xl hover:bg-gray-100 transition-colors"
          >
            Sign In
          </a>
        </nav>
      </div>

      {/* ── HERO SECTION WRAPPER ── */}
      {isDesktop ? (
        /* Desktop: GSAP pinned hero */
        <div ref={heroSectionRef} className="relative min-h-[265vh] w-full">
          <div
            ref={backgroundRef}
            className="absolute top-0 inset-x-0 h-screen bg-cover bg-[center_top] will-change-transform z-10"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <div ref={backgroundOverlayRef} className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0)' }} />
          </div>
          <div
            ref={dashboardRef}
            className="relative top-[70px] bottom-0 inset-x-0 flex items-start justify-center z-40 pointer-events-none"
          >
            <div className="w-full max-w-[1600px] pointer-events-auto">
              <MeetCRMSection autoplayOnReveal={crmAutoplayStarted} />
            </div>
          </div>
        </div>
      ) : (
        /* Mobile/Tablet: no GSAP pin, simple layout */
        <div className="relative w-full">
          {/* Background image — full height on mobile */}
          <div
            ref={backgroundRef}
            className="relative w-full h-[50vh] sm:h-[55vh] bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <div ref={backgroundOverlayRef} className="absolute inset-0 bg-black/10" />
          </div>

          {/* Dashboard / CRM section below background */}
          <div
            ref={dashboardRef}
            className="relative w-full bg-white"
          >
            <div
              ref={headerRef as React.RefObject<HTMLDivElement>}
              className="w-full"
            />
            <MeetCRMSection autoplayOnReveal={crmAutoplayStarted} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
