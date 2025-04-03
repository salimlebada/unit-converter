
// Define the conversion types
export type ConversionCategory = {
  id: string;
  name: string;
  icon: string;
  units: Unit[];
  color: string;
};

export type Unit = {
  id: string;
  name: string;
  symbol: string;
  conversionToBase: (value: number) => number;
  conversionFromBase: (value: number) => number;
};

// Length conversions
const lengthUnits: Unit[] = [
  {
    id: "millimeter",
    name: "Millimeter",
    symbol: "mm",
    conversionToBase: (value: number) => value / 1000,
    conversionFromBase: (value: number) => value * 1000,
  },
  {
    id: "centimeter",
    name: "Centimeter",
    symbol: "cm",
    conversionToBase: (value: number) => value / 100,
    conversionFromBase: (value: number) => value * 100,
  },
  {
    id: "meter",
    name: "Meter",
    symbol: "m",
    conversionToBase: (value: number) => value,
    conversionFromBase: (value: number) => value,
  },
  {
    id: "kilometer",
    name: "Kilometer",
    symbol: "km",
    conversionToBase: (value: number) => value * 1000,
    conversionFromBase: (value: number) => value / 1000,
  },
  {
    id: "inch",
    name: "Inch",
    symbol: "in",
    conversionToBase: (value: number) => value * 0.0254,
    conversionFromBase: (value: number) => value / 0.0254,
  },
  {
    id: "foot",
    name: "Foot",
    symbol: "ft",
    conversionToBase: (value: number) => value * 0.3048,
    conversionFromBase: (value: number) => value / 0.3048,
  },
  {
    id: "yard",
    name: "Yard",
    symbol: "yd",
    conversionToBase: (value: number) => value * 0.9144,
    conversionFromBase: (value: number) => value / 0.9144,
  },
  {
    id: "mile",
    name: "Mile",
    symbol: "mi",
    conversionToBase: (value: number) => value * 1609.344,
    conversionFromBase: (value: number) => value / 1609.344,
  },
];

// Weight conversions
const weightUnits: Unit[] = [
  {
    id: "milligram",
    name: "Milligram",
    symbol: "mg",
    conversionToBase: (value: number) => value / 1000000,
    conversionFromBase: (value: number) => value * 1000000,
  },
  {
    id: "gram",
    name: "Gram",
    symbol: "g",
    conversionToBase: (value: number) => value / 1000,
    conversionFromBase: (value: number) => value * 1000,
  },
  {
    id: "kilogram",
    name: "Kilogram",
    symbol: "kg",
    conversionToBase: (value: number) => value,
    conversionFromBase: (value: number) => value,
  },
  {
    id: "ton",
    name: "Metric Ton",
    symbol: "t",
    conversionToBase: (value: number) => value * 1000,
    conversionFromBase: (value: number) => value / 1000,
  },
  {
    id: "ounce",
    name: "Ounce",
    symbol: "oz",
    conversionToBase: (value: number) => value * 0.0283495,
    conversionFromBase: (value: number) => value / 0.0283495,
  },
  {
    id: "pound",
    name: "Pound",
    symbol: "lb",
    conversionToBase: (value: number) => value * 0.453592,
    conversionFromBase: (value: number) => value / 0.453592,
  },
  {
    id: "stone",
    name: "Stone",
    symbol: "st",
    conversionToBase: (value: number) => value * 6.35029,
    conversionFromBase: (value: number) => value / 6.35029,
  },
  {
    id: "us-ton",
    name: "US Ton",
    symbol: "US t",
    conversionToBase: (value: number) => value * 907.185,
    conversionFromBase: (value: number) => value / 907.185,
  },
];

// Area conversions
const areaUnits: Unit[] = [
  {
    id: "square-meter",
    name: "Square Meter",
    symbol: "m²",
    conversionToBase: (value: number) => value,
    conversionFromBase: (value: number) => value,
  },
  {
    id: "square-kilometer",
    name: "Square Kilometer",
    symbol: "km²",
    conversionToBase: (value: number) => value * 1000000,
    conversionFromBase: (value: number) => value / 1000000,
  },
  {
    id: "hectare",
    name: "Hectare",
    symbol: "ha",
    conversionToBase: (value: number) => value * 10000,
    conversionFromBase: (value: number) => value / 10000,
  },
  {
    id: "square-foot",
    name: "Square Foot",
    symbol: "ft²",
    conversionToBase: (value: number) => value * 0.092903,
    conversionFromBase: (value: number) => value / 0.092903,
  },
  {
    id: "square-yard",
    name: "Square Yard",
    symbol: "yd²",
    conversionToBase: (value: number) => value * 0.836127,
    conversionFromBase: (value: number) => value / 0.836127,
  },
  {
    id: "acre",
    name: "Acre",
    symbol: "ac",
    conversionToBase: (value: number) => value * 4046.86,
    conversionFromBase: (value: number) => value / 4046.86,
  },
  {
    id: "square-mile",
    name: "Square Mile",
    symbol: "mi²",
    conversionToBase: (value: number) => value * 2589988.11,
    conversionFromBase: (value: number) => value / 2589988.11,
  },
];

