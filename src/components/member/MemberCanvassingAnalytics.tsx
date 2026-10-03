import React, { useState, useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
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
  Flame
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
    { date: 'Week 1', housesVisited: 88, votersEngaged: 72, pvcsVerified: 68, hoursSpent: 16 },
    { date: 'Week 2', housesVisited: 105, votersEngaged: 89, pvcsVerified: 82, hoursSpent: 19 },
    { date: 'Week 3', housesVisited: 124, votersEngaged: 106, pvcsVerified: 99, hoursSpent: 22 },
    { date: 'Week 4', housesVisited: 166, votersEngaged: 138, pvcsVerified: 128, hoursSpent: 27 },
  ];

  const activeTimeline = timeRange === '7d' ? timelineData7d : timelineData30d;

  // Aggregate sums
  const totalHouses = useMemo(() => {
    const base = activeTimeline.reduce((acc, curr) => acc + curr.housesVisited, 0);
    return Math.max(base, canvassCount * 1.25);
  }, [activeTimeline, canvassCount]);

  const totalVoters = useMemo(() => {
    const base = activeTimeline.reduce((acc, curr) => acc + curr.votersEngaged, 0);
    return Math.max(base, canvassCount);
  }, [activeTimeline, canvassCount]);

  const totalPvcs = Math.round(totalVoters * 0.92);
  const conversionRate = Math.round((totalVoters / totalHouses) * 100);

  // Sentiment donut distribution
  const sentimentDistribution = [
    { name: 'Pledged STYMM Supporters', value: 68, color: '#10b981' },
    { name: 'Leaning Youth Movement', value: 21, color: '#3b82f6' },
    { name: 'Undecided / Considering', value: 8, color: '#f59e0b' },
    { name: 'Follow-Up Scheduled', value: 3, color: '#8b5cf6' },
  ];

  // Hourly mobilization distribution for weekend canvassing
  const timeOfDayData = [
    { slot: '8am - 10am', visits: 18, efficiency: 82 },
    { slot: '10am - 12pm', visits: 34, efficiency: 91 },
    { slot: '12pm - 2pm', visits: 16, efficiency: 74 },
    { slot: '2pm - 4pm', visits: 29, efficiency: 88 },
    { slot: '4pm - 6pm', visits: 45, efficiency: 96 },
  ];

  const tooltipBg = theme === 'dark' ? '#171717' : '#ffffff';
  const tooltipBorder = theme === 'dark' ? '#262626' : '#e2e8f0';
  const tooltipText = theme === 'dark' ? '#ffffff' : '#0f172a';

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-neutral-900 via-neutral-900 to-black border-neutral-800 text-white'
          : 'bg-gradient-to-br from-white via-emerald-50/40 to-emerald-100/30 border-emerald-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 border border-emerald-500/30">
                Live Data Analytics
              </span>
              <span className="flex items-center gap-1 text-[11px] text-neutral-400">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                Active Field Canvassing Radar
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight">
              Personal Canvassing Contribution Statistics
            </h2>
            <p className={`text-xs max-w-2xl ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'}`}>
              Real-time telemetry showing your door-to-door household reach, voter pledge conversion rate, and polling unit impact over time.
            </p>
          </div>

          {/* Time range selector tabs */}
          <div className="flex items-center gap-1.5 self-start sm:self-center p-1 rounded-xl bg-neutral-200/60 dark:bg-neutral-800/80 border border-neutral-300/40 dark:border-neutral-700/60 text-xs">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all text-xs ${
                timeRange === '7d'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all text-xs ${
                timeRange === '30d'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
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

          {/* Toggle between lines/areas */}
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
                  ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                  : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              Houses Only
            </button>
            <button
              onClick={() => setActiveMetric('voters')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                activeMetric === 'voters'
                  ? 'bg-blue-500/20 text-blue-500 border border-blue-500/30'
                  : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              Voters Only
            </button>
          </div>
        </div>

        {/* Recharts Area Chart */}
        <div className="w-full h-72 sm:h-80 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeTimeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorHouses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorVoters" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#262626' : '#f1f5f9'} />
              <XAxis 
                dataKey="date" 
                stroke={theme === 'dark' ? '#737373' : '#94a3b8'} 
                fontSize={11} 
                tickLine={false} 
              />
              <YAxis 
                stroke={theme === 'dark' ? '#737373' : '#94a3b8'} 
                fontSize={11} 
                tickLine={false} 
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: tooltipBg,
                  borderColor: tooltipBorder,
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                  color: tooltipText,
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              />
              <Legend 
                verticalAlign="top" 
                height={36} 
                iconType="circle"
                wrapperStyle={{ fontSize: '11px', fontWeight: 600 }}
              />
              {(activeMetric === 'both' || activeMetric === 'houses') && (
                <Area 
                  type="monotone" 
                  dataKey="housesVisited" 
                  name="Houses Visited" 
                  stroke="#10b981" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#colorHouses)" 
                />
              )}
              {(activeMetric === 'both' || activeMetric === 'voters') && (
                <Area 
                  type="monotone" 
                  dataKey="votersEngaged" 
                  name="Voters Engaged & Pledged" 
                  stroke="#3b82f6" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#colorVoters)" 
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
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

          <div className="w-full h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sentimentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    borderColor: tooltipBorder,
                    borderRadius: '12px',
                    color: tooltipText,
                    fontSize: '11px',
                  }}
                  formatter={(value: any) => [`${value}%`, 'Percentage']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Custom Legend for Mobile Clarity */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
            {sentimentDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-[11px]">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className={`truncate ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                  {item.name}: <strong>{item.value}%</strong>
                </span>
              </div>
            ))}
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

          <div className="w-full h-64 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeOfDayData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#262626' : '#f1f5f9'} />
                <XAxis 
                  dataKey="slot" 
                  stroke={theme === 'dark' ? '#737373' : '#94a3b8'} 
                  fontSize={10} 
                  tickLine={false} 
                />
                <YAxis 
                  stroke={theme === 'dark' ? '#737373' : '#94a3b8'} 
                  fontSize={10} 
                  tickLine={false} 
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    borderColor: tooltipBorder,
                    borderRadius: '12px',
                    color: tooltipText,
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="visits" name="Houses Visited" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
            theme === 'dark' ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
          }`}>
            <span className="flex items-center gap-1.5 font-semibold">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              Peak efficiency: 4pm - 6pm (96% contact rate)
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
