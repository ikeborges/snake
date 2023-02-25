const mysql = require("mysql2/promise");

module.exports = {
  async addToRanking(playerName, score, elapsedTime) {
    try {
      const connection = await mysql.createConnection(process.env.DATABASE_URL);
      await connection.execute(
        `INSERT INTO ranking (player_name, score, elapsed_time) VALUES (?, ?, ?);`,
        [playerName, score, elapsedTime]
      );
      connection.end();
    } catch (error) {
      console.error(error);
    }
  },

  async getRanking() {
    let rows;

    try {
      const connection = await mysql.createConnection(process.env.DATABASE_URL);
      [rows] = await connection.execute(
        `SELECT * FROM ranking ORDER BY score, elapsed_time`
      );
      connection.end();
    } catch (error) {
      console.log(error);
    }

    return rows;
  },
};
