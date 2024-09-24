// Importações para o projeto:
import { LogoIcon } from "./assets/icons";
import CrudUser from "./components/CrudUser";
import "./styles/App.css";

// Declara a função principal da aplicação
function App() {
  // Retorna toda a estrutura da aplicação
  return (
    <>
      {/* Elemento do cabeçalho da aplicação */}
      <header>
        {/* Div que encapsula o conteúdo do cabeçalho */}
        <div className="header__content">
          {/* Div que contém o logotipo e o título da aplicação */}
          <div className="logo">
            {/* Elemento que representa o ícone do logotipo */}
            <LogoIcon />
            {/* Título em negrito que descreve a aplicação */}
            <strong>JSON SERVER API</strong>
          </div>
        </div>
      </header>
      {/* Elemento que contém o conteúdo principal da aplicação */}
      <main>
        {/* Elemento que carrega o CRUD para usuários */}
        <CrudUser />
      </main>
    </>
  );
}

// Exporta o componente
export default App;
