// Exporta o 'httpHelper' que retorna um objeto contendo métodos HTTP
export const httpHelper = () => {
  // Função que realiza chamadas HTTP
  const customFetch = async (url, options = {}) => {
    // Define o método padrão como 'GET' caso não seja especificado
    const defaultMethod = "GET";

    // Define os cabeçalhos HTTP padrão para as requisições
    const defaultHeaders = {
      "Content-Type": "application/json", // Tipo de conteúdo como JSON
      Accept: "application/json", // Aceita respostas no formato JSON
    };

    // Cria um controller que permite o cancelamento da requisição
    const controller = new AbortController();
    // Associa o sinal de controle ao objeto de opções da requisição
    options.signal = controller.signal;
    // Define o método HTTP
    options.method = options.method || defaultMethod;
    // Combina o cabeçalho padrão com os passados nas opções
    options.headers = options.headers
      ? { ...defaultHeaders, ...options.headers }
      : defaultHeaders;

    // Transforma o corpo da requisição em uma string JSON, ou define como 'false' se não existir
    options.body = JSON.stringify(options.body) || false;
    // Se não existir um body, remove o campo 'body' das opções
    if (!options.body) delete options.body;
    // Define um timeout de 3 segundos para cancelar a requisição se demorar demais
    setTimeout(() => {
      controller.abort(); // Cancela a requisição se o tempo for excedido
    }, 3000);
    // Tenta realizar a requisição e retornar a resposta em formato JSON
    try {
      // Realiza a requisição usando 'fetch' com a URL e as opções fornecidas
      const response = await fetch(url, options);
      // Retorna a resposta no formato JSON
      return await response.json();
    } catch (err) {
      // Se existir algum erro, retorna o erro
      return err;
    }
  };

  // Função que realiza o 'GET' utilizando 'customFetch'
  const get = (url, options = {}) => customFetch(url, options);

  // Função que realiza requisições 'POST'
  const post = (url, options) => {
    // Define o método como 'POST'
    options.method = "POST";
    // Usa 'customFetch' para realizar a requisição
    return customFetch(url, options);
  };

  // Função que realiza requisições 'PUT'
  const put = (url, options) => {
    // Define o método como 'PUT'
    options.method = "PUT";
    // Usa 'customFetch' para realizar a requisição
    return customFetch(url, options);
  };

  // Função que realiza requisições 'DELETE'
  const del = (url, options) => {
    // Define o método como 'DELETE'
    options.method = "DELETE";
    // Usa 'customFetch' para realizar a requisição
    return customFetch(url, options);
  };

  // Retorna um objeto contendo as funções get, post, put e del
  return {
    get,
    post,
    put,
    del,
  };
};
