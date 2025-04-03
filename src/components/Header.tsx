
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <a href="/" className="flex items-center gap-2 font-semibold">
            <span className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-primary-foreground font-bold">
              U
            </span>
            <span>UniConvert</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-end gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
