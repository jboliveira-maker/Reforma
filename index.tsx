
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LabelList
} from 'recharts';
import { 
  School, 
  Users, 
  MapPin, 
  CheckCircle2, 
  Info,
  DollarSign,
  Layers,
  Navigation,
  Sun,
  Moon,
  Settings,
  X,
  AlignLeft,
  AlignCenter,
  AlignJustify,
  Type,
  ImageIcon,
  TrendingUp,
  Upload,
  Globe,
  LayoutDashboard,
  FileText,
  HardHat
} from 'lucide-react';

const INITIAL_SCHOOL_DATA = [
  {
    id: 1,
    nome: "Mário de Moraes Althenfelder Silva",
    segmento: "0 a 3 anos",
    alunos: 153,
    bairro: "Eldorado",
    macroregiao: "Cidade da Criança",
    regiao: "Norte",
    valorInvestimento: 8315878.81,
    servicos: "Troca de Cobertura, adequação de fluxo de cozinha, instalação de condicionadores de ar, reformas de sanitários, fechamento (muro e gradis), construção de lava mãos e lava pés, tanque de areia, pintura geral."
  },
  {
    id: 2,
    nome: "Chafic Ballura",
    segmento: "4 a 5 anos",
    alunos: 238,
    bairro: "Dom Lafaiete Libânio",
    macroregiao: "Pinheirinho",
    regiao: "Norte",
    valorInvestimento: 1794453.34,
    servicos: "Troca de cobertura, adequação de fluxo de cozinha, adequação elétrica com instalação de condicionadores de ar, rampas de acessibilidade, adequação de secretaria."
  },
  {
    id: 3,
    nome: "Pinochio",
    segmento: "4 a 5 anos",
    alunos: 162,
    bairro: "São Francisco",
    macroregiao: "HB",
    regiao: "Sul",
    valorInvestimento: 2165990.80,
    servicos: "Adequação em cobertura, demolição de cozinha existente, construção de cozinha e toda área de serviços, reforma de sanitários, troca de piso, rampas de acessibilidade, pintura predial, preparação para instalação de condicionadores de ar."
  },
  {
    id: 4,
    nome: "Monica e Cebolinha",
    segmento: "4 a 5 anos",
    alunos: 153,
    bairro: "Jd Belo Horizonte",
    macroregiao: "Cidade da Criança",
    regiao: "Norte",
    valorInvestimento: 2650209.43,
    servicos: "Adequação em cobertura, reforma de sanitárioas existentes, construção de novos sanitários, construção de banheiros PNEs, adequação fluxo de cozinha, construção de novo espaço de serviços, adequação de rampa de acessibilidade, pintural predial (prédio já climatizado)."
  },
  {
    id: 5,
    nome: "Gato de Botas",
    segmento: "0 a 3 anos",
    alunos: 100,
    bairro: "Redentora",
    macroregiao: "Centro",
    regiao: "Central",
    valorInvestimento: 2991029.46,
    servicos: "Construção de quatro salas de aula (B1, B2, M1 e M2), construção de fraldário, construção de sanitários, PNEs, troca de toda cobertura, construção de cozinha e área de serviços, instalação de condicionadores de ar."
  },
  {
    id: 6,
    nome: "Bosque Encantado",
    segmento: "4 a 5 anos",
    alunos: 121,
    bairro: "Jd do Bosque",
    macroregiao: "Bosque",
    regiao: "Norte",
    valorInvestimento: 981742.05,
    servicos: "Adequação em trecho de cobertura, construção de muro, construção de banheiros PNEs, construção de sanitários, construção de sala de professores, adequação de fluxo de cozinha, troca de piso e pintura predial."
  },
  {
    id: 7,
    nome: "Alberto José Ismael",
    segmento: "4 a 5 anos e 1º ao 5º ano",
    alunos: 300,
    bairro: "Jd Santa Catarina",
    macroregiao: "HB",
    regiao: "Oeste",
    valorInvestimento: 5067448.08,
    servicos: "Reforma geral."
  },
  {
    id: 8,
    nome: "Clóvis Sanfelice",
    segmento: "4 a 5 anos",
    alunos: 233,
    bairro: "Solo Sagrado",
    macroregiao: "Pinheirinho",
    regiao: "Norte",
    valorInvestimento: 2673948.02,
    servicos: "Troca de Cobertura, construção de estacionamento, consturção de rampas de acessibilidade, reforma de sanitários, adequação de fluxo de cozinha, construção de deposito, adequação de drenagem e trecho de muro, pintura predial, climatização."
  },
  {
    id: 9,
    nome: "Cleophas Beltran Silvente",
    segmento: "1º ao 5º ano",
    alunos: 400,
    bairro: "Jd Soraia",
    macroregiao: "Vila Toninho",
    regiao: "Leste",
    valorInvestimento: 2867954.10,
    servicos: "Adequação em cobertura, revitalização das salas de aula, informática e biblicoteca, construção de novos sanitários, inclusive PNEs, construção de novo espaço de cozinha e serviços, construção de novo espaço administrativo (diretoria, coordenação, secretaria), adequação de rampa acessível, pintura predial, climatização de novos espaços."
  },
  {
    id: 10,
    nome: "Pantera Cor de Rosa",
    segmento: "4 a 5 anos",
    alunos: 126,
    bairro: "Vila São Jorge",
    macroregiao: "Cidade da Criança",
    regiao: "Norte",
    valorInvestimento: 3271119.54,
    servicos: "Adequação em cobertura, construção de banherios PNEs, reforma de sanitários existentes, adequação de todo trecho administrativo (recpeção, secretaria, diretoria, coordenação, sala de professores e sanitários), adequacação de fluxo de cozinha, construção de biblioteca, troca de piso, pintura predial, instalação de condicionadores de ar."
  },
  {
    id: 11,
    nome: "Jacy Salles da Silva",
    segmento: "4 a 5 anos",
    alunos: 166,
    bairro: "Jd Jão Paulo II",
    macroregiao: "Bosque",
    regiao: "Norte",
    valorInvestimento: 2027636.01,
    servicos: "Adequação de fluxo de cozinha, ampliação de sala dos professores com sanitário, construção de novo espaço para biblioteca, construção de depositos, costrução de rampa acessível, construção de refeitório para funcionários, construção de sanitários, construção de sanitários PNEs, instalação de condicionadores de ar, adequação de estacionamento, manutenção em piso granilite, pintura predial."
  }
];

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316', '#6366f1', '#14b8a6', '#f43f5e'];

