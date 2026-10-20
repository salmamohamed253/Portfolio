/**
 * Content model for the portfolio.
 *
 * Every factual statement on the site comes from the CV or from project
 * details supplied by the author. Anything that still needs confirmation is
 * wrapped with `pending()` (see src/lib/content.ts). Pending entries are shown
 * as clearly marked placeholders in development and are removed from the
 * production build, so unverified claims are never published.
 */

/** A statement that has not yet been confirmed by the author. */
export interface PendingEntry {
  readonly pending: true;
  /** The placeholder text or open question. */
  readonly body: string;
  readonly title?: string;
}

/** A confirmed statement with an optional heading. */
export interface TitledEntry {
  readonly pending?: false;
  readonly title?: string;
  readonly body: string;
}

/** Plain strings are always treated as confirmed. */
export type Entry = string | TitledEntry | PendingEntry;

export type ProjectCategory = 'professional' | 'academic' | 'independent';

export type ProjectStatus = 'completed' | 'in-progress' | 'prototype';

export interface FlowNode {
  readonly label: string;
  readonly detail?: string;
  /** Marks a node whose details are not yet confirmed (dev only). */
  readonly pending?: boolean;
}

/** One step in a flow. A step with `lanes` branches into parallel paths. */
export type FlowStage = FlowNode | { readonly lanes: readonly FlowNode[] };

export interface FlowDiagram {
  readonly kind: 'flow';
  readonly title: string;
  readonly caption?: string;
  readonly stages: readonly FlowStage[];
}

export interface TierDiagram {
  readonly kind: 'tiers';
  readonly title: string;
  readonly caption?: string;
  /** Ordered from broadest access to narrowest. */
  readonly tiers: readonly FlowNode[];
}

export type Diagram = FlowDiagram | TierDiagram;

export interface ProjectLink {
  readonly label: string;
  readonly href: string;
  readonly kind: 'repo' | 'demo' | 'writeup';
}

export interface Project {
  /** URL segment, e.g. `#/projects/<slug>`. */
  readonly slug: string;
  readonly title: string;
  /** One line shown under the title on the detail page. */
  readonly tagline: string;
  /** Two-sentence description used on cards. */
  readonly summary: string;
  readonly category: ProjectCategory;
  readonly status?: ProjectStatus;
  /** Organisation or setting, e.g. "Mazzraty (Al Mana Group)". */
  readonly context?: string;
  readonly period?: string;
  /** Position on the homepage (1 = first). Omit for catalogue-only projects. */
  readonly featured?: number;
  /**
   * Drafts are listed in development only. Use this for projects that do not
   * yet have enough confirmed detail to publish.
   */
  readonly draft?: boolean;
  readonly stack: readonly Entry[];
  readonly problem: readonly Entry[];
  readonly solution: readonly Entry[];
  /** Key capabilities, rendered as a list under the solution. */
  readonly features?: readonly Entry[];
  readonly contribution: readonly Entry[];
  readonly diagrams?: readonly Diagram[];
  readonly architecture?: readonly Entry[];
  readonly decisions?: readonly Entry[];
  /** Overrides the "Engineering decisions" heading. */
  readonly decisionsHeading?: string;
  readonly challenges?: readonly Entry[];
  /** Capabilities that are planned but not implemented. */
  readonly planned?: readonly Entry[];
  /** Notes on limitations, privacy and responsible use. */
  readonly responsibleUse?: readonly Entry[];
  /** Explains why code or screenshots are not published. */
  readonly confidentiality?: string;
  readonly links: readonly (ProjectLink | PendingEntry)[];
}

export interface ExperienceGroup {
  readonly heading?: string;
  readonly points: readonly string[];
}

export interface Role {
  readonly title: string;
  readonly organisation: string;
  readonly location: string;
  readonly period: string;
  readonly summary?: string;
  readonly groups: readonly ExperienceGroup[];
  /** Slugs of related project case studies. */
  readonly relatedProjects?: readonly string[];
}

export interface SkillGroup {
  readonly title: string;
  readonly rows: readonly { readonly label: string; readonly items: readonly string[] }[];
  /** Where these skills have been applied, in plain words. */
  readonly evidence: string;
}
