import React, { useState } from 'react';
import { Send, CheckCircle2, MapPin, Phone, Mail } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const PublicContact: React.FC = () => {
  const { theme } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    state: 'Lagos',
    subject: 'Grassroots Partnership',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className={`border-b pb-8 space-y-3 transition-colors ${
        theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
      }`}>
        <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
          Campaign Secretariat & Media Enquiries
        </div>
        <h1 className={`text-3xl sm:text-5xl font-extrabold font-display transition-colors ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          Connect With STYMM Leadership
        </h1>
        <p className={`text-base max-w-3xl leading-relaxed ${
          theme === 'dark' ? 'text-neutral-300' : 'text-slate-600'
        }`}>
          Reach our national directorates, state secretariats, press offices, and volunteer coordination desks across Nigeria.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Form */}
        <div className={`lg:col-span-7 border rounded-2xl p-6 sm:p-8 space-y-6 transition-all shadow-sm ${
          theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100'
        }`}>
          <h2 className={`text-lg font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Send Official Message or Partnership Enquiry
          </h2>

          {submitted ? (
            <div className={`p-6 border rounded-xl space-y-3 text-center ${
              theme === 'dark'
                ? 'bg-black border-emerald-800 text-neutral-200'
                : 'bg-emerald-50 border-emerald-200 text-emerald-950'
            }`}>
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <h3 className="text-base font-bold">Message Dispatched Successfully</h3>
              <p className={`text-xs max-w-md mx-auto ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-600'}`}>
                Thank you for reaching out. The appropriate STYMM Zonal Secretariat or Media Officer will reply within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: '', email: '', phone: '', state: 'Lagos', subject: 'Grassroots Partnership', message: '' });
                }}
                className="mt-2 text-xs font-bold text-emerald-500 hover:underline"
              >
                Send Another Dispatch
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`w-full px-3.5 py-2.5 border rounded-xl text-xs transition-colors focus:outline-none ${
                      theme === 'dark'
                        ? 'bg-black border-neutral-800 text-white focus:border-emerald-500'
                        : 'bg-white border-emerald-200 text-slate-900 focus:border-emerald-600 shadow-sm'
                    }`}
                    placeholder="Comrade / Citizen Name"
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`w-full px-3.5 py-2.5 border rounded-xl text-xs transition-colors focus:outline-none ${
                      theme === 'dark'
                        ? 'bg-black border-neutral-800 text-white focus:border-emerald-500'
                        : 'bg-white border-emerald-200 text-slate-900 focus:border-emerald-600 shadow-sm'
                    }`}
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={`w-full px-3.5 py-2.5 border rounded-xl text-xs transition-colors focus:outline-none ${
                      theme === 'dark'
                        ? 'bg-black border-neutral-800 text-white focus:border-emerald-500'
                        : 'bg-white border-emerald-200 text-slate-900 focus:border-emerald-600 shadow-sm'
                    }`}
                    placeholder="080XXXXXXXX"
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                    Subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={`w-full px-3.5 py-2.5 border rounded-xl text-xs transition-colors focus:outline-none ${
                      theme === 'dark'
                        ? 'bg-black border-neutral-800 text-white focus:border-emerald-500'
                        : 'bg-white border-emerald-200 text-slate-900 focus:border-emerald-600 shadow-sm'
                    }`}
                  >
                    <option value="Grassroots Partnership">Grassroots Partnership / Wing Affiliate</option>
                    <option value="Media & Press Interview">Media & Press Interview Request</option>
                    <option value="Campus Vanguard Charter">Campus Vanguard Charter Accreditation</option>
                    <option value="Polling Unit Incident Report">Polling Unit / Ward Verification Query</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                  Your Detailed Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`w-full px-3.5 py-2.5 border rounded-xl text-xs transition-colors focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-black border-neutral-800 text-white focus:border-emerald-500'
                      : 'bg-white border-emerald-200 text-slate-900 focus:border-emerald-600 shadow-sm'
                  }`}
                  placeholder="State your proposition, ward details, or specific campaign request..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message to Secretariat</span>
              </button>
            </form>
          )}
        </div>

        {/* Zonal Headquarters Information with card-focus-group */}
        <div className="lg:col-span-5 space-y-6">
          <div className={`border rounded-2xl p-6 space-y-4 transition-all ${
            theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100 shadow-sm'
          }`}>
            <h3 className={`text-base font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Key Campaign Secretariats
            </h3>

            <div className="space-y-4 text-xs card-focus-group">
              <div className={`p-4 rounded-xl space-y-1 transition-all border ${
                theme === 'dark' ? 'bg-black border-neutral-800' : 'bg-emerald-50/50 border-emerald-100'
              }`}>
                <span className="font-bold text-emerald-500 block">National Campaign Headquarters (Abuja)</span>
                <p className={theme === 'dark' ? 'text-neutral-300' : 'text-slate-600'}>
                  Plot 1042, Shehu Shagari Way, Central Business District, Abuja FCT
                </p>
                <div className={`font-mono font-semibold ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
                  Hotline: +234 9 291 4400
                </div>
              </div>

              <div className={`p-4 rounded-xl space-y-1 transition-all border ${
                theme === 'dark' ? 'bg-black border-neutral-800' : 'bg-emerald-50/50 border-emerald-100'
              }`}>
                <span className="font-bold text-emerald-500 block">South-West Zonal Secretariat (Lagos)</span>
                <p className={theme === 'dark' ? 'text-neutral-300' : 'text-slate-600'}>
                  22 Isaac John Street, GRA Ikeja, Lagos State
                </p>
                <div className={`font-mono font-semibold ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
                  Phone: +234 803 000 8821
                </div>
              </div>

              <div className={`p-4 rounded-xl space-y-1 transition-all border ${
                theme === 'dark' ? 'bg-black border-neutral-800' : 'bg-emerald-50/50 border-emerald-100'
              }`}>
                <span className="font-bold text-emerald-500 block">Northern Mobilization Operations (Kano)</span>
                <p className={theme === 'dark' ? 'text-neutral-300' : 'text-slate-600'}>
                  Bompai Road Industrial Area, Kano Municipal, Kano State
                </p>
                <div className={`font-mono font-semibold ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
                  Phone: +234 706 000 9942
                </div>
              </div>

              <div className={`p-4 rounded-xl space-y-1 transition-all border ${
                theme === 'dark' ? 'bg-black border-neutral-800' : 'bg-emerald-50/50 border-emerald-100'
              }`}>
                <span className="font-bold text-emerald-500 block">South-South / South-East Hub (Port Harcourt)</span>
                <p className={theme === 'dark' ? 'text-neutral-300' : 'text-slate-600'}>
                  Trans-Amadi Commercial Layout, Port Harcourt, Rivers State
                </p>
                <div className={`font-mono font-semibold ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
                  Phone: +234 814 000 7731
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
