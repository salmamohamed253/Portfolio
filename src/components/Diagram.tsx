import { SHOW_PENDING } from '../lib/content';
import type { Diagram as DiagramData, FlowNode, FlowStage } from '../types/content';
import styles from './Diagram.module.css';

function Node({ node }: { node: FlowNode }) {
  if (node.pending && !SHOW_PENDING) return null;
  return (
    <div className={`${styles.node} ${node.pending ? styles.pending : ''}`}>
      <span className={styles.nodeLabel}>{node.label}</span>
      {node.detail ? <span className={styles.nodeDetail}>{node.detail}</span> : null}
    </div>
  );
}

function FlowView({ stages }: { stages: readonly FlowStage[] }) {
  return (
    <ol className={styles.flow}>
      {stages.map((stage, i) => (
        <li key={i} className={styles.step}>
          <span className={styles.stepIndex} aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>
          {'lanes' in stage ? (
            <div className={styles.branch}>
              <span className="visually-hidden">Branches into: </span>
              {stage.lanes.map((lane) => (
                <Node key={lane.label} node={lane} />
              ))}
            </div>
          ) : (
            <Node node={stage} />
          )}
        </li>
      ))}
    </ol>
  );
}

function TierView({ tiers }: { tiers: readonly FlowNode[] }) {
  const step = tiers.length > 1 ? 40 / (tiers.length - 1) : 0;
  return (
    <ol className={styles.tiers}>
      {tiers.map((tier, i) => (
        <li key={tier.label} className={styles.tier} style={{ width: `${100 - step * i}%` }}>
          <span className={styles.tierLevel} aria-hidden="true">
            T{tiers.length - i}
          </span>
          <span className={styles.nodeLabel}>{tier.label}</span>
          {tier.detail ? <span className={styles.nodeDetail}>{tier.detail}</span> : null}
        </li>
      ))}
    </ol>
  );
}

export function Diagram({ diagram }: { diagram: DiagramData }) {
  return (
    <figure className={styles.figure}>
      <figcaption className={styles.header}>
        <span className={styles.title}>{diagram.title}</span>
        {diagram.caption ? <span className={styles.caption}>{diagram.caption}</span> : null}
      </figcaption>
      {diagram.kind === 'flow' ? <FlowView stages={diagram.stages} /> : <TierView tiers={diagram.tiers} />}
    </figure>
  );
}
