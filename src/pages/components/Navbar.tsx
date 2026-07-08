"use client"
import logo from "../../assets/transparent_2.png";
import { useCallback, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLock, heroScrollTriggerRef } from "../HeroSection";

export default function Navbar() {
  const headerRef = useRef<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const isNavigatingRef = useRef(false);

  const handleNav = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsOpen(false);

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

  return (
    <>
      <header ref={headerRef} className="flex items-center justify-between px-4 md:px-10 py-6 bg-[#f5f5f5]">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-16 md:h-28 w-auto" />
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-700 hover:text-gray-900">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#home" onClick={(e) => handleNav(e, 'home')} className="text-gray-700 hover:text-gray-900 font-medium">Home</a>
          <a href="#analytics-growth" onClick={(e) => handleNav(e, 'analytics')} className="text-gray-700 hover:text-gray-900 font-medium">Analytics</a>
          <a href="#services" onClick={(e) => handleNav(e, 'services')} className="text-gray-700 hover:text-gray-900 font-medium">Services</a>
          <a href="#contact" onClick={(e) => handleNav(e, 'contact')} className="text-gray-700 hover:text-gray-900 font-medium">Contact Us</a>
        </nav>
      </header>

      <nav className={`md:hidden flex-col items-center gap-4 py-4 bg-[#f5f5f5] ${isOpen ? 'flex' : 'hidden'}`}>
        <a href="#home" onClick={(e) => handleNav(e, 'home')} className="text-gray-700 hover:text-gray-900 font-medium">Home</a>
        <a href="#analytics-growth" onClick={(e) => handleNav(e, 'analytics')} className="text-gray-700 hover:text-gray-900 font-medium">Analytics</a>
        <a href="#services" onClick={(e) => handleNav(e, 'services')} className="text-gray-700 hover:text-gray-900 font-medium">Services</a>
        <a href="#contact" onClick={(e) => handleNav(e, 'contact')} className="text-gray-700 hover:text-gray-900 font-medium">Contact Us</a>
      </nav>
    </>
  );
}
