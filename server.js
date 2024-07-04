const express = require("express");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");

const app = express();
const porta = 4445;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Configuração do multer para salvar as imagens na pasta 'uploads'
// onde vai ser salva as imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  // nome que vai dar para a imagem
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// conexao com DB

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_adote_pet",
});

db.connect((err) => {
  if (err) {
    console.log("Não conectou", err);
    return;
  }
  console.log("Conectado");
});
// Final da conexão com DB
// ------------------------- INICIO ROTA GET----------------------------------------
app.get(`/`, (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get(`/pet/cadastrar`, (req, res) => {
  res.sendFile(__dirname + "/public/gerenciar_pets.html");
});

app.get(`/pet/listar`, (req, res) => {
  const sql = "SELECT * FROM tb_pet";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ resposta: `Erro ao consultar: ${err}` });
    }
    return res.status(200).json(results);
  });
});

app.get(`/pessoa/cadastrar`, (req, res) => {
  res.sendFile(__dirname + "/public/gerenciar_pessoa.html");
});

app.get(`/pessoa/listar`, (req, res) => {
  const sql = "SELECT * FROM tb_pessoa";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ resposta: `Erro ao consultar: ${err}` });
    }
    return res.status(200).json(results);
  });
});

// ------------------------- FINAL ROTA GET-----------------------------------------

// ------------------------- INICIO ROTA POST----------------------------------------
app.post("/pet/cadastrar", upload.single("imagem"), (req, res, next) => {
  let { nome, raca, porte, data_nascimento, observacao, cor, sexo, castrado } =
    req.body;
  let imagem = req.file ? req.file.filename : null;
  const sql =
    "INSERT INTO tb_pet (nome,raca,porte,data_nascimento,observacao,cor,sexo,castrado, imagem) VALUES(?,?,?,?,?,?,?,?,?)";
  db.query(
    sql,
    [nome, raca, porte, data_nascimento, observacao, cor, sexo, castrado, imagem],
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ resposta: `Não foi possível inserir o registro: ${err}` });
      }
      return res.status(200).json({ resposta: `Pet cadastrado com sucesso` });
    }
  );
});

// listar pets por id
app.post(`/pet/listar/id`, (req, res) => {
  let id = req.body.id;

  const sql = "SELECT * FROM tb_pet WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ resposta: `Erro ao consultar: ${err}` });
    }
    return res.status(200).json(results);
  });
});
// listar pessoa por id
app.post(`/pessoa/listar/id`, (req, res) => {
  let id = req.body.id;

  const sql = "SELECT * FROM tb_pessoa WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ resposta: `Erro ao consultar: ${err}` });
    }
    return res.status(200).json(results);
  });
});

app.post("/pessoa/cadastrar", (req, res) => {
  let {
    cpf,
    nome,
    email,
    rua,
    numero,
    bairro,
    complemento,
    cidade,
    estado,
    cep,
    rg,
    telefone,
    data_nascimento,
    senha,
    confirmar,
  } = req.body;

  const sql =
    "INSERT INTO tb_pessoa (cpf, nome, email, rua, numero, bairro, complemento, cidade, estado, cep, rg, telefone, data_nascimento, senha, confirmar) VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, sha2(?, 256),sha2(?, 256))";

  db.query(
    sql,
    [
      cpf,
      nome,
      email,
      rua,
      numero,
      bairro,
      complemento,
      cidade,
      estado,
      cep,
      rg,
      telefone,
      data_nascimento,
      senha,
      confirmar,
    ],
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ resposta: `Não foi possível inserir o registro: ${err}` });
      }
      return res
        .status(200)
        .json({ resposta: `Pessoa cadastrada com sucesso` });
    }
  );
});
// ------------------------- FINAL ROTA POST-----------------------------------------

// ------------------------- INICIO ROTA DELETE-----------------------------------------
app.delete("/pet/deletar", (req, res) => {
  let { id } = req.body;
  const sql = "delete from tb_pet where id = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({ resposta: `Não deletou: ${err}` });
    }
    return res.status(200).json({ resposta: `Deletoooou` });
  });
});

app.delete("/pessoa/deletar", (req, res) => {
  let { id } = req.body;
  const sql = "delete from tb_pessoa where id = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({ resposta: `Não deletou: ${err}` });
    }
    return res.status(200).json({ resposta: `Deletoooou` });
  });
});
// ------------------------- FINAL ROTA DELETE-----------------------------------------
// ------------------------- INICIO ROTA PUT-----------------------------------------
app.put("/pet/atualizar", (req, res) => {
  let {
    nome,
    raca,
    porte,
    nascimento,
    observacao,
    cor,
    sexo,
    castrado,
    adotado,
    id,
  } = req.body;

  // insercao dos dados no banco
  const sql =
    "UPDATE tb_pet SET nome = ?, raca = ?, porte = ?, data_nascimento = ?, observacao = ?, cor = ?, sexo = ?, castrado = ?, adotado = ? WHERE id = ?";

  db.query(
    sql,
    [
      nome,
      raca,
      porte,
      nascimento,
      observacao,
      cor,
      sexo,
      castrado,
      adotado,
      id,
    ],
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ resposta: `Não foi possível atualizar o registro: ${err}` });
      }
      return res.status(200).json({ resposta: "Pet atualizado com sucesso!" });
    }
  );
});
app.put("/pessoa/atualizar", (req, res) => {
  let {
    cpf,
    nome,
    email,
    rua,
    numero,
    bairro,
    complemento,
    cidade,
    estado,
    cep,
    rg,
    telefone,
    data_nascimento,
    id,
  } = req.body;

  // insercao dos dados no banco
  const sql =
    "UPDATE tb_pessoa SET cpf = ?, nome = ?, email = ?, rua = ?, numero = ?, bairro = ?, complemento = ?, cidade = ?, estado = ?, cep = ?, rg = ?, telefone = ?, data_nascimento = ? WHERE id = ?";

  db.query(
    sql,
    [
      cpf,
      nome,
      email,
      rua,
      numero,
      bairro,
      complemento,
      cidade,
      estado,
      cep,
      rg,
      telefone,
      data_nascimento,
      id,
    ],
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ resposta: `Não foi possível atualizar o registro: ${err}` });
      }
      return res.status(200).json({ resposta: "Pet atualizado com sucesso!" });
    }
  );
});

// ------------------------- FINAL ROTA PUT-----------------------------------------

// Porta de erro
app.use((req, res) => {
  res.sendFile(__dirname + "/public/404.html");
});

// Servidor
app.listen(porta, () => {
  console.log(`Rodando na porta ${porta}`);
});
