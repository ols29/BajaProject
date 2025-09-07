document.getElementById('loginForm').addEventListener('submit', function(e){
    e.preventDefault(); // evita que o formulário recarregue a página
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Usuário e senha fixos (exemplo)
    if(username === "admin" && password === "1234") {
        window.location.href = "index.html"; // redireciona para o site
    } else {
        document.getElementById('errorMsg').textContent = "Usuário ou senha incorretos!";
    }
});