const loadFromStorage = (key: string, defaultValue: string) => {
  const saved = localStorage.getItem(key);
  return saved !== null ? saved : defaultValue;
};

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [headerImg, setHeaderImg] = useState(() => loadFromStorage("headerImg", "https://www.riopreto.sp.gov.br/portal/images/logo_prefeitura.png"));
  const [headerText, setHeaderText] = useState(() => loadFromStorage("headerText", "Relatório Consolidado: Reforma Geral das Escolas"));
  const [footerTextPrimary, setFooterTextPrimary] = useState(() => loadFromStorage("footerTextPrimary", "Rio Preto Educação"));
  const [footerTextSecondary, setFooterTextSecondary] = useState(() => loadFromStorage("footerTextSecondary", "Governo Municipal de São José do Rio Preto"));
  const [footerTextTertiary, setFooterTextTertiary] = useState(() => loadFromStorage("footerTextTertiary", "Relatório Gerencial de Infraestrutura Escolar • Ciclo 2024"));
  const [alignment, setAlignment] = useState<'left' | 'center' | 'justify'>(() => loadFromStorage("alignment", "left") as 'left' | 'center' | 'justify');

  useEffect(() => { localStorage.setItem("headerImg", headerImg); }, [headerImg]);
  useEffect(() => { localStorage.setItem("headerText", headerText); }, [headerText]);
  useEffect(() => { localStorage.setItem("footerTextPrimary", footerTextPrimary); }, [footerTextPrimary]);
  useEffect(() => { localStorage.setItem("footerTextSecondary", footerTextSecondary); }, [footerTextSecondary]);
  useEffect(() => { localStorage.setItem("footerTextTertiary", footerTextTertiary); }, [footerTextTertiary]);
  useEffect(() => { localStorage.setItem("alignment", alignment); }, [alignment]);

  const sortedSchools = useMemo(() => {
    return [...INITIAL_SCHOOL_DATA].sort((a, b) => a.nome.localeCompare(b.nome));
  }, []);

  const totalInvestimento = useMemo(() => 
    sortedSchools.reduce((acc, school) => acc + school.valorInvestimento, 0),
  [sortedSchools]);

  const totalAlunos = useMemo(() => 
    sortedSchools.reduce((acc, school) => acc + school.alunos, 0), 
  [sortedSchools]);

  // Gráfico 1: Alunos por Segmento (Horizontal)
  const segmentData = useMemo(() => {
    const counts: Record<string, number> = {};
    sortedSchools.forEach(s => {
      counts[s.segmento] = (counts[s.segmento] || 0) + s.alunos;
    });
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  }, [sortedSchools]);

  // Gráfico 2: Investimento por Macroregião
  const macroregionData = useMemo(() => {
    const data: Record<string, number> = {};
    sortedSchools.forEach(s => {
      data[s.macroregiao] = (data[s.macroregiao] || 0) + s.valorInvestimento;
    });
    return Object.keys(data).map(key => ({ name: key, value: data[key] }));
  }, [sortedSchools]);

  // Gráfico 3: Segmento Escolar vs Valor R$
  const segmentValueData = useMemo(() => {
    const data: Record<string, number> = {};
    sortedSchools.forEach(s => {
      data[s.segmento] = (data[s.segmento] || 0) + s.valorInvestimento;
    });
    return Object.keys(data).map(key => ({ name: key, value: data[key] }));
  }, [sortedSchools]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setHeaderImg(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#fcfdff] text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 relative">
        
        {/* TOP CONTROLS */}
        <div className="fixed top-6 right-6 flex gap-3 no-print z-50">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-3 rounded-full shadow-xl transition-all hover:scale-110 active:scale-95 ${isDarkMode ? 'bg-amber-400 text-slate-900' : 'bg-slate-900 text-white'}`}
            title="Alternar Modo Claro/Escuro"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setShowSettings(true)}
            className={`p-3 rounded-full shadow-xl transition-all hover:scale-110 active:scale-95 ${isDarkMode ? 'bg-slate-800 text-slate-100' : 'bg-white text-slate-900 border border-slate-200'}`}
            title="Configurações de Layout"
          >
            <Settings size={20} />
          </button>
        </div>

        {/* SETTINGS MODAL */}
        {showSettings && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className={`w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
              <div className="p-8 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                  <Settings className="text-blue-600" /> Painel de Customização
                </h3>
                <button onClick={() => setShowSettings(false)} className="hover:rotate-90 transition-transform">
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <ImageIcon size={14} /> Logotipo do Cabeçalho
                  </label>
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-dashed transition-all hover:border-blue-500 hover:bg-blue-50/10 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}
                      >
                        <Upload size={18} /> Upar Imagem
                      </button>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileUpload} 
                        accept="image/*" 
                        className="hidden" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ou insira uma URL direta:</label>
                      <input 
                        type="text" 
                        value={headerImg} 
                        onChange={(e) => setHeaderImg(e.target.value)}
                        placeholder="Cole aqui o link da imagem..."
                        className={`w-full px-6 py-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'} focus:ring-2 focus:ring-blue-500 outline-none`}
                      />
                    </div>
                  </div>

                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 mt-6">
                    <Type size={14} /> Título do Relatório
                  </label>
                  <input 
                    type="text" 
                    value={headerText} 
                    onChange={(e) => setHeaderText(e.target.value)}
                    className={`w-full px-6 py-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'} focus:ring-2 focus:ring-blue-500 outline-none`}
                  />
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Texto do Rodapé (Principal)</label>
                  <input 
                    type="text" 
                    value={footerTextPrimary} 
                    onChange={(e) => setFooterTextPrimary(e.target.value)}
                    className={`w-full px-6 py-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'} focus:ring-2 focus:ring-blue-500 outline-none`}
                  />
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Texto do Rodapé (Secundário)</label>
                  <input 
                    type="text" 
                    value={footerTextSecondary} 
                    onChange={(e) => setFooterTextSecondary(e.target.value)}
                    className={`w-full px-6 py-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'} focus:ring-2 focus:ring-blue-500 outline-none`}
                  />
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Texto do Rodapé (Terciário)</label>
                  <input 
                    type="text" 
                    value={footerTextTertiary} 
                    onChange={(e) => setFooterTextTertiary(e.target.value)}
                    className={`w-full px-6 py-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'} focus:ring-2 focus:ring-blue-500 outline-none`}
                  />
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Alinhamento do Conteúdo</label>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setAlignment('left')}
                      className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border-2 transition-all ${alignment === 'left' ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'border-slate-200 dark:border-slate-700'}`}
                    >
                      <AlignLeft size={18} /> Esquerda
                    </button>
                    <button 
                      onClick={() => setAlignment('center')}
                      className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border-2 transition-all ${alignment === 'center' ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'border-slate-200 dark:border-slate-700'}`}
                    >
                      <AlignCenter size={18} /> Centralizado
                    </button>
                    <button 
                      onClick={() => setAlignment('justify')}
                      className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border-2 transition-all ${alignment === 'justify' ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'border-slate-200 dark:border-slate-700'}`}
                    >
                      <AlignJustify size={18} /> Justificado
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-slate-50 dark:bg-slate-800/50 flex gap-4">
                <button 
                  onClick={() => setShowSettings(false)}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                >
                  Salvar e Fechar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* HEADER */}
        <header className={`mb-16 border-b-4 pb-12 flex flex-col items-center relative transition-colors ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
          <div className="flex flex-col items-center mb-10 w-full px-4 min-h-[160px] justify-center overflow-visible">
            {headerImg ? (
              <img 
                key={headerImg}
                src={headerImg} 
                alt="Logotipo" 
                className="w-auto max-w-full max-h-[240px] object-contain block mx-auto transition-all duration-700 animate-fade-in filter drop-shadow-xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const fallback = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Bras%C3%A3o_de_S%C3%A3o_Jos%C3%A9_do_Rio_Preto.png/200px-Bras%C3%A3o_de_S%C3%A3o_Jos%C3%A9_do_Rio_Preto.png";
                  if (target.src !== fallback) {
                    target.src = fallback;
                  }
                }}
              />
            ) : (
              <div className="w-full h-[140px] flex items-center justify-center text-slate-300 uppercase font-black tracking-widest border-2 border-dashed rounded-3xl">
                Sem Logotipo Definido
              </div>
            )}
          </div>
          
          <div className={`w-full py-8 px-12 text-center rounded-[2.5rem] relative shadow-2xl overflow-hidden ${isDarkMode ? 'bg-slate-900 text-blue-100 border border-slate-800' : 'bg-slate-900 text-white'}`}>
             <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:32px_32px]"></div>
             <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-600/10 to-transparent pointer-events-none"></div>
             <h2 className="text-2xl md:text-3xl font-black uppercase tracking-[0.35em] relative z-10 leading-tight">
               {headerText}
             </h2>
          </div>
        </header>

        {/* SUMARIO EXECUTIVO - 3 CARDS CENTRALIZADOS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { 
              label: 'Financeiro', 
              title: 'Investimento Global', 
              value: formatCurrency(totalInvestimento), 
              icon: <DollarSign size={24} />, 
              color: 'blue',
              gradient: 'from-blue-600 to-indigo-600',
              shadow: 'shadow-blue-500/20'
            },
            { 
              label: 'Discentes', 
              title: 'Alunos Beneficiados', 
              value: `${totalAlunos.toLocaleString()}`, 
              suffix: 'Estudantes Atendidos',
              icon: <Users size={24} />, 
              color: 'emerald',
              gradient: 'from-emerald-500 to-teal-600',
              shadow: 'shadow-emerald-500/20'
            },
            { 
              label: 'Execução', 
              title: 'Unidades de Ensino', 
              value: `${sortedSchools.length}`, 
              suffix: 'Escolas em Reforma',
              icon: <School size={24} />, 
              color: 'amber',
              gradient: 'from-amber-400 to-orange-500',
              shadow: 'shadow-amber-500/20'
            }
          ].map((kpi, idx) => (
            <div 
              key={idx} 
              className={`group relative p-10 rounded-[3rem] border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center ${
                isDarkMode 
                  ? 'bg-slate-900/60 border-slate-800 backdrop-blur-xl' 
                  : 'bg-white/70 border-slate-100 backdrop-blur-xl'
              } ${kpi.shadow}`}
            >
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r ${kpi.gradient} rounded-b-full`}></div>
              
              <div className="mb-8">
                 <div className={`p-5 rounded-3xl shadow-lg bg-gradient-to-br ${kpi.gradient} text-white transform group-hover:scale-110 transition-transform duration-500`}>
                    {kpi.icon}
                 </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2 block">{kpi.label}</span>
                <p className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-50'}`}>
                  {kpi.title}
                </p>
                <h3 className={`text-3xl font-black leading-none tracking-tight transition-colors ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                } group-hover:text-blue-600`}>
                  {kpi.value}
                </h3>
                {kpi.suffix && (
                  <p className="text-[11px] font-black text-slate-400 mt-3 uppercase tracking-tighter">
                    {kpi.suffix}
                  </p>
                )}
              </div>

              <div className={`mt-8 w-24 h-1.5 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
                <div className={`h-full bg-gradient-to-r ${kpi.gradient} transition-all duration-1000 w-0 group-hover:w-full`}></div>
              </div>
            </div>
          ))}
        </section>

        {/* CONTEÚDO PRINCIPAL */}
        <section className="space-y-32">
          
          {/* 1. TABELA DE INVESTIMENTO - COLORIDA E PROFISSIONAL */}
          <div id="tabela-investimento" className="page-break pt-4">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-6">
                <div className={`p-6 rounded-[2rem] shadow-2xl transition-transform hover:rotate-3 ${isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-slate-900 text-white'}`}>
                  <TrendingUp size={36} />
                </div>
                <div>
                  <h2 className={`text-4xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Tabela Detalhada de Investimentos</h2>
                </div>
              </div>
            </div>

            <div className={`rounded-[3.5rem] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.1)] border overflow-hidden ${isDarkMode ? 'bg-slate-900/40 border-slate-800 backdrop-blur-md' : 'bg-white border-slate-100'}`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className={`${isDarkMode ? 'bg-slate-800' : 'bg-slate-900'} text-white`}>
                      <th className="px-8 py-7 text-[10px] font-black uppercase tracking-[0.4em]">Unidade Escolar</th>
                      <th className="px-8 py-7 text-[10px] font-black uppercase tracking-[0.4em]">Localização / Macroregião</th>
                      <th className="px-8 py-7 text-[10px] font-black uppercase tracking-[0.4em] text-center">Alunos</th>
                      <th className="px-8 py-7 text-[10px] font-black uppercase tracking-[0.4em]">Investimento</th>
                      <th className="px-8 py-7 text-[10px] font-black uppercase tracking-[0.4em] text-center">Situação</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800' : 'divide-slate-50'}`}>
                    {sortedSchools.map((school, idx) => {
                      const color = COLORS[idx % COLORS.length];
                      return (
                        <tr key={school.id} className={`transition-all duration-300 group border-l-[6px] ${idx % 2 === 0 ? (isDarkMode ? 'bg-slate-900/40' : 'bg-white') : (isDarkMode ? 'bg-slate-800/20' : 'bg-slate-50/50')} hover:bg-slate-100/80 dark:hover:bg-slate-800/80`} style={{ borderLeftColor: color }}>
                          <td className="px-8 py-7">
                            <div className={`font-black text-[15px] leading-tight transition-colors whitespace-nowrap overflow-hidden text-ellipsis max-w-[300px] ${isDarkMode ? 'text-blue-400 group-hover:text-blue-300' : 'text-slate-800 group-hover:text-blue-700'}`}>
                              {school.nome}
                            </div>
                            <div className="text-[9px] text-slate-400 font-black uppercase mt-1 tracking-widest">{school.segmento}</div>
                          </td>
                          <td className="px-8 py-7">
                            <div className={`text-xs font-black uppercase tracking-tight ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                              {school.bairro}
                            </div>
                            <div className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-0.5">{school.macroregiao}</div>
                          </td>
                          <td className="px-8 py-7 text-center">
                            <span className={`inline-block px-4 py-1.5 rounded-xl text-[11px] font-black shadow-sm transition-all border ${
                              isDarkMode 
                              ? 'bg-slate-800 border-slate-700 text-slate-300 group-hover:border-blue-500' 
                              : 'bg-white border-slate-200 text-slate-800 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600'
                            }`}>
                              {school.alunos}
                            </span>
                          </td>
                          <td className="px-8 py-7">
                            <div className={`font-black text-[16px] whitespace-nowrap tracking-tighter px-4 py-2 rounded-2xl transition-all ${isDarkMode ? 'bg-emerald-950/30 text-emerald-400 border border-emerald-900/50' : 'bg-emerald-50 text-emerald-700 border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600'}`}>
                              {formatCurrency(school.valorInvestimento)}
                            </div>
                          </td>
                          <td className="px-8 py-7 text-center">
                            <span className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all whitespace-nowrap shadow-sm ${
                              isDarkMode
                              ? 'bg-blue-900/30 border-blue-800 text-blue-300 group-hover:bg-blue-800'
                              : 'bg-white border-slate-200 text-slate-600 group-hover:bg-blue-700 group-hover:text-white group-hover:border-blue-700'
                            }`}>
                              <CheckCircle2 size={14} className="text-emerald-500 group-hover:text-white" /> Projeto OK
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                    <tr className={`${isDarkMode ? 'bg-slate-900' : 'bg-slate-950'} text-white`}>
                       <td colSpan={3} className="px-10 py-12 text-right font-black uppercase tracking-[0.5em] text-slate-500 text-[10px] text-nowrap">Investimento Total das Obras</td>
                       <td colSpan={2} className="px-10 py-12 text-5xl font-black tracking-tighter border-l border-slate-800 text-emerald-400">
                          {formatCurrency(totalInvestimento)}
                       </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 2. GEOLOCALIZAÇÃO */}
          <div id="geolocalizacao" className="page-break pt-4">
            <div className="flex items-center gap-6 mb-12">
              <div className="bg-red-600 text-white p-6 rounded-[2rem] shadow-2xl">
                <Navigation size={36} />
              </div>
              <div>
                <h2 className={`text-4xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Geolocalização das Unidades Escolares</h2>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-[0.3em] mt-1">Localização e Abrangência Regional das Reformas</p>
              </div>
            </div>
            
            <div className={`rounded-[4rem] overflow-hidden shadow-2xl border-[16px] h-[700px] relative transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-white'}`}>
               <iframe 
                  src="https://www.google.com/maps/d/u/0/embed?mid=1cSOLT1IFTlPUrZYO_xxqzJV_EQF1S_I" 
                  width="100%" 
                  height="100%" 
                  className="border-0 brightness-[1.05] contrast-[1.05]"
                  allowFullScreen
                  loading="lazy"
                  title="Mapeamento das Escolas"
               ></iframe>
            </div>
          </div>

          {/* 3. GRÁFICOS ANALÍTICOS */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className={`p-14 rounded-[4rem] border shadow-2xl ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-100'}`}>
              <div className="flex items-center gap-4 mb-12">
                 <div className="w-2 h-12 bg-blue-600 rounded-full"></div>
                 <h4 className={`text-sm font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Distribuição de Alunos por Segmento</h4>
              </div>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={segmentData} margin={{ top: 10, right: 60, left: 40, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={isDarkMode ? "#334155" : "#f1f5f9"} />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 10, fontWeight: 900}} />
                    <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 10, fontWeight: 900}} />
                    <Tooltip 
                      cursor={{fill: isDarkMode ? '#1e293b' : '#f8fafc'}} 
                      contentStyle={{borderRadius: '24px', backgroundColor: isDarkMode ? '#0f172a' : '#fff', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', padding: '20px', color: isDarkMode ? '#fff' : '#000'}} 
                    />
                    <Bar dataKey="value" name="Alunos" fill="#2563eb" radius={[0, 16, 16, 0]} barSize={40}>
                       <LabelList dataKey="value" position="right" style={{ fill: isDarkMode ? '#fff' : '#1e293b', fontSize: '11px', fontWeight: '900' }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className={`p-14 rounded-[4rem] border shadow-2xl ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-100'}`}>
              <div className="flex items-center gap-4 mb-12">
                 <div className="w-2 h-12 bg-emerald-600 rounded-full"></div>
                 <h4 className={`text-sm font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Investimento por Macroregião</h4>
              </div>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={macroregionData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#334155" : "#f1f5f9"} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" tick={{fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 9, fontWeight: 900}} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `R$${(v/1000000).toFixed(1)}M`} tick={{fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 10, fontWeight: 900}} />
                    <Tooltip 
                      formatter={(v) => formatCurrency(v as number)}
                      contentStyle={{borderRadius: '24px', backgroundColor: isDarkMode ? '#0f172a' : '#fff', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', padding: '20px', color: isDarkMode ? '#fff' : '#000'}} 
                    />
                    <Bar dataKey="value" name="Investimento" fill="#10b981" radius={[16, 16, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className={`p-14 rounded-[4rem] border shadow-2xl lg:col-span-2 ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-100'}`}>
              <div className="flex items-center gap-4 mb-12">
                 <div className="w-2 h-12 bg-amber-500 rounded-full"></div>
                 <h4 className={`text-sm font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Comparativo: Segmento Escolar vs Valor de Investimento</h4>
              </div>
              <div className="h-[450px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={segmentValueData} margin={{ top: 20, right: 30, left: 60, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#334155" : "#f1f5f9"} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 11, fontWeight: 900}} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `R$${(v/1000000).toFixed(1)}M`} tick={{fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 10, fontWeight: 900}} />
                    <Tooltip 
                      formatter={(v) => formatCurrency(v as number)}
                      contentStyle={{borderRadius: '24px', backgroundColor: isDarkMode ? '#0f172a' : '#fff', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', padding: '20px', color: isDarkMode ? '#fff' : '#000'}} 
                    />
                    <Bar dataKey="value" name="Valor R$" fill="#f59e0b" radius={[20, 20, 0, 0]} barSize={80}>
                       <LabelList dataKey="value" position="top" formatter={(v: number) => `R$${(v/1000000).toFixed(1)}M`} style={{ fill: isDarkMode ? '#fff' : '#1e293b', fontSize: '12px', fontWeight: '900' }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* 4. DESCRIÇÃO DE SERVIÇOS - ICONE NA FRENTE E ALINHADO À ESQUERDA */}
          <div id="descricao-servicos" className="page-break pt-4">
            <div className="flex items-center gap-8 mb-20 text-left">
              <div className="bg-amber-500 text-white p-6 rounded-[2rem] shadow-2xl shrink-0">
                <HardHat size={40} />
              </div>
              <div>
                <h2 className={`text-5xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Descrição de Serviços</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-24">
              {sortedSchools.map((school, index) => {
                const cardColor = COLORS[index % COLORS.length];
                return (
                  <div key={school.id} className={`group p-12 rounded-[3.5rem] border transition-all duration-500 flex flex-col items-center h-full relative overflow-hidden border-b-8 hover:-translate-y-3 hover:shadow-2xl ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
                  } hover:border-b-blue-600`}>
                    
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-bl-[8rem] transition-all pointer-events-none flex items-start justify-end p-10 bg-slate-50 dark:bg-slate-800/30 group-hover:bg-blue-600/5">
                       <span 
                         style={{ color: cardColor }}
                         className="font-black text-6xl transition-all tracking-tighter opacity-20 group-hover:opacity-100 group-hover:scale-110"
                       >
                         {String(index + 1).padStart(2, '0')}
                       </span>
                    </div>
                    
                    <div className="mb-12 relative z-10 w-full flex flex-col items-start">
                      <h5 className={`font-black text-xl uppercase leading-tight transition-colors mb-5 pr-16 text-left ${isDarkMode ? 'text-white' : 'text-slate-800'} group-hover:text-blue-600`}>
                        {school.nome}
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        <span className={`inline-block text-[10px] font-black px-4 py-2 rounded-xl tracking-[0.1em] uppercase border ${
                          isDarkMode ? 'bg-blue-900/20 border-blue-800 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-700'
                        }`}>
                          {school.segmento}
                        </span>
                        <span className={`inline-block text-[10px] font-black px-4 py-2 rounded-xl tracking-[0.1em] uppercase border ${
                          isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
                        }`}>
                          {school.macroregiao}
                        </span>
                      </div>
                    </div>

                    <div className={`mb-10 p-10 rounded-[2.5rem] w-full flex-grow border transition-all flex flex-col items-start ${isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-[#f8f9fc] border-slate-100'} group-hover:bg-white group-hover:shadow-inner dark:group-hover:bg-slate-800`}>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-8 pb-5 border-b border-slate-200 dark:border-slate-700 w-full flex justify-start items-center gap-4">
                         <div className="flex items-center gap-2">
                            <FileText size={18} className="text-blue-500" />
                            <span>Descrição</span>
                         </div>
                      </div>
                      <p className={`text-sm font-medium leading-loose italic text-left ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        "{school.servicos}"
                      </p>
                    </div>

                    <div className={`flex flex-row items-center justify-between w-full text-[12px] font-black mt-4 pt-10 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                      <div className="flex flex-col items-start">
                         <div className="flex items-center gap-1.5 mb-1">
                            <MapPin size={12} className="text-red-500" />
                            <span className="text-slate-400 uppercase tracking-widest text-[9px]">Bairro</span>
                         </div>
                         <span className={`uppercase tracking-tight ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>{school.bairro}</span>
                      </div>
                      <div className="flex flex-col items-end">
                         <span className="text-slate-400 uppercase tracking-widest mb-1 text-[9px]">Investimento</span>
                         <span className="text-blue-600 font-black text-[20px] tracking-tighter">{formatCurrency(school.valorInvestimento)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className={`mt-40 pb-24 text-center transition-colors`}>
          <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto px-8">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.7em] leading-relaxed">
              {footerTextPrimary}
            </p>
            <div className={`h-1 w-20 bg-gradient-to-r from-blue-600 to-transparent rounded-full`}></div>
            <p className={`text-lg font-black uppercase tracking-[0.2em] leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {footerTextSecondary}
            </p>
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.3em] opacity-50">
              {footerTextTertiary}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
