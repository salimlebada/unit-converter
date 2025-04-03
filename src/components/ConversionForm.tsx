
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clipboard, ArrowDown, BookmarkPlus, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Unit, convertValue } from "@/utils/conversions";
import { useConversionContext } from "@/context/ConversionContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface ConversionFormProps {
  categoryId: string;
  units: Unit[];
}

export function ConversionForm({ categoryId, units }: ConversionFormProps) {
  const [fromValue, setFromValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>(units[0]?.id || "");
  const [toUnit, setToUnit] = useState<string>(units[1]?.id || "");
  const [result, setResult] = useState<number>(0);
  const { toast } = useToast();
  const { addRecentConversion, addFavoriteConversion } = useConversionContext();
  const isMobile = useIsMobile();

  // Perform conversion whenever any input changes
  useEffect(() => {
    handleConvert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromValue, fromUnit, toUnit]);

  const handleConvert = () => {
    const from = units.find((u) => u.id === fromUnit);
    const to = units.find((u) => u.id === toUnit);

    if (!from || !to) return;

    const convertedValue = convertValue(fromValue, from, to);
    setResult(convertedValue);

    // Add to recent conversions only when input value is valid and changed
    if (fromValue !== 0 && !isNaN(fromValue)) {
      addRecentConversion({
        categoryId,
        fromUnitId: fromUnit,
        toUnitId: toUnit,
        value: fromValue,
      });
    }
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(result);
  };

  const handleAddFavorite = () => {
    addFavoriteConversion({
      categoryId,
      fromUnitId: fromUnit,
      toUnitId: toUnit,
    });
    toast({
      title: "Added to favorites",
      description: "Conversion has been added to your favorites.",
    });
  };

  const handleCopyResult = () => {
    const from = units.find((u) => u.id === fromUnit);
    const to = units.find((u) => u.id === toUnit);
    
    if (!from || !to) return;
    
    const text = `${fromValue} ${from.symbol} = ${result.toLocaleString()} ${to.symbol}`;
    navigator.clipboard.writeText(text);
    
    toast({
      title: "Copied",
      description: "Conversion result copied to clipboard.",
    });
  };

  const handleShare = () => {
    const from = units.find((u) => u.id === fromUnit);
    const to = units.find((u) => u.id === toUnit);
    
    if (!from || !to) return;
    
    const text = `${fromValue} ${from.symbol} = ${result.toLocaleString()} ${to.symbol}`;
    
    if (navigator.share) {
      navigator.share({
        title: "Unit Conversion",
        text: text,
      }).catch((err) => {
        console.error("Share failed:", err);
      });
    } else {
      navigator.clipboard.writeText(text);
      toast({
        title: "Copied",
        description: "Share not available. Result copied to clipboard instead.",
      });
    }
  };

  return (
    <Card className="p-6 bg-card shadow-lg animate-fade-in">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row items-center'} gap-3`}>
            <Input
              className="text-xl font-medium w-full"
              type="number"
              value={fromValue}
              onChange={(e) => setFromValue(parseFloat(e.target.value) || 0)}
            />
            <Select value={fromUnit} onValueChange={(value) => setFromUnit(value)}>
              <SelectTrigger className={`${isMobile ? 'w-full' : 'min-w-[180px]'} mt-2 md:mt-0`}>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id}>
                    {unit.name} ({unit.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="relative flex justify-center">
          <Button
            variant="outline"
            size="icon"
            onClick={handleSwap}
            className="rounded-full h-10 w-10 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <ArrowDown className="h-5 w-5" />
          </Button>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dashed border-muted-foreground/40" />
          </div>
        </div>

        <div className="space-y-2">
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row items-center'} gap-3`}>
            <Input
              className="text-xl font-medium bg-muted w-full"
              type="text"
              value={isNaN(result) ? "Invalid value" : result.toLocaleString()}
              readOnly
            />
            <Select value={toUnit} onValueChange={(value) => setToUnit(value)}>
              <SelectTrigger className={`${isMobile ? 'w-full' : 'min-w-[180px]'} mt-2 md:mt-0`}>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id}>
                    {unit.name} ({unit.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" size="icon" onClick={handleCopyResult}>
            <Clipboard className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleAddFavorite}>
            <BookmarkPlus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
