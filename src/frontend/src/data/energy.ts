export type EnergySourceId =
  | "nuclear"
  | "coal"
  | "diesel"
  | "solar"
  | "wind-onshore"
  | "wind-offshore";

export type DimensionId =
  | "fuel"
  | "devices"
  | "co2"
  | "land"
  | "cost"
  | "safety";

export interface DimensionValue {
  /** Per-GWe baseline value at 1 GWe. */
  value: number;
  /** Unit label, e.g. "tonnes/yr". */
  unit: string;
  /** Qualitative explanation consistent with the study framing. */
  note: string;
}

export interface EnergySource {
  id: EnergySourceId;
  name: string;
  shortName: string;
  /** Tailwind chart token name, e.g. "chart-1". */
  color: string;
  /** Literal Tailwind classes for the source color (picked up by JIT). */
  dotClass: string;
  textClass: string;
  barClass: string;
  tagline: string;
  description: string;
  /** Lifetime in years, used for CO2 lifetime totals. */
  lifetimeYears: number;
  dimensions: Record<DimensionId, DimensionValue>;
}

export interface DimensionMeta {
  id: DimensionId;
  label: string;
  shortLabel: string;
  description: string;
  unit: string;
  /** true when a higher value is better (e.g. safety). */
  higherIsBetter: boolean;
}

/** Selectable reactor capacities in GWe. */
export const GWE_OPTIONS = [1, 2, 3] as const;
export type GweOption = (typeof GWE_OPTIONS)[number];

export const DIMENSIONS: DimensionMeta[] = [
  {
    id: "fuel",
    label: "Fuel Requirements",
    shortLabel: "Fuel",
    description:
      "The quantity of fuel each technology must consume each year to deliver the selected capacity.",
    unit: "tonnes/yr",
    higherIsBetter: false,
  },
  {
    id: "devices",
    label: "Device Count",
    shortLabel: "Devices",
    description:
      "The number of reactors, plants, panels, or turbines required to deliver the selected capacity.",
    unit: "units",
    higherIsBetter: false,
  },
  {
    id: "co2",
    label: "CO₂ Emissions",
    shortLabel: "CO₂",
    description:
      "Annual and lifetime carbon dioxide emissions for the selected capacity.",
    unit: "tonnes/yr",
    higherIsBetter: false,
  },
  {
    id: "land",
    label: "Land Area",
    shortLabel: "Land",
    description:
      "The physical land footprint required to site and operate each technology.",
    unit: "km²",
    higherIsBetter: false,
  },
  {
    id: "cost",
    label: "Levelized Cost of Energy",
    shortLabel: "LCOE",
    description:
      "The levelized cost of energy (LCOE) — the average cost per unit of electricity over the source's lifetime, including capital, fuel, and operating costs.",
    unit: "cents/kWh",
    higherIsBetter: false,
  },
  {
    id: "safety",
    label: "Safety",
    shortLabel: "Safety",
    description:
      "The relative safety profile of each technology, including accident and health risk.",
    unit: "idx",
    higherIsBetter: true,
  },
];

