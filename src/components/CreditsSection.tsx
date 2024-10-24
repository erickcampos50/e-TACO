import React from 'react';
import { Info } from 'lucide-react';

export const CreditsSection = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-16 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <Info className="text-primary-600" size={24} />
        <h2 className="text-xl font-semibold text-gray-800">Créditos e Informações</h2>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Tabela TACO</h3>
          <p className="text-gray-600">
            Este sistema utiliza dados da Tabela Brasileira de Composição de Alimentos (TACO), 
            desenvolvida pela Universidade Estadual de Campinas (UNICAMP). O e-TACO é um projeto 
            independente e não possui nenhuma relação oficial com os pesquisadores ou instituições 
            responsáveis pela TACO.
          </p>
        </div>

        <div>
          <h3 className="font-medium mb-2">Desenvolvedor</h3>
          <p className="text-gray-600">Erick Carvalho Campos</p>
        </div>

        <div>
          <h3 className="font-medium mb-2">Aviso Legal</h3>
          <p className="text-gray-600">
            Este é um projeto voluntário desenvolvido com propósito educacional. 
            O sistema é fornecido "como está", sem garantias de qualquer tipo, 
            expressas ou implícitas. Use as informações e cálculos nutricionais 
            como referência apenas, sempre consultando um profissional de saúde qualificado.
          </p>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Versão 1.0.0</p>
          <p className="text-sm text-gray-500">© 2024 e-TACO</p>
        </div>
      </div>
    </div>
  );
};