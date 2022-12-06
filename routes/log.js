const express = require("express")
const router = express.Router()

const mysql = require("../mysql").pool 

router.post("/cadastrar", (req, res, next) => {

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      })
    }
    conn.query(
      `INSERT INTO LOG_MOVIMENTACAO 
          (RFID,ANDAR_ATUAL,SITUACAO,HORARIO) 
           VALUES 
              (?,?,?,SYSDATE());`,
              [req.body.RFID,req.body.ANDAR_ATUAL,req.body.SITUACAO],
      (error, resultado) => {
        conn.release();

        if (error) {
          return res.status(500).send({
            error: error
          });
        }

        res.status(200).send({
          mensagem: "Movimentação cadastrada com sucesso"
        });
      }
    );
  });
});


module.exports = router;