export const ENERGY_SOURCES: EnergySource[] = [
  {
    id: "nuclear",
    name: "Nuclear",
    shortName: "Nuclear",
    color: "chart-1",
    dotClass: "bg-chart-1",
    textClass: "text-chart-1",
    barClass: "bg-chart-1",
    tagline: "Very low carbon, very low land, high upfront cost",
    description:
      "Fission delivers dense, dispatchable power with near-zero emissions and a tiny footprint, but demands heavy upfront infrastructure and carries persistent safety and waste concerns.",
    lifetimeYears: 40,
    dimensions: {
      fuel: {
        value: 1.16,
        unit: "tonnes/yr",
        note: "U-235 consumed per year at 1 GWe.",
      },
      devices: {
        value: 1,
        unit: "reactor",
        note: "A single reactor delivers 1 GWe.",
      },
      co2: {
        value: 99600,
        unit: "tonnes/yr",
        note: "Near-zero operational emissions; lifecycle footprint is minimal.",
      },
      land: {
        value: 1,
        unit: "km²",
        note: "Very compact footprint relative to output.",
      },
      cost: {
        value: 4.15,
        unit: "cents/kWh",
        note: "High upfront infrastructure cost, but very low fuel and operating costs over a long lifetime.",
      },
      safety: {
        value: 42,
        unit: "idx",
        note: "Safety concerns persist despite strong operational records.",
      },
    },
  },
  {
    id: "coal",
    name: "Coal",
    shortName: "Coal",
    color: "chart-2",
    dotClass: "bg-chart-2",
    textClass: "text-chart-2",
    barClass: "bg-chart-2",
    tagline: "High carbon, high fuel, moderate everything else",
    description:
      "Coal is cheap and abundant but among the most carbon-intensive and fuel-hungry sources, with a large mining and transport footprint.",
    lifetimeYears: 35,
    dimensions: {
      fuel: {
        value: 3780000,
        unit: "tonnes/yr",
        note: "Very high fuel consumption; continuous coal supply needed.",
      },
      devices: {
        value: 1,
        unit: "plant",
        note: "A single coal plant delivers 1 GWe.",
      },
      co2: {
        value: 9290000,
        unit: "tonnes/yr",
        note: "Highest lifecycle emissions of any source.",
      },
      land: {
        value: 42,
        unit: "km²",
        note: "Moderate footprint plus mining land.",
      },
      cost: {
        value: 12.6,
        unit: "cents/kWh",
        note: "Low capital but high ongoing fuel cost.",
      },
      safety: {
        value: 62,
        unit: "idx",
        note: "Occupational and air-quality health risks.",
      },
    },
  },
  {
    id: "diesel",
    name: "Diesel",
    shortName: "Diesel",
    color: "chart-3",
    dotClass: "bg-chart-3",
    textClass: "text-chart-3",
    barClass: "bg-chart-3",
    tagline: "High carbon, high fuel, low land, high fuel cost",
    description:
      "Diesel generators are flexible and compact but burn expensive fuel and emit heavily, making them a costly, high-carbon stopgap.",
    lifetimeYears: 20,
    dimensions: {
      fuel: {
        value: 1990000,
        unit: "tonnes/yr",
        note: "High fuel consumption; expensive refined diesel.",
      },
      devices: {
        value: 1,
        unit: "plant",
        note: "A genset farm delivers 1 GWe.",
      },
      co2: {
        value: 6190000,
        unit: "tonnes/yr",
        note: "Very high emissions per unit of power.",
      },
      land: {
        value: 14,
        unit: "km²",
        note: "Very small footprint per unit.",
      },
      cost: {
        value: 30.6,
        unit: "cents/kWh",
        note: "High fuel cost dominates the economics.",
      },
      safety: {
        value: 56,
        unit: "idx",
        note: "Fuel handling and air-quality risks.",
      },
    },
  },
  {
    id: "solar",
    name: "Solar",
    shortName: "Solar",
    color: "chart-4",
    dotClass: "bg-chart-4",
    textClass: "text-chart-4",
    barClass: "bg-chart-4",
    tagline: "Very low carbon, very high land, variable output",
    description:
      "Solar is clean and increasingly cheap, but needs vast land and produces variable output that depends on sunlight.",
    lifetimeYears: 30,
    dimensions: {
      fuel: {
        value: 0,
        unit: "tonnes/yr",
        note: "Free sunlight; no fuel consumed.",
      },
      devices: {
        value: 12600000,
        unit: "panels",
        note: "Panels required to deliver 1 GWe.",
      },
      co2: {
        value: 339000,
        unit: "tonnes/yr",
        note: "Very low lifecycle emissions.",
      },
      land: {
        value: 88,
        unit: "km²",
        note: "Very high land footprint per unit of output.",
      },
      cost: {
        value: 3.16,
        unit: "cents/kWh",
        note: "Falling capital cost; storage adds expense.",
      },
      safety: {
        value: 92,
        unit: "idx",
        note: "Very safe; minimal operational risk.",
      },
    },
  },
  {
    id: "wind-onshore",
    name: "Wind (Onshore)",
    shortName: "Wind Onshore",
    color: "chart-5",
    dotClass: "bg-chart-5",
    textClass: "text-chart-5",
    barClass: "bg-chart-5",
    tagline: "Very low carbon, very high land, variable output",
    description:
      "Onshore wind is clean and low-cost to run, but requires extensive land and produces variable output tied to weather.",
    lifetimeYears: 25,
    dimensions: {
      fuel: {
        value: 0,
        unit: "tonnes/yr",
        note: "Free wind; no fuel consumed.",
      },
      devices: {
        value: 1076,
        unit: "turbines",
        note: "2 MW turbines required to deliver 1 GWe.",
      },
      co2: {
        value: 91200,
        unit: "tonnes/yr",
        note: "Very low lifecycle emissions.",
      },
      land: {
        value: 82,
        unit: "km²",
        note: "Very high land footprint per unit of output.",
      },
      cost: {
        value: 3.8,
        unit: "cents/kWh",
        note: "Low operating cost; moderate capital.",
      },
      safety: {
        value: 94,
        unit: "idx",
        note: "Very safe; minimal operational risk.",
      },
    },
  },
  {
    id: "wind-offshore",
    name: "Wind (Offshore)",
    shortName: "Wind Offshore",
    color: "chart-6",
    dotClass: "bg-chart-6",
    textClass: "text-chart-6",
    barClass: "bg-chart-6",
    tagline: "Very low carbon, higher output, higher cost",
    description:
      "Offshore wind captures stronger, steadier winds with larger turbines, but at higher capital cost and with marine logistics.",
    lifetimeYears: 22,
    dimensions: {
      fuel: {
        value: 0,
        unit: "tonnes/yr",
        note: "Free wind; no fuel consumed.",
      },
      devices: {
        value: 228,
        unit: "turbines",
        note: "8 MW turbines required to deliver 1 GWe.",
      },
      co2: {
        value: 116300,
        unit: "tonnes/yr",
        note: "Very low lifecycle emissions.",
      },
      land: {
        value: 60,
        unit: "km²",
        note: "Marine footprint; no onshore land.",
      },
      cost: {
        value: 10.5,
        unit: "cents/kWh",
        note: "Higher capital cost than onshore wind.",
      },
      safety: {
        value: 94,
        unit: "idx",
        note: "Very safe; minimal operational risk.",
      },
    },
  },
];

