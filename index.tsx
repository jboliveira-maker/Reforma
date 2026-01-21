
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  School, 
  Users, 
  MapPin, 
  DollarSign, 
  Navigation, 
  Sun, 
  Moon, 
  Settings, 
  X, 
  TrendingUp, 
  HardHat, 
  Globe, 
  RefreshCw 
} from 'lucide-react';

const INITIAL_SCHOOL_DATA = [
  { id: 1, nome: "Mário de Moraes Althenfelder Silva", segmento: "0 a 3 anos", alunos: 153, bairro: "Eldorado", macroregiao: "Cidade da Criança", regiao: "Norte", valorInvestimento: 8315878.81, servicos: "Troca de Cobertura, adequação de fluxo de cozinha, instalação de condicionadores de ar, reformas de sanitários, fechamento (muro e gradis), construção de lava mãos e lava pés, tanque de areia, pintura geral." },
  { id: 2, nome: "Chafic Ballura", segmento: "4 a 5 anos", alunos: 238, bairro: "Dom Lafaiete Libânio", macroregiao: "Pinheirinho", regiao: "Norte", valorInvestimento: 1794453.34, servicos: "Troca de cobertura, adequação de fluxo de cozinha, adequação elétrica com instalação de condicionadores de ar, rampas de acessibilidade, adequação de secretaria." },
  { id: 3, nome: "Pinochio", segmento: "4 a 5 anos", alunos: 162, bairro: "São Francisco", macroregiao: "HB", regiao: "Sul", valorInvestimento: 2165990.80, servicos: "Adequação em cobertura, demolição de cozinha existente, construção de cozinha e toda área de serviços, reforma de sanitários, troca de piso, rampas de acessibilidade, pintura predial, preparação para instalação de condicionadores de ar." },
  { id: 4, nome: "Monica e Cebolinha", segmento: "4 a 5 anos", alunos: 153, bairro: "Jd Belo Horizonte", macroregiao: "Cidade da Criança", regiao: "Norte", valorInvestimento: 2650209.43, servicos: "Adequação em cobertura, reforma de sanitárioas existentes, construção de novos sanitários, construção de banheiros PNEs, adequação fluxo de cozinha, construção de novo espaço de serviços, adequação de rampa de acessibilidade, pintural predial (prédio já climatizado)." },
  { id: 5, nome: "Gato de Botas", segmento: "0 a 3 anos", alunos: 100, bairro: "Redentora", macroregiao: "Centro", regiao: "Central", valorInvestimento: 2991029.46, servicos: "Construção de quatro salas de aula (B1, B2, M1 e M2), construção de fraldário, construção de sanitários, PNEs, troca de toda cobertura, construção de cozinha e área de serviços, instalação de condicionadores de ar." },
  { id: 6, nome: "Bosque Encantado", segmento: "4 a 5 anos", alunos: 121, bairro: "Jd do Bosque", macroregiao: "Bosque", regiao: "Norte", valorInvestimento: 981742.05, servicos: "Adequação em trecho de cobertura, construção de muro, construção de banheiros PNEs, construção de sanitários, construção de sala de professores, adequação de fluxo de cozinha, troca de piso e pintura predial." },
  { id: 7, nome: "Alberto José Ismael", segmento: "4 a 5 anos e 1º ao 5º ano", alunos: 300, bairro: "Jd Santa Catarina", macroregiao: "HB", regiao: "Oeste", valorInvestimento: 5067448.08, servicos: "Reforma geral." },
  { id: 8, nome: "Clóvis Sanfelice", segmento: "4 a 5 anos", alunos: 233, bairro: "Solo Sagrado", macroregiao: "Pinheirinho", regiao: "Norte", valorInvestimento: 2673948.02, servicos: "Troca de Cobertura, construção de estacionamento, consturção de rampas de acessibilidade, reforma de sanitários, adequação de fluxo de cozinha, construção de deposito, adequação de drenagem e trecho de muro, pintura predial, climatização." },
  { id: 9, nome: "Cleophas Beltran Silvente", segmento: "1º ao 5º ano", alunos: 400, bairro: "Jd Soraia", macroregiao: "Vila Toninho", regiao: "Leste", valorInvestimento: 2867954.10, servicos: "Adequação em cobertura, revitalização das salas de aula, informática e biblicoteca, construção de novos sanitários, inclusive PNEs, construção de novo espaço de cozinha e serviços, construção de novo espaço administrativo (diretoria, coordenação, secretaria), adequação de rampa acessível, pintura predial, climatização de novos espaços." },
  { id: 10, nome: "Pantera Cor de Rosa", segmento: "4 a 5 anos", alunos: 126, bairro: "Vila São Jorge", macroregiao: "Cidade da Criança", regiao: "Norte", valorInvestimento: 3271119.54, servicos: "Adequação em cobertura, construção de banherios PNEs, reforma de sanitários existentes, adequação de todo trecho administrativo (recpeção, secretaria, diretoria, coordenação, sala de professores e sanitários), adequacação de fluxo de cozinha, construção de biblioteca, troca de piso, pintura predial, instalação de condicionadores de ar." },
  { id: 11, nome: "Jacy Salles da Silva", segmento: "4 a 5 anos", alunos: 166, bairro: "Jd Jão Paulo II", macroregiao: "Bosque", regiao: "Norte", valorInvestimento: 2027636.01, servicos: "Adequação de fluxo de cozinha, ampliação de sala dos professores com sanitário, construção de novo espaço para biblioteca, construção de depositos, costrução de rampa acessível, construção de refeitório para funcionários, construção de sanitários, construção de sanitários PNEs, instalação de condicionadores de ar, adequação de estacionamento, manutenção em piso granilite, pintura predial." }
];

