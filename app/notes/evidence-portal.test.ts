import { describe, expect, it } from "vitest";

import {
  closeEvidencePortal,
  completeEvidencePortalTransition,
  createEvidencePortalState,
  openEvidencePortal,
} from "./evidence-portal";

describe("evidence portal state", () => {
  it("transitions from closed to opening to open", () => {
    const closed = createEvidencePortalState();
    const opening = openEvidencePortal(closed, 384);

    expect(closed.phase).toBe("closed");
    expect(opening).toMatchObject({ phase: "opening", savedScrollY: 384 });
    expect(completeEvidencePortalTransition(opening).phase).toBe("open");
  });

  it("transitions from open to closing to closed", () => {
    const open = completeEvidencePortalTransition(
      openEvidencePortal(createEvidencePortalState(), 384),
    );

    const closing = closeEvidencePortal(open);

    expect(closing.phase).toBe("closing");
    expect(completeEvidencePortalTransition(closing)).toMatchObject({
      phase: "closed",
      savedScrollY: 384,
    });
  });

  it("allows closing while the portal is opening", () => {
    const opening = openEvidencePortal(createEvidencePortalState(), 912);

    expect(closeEvidencePortal(opening)).toMatchObject({
      phase: "closing",
      savedScrollY: 912,
    });
  });

  it("skips animated phases when reduced motion is preferred", () => {
    const closed = createEvidencePortalState(true);
    const open = openEvidencePortal(closed, 128);

    expect(open).toMatchObject({ phase: "open", savedScrollY: 128, reducedMotion: true });
    expect(closeEvidencePortal(open)).toMatchObject({
      phase: "closed",
      savedScrollY: 128,
      reducedMotion: true,
    });
  });
});
