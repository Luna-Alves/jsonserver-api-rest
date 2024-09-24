// Importações para a página:
import React, { useState, useEffect } from "react";
import { httpHelper } from "../helpers/httpHelper";

// Componente criado recebendo os props: ID da empresa e handleValue
const DropCompanies = ({ companiesId, handleValue }) => {
  // Declara uma variável para receber uma lista de emprsas que será iniciada como null
  const [companies, setCompanies] = useState(null);
  // Declara uma váriavel que vai receber a empresa selecionada. A variável inicia com o valor de companiesId
  const [company, setCompany] = useState(companiesId);
  // Define a URL da página
  const url = "http://localhost:5000/companies";
  // Usa o helper HTTP para que as requisições sejam feitas
  const api = httpHelper();

  // Usa o useEffect para estruturar o componentes
  useEffect(() => {
    // Faz um GET para buscar a lista de empresas
    api
      .get(url)
      .then((res) => {
        // Atualiza a variável com a resposta da API e adiciona um item na lista
        setCompanies([{ id: 0, name: "Select Company" }, ...res]);
      })
      // Se existir erro, imprime o erro no console do browser
      .catch((err) => console.log(err));
  }, []); // Um array vazio pra garantir que o código vai ser executado apenas uma vez ao carregar a página

  // Vaerifica se a lista de empresas foi carregada. Se não tiver carregado, retorna null
  if (!companies) return null;

  return (
    <select
      // Define o nome do campo select
      name="companiesId"
      // Define o valor do select como o a empresa selecionada
      value={company}
      // Função que executa quando o valor do select muda
      onChange={(e) => {
        // Atualiza a variável com o valor definido
        setCompany(e.target.value);
        // Executa a função handleValue
        handleValue(e);
      }}
    >
      {/* Mapeia a lista de empresas para criar elementos usando o <option> */}
      {companies.map((c) => (
        // Cria um <option> para cada empresa usando o ID como valor e chave, e o nome como texto
        <option value={c.id} key={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  );
};

// Exporta o componente
export default DropCompanies;
