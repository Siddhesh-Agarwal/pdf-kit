import { Link } from "@tanstack/react-router";
import { DotIcon } from "lucide-react";
import { navLinks } from "@/data";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-sidebar">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="sm:col-span-1">
            <Link to="/" className="mb-4 w-fit">
              <Logo />
            </Link>
            <p className="text-sm text-sidebar-foreground leading-relaxed max-w-xs">
              Fast, free, and private PDF tools that run entirely in your browser. No uploads. No
              sign-ups.
            </p>
          </div>

          {/* Tools */}
          <div>
            <p className="text-xs font-semibold text-sidebar-foreground uppercase tracking-widest mb-4">
              Tools
            </p>
            <ul className="space-y-2.5">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="flex items-center gap-2 text-sm text-sidebar-foreground hover:text-foreground transition-colors duration-150"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="text-xs font-semibold text-sidebar-foreground uppercase tracking-widest mb-4">
              Info
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link to="/about" className="text-sm text-sidebar-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-sm text-sidebar-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} PDFKit. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <DotIcon className="w-4 h-4 text-emerald-500" />
            All processing happens locally in your browser
          </div>
        </div>
      </div>
    </footer>
  );
}
