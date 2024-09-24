// Importações para a página:
import React, { useState, useEffect } from "react";
import Form from "./Form";
import Table from "./Table";
import { httpHelper } from "../helpers/httpHelper";

// Cria o componente
const CrudUser = () => {
  // Faz com que a variável receba yna lista de usuários em que a lista será iniciada com null
  const [users, setUsers] = useState(null);
  // Define a URL que será usada para acessar a página
  const url = "http://localhost:5000/users";
  // Usa o helper HTTP para que as requisições sejam feitas
  const api = httpHelper();

  // Usa o useEffect para carregar os usuários quando a página for carregada
  useEffect(() => {
    getUsers(); // Chama a função que carrega os usuários
  }, []); // Um array vazio pra garantir que o código vai ser executado apenas uma vez ao carregar a página

  // Função que adiciona um novo usuário
  const postUser = (user) => {
    api
      .post(`${url}`, { body: user }) // Faz um POST pra enviar o novo usuário
      .then((res) => getUsers()) // Atualiza a lista de usuários após inserir o novo usuário
      .catch((err) => console.log(err)); // Se existir erro, imprime o erro no console do browser
  };

  // Função que atualiza um usuário já existente
  const updateUser = (id, user) => {
    api
      .put(`${url}/${id}`, { body: user }) // Faz um PUT com os novos dados do usuário
      .then((res) => getUsers()) // Atualiza a lista de usuários depois da atualização
      .catch((err) => console.log(err)); // Se existir erro, imprime o erro no console do browser
  };

  // Função que deleta um usuário
  const deleteUser = (id) => {
    api
      .del(`${url}/${id}`, {}) // Faz umDELETE para excluir o usuário usando o ID
      .then((res) => getUsers()) // Atualiza a lista de usuários depois da exclusão
      .catch((err) => console.log(err)); // Se existir erro, imprime o erro no console do browser
  };

  // Função que carrega os usuários
  const getUsers = () => {
    api
      .get(`${url}?_expand=companies`) // Faz um GET para buscar os usuários e mostrar  as informações das empresas
      .then((res) => {
        setUsers(res); // Atualiza o estado users com a resposta da API
      })
      .catch((err) => console.log(err)); // Se existir erro, imprime o erro no console do browser
  };

  // Verifica se a lista de usuários ainda está carregando. Se não estiver, retorna null
  if (!users) return null;

  return (
    <>
      <h3>New user</h3>
      {/* Elemento de formulárioque passa a função postUser como prop */}
      <Form postUser={postUser} />
      <div className="all-users">
        <h3>All users</h3>
        {/* Elemento de tabela que passa usuários e funções para manipulação como props */}
        <Table
          users={users}
          setUsers={setUsers}
          postUser={postUser}
          updateUser={updateUser}
          deleteUser={deleteUser}
        />
      </div>
    </>
  );
};

// Exporta o componente
export default CrudUser;
