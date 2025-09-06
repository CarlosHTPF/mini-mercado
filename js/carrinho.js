// Adicionar item ao carrinho
document.querySelectorAll(".btn-add").forEach(btn => {
  btn.addEventListener("click", () => {
    const nome = btn.getAttribute("data-nome");
    const preco = parseFloat(btn.getAttribute("data-preco"));

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    // Se produto já existe, aumenta quantidade
    const existente = carrinho.find(item => item.nome === nome);
    if (existente) {
      existente.qtd++;
    } else {
      carrinho.push({ nome, preco, qtd: 1 });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert(`${nome} adicionado ao carrinho!`);
  });
});

// Exibir carrinho (se estamos na página carrinho.html)
const tabela = document.getElementById("carrinhoItens");
if (tabela) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  let total = 0;

  tabela.innerHTML = "";

  carrinho.forEach((item, index) => {
    const subtotal = item.preco * item.qtd;
    total += subtotal;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>R$ ${item.preco.toFixed(2)}</td>
      <td>
        <button class="btn btn-sm btn-outline-secondary" onclick="alterarQtd(${index}, -1)">-</button>
        ${item.qtd}
        <button class="btn btn-sm btn-outline-secondary" onclick="alterarQtd(${index}, 1)">+</button>
      </td>
      <td>R$ ${subtotal.toFixed(2)}</td>
      <td><button class="btn btn-sm btn-danger" onclick="removerItem(${index})">Remover</button></td>
    `;
    tabela.appendChild(tr);
  });

  document.getElementById("carrinhoTotal").textContent = total.toFixed(2);
}

// Funções de controle
function alterarQtd(index, delta) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho[index].qtd += delta;
  if (carrinho[index].qtd <= 0) carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  location.reload();
}

function removerItem(index) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  location.reload();
}
