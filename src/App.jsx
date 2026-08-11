import React, { useState } from 'react';

export default function App() {
  const [isYearly, setIsYearly] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C1917] font-sans antialiased selection:bg-orange-500 selection:text-white">
      
      {/* 1. Top Announcement Bar */}
      <div className="bg-stone-900 text-stone-300 text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="bg-orange-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Nyhet</span>
        <span>Smidigare integrationer för team är nu live!</span>
        <a href="#features" className="text-orange-400 hover:text-orange-300 underline font-semibold ml-1">Läs mer &rarr;</a>
      </div>

      {/* 2. Navigation Header */}
      <header className="border-b border-stone-200/80 sticky top-0 bg-[#FDFBF7]/85 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center font-bold text-lg text-white shadow-md shadow-orange-600/20 hover:scale-105 transition-transform">
              A
            </div>
            <span className="font-bold text-xl tracking-tight text-stone-900">ApexDesk</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <a href="#features" className="hover:text-orange-600 transition-colors">Funktioner</a>
            <a href="#testimonials" className="hover:text-orange-600 transition-colors">Omdömen</a>
            <a href="#pricing" className="hover:text-orange-600 transition-colors">Priser</a>
            <a href="#faq" className="hover:text-orange-600 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors">
              Logga in
            </button>
            <button className="bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-md shadow-orange-600/20 active:scale-95">
              Starta Gratis
            </button>
          </div>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-700 text-xs font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          ApexDesk 2.0 är redo för användning
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-stone-900 mb-6 leading-tight">
          Automatisera ditt SaaS-arbetsflöde på <span className="text-orange-600">halva tiden</span>
        </h1>

        <p className="text-stone-600 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          ApexDesk samlar dina projekt, insikter och kundgodkännanden på ett ställe. Byggt för snabbväxande företag och digitala team.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-orange-600/25 active:scale-95">
            Kom igång gratis
          </button>
          <button className="w-full sm:w-auto border border-stone-300 hover:border-stone-400 text-stone-800 font-semibold px-6 py-3 rounded-xl transition-all bg-white shadow-sm active:scale-95">
            Se demo-video
          </button>
        </div>

        {/* Dynamic Interactive Dashboard Mockup */}
        <div className="relative rounded-2xl border border-stone-200 bg-white p-2 shadow-2xl shadow-stone-300/60 text-left">
          <div className="rounded-xl overflow-hidden bg-[#18181B] border border-stone-800 p-6 text-white">
            
            {/* Window Bar */}
            <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>

              {/* Interactive Tabs */}
              <div className="flex gap-1 bg-stone-900 p-1 rounded-lg border border-stone-800 text-xs">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-1 rounded-md transition-all ${activeTab === 'overview' ? 'bg-orange-600 text-white font-medium' : 'text-stone-400 hover:text-white'}`}
                >
                  Översikt
                </button>
                <button 
                  onClick={() => setActiveTab('projects')}
                  className={`px-3 py-1 rounded-md transition-all ${activeTab === 'projects' ? 'bg-orange-600 text-white font-medium' : 'text-stone-400 hover:text-white'}`}
                >
                  Projekt
                </button>
                <button 
                  onClick={() => setActiveTab('analytics')}
                  className={`px-3 py-1 rounded-md transition-all ${activeTab === 'analytics' ? 'bg-orange-600 text-white font-medium' : 'text-stone-400 hover:text-white'}`}
                >
                  Analys
                </button>
              </div>

              <span className="text-xs text-stone-500 font-mono hidden sm:inline">apexdesk.io/app</span>
            </div>

            {/* Dashboard Dynamic Tab Content */}
            {activeTab === 'overview' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-stone-900 p-4 rounded-lg border border-stone-800 hover:border-orange-500/30 transition-all">
                    <span className="text-xs text-stone-400">Aktiva Projekt</span>
                    <p className="text-2xl font-bold text-white mt-1">24 st</p>
                    <span className="text-xs text-emerald-400">↑ 12% denna månad</span>
                  </div>
                  <div className="bg-stone-900 p-4 rounded-lg border border-stone-800 hover:border-orange-500/30 transition-all">
                    <span className="text-xs text-stone-400">MRR (Månatlig intäkt)</span>
                    <p className="text-2xl font-bold text-white mt-1">$14,250</p>
                    <span className="text-xs text-emerald-400">↑ 8% från förra veckan</span>
                  </div>
                  <div className="bg-stone-900 p-4 rounded-lg border border-stone-800 hover:border-orange-500/30 transition-all">
                    <span className="text-xs text-stone-400">Kundnöjdhet</span>
                    <p className="text-2xl font-bold text-white mt-1">99.4%</p>
                    <span className="text-xs text-orange-400">Baserat på 340 svar</span>
                  </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-stone-900 rounded-lg p-4 border border-stone-800">
                  <h4 className="text-xs font-semibold text-stone-400 mb-3 uppercase tracking-wider">Senaste Händelser</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center py-1.5 border-b border-stone-800/60">
                      <span className="text-stone-300">✅ Nytt godkännande mottaget från <strong>Acme Corp</strong></span>
                      <span className="text-stone-500">För 12 min sedan</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-stone-800/60">
                      <span className="text-stone-300">⚡ Automatiserad rapport skickades till <strong>Nordic Tech</strong></span>
                      <span className="text-stone-500">För 1 timme sedan</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5">
                      <span className="text-stone-300">🎉 Faktura #1042 blev betald</span>
                      <span className="text-stone-500">För 3 timmar sedan</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-3">
                <div className="bg-stone-900 p-4 rounded-lg border border-stone-800 flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Omdesign av Kundportal</h4>
                    <p className="text-xs text-stone-400 mt-0.5">Kund: TechNordic AB</p>
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2.5 py-1 rounded-full font-medium">Klar</span>
                </div>
                <div className="bg-stone-900 p-4 rounded-lg border border-stone-800 flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-semibold text-white">API-integration för Stripe</h4>
                    <p className="text-xs text-stone-400 mt-0.5">Kund: FlowSystems</p>
                  </div>
                  <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs px-2.5 py-1 rounded-full font-medium">Pågående</span>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="bg-stone-900 p-6 rounded-lg border border-stone-800 text-center py-10">
                <div className="w-12 h-12 rounded-full bg-orange-600/20 text-orange-500 flex items-center justify-center mx-auto mb-3 font-bold text-xl">📊</div>
                <h4 className="text-base font-semibold text-white">Realtidsanalys Aktiverad</h4>
                <p className="text-xs text-stone-400 max-w-sm mx-auto mt-1">Konverteringsgraden har ökat med 18.4% jämfört med förra månaden.</p>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 4. Social Proof / Logos */}
      <section className="border-y border-stone-200/80 bg-stone-100/50 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-6">
            Används av innovativa team och företag över hela Norden
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60 text-stone-700 font-bold text-lg tracking-wider">
            <span>NORDIC_LABS</span>
            <span>VERTEX</span>
            <span>AURA.IO</span>
            <span>FLOWSPACE</span>
            <span>KINETIC</span>
          </div>
        </div>
      </section>

      {/* 5. Metrics Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-sm">
            <p className="text-3xl font-extrabold text-orange-600">99.9%</p>
            <p className="text-xs font-medium text-stone-500 mt-1">Uptime SLA</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-sm">
            <p className="text-3xl font-extrabold text-stone-900">10k+</p>
            <p className="text-xs font-medium text-stone-500 mt-1">Aktiva användare</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-sm">
            <p className="text-3xl font-extrabold text-orange-600">2x</p>
            <p className="text-xs font-medium text-stone-500 mt-1">Snabbare leverans</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-sm">
            <p className="text-3xl font-extrabold text-stone-900">4.9/5</p>
            <p className="text-xs font-medium text-stone-500 mt-1">Genomsnittligt betyg</p>
          </div>
        </div>
      </section>

      {/* 6. Features Section */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-12 border-t border-stone-200/80">
        <div className="text-center mb-12">
          <span className="text-orange-600 font-semibold text-xs tracking-widest uppercase">Funktioner</span>
          <h2 className="text-3xl font-bold text-stone-900 mt-2">Allt du behöver för att skala ditt SaaS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-stone-200/80 p-6 rounded-2xl hover:border-orange-500/50 hover:shadow-xl transition-all">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold text-xl mb-4">⚡</div>
            <h3 className="font-bold text-lg text-stone-900 mb-2">Blixtsnabb Analytics</h3>
            <p className="text-stone-600 text-sm">Följ dina viktigaste nyckeltal och konverteringsgrader i realtid utan fördröjningar.</p>
          </div>

          <div className="bg-white border border-stone-200/80 p-6 rounded-2xl hover:border-orange-500/50 hover:shadow-xl transition-all">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold text-xl mb-4">🔐</div>
            <h3 className="font-bold text-lg text-stone-900 mb-2">Säkra Kundportaler</h3>
            <p className="text-stone-600 text-sm">Ge dina B2B-kunder en egen branded miljö för att granska filer, kommentarer och godkännanden.</p>
          </div>

          <div className="bg-white border border-stone-200/80 p-6 rounded-2xl hover:border-orange-500/50 hover:shadow-xl transition-all">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold text-xl mb-4">🔄</div>
            <h3 className="font-bold text-lg text-stone-900 mb-2">Smidiga Integrationer</h3>
            <p className="text-stone-600 text-sm">Koppla enkelt ihop plattformen med Stripe, Slack, Notion och dina befintliga verktyg.</p>
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section id="testimonials" className="max-w-6xl mx-auto px-6 py-16 border-t border-stone-200/80">
        <div className="text-center mb-12">
          <span className="text-orange-600 font-semibold text-xs tracking-widest uppercase">Omdömen</span>
          <h2 className="text-3xl font-bold text-stone-900 mt-2">Vad våra kunder säger</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-stone-200/80 p-6 rounded-2xl shadow-sm">
            <p className="text-stone-700 text-sm italic mb-4">
              "ApexDesk har helt förändrat hur vi hanterar våra kundprojekt. Vi sparar minst 10 timmar i veckan på administration."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center font-bold text-orange-700">
                E
              </div>
              <div>
                <p className="text-sm font-bold text-stone-900">Elin Lindqvist</p>
                <p className="text-xs text-stone-500">Grundare, Studio Design</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-stone-200/80 p-6 rounded-2xl shadow-sm">
            <p className="text-stone-700 text-sm italic mb-4">
              "Det beigevita och stilrena gränssnittet gör att det känns premium direkt. Våra kunder älskar portalen!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center font-bold text-stone-800">
                M
              </div>
              <div>
                <p className="text-sm font-bold text-stone-900">Marcus Berg</p>
                <p className="text-xs text-stone-500">CTO, FlowTech</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Pricing Section */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-16 border-t border-stone-200/80">
        <div className="text-center mb-10">
          <span className="text-orange-600 font-semibold text-xs tracking-widest uppercase">Prissättning</span>
          <h2 className="text-3xl font-bold text-stone-900 mt-2">Enkel prisstruktur. Inga överraskningar.</h2>

          {/* Pricing Toggle */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className={`text-sm ${!isYearly ? 'text-stone-900 font-semibold' : 'text-stone-500'}`}>Månadsvis</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-12 h-6 bg-orange-600 rounded-full p-1 transition-all flex items-center cursor-pointer"
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-all ${isYearly ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
            <span className={`text-sm ${isYearly ? 'text-stone-900 font-semibold' : 'text-stone-500'}`}>
              Årsvis <span className="bg-orange-500/10 text-orange-700 text-xs px-2 py-0.5 rounded-full border border-orange-500/20 font-medium">Spara 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Starter */}
          <div className="bg-white border border-stone-200 p-6 rounded-2xl flex flex-col justify-between shadow-sm hover:border-stone-300 transition-all">
            <div>
              <h3 className="font-bold text-lg text-stone-900">Starter</h3>
              <p className="text-stone-500 text-xs mt-1">Perfekt för frilansare och mindre projekt.</p>
              <div className="my-6">
                <span className="text-4xl font-extrabold text-stone-900">${isYearly ? '19' : '25'}</span>
                <span className="text-stone-500 text-sm"> / månad</span>
              </div>
              <ul className="space-y-3 text-sm text-stone-600 mb-6">
                <li>✓ Upp till 3 aktiva projekt</li>
                <li>✓ Basanalys och rapportering</li>
                <li>✓ Standard support</li>
              </ul>
            </div>
            <button className="w-full bg-stone-100 hover:bg-stone-200 text-stone-900 font-semibold py-2.5 rounded-xl transition-all">
              Välj Starter
            </button>
          </div>

          {/* Pro */}
          <div className="bg-stone-900 border-2 border-orange-500 p-6 rounded-2xl flex flex-col justify-between relative shadow-xl text-white hover:scale-[1.02] transition-all">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase">
              Populärast
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Pro Studio</h3>
              <p className="text-stone-400 text-xs mt-1">För växande byråer och team.</p>
              <div className="my-6">
                <span className="text-4xl font-extrabold text-white">${isYearly ? '49' : '59'}</span>
                <span className="text-stone-400 text-sm"> / månad</span>
              </div>
              <ul className="space-y-3 text-sm text-stone-300 mb-6">
                <li>✓ Obegränsat antal projekt</li>
                <li>✓ Custom branded kundportal</li>
                <li>✓ Avancerad automation</li>
                <li>✓ Prioriterad support</li>
              </ul>
            </div>
            <button className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2.5 rounded-xl transition-all shadow-lg shadow-orange-600/25">
              Starta 14 dagars trial
            </button>
          </div>

          {/* Enterprise */}
          <div className="bg-white border border-stone-200 p-6 rounded-2xl flex flex-col justify-between shadow-sm hover:border-stone-300 transition-all">
            <div>
              <h3 className="font-bold text-lg text-stone-900">Enterprise</h3>
              <p className="text-stone-500 text-xs mt-1">För större bolag med höga krav.</p>
              <div className="my-6">
                <span className="text-4xl font-extrabold text-stone-900">${isYearly ? '119' : '149'}</span>
                <span className="text-stone-500 text-sm"> / månad</span>
              </div>
              <ul className="space-y-3 text-sm text-stone-600 mb-6">
                <li>✓ Allt i Pro-planen</li>
                <li>✓ Egen dedikerad databas</li>
                <li>✓ Custom domän & SLA</li>
                <li>✓ 24/7 VIP Support</li>
              </ul>
            </div>
            <button className="w-full bg-stone-100 hover:bg-stone-200 text-stone-900 font-semibold py-2.5 rounded-xl transition-all">
              Kontakta oss
            </button>
          </div>
        </div>
      </section>

      {/* 9. Interactive FAQ Section */}
      <section id="faq" className="max-w-4xl mx-auto px-6 py-16 border-t border-stone-200/80">
        <div className="text-center mb-10">
          <span className="text-orange-600 font-semibold text-xs tracking-widest uppercase">FAQ</span>
          <h2 className="text-3xl font-bold text-stone-900 mt-2">Vanliga frågor</h2>
        </div>

        <div className="space-y-4">
          {[
            { q: "Hur kommer jag igång med ApexDesk?", a: "Du kan skapa ett konto helt gratis på 2 minuter utan att behöva ange något kreditkort." },
            { q: "Kan jag binda om min prenumeration när som helst?", a: "Ja, du har inga bindningstider och kan avsluta eller ändra plan när som helst." },
            { q: "Erbjuder ni anpassade integrationer?", a: "Ja, för Enterprise-kunder bygger vi skräddarsydda integrationer mot era befintliga system." }
          ].map((item, index) => (
            <div key={index} className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
              <button 
                onClick={() => toggleFaq(index)}
                className="w-full p-4 text-left font-semibold text-stone-900 flex justify-between items-center hover:bg-stone-50 transition-colors"
              >
                <span>{item.q}</span>
                <span className="text-orange-600 font-bold text-lg">{openFaq === index ? '−' : '+'}</span>
              </button>
              {openFaq === index && (
                <div className="p-4 pt-0 text-sm text-stone-600 border-t border-stone-100 bg-stone-50/50">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 10. Call to Action Banner */}
      <section className="max-w-6xl mx-auto px-6 my-12">
        <div className="bg-stone-900 rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Redo att ta dina projekt till nästa nivå?</h2>
          <p className="text-stone-400 max-w-xl mx-auto mb-8 text-sm md:text-base">
            Starta din 14-dagars fria testperiod idag. Inget kreditkort krävs.
          </p>
          <button className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-orange-600/30 active:scale-95">
            Kom igång nu &rarr;
          </button>
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="border-t border-stone-200/80 py-10 text-center text-xs text-stone-500 bg-white">
        <p>© 2026 ApexDesk Inc. Alla rättigheter förbehållna.</p>
      </footer>

    </div>
  );
}