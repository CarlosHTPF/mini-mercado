// Horários base (09:00 até 18:00)
const horariosBase = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
const horariosOcupados = {
  "2025-09-07": ["10:00", "15:00"],
  "2025-09-08": ["09:00", "14:00"]
};

let valorBase = 0;
let horarioSelecionado = null;

const resumoPedido = document.getElementById("resumoPedido");
const valorTotalSpan = document.getElementById("valorTotal");
let itensPedido = JSON.parse(localStorage.getItem("carrinho")) || [];

if (itensPedido.length === 0) {
  const li = document.createElement("li");
  li.classList.add("list-group-item");
  li.textContent = "Nenhum item no carrinho.";
  resumoPedido.appendChild(li);
} else {
  itensPedido.forEach(item => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = `${item.nome} (x${item.qtd}) - R$ ${(item.preco * item.qtd).toFixed(2)}`;
    resumoPedido.appendChild(li);
    valorBase += item.preco * item.qtd;
  });
}

function atualizarTotal() {
  const tipoServico = document.getElementById("tipoServico").value;
  let total = valorBase;
  if (tipoServico === "entrega") total += 5;
  valorTotalSpan.textContent = total.toFixed(2);
}

document.getElementById("tipoServico").addEventListener("change", function () {
  const enderecoDiv = document.getElementById("enderecoEntregaDiv");
  enderecoDiv.classList.toggle("d-none", this.value !== "entrega");
  atualizarTotal();
});

atualizarTotal();

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function gerarAgenda() {
  const agendaDiv = document.getElementById("agenda");
  agendaDiv.innerHTML = "";
  let hoje = new Date();

  for (let i = 0; i < 7; i++) {
    let data = new Date(hoje);
    data.setDate(hoje.getDate() + i);

    const dataFormatada = formatDate(data);
    const tituloDia = data.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "2-digit" });

    const card = document.createElement("div");
    card.classList.add("card", "mb-3");
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const h5 = document.createElement("h5");
    h5.textContent = tituloDia;
    cardBody.appendChild(h5);

    const horariosDiv = document.createElement("div");
    horariosDiv.classList.add("d-flex", "flex-wrap");

    horariosBase.forEach(hora => {
      const btn = document.createElement("button");
      btn.classList.add("btn", "m-1");

      if (horariosOcupados[dataFormatada]?.includes(hora)) {
        btn.classList.add("btn-secondary");
        btn.disabled = true;
        btn.textContent = hora + " (Indisponível)";
      } else {
        btn.classList.add("btn-outline-primary");
        btn.textContent = hora;
        btn.onclick = () => {
          document.querySelectorAll("#agenda button").forEach(b => b.classList.remove("btn-primary"));
          btn.classList.add("btn-primary");
          horarioSelecionado = dataFormatada + " " + hora;
          btnConfirmar.disabled = false;
        };
      }
      horariosDiv.appendChild(btn);
    });

    cardBody.appendChild(horariosDiv);
    card.appendChild(cardBody);
    agendaDiv.appendChild(card);
  }
}

const btnConfirmar = document.getElementById("btnConfirmar");
gerarAgenda();

btnConfirmar.addEventListener("click", () => {
  if (!horarioSelecionado) {
    alert("Selecione um horário disponível!");
    return;
  }

  const tipoServico = document.getElementById("tipoServico").value;
  const endereco = document.getElementById("enderecoEntrega").value.trim();
  const total = valorTotalSpan.textContent;

  if (tipoServico === "entrega" && endereco === "") {
    alert("Informe o endereço para a entrega!");
    return;
  }

  document.getElementById("modalServico").textContent = tipoServico === "entrega" ? "Tele-entrega" : "Retirada no local";
  document.getElementById("modalEndereco").textContent = tipoServico === "entrega" ? endereco : "Mercado Independência";
  document.getElementById("modalHorario").textContent = horarioSelecionado;
  document.getElementById("modalTotal").textContent = total;

  const modal = new bootstrap.Modal(document.getElementById("modalConfirmacao"));
  modal.show();

  localStorage.removeItem("carrinho");
});