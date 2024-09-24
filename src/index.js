// Importações para o projeto:
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Chama o método render da biblioteca ReactDOM para renderizar a árvore de componentes React no DOM
ReactDOM.render(
  // Envolve o componente App em <React.StrictMode>
  <React.StrictMode>
    {/* Renderiza o componente principal da aplicação */}
    <App />
  </React.StrictMode>,
  // Define onde o componente deve ser montado no DOM, onde o elemento possuir o id "root".
  document.getElementById("root")
);
