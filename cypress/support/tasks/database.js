const { Pool } = require("pg");

const bdConfig = {
  host: "motty.db.elephantsql.com",
  user: "ahbrccha",
  password: "VwbnZd1ENr04QPaqKDGyMml2FAkugWRX",
  database: "ahbrccha",
  port: 5432,
};

module.exports = {
  removeUser(email) {
    return new Promise(function (resolve) {
      const pool = new Pool(bdConfig);

      pool.query(
        "DELETE FROM users WHERE email = $1",
        [email],
        function (error, result) {
          if (error) {
            throw error;
          }
          resolve({ success: result });
        }
      );
    });
  },
};
