
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Bookmark, Clock, Trash2 } from "lucide-react";
import { useConversionContext, RecentConversion } from "@/context/ConversionContext";
import { findCategoryById, findUnitById } from "@/utils/conversions";

interface RecentConversionsProps {
  onSelect: (conversion: {
    categoryId: string;
    fromUnitId: string;
    toUnitId: string;
    value: number;
  }) => void;
}

export function RecentConversions({ onSelect }: RecentConversionsProps) {
  const { recentConversions, favoriteConversions, clearRecentConversions, removeFavoriteConversion } = useConversionContext();
  const [activeTab, setActiveTab] = useState("recent");

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderConversionItem = (conversion: RecentConversion, isFavorite = false) => {
    const category = findCategoryById(conversion.categoryId);
    const fromUnit = findUnitById(conversion.fromUnitId);
    const toUnit = findUnitById(conversion.toUnitId);

    if (!category || !fromUnit || !toUnit) return null;

    const result = (fromUnit && toUnit) ? 
      toUnit.conversionFromBase(fromUnit.conversionToBase(conversion.value)) : 
      0;

    return (
      <Card
        key={conversion.id}
        className="p-4 mb-2 cursor-pointer hover:bg-secondary/50 transition-colors"
        onClick={() => onSelect({
          categoryId: conversion.categoryId,
          fromUnitId: conversion.fromUnitId,
          toUnitId: conversion.toUnitId,
          value: conversion.value,
        })}
      >
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium">
              {conversion.value} {fromUnit.symbol} = {result.toLocaleString()} {toUnit.symbol}
            </div>
            <div className="text-sm text-muted-foreground">
              {category.name} • {isFavorite ? "" : formatDate(conversion.timestamp)}
            </div>
          </div>
          {isFavorite && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                removeFavoriteConversion(conversion.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="mt-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Recent</span>
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center gap-2">
            <Bookmark className="h-4 w-4" />
            <span>Favorites</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="mt-4">
          {recentConversions.length > 0 ? (
            <>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {recentConversions.map((conversion) => renderConversionItem(conversion))}
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearRecentConversions();
                  }}
                >
                  Clear History
                </Button>
              </div>
            </>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              Your recent conversions will appear here
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="favorites" className="mt-4">
          {favoriteConversions.length > 0 ? (
            <div className="max-h-64 overflow-y-auto space-y-2">
              {favoriteConversions.map((favorite) => {
                // Convert to RecentConversion format for rendering
                const recentFormat: RecentConversion = {
                  ...favorite,
                  value: 1, // Default value
                  timestamp: 0,
                };
                return renderConversionItem(recentFormat, true);
              })}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              Save your favorite conversions for quick access
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
