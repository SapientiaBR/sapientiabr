import {
  CalendarDays,
  CreditCard,
  Globe2,
  MessageCircle,
  PanelsTopLeft,
  Sparkles,
  UsersRound,
} from 'lucide-react';

const LINKS = [
  [320, 200, 320, 65], [320, 200, 520, 116], [320, 200, 498, 316],
  [320, 200, 210, 330], [320, 200, 108, 120], [320, 200, 103, 272],
  [320, 65, 520, 116], [520, 116, 498, 316], [498, 316, 210, 330],
  [210, 330, 103, 272], [103, 272, 108, 120], [108, 120, 320, 65],
  [108, 120, 498, 316], [520, 116, 210, 330], [320, 65, 210, 330],
] as const;

const PARTICLES = [
  [74, 80, 3], [118, 60, 2], [168, 122, 4], [218, 72, 2], [270, 40, 3], [372, 45, 2],
  [421, 78, 4], [471, 62, 2], [564, 92, 3], [596, 148, 2], [548, 198, 4], [587, 260, 2],
  [540, 336, 3], [448, 354, 2], [388, 327, 4], [300, 366, 2], [160, 356, 3], [92, 320, 2],
  [56, 230, 3], [78, 170, 2], [172, 205, 2], [240, 152, 3], [404, 154, 2], [465, 236, 3],
] as const;

/**
 * Uma constelação de conhecimento inspirada em mapas Obsidian/Zettelkasten.
 * A composição usa SVG, portanto já nasce visível sem WebGL, JavaScript de
 * animação ou dependência de um viewport específico.
 */
export function OperationsMindMap() {
  return (
    <div className="operations-mindmap" aria-hidden="true">
      <svg className="operations-mindmap-links" viewBox="0 0 640 400" preserveAspectRatio="none">
        <defs>
          <linearGradient id="mindmap-link" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#d8b4fe" stopOpacity="0.35" />
            <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="1" stopColor="#67e8f9" stopOpacity="0.42" />
          </linearGradient>
          <radialGradient id="mindmap-core-light">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.32" stopColor="#a78bfa" />
            <stop offset="1" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>
          <filter id="mindmap-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <g className="operations-mindmap-link-glow" filter="url(#mindmap-glow)">
          {LINKS.map(([x1, y1, x2, y2]) => <line key={`${x1}-${y1}-${x2}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} />)}
        </g>
        <g className="operations-mindmap-link">
          {LINKS.map(([x1, y1, x2, y2]) => <line key={`${x1}-${y1}-${x2}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} />)}
        </g>
        <polygon className="operations-mindmap-facet" points="320,48 540,198 320,354 94,198" />
        <polygon className="operations-mindmap-facet-secondary" points="320,65 498,316 210,330 108,120" />
        {PARTICLES.map(([cx, cy, r], index) => (
          <circle key={`${cx}-${cy}`} className={index % 3 === 0 ? 'operations-mindmap-particle is-cyan' : 'operations-mindmap-particle'} cx={cx} cy={cy} r={r} />
        ))}
        {[[320, 65], [520, 116], [498, 316], [210, 330], [108, 120], [103, 272]].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} className="operations-mindmap-signal" cx={cx} cy={cy} r="7" />
        ))}
        <circle className="operations-mindmap-core-light" cx="320" cy="200" r="57" />
        <circle className="operations-mindmap-core-dot" cx="320" cy="200" r="8" />
      </svg>

      <div className="operations-mindmap-node operations-mindmap-core">
        <span className="operations-mindmap-node-icon"><Sparkles size={17} /></span>
        <span>Operação com IA</span>
      </div>
      <div className="operations-mindmap-node operations-mindmap-node-a"><MessageCircle size={15} /> WhatsApp</div>
      <div className="operations-mindmap-node operations-mindmap-node-b"><PanelsTopLeft size={15} /> CRM</div>
      <div className="operations-mindmap-node operations-mindmap-node-c"><CalendarDays size={15} /> Agenda</div>
      <div className="operations-mindmap-node operations-mindmap-node-d"><CreditCard size={15} /> Pagamentos</div>
      <div className="operations-mindmap-node operations-mindmap-node-e"><Globe2 size={15} /> Site</div>
      <div className="operations-mindmap-node operations-mindmap-node-f"><UsersRound size={15} /> SDRs</div>
    </div>
  );
}

export default OperationsMindMap;
