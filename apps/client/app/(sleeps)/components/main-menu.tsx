import { LightDarkToggle } from "@repo/ui/components/ui/light-dark-toggle";

import { cn } from "@repo/ui/lib/utils";

import MenuItem from "./menu-item";
import MenuTitle from "./menu-title";

export default function MainMenu({ className }: { className?: string }) {
  return (
    <nav
      className={cn(`md:bg-muted overflow-auto p-4 flex flex-col`, className)}
    >
      <header className="hidden md:block border-b dark:border-b-black border-b-zinc-300 pb-4">
        <MenuTitle />
      </header>
      <ul className="py-4 grow">
        <MenuItem href="/sleeps-overview-list">Sleeps Overview</MenuItem>
        <MenuItem href="/sleeps-list">Sleeps List</MenuItem>
        <MenuItem href="/sleeps-list/add">Add Sleep</MenuItem>
      </ul>
      <footer className="flex items-center">
        <LightDarkToggle className="ml-auto" />
      </footer>
    </nav>
  );
}