const DEFAULT_CONFIG = {
  headerImg: "https://www.riopreto.sp.gov.br/portal/images/logo_prefeitura.png",
  headerText: "Relatório Consolidado: Reforma Geral das Escolas",
  footerTextPrimary: "Rio Preto Educação",
  footerTextSecondary: "Governo Municipal de São José do Rio Preto",
  siteUrl: "https://jboliveira-maker.github.io/Reforma/",
  isDarkMode: false
};

const App = () => {
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem("reformaEscolas_v5");
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  });

  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    localStorage.setItem("reformaEscolas_v5", JSON.stringify(config));
  }, [config]);

  const updateConfig = (key: string, value: any) => {
    setConfig((prev: any) => ({ ...prev, [key]: value }));
  };

  const schools = useMemo(() => 
    [...INITIAL_SCHOOL_DATA].sort((a, b) => a.nome.localeCompare(b.nome)), 
  []);

  const totalInvestimento = useMemo(() => 
    schools.reduce((acc, s) => acc + s.valorInvestimento, 0), 
  [schools]);

  const totalAlunos = useMemo(() => 
    schools.reduce((acc, s) => acc + s.alunos, 0), 
  [schools]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${config.isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* BOTÕES DE CONTROLE */}
        <div className="fixed top-6 right-6 flex gap-3 no-print z-50">
          <button 
            onClick={() => updateConfig("isDarkMode", !config.isDarkMode)}
            className={`p-3 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 ${config.isDarkMode ? 'bg-amber-400 text-slate-900' : 'bg-slate-900 text-white'}`}
          >
            {config.isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setShowSettings(true)}
            className={`p-3 rounded-full shadow-2xl transition-all hover:scale-110 ${config.isDarkMode ? 'bg-slate-800' : 'bg-white border border-slate-200'}`}
          >
            <Settings size={20} />
          </button>
        </div>

        {/* CABEÇALHO */}
        <header className="mb-20 text-center space-y-8">
          <div className="flex justify-center">
            <img 
              src={config.headerImg} 
              alt="Logo Prefeitura" 
              className="h-32 object-contain drop-shadow-xl" 
              onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_CONFIG.headerImg; }}
            />
          </div>
          <div className="bg-slate-900 text-white py-12 px-8 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            <h1 className="text-2xl md:text-4xl font-black uppercase tracking-[0.2em] relative z-10">{config.headerText}</h1>
          </div>
        </header>

        {/* DASHBOARD KPIs */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className={`p-10 rounded-[3rem] border transition-all hover:-translate-y-2 shadow-xl ${config.isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <div className="bg-blue-600 text-white p-5 rounded-3xl inline-block mb-6 shadow-lg"><DollarSign size={32}/></div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Total em Investimentos</p>
            <h2 className="text-3xl font-black tracking-tighter">{formatCurrency(totalInvestimento)}</h2>
          </div>
          <div className={`p-10 rounded-[3rem] border transition-all hover:-translate-y-2 shadow-xl ${config.isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <div className="bg-emerald-500 text-white p-5 rounded-3xl inline-block mb-6 shadow-lg"><Users size={32}/></div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Alunos Beneficiados</p>
            <h2 className="text-3xl font-black tracking-tighter">{totalAlunos.toLocaleString()}</h2>
          </div>
          <div className={`p-10 rounded-[3rem] border transition-all hover:-translate-y-2 shadow-xl ${config.isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <div className="bg-amber-500 text-white p-5 rounded-3xl inline-block mb-6 shadow-lg"><School size={32}/></div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Unidades em Reforma</p>
            <h2 className="text-3xl font-black tracking-tighter">{schools.length}</h2>
          </div>
        </section>

        {/* TABELA DE INVESTIMENTOS */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-10">
            <TrendingUp className="text-blue-600" size={32}/>
            <h2 className="text-3xl font-black uppercase tracking-tighter">Detalhamento de Investimentos</h2>
          </div>
          <div className={`rounded-[3rem] overflow-hidden border shadow-2xl ${config.isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-10 py-8 text-[11px] font-black uppercase tracking-widest">Unidade Escolar</th>
                    <th className="px-10 py-8 text-[11px] font-black uppercase tracking-widest text-center">Alunos</th>
                    <th className="px-10 py-8 text-[11px] font-black uppercase tracking-widest">Valor Investido</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {schools.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-10 py-8">
                        <div className="font-black text-blue-600 dark:text-blue-400 text-lg">{s.nome}</div>
                        <div className="text-[10px] font-bold uppercase text-slate-400 mt-1 tracking-widest">{s.bairro} — {s.macroregiao}</div>
                      </td>
                      <td className="px-10 py-8 text-center font-black text-slate-500">{s.alunos}</td>
                      <td className="px-10 py-8 font-black text-emerald-600 text-lg">{formatCurrency(s.valorInvestimento)}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-100 dark:bg-slate-800">
                    <td colSpan={2} className="px-10 py-10 text-right font-black uppercase tracking-widest text-slate-400">Total Geral do Ciclo</td>
                    <td className="px-10 py-10 text-3xl font-black text-blue-600 dark:text-blue-400">{formatCurrency(totalInvestimento)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* MAPA */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-10">
            <Navigation className="text-red-600" size={32}/>
            <h2 className="text-3xl font-black uppercase tracking-tighter">Geolocalização das Obras</h2>
          </div>
          <div className="rounded-[4rem] overflow-hidden shadow-2xl border-[16px] h-[600px] border-white dark:border-slate-900 transition-all hover:border-slate-100">
            <iframe 
              src="https://www.google.com/maps/d/u/0/embed?mid=1cSOLT1IFTlPUrZYO_xxqzJV_EQF1S_I" 
              width="100%" 
              height="100%" 
              className="border-0 grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>
        </section>

        {/* CARDS DE ESCOPO */}
        <section className="mb-40">
          <div className="flex items-center gap-4 mb-16">
            <HardHat className="text-amber-500" size={32}/>
            <h2 className="text-3xl font-black uppercase tracking-tighter">Escopo Técnico dos Serviços</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {schools.map(s => (
              <div key={s.id} className={`p-10 rounded-[3.5rem] border-b-[10px] shadow-2xl transition-all hover:-translate-y-3 hover:border-blue-600 ${config.isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                <h3 className="font-black text-xl uppercase mb-6 leading-tight min-h-[3rem]">{s.nome}</h3>
                <div className={`p-6 rounded-3xl italic text-sm leading-relaxed mb-8 border ${config.isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-50'}`}>
                  "{s.servicos}"
                </div>
                <div className="pt-6 border-t dark:border-slate-800 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span className="flex items-center gap-1"><MapPin size={12}/> {s.bairro}</span>
                  <span className="text-blue-600 dark:text-blue-400">{formatCurrency(s.valorInvestimento)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RODAPÉ */}
        <footer className="mt-40 pb-32 text-center border-t dark:border-slate-800 pt-20">
          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">{config.footerTextPrimary}</p>
            <h4 className="text-2xl font-black uppercase tracking-widest">{config.footerTextSecondary}</h4>
            <div className="pt-10 flex flex-col items-center gap-4">
              <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
              <a href={config.siteUrl} target="_blank" className="flex items-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-3xl font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition-all">
                <Globe size={18}/> Acessar Portal de Transparência
              </a>
            </div>
          </div>
        </footer>

        {/* SETTINGS MODAL */}
        {showSettings && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-md">
            <div className={`w-full max-w-xl rounded-[3rem] p-12 shadow-2xl border ${config.isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white'}`}>
              <div className="flex justify-between items-center mb-10 pb-6 border-b dark:border-slate-800">
                <h3 className="text-xl font-black uppercase tracking-widest">Personalizar Apresentação</h3>
                <button onClick={() => setShowSettings(false)} className="hover:rotate-90 transition-transform"><X/></button>
              </div>
              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">Título Principal</label>
                  <input 
                    type="text" 
                    value={config.headerText} 
                    onChange={e => updateConfig("headerText", e.target.value)} 
                    className="w-full p-5 rounded-2xl border dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">URL da Logo</label>
                  <input 
                    type="text" 
                    value={config.headerImg} 
                    onChange={e => updateConfig("headerImg", e.target.value)} 
                    className="w-full p-5 rounded-2xl border dark:bg-slate-800 dark:border-slate-700 outline-none" 
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => { localStorage.removeItem("reformaEscolas_v5"); window.location.reload(); }} 
                    className="flex-1 py-5 border-2 rounded-3xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <RefreshCw size={14} className="inline mr-2"/> Resetar
                  </button>
                  <button 
                    onClick={() => setShowSettings(false)} 
                    className="flex-[2] py-5 bg-blue-600 text-white rounded-3xl font-black uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
