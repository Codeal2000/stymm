import React, { useState } from 'react';
import { TRAINING_LESSONS } from '../../data/campaignData';
import { TrainingLesson } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { BookOpen, CheckCircle2, Award, Clock, ArrowRight, Sparkles, Check, XCircle } from 'lucide-react';

export const MemberTraining: React.FC = () => {
  const { theme } = useTheme();
  const [lessons, setLessons] = useState<TrainingLesson[]>(TRAINING_LESSONS);
  const [activeLesson, setActiveLesson] = useState<TrainingLesson>(TRAINING_LESSONS[0]);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [certified, setCertified] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleCompleteLesson = (id: string) => {
    setLessons((prev) =>
      prev.map((l) => (l.id === id ? { ...l, completed: true } : l))
    );
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuizSubmitted(true);
    if (quizAnswer === 'b') {
      setCertified(true);
    }
  };

  const handleDownloadCertificate = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className={`border-b pb-4 space-y-2 transition-colors ${
        theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
      }`}>
        <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
          Grassroots Capacity Building
        </div>
        <h1 className={`text-2xl sm:text-3xl font-extrabold font-display transition-colors ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          STYMM Grassroots Training Academy
        </h1>
        <p className={`text-xs max-w-3xl leading-relaxed ${
          theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'
        }`}>
          Electoral law compliance, voter persuasion frameworks, BVAS accreditation supervision, and digital advocacy mastery.
        </p>
      </div>

      {certified && (
        <div className="p-6 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 border-2 border-emerald-400 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white shadow-xl animate-fadeIn">
          <div className="flex items-center gap-3">
            <Award className="w-10 h-10 text-emerald-300 shrink-0" />
            <div>
              <span className="font-extrabold text-white text-sm block">CERTIFICATE OF ELECTORAL CAPABILITY EARNED</span>
              <p className="text-emerald-100">You are officially accredited as a Certified STYMM Canvasser & Observer.</p>
            </div>
          </div>
          <button
            onClick={handleDownloadCertificate}
            className="px-5 py-2.5 bg-white text-emerald-950 font-bold rounded-xl transition-all shadow-md whitespace-nowrap hover:bg-emerald-50 active:scale-95"
          >
            {downloadSuccess ? "Certificate Downloaded!" : "Download Certificate (PDF)"}
          </button>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Course Syllabus / Lessons List with card-focus-group */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className={`text-xs font-bold uppercase tracking-wider ${
            theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'
          }`}>
            Mandatory Canvasser Modules
          </h2>

          <div className="space-y-2 card-focus-group">
            {lessons.map((lesson) => {
              const isSelected = activeLesson.id === lesson.id;
              return (
                <button
                  key={lesson.id}
                  onClick={() => {
                    setActiveLesson(lesson);
                    setQuizSubmitted(false);
                    setQuizAnswer(null);
                  }}
                  className={`w-full p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? theme === 'dark'
                        ? 'bg-neutral-900 border-emerald-500 text-white shadow-md'
                        : 'bg-emerald-50/80 border-emerald-600 text-emerald-950 shadow-md ring-2 ring-emerald-500/20'
                      : theme === 'dark'
                      ? 'bg-black border-neutral-800 text-neutral-300 hover:bg-neutral-900'
                      : 'bg-white border-emerald-100 text-slate-700 hover:border-emerald-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono text-emerald-500 font-bold">{lesson.category}</span>
                    <span className={`text-[11px] flex items-center gap-1 ${
                      theme === 'dark' ? 'text-neutral-400' : 'text-slate-400'
                    }`}>
                      <Clock className="w-3 h-3 text-emerald-500" />
                      {lesson.duration}
                    </span>
                  </div>

                  <h3 className={`font-bold text-sm leading-snug ${
                    isSelected ? (theme === 'dark' ? 'text-white' : 'text-emerald-950') : (theme === 'dark' ? 'text-neutral-200' : 'text-slate-900')
                  }`}>
                    {lesson.title}
                  </h3>

                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className={theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}>Status:</span>
                    {lesson.completed ? (
                      <span className="text-emerald-500 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </span>
                    ) : (
                      <span className="text-amber-500 font-semibold">In Progress</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Lesson Reader & Quiz */}
        <div className={`lg:col-span-7 border rounded-2xl p-6 sm:p-8 space-y-6 transition-all shadow-sm ${
          theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100'
        }`}>
          <div className={`space-y-2 border-b pb-4 ${theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'}`}>
            <span className="text-xs font-mono text-emerald-500 font-bold uppercase">{activeLesson.category}</span>
            <h2 className={`text-xl font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {activeLesson.title}
            </h2>
            <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-600'}`}>
              {activeLesson.summary}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Core Principles & Field Application
            </h3>
            <div className="space-y-2">
              {activeLesson.keyPoints.map((point, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${
                    theme === 'dark'
                      ? 'bg-black border-neutral-800 text-neutral-300' 
                      : 'bg-emerald-50/40 border-emerald-100 text-slate-700'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {!activeLesson.completed && (
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => handleCompleteLesson(activeLesson.id)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>Mark Module As Completed</span>
                <Check className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Quick Quiz */}
          <div className={`pt-4 border-t space-y-4 ${theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'}`}>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <h3 className={`text-sm font-bold font-display ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                Knowledge Check: Form EC8A & PU Security
              </h3>
            </div>

            <form onSubmit={handleQuizSubmit} className="space-y-3 text-xs">
              <p className={`font-semibold ${theme === 'dark' ? 'text-neutral-200' : 'text-slate-800'}`}>
                What must an accredited STYMM Polling Unit observer do before signing the duplicate of Form EC8A?
              </p>

              <label className={`block p-3 rounded-xl border cursor-pointer transition-colors ${
                quizAnswer === 'a' ? 'border-emerald-600 bg-emerald-50/50' : 
                theme === 'dark' 
                  ? 'bg-black border-neutral-800 hover:border-neutral-700 text-neutral-300' 
                  : 'bg-emerald-50/40 border-emerald-100 hover:border-emerald-300 text-slate-800'
              }`}>
                <input
                  type="radio"
                  name="quiz"
                  value="a"
                  checked={quizAnswer === 'a'}
                  onChange={() => setQuizAnswer('a')}
                  className="mr-2 text-emerald-600"
                />
                <span>Sign immediately without checking BVAS total accredited voters count.</span>
              </label>

              <label className={`block p-3 rounded-xl border cursor-pointer transition-colors ${
                quizAnswer === 'b' ? 'border-emerald-600 bg-emerald-50/50' : 
                theme === 'dark' 
                  ? 'bg-black border-neutral-800 hover:border-neutral-700 text-neutral-300' 
                  : 'bg-emerald-50/40 border-emerald-100 hover:border-emerald-300 text-slate-800'
              }`}>
                <input
                  type="radio"
                  name="quiz"
                  value="b"
                  checked={quizAnswer === 'b'}
                  onChange={() => setQuizAnswer('b')}
                  className="mr-2 text-emerald-600"
                />
                <span>Verify that total votes cast exactly match BVAS accredited voter figure and take clear photo.</span>
              </label>

              <label className={`block p-3 rounded-xl border cursor-pointer transition-colors ${
                quizAnswer === 'c' ? 'border-emerald-600 bg-emerald-50/50' : 
                theme === 'dark' 
                  ? 'bg-black border-neutral-800 hover:border-neutral-700 text-neutral-300' 
                  : 'bg-emerald-50/40 border-emerald-100 hover:border-emerald-300 text-slate-800'
              }`}>
                <input
                  type="radio"
                  name="quiz"
                  value="c"
                  checked={quizAnswer === 'c'}
                  onChange={() => setQuizAnswer('c')}
                  className="mr-2 text-emerald-600"
                />
                <span>Leave the polling unit before votes are sorted and announced openly.</span>
              </label>

              <button
                type="submit"
                disabled={!quizAnswer}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-all shadow-md"
              >
                Submit Answer
              </button>

              {quizSubmitted && (
                <div className={`p-3.5 rounded-xl text-xs font-semibold flex items-start gap-2.5 ${
                  quizAnswer === 'b' 
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30' 
                    : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                }`}>
                  {quizAnswer === 'b' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>Correct! BVAS accredited voter figure is the absolute legal benchmark for valid results.</div>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <div>Incorrect. The observer must strictly verify BVAS accredited voter count matches total cast.</div>
                    </>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
