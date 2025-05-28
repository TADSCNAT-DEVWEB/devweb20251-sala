const showMessage = (classificacao) => {window.alert('Sua classificação é ' + classificacao);};

function carregarResultadoIMC(event) {
    event.preventDefault(); // Impede o envio do formulário padrão, senão ele geraria um reload da página
    let url_requisicao_post = document.getElementById('url_requisicao').dataset.url_post //Captura qual é a URL que deve ser requisitada
    fetch(url_requisicao_post,{ // Usando a API fetch para fazer a requisição POST, colocando o cabecalho correto e o corpo da requisição
        method: 'POST',
        headers: { //Cabeçalho da requisição com o tipo de conteúdo e o token CSRF para segurança
            "Content-Type": "application/json",
            "X-CSRFToken": document.querySelector("[name=csrfmiddlewaretoken]").value
        },
        body: JSON.stringify({ //O JSON.stringify converte o objeto JavaScript em uma string JSON, a partir dos valores dos campos do formulário
            peso: document.getElementById('peso').value,
            altura: document.getElementById('altura').value
        })
    })
        .then(response => response.text()) // O then espera a resposta do servidor e converte para texto
        .then(data => { // O segundo then recebe o texto retornado e atualiza o conteúdo do elemento com id 'resultado_imc'
            document.getElementById('resultado_imc').innerHTML = data;
            console.log(data);
        })
        .catch(error => { //Caso ocorra algum erro na requisição, ele será capturado aqui
            console.error('Erro ao carregar resultado IMC:', error);
        });
}

const limpar = () => { // Função para limpar os campos do formulário e o resultado
    document.getElementById('altura').value = '';
    document.getElementById('peso').value = '';
    document.getElementById('resultado_imc').innerHTML = '';
};