import { describe, expect, it } from 'vitest';
import { href, parseHash } from './router';

describe('parseHash', () => {
  it('treats an empty hash as home', () => {
    expect(parseHash('')).toEqual({ name: 'home' });
    expect(parseHash('#/')).toEqual({ name: 'home' });
  });

  it('maps home sections', () => {
    expect(parseHash('#/experience')).toEqual({ name: 'home', section: 'experience' });
    expect(parseHash('#/contact/')).toEqual({ name: 'home', section: 'contact' });
  });

  it('parses the catalogue and project pages', () => {
    expect(parseHash('#/projects')).toEqual({ name: 'projects' });
    expect(parseHash('#/projects/api-monitor')).toEqual({ name: 'project', slug: 'api-monitor' });
  });

  it('ignores plain in-page anchors', () => {
    expect(parseHash('#main')).toBeNull();
  });

  it('reports unknown paths', () => {
    expect(parseHash('#/nope')).toEqual({ name: 'not-found', path: 'nope' });
    expect(parseHash('#/projects/a/b')).toEqual({ name: 'not-found', path: 'projects/a/b' });
  });

  it('round-trips generated links', () => {
    expect(parseHash(href.project('rag-pipeline'))).toEqual({ name: 'project', slug: 'rag-pipeline' });
    expect(parseHash(href.section('skills'))).toEqual({ name: 'home', section: 'skills' });
  });
});
