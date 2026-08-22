import type { Category } from "./questions";
import type { GuideSection } from "./sshGuides";
import { sshGuides } from "./sshGuides";

/** Metadata for each tool's tutorial content. */
export interface ToolGuide {
  /** The tool's category key. */
  category: Category;
  /** Display label. */
  label: string;
  /** Short description shown in the picker. */
  description: string;
  /** Emoji icon. */
  icon: string;
  /** The guide sections for this tool. */
  sections: GuideSection[];
  /** Whether the guide is ready or coming soon. */
  available: boolean;
}

/**
 * Registry of all tools that have (or will have) tutorial content.
 * Tools without guides yet are marked as coming soon.
 */
export const guideRegistry: ToolGuide[] = [
  {
    category: "ssh",
    label: "SSH",
    description: "remote shells, keys, tunnels, and hardening",
    icon: "🔑",
    sections: sshGuides,
    available: true,
  },
  {
    category: "vim",
    label: "Vim",
    description: "modal editing, motions, and text objects",
    icon: "📝",
    sections: [],
    available: false,
  },
  {
    category: "tmux",
    label: "Tmux",
    description: "sessions, panes, windows, and buffers",
    icon: "🖥",
    sections: [],
    available: false,
  },
  {
    category: "git",
    label: "Git",
    description: "staging, history, branches, and remotes",
    icon: "🌿",
    sections: [],
    available: false,
  },
  {
    category: "shell",
    label: "Shell",
    description: "files, pipes, redirection, and processes",
    icon: "🐚",
    sections: [],
    available: false,
  },
  {
    category: "docker",
    label: "Docker",
    description: "containers, images, and compose",
    icon: "🐳",
    sections: [],
    available: false,
  },
  {
    category: "regex",
    label: "Regex",
    description: "patterns for search and replace",
    icon: "🔍",
    sections: [],
    available: false,
  },
  {
    category: "kubernetes",
    label: "Kubernetes",
    description: "pods, deployments, and cluster basics",
    icon: "☸",
    sections: [],
    available: false,
  },
];

/** Tools that have guide content ready. */
export const availableGuides = guideRegistry.filter((g) => g.available);

/** Tools whose guides are coming soon. */
export const comingSoonGuides = guideRegistry.filter((g) => !g.available);
