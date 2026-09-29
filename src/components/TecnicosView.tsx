import React, { useState } from 'react';
import { 
  UserCheck, 
  Plus, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Percent, 
  Briefcase, 
  Edit3, 
  Trash2, 
  X,
  CheckCircle2
} from 'lucide-react';
import type { Tecnico, OrdemServico } from '../types/os.ts';

interface TecnicosViewProps {
  tecnicos: Tecnico[];
  ordens: OrdemServico[];
  onSaveTecnico: (dados: Omit<Tecnico, 'id'>, id?: string) => Promise<void>;
  onDeleteTecnico: (id: string) => Promise<void>;
}

export const TecnicosView: React.FC<TecnicosViewProps> = ({
  tecnicos,
  ordens,
  onSaveTecnico,
  onDeleteTecnico
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTecnico, setEditingTecnico] = useState<Tecnico | null>(null);

  // Form State
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [especialidadesInput, setEspecialidadesInput] = useState('');
  const [corIdentificacao, setCorIdentificacao] = useState('#3B82F6');
  const [comissaoPercentual, setComissaoPercentual] = useState(15);
  const [ativo, setAtivo] = useState(true);
  const [saving, setSaving] = useState(false);

  const openCreateModal = () => {
    setEditingTecnico(null);
    setNome('');
    setEmail('');
    setTelefone('');
    setEspecialidadesInput('Hardware, Manutenção, Placas');
    setCorIdentificacao('#3B82F6');
    setComissaoPercentual(15);
    setAtivo(true);
    setModalOpen(true);
  };

  const openEditModal = (t: Tecnico) => {
    setEditingTecnico(t);
    setNome(t.nome);
    setEmail(t.email);
    setTelefone(t.telefone);
    setEspecialidadesInput(t.especialidades.join(', '));
    setCorIdentificacao(t.corIdentificacao);
    setComissaoPercentual(t.comissaoPercentual);
    setAtivo(t.ativo);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !telefone.trim()) {
      alert('Nome e telefone são obrigatórios.');
      return;
    }

    try {
      setSaving(true);
      const especialidades = especialidadesInput
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      await onSaveTecnico(
        {
          nome,
          email,
          telefone,
          especialidades: especialidades.length > 0 ? especialidades : ['Geral'],
          corIdentificacao,
          comissaoPercentual: Number(comissaoPercentual) || 10,
          ativo
        },
        editingTecnico?.id
      );
      setModalOpen(false);
    } catch (err: any) {
      alert(`Erro ao salvar técnico: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const colors = [
    '#3B82F6', // Blue
    '#8B5CF6', // Purple
    '#10B981', // Emerald
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#EC4899', // Pink
    '#14B8A6'  // Teal
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Equipe Técnica</h1>
          <p className="text-sm text-slate-500">
            Profissionais responsáveis pelos diagnósticos, reparos em bancada e execução de serviços.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Adicionar Novo Técnico</span>
        </button>
      </div>

      {/* Technicians Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tecnicos.map((t) => {
          const tecOrdens = ordens.filter(os => os.tecnicoId === t.id);
          const ativas = tecOrdens.filter(os => !['FINALIZADA', 'ENTREGUE', 'CANCELADA'].includes(os.status)).length;
          const concluidas = tecOrdens.filter(os => ['FINALIZADA', 'ENTREGUE'].includes(os.status)).length;

          return (
            <div
              key={t.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-md"
                      style={{ backgroundColor: t.corIdentificacao }}
                    >
                      {t.nome.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base leading-tight">{t.nome}</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            t.ativo ? 'bg-emerald-500' : 'bg-slate-300'
                          }`}
                        ></span>
                        <span className="text-[11px] font-semibold text-slate-500">
                          {t.ativo ? 'Em atividade' : 'Inativo'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(t)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors"
                      title="Editar Técnico"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Deseja realmente remover o técnico ${t.nome}?`)) {
                          onDeleteTecnico(t.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Excluir Técnico"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Contact info */}
                <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.telefone}</span>
                  </div>
                  {t.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{t.email}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Percent className="w-3.5 h-3.5 text-slate-400" />
                    <span>Comissão sobre mão de obra: <strong>{t.comissaoPercentual}%</strong></span>
                  </div>
                </div>

                {/* Specialties tags */}
                <div className="border-t border-slate-100 pt-3 mb-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Especialidades
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {t.especialidades.map((esp, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium"
                      >
                        {esp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Workload Stats */}
              <div className="border-t border-slate-100 pt-3 grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-amber-50 p-2 rounded-xl border border-amber-100">
                  <span className="block text-[10px] font-bold text-amber-700 uppercase">Em Andamento</span>
                  <span className="text-base font-black text-amber-900">{ativas}</span>
                </div>
                <div className="bg-emerald-50 p-2 rounded-xl border border-emerald-100">
                  <span className="block text-[10px] font-bold text-emerald-700 uppercase">Concluídas</span>
                  <span className="text-base font-black text-emerald-900">{concluidas}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Add / Edit Técnico */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-base">
                {editingTecnico ? 'Editar Técnico' : 'Novo Técnico'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nome Completo *</label>
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Telefone *</label>
                  <input
                    type="text"
                    required
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Comissão (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={comissaoPercentual}
                    onChange={(e) => setComissaoPercentual(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tecnico@osmaster.com"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Especialidades (separadas por vírgula)</label>
                <input
                  type="text"
                  value={especialidadesInput}
                  onChange={(e) => setEspecialidadesInput(e.target.value)}
                  placeholder="Notebooks, Microeletrônica, Telas, Smartphones..."
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Cor de Identificação no Quadro</label>
                <div className="flex items-center gap-2">
                  {colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCorIdentificacao(c)}
                      className={`w-7 h-7 rounded-full transition-transform ${
                        corIdentificacao === c ? 'scale-125 ring-2 ring-indigo-500 ring-offset-2' : ''
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ativo}
                    onChange={(e) => setAtivo(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-xs font-semibold text-slate-800">Técnico Ativo no Sistema</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-xs font-bold rounded-xl text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  {saving ? 'Salvando...' : 'Salvar Técnico'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
