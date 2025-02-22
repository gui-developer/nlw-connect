// Obtém o elemento HTML com o ID "app", onde o conteúdo será renderizado
const app = document.getElementById("app");

// Lista de usuários pré-cadastrados
const users = [
    {
        email: 'teste@gmail.com',
        phone: '21112341234',
        ref: null, // Referência única do usuário (nulo para o primeiro usuário)
        refBy: 100 // Referência de quem convidou o usuário
    },
    {
        email: 'testedois@gmail.com',
        phone: '21112341234',
        ref: 100, // Referência única do usuário
        refBy: 100 // Referência de quem convidou o usuário
    },
    {
        email: 'testetres@gmail.com',
        phone: '21112341234',
        ref: 100, // Referência única do usuário
        refBy: 100 // Referência de quem convidou o usuário
    }
];

// Função para buscar um usuário pelo e-mail
const getUser = (userData) => {
    return users.find((user) => {
        return user.email == userData.email; // Retorna o usuário se o e-mail corresponder
    });
};

// Função para salvar um novo usuário na lista
const saveUser = (userData) => {
    // Cria um novo usuário com os dados fornecidos
    const newUser = {
        ...userData, // Copia os dados do usuário (email e phone)
        ref: Math.round(Math.random() * 5000), // Gera uma referência única aleatória
        refBy: 100 // Define quem convidou o usuário (neste caso, 100)
    };

    users.push(newUser); // Adiciona o novo usuário à lista
    return newUser; // Retorna o novo usuário
};

// Função para obter o total de inscrições feitas por um usuário
const getTotalSubscribers = (userData) => {
    // Filtra os usuários que foram convidados pelo usuário atual
    const subs = users.filter((user) => {
        return user.refBy == userData.ref; // Retorna os usuários com refBy igual à referência do usuário atual
    });
    return subs.length; // Retorna o número de inscrições feitas
};

// Função para exibir o link de convite e o número de inscrições
const showInvite = (userData) => {
    // Renderiza o conteúdo dentro do elemento "app"
    app.innerHTML = `
        <input type="text" id="Link" value="https://evento.com?ref=${userData.ref}" disabled>
        <div id="stats">
            <h4>${getTotalSubscribers(userData)}</h4> <!-- Exibe o número de inscrições -->
            <p>Inscrições Feitas</p>
        </div>
    `;
};

// Função para configurar o evento de submit do formulário
const formAction = () => {
    const form = document.getElementById('form'); // Obtém o formulário pelo ID
    form.onsubmit = (event) => {
        event.preventDefault(); // Impede o comportamento padrão de recarregar a página

        // Obtém os dados do formulário
        const formData = new FormData(form);
        const userData = {
            email: formData.get("email"), // Obtém o e-mail do formulário
            phone: formData.get("phone"), // Obtém o telefone do formulário
        };

        // Busca o usuário pelo e-mail
        const user = getUser(userData);
        if (user) {
            // Se o usuário existir, exibe o link de convite
            showInvite(user);
        } else {
            // Se o usuário não existir, salva o novo usuário e exibe o link de convite
            const newUser = saveUser(userData);
            showInvite(newUser);
            console.log("Usuário não encontrado, novo usuário salvo.");
        }
    };
};

// Função para iniciar a aplicação
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
            <button type="submit">Confirmar</button>
        </form>
    `;

    // Renderiza o formulário dentro do elemento "app"
    app.innerHTML = content;

    // Configura o evento de submit do formulário
    formAction();
};

// Inicia a aplicação
startApp();