// Itens do pedido (mock)
const itensPedido = [
  { nome: "Arroz 5kg", preco: 25.90 },
  { nome: "Feijão 1kg", preco: 8.50 },
  { nome: "Óleo 900ml", preco: 7.00 }
];

// Horários base (09:00 até 18:00)
const horariosBase = [
  "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00",
  "17:00", "18:00"
];

// Exemplo de horários ocupados (viria do backend)
const horariosOcupados = {
  "2025-09-07": ["10:00", "15:00"],
  "2025-09-08": ["09:00", "14:00"]
};

// Variáveis globais
let valorBase = 0;
let horarioSelecionado = null;

// Resumo do pedido
const resumoPedido = document.getElementById("resumoPedido");
const valorTotalSpan = document.getElementById("valorTotal");

itensPedido.forEach(item => {
  const li = document.createElement("li");
  li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
  resumoPedido.appendChild(li);
  valorBase += item.preco;
});

// Função para atualizar total
function atualizarTotal() {
  const tipoServico = document.getElementById("tipoServico").value;
  let total = valorBase;
  if (tipoServico === "entrega") {
    total += 5; // taxa de entrega
  }
  valorTotalSpan.textContent = total.toFixed(2);
}

// Atualiza valor quando muda o serviço
document.getElementById("tipoServico").addEventListener("change", function () {
  const enderecoDiv = document.getElementById("enderecoEntrega");
  enderecoDiv.classList.toggle("d-none", this.value !== "entrega");
  atualizarTotal();
});

// Atualiza valor inicial
atualizarTotal();

// Função para formatar data (YYYY-MM-DD)
function formatDate(date) {
  return date.toISOString().split("T")[0];
}

// Função para gerar os próximos 7 dias
function gerarAgenda() {
  const agendaDiv = document.getElementById("agenda");
  agendaDiv.innerHTML = "";
  let hoje = new Date();

  for (let i = 0; i < 7; i++) {
    let data = new Date(hoje);
    data.setDate(hoje.getDate() + i);

    const dataFormatada = formatDate(data);
    const tituloDia = data.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "2-digit" });

    // Card do dia
    const card = document.createElement("div");
    card.classList.add("card", "mb-3");
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const h5 = document.createElement("h5");
    h5.textContent = tituloDia;
    cardBody.appendChild(h5);

    // Container de horários
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

// Gera a agenda logo ao carregar
gerarAgenda();

// Confirmar pedido
btnConfirmar.addEventListener("click", () => {
  if (!horarioSelecionado) {
    alert("Selecione um horário disponível!");
    return;
  }

  const tipoServico = document.getElementById("tipoServico").value;
  const endereco = document.getElementById("enderecoEntrega").value || "N/A";
  const total = valorTotalSpan.textContent;

  alert(
    `✅ Pedido confirmado!\n\n` +
    `Serviço: ${tipoServico === "entrega" ? "Tele-entrega" : "Retirada no local"}\n` +
    `Endereço: ${endereco}\n` +
    `Agendamento: ${horarioSelecionado}\n` +
    `Total: R$ ${total}`
  );
});
