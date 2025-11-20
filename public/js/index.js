const modal = new bootstrap.Modal("#register-modal")
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
checkLogged();




function saveAccount(user) {
    localStorage.setItem(user.email, JSON.stringify(user))
}

// Criar conta
document.getElementById("create-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;


    if (email.length < 5) {
        alert("O e-mail deve conter no minimo 5 caracteres");
        return;
    }
    if (password.length < 4 || password.length > 12) {
        alert("A password deve conter entre 4 e 12 caracteres");
        return;
    }

    alert("Conta criada com sucesso!");
    saveAccount({
        email: email,
        password: password,
        transactions: []
    })
    modal.hide();

});



// Logar no sistema
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const user = getAccount(email);

    if (!user) {
        alert("Verifique o usuário ou a senha");
        return;
    }

    if (user.password !== password) {
        alert("Verifique o usuário ou a senha");
        return;

    }

    saveSession(email, checkSession);

    window.location.href = "home.html";

});


function getAccount(email) {
    const account = localStorage.getItem(email);

    if (account) {
        return JSON.parse(account);
    } else {
        return "";
    }
}

function saveSession(email, saveSession) {
    if (saveSession) {
        localStorage.setItem("session", email);
    }
    sessionStorage.setItem("logged", email);
}

function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }


    // Se logado, salva e envia para o home
    if (logged) {
        saveSession(logged, session);
        window.location.href = "home.html";
    }


}

