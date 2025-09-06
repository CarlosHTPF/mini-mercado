// Lista de horários disponíveis
const horariosBase = [
  "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00",
  "17:00", "18:00"
];

// Exemplo de horários ocupados
const horariosOcupados = {
  "2025-09-07": ["10:00", "15:00"],
  "2025-09-08": ["09:00", "14:00"]
};

// Configura data mínima (hoje)
const inputData = document.getElementById("dataAgendamento");
inputData.min = new Date().toISOString().split("T")[0];

// Mostra horários livres ao escolher data
inputData.addEventListener("change", function () {
  const dataSelecionada = this.value;
  const container = document.getElementById("horarios");
  container.innerHTML = "";

  if (!dataSelecionada) return;

  horariosBase.forEach(hora => {
    const btn = document.createElement("button");
    btn.classList.add("btn", "m-1");

    if (horariosOcupados[dataSelecionada]?.includes(hora)) {
      btn.classList.add("btn-secondary");
      btn.disabled = true;
      btn.textContent = hora + " (Indisponível)";
    } else {
      btn.classList.add("btn-outline-primary");
      btn.textContent = hora;
      btn.onclick = () => {
        document.querySelectorAll("#horarios button").forEach(b => b.classList.remove("btn-primary"));
        btn.classList.add("btn-primary");
      };
    }

    container.appendChild(btn);
  });
});

// Alterna campo de endereço (entrega x retirada)
document.getElementById("tipoServico").addEventListener("change", function () {
  const enderecoDiv = document.getElementById("enderecoEntrega");
  enderecoDiv.classList.toggle("d-none", this.value !== "entrega");
});

// Simulação de resumo do pedido (viria do carrinho)
const resumoPedido = document.getElementById("resumoPedido");
const itens = ["Arroz 5kg", "Feijão 1kg", "Óleo 900ml"];
itens.forEach(item => {
  const li = document.createElement("li");
  li.textContent = item;
  resumoPedido.appendChild(li);
});