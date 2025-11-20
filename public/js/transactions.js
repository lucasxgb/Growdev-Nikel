const modal = new bootstrap.Modal("#transactions-modal")
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []
}

document.getElementById("button-logout").addEventListener("click", logout);


checkLogged();

function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (!logged) {
        window.location.href = "index.html";
    }

    const user = localStorage.getItem(logged);
    if (user) {
        data = JSON.parse(user);
        getTransactions();
    }

}


function saveData(dataValue) {
    console.log(dataValue);
    localStorage.setItem(dataValue.email, JSON.stringify(dataValue));
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");
    window.location.href = "index.html";
}

// Adicionar lançamento

document.getElementById("transaction-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector("input[name='type-input']:checked").value;

    data.transactions.unshift({
        value: value,
        type: type,
        description: description,
        date: date
    })

    saveData(data);
    getTransactions();

    e.target.reset();
    alert("Lançamento adicionado com sucesso!");
    modal.hide()



});

function getTransactions() {
    const transactions = data.transactions;
    let transactionsHtml = ``;

    if (transactions.length) {
        transactions.forEach((item) => {
            let type = "Entrada";

            if (item.type === "2") {
                type = "Saída";
            }
            transactionsHtml += `
            <tr>
                <th scope="row">${item.date}</th>
                <td>${item.value.toFixed(2)}</td>
                <td>${type}</td>
                <td>${item.description}</td>
                
            </tr>
            `

        })
    }
    document.getElementById("transactions-list").innerHTML = transactionsHtml;




}