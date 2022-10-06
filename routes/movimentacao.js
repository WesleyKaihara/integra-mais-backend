const express = require("express")
const router = express.Router()

const mysql = require("../mysql").pool 

router.get("/" ,(req,res,next) => {
  res.send(process.env.MYSQL_USER)
})

router.get("/listar", (req, res, next) => {

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      })
    }
    conn.query(
      "SELECT * FROM movimentacao",
      (error, resultado) => {
        conn.release();

        if (error) {
          return res.status(500).send({
            error: error
          });
        }

        res.status(200).send({
          response: resultado
        });
      }
    );
  });
});

router.post("/cadastrar", (req, res, next) => {

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      })
    }
    conn.query(
      "INSERT INTO HACKTON (movimentacao) VALUES (1))",
      (error, resultado) => {
        conn.release();

        if (error) {
          return res.status(500).send({
            error: error
          });
        }

        res.status(200).send({
          mensagem: "RFID cadastrado com sucesso"
        });
      }
    );
  });
});


// router.delete("/deletar/:id", (req, res, next) => {

//   const id = req.params.id;

//   mysql.getConnection((error, conn) => {
//     if (error) {
//       return res.status(500).send({
//         error: error
//       })
//     }
//     conn.query(
//       ` = ${id}`,
//       (error, resultado) => {
//         conn.release();

//         if (error) {
//           return res.status(500).send({
//             error: error
//           });
//         }

//         res.status(200).send({
//           mensagem: "RFID deletado com sucesso"
//         });
//       }
//     );
//   });
// });

module.exports = router;