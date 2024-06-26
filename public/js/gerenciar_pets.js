document.addEventListener("DOMContentLoaded", () => {
  listaPet();
});

document
  .getElementById("cadastroDoPet")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    let nome = document.getElementById("nome");
    let raca = document.getElementById("raca");
    let porte = document.getElementById("porte");
    let data_nascimento = document.getElementById("data_nascimento");
    let observacao = document.getElementById("observacao");
    let cor = document.getElementById("cor");
    let sexo = document.getElementById("sexo");
    let castrado = document.getElementById("castrado");

    const response = await fetch("/pet/cadastrar", {
      method: "POST",
      body: `nome=${nome.value}&raca=${raca.value}&porte=${porte.value}&data_nascimento=${data_nascimento.value}&observacao=${observacao.value}&cor=${cor.value}&sexo=${sexo.value}&castrado=${castrado.value}`,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    });
    const result = await response.json();
    alert(result.resposta);
    listaPet();
  });

const listaPet = () => {
  fetch("/pet/listar")
    .then((response) => response.json())
    .then((result) => {
      let tabelapet = document.getElementById("listadospets");

      if ($.fn.DataTable.isDataTable("#myTable")) {
        // Destruir a instância existente do DataTable
        var table = $("#myTable").DataTable();
        table.destroy();
      }

      // Destroy the DataTable
      tabelapet.innerHTML = "";

      for (let c = 0; c < result.length; c++) {
        tabelapet.innerHTML += `<tr>
          <td>${result[c].id}</td>
          <td>${result[c].nome}</td>
          <td>${result[c].raca}</td>
          <td>${result[c].porte}</td>
          <td>${result[c].data_nascimento}</td>
          <td>${result[c].observacao}</td>
          <td>${result[c].cor}</td>
          <td>${result[c].sexo}</td>
          <td>${result[c].castrado}</td>
          <td>${result[c].adotado}</td>
          <td><button type="button" onclick="deletar(${result[c].id})">Deletar</button></td>
        </tr>`;
      }

      $("#myTable").DataTable({
        // suas opções de inicialização aqui
        responsive: true,
        autoWidth: false,
        columnDefs: [
          { targets: "_all", className: "dt-head-center dt-body-center" },
        ],
      });
    })
    .catch((error) => console.error("Erro ao listar comentários:", error));
};

// const deletar = (id) => {
//   fetch(`/pet/deletar/${id}`, {
//     method: "DELETE",
//   })
//     .then((response) => response.json())
//     .then((result) => {
//       alert(result.resposta);
//       listaPet();
//     });
// };

const deletar = (id) => {
  fetch("/pet/deletar", {
    method: "DELETE",
    body: `id=${id}`,
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      alert(result.resposta);
      listaPet();
    });
};
