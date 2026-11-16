"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { stages } from "@/content/stages";
import { servicesLine } from "@/content/stages";

const primary = [
  { href: "/pricing/", label: "Pricing" },
  { href: "/glossary/", label: "Glossary" },
  { href: "/about/", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // The header turns to glass with a rule once the page moves under it.
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 4);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  // Escape and outside click close the services menu.
  useEffect(() => {
    if (!servicesOpen && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [servicesOpen, mobileOpen]);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const inServices = stages.some((s) => pathname === s.href);

  return (
    <header className="site-header" ref={headerRef} data-scrolled={scrolled}>
      <div className="wrap header-row">
        <Link prefetch={false} className="brand" href="/" aria-label="Pavani IT home">
          Pavani IT
        </Link>

        <nav className="nav" aria-label="Main">
          <button
            type="button"
            className="nav-link"
            aria-expanded={servicesOpen}
            aria-controls="services-menu"
            aria-current={inServices ? "page" : undefined}
            onClick={() => setServicesOpen((v) => !v)}
          >
            Services
            <ChevronDown aria-hidden="true" />
          </button>
          {primary.map((item) => (
            <Link prefetch={false}
              key={item.href}
              className="nav-link"
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link prefetch={false} className="btn btn-primary btn-sm" href="/contact/">
            Book a call
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>

      {/* Services menu: links stay in the HTML for crawlers; visibility is CSS. */}
      <div className="services-menu" id="services-menu" data-open={servicesOpen}>
        <div className="wrap">
          <div className="services-grid">
            {stages.map((stage) => {
              return (
                <Link prefetch={false} key={stage.id} className="services-col" href={stage.href} tabIndex={servicesOpen ? 0 : -1}>
                  <img src={`/illustrations/${stage.id}-160.webp`} alt="" width={76} height={57} loading="lazy" />
                  <div>
                    <span className="services-col-title">
                      <span>0{stage.number}</span>
                      {stage.label}
                    </span>
                    <ul>
                      {stage.services.map((s) => (
                        <li key={s.id}>{s.name}</li>
                      ))}
                    </ul>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="services-foot">
            <span>HR advisory: handbooks, policies, POSH committees and the labour-code transition.</span>
            <Link prefetch={false} href="/contact/" tabIndex={servicesOpen ? 0 : -1}>
              Ask about HR advisory
            </Link>
          </div>
        </div>
      </div>

      <div className="mobile-menu" id="mobile-menu" hidden={!mobileOpen}>
        <div className="mobile-group">
          <p className="mobile-group-title">Services</p>
          {stages.map((stage) => (
            <Link prefetch={false} key={stage.id} className="mobile-link" href={stage.href}>
              {stage.label}
              <span>{servicesLine(stage)}</span>
            </Link>
          ))}
        </div>
        <div className="mobile-group">
          {[...primary, { href: "/contact/", label: "Contact" }].map((item) => (
            <Link prefetch={false} key={item.href} className="mobile-link" href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="mobile-actions">
          <Link prefetch={false} className="btn btn-primary btn-block" href="/contact/">
            Book a call
          </Link>
        </div>
      </div>
    </header>
  );
}
