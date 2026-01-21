
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LabelList
} from 'recharts';
import { 
  School, 
  Users, 
  MapPin, 
  CheckCircle2, 
  DollarSign,
  Navigation,
  Sun,
  Moon,
  Settings,
  X,
  AlignLeft,
  AlignCenter,
  AlignJustify,
  TrendingUp,
  Upload,
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
  footerTextTertiary: "Relatório Gerencial de Infraestrutura Escolar • Ciclo 2024",
  siteUrl: "https://jboliveira-maker.github.io/Reforma/",
  alignment: "left",
  isDarkMode: false
};

const App = () => {
  // Inicialização inteligente: Verifica localStorage antes de usar o padrão
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem("reformaEscolasConfig_v2");
      if (saved) {
        return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error("Erro ao carregar configurações", e);
    }
    return DEFAULT_CONFIG;
  });

  const [showSettings, setShowSettings] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sincroniza com localStorage sempre que o config mudar
  useEffect(() => {
    localStorage.setItem("reformaEscolasConfig_v2", JSON.stringify(config));
  }, [config]);

  const updateConfig = (key: keyof typeof DEFAULT_CONFIG, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const resetConfig = () => {
    if (confirm("Deseja restaurar as configurações padrão?")) {
      setConfig(DEFAULT_CONFIG);
      localStorage.removeItem("reformaEscolasConfig_v2");
    }
  };

  const sortedSchools = useMemo(() => {
    return [...INITIAL_SCHOOL_DATA].sort((a, b) => a.nome.localeCompare(b.nome));
  }, []);

  const totalInvestimento = useMemo(() => 
    sortedSchools.reduce((acc, school) => acc + school.valorInvestimento, 0),
  [sortedSchools]);

  const totalAlunos = useMemo(() => 
    sortedSchools.reduce((acc, school) => acc + school.alunos, 0), 
  [sortedSchools]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateConfig("headerImg", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${config.isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#fcfdff] text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 relative">
        
        {/* CONTROLES FLUTUANTES */}
        <div className="fixed top-6 right-6 flex gap-3 no-print z-50">
          <button 
            onClick={() => updateConfig("isDarkMode", !config.isDarkMode)}
            className={`p-3 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 ${config.isDarkMode ? 'bg-amber-400 text-slate-900' : 'bg-slate-900 text-white'}`}
          >
            {config.isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setShowSettings(true)}
            className={`p-3 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 ${config.isDarkMode ? 'bg-slate-800 text-slate-100' : 'bg-white text-slate-900 border border-slate-200'}`}
          >
            <Settings size={20} />
          </button>
        </div>

        {/* PAINEL DE CONFIGURAÇÕES */}
        {showSettings && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-md">
            <div className={`w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden border ${config.isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
              <div className="p-8 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
                <h3 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                  <Settings className="text-blue-600" /> Ajustes do Sistema
                </h3>
                <button onClick={() => setShowSettings(false)} className="hover:rotate-90 transition-transform"><X size={24} /></button>
              </div>
              
              <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase text-slate-400 block">Logotipo do Cabeçalho</label>
                  <div className="flex gap-2">
                    <button onClick={() => fileInputRef.current?.click()} className="flex-1 py-3 bg-blue-50 dark:bg-slate-800 text-blue-600 rounded-2xl border-2 border-dashed border-blue-200 dark:border-slate-700 hover:border-blue-500 transition-all flex items-center justify-center gap-2 font-bold"><Upload size={18}/> Enviar Logo</button>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
                  </div>
                  <input type="text" value={config.headerImg} onChange={(e) => updateConfig("headerImg", e.target.value)} placeholder="URL da imagem externa..." className="w-full px-5 py-3 rounded-2xl border dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                </div>
                
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase text-slate-400 block">Título do Relatório</label>
                  <input type="text" value={config.headerText} onChange={(e) => updateConfig("headerText", e.target.value)} className="w-full px-5 py-3 rounded-2xl border dark:bg-slate-800 dark:border-slate-700 outline-none" />
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-black uppercase text-slate-400 block">URL Oficial (GitHub Pages)</label>
                  <input type="text" value={config.siteUrl} onChange={(e) => updateConfig("siteUrl", e.target.value)} className="w-full px-5 py-3 rounded-2xl border dark:bg-slate-800 dark:border-slate-700 outline-none text-blue-600 font-bold" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-400 block">Rodapé Principal</label>
                    <input type="text" value={config.footerTextPrimary} onChange={(e) => updateConfig("footerTextPrimary", e.target.value)} className="w-full px-4 py-3 rounded-xl border dark:bg-slate-800" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-400 block">Instituição</label>
                    <input type="text" value={config.footerTextSecondary} onChange={(e) => updateConfig("footerTextSecondary", e.target.value)} className="w-full px-4 py-3 rounded-xl border dark:bg-slate-800" />
                  </div>
                </div>
              </div>

              <div className="p-8 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
                <button onClick={resetConfig} className="flex items-center gap-2 text-red-500 font-black text-[10px] uppercase hover:underline"><RefreshCw size={14}/> Limpar Tudo</button>
                <button onClick={() => setShowSettings(false)} className="px-10 bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-blue-700 active:scale-95 transition-all">Aplicar e Salvar</button>
              </div>
            </div>
          </div>
        )}

        {/* CABEÇALHO PRINCIPAL */}
        <header className={`mb-16 border-b-4 pb-12 flex flex-col items-center transition-colors ${config.isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
          <div className="mb-12 w-full min-h-[180px] flex items-center justify-center overflow-hidden">
            <img 
              src={config.headerImg} 
              alt="Logotipo" 
              className="w-auto max-w-[400px] max-h-[220px] object-contain filter drop-shadow-2xl transition-all duration-500 hover:scale-105" 
              onError={(e) => (e.currentTarget.src = DEFAULT_CONFIG.headerImg)} 
            />
          </div>
          <div className={`w-full py-10 px-12 text-center rounded-[3rem] shadow-2xl relative overflow-hidden ${config.isDarkMode ? 'bg-slate-900 text-blue-100 border border-slate-800' : 'bg-slate-900 text-white'}`}>
             <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:24px_24px]"></div>
             <h2 className="text-2xl md:text-3xl font-black uppercase tracking-[0.4em] leading-tight relative z-10">{config.headerText}</h2>
          </div>
        </header>

        {/* RESUMO EXECUTIVO */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            { label: 'Total em Obras', value: formatCurrency(totalInvestimento), icon: <DollarSign size={28} />, grad: 'from-blue-600 to-indigo-700' },
            { label: 'Alunos Impactados', value: totalAlunos.toLocaleString(), icon: <Users size={28} />, grad: 'from-emerald-500 to-teal-600' },
            { label: 'Unidades Atendidas', value: sortedSchools.length.toString(), icon: <School size={28} />, grad: 'from-amber-400 to-orange-500' }
          ].map((kpi, idx) => (
            <div key={idx} className={`p-10 rounded-[3.5rem] border flex flex-col items-center text-center shadow-xl transition-all hover:-translate-y-2 ${config.isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-100'}`}>
              <div className={`p-6 rounded-[2.5rem] shadow-lg bg-gradient-to-br ${kpi.grad} text-white mb-8`}>{kpi.icon}</div>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">{kpi.label}</span>
              <h3 className="text-3xl font-black tracking-tighter">{kpi.value}</h3>
            </div>
          ))}
        </section>

        {/* LISTAGEM TÉCNICA */}
        <section className="mb-32">
          <div className="flex items-center gap-6 mb-12">
            <div className="p-6 bg-slate-900 text-white rounded-[2rem] shadow-2xl"><TrendingUp size={36}/></div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Quadro Detalhado de Investimentos</h2>
          </div>
          <div className={`rounded-[3.5rem] shadow-2xl border overflow-hidden ${config.isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-10 py-8 text-[11px] font-black uppercase tracking-widest">Unidade Escolar</th>
                    <th className="px-10 py-8 text-[11px] font-black uppercase tracking-widest">Localização</th>
                    <th className="px-10 py-8 text-[11px] font-black uppercase tracking-widest text-center">Alunos</th>
                    <th className="px-10 py-8 text-[11px] font-black uppercase tracking-widest">Investimento</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {sortedSchools.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-10 py-8">
                        <div className="font-black text-[16px] text-slate-800 dark:text-blue-400">{s.nome}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">{s.segmento}</div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="text-xs font-black uppercase text-slate-600 dark:text-slate-300">{s.bairro}</div>
                        <div className="text-[11px] text-blue-600 font-bold uppercase">{s.macroregiao}</div>
                      </td>
                      <td className="px-10 py-8 text-center">
                        <span className="px-4 py-2 rounded-xl border-2 font-black text-xs">{s.alunos}</span>
                      </td>
                      <td className="px-10 py-8">
                        <div className="font-black text-[18px] text-emerald-600 tracking-tighter">{formatCurrency(s.valorInvestimento)}</div>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-900 text-white">
                    <td colSpan={3} className="px-10 py-10 text-right font-black uppercase tracking-widest text-slate-400">Investimento Total Estimado</td>
                    <td className="px-10 py-10 text-3xl font-black text-emerald-400 tracking-tighter">{formatCurrency(totalInvestimento)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* GEOLOCALIZAÇÃO */}
        <section className="mb-32">
          <div className="flex items-center gap-6 mb-12">
            <div className="p-6 bg-red-600 text-white rounded-[2rem] shadow-2xl"><Navigation size={36}/></div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Mapeamento de Obras</h2>
          </div>
          <div className="rounded-[4rem] overflow-hidden shadow-2xl border-[20px] h-[650px] border-white dark:border-slate-900 transition-all hover:border-slate-100">
            <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1cSOLT1IFTlPUrZYO_xxqzJV_EQF1S_I" width="100%" height="100%" className="border-0 brightness-[1.05]"></iframe>
          </div>
        </section>

        {/* CARDS DE SERVIÇOS */}
        <section className="mb-40">
          <div className="flex items-center gap-6 mb-16">
            <div className="p-6 bg-amber-500 text-white rounded-[2rem] shadow-2xl"><HardHat size={36}/></div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Escopo Técnico dos Serviços</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {sortedSchools.map(s => (
              <div key={s.id} className={`p-12 rounded-[4rem] border-b-[12px] shadow-2xl transition-all hover:-translate-y-3 hover:border-blue-600 group ${config.isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                <h5 className="font-black text-xl uppercase mb-8 leading-tight min-h-[3.5rem] group-hover:text-blue-600 transition-colors">{s.nome}</h5>
                <div className={`p-8 rounded-[2.5rem] italic text-sm leading-relaxed mb-8 border transition-all ${config.isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-[#f9fafc] border-slate-50'} group-hover:bg-white dark:group-hover:bg-slate-800`}>
                  "{s.servicos}"
                </div>
                <div className="flex justify-between items-end pt-8 border-t dark:border-slate-800">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-1.5 mb-2"><MapPin size={12}/> {s.bairro}</span>
                    <div className="text-xs font-black uppercase tracking-tight">{s.macroregiao}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Orçamento</span>
                    <div className="text-blue-600 font-black text-2xl tracking-tighter">{formatCurrency(s.valorInvestimento)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RODAPÉ E LINK OFICIAL */}
        <footer className="mt-40 pb-32 text-center border-t dark:border-slate-800 pt-24">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <p className="text-[11px] font-black uppercase tracking-[0.8em] text-slate-400 mb-6">{config.footerTextPrimary}</p>
              <h4 className="text-2xl font-black uppercase tracking-widest leading-tight">{config.footerTextSecondary}</h4>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-[0.2em]">{config.footerTextTertiary}</p>
            </div>
            
            <div className="pt-16 flex flex-col items-center gap-4">
              <div className="w-16 h-1.5 bg-blue-600 rounded-full mb-2"></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Plataforma de Consulta Online:</span>
              <a 
                href={config.siteUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm transition-all hover:scale-105 active:scale-95 shadow-xl ${
                  config.isDarkMode ? 'bg-slate-800 text-blue-400 hover:bg-slate-700' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                }`}
              >
                <Globe size={18}/> {config.siteUrl}
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
