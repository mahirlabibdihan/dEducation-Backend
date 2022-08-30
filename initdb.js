const { exec } = require("child_process");
const initdb = () => {
  exec(
    `exit | sqlplus ${process.env.db_user}/${process.env.db_password}@${process.env.db_connectstring} @G:/Github/dbms-project/server/sql/tables.sql`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    }
  );
};

module.exports = initdb;
