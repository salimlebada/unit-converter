
import { ThemeProvider } from "@/components/ThemeProvider";
import { ConversionProvider } from "@/context/ConversionContext";
import { Header } from "@/components/Header";
import { UnitConverter } from "@/components/UnitConverter";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <ConversionProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 container py-8">
            <UnitConverter />
          </main>
          <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built with ❤️ - Snkls studio
              </p>
            </div>
          </footer>
        </div>
      </ConversionProvider>
    </ThemeProvider>
  );
};

export default Index;
