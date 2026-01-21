
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
  Type,
  ImageIcon,
  TrendingUp,
  Upload,
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

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [showSettings, setShowSettings] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Estados com inicialização direta do localStorage
  const [headerImg, setHeaderImg] = useState(() => localStorage.getItem("headerImg") || "https://www.riopreto.sp.gov.br/portal/images/logo_prefeitura.png");
  const [headerText, setHeaderText] = useState(() => localStorage.getItem("headerText") || "Relatório Consolidado: Reforma Geral das Escolas");
  const [footerTextPrimary, setFooterTextPrimary] = useState(() => localStorage.getItem("footerTextPrimary") || "Rio Preto Educação");
  const [footerTextSecondary, setFooterTextSecondary] = useState(() => localStorage.getItem("footerTextSecondary") || "Governo Municipal de São José do Rio Preto");
  const [footerTextTertiary, setFooterTextTertiary] = useState(() => localStorage.getItem("footerTextTertiary") || "Relatório Gerencial de Infraestrutura Escolar • Ciclo 2024");
  const [alignment, setAlignment] = useState<'left' | 'center' | 'justify'>(() => (localStorage.getItem("alignment") as any) || "left");

  // Efeitos para persistência automática
  useEffect(() => { localStorage.setItem("headerImg", headerImg); }, [headerImg]);
  useEffect(() => { localStorage.setItem("headerText", headerText); }, [headerText]);
  useEffect(() => { localStorage.setItem("footerTextPrimary", footerTextPrimary); }, [footerTextPrimary]);
  useEffect(() => { localStorage.setItem("footerTextSecondary", footerTextSecondary); }, [footerTextSecondary]);
  useEffect(() => { localStorage.setItem("footerTextTertiary", footerTextTertiary); }, [footerTextTertiary]);
  useEffect(() => { localStorage.setItem("alignment", alignment); }, [alignment]);
  useEffect(() => { localStorage.setItem("darkMode", isDarkMode.toString()); }, [isDarkMode]);

  const sortedSchools = useMemo(() => {
    return [...INITIAL_SCHOOL_DATA].sort((a, b) => a.nome.localeCompare(b.nome));
  }, []);

  const totalInvestimento = useMemo(() => 
    sortedSchools.reduce((acc, school) => acc + school.valorInvestimento, 0),
  [sortedSchools]);

  const totalAlunos = useMemo(() => 
    sortedSchools.reduce((acc, school) => acc + school.alunos, 0), 
  [sortedSchools]);

  const segmentData = useMemo(() => {
    const counts: Record<string, number> = {};
    sortedSchools.forEach(s => {
      counts[s.segmento] = (counts[s.segmento] || 0) + s.alunos;
    });
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  }, [sortedSchools]);

  const macroregionData = useMemo(() => {
    const data: Record<string, number> = {};
    sortedSchools.forEach(s => {
      data[s.macroregiao] = (data[s.macroregiao] || 0) + s.valorInvestimento;
    });
    // CORREÇÃO: Referência correta ao objeto data
    return Object.keys(data).map(key => ({ name: key, value: data[key] }));
  }, [sortedSchools]);

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
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setShowSettings(true)}
            className={`p-3 rounded-full shadow-xl transition-all hover:scale-110 active:scale-95 ${isDarkMode ? 'bg-slate-800 text-slate-100' : 'bg-white text-slate-900 border border-slate-200'}`}
          >
            <Settings size={20} />
          </button>
        </div>

        {/* SETTINGS MODAL */}
        {showSettings && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
            <div className={`w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
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
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-dashed transition-all hover:border-blue-500 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}
                    >
                      <Upload size={18} /> Upar Imagem do Computador
                    </button>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
                    <input 
                      type="text" 
                      value={headerImg} 
                      onChange={(e) => setHeaderImg(e.target.value)}
                      placeholder="Ou cole a URL da imagem aqui..."
                      className={`w-full px-6 py-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'} outline-none`}
                    />
                  </div>

                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 mt-6 block">Título do Relatório</label>
                  <input 
                    type="text" 
                    value={headerText} 
                    onChange={(e) => setHeaderText(e.target.value)}
                    className={`w-full px-6 py-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'} outline-none`}
                  />
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Textos do Rodapé</label>
                  <input type="text" value={footerTextPrimary} onChange={(e) => setFooterTextPrimary(e.target.value)} className={`w-full px-4 py-3 rounded-xl border ${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'} mb-2`} />
                  <input type="text" value={footerTextSecondary} onChange={(e) => setFooterTextSecondary(e.target.value)} className={`w-full px-4 py-3 rounded-xl border ${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'} mb-2`} />
                  <input type="text" value={footerTextTertiary} onChange={(e) => setFooterTextTertiary(e.target.value)} className={`w-full px-4 py-3 rounded-xl border ${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'}`} />
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Alinhamento do Conteúdo</label>
                  <div className="flex gap-2">
                    {['left', 'center', 'justify'].map((align) => (
                      <button 
                        key={align}
                        onClick={() => setAlignment(align as any)}
                        className={`flex-1 py-3 rounded-xl border-2 capitalize font-bold ${alignment === align ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-200'}`}
                      >
                        {align === 'left' ? <AlignLeft className="mx-auto" /> : align === 'center' ? <AlignCenter className="mx-auto" /> : <AlignJustify className="mx-auto" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-8 bg-slate-50 dark:bg-slate-800/50">
                <button onClick={() => setShowSettings(false)} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg">
                  Confirmar Alterações
                </button>
              </div>
            </div>
          </div>
        )}

        {/* HEADER */}
        <header className={`mb-16 border-b-4 pb-12 flex flex-col items-center transition-colors ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
          <div className="flex flex-col items-center mb-10 w-full min-h-[160px] justify-center">
            <img 
              src={headerImg} 
              alt="Logotipo" 
              className="w-auto max-w-full max-h-[220px] object-contain block mx-auto filter drop-shadow-xl"
              onError={(e) => (e.currentTarget.src = "https://www.riopreto.sp.gov.br/portal/images/logo_prefeitura.png")}
            />
          </div>
          
          <div className={`w-full py-8 px-12 text-center rounded-[2.5rem] relative shadow-2xl overflow-hidden ${isDarkMode ? 'bg-slate-900 text-blue-100' : 'bg-slate-900 text-white'}`}>
             <h2 className="text-2xl md:text-3xl font-black uppercase tracking-[0.35em] relative z-10 leading-tight">
               {headerText}
             </h2>
          </div>
        </header>

        {/* SUMARIO EXECUTIVO */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { label: 'Financeiro', title: 'Investimento Global', value: formatCurrency(totalInvestimento), icon: <DollarSign size={24} />, gradient: 'from-blue-600 to-indigo-600' },
            { label: 'Discentes', title: 'Alunos Beneficiados', value: totalAlunos.toLocaleString(), suffix: 'Estudantes Atendidos', icon: <Users size={24} />, gradient: 'from-emerald-500 to-teal-600' },
            { label: 'Execução', title: 'Unidades de Ensino', value: sortedSchools.length.toString(), suffix: 'Escolas em Reforma', icon: <School size={24} />, gradient: 'from-amber-400 to-orange-500' }
          ].map((kpi, idx) => (
            <div key={idx} className={`relative p-10 rounded-[3rem] border flex flex-col items-center text-center ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-100'} shadow-xl`}>
              <div className={`p-5 rounded-3xl shadow-lg bg-gradient-to-br ${kpi.gradient} text-white mb-6`}>{kpi.icon}</div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">{kpi.label}</span>
              <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{kpi.title}</p>
              <h3 className="text-3xl font-black tracking-tight">{kpi.value}</h3>
              {kpi.suffix && <p className="text-[11px] font-black text-slate-400 mt-2 uppercase">{kpi.suffix}</p>}
            </div>
          ))}
        </section>

        {/* CONTEÚDO PRINCIPAL */}
        <section className="space-y-32">
          
          {/* TABELA */}
          <div id="tabela-investimento" className="page-break">
            <div className="flex items-center gap-6 mb-12">
              <div className={`p-6 rounded-[2rem] shadow-2xl ${isDarkMode ? 'bg-blue-900' : 'bg-slate-900 text-white'}`}><TrendingUp size={36} /></div>
              <h2 className="text-4xl font-black uppercase tracking-tight">Tabela Detalhada</h2>
            </div>

            <div className={`rounded-[3.5rem] shadow-2xl border overflow-hidden ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className={`${isDarkMode ? 'bg-slate-800' : 'bg-slate-900'} text-white`}>
                    <tr>
                      <th className="px-8 py-7 text-[10px] font-black uppercase tracking-[0.4em]">Unidade Escolar</th>
                      <th className="px-8 py-7 text-[10px] font-black uppercase tracking-[0.4em]">Localização</th>
                      <th className="px-8 py-7 text-[10px] font-black uppercase tracking-[0.4em] text-center">Alunos</th>
                      <th className="px-8 py-7 text-[10px] font-black uppercase tracking-[0.4em]">Investimento</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {sortedSchools.map((school, idx) => (
                      <tr key={school.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="px-8 py-7">
                          <div className={`font-black text-[15px] ${isDarkMode ? 'text-blue-400' : 'text-slate-800'}`}>{school.nome}</div>
                          <div className="text-[9px] text-slate-400 font-black uppercase mt-1 tracking-widest">{school.segmento}</div>
                        </td>
                        <td className="px-8 py-7">
                          <div className="text-xs font-black uppercase">{school.bairro}</div>
                          <div className="text-[10px] text-blue-600 font-bold uppercase">{school.macroregiao}</div>
                        </td>
                        <td className="px-8 py-7 text-center">
                          <span className="px-4 py-1.5 rounded-xl text-[11px] font-black border border-slate-200">{school.alunos}</span>
                        </td>
                        <td className="px-8 py-7">
                          <div className="font-black text-[16px] text-emerald-600">{formatCurrency(school.valorInvestimento)}</div>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-slate-900 text-white">
                       <td colSpan={3} className="px-10 py-10 text-right font-black uppercase tracking-[0.3em] text-slate-400">Total Investido</td>
                       <td className="px-10 py-10 text-3xl font-black text-emerald-400">{formatCurrency(totalInvestimento)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* MAPA */}
          <div id="geolocalizacao" className="page-break">
            <div className="flex items-center gap-6 mb-12">
              <div className="bg-red-600 text-white p-6 rounded-[2rem] shadow-2xl"><Navigation size={36} /></div>
              <h2 className="text-4xl font-black uppercase tracking-tight">Geolocalização</h2>
            </div>
            <div className="rounded-[4rem] overflow-hidden shadow-2xl border-[16px] h-[600px] border-white dark:border-slate-800">
               <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1cSOLT1IFTlPUrZYO_xxqzJV_EQF1S_I" width="100%" height="100%" className="border-0"></iframe>
            </div>
          </div>

          {/* GRÁFICOS */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              { title: 'Alunos por Segmento', data: segmentData, color: '#2563eb' },
              { title: 'Investimento por Macroregião', data: macroregionData, color: '#10b981' }
            ].map((chart, i) => (
              <div key={i} className={`p-12 rounded-[4rem] border shadow-xl ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                <h4 className="text-sm font-black uppercase tracking-[0.3em] mb-10">{chart.title}</h4>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chart.data} layout={i === 0 ? "vertical" : "horizontal"}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#334155" : "#f1f5f9"} />
                      <XAxis type={i === 0 ? "number" : "category"} dataKey={i === 0 ? undefined : "name"} hide />
                      <YAxis type={i === 0 ? "category" : "number"} dataKey={i === 0 ? "name" : undefined} width={100} tick={{fontSize: 10, fontWeight: 900}} hide={i !== 0} />
                      <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}} />
                      <Bar dataKey="value" fill={chart.color} radius={10}>
                         <LabelList dataKey="value" position={i === 0 ? "right" : "top"} style={{fontWeight: 900, fontSize: 10}} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
          </section>

          {/* DESCRIÇÃO SERVIÇOS */}
          <div id="descricao-servicos" className="page-break">
            <div className="flex items-center gap-8 mb-20">
              <div className="bg-amber-500 text-white p-6 rounded-[2rem] shadow-2xl shrink-0"><HardHat size={40} /></div>
              <h2 className="text-5xl font-black uppercase tracking-tight">Descrição de Serviços</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {sortedSchools.map((school, index) => (
                <div key={school.id} className={`p-10 rounded-[3.5rem] border-b-8 transition-all hover:-translate-y-3 shadow-xl ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} hover:border-blue-600`}>
                  <h5 className="font-black text-xl uppercase mb-6 text-left leading-tight group-hover:text-blue-600">{school.nome}</h5>
                  <div className={`mb-8 p-8 rounded-[2rem] border italic text-sm leading-relaxed text-left ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                    "{school.servicos}"
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="text-left">
                       <div className="text-slate-400 mb-1 flex items-center gap-1"><MapPin size={10}/> Bairro</div>
                       <div>{school.bairro}</div>
                    </div>
                    <div className="text-right">
                       <div className="text-slate-400 mb-1">Investimento</div>
                       <div className="text-blue-600 text-lg">{formatCurrency(school.valorInvestimento)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-40 pb-24 text-center">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.7em] mb-4">{footerTextPrimary}</p>
          <p className="text-lg font-black uppercase tracking-[0.2em] mb-2">{footerTextSecondary}</p>
          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.3em] opacity-50">{footerTextTertiary}</p>
        </footer>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
