/**
 * Static study data for "Designing for Seismic Safety on the Lebanese Coast —
 * Probabilistic Seismic Hazard and Base-Isolation Assessment for Nuclear Power
 * Plants".
 *
 * Values are representative of the study's framing (PSHA ground-motion
 * parameters, site scenarios, and base-isolation response), not
 * machine-extracted from the source PDF.
 */

export type SiteId = "beirut" | "tripoli" | "sidon" | "tyre";

export type SoilTypeId = "rock" | "stiff" | "soft";

export type ReturnPeriodId = "475" | "975" | "2475";

export interface SiteScenario {
  id: SiteId;
  name: string;
  region: string;
  /** Representative peak ground acceleration (g) at the 2475-yr return period. */
  pga2475: number;
  /** Dominant seismic source / fault proximity framing. */
  source: string;
  description: string;
}

export interface SoilType {
  id: SoilTypeId;
  name: string;
  /** Site amplification factor applied to rock PGA. */
  amplification: number;
  description: string;
}

export interface ReturnPeriod {
  id: ReturnPeriodId;
  years: number;
  /** Probability of exceedance in 50 years (%). */
  exceedance50: number;
  label: string;
  description: string;
}

export interface HazardPoint {
  /** Return period in years. */
  returnPeriod: number;
  /** Peak ground acceleration in g. */
  pga: number;
}

export const SITES: SiteScenario[] = [
  {
    id: "beirut",
    name: "Beirut",
    region: "Central coast",
    pga2475: 0.42,
    source: "Yammouneh fault system, moderate distance",
    description:
      "The capital sits near the Yammouneh fault, the principal active strand of the Levant transform, with a moderate but well-documented hazard.",
  },
  {
    id: "tripoli",
    name: "Tripoli",
    region: "Northern coast",
    pga2475: 0.36,
    source: "Offshore Mount Lebanon thrust, distal",
    description:
      "The northern coast is influenced by offshore thrust structures and the northern Levant transform, with a somewhat lower onshore hazard.",
  },
  {
    id: "sidon",
    name: "Sidon",
    region: "Southern coast",
    pga2475: 0.46,
    source: "Yammouneh + offshore Mount Lebanon thrust",
    description:
      "Southern coastal sites combine onshore and offshore sources, producing one of the higher hazard estimates on the Lebanese coast.",
  },
  {
    id: "tyre",
    name: "Tyre",
    region: "Far southern coast",
    pga2475: 0.49,
    source: "Roum fault + offshore thrust, proximal",
    description:
      "The far south is closest to the Roum fault and offshore thrust segments, yielding the highest representative hazard in this study.",
  },
];

export const SOIL_TYPES: SoilType[] = [
  {
    id: "rock",
    name: "Rock (Site Class B)",
    amplification: 1.0,
    description:
      "Firm rock with minimal site amplification; ground motion is close to the bedrock reference.",
  },
  {
    id: "stiff",
    name: "Stiff Soil (Site Class C)",
    amplification: 1.25,
    description:
      "Dense or stiff soil that moderately amplifies bedrock motion at short periods.",
  },
  {
    id: "soft",
    name: "Soft Soil (Site Class D)",
    amplification: 1.6,
    description:
      "Soft, deep soil that strongly amplifies and lengthens ground motion — the most demanding siting condition.",
  },
];

export const RETURN_PERIODS: ReturnPeriod[] = [
  {
    id: "475",
    years: 475,
    exceedance50: 10,
    label: "475 yr",
    description:
      "Design-basis earthquake for many conventional structures (10% exceedance in 50 years).",
  },
  {
    id: "975",
    years: 975,
    exceedance50: 5,
    label: "975 yr",
    description:
      "Elevated design basis for safety-significant systems (5% exceedance in 50 years).",
  },
  {
    id: "2475",
    years: 2475,
    exceedance50: 2,
    label: "2475 yr",
    description:
      "Seismic design basis for nuclear facilities (2% exceedance in 50 years).",
  },
];

export function getSite(id: SiteId): SiteScenario {
  const site = SITES.find((s) => s.id === id);
  if (!site) throw new Error(`Unknown site: ${id}`);
  return site;
}