export function getSource(id: EnergySourceId): EnergySource {
  const source = ENERGY_SOURCES.find((s) => s.id === id);
  if (!source) throw new Error(`Unknown energy source: ${id}`);
  return source;
}

/**
 * Scale a source's per-GWe baseline value to the selected reactor capacity.
 * All outputs scale linearly with GWe.
 */
export function scaleForGwe(
  source: { dimensions: Record<DimensionId, DimensionValue> },
  dimension: DimensionId,
  gwe: number,
): number {
  return source.dimensions[dimension].value * gwe;
}

/** Lifetime CO2 total (tonnes) for a source at the selected capacity. */
export function co2Lifetime(
  source: {
    dimensions: Record<DimensionId, DimensionValue>;
    lifetimeYears: number;
  },
  gwe: number,
): number {
  return source.dimensions.co2.value * source.lifetimeYears * gwe;
}

/** Nuclear fission output at the selected capacity (GWe). */
export function nuclearOutput(gwe: number): {
  energyTwh: number;
  uraniumTonnes: number;
} {
  return {
    energyTwh: 8.3 * gwe,
    uraniumTonnes: 1.16 * gwe,
  };
}

export interface DeathRateSource {
  id: string;
  name: string;
  shortName: string;
  /** Tailwind chart token name, e.g. "chart-1". */
  color: string;
  dotClass: string;
  textClass: string;
  barClass: string;
  /** Deaths per TWh of electricity generated. */
  deathsPerTwh: number;
  /** Optional note shown under the source row. */
  note?: string;
}

