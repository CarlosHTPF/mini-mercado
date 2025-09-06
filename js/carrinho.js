// Função para renderizar o carrinho
function renderCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const lista = document.getElementById("listaCarrinho");
  const totalSpan = document.getElementById("totalCarrinho");
  lista.innerHTML = "";

  let total = 0;

  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

    li.innerHTML = `
      ${item.nome} - R$ ${(item.preco * item.qtd).toFixed(2)} 
      <span class="badge bg-primary rounded-pill">${item.qtd}</span>
      <div>
        <button class="btn btn-sm btn-danger" onclick="removerItem(${index})">-</button>
        <button class="btn btn-sm btn-success" onclick="adicionarItem(${index})">+</button>
      </div>
    `;
    lista.appendChild(li);

    total += item.preco * item.qtd;
  });

  totalSpan.textContent = total.toFixed(2);
}

// Diminuir quantidade
function removerItem(index) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  if (carrinho[index].qtd > 1) {
    carrinho[index].qtd -= 1; // diminui apenas a quantidade
  } else {
    carrinho.splice(index, 1); // remove do array se chegar a 0
  }
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderCarrinho();
}

// Aumentar quantidade
function adicionarItem(index) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho[index].qtd += 1;
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderCarrinho();
}

// Chamar a função ao carregar a página
document.addEventListener("DOMContentLoaded", renderCarrinho);
