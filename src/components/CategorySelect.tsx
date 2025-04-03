
import { useState } from "react";
import { ConversionCategory } from "@/utils/conversions";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategorySelectProps {
  categories: ConversionCategory[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategorySelect({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategorySelectProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredCategories = categories.filter(
    (category) => category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-10"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
        {filteredCategories.map((category) => (
          <Card
            key={category.id}
            className={cn(
              "p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow",
              selectedCategory === category.id
                ? "bg-primary/10 border-primary"
                : "bg-card hover:bg-secondary/50"
            )}
            onClick={() => onCategoryChange(category.id)}
          >
            <div className={`${category.color} p-3 rounded-full mb-3`}>
              <span className="text-white font-medium">{category.icon.charAt(0).toUpperCase()}</span>
            </div>
            <span className="font-medium text-center">{category.name}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}