// Volume conversions
const volumeUnits: Unit[] = [
  {
    id: "milliliter",
    name: "Milliliter",
    symbol: "ml",
    conversionToBase: (value: number) => value / 1000,
    conversionFromBase: (value: number) => value * 1000,
  },
  {
    id: "liter",
    name: "Liter",
    symbol: "L",
    conversionToBase: (value: number) => value,
    conversionFromBase: (value: number) => value,
  },
  {
    id: "cubic-meter",
    name: "Cubic Meter",
    symbol: "m³",
    conversionToBase: (value: number) => value * 1000,
    conversionFromBase: (value: number) => value / 1000,
  },
  {
    id: "us-fluid-ounce",
    name: "US Fluid Ounce",
    symbol: "fl oz",
    conversionToBase: (value: number) => value * 0.0295735,
    conversionFromBase: (value: number) => value / 0.0295735,
  },
  {
    id: "us-cup",
    name: "US Cup",
    symbol: "cup",
    conversionToBase: (value: number) => value * 0.236588,
    conversionFromBase: (value: number) => value / 0.236588,
  },
  {
    id: "us-pint",
    name: "US Pint",
    symbol: "pt",
    conversionToBase: (value: number) => value * 0.473176,
    conversionFromBase: (value: number) => value / 0.473176,
  },
  {
    id: "us-gallon",
    name: "US Gallon",
    symbol: "gal",
    conversionToBase: (value: number) => value * 3.78541,
    conversionFromBase: (value: number) => value / 3.78541,
  },
  {
    id: "imperial-gallon",
    name: "Imperial Gallon",
    symbol: "imp gal",
    conversionToBase: (value: number) => value * 4.54609,
    conversionFromBase: (value: number) => value / 4.54609,
  },
];

// Time conversions
const timeUnits: Unit[] = [
  {
    id: "millisecond",
    name: "Millisecond",
    symbol: "ms",
    conversionToBase: (value: number) => value / 1000,
    conversionFromBase: (value: number) => value * 1000,
  },
  {
    id: "second",
    name: "Second",
    symbol: "s",
    conversionToBase: (value: number) => value,
    conversionFromBase: (value: number) => value,
  },
  {
    id: "minute",
    name: "Minute",
    symbol: "min",
    conversionToBase: (value: number) => value * 60,
    conversionFromBase: (value: number) => value / 60,
  },
  {
    id: "hour",
    name: "Hour",
    symbol: "h",
    conversionToBase: (value: number) => value * 3600,
    conversionFromBase: (value: number) => value / 3600,
  },
  {
    id: "day",
    name: "Day",
    symbol: "d",
    conversionToBase: (value: number) => value * 86400,
    conversionFromBase: (value: number) => value / 86400,
  },
  {
    id: "week",
    name: "Week",
    symbol: "wk",
    conversionToBase: (value: number) => value * 604800,
    conversionFromBase: (value: number) => value / 604800,
  },
  {
    id: "month",
    name: "Month (avg)",
    symbol: "mo",
    conversionToBase: (value: number) => value * 2629746,
    conversionFromBase: (value: number) => value / 2629746,
  },
  {
    id: "year",
    name: "Year",
    symbol: "yr",
    conversionToBase: (value: number) => value * 31556952,
    conversionFromBase: (value: number) => value / 31556952,
  },
];

// Temperature conversions
const temperatureUnits: Unit[] = [
  {
    id: "celsius",
    name: "Celsius",
    symbol: "°C",
    conversionToBase: (value: number) => value,
    conversionFromBase: (value: number) => value,
  },
  {
    id: "fahrenheit",
    name: "Fahrenheit",
    symbol: "°F",
    conversionToBase: (value: number) => (value - 32) * (5 / 9),
    conversionFromBase: (value: number) => value * (9 / 5) + 32,
  },
  {
    id: "kelvin",
    name: "Kelvin",
    symbol: "K",
    conversionToBase: (value: number) => value - 273.15,
    conversionFromBase: (value: number) => value + 273.15,
  },
];

// Export all categories
export const conversionCategories: ConversionCategory[] = [
  {
    id: "length",
    name: "Length",
    icon: "ruler",
    units: lengthUnits,
    color: "bg-blue-500",
  },
  {
    id: "weight",
    name: "Weight",
    icon: "weight",
    units: weightUnits,
    color: "bg-green-500",
  },
  {
    id: "area",
    name: "Area",
    icon: "square",
    units: areaUnits,
    color: "bg-purple-500",
  },
  {
    id: "volume",
    name: "Volume",
    icon: "droplet",
    units: volumeUnits,
    color: "bg-cyan-500",
  },
  {
    id: "time",
    name: "Time",
    icon: "clock",
    units: timeUnits,
    color: "bg-orange-500",
  },
  {
    id: "temperature",
    name: "Temperature",
    icon: "thermometer",
    units: temperatureUnits,
    color: "bg-red-500",
  },
];

// Helper function to convert between units
export const convertValue = (
  value: number,
  fromUnit: Unit,
  toUnit: Unit
): number => {
  // Special case for temperature (requires direct conversion)
  if (
    (fromUnit.id.includes("celsius") ||
      fromUnit.id.includes("fahrenheit") ||
      fromUnit.id.includes("kelvin")) &&
    (toUnit.id.includes("celsius") ||
      toUnit.id.includes("fahrenheit") ||
      toUnit.id.includes("kelvin"))
  ) {
    const baseValue = fromUnit.conversionToBase(value);
    return toUnit.conversionFromBase(baseValue);
  }

  // Standard conversion through base unit
  const baseValue = fromUnit.conversionToBase(value);
  return toUnit.conversionFromBase(baseValue);
};

// Function to find a unit by ID
export const findUnitById = (unitId: string): Unit | undefined => {
  for (const category of conversionCategories) {
    const unit = category.units.find((u) => u.id === unitId);
    if (unit) return unit;
  }
  return undefined;
};

// Function to find a category by ID
export const findCategoryById = (categoryId: string): ConversionCategory | undefined => {
  return conversionCategories.find((c) => c.id === categoryId);
};
