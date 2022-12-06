const express = require("express")
const router = express.Router()

const mysql = require("../mysql").pool 

router.get("/isAtivo/:RFID" ,(req,res,next) => {

  const RFID = req.params.RFID;
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      })
    }
    conn.query(
      `SELECT * FROM MOVIMENTACAO WHERE RFID = ${RFID}`,
      (error, resultado) => {
        conn.release();

        if (error) {
          return res.status(500).send({
            error: error
          });
        }

        res.status(200).send(resultado);
      }
    );
  });
})

router.get("/ativos", (req, res, next) => {


  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      })
    }
    conn.query(
      `SELECT 
            F.RFID,
            F.MATRICULA,
            F.NOME,F.SETOR,
            F.ANDAR,
            M.SITUACAO,
            M.ANDAR_ATUAL,
            DATE_FORMAT(M.HORARIO, '%d/%m/%Y %T') as HORARIO
          FROM 
            FUNCIONARIO F 
          INNER JOIN MOVIMENTACAO M
      ON F.RFID = M.RFID `,
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
      `INSERT INTO MOVIMENTACAO 
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

router.put("/atualizar", (req, res, next) => {

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      })
    }
    conn.query(
      `UPDATE MOVIMENTACAO SET SITUACAO = NOT(SITUACAO),HORARIO =  SYSDATE()  WHERE RFID = ?;`,
              [req.body.RFID],
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