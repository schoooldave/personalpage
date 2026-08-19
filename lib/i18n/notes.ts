import { fieldNoteJudgments, fieldNotes, systemProcessNote } from "../portfolio";
import type { Locale } from "./config";

const continuousUseNote = {
  slug: "continuous-use",
  title: "上线不等于持续使用",
  body: "系统完成上线，只代表功能进入了组织。真正的改变还取决于流程、角色和管理机制是否能够持续推动使用。",
  track: [
    { label: "部署", note: "功能进入组织，完成技术交付。" },
    { label: "使用", note: "角色愿意进入流程并持续操作。" },
    { label: "采用", note: "系统成为日常业务与管理的一部分。" },
  ],
  sections: [],
} as const;

const aiOutlookNote = {
  slug: "ai-outlook",
  title: "从真实业务问题，走向下一代工作方式",
  judgment: "让 AI 理解业务现场、辅助判断，并推动下一步行动。",
  sections: [],
} as const;

const source = { fieldNotes, systemProcessNote, continuousUseNote, aiOutlookNote, fieldNoteJudgments };

// The locale-specific article copy is filled page by page. Keeping one typed source
// during the route migration prevents article components from losing their shape.
export const localizedNotes: Record<Locale, typeof source> = {
  "zh-CN": source,
  en: source,
  ja: source,
};
