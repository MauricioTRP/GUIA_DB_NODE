const { Pool } = require('pg')

/**
 * Usuario: usuario
 * Password: 123456
 * Server: 127.0.0.1
 * Port: 5432
 * Database: usuarios
 */

const config = {
  host: process.env.HOST,
  database: process.env.DB,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASS
}

const connString = `postgresql://${process.env.USER}:${process.env.PASS}@${process.env.HOST}:${process.env.PORT}/${process.env.DB}`

const pool = new Pool({
  connectionString: connString
})

// Crear funcion para insertar registro

async function insertUser () {
  // Instruccion SQL para insertar datos
  try
      {
          const text = "INSERT INTO usuarios (nombre, telefono) VALUES ($1, $2) RETURNING *";
          const queryConfig = {
              text : text,
              values : [process.argv[3], process.argv[4]],
              rowMode : "array"
          }
          const response = await pool.query(queryConfig);

          // console.log(response.rows);
          return(response.rows)
      }
      catch (error)
      {
          console.log(error)
          const { code } = error;
          console.log(error)
      }
}

const consultar = async () =>
  {
      try
      {
          const text = "SELECT * FROM usuarios";
          const queryConfig = {
              text : text,
              values : [],
              rowMode : "array"
          }
          const response = await pool.query(queryConfig);
          return response.rows
      }
      catch (error)
      {
          const { code } = error;
          console.log(code)
      }
  }

  const consultarID = async (id) =>
    {
        try
        {
            const text = "SELECT * FROM usuarios WHERE ID = $1";
            const queryConfig = {
                text : text,
                values : [id],
                rowMode : "array"
            }
            const response = await pool.query(queryConfig);
            return response.rows
        }
        catch (error)
        {
            const { code } = error;
            console.log(code)
        }
    }

insertUser()
  .then(data => {
    console.log(data)
  })
  .then(consultar())
  .then(data => {
    console.log(data)
  })
  .then(consultarID(1))
  .then(data => {
    console.log(data)
  })
