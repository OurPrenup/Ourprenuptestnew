// =============================================================================
// Research Depth — user-facing messages and metadata
// =============================================================================

import type { ResearchDepth } from "./types";

export interface ResearchDepthInfo {
  level: ResearchDepth;
  label: string;
  color: "green" | "yellow" | "orange";
  message: string;
  shortMessage: string;
}

const DEPTH_INFO: Record<ResearchDepth, ResearchDepthInfo> = {
  deeply_researched: {
    level: "deeply_researched",
    label: "Deeply Researched",
    color: "green",
    message:
      "Built on thoroughly researched state law including statutes, case law, and recent amendments. Our platform has been specifically tailored to your state's requirements.",
    shortMessage: "Thoroughly researched state law",
  },
  verified: {
    level: "verified",
    label: "Verified",
    color: "green",
    message:
      "Built on verified state law with statute review and case law analysis. Our platform accurately reflects your state's requirements.",
    shortMessage: "Verified state law",
  },
  partially_verified: {
    level: "partially_verified",
    label: "Partially Verified",
    color: "yellow",
    message:
      "Follows established legal framework with targeted verification. Attorney review recommended to confirm all state-specific requirements are met.",
    shortMessage: "Attorney review recommended",
  },
  needs_verification: {
    level: "needs_verification",
    label: "General Framework",
    color: "orange",
    message:
      "Based on general prenuptial agreement framework research. We strongly recommend having an attorney licensed in your state review this agreement before signing.",
    shortMessage: "Attorney review strongly recommended",
  },
};

export function getResearchDepthInfo(depth: ResearchDepth): ResearchDepthInfo {
  return DEPTH_INFO[depth];
}