/**
 * Death rates per TWh of electricity generated, drawn from the study's
 * safety comparison. Wind combines onshore and offshore because the datasets
 * draw from global wind turbine accidents across all turbines and locations.
 */
export const DEATH_RATES: DeathRateSource[] = [
  {
    id: "nuclear",
    name: "Nuclear",
    shortName: "Nuclear",
    color: "chart-1",
    dotClass: "bg-chart-1",
    textClass: "text-chart-1",
    barClass: "bg-chart-1",
    deathsPerTwh: 0.03,
  },
  {
    id: "coal",
    name: "Coal",
    shortName: "Coal",
    color: "chart-2",
    dotClass: "bg-chart-2",
    textClass: "text-chart-2",
    barClass: "bg-chart-2",
    deathsPerTwh: 24.62,
  },
  {
    id: "diesel",
    name: "Diesel",
    shortName: "Diesel",
    color: "chart-3",
    dotClass: "bg-chart-3",
    textClass: "text-chart-3",
    barClass: "bg-chart-3",
    deathsPerTwh: 18.43,
  },
  {
    id: "solar",
    name: "Solar",
    shortName: "Solar",
    color: "chart-4",
    dotClass: "bg-chart-4",
    textClass: "text-chart-4",
    barClass: "bg-chart-4",
    deathsPerTwh: 0.02,
  },
  {
    id: "wind",
    name: "Wind",
    shortName: "Wind",
    color: "chart-5",
    dotClass: "bg-chart-5",
    textClass: "text-chart-5",
    barClass: "bg-chart-5",
    deathsPerTwh: 0.04,
    note: "Onshore and offshore wind are combined, since the datasets draw from global wind turbine accidents across all turbines and locations.",
  },
];

/**
 * Total deaths for a source at the selected capacity. Energy produced is
 * 8.3 × G TWh/year, so total deaths = deaths per TWh × (8.3 × G).
 */
export function deathTotal(source: DeathRateSource, gwe: number): number {
  return source.deathsPerTwh * 8.3 * gwe;
}

/** Deaths per TWh for an energy source id (wind sources share the combined rate). */
function deathRateForSource(id: EnergySourceId): number {
  if (id === "wind-onshore" || id === "wind-offshore") {
    const wind = DEATH_RATES.find((d) => d.id === "wind");
    return wind ? wind.deathsPerTwh : 0;
  }
  const rate = DEATH_RATES.find((d) => d.id === id);
  return rate ? rate.deathsPerTwh : 0;
}

/** A source as rendered in the comparison tool. */
export interface ComparisonSource {
  id: string;
  name: string;
  shortName: string;
  color: string;
  dotClass: string;
  textClass: string;
  barClass: string;
  tagline: string;
  description: string;
  lifetimeYears: number;
  dimensions: Record<DimensionId, DimensionValue>;
  /** Deaths per TWh of electricity generated. */
  deathsPerTwh: number;
  /** Optional note shown under the row. */
  note?: string;
}

/**
 * The comparison tool keeps onshore and offshore wind as separate rows.
 * They share the same combined wind death-rate dataset, but retain their
 * own device, CO2, land, cost, and other study values.
 */
export function comparisonSources(): ComparisonSource[] {
  return ENERGY_SOURCES.map((source) => ({
    ...source,
    deathsPerTwh: deathRateForSource(source.id),
  }));
}

/** Deaths per year for a comparison source at the selected capacity. */
export function deathPerYear(source: ComparisonSource, gwe: number): number {
  return source.deathsPerTwh * 8.3 * gwe;
}
