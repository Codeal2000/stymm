import React, { useState, useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  TrendingUp, 
  Home, 
  Users, 
  ShieldCheck, 
  Calendar, 
  Filter, 
  Award, 
  CheckCircle2, 
  Clock, 
  Compass, 
  Smartphone,
  ChevronRight,
  Flame,
  Info
} from 'lucide-react';
import { CanvassRecord } from '../../types';

interface MemberCanvassingAnalyticsProps {
  canvassCount: number;
  canvassRecords?: CanvassRecord[];
  onLogNewCanvass?: () => void;
}

export const MemberCanvassingAnalytics: React.FC<MemberCanvassingAnalyticsProps> = ({
  canvassCount,
  canvassRecords = [],
  onLogNewCanvass
}) => {
  const { theme } = useTheme();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('7d');
  const [activeMetric, setActiveMetric] = useState<'both' | 'houses' | 'voters'>('both');
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  // Realistic daily tracking timeline
  const timelineData7d = [
    { date: 'Mon 22', housesVisited: 14, votersEngaged: 11, pvcsVerified: 10, hoursSpent: 2.5 },
    { date: 'Tue 23', housesVisited: 19, votersEngaged: 15, pvcsVerified: 14, hoursSpent: 3.0 },
    { date: 'Wed 24', housesVisited: 12, votersEngaged: 10, pvcsVerified: 9, hoursSpent: 2.0 },
    { date: 'Thu 25', housesVisited: 24, votersEngaged: 21, pvcsVerified: 19, hoursSpent: 4.2 },
    { date: 'Fri 26', housesVisited: 28, votersEngaged: 23, pvcsVerified: 22, hoursSpent: 4.5 },
    { date: 'Sat 27', housesVisited: 38, votersEngaged: 32, pvcsVerified: 30, hoursSpent: 6.0 },
    { date: 'Sun 28', housesVisited: 31, votersEngaged: 26, pvcsVerified: 24, hoursSpent: 5.0 },
  ];

  const timelineData30d = [
    { date: 'Week 1', housesVisited: 82, votersEngaged: 68, pvcsVerified: 62, hoursSpent: 16.5 },
    { date: 'Week 2', housesVisited: 114, votersEngaged: 95, pvcsVerified: 88, hoursSpent: 21.0 },
    { date: 'Week 3', housesVisited: 135, votersEngaged: 118, pvcsVerified: 110, hoursSpent: 25.5 },
    { date: 'Week 4', housesVisited: 166, votersEngaged: 142, pvcsVerified: 135, hoursSpent: 30.0 },
  ];

  const activeTimeline = timeRange === '30d' ? timelineData30d : timelineData7d;

  // Breakdown by voter sentiment
  const sentimentDistribution = [
    { name: 'Pledged STYMM Supporters', value: 58, color: '#10b981', count: 96 },
    { name: 'Leaning Youth Voters', value: 24, color: '#3b82f6', count: 40 },
    { name: 'Undecided / Considering', value: 12, color: '#f59e0b', count: 20 },
    { name: 'Need Follow-Up Townhall', value: 6, color: '#8b5cf6', count: 10 },
  ];

  // Door to door time efficiency
  const timeOfDayData = [
    { slot: '8am - 11am', visits: 18, conversion: 68 },
    { slot: '11am - 2pm', visits: 24, conversion: 71 },
    { slot: '2pm - 4pm', visits: 32, conversion: 80 },
    { slot: '4pm - 6pm', visits: 54, conversion: 92 },
    { slot: '6pm - 8pm', visits: 38, conversion: 85 },
  ];

  // Aggregates
  const totalHouses = useMemo(() => {
    return activeTimeline.reduce((sum, item) => sum + item.housesVisited, 0) + (canvassCount > 0 ? canvassCount : 0);
  }, [activeTimeline, canvassCount]);

  const totalVoters = useMemo(() => {
    return activeTimeline.reduce((sum, item) => sum + item.votersEngaged, 0) + (canvassCount > 0 ? Math.round(canvassCount * 0.85) : 0);
  }, [activeTimeline, canvassCount]);

  const totalPvcs = useMemo(() => {
    return activeTimeline.reduce((sum, item) => sum + item.pvcsVerified, 0);
  }, [activeTimeline]);

  const conversionRate = totalHouses > 0 ? Math.round((totalVoters / totalHouses) * 100) : 84;

  // SVG Area Chart calculations
  const maxVal = Math.max(...activeTimeline.map(d => Math.max(d.housesVisited, d.votersEngaged))) * 1.15;
  const svgWidth = 800;
  const svgHeight = 260;
  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 35;
  const plotWidth = svgWidth - paddingLeft - paddingRight;
  const plotHeight = svgHeight - paddingTop - paddingBottom;

  const pointsHouses = activeTimeline.map((d, i) => {
    const x = paddingLeft + (i / (activeTimeline.length - 1)) * plotWidth;
    const y = paddingTop + plotHeight - (d.housesVisited / maxVal) * plotHeight;
    return { x, y, data: d };
  });

  const pointsVoters = activeTimeline.map((d, i) => {
    const x = paddingLeft + (i / (activeTimeline.length - 1)) * plotWidth;
    const y = paddingTop + plotHeight - (d.votersEngaged / maxVal) * plotHeight;
    return { x, y, data: d };
  });

  const createAreaPath = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return '';
    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
    const firstX = points[0].x.toFixed(1);
    const lastX = points[points.length - 1].x.toFixed(1);
    const bottomY = (paddingTop + plotHeight).toFixed(1);
    return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  };

  const createLinePath = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return '';
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  };

  const areaHousesPath = createAreaPath(pointsHouses);
  const lineHousesPath = createLinePath(pointsHouses);
  const areaVotersPath = createAreaPath(pointsVoters);
  const lineVotersPath = createLinePath(pointsVoters);

  const hoveredData = hoveredPointIndex !== null ? activeTimeline[hoveredPointIndex] : null;

  // Max visits for bar chart
  const maxBarVisits = Math.max(...timeOfDayData.map(d => d.visits));

  return (
    <div className="space-y-6">
      {/* Header and Control Bar */}
      <div className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border transition-colors duration-200 ${
        theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-emerald-50/70 border-emerald-200 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <Flame className="w-3.5 h-3.5 text-emerald-500" />
              <span>Real-Time Canvassing Intelligence</span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-black font-display tracking-tight ${theme === 'dark' ? 'text-white' : 'text-emerald-950'}`}>
              Grassroots Vanguard Metrics & Field Analytics
            </h2>
            <p className={`text-xs sm:text-sm max-w-2xl ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'}`}>
              High-resolution performance tracking for your door-to-door voter mobilization, PVC accreditation, and youth pledge conversions.
            </p>
          </div>

          {/* Time range selector */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-black/20 dark:bg-black/40 p-1 rounded-xl border border-neutral-700/40">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeRange === '7d'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeRange === '30d'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Last 30 Days
            </button>
          </div>
        </div>

        {/* Quick KPI Stat Chips */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <div className={`p-3.5 rounded-xl border ${
            theme === 'dark' ? 'bg-black/40 border-neutral-800' : 'bg-white border-emerald-100 shadow-xs'
          }`}>
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
              <span className="truncate">Total Houses Visited</span>
              <Home className="w-4 h-4 text-emerald-500 shrink-0" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
              {Math.round(totalHouses)}
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              <span>+18% vs previous period</span>
            </div>
          </div>

          <div className={`p-3.5 rounded-xl border ${
            theme === 'dark' ? 'bg-black/40 border-neutral-800' : 'bg-white border-emerald-100 shadow-xs'
          }`}>
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
              <span className="truncate">Voters Engaged</span>
              <Users className="w-4 h-4 text-blue-500 shrink-0" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-blue-600 dark:text-blue-400">
              {Math.round(totalVoters)}
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5 flex items-center gap-1">
              <span>{conversionRate}% pledge conversion</span>
            </div>
          </div>

          <div className={`p-3.5 rounded-xl border ${
            theme === 'dark' ? 'bg-black/40 border-neutral-800' : 'bg-white border-emerald-100 shadow-xs'
          }`}>
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
              <span className="truncate">PVCs Verified</span>
              <ShieldCheck className="w-4 h-4 text-purple-500 shrink-0" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-purple-600 dark:text-purple-400">
              {totalPvcs}
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5">
              <span>92% voter accreditation</span>
            </div>
          </div>

          <div className={`p-3.5 rounded-xl border ${
            theme === 'dark' ? 'bg-black/40 border-neutral-800' : 'bg-white border-emerald-100 shadow-xs'
          }`}>
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
              <span className="truncate">Vanguard Ranking</span>
              <Award className="w-4 h-4 text-amber-500 shrink-0" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-amber-500">
              Top 5%
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5">
              <span>Ward 01 Lead Canvasser</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chart Card: Houses Visited vs Voters Engaged Over Time */}
      <div className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border space-y-4 shadow-sm ${
        theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className={`text-base sm:text-lg font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Outreach Trajectory: Houses Visited & Voters Pledged Over Time
            </h3>
            <p className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
              Daily rate of household canvassing and voter commitments in your assigned polling territory
            </p>
          </div>

          {/* Metric toggle */}
          <div className="flex items-center gap-1 text-[11px] self-start sm:self-auto">
            <button
              onClick={() => setActiveMetric('both')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                activeMetric === 'both'
                  ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold'
                  : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              All Metrics
            </button>
            <button
              onClick={() => setActiveMetric('houses')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                activeMetric === 'houses'
                  ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 font-bold'
                  : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              Houses Only
            </button>
            <button
              onClick={() => setActiveMetric('voters')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                activeMetric === 'voters'
                  ? 'bg-blue-500/20 text-blue-500 border border-blue-500/30 font-bold'
                  : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              Voters Only
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-5 text-xs pt-1">
          {(activeMetric === 'both' || activeMetric === 'houses') && (
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Houses Visited</span>
            </div>
          )}
          {(activeMetric === 'both' || activeMetric === 'voters') && (
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50" />
              <span className="font-semibold text-blue-600 dark:text-blue-400">Voters Engaged & Pledged</span>
            </div>
          )}
        </div>

        {/* Interactive SVG Chart Container */}
        <div className="relative w-full pt-2">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-64 sm:h-72 select-none overflow-visible"
          >
            <defs>
              <linearGradient id="gradientHouses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="gradientVoters" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
              const y = paddingTop + plotHeight * (1 - ratio);
              const label = Math.round(maxVal * ratio);
              return (
                <g key={ratio}>
                  <line
                    x1={paddingLeft}
                    y1={y}
                    x2={svgWidth - paddingRight}
                    y2={y}
                    stroke={theme === 'dark' ? '#262626' : '#e2e8f0'}
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                  <text
                    x={paddingLeft - 8}
                    y={y + 4}
                    textAnchor="end"
                    fill={theme === 'dark' ? '#737373' : '#94a3b8'}
                    fontSize="10"
                    fontFamily="monospace"
                  >
                    {label}
                  </text>
                </g>
              );
            })}

            {/* Area Fills */}
            {(activeMetric === 'both' || activeMetric === 'houses') && (
              <path d={areaHousesPath} fill="url(#gradientHouses)" />
            )}
            {(activeMetric === 'both' || activeMetric === 'voters') && (
              <path d={areaVotersPath} fill="url(#gradientVoters)" />
            )}

            {/* Stroke Lines */}
            {(activeMetric === 'both' || activeMetric === 'houses') && (
              <path
                d={lineHousesPath}
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            {(activeMetric === 'both' || activeMetric === 'voters') && (
              <path
                d={lineVotersPath}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Data Point Circles and X-Axis Labels */}
            {activeTimeline.map((item, i) => {
              const pHouse = pointsHouses[i];
              const pVoter = pointsVoters[i];
              const isHovered = hoveredPointIndex === i;

              return (
                <g key={i}>
                  {/* Vertical hover guide */}
                  {isHovered && (
                    <line
                      x1={pHouse.x}
                      y1={paddingTop}
                      x2={pHouse.x}
                      y2={paddingTop + plotHeight}
                      stroke={theme === 'dark' ? '#525252' : '#cbd5e1'}
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                  )}

                  {/* House circle */}
                  {(activeMetric === 'both' || activeMetric === 'houses') && (
                    <circle
                      cx={pHouse.x}
                      cy={pHouse.y}
                      r={isHovered ? 6 : 4}
                      fill="#10b981"
                      stroke={theme === 'dark' ? '#171717' : '#ffffff'}
                      strokeWidth="2"
                      className="cursor-pointer transition-all duration-200"
                    />
                  )}

                  {/* Voter circle */}
                  {(activeMetric === 'both' || activeMetric === 'voters') && (
                    <circle
                      cx={pVoter.x}
                      cy={pVoter.y}
                      r={isHovered ? 6 : 4}
                      fill="#3b82f6"
                      stroke={theme === 'dark' ? '#171717' : '#ffffff'}
                      strokeWidth="2"
                      className="cursor-pointer transition-all duration-200"
                    />
                  )}

                  {/* X Axis Label */}
                  <text
                    x={pHouse.x}
                    y={svgHeight - 10}
                    textAnchor="middle"
                    fill={isHovered ? (theme === 'dark' ? '#ffffff' : '#0f172a') : (theme === 'dark' ? '#a3a3a3' : '#64748b')}
                    fontWeight={isHovered ? '700' : '500'}
                    fontSize="11"
                  >
                    {item.date}
                  </text>

                  {/* Interactive invisible hit column */}
                  <rect
                    x={pHouse.x - plotWidth / (activeTimeline.length * 2)}
                    y={paddingTop}
                    width={plotWidth / activeTimeline.length}
                    height={plotHeight + 25}
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPointIndex(i)}
                    onMouseLeave={() => setHoveredPointIndex(null)}
                  />
                </g>
              );
            })}
          </svg>

          {/* Interactive Tooltip Card */}
          {hoveredData && hoveredPointIndex !== null && (
            <div
              className={`absolute top-2 right-4 pointer-events-none p-3 rounded-xl border text-xs shadow-xl backdrop-blur-md z-10 transition-all ${
                theme === 'dark' ? 'bg-black/90 border-neutral-700 text-white' : 'bg-white/95 border-emerald-200 text-slate-800'
              }`}
            >
              <div className="font-bold text-neutral-400 border-b border-neutral-700/50 pb-1 mb-1.5 flex items-center justify-between gap-4">
                <span>{hoveredData.date}</span>
                <span className="text-[10px] text-emerald-400 font-mono">{hoveredData.hoursSpent} hrs in field</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-1.5 text-emerald-500 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Houses Visited:
                  </span>
                  <span className="font-bold font-mono">{hoveredData.housesVisited}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-1.5 text-blue-500 font-medium">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    Voters Pledged:
                  </span>
                  <span className="font-bold font-mono">{hoveredData.votersEngaged}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-1.5 text-purple-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    PVCs Verified:
                  </span>
                  <span className="font-bold font-mono">{hoveredData.pvcsVerified}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Two Column Grid for Breakdown Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Support Sentiment Breakdown Donut */}
        <div className={`lg:col-span-6 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border space-y-4 shadow-sm ${
          theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100'
        }`}>
          <div>
            <h3 className={`text-base font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Voter Support Sentiment Breakdown
            </h3>
            <p className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
              Receptiveness of households to the Seyi Tinubu Youth Charter
            </p>
          </div>

          {/* SVG Donut Visual */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
            <div className="relative w-44 h-44 shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {(() => {
                  let accumulatedPercent = 0;
                  return sentimentDistribution.map((item) => {
                    const strokeDasharray = `${item.value} ${100 - item.value}`;
                    const strokeDashoffset = -accumulatedPercent;
                    accumulatedPercent += item.value;
                    return (
                      <circle
                        key={item.name}
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke={item.color}
                        strokeWidth="14"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-500"
                        pathLength="100"
                      />
                    );
                  });
                })()}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="text-2xl font-black font-mono text-emerald-500">58%</span>
                <span className="text-[10px] uppercase font-bold text-neutral-400">Pledged</span>
              </div>
            </div>

            {/* Custom Legend */}
            <div className="space-y-2 w-full">
              {sentimentDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className={`truncate ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                      {item.name}
                    </span>
                  </div>
                  <div className="font-mono font-bold shrink-0 pl-2">
                    {item.value}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Canvassing Efficiency by Time of Day (Bar Chart) */}
        <div className={`lg:col-span-6 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border space-y-4 shadow-sm ${
          theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100'
        }`}>
          <div>
            <h3 className={`text-base font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Optimal Outreach Hours (Door-to-Door Pace)
            </h3>
            <p className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
              Visits logged and positive engagement conversion across different time windows
            </p>
          </div>

          {/* SVG Bar Chart */}
          <div className="w-full pt-2">
            <div className="space-y-3">
              {timeOfDayData.map((item, idx) => {
                const pct = (item.visits / maxBarVisits) * 100;
                const isHovered = hoveredBarIndex === idx;
                const isPeak = item.visits === maxBarVisits;

                return (
                  <div 
                    key={item.slot}
                    className="space-y-1 cursor-pointer"
                    onMouseEnter={() => setHoveredBarIndex(idx)}
                    onMouseLeave={() => setHoveredBarIndex(null)}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-semibold flex items-center gap-1.5 ${isPeak ? 'text-emerald-500 font-bold' : theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                        <span>{item.slot}</span>
                        {isPeak && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-bold">
                            <Flame className="w-2.5 h-2.5" />
                            <span>Peak Time</span>
                          </span>
                        )}
                      </span>
                      <span className="font-mono font-bold text-neutral-400">
                        {item.visits} visits ({item.conversion}% contact)
                      </span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isPeak
                            ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-sm shadow-emerald-500/50'
                            : isHovered
                            ? 'bg-emerald-500'
                            : 'bg-emerald-600/70'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
            theme === 'dark' ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
          }`}>
            <span className="flex items-center gap-1.5 font-semibold">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              Peak efficiency: 4pm - 6pm (92% contact rate)
            </span>
            {onLogNewCanvass && (
              <button
                onClick={onLogNewCanvass}
                className="text-[11px] font-bold underline hover:opacity-80"
              >
                Log New Voter
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
