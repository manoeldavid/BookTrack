document.addEventListener("DOMContentLoaded", () => {
  const apiBaseUrl = 'http://localhost:3000'; // ajuste se necessário

  const nomeInput = document.getElementById("nome");
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");
  const registerBtn = document.getElementById("register");
  const listBtn = document.getElementById("list-users");
  const deleteBtn = document.getElementById("delete-user");
  const deleteEmailInput = document.getElementById("delete-email");
  const userList = document.getElementById("user-list");

  // Criar usuário
  registerBtn.addEventListener("click", async () => {
    const nome = nomeInput.value;
    const email = emailInput.value;
    const senha = senhaInput.value;

    try {
      const res = await fetch(`${apiBaseUrl}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`Erro: ${data.message || 'Falha ao cadastrar'}`);
        return;
      }

      alert(`Usuário cadastrado: ${data.nome}`);
      nomeInput.value = '';
      emailInput.value = '';
      senhaInput.value = '';
    } catch (err) {
      console.error(err);
      alert('Erro na requisição');
    }
  });

  // Listar usuários
  listBtn.addEventListener("click", async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/users`);
      const users = await res.json();

      userList.innerHTML = '';
      users.forEach(user => {
        const li = document.createElement("li");
        li.textContent = `${user.nome} (${user.email})`;
        userList.appendChild(li);
      });
    } catch (err) {
      console.error(err);
      alert('Erro ao listar usuários');
    }
  });

  // Excluir usuário por email
  deleteBtn.addEventListener("click", async () => {
    const email = deleteEmailInput.value;

    if (!email) {
      alert("Digite o email do usuário a ser excluído.");
      return;
    }

    try {
      // Buscar todos usuários para achar o ID
      const res = await fetch(`${apiBaseUrl}/users`);
      const users = await res.json();

      const user = users.find(u => u.email === email);

      if (!user) {
        alert("Usuário não encontrado.");
        return;
      }

      const deleteRes = await fetch(`${apiBaseUrl}/users/${user.id}`, {
        method: 'DELETE',
      });

      if (!deleteRes.ok) {
        alert("Erro ao excluir.");
        return;
      }

      alert(`Usuário ${user.nome} excluído com sucesso.`);
      deleteEmailInput.value = '';
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir usuário.");
    }
  });
});
