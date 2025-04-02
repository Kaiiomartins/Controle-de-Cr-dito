import { useState, useEffect } from "react";
import apiInstance from "../API/API.js";
import styles from "../Styles/Styles.Module.css";

const Home = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [email, setEmail] = useState("");

  
  const fetchData = async () => {
    try {
      const response = await apiInstance.get("/");
      console.log("Solicitações carregadas:", response.data);
      setSolicitacoes(response.data);
    } catch (error) {
      console.error("Erro ao buscar solicitações:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Busca inicial
  
    const interval = setInterval(() => {
      fetchData(); // Atualiza a cada 10 segundos
    }, 10000);
  
    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);
  
  async function informacoes(e) {
    e.preventDefault();

    try {
      const response = await apiInstance.get("/", {
        params: {
          NomeCliente: nome,
          ValorSolicitado: valor,
          Status: email,
        },
      });

      console.log("Solicitação enviada:", response.data);

      fetchData(); 

      
      setNome("");
      setValor("");
      setEmail("");
    } catch (error) {
      console.error("Erro ao enviar solicitação:", error);
    }
  }

  return (
    <div className="pageBackground">
      <form onSubmit={informacoes}>
        <h1 className="text-2xl font-bold mb-4">Solicitações de Crédito</h1>

        <input
          value={nome}
          type="text"
          placeholder="Informe um nome:"
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          value={valor}
          type="number"
          placeholder="Informe um valor:"
          onChange={(e) => setValor(e.target.value)}
        />

        <input
          value={email}
          type="email"
          placeholder="Informe um email:"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Enviar Informações
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <ol>
          {solicitacoes.map((req, index) => (
            <li key={index} className="border p-4 rounded">
              <h3 className="font-bold">{req.NomeCliente}</h3>
              <p>
                <strong>Valor:</strong> R$ {req.ValorSolicitado}
              </p>
              <p>
                <strong>Status:</strong> {req.Status}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Home;
