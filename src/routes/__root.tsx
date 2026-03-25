import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="pdfkit-theme">
      <div className="min-h-screen bg-background text-foreground font-sans antialiased">
        <Header />
        <main className="pt-16 min-h-screen flex flex-col">
          <div className="flex-1">
            <Outlet />
          </div>
          <Footer />
        </main>
        <TanStackRouterDevtools />
      </div>
    </ThemeProvider>
  );
}
