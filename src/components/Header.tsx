import { Link } from "@tanstack/react-router";
import { FileText, Merge, Scissors, PackageOpen } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const navLinks = [
  {
    to: "/merge-pdf",
    label: "Merge PDF",
    icon: Merge,
    description: "Combine multiple PDFs into a single file in seconds.",
  },
  {
    to: "/split-pdf",
    label: "Split PDF",
    icon: Scissors,
    description: "Extract specific pages or split a PDF into multiple files.",
  },
  {
    to: "/compress-pdf",
    label: "Compress PDF",
    icon: PackageOpen,
    description: "Reduce PDF file size while preserving quality.",
  },
];

export function Header() {
  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-sidebar border-b border-border backdrop-blur-xl"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 transition-transform duration-200 group-hover:scale-105">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground">
            PDF<span className="text-indigo-400">Kit</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden sm:flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent font-medium transition-all duration-150 shadow-none">
                  Tools
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-3 p-4 md:w-[450px] md:grid-cols-2 rounded-xl shadow-xl">
                    {navLinks.map(({ to, label, icon: Icon, description }) => (
                      <li key={to}>
                        <NavigationMenuLink>
                          <Link
                            to={to}
                            className="block select-none space-y-1.5 rounded-lg p-2 leading-none no-underline"
                          >
                            <div className="flex items-center gap-2 text-sm font-semibold">
                              <Icon className="w-4 h-4 text-indigo-400" />
                              {label}
                            </div>
                            <p className="line-clamp-2 text-xs">
                              {description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>
    </header>
  );
}
