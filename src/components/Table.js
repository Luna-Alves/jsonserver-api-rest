// Importações para a página:
import React from "react";
import Form from "./Form";

// Componente que recebe os usuários e funções para manipulação de dados como props
const Table = ({ users, postUser, updateUser, deleteUser }) => {
  // Função que alterna a exibição do formulário de atualização de um usuário específico
  const showUpdateUser = (id) => {
    // Seleciona o formulário de acordo com o nome da classe gerado pelo ID do usuário
    const form = document.getElementsByClassName(`show-form-${id}`);
    // Alterna a classe 'hide-form', que oculta ou exibe o formulário
    form[0].classList.toggle("hide-form");
  };

  // Componente que renderiza cada linha de usuário na tabela
  const Row = ({ user }) => {
    return (
      <>
        {/* Linha da tabela com os dados do usuário */}
        <div className="row">
          <div>{user.name}</div> {/* Exibe o nome do usuário */}
          <div>{user.email}</div> {/* Exibe o email do usuário */}
          <div>{user.phone}</div> {/* Exibe o telefone do usuário */}
          <div>{user.companies.name}</div>{" "}
          {/* Exibe o nome da empresa associada ao usuário */}
          <div className="buttons">
            {/* Botão para mostrar ou esconder o formulário de atualização do usuário */}
            <button onClick={() => showUpdateUser(user.id)}>Update</button>
            {/* Botão para excluir o usuário */}
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
        </div>
        {/* Elemento que atualiza o usuário que inicia de forma oculta */}
        <div className={`hide-form show-form-${user.id}`}>
          {/* Elemento que atualiza o usuário e passa os dados e funções como props */}
          <Form userData={user} postUser={postUser} updateUser={updateUser} />
        </div>
      </>
    );
  };

  return (
    <div className="table">
      {/* Cabeçalho da tabela com os títulos das colunas */}
      <div className="titles">
        <div>Name</div> {/* Coluna para o nome */}
        <div>Email</div> {/* Coluna para o email */}
        <div>Phone</div> {/* Coluna para o telefone */}
        <div>Company</div> {/* Coluna para a empresa */}
        <div>Actions</div> {/* Coluna para as ações */}
      </div>
      {/* Parte da tabela que mostra as linhas com os usuários cadastrados */}
      <div className="rows">
        {/* Se existir usuários cadastrados, mapeia e renderiza o 'Row' para cada um */}
        {users && users.map((u) => <Row user={u} key={u.id} />)}
      </div>
    </div>
  );
};

// Exporta o componente
export default Table;
