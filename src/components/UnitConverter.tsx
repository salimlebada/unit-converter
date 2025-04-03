
import { useState } from "react";
import { ConversionForm } from "@/components/ConversionForm";
import { CategorySelect } from "@/components/CategorySelect";
import { RecentConversions } from "@/components/RecentConversions";
import { conversionCategories, findCategoryById } from "@/utils/conversions";

export function UnitConverter() {
  const [selectedCategory, setSelectedCategory] = useState(conversionCategories[0].id);
  const category = findCategoryById(selectedCategory);
  
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleConversionSelect = (conversion: {
    categoryId: string;
    fromUnitId: string;
    toUnitId: string;
    value: number;
  }) => {
    setSelectedCategory(conversion.categoryId);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-center">Unit Converter</h1>
      <p className="text-muted-foreground mb-8 text-center">
        Convert between different units of measurement
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <CategorySelect 
            categories={conversionCategories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
          
          {category && (
            <ConversionForm 
              categoryId={category.id}
              units={category.units}
            />
          )}
        </div>
        
        <div className="md:col-span-1">
          <RecentConversions onSelect={handleConversionSelect} />
        </div>
      </div>
    </div>
  );
}
