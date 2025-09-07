// Função para salvar no localStorage
function salvarCarrinho(itens) {
  localStorage.setItem("carrinho", JSON.stringify(itens));
}

// Função para carregar do localStorage
function carregarCarrinho() {
  return JSON.parse(localStorage.getItem("carrinho")) || [];
}

// Renderizar carrinho na tela
function renderizarCarrinho() {
  const lista = document.getElementById("listaCarrinho");
  const totalEl = document.getElementById("totalCarrinho");
  let carrinho = carregarCarrinho();

  if (!lista || !totalEl) return;

  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    total += item.qtd * item.preco;

    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    li.innerHTML = `
      <span>${item.nome} (x${item.qtd})</span>
      <span>R$ ${(item.qtd * item.preco).toFixed(2)}</span>
      <button class="btn btn-sm btn-danger" onclick="removerItem(${index})">🗑</button>
    `;
    lista.appendChild(li);
  });

  totalEl.textContent = total.toFixed(2);
}

// Adicionar item ao carrinho
function adicionarAoCarrinho(nome, preco, qtd = 1) {
  let carrinho = carregarCarrinho();

  // Procura item igual
  let existente = carrinho.find(item => item.nome === nome);
  if (existente) {
    existente.qtd += qtd;
  } else {
    carrinho.push({ nome, preco, qtd });
  }

  salvarCarrinho(carrinho);
  renderizarCarrinho();
}

// Remover item
function removerItem(index) {
  let carrinho = carregarCarrinho();
  carrinho.splice(index, 1);
  salvarCarrinho(carrinho);
  renderizarCarrinho();
}

// Inicializa carrinho ao carregar a página
document.addEventListener("DOMContentLoaded", renderizarCarrinho);
