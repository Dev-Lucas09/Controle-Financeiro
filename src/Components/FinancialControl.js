import React, { useState } from 'react';
import { PlusCircle, Wallet, TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';

const FinancialControl = () => {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('alimentacao');

  const categories = {
    receita: 'Receita',
    alimentacao: 'Alimentação',
    transporte: 'Transporte',
    saude: 'Saúde',
    lazer: 'Lazer',
    educacao: 'Educação',
    outros: 'Outros'
  };

  const addTransaction = () => {
    if (!description.trim() || !amount || parseFloat(amount) <= 0) {
      alert('Por favor, preencha todos os campos corretamente!');
      return;
    }

    const newTransaction = {
      id: Date.now(),
      description: description.trim(),
      amount: parseFloat(amount),
      type,
      category: type === 'income' ? 'receita' : category,
      date: new Date().toLocaleDateString('pt-BR')
    };

    setTransactions([newTransaction, ...transactions]);
    
    // Limpar campos
    setDescription('');
    setAmount('');
    setType('expense');
    setCategory('alimentacao');
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  // Cálculos
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Wallet className="w-10 h-10 text-green-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Controle Financeiro</h1>
          </div>
          <p className="text-gray-600">Gerencie suas receitas e gastos de forma simples</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <PlusCircle className="w-5 h-5 mr-2 text-green-600" />
                Nova Transação
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ex: Almoço, Salário, Transporte..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0,00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="expense">Gasto</option>
                    <option value="income">Receita</option>
                  </select>
                </div>

                {type === 'expense' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoria
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="alimentacao">Alimentação</option>
                      <option value="transporte">Transporte</option>
                      <option value="saude">Saúde</option>
                      <option value="lazer">Lazer</option>
                      <option value="educacao">Educação</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>
                )}

                <button
                  onClick={addTransaction}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
                >
                  Adicionar Transação
                </button>
              </div>
            </div>

            {/* Cards de Resumo */}
            <div className="mt-6 space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                    <div className="ml-3">
                      <p className="text-sm text-green-600 font-medium">Receitas</p>
                      <p className="text-2xl font-bold text-green-700">
                        {formatCurrency(totalIncome)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingDown className="w-8 h-8 text-red-600" />
                    <div className="ml-3">
                      <p className="text-sm text-red-600 font-medium">Gastos</p>
                      <p className="text-2xl font-bold text-red-700">
                        {formatCurrency(totalExpenses)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${balance >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'} border rounded-lg p-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className={`w-8 h-8 ${balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
                    <div className="ml-3">
                      <p className={`text-sm font-medium ${balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                        Saldo
                      </p>
                      <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>
                        {formatCurrency(balance)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Transações */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Histórico de Transações
              </h2>

              {transactions.length === 0 ? (
                <div className="text-center py-12">
                  <Wallet className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Nenhuma transação ainda</p>
                  <p className="text-gray-400">Adicione sua primeira transação para começar!</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {transactions.map((transaction) => (
                    <div 
                      key={transaction.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {transaction.description}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {categories[transaction.category]} • {transaction.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`text-lg font-semibold mr-3 ${
                          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </span>
                        <button
                          onClick={() => deleteTransaction(transaction.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialControl;