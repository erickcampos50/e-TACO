import React from 'react';
import { Database, Download, Upload, FileText, FileSpreadsheet } from 'lucide-react';
import type { MealPlan } from '../types';
import { generatePDFReport } from '../utils/reportGenerator';
import { exportToCSV } from '../utils/csvExporter';

interface HeaderProps {
  mealPlan: MealPlan;
}

export const Header = ({ mealPlan }: HeaderProps) => {
  const handleExport = () => {
    const dataStr = JSON.stringify(mealPlan, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `etaco-${mealPlan.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const plan = JSON.parse(e.target?.result as string);
          onImport(plan);
        } catch (error) {
          console.error('Error importing plan:', error);
          alert('Arquivo de plano inválido');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleGenerateReport = () => {
    generatePDFReport(mealPlan);
  };

  const handleExportCSV = () => {
    exportToCSV(mealPlan);
  };

  return (
    <header className="bg-gradient-to-r from-primary-700 to-primary-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <Database size={32} className="text-primary-200" />
            <div>
              <h1 className="text-2xl font-bold">e-TACO</h1>
              <p className="text-xs text-primary-200">Tabela Brasileira de Composição de Alimentos</p>
            </div>
          </div>
          
          <nav className="flex flex-wrap items-center justify-center gap-4">
            <div className="relative">
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 transition-colors">
                <Upload size={20} />
                <span className="hidden sm:inline">Importar</span>
              </button>
            </div>
            <button
              onClick={handleExport}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 transition-colors"
            >
              <Download size={20} />
              <span className="hidden sm:inline">Exportar</span>
            </button>
            <button
              onClick={handleGenerateReport}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 transition-colors"
            >
              <FileText size={20} />
              <span className="hidden sm:inline">Relatório</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 transition-colors"
            >
              <FileSpreadsheet size={20} />
              <span className="hidden sm:inline">CSV</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};