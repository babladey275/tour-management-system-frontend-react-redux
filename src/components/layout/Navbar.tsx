import { Link, NavLink } from "react-router";
import { Menu } from "lucide-react";

import { cn } from "../../utils/cn";
import Logo from "@/assets/icons/Logo";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./ModeToggler";

// Single source of truth for routes (desktop + mobile)
const navigationLinks = [
  { to: "/", label: "Home" },
  { to: "/features", label: "Features" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "inline-flex items-center rounded-sm px-3 py-2 text-sm font-medium transition",
      "text-muted-foreground hover:bg-muted hover:text-primary",
      isActive && "bg-muted text-foreground"
    );

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "block rounded-2xl px-3 py-3 text-sm font-semibold transition",
      "text-foreground/85 hover:bg-muted",
      isActive && "bg-muted"
    );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand */}
        <Link to="/" className="text-primary hover:text-primary/90">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          <nav
            className="flex flex-wrap items-center gap-1"
            aria-label="Primary"
          >
            {navigationLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={desktopLinkClass}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button asChild className="text-sm">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>

        {/* Mobile right side (ModeToggle + Hamburger) */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-xl"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className={cn(
                "w-[320px] max-w-[88vw] p-0",
                "pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
              )}
            >
              <SheetHeader className="p-4">
                <div className="flex items-center justify-between">
                  <SheetClose asChild>
                    <Link
                      to="/"
                      className="text-primary hover:text-primary/90"
                      aria-label="Go to home"
                    >
                      <Logo />
                    </Link>
                  </SheetClose>

                  {/* Title for accessibility */}
                  <SheetTitle className="sr-only">Mobile menu</SheetTitle>

                  {/* Add Description to remove Radix warning */}
                  <SheetDescription className="sr-only">
                    Navigation links and login action.
                  </SheetDescription>
                </div>
              </SheetHeader>

              <div className="h-px w-full bg-border" />

              {/* Scroll area */}
              <div className="max-h-[calc(100vh-76px-env(safe-area-inset-top)-env(safe-area-inset-bottom))] overflow-y-auto">
                <nav className="p-3" aria-label="Mobile Primary">
                  {navigationLinks.map((item) => (
                    <SheetClose asChild key={item.to}>
                      <NavLink
                        to={item.to}
                        end={item.to === "/"}
                        className={mobileLinkClass}
                      >
                        {item.label}
                      </NavLink>
                    </SheetClose>
                  ))}

                  <div className="my-3 h-px w-full bg-border" />

                  <div className="grid gap-2">
                    <SheetClose asChild>
                      <Button
                        asChild
                        className="rounded-2xl py-3 text-sm font-semibold shadow-sm"
                      >
                        <Link to="/login">Login</Link>
                      </Button>
                    </SheetClose>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
