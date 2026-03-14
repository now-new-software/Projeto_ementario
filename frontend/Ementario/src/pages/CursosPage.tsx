import { useState } from 'react';
import { Search, Plus, Pencil } from 'lucide-react';

// Mock data matching the image
const coursesData = [];

export const CursosPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) || course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = departmentFilter ? course.department === departmentFilter : true;
    const matchesStatus = statusFilter ? course.status === statusFilter : true;
    const matchesType = typeFilter ? course.type === typeFilter : true;
    return matchesSearch && matchesDept && matchesStatus && matchesType;
  });

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Sincronizado':
        return 'bg-[#e6f4ea] text-[#1e8e3e]';
      case 'Desatualizado':
        return 'bg-[#fef0db] text-[#b06000]';
      case 'Manual':
        return 'bg-[#f3e8fd] text-[#7e22ce]';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    // 1. Usamos a exata mesma section principal do Dashboard
    <section className="dashboard"> 
      
      {/* 2. Usamos o exato mesmo cabeçalho do Dashboard */}
      <header className="dashboard__header">
        <div>
          {/* Como estamos usando a estrutura deles, este <h1> vai herdar o tamanho perfeito automaticamente! */}
          <h1>Cursos</h1> 
        </div>
        
        {/* Mantemos o seu botão de Novo Curso (com a cor que padronizamos) */}
      {/* Mantemos o flex e o gap-2 para o ícone de + não desalinhar, e adicionamos o sync-button */}
      <button className="sync-button flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Novo Curso
      </button>
      </header>

      {/* 3. A partir daqui, voltamos para o seu código Tailwind para a Tabela e Filtros */}
      <div className="w-full mt-4"> 
        
        {/* Filters Panel (Cole o seu código de filtros aqui para baixo) */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1 bg-white rounded-xl border border-gray-200">
            {/* ... resto do seu código ... */}
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por nome ou código..."
              className="block w-full pl-10 pr-3 py-2.5 rounded-md leading-5 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#20c997] focus:border-[#20c997] sm:text-base transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <select 
              className="block w-48 pl-3 pr-10 py-2.5 text-base border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#20c997] focus:border-[#20c997] rounded-md bg-white text-gray-700 appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="">Todos departamentos</option>
              {/* <option value=""></option>
              <option value=""></option> */}
            </select>

            <select 
              className="block w-40 pl-3 pr-10 py-2.5 text-base border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#20c997] focus:border-[#20c997] rounded-md bg-white text-gray-700 appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Todos status</option>
              <option value="Sincronizado">Sincronizado</option>
              <option value="Desatualizado">Desatualizado</option>
              <option value="Manual">Manual</option>
            </select>

            <select 
              className="block w-40 pl-3 pr-10 py-2.5 text-base border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#20c997] focus:border-[#20c997] rounded-md bg-white text-gray-700 appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">Todos os tipos</option>
              <option value="Graduação">Graduação</option>
              <option value="Pós graduação">Pós graduação</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-base text-gray-500">
          {filteredCourses.length} {filteredCourses.length === 1 ? 'curso encontrado' : 'cursos encontrados'}
        </div>

        {/* Table */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-left text-base">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-base font-semibold text-gray-400 uppercase tracking-wider">
                  Código
                </th>
                <th scope="col" className="px-6 py-4 text-left text-base font-semibold text-gray-400 uppercase tracking-wider">
                  Nome
                </th>
                <th scope="col" className="px-6 py-4 text-left text-base font-semibold text-gray-400 uppercase tracking-wider">
                  Departamento
                </th>
                <th scope="col" className="px-6 py-4 text-center text-base font-semibold text-gray-400 uppercase tracking-wider">
                  Créditos
                </th>
                <th scope="col" className="px-6 py-4 text-center text-base font-semibold text-gray-400 uppercase tracking-wider">
                  CH
                </th>
                <th scope="col" className="px-6 py-4 text-left text-base font-semibold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 text-center text-base font-semibold text-gray-400 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-[#20c997]">
                    {course.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">
                    {course.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">
                    {course.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500 text-center">
                    {course.credits}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500 text-center">
                    {course.hours}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-base leading-5 font-medium rounded-full ${getStatusStyles(course.status)}`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-base font-medium">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <Pencil size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredCourses.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 text-slate-500 bg-white">
            <p className="text-base font-medium text-slate-900">Nenhum curso encontrado</p>
            <p className="text-sm mt-1">A lista está vazia ou nenhum curso corresponde aos filtros.</p>
          </div>
        )}

        </div>
      </div>
    </section>
  );
}
