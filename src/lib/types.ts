export type Stop = { id: number; name: string; lng: number; lat: number };
export type RouteRun = { order: number[]; km: number; min: number; geometry: number[][] };
export type Routing = { depot: [number, number]; stops: Stop[]; naive: RouteRun; optimized: RouteRun };
export type Candidate = { id: "A" | "B" | "C"; name: string; lng: number; lat: number };
export type Hex = { h: string; demand: number; t: Record<Candidate["id"], number | null>; boundary: number[][] };
export type H3Data = { candidates: Candidate[]; hexes: Hex[] };
