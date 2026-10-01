import React, { useState } from 'react';
import { CheckCircle2, BarChart3, Send } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const MemberSurveys: React.FC = () => {
  const { theme } = useTheme();
  const [selectedIssue, setSelectedIssue] = useState<string>('Youth Tech & Venture Grants');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('Extremely Critical');
  const [feedback, setFeedback] = useState('');
  const [hasVoted, setHasVoted] = useState(false);

  const issues = [
    { name: 'Youth Tech & Venture Grants', votes: 4120, pct: 38 },
    { name: 'Stable Electricity & Street Solar', votes: 2980, pct: 27 },
    { name: 'Food Prices & Agro-Processing Hubs', votes: 2150, pct: 20 },
    { name: 'Tertiary Education Bursaries & Skills', votes: 1650, pct: 15 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasVoted(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className={`border-b pb-4 space-y-2 transition-colors ${
        theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
      }`}>
        <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
          Grassroots Feedback Mechanism
        </div>
        <h1 className={`text-2xl sm:text-3xl font-extrabold font-display transition-colors ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          Ward Voter Sentiment & Priority Poll
        </h1>
        <p className={`text-xs max-w-3xl leading-relaxed ${
          theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'
        }`}>
          Direct intelligence from canvassers on what citizens in their communities care about most. Directly influences candidate policy communiqués.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Survey Form */}
        <div className={`lg:col-span-6 border rounded-2xl p-6 sm:p-8 space-y-6 transition-all shadow-sm ${
          theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100'
        }`}>
          <h2 className={`text-base font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Weekly Ward Field Poll (Ikeja LGA)
          </h2>

          {hasVoted ? (
            <div className={`p-6 border rounded-2xl space-y-2 text-center text-xs ${
              theme === 'dark'
                ? 'bg-black border-emerald-800 text-neutral-200'
                : 'bg-emerald-50 border-emerald-200 text-emerald-950'
            }`}>
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <div className="font-bold text-sm">Response Recorded!</div>
              <p className={theme === 'dark' ? 'text-neutral-300' : 'text-slate-600'}>
                Your ward sentiment entry has been aggregated into the National Coordinator&apos;s Policy Radar.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-2">
                <label className={`block font-semibold ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                  1. What is the #1 concern raised by citizens in your door-to-door interactions?
                </label>
                <div className="space-y-2 card-focus-group">
                  {issues.map((item) => (
                    <label
                      key={item.name}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                        theme === 'dark'
                          ? 'bg-black border-neutral-800 hover:border-neutral-700 text-neutral-200'
                          : 'bg-emerald-50/40 border-emerald-100 hover:border-emerald-300 text-slate-800'
                      }`}
                    >
                      <input
                        type="radio"
                        name="concern"
                        value={item.name}
                        checked={selectedIssue === item.name}
                        onChange={() => setSelectedIssue(item.name)}
                        className="accent-emerald-600"
                      />
                      <span>{item.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className={`block font-semibold ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                  2. Urgency rating among registered youth in your ward:
                </label>
                <select
                  value={selectedUrgency}
                  onChange={(e) => setSelectedUrgency(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-xl transition-colors focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-black border-neutral-800 text-white focus:border-emerald-500'
                      : 'bg-white border-emerald-200 text-slate-900 focus:border-emerald-600 shadow-sm'
                  }`}
                >
                  <option value="Extremely Critical">Extremely Critical</option>
                  <option value="Moderate Concern">Moderate Concern</option>
                  <option value="Secondary Priority">Secondary Priority</option>
                </select>
              </div>

              <div>
                <label className={`block font-semibold mb-1 ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                  3. Field Qualitative Notes (Direct citizen quotes):
                </label>
                <textarea
                  rows={3}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="e.g. Traders in Alausa market requested solar lamps for evening trading..."
                  className={`w-full px-3 py-2 border rounded-xl transition-colors focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-black border-neutral-800 text-white focus:border-emerald-500'
                      : 'bg-white border-emerald-200 text-slate-900 focus:border-emerald-600 shadow-sm'
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Ward Feedback</span>
              </button>
            </form>
          )}
        </div>

        {/* Live Aggregated Poll Results */}
        <div className={`lg:col-span-6 border rounded-2xl p-6 sm:p-8 space-y-6 transition-all shadow-sm ${
          theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100'
        }`}>
          <div className={`flex items-center justify-between border-b pb-3 ${
            theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
          }`}>
            <h2 className={`text-base font-bold font-display flex items-center gap-2 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              <BarChart3 className="w-4 h-4 text-emerald-500" />
              <span>National Voter Sentiment Breakdown</span>
            </h2>
            <span className={`text-[10px] font-mono ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
              10,900 Responses
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {issues.map((item) => (
              <div key={item.name} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className={`font-semibold ${theme === 'dark' ? 'text-neutral-200' : 'text-slate-800'}`}>
                    {item.name}
                  </span>
                  <span className="font-mono text-emerald-500 font-bold">{item.pct}%</span>
                </div>
                <div className={`w-full h-2 rounded-full overflow-hidden border ${
                  theme === 'dark' ? 'bg-black border-neutral-800' : 'bg-slate-100 border-slate-200'
                }`}>
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
                <div className={`text-[10px] font-mono text-right ${theme === 'dark' ? 'text-neutral-500' : 'text-slate-400'}`}>
                  {item.votes.toLocaleString()} verified responses
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
