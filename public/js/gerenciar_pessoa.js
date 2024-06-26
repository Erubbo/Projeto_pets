document.addEventListener("DOMContentLoaded", () => {
  listaPessoa();
});

document
  .getElementById("cadastroDaPessoa")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    let cpf = document.getElementById("cpf");
    let nome = document.getElementById("nome");
    let email = document.getElementById("email");
    let rua = document.getElementById("rua");
    let numero = document.getElementById("numero");
    let bairro = document.getElementById("bairro");
    let complemento = document.getElementById("complemento");
    let cidade = document.getElementById("cidade");
    let estado = document.getElementById("estado");
    let cep = document.getElementById("cep");
    let rg = document.getElementById("rg");
    let telefone = document.getElementById("telefone");
    let data_nascimento = document.getElementById("data_nascimento");
    let senha = document.getElementById("senha");
    let confirmar = document.getElementById("confirmar");

    if (senha.value != confirmar.value) {
      alert("Senhas erradas, burro");
      return;
    }
    let timerInterval;
    Swal.fire({
      html: "Usuario Cadastrado.",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          // timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });

    const response = await fetch("/pessoa/cadastrar", {
      method: "POST",
      body: `cpf=${cpf.value}&nome=${nome.value}&email=${email.value}&rua=${rua.value}&numero=${numero.value}&bairro=${bairro.value}&complemento=${complemento.value}&cidade=${cidade.value}&estado=${estado.value}&cep=${cep.value}&rg=${rg.value}&telefone=${telefone.value}&data_nascimento=${data_nascimento.value}&senha=${senha.value}&confirmar=${confirmar.value}`,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    });

    const result = await response.json();
    // alert(result.resposta);
    listaPessoa();
  });

const listaPessoa = () => {
  fetch("/pessoa/listar")
    .then((response) => response.json())
    .then((result) => {
      let tabelapet = document.getElementById("listadaspessoas");

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
        <td>${result[c].cpf}</td>
        <td>${result[c].nome}</td>
        <td>${result[c].email}</td>
        <td>${result[c].rua}</td>
        <td>${result[c].numero}</td>
        <td>${result[c].bairro}</td>
        <td>${result[c].complemento}</td>
        <td>${result[c].cidade}</td>
        <td>${result[c].estado}</td>
        <td>${result[c].cep}</td>
        <td>${result[c].rg}</td>
        <td>${result[c].telefone}</td>
        <td>${result[c].data_nascimento}</td>
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
//   fetch("/pessoa/deletar", {
//     method: "DELETE",
//     body: `id=${id}`,
//     headers: {
//       "Content-type": "application/x-www-form-urlencoded",
//     },
//   })
//     .then((response) => response.json())
//     .then((result) => {
//       alert(result.resposta);
//       listaPessoa();
//     });
// };

const deletar = (id) => {
  Swal.fire({
    title: "Você tem certeza??",
    text: "Não será possivel reverter!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, delete!",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch("/pessoa/deletar", {
        method: "DELETE",
        body: `id=${id}`,
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          // Exibir SweetAlert de sucesso
          Swal.fire({
            title: "Deletado!",
            text: result.resposta,
            icon: "success",
          });
          // Atualizar a lista após deletar
          listaPessoa();
        })
        .catch((error) => {
          // Exibir SweetAlert de erro se houver problema na requisição
          Swal.fire({
            title: "Erro!",
            text: "Deu erro.",
            icon: "error",
          });
        });
    }
  });
};
