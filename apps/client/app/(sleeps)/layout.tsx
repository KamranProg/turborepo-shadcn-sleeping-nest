"use client";

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@repo/ui/components/ui/drawer";
import MainMenu from "./components/main-menu";
import MenuTitle from "./components/menu-title";
import { MenuIcon } from "@repo/ui/components/ui/icons";
import { useState } from "react";
import { useMediaQuery } from "../../hooks/shared/use-media-query";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="md:grid md:grid-cols-[250px_1fr] h-screen">
      <MainMenu className="hidden md:flex" />
      {!isDesktop && (
        <div className="p-4 flex justify-between md:hidden sticky top-0 left-0 bg-background border-b border-border">
          <MenuTitle />
          <Drawer
            direction="right"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            onOpenChange={(open:boolean) => setMobileMenuOpen(open)}
          >
            <DrawerTrigger>
              <MenuIcon />
            </DrawerTrigger>
            <DrawerContent>
              <MainMenu />
            </DrawerContent>
          </Drawer>
        </div>
      )}
      <div className="overflow-auto pt-10 px-4">
        {children}
      </div>
    </div>
  );
}