export function getSoilType(id: SoilTypeId): SoilType {
  const soil = SOIL_TYPES.find((s) => s.id === id);
  if (!soil) throw new Error(`Unknown soil type: ${id}`);
  return soil;
}

export function getReturnPeriod(id: ReturnPeriodId): ReturnPeriod {
  const rp = RETURN_PERIODS.find((r) => r.id === id);
  if (!rp) throw new Error(`Unknown return period: ${id}`);
  return rp;
}

/**
 * Representative hazard curve for a site: peak ground acceleration (g) as a
 * function of return period, anchored to the site's 2475-yr PGA and scaled
 * through a power-law fit consistent with PSHA framing.
 */
export function hazardCurve(site: SiteScenario): HazardPoint[] {
  const anchor = site.pga2475;
  const points: HazardPoint[] = [
    { returnPeriod: 100, pga: round3(anchor * 0.34) },
    { returnPeriod: 200, pga: round3(anchor * 0.52) },
    { returnPeriod: 475, pga: round3(anchor * 0.68) },
    { returnPeriod: 975, pga: round3(anchor * 0.84) },
    { returnPeriod: 2475, pga: anchor },
    { returnPeriod: 5000, pga: round3(anchor * 1.18) },
    { returnPeriod: 10000, pga: round3(anchor * 1.38) },
  ];
  return points;
}

/**
 * Peak ground acceleration (g) at a given return period for a site, computed
 * from the site's hazard curve via log-log interpolation.
 */
export function pgaAtReturnPeriod(
  site: SiteScenario,
  returnPeriod: number,
): number {
  const curve = hazardCurve(site);
  if (returnPeriod <= curve[0].returnPeriod) return curve[0].pga;
  if (returnPeriod >= curve[curve.length - 1].returnPeriod) {
    return curve[curve.length - 1].pga;
  }
  for (let i = 0; i < curve.length - 1; i++) {
    const a = curve[i];
    const b = curve[i + 1];
    if (returnPeriod >= a.returnPeriod && returnPeriod <= b.returnPeriod) {
      const t =
        (Math.log(returnPeriod) - Math.log(a.returnPeriod)) /
        (Math.log(b.returnPeriod) - Math.log(a.returnPeriod));
      const pga = Math.exp(
        Math.log(a.pga) + t * (Math.log(b.pga) - Math.log(a.pga)),
      );
      return round3(pga);
    }
  }
  return curve[curve.length - 1].pga;
}

/**
 * Site-amplified peak ground acceleration (g) for a site, soil type, and
 * return period.
 */
export function amplifiedPga(
  site: SiteScenario,
  soil: SoilType,
  returnPeriod: number,
): number {
  return round3(pgaAtReturnPeriod(site, returnPeriod) * soil.amplification);
}

/**
 * Seismic intensity ramp index (1-5) used to pick the seismic-N palette token
 * for a given amplified PGA. Thresholds are representative of the study's
 * hazard classification.
 */
export function intensityLevel(pga: number): 1 | 2 | 3 | 4 | 5 {
  if (pga < 0.15) return 1;
  if (pga < 0.3) return 2;
  if (pga < 0.45) return 3;
  if (pga < 0.6) return 4;
  return 5;
}

export const INTENSITY_LABELS: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "Low",
  2: "Moderate",
  3: "High",
  4: "Very High",
  5: "Extreme",
};

export const INTENSITY_DOT_CLASS: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "bg-seismic-1",
  2: "bg-seismic-2",
  3: "bg-seismic-3",
  4: "bg-seismic-4",
  5: "bg-seismic-5",
};

export const INTENSITY_TEXT_CLASS: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "text-seismic-1",
  2: "text-seismic-2",
  3: "text-seismic-3",
  4: "text-seismic-4",
  5: "text-seismic-5",
};

export const INTENSITY_BAR_CLASS: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "bg-seismic-1",
  2: "bg-seismic-2",
  3: "bg-seismic-3",
  4: "bg-seismic-4",
  5: "bg-seismic-5",
};

function round3(value: number): number {
  return Math.round(value * 1000) / 1000;
}
