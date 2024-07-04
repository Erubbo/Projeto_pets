document.addEventListener("DOMContentLoaded", () => {
  listaPet();
});

document
  .getElementById("cadastroDoPet")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    // let nome = document.getElementById("nome");
    // let raca = document.getElementById("raca");
    // let porte = document.getElementById("porte");
    // let data_nascimento = document.getElementById("data_nascimento");
    // let observacao = document.getElementById("observacao");
    // let cor = document.getElementById("cor");
    // let sexo = document.getElementById("sexo");
    // let castrado = document.getElementById("castrado");

    let form = document.getElementById("cadastroDoPet");
    let dados = new FormData(form);

    const response = await fetch("/pet/cadastrar", {
      method: "POST",
      body: dados,
      // body: `nome=${nome.value}&raca=${raca.value}&porte=${porte.value}&data_nascimento=${data_nascimento.value}&observacao=${observacao.value}&cor=${cor.value}&sexo=${sexo.value}&castrado=${castrado.value}`,
      // headers: {
      //   "Content-type": "application/x-www-form-urlencoded",
      // },
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
          <td><button class="btn btn-danger btn-sm" type="button" onclick="deletar(${result[c].id})">Deletar</button>
          <button class="btn btn-success btn-sm" type="button" onclick="atualizar(${result[c].id})">Atualizar</button></td>
        </tr>`;
      }

      $("#myTable").DataTable({
        // suas opções de inicialização aqui
        responsive: true,
        autoWidth: false,
        columnDefs: [
          { targets: "_all", className: "dt-head-center dt-body-center" },
        ],
        language: {
          url: "https://cdn.datatables.net/plug-ins/2.0.8/i18n/pt-PT.json",
        },
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

const atualizar = (id) => {
  fetch("/pet/listar/id", {
    method: "POST",
    body: `id=${id}`,
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      const data = new Date(result[0].data_nascimento);
      const dataFormatada = data.toISOString().split("T")[0];
      document.getElementById("atualizar-id").value = result[0].id;
      document.getElementById("atualizar-nome").value = result[0].nome;
      document.getElementById("atualizar-raca").value = result[0].raca;
      document.getElementById("atualizar-porte").value = result[0].porte;
      document.getElementById("atualizar-data_nascimento").value =
        dataFormatada;
      document.getElementById("atualizar-observacao").value =
        result[0].observacao;
      document.getElementById("atualizar-cor").value = result[0].cor;
      document.getElementById("atualizar-sexo").value = result[0].sexo;
      document.getElementById("atualizar-castrado").value = result[0].castrado;
      document.getElementById("atualizar-adotado").value = result[0].adotado;
    });
};

document.getElementById("autalizaPet").addEventListener("submit", async (e) => {
  e.preventDefault();
  let id = document.getElementById("atualizar-id");
  let nome = document.getElementById("atualizar-nome");
  let raca = document.getElementById("atualizar-raca");
  let porte = document.getElementById("atualizar-porte");
  let data_nascimento = document.getElementById("atualizar-data_nascimento");
  let observacao = document.getElementById("atualizar-observacao");
  let cor = document.getElementById("atualizar-cor");
  let sexo = document.getElementById("atualizar-sexo");
  let castrado = document.getElementById("atualizar-castrado");
  let adotado = document.getElementById("atualizar-adotado");

  fetch("/pet/atualizar", {
    method: "PUT",
    body: `nome=${nome.value}&raca=${raca.value}&porte=${porte.value}&data_nascimento=${data_nascimento.value}&observacao=${observacao.value}&cor=${cor.value}&sexo=${sexo.value}&castrado=${castrado.value}&adotado=${adotado.value}&id=${id.value}`,
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      alert(result.resposta);
      listaPet();
    })
    .catch(() => {
      alert("Nao foi possível realizar a requisição");
    });
});
