const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gerenciaPf',
  password: 'Info@1234',
  port: 5433,
});

const getMusicas = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM "Music" ORDER BY id ASC', [], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }

const getProdutos = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM "Produto" ORDER BY nome ASC', [], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const getPedidos = (body) => {
  return new Promise(function(resolve, reject) {
    const { id } = body
    pool.query('SELECT * FROM "Pedido" WHERE id_usuario=$1 ORDER BY id ASC', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const login = (body) => {
  return new Promise(function(resolve, reject) {
    const { email, pass } = body
    pool.query('SELECT * FROM "Usuario" WHERE email=$1 AND senha=$2', [email, pass], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

const criarMusica = (body) => {
  return new Promise(function(resolve, reject) {
    const { nome, artista, album, ano_lancamento, brasileira } = body
    pool.query('INSERT INTO "Music" (nome, artista, album, ano_lancamento, brasileira) VALUES ($1, $2, $3, $4, $5) RETURNING *', [nome, artista, album, ano_lancamento, brasileira], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

const deletarUsuario = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('DELETE FROM "Usuario" WHERE id = $1', [parseInt(id)], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve('ID do usuário deletado: ${id}')
    })
  })
}

module.exports = {
  getMusicas,
  criarMusica
}