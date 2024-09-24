// Importações para a página:
import React, { useState } from "react";
import DropComapies from "./DropCompanies";

// Componente userData, postUser e updateUser
const Form = ({ userData = {}, postUser, updateUser }) => {
  // Define 'user' com os dados de usuário. Se não existir dados em 'userData', usa os valores padrão
  const [user, setUser] = useState({
    name: userData.name ?? "", // Usa o nome do usuário ou string vazia
    username: userData.username ?? "", // Usa o username ou string vazia
    email: userData.email ?? "", // Usa o email ou string vazia
    phone: userData.phone ?? "", // Usa o número de telefone ou string vazia
    companiesId: userData.companiesId ?? "0", // Usa o ID da empresa ou "0" como valor padrão
  });

  // Executa a função handleValue
  const handleValue = (e) => {
    // Atualiza 'user' com um novo valor
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Função que submete o formulário
  const submitUser = (e) => {
    e.preventDefault(); // Previne o carregamento da página

    // Se nenhuma empresa foi selecionada, o código pula para fora da condição
    if (user.companiesId === "0") return;

    // Se o ID do usuário existir, atualiza o usuário existente. Se não existir, cria um novo usuário
    if (userData.id) {
      updateUser(userData.id, user); // Atualiza os dados
    } else {
      postUser(user); // Adiciona um novo usuário
    }
  };

  return (
    <form onSubmit={submitUser} className="row">
      {" "}
      {/* Evento de submit chama a função submitUser */}
      <input
        type="text" // Campo de entrada de texto para o nome
        name="name" // Define o nome do campo como 'name'
        value={user.name} // Valor que define 'user.name'
        placeholder="Name" // Texto de placeholder para o campo
        onChange={(e) => handleValue(e)} // Atualiza o estado ao mudar o valor do campo
      />
      <input
        type="email" // Campo de entrada de email
        name="email" // Nome do campo como 'email'
        value={user.email} // Valor que define 'user.email'
        placeholder="Email" // Placeholder para o email
        onChange={(e) => handleValue(e)} // Atualiza o estado ao mudar o valor do campo
      />
      <input
        type="tel" // Campo de entrada para telefone
        name="phone" // Nome do campo 'phone'
        value={user.phone} // Valor que define 'user.phone'
        placeholder="Phone (10)" // Placeholder para o campo telefone
        pattern="[0-9]{10}" // Define um padrão de 10 números
        onChange={(e) => handleValue(e)} // Atualiza o estado ao mudar o valor do campo
      />
      {/* Componente para selecionar a empresa usando o ID da empresa e o handleValue */}
      <DropCompanies companiesId={user.companiesId} handleValue={handleValue} />
      <input
        className="btn-submit" // Cria uma classe pra usar no CSS
        type="submit" // Define o tipo do input como 'submit'
        value={`${!userData.id ? "Add new user" : "Save user"}`} // Cria uma condição de exibição de texto
      />
    </form>
  );
};

// Exporta o componente
export default Form;
