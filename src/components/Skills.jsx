import ReactEChartsCore from 'echarts-for-react/esm/core'
import * as echarts from 'echarts/core'
import { RadarChart } from 'echarts/charts'
import { TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import skills from '../data/skills.json'
import Reveal from './Reveal'
import useDarkMode from './useDarkMode'

// Only register what we use, keeps the bundle small
echarts.use([RadarChart, TooltipComponent, CanvasRenderer])

const levelLabel = ['', 'Familiar', 'Working', 'Proficient', 'Advanced', 'Expert']

export default function Skills() {
  const dark = useDarkMode()
  const c = dark
    ? { text: '#f5f5f7', grid: '#3a3a3c', accent: '#2997ff', fill: 'rgba(41,151,255,0.18)', tipBg: '#1d1d1f' }
    : { text: '#1d1d1f', grid: '#e5e5ea', accent: '#0071e3', fill: 'rgba(0,113,227,0.12)', tipBg: '#ffffff' }

  const option = {
    tooltip: {
      trigger: 'item',
      backgroundColor: c.tipBg,
      borderWidth: 0,
      textStyle: { color: c.text, fontFamily: '-apple-system, Inter, sans-serif' },
      formatter: () => skills.radar.map((s) => `${s.name}: <b>${levelLabel[s.level]}</b>`).join('<br/>'),
    },
    radar: {
      indicator: skills.radar.map((s) => ({ name: s.name, max: 5 })),
      radius: '66%',
      splitNumber: 5,
      shape: 'circle',
      axisName: { color: c.text, fontFamily: '-apple-system, Inter, sans-serif', fontSize: 13, fontWeight: 600 },
      splitLine: { lineStyle: { color: c.grid } },
      splitArea: { show: false },
      axisLine: { lineStyle: { color: c.grid } },
    },
    series: [
      {
        type: 'radar',
        symbol: 'circle',
        symbolSize: 7,
        data: [{ value: skills.radar.map((s) => s.level), name: 'Proficiency' }],
        lineStyle: { color: c.accent, width: 2 },
        itemStyle: { color: c.accent },
        areaStyle: { color: c.fill },
      },
    ],
  }

  return (
    <section id="skills" className="section">
      <div className="wrap">
        <Reveal>
          <h2 className="headline">Skills. <span>The tools behind the work.</span></h2>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal className="card p-6">
            <ReactEChartsCore echarts={echarts} option={option} notMerge style={{ height: 400 }} />
          </Reveal>

          <Reveal delay={0.1} className="card divide-y divide-line p-8">
            {skills.groups.map((g) => (
              <div key={g.name} className="py-5 first:pt-0 last:pb-0">
                <h3 className="text-[17px] font-semibold text-ink">{g.name}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-muted">{g.items.join(' · ')}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
