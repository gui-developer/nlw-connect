const app = document.getElementById("app");


const formAction = () =>{
    const form = document.getElementById('form')
    form.onsubmit = (event) =>{
        event.preventDefault()
    }
}

const startApp = () => {
    // Verifica se o elemento "app" existe
    if (!app) {
        console.error("Elemento 'app' não encontrado no DOM.");
        return;
    }

    // Conteúdo do formulário
    const content = `
    <form id="form" action="">
        <input type="text" name="email" placeholder="E-mail">
        <input type="text" name="phone" placeholder="Telefone">
        <button type="button">Confirmar</button>
    </form>
    `;

    // Renderiza o formulário dentro do elemento "app"
    app.innerHTML = content;
    formAction()
};

// Inicia a aplicação
startApp();