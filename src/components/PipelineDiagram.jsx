import { useEffect, useMemo, useState } from 'react'
import { ReactFlow, Handle, Position, MarkerType } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { AnimatePresence, motion } from 'framer-motion'
import pipeline from '../data/pipeline.json'
import Reveal from './Reveal'
import useDarkMode from './useDarkMode'

const PER_ROW = 4
const hidden = '!h-1 !w-1 !border-0 !opacity-0'

function StepNode({ data }) {
  return (
    <div
      className={`w-44 cursor-pointer rounded-2xl px-4 py-3 text-left transition duration-300 ${
        data.active ? 'bg-accent text-white shadow-lg' : 'bg-card text-ink ring-1 ring-line hover:ring-accent'
      }`}
    >
      {/* handles on every side; edges pick the right ones for the snake layout */}
      <Handle id="t" type="target" position={Position.Top} className={hidden} />
      <Handle id="l" type="target" position={Position.Left} className={hidden} />
      <Handle id="rt" type="target" position={Position.Right} className={hidden} />
      <div className={`text-[11px] font-medium uppercase tracking-wider ${data.active ? 'text-white/80' : 'text-muted'}`}>{data.group}</div>
      <div className="mt-0.5 text-[15px] font-semibold">{data.label}</div>
      <Handle id="b" type="source" position={Position.Bottom} className={hidden} />
      <Handle id="r" type="source" position={Position.Right} className={hidden} />
      <Handle id="ls" type="source" position={Position.Left} className={hidden} />
    </div>
  )
}

const nodeTypes = { step: StepNode }

function useIsNarrow() {
  const [narrow, setNarrow] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return narrow
}

export default function PipelineDiagram() {
  const [activeId, setActiveId] = useState(pipeline.nodes[0].id)
  const vertical = useIsNarrow()
  const dark = useDarkMode()
  const edgeColor = dark ? '#636366' : '#c7c7cc'
  const active = pipeline.nodes.find((n) => n.id === activeId)

  const nodes = useMemo(
    () =>
      pipeline.nodes.map((n, i) => {
        // Desktop: two-row snake (left to right, then right to left); mobile: one column
        const position = vertical
          ? { x: 0, y: i * 100 }
          : i < PER_ROW
            ? { x: i * 230, y: 0 }
            : { x: (2 * PER_ROW - 1 - i) * 230, y: 150 }
        return { id: n.id, type: 'step', position, data: { ...n, active: n.id === activeId } }
      }),
    [activeId, vertical],
  )

  const edges = useMemo(
    () =>
      pipeline.nodes.slice(1).map((n, i) => {
        let sourceHandle = 'r', targetHandle = 'l'
        if (vertical || i === PER_ROW - 1) { sourceHandle = 'b'; targetHandle = 't' }
        else if (i >= PER_ROW) { sourceHandle = 'ls'; targetHandle = 'rt' }
        return {
          id: `e-${i}`,
          source: pipeline.nodes[i].id,
          target: n.id,
          sourceHandle,
          targetHandle,
          type: 'smoothstep',
          animated: true,
          style: { stroke: edgeColor, strokeWidth: 1.5 },
          markerEnd: { type: MarkerType.ArrowClosed, color: edgeColor },
        }
      }),
    [vertical, edgeColor],
  )

  return (
    <section id="pipeline" className="section bg-surface">
      <div className="wrap">
        <Reveal>
          <h2 className="headline">{pipeline.title} <span>{pipeline.subtitle}</span></h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 grid gap-5 lg:grid-cols-[1fr_320px]">
          <div className={`card overflow-hidden ${vertical ? 'h-[760px]' : 'h-[340px]'}`}>
            <ReactFlow
              key={vertical ? 'v' : 'h'}
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodeClick={(_, node) => setActiveId(node.id)}
              fitView
              fitViewOptions={{ padding: 0.14, maxZoom: 1.1 }}
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable={false}
              panOnDrag={false}
              zoomOnScroll={false}
              zoomOnPinch={false}
              zoomOnDoubleClick={false}
              preventScrolling={false}
              proOptions={{ hideAttribution: true }}
            />
          </div>

          <div className="card p-8">
            <AnimatePresence mode="wait">
              <motion.div key={active.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">{active.group}</p>
                <h3 className="mt-2 text-[28px] font-semibold tracking-tight text-ink">{active.label}</h3>
                <p className="mt-3 text-[17px] leading-relaxed text-muted">{active.detail}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {active.tools.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
