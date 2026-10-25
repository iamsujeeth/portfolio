import { useEffect, useMemo, useState } from 'react'
import {
  Background,
  BackgroundVariant,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { BarChart3, Braces, Cloud, Database, Layers } from 'lucide-react'
import Reveal from './Reveal'

const stages = [
  {
    id: 'collect',
    title: 'Collect',
    description: 'Bring data together from databases, cloud storage, and APIs.',
    tools: ['AWS DMS', 'S3', 'APIs'],
    icon: Database,
  },
  {
    id: 'prepare',
    title: 'Prepare',
    description: 'Clean, validate, and organize data so it is dependable.',
    tools: ['Python', 'AWS Glue', 'Databricks'],
    icon: Braces,
  },
  {
    id: 'model',
    title: 'Model',
    description: 'Shape data into consistent, tested, well-documented models.',
    tools: ['dbt', 'Snowflake', 'SQL'],
    icon: Layers,
  },
  {
    id: 'explain',
    title: 'Explain',
    description: 'Show results through analysis and easy-to-read dashboards.',
    tools: ['Tableau', 'Power BI', 'Analytics'],
    icon: BarChart3,
  },
]

const toolIcons = {
  'AWS DMS': Database,
  S3: Cloud,
  APIs: Braces,
  Python: Braces,
  'AWS Glue': Layers,
  Databricks: Layers,
  dbt: Layers,
  Snowflake: Database,
  SQL: Database,
  Tableau: BarChart3,
  'Power BI': BarChart3,
  Analytics: BarChart3,
}

function FlowNode({ data }) {
  const Icon = data.icon

  return (
    <div className={`w-[218px] rounded-2xl border bg-card p-4 shadow-sm transition-colors ${data.active ? 'border-accent ring-1 ring-accent' : 'border-line'}`}>
      <Handle type="target" position={data.vertical ? Position.Top : Position.Left} className="!h-2 !w-2 !border-2 !border-card !bg-accent" />
      <div className="flex items-center gap-3">
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${data.active ? 'bg-accent-fill text-white' : 'bg-surface text-ink'}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">Step {data.step}</p>
          <h3 className="mt-0.5 text-base font-semibold text-ink">{data.title}</h3>
        </div>
      </div>
      <p className="mt-3 min-h-[40px] text-xs leading-5 text-muted">{data.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {data.tools.map((tool) => {
          const ToolIcon = toolIcons[tool] ?? Cloud
          return (
            <span key={tool} className="inline-flex items-center gap-1 rounded-md bg-surface px-2 py-1 text-[10px] font-medium text-ink">
              <ToolIcon className="h-3 w-3" aria-hidden="true" />
              {tool}
            </span>
          )
        })}
      </div>
      <Handle type="source" position={data.vertical ? Position.Bottom : Position.Right} className="!h-2 !w-2 !border-2 !border-card !bg-accent" />
    </div>
  )
}

const nodeTypes = { flowStep: FlowNode }

export default function DataFlow() {
  const [activeStage, setActiveStage] = useState('collect')
  const [vertical, setVertical] = useState(() => window.innerWidth < 768)
  const active = stages.find((stage) => stage.id === activeStage) ?? stages[0]

  useEffect(() => {
    const handleResize = () => setVertical(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const nodes = useMemo(
    () => stages.map((stage, index) => ({
      id: stage.id,
      type: 'flowStep',
      position: vertical ? { x: 54, y: index * 184 } : { x: index * 258, y: 30 },
      data: { ...stage, step: String(index + 1).padStart(2, '0'), active: activeStage === stage.id, vertical },
      draggable: false,
    })),
    [activeStage, vertical],
  )

  const edges = useMemo(
    () => stages.slice(0, -1).map((stage, index) => ({
      id: `${stage.id}-${stages[index + 1].id}`,
      source: stage.id,
      target: stages[index + 1].id,
      type: 'smoothstep',
      animated: true,
      style: { stroke: 'var(--accent)', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--accent)' },
    })),
    [],
  )

  return (
    <section id="approach" className="section bg-surface">
      <div className="wrap">
        <Reveal>
          <h2 className="headline">How I work. <span>From source data to useful dashboards.</span></h2>
          <p className="lead mt-5 max-w-2xl">Select a step to see the work and tools I use at each stage.</p>
        </Reveal>

        <Reveal className="card mt-10 overflow-hidden p-2 sm:p-4">
          <div className={`w-full ${vertical ? 'h-[790px]' : 'h-[330px]'}`} aria-label="Interactive data workflow">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodeClick={(_, node) => setActiveStage(node.id)}
              fitView
              fitViewOptions={{ padding: 0.18, maxZoom: 1 }}
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable={false}
              panOnDrag={false}
              zoomOnScroll={false}
              zoomOnPinch={false}
              zoomOnDoubleClick={false}
            >
              <Background variant={BackgroundVariant.Dots} gap={22} size={1} color="var(--line)" />
            </ReactFlow>
          </div>
          <div className="border-t border-line px-4 py-4 sm:px-6" aria-live="polite">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{active.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink">{active.description}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
