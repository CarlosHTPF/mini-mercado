const horariosOcupados = [
  "2025-09-07T10:00",
  "2025-09-07T15:00",
  "2025-09-08T09:00",
  "2025-09-08T14:00"
];

// Resumo do pedido
const resumoPedido = document.getElementById("resumoPedido");
["Arroz 5kg", "Feijão 1kg", "Óleo 900ml"].forEach(item => {
  const li = document.createElement("li");
  li.textContent = item;
  resumoPedido.appendChild(li);
});

// Alterna campo de endereço
document.getElementById("tipoServico").addEventListener("change", function () {
  const enderecoDiv = document.getElementById("enderecoEntrega");
  enderecoDiv.classList.toggle("d-none", this.value !== "entrega");
});

// Validação do datetime-local
const inputDataHora = document.getElementById("dataHoraAgendamento");
const avisoHorario = document.getElementById("avisoHorario");
const btnConfirmar = document.getElementById("btnConfirmar");

// Define data mínima = hoje
inputDataHora.min = new Date().toISOString().slice(0,16);

// Ao mudar o horário, verificar se está ocupado
inputDataHora.addEventListener("change", () => {
  // Normaliza para "YYYY-MM-DDTHH:MM"
  const selecionado = inputDataHora.value.slice(0,16);

  if (horariosOcupados.includes(selecionado)) {
    avisoHorario.classList.remove("d-none");
    btnConfirmar.disabled = true;
  } else {
    avisoHorario.classList.add("d-none");
    btnConfirmar.disabled = false;
  }
});