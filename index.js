const express = require('express');
const app = express ();
const PORT = 3000;
const sqlite3 = require ('sqlite3').verbose();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Servidor Ativo e operando!");
});
app.get('/usuarios', (req, res) => {
    const sql = "SELECT * FROM usuarios";
    db.all(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        res.json({ data:rows })
    });
});


app.post('/usuarios', (req, res) => {
const { nome, email } = req.body;
const sql = `INSERT INTO usuarios (nome, email) VALUES (?,?)`;
db.run (sql, [nome, email], function (err) {
    if (err) {
        return res.status(400).json({erro: err.message });
    }
    res.json({id: this.lastID, mensagem: "Usuário cadastrado!"});
});

app.put('/usuarios/:id', (req, res) =>{
    const id = req.params.id;
    const {nome,email} = req.body;
    const sql = `UPDATE usuarios SET nome =?, email=? WHERE id=?`;

    db.run(sql, [nome, email, id], function (err) {
        if (err) return res.status(500).json({ erro: err.message });
        res.json({ messagem: "Atualizado com sucesso!", alteracoes: this.changes});
    });
});

console.log(`Recebido: Nome=${nome}, Email=${email}`);
res.send("Dados recebidos no servidor!");
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http:/localhost:${PORT}`);
});

const db = new sqlite3.Database('./meubanco.db', (err) => {
    if (err) {
        console.error("Erro ao conectar ao banco:", err.message);
    } else {
        console.log("Conectado ao banco de dados SQLite!");
    }
});

const sql = `CREATE TABLE IF NOT EXISTS usuarios (
id INTEGER PRIMARY KEY AUTOINCREMENT,
nome TEXT NOT NULL,
email TEXT UNIQUE NOT NULL
)`;

db.run(sql, (err) => {
if (err) console.err("Erro ao criar tabela:", err.message);
else console.log("Tabela 'usuarios' pronta para uso!");
});

async function cadastrarUsuario(dados) {
    const response = await fetch ('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(dados)
    });
if (response.ok) {
    const result = await response.son()
    alert(`Sucesso! Usuário ID ${result.id} cadastrado.`);
} else {
    alert("erro no cadastro.");
    }
}

async function carregarUsuarios () {
    const response = await fetch('http://localhost:3000/usuarios');
    const {data} = await response.json();
    const lista = document.getElementById('lista');
    lista.innerHTML = '';

data.foreach (user => {
    const item = document.createElement ('li');
    item.textContent = `${user.nome} - ${user.email}`;
    lista.appendChild(item);
    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.onClick = async () => {
        await fetch(`http://localhost:3000/usuarios/${user.id}`, {method: 'DELETE'});
        carregarUsuarios();
    };
    item.appendChild(btnExcluir);
});
}
window.onload = carregarUsuarios;

app.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM usuarios WHERE id =?';

    db.run(sql, id, function (err) {
        if (err) return res.status(500).json({erro: err.message});
        res.json({mensagem: "Removido!", linhasAfetadas: this.changes});
    });
});

let idEdicao = null;

function prepararEdicao(user) {

document.getElementById('nome').value = user.nome;
document.getElementById('email').value = user.email;
idEdicao = user.id;
}

if (idEdicao) {

} else {

}

try {
    const res = await fetch ('...');
    if (!res.ok) throw new Error("falha na comunicaão");
} catch (erro) {
    console.error("Erro capturado:", erro.message);
    alert("Não foi possível conectar ao servidor.");
}

