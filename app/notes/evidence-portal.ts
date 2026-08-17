export type EvidencePortalPhase = "closed" | "opening" | "open" | "closing";

export interface EvidencePortalState {
  phase: EvidencePortalPhase;
  savedScrollY: number | null;
  reducedMotion: boolean;
}

export function createEvidencePortalState(
  reducedMotion = false,
): EvidencePortalState {
  return {
    phase: "closed",
    savedScrollY: null,
    reducedMotion,
  };
}

export function openEvidencePortal(
  state: EvidencePortalState,
  scrollY: number,
): EvidencePortalState {
  if (state.phase !== "closed") return state;

  return {
    ...state,
    phase: state.reducedMotion ? "open" : "opening",
    savedScrollY: scrollY,
  };
}

export function closeEvidencePortal(
  state: EvidencePortalState,
): EvidencePortalState {
  if (state.phase !== "open" && state.phase !== "opening") return state;

  return {
    ...state,
    phase: state.reducedMotion ? "closed" : "closing",
  };
}

export function completeEvidencePortalTransition(
  state: EvidencePortalState,
): EvidencePortalState {
  if (state.phase === "opening") return { ...state, phase: "open" };
  if (state.phase === "closing") return { ...state, phase: "closed" };
  return state;
}
