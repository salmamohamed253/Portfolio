import { describe, expect, it } from 'vitest';
import { featuredProjects, isPending, publishedProjects, visibleEntries } from '../lib/content';
import { experience } from './experience';
import { profile } from './profile';
import { projects } from './projects';

describe('project catalogue', () => {
  it('uses unique, URL-safe slugs', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('gives featured projects unique positions and never features drafts', () => {
    const featured = featuredProjects(projects);
    const positions = featured.map((p) => p.featured);
    expect(new Set(positions).size).toBe(positions.length);
    expect(featured.every((p) => !p.draft)).toBe(true);
  });

  it('keeps the homepage focused', () => {
    expect(featuredProjects(projects).length).toBeLessThanOrEqual(4);
  });

  it('excludes drafts from production builds', () => {
    const published = publishedProjects(projects, false);
    expect(published.some((p) => p.draft)).toBe(false);
    expect(publishedProjects(projects, true)).toHaveLength(projects.length);
  });

  it('removes every pending entry from production output', () => {
    for (const project of publishedProjects(projects, false)) {
      const lists: (readonly unknown[] | undefined)[] = [
        project.stack,
        project.problem,
        project.solution,
        project.features,
        project.contribution,
        project.architecture,
        project.decisions,
        project.challenges,
        project.planned,
        project.responsibleUse,
        project.links,
      ];
      for (const list of lists) {
        expect(visibleEntries(list, false).some(isPending)).toBe(false);
      }
    }
  });

  it('has a confirmed summary and problem statement for every published project', () => {
    for (const project of publishedProjects(projects, false)) {
      expect(project.summary.length).toBeGreaterThan(0);
      expect(visibleEntries(project.problem, false).length).toBeGreaterThan(0);
    }
  });

  it('only links to absolute https URLs', () => {
    for (const project of projects) {
      for (const link of project.links) {
        if (!isPending(link)) expect(link.href).toMatch(/^https:\/\//);
      }
    }
  });

  it('only cross-references projects that exist', () => {
    const slugs = new Set(projects.map((p) => p.slug));
    for (const role of experience) {
      for (const slug of role.relatedProjects ?? []) expect(slugs.has(slug)).toBe(true);
    }
  });
});

describe('profile', () => {
  it('does not publish a phone number', () => {
    expect(JSON.stringify(profile)).not.toMatch(/\+?974|\d{4}\s?\d{4}/);
  });

  it('uses https profile links', () => {
    expect(profile.linkedin).toMatch(/^https:\/\//);
    expect(profile.github).toMatch(/^https:\/\//);
  });
});
