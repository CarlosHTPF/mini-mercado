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

// Resumo do pedido (mock)
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

// Configura data mínima = hoje
const inputData = document.getElementById("dataAgendamento");
inputData.min = new Date().toISOString().split("T")[0];

const containerHorarios = document.getElementById("horarios");
const avisoHorario = document.getElementById("avisoHorario");
const btnConfirmar = document.getElementById("btnConfirmar");

let horarioSelecionado = null;

// Quando escolher a data → gera os botões de horário
inputData.addEventListener("change", () => {
  const dataSelecionada = inputData.value;
  containerHorarios.innerHTML = "";
  horarioSelecionado = null;
  btnConfirmar.disabled = true;

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
        horarioSelecionado = dataSelecionada + " " + hora;
        btnConfirmar.disabled = false;
      };
    }

    containerHorarios.appendChild(btn);
  });
});

// Confirmação do pedido
btnConfirmar.addEventListener("click", () => {
  if (!horarioSelecionado) {
    alert("Selecione um horário disponível!");
    return;
  }
  alert("✅ Pedido confirmado para: " + horarioSelecionado);
});
