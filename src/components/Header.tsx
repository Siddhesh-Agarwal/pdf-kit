import { Link } from "@tanstack/react-router";
import { ModeToggle } from "@/components/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { tools } from "@/data";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-sidebar border-b border-border backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>

        <nav className="flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent font-medium transition-all duration-150 shadow-none">
                  Tools
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-3 p-4 md:w-[450px] md:grid-cols-2 rounded-xl shadow-xl">
                    {tools.map(({ to, label, icon: Icon, description }) => (
                      <li key={to}>
                        <NavigationMenuLink>
                          <Link
                            to={to}
                            className="block select-none space-y-1.5 rounded-lg p-2 leading-none no-underline"
                          >
                            <div className="flex items-center gap-2 text-sm font-semibold">
                              <Icon className="w-4 h-4 text-primary" />
                              {label}
                            </div>
                            <p className="line-clamp-2 text-xs">{description}</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
