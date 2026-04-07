"use client"
import logo from "../../assets/transparent_2.png";
import { useCallback, useRef, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const headerRef = useRef<HTMLElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // measure header height on mount and resize so spacer and scroll offset are accurate
  useEffect(() => {
    const measure = () => {
      const h = headerRef.current ? headerRef.current.getBoundingClientRect().height : 0;
      setHeaderHeight(h);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const handleNav = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();

    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // update hash without jumping
      history.replaceState(null, '', '#home');
      return;
    }

    // Prefer the real section id if it exists (e.g. 'services'), otherwise
    // fall back to the stable anchors we added for pinned content.
    let target = document.getElementById(id);
    if (!target) {
      const fallbackId = id === 'analytics' ? 'analytics-anchor' : id === 'services' ? 'services-anchor' : id;
      target = document.getElementById(fallbackId);
    }
    // If target is not found, still update the hash so the URL is shareable
    if (!target) {
      history.replaceState(null, '', `#${id}`);
      return;
    }

    // Use a couple of animation frames to ensure layout (and any pinned ScrollTriggers)
    // have settled before measuring and scrolling. This makes scrolling reliable
    // when GSAP pinning or layout changes are present on the page.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // If GSAP ScrollTrigger is present, refresh it so pinned elements/layout
        // are up-to-date before we measure. We try common locations where ScrollTrigger
        // might be exposed so this is resilient across setups.
        try {
          const ST = (window as any).gsap?.core?.ScrollTrigger || (window as any).ScrollTrigger;
          if (ST && typeof ST.refresh === "function") {
            ST.refresh();
          }
        } catch (e) {
          // ignore — refresh is best-effort
        }

        const y = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 8;

        // Best-effort: temporarily disable all ScrollTriggers then jump instantly
        // to the target to guarantee a single-click navigation. After a short
        // timeout re-enable triggers and refresh layout.
        try {
          const ST = (window as any).gsap?.core?.ScrollTrigger || (window as any).ScrollTrigger;
          if (ST && typeof ST.getAll === 'function') {
            const all = ST.getAll() || [];
            // disable all ScrollTriggers
            all.forEach((t: any) => t?.disable && t.disable());
            // instant jump
            window.scrollTo({ top: Math.max(0, y), behavior: 'auto' });
            history.replaceState(null, '', `#${id}`);

            // Some ScrollTriggers aggressively re-map scroll — perform a second
            // forced jump a short time later before re-enabling triggers. This
            // makes the navigation robust against pinned timelines that try to
            // snap the scroll position back.
            setTimeout(() => {
              window.scrollTo({ top: Math.max(0, y), behavior: 'auto' });
            }, 120);

            // re-enable after a short delay so ScrollTrigger can recalc
            setTimeout(() => {
              all.forEach((t: any) => t?.enable && t.enable());
              try { ST.refresh && ST.refresh(); } catch (e) {}
            }, 220);
            return;
          }
        } catch (e) {
          // fall back to the normal smooth scroll path below
        }

        // fallback: smooth scroll if we couldn't access ScrollTrigger
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        // update hash so link is shareable
        history.replaceState(null, '', `#${id}`);
      });
    });
  }, [headerHeight]);

  return (
    // raise z-index so the header stays on top of any pinned/paneled content
    <>
      <header ref={headerRef} className="flex items-center justify-between px-4 md:px-10 py-6 bg-[#f5f5f5]">
      {/* Logo and Hamburger */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-16 md:h-28 w-auto" />
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-700 hover:text-gray-900"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Navigation for desktop */}
      <nav className="hidden md:flex items-center gap-8">
        <a href="#home" onClick={(e) => handleNav(e, 'home')} className="text-gray-700 hover:text-gray-900 font-medium">
          Home
        </a>
        <a href="#analytics" onClick={(e) => handleNav(e, 'analytics')} className="text-gray-700 hover:text-gray-900 font-medium">
          Analytics
        </a>
        <a href="#services" onClick={(e) => handleNav(e, 'services')} className="text-gray-700 hover:text-gray-900 font-medium">
          Services
        </a>
        <a href="#contact" onClick={(e) => handleNav(e, 'contact')} className="text-gray-700 hover:text-gray-900 font-medium">
          Contact Us
        </a>
      </nav>

      </header>

      {/* Mobile Navigation */}
      <nav className={`md:hidden flex-col items-center gap-4 py-4 bg-[#f5f5f5] ${isOpen ? 'flex' : 'hidden'}`}>
        <a href="#home" onClick={(e) => { handleNav(e, 'home'); setIsOpen(false); }} className="text-gray-700 hover:text-gray-900 font-medium">
          Home
        </a>
        <a href="#analytics" onClick={(e) => { handleNav(e, 'analytics'); setIsOpen(false); }} className="text-gray-700 hover:text-gray-900 font-medium">
          Analytics
        </a>
        <a href="#services" onClick={(e) => { handleNav(e, 'services'); setIsOpen(false); }} className="text-gray-700 hover:text-gray-900 font-medium">
          Services
        </a>
        <a href="#contact" onClick={(e) => { handleNav(e, 'contact'); setIsOpen(false); }} className="text-gray-700 hover:text-gray-900 font-medium">
          Contact Us
        </a>
      </nav>
      {/* spacer keeps document flow undisturbed since header is fixed */}
    </>
  );
}
