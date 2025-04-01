import { useState, useEffect } from "react";
import styles from '../Styles/Styles.Module.css'
 const Home = () => {
  const [solicitacoes, setSolicitacoes] = useState([
    { id: 1, nome: "Cliente 1", valor: "5000.00", status: "Aprovado" },
    { id: 2, nome: "Cliente 2", valor: "3200.50", status: "Pendente" },
  ]);

  const [novoNome, setNovoNome] = useState("");
  const [novoValor, setNovoValor] = useState("");
  const [novoStatus, setNovoStatus] = useState("Pendente");
  const [statusFilter, setStatusFilter] = useState(""); // Estado para o filtro
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Ajuste conforme necessário

  const adicionarSolicitacao = (e) => {
    e.preventDefault(); // Evita recarregar a página

    if (!novoNome || !novoValor) return alert("Preencha todos os campos!");

    const novaSolicitacao = {
      id: solicitacoes.length + 1,
      nome: novoNome,
      valor: novoValor,
      status: novoStatus,
    };

    setSolicitacoes([...solicitacoes, novaSolicitacao]);

    
    setNovoNome("");
    setNovoValor("");
    setNovoStatus("Pendente");
  };

  
  const solicitacoesFiltradas = statusFilter
    ? solicitacoes.filter((req) => req.status === statusFilter)
    : solicitacoes;

  return (
    <div className="pageBackground">
      <h1 className="text-2xl font-bold mb-4">Solicitações de Crédito</h1>

      {/* Filtro de status */}
      <div className="flex gap-4 mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded"
          style={{ width: "100%" }}
        >
          <option value="">Todos</option>
          <option value="Aprovado">Aprovado</option>
          <option value="Rejeitado">Rejeitado</option>
          <option value="Pendente">Pendente</option>
        </select>
      </div>

      
      <form onSubmit={adicionarSolicitacao} className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Nome"
          value={novoNome}
          onChange={(e) => setNovoNome(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Valor"
          value={novoValor}
          onChange={(e) => setNovoValor(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={novoStatus}
          onChange={(e) => setNovoStatus(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="Aprovado">Aprovado</option>
          <option value="Rejeitado">Rejeitado</option>
          <option value="Pendente">Pendente</option>
        </select>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Criar Solicitação
        </button>
      </form>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {solicitacoesFiltradas.map((req) => (
          <div key={req.id} className="border p-4 rounded">
            <h3 className="font-bold">{req.nome}</h3>
            <p><strong>Valor:</strong> R$ {req.valor}</p>
            <p><strong>Status:</strong> {req.status}</p>
          </div>
        ))}
      </div>

      
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border rounded mr-2"
        >
          Anterior
        </button>
        <span className="p-2">{`Página ${currentPage} de ${totalPages}`}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 border rounded ml-2"
        >
          Próxima
        </button>
      </div>

    
    </div>
    
  );
};

  
  export default Home; 
  