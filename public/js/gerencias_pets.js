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
      let tabelapet = document.getElementById("dados");
      var table = $("#myTable").DataTable();

      // Destroy the DataTable
      table.destroy();

      tabelapet.innerHTML = ``;
      for (c = 0; c < result.length; c++)
        tabelapet.innerHTML = +`<tr>
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
        table = new DataTable("#myTable", {
            // options
          });
    });
};
