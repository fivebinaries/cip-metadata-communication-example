const { Pool } = require('pg')

const stakeAddress = process.argv.slice(2)[0];
const stakePoolId = process.argv.slice(2)[1];

const addressQuery = `
  SELECT JSON
  FROM tx_metadata txm
  JOIN tx_out txo ON (txm.tx_id = txo.tx_id)
  JOIN stake_address sa ON (txo.stake_address_id = sa.id)
  WHERE sa.view='${stakeAddress}'
  AND key = 1991
  ORDER BY txm.id DESC;
`

const stakeQuery = `
  SELECT json
  FROM tx_metadata txm
  JOIN tx_out txo ON (txm.tx_id = txo.tx_id)
  JOIN tx tx ON (tx.id = txo.tx_id)
  JOIN stake_address sa ON (txo.stake_address_id = sa.id)
  WHERE tx.id IN
    (
    SELECT txo.tx_id
    FROM tx_metadata txm
    JOIN tx_out txo ON (txo.tx_id = txm.tx_id)
    WHERE txo.stake_address_id IN
      (
      SELECT id
      FROM stake_address sa
      WHERE (RIGHT(sa.hash_raw::VARCHAR, LENGTH(sa.hash_raw::VARCHAR)-4)) IN
        (
        SELECT encode(po.hash,'hex')
        FROM pool_owner po
        JOIN pool_hash ph ON (po.pool_hash_id = ph.id)
        WHERE registered_tx_id =
          (
          SELECT MAX(registered_tx_id)
          FROM pool_owner po
          JOIN pool_hash ph ON (po.pool_hash_id = ph.id)
          WHERE encode(hash_raw,'hex') = '${stakePoolId}'
          )
        )
      )
    AND txm.key = 1991
    )
  AND sa.view = '${stakeAddress}'
  ORDER BY tx.id DESC;
`

if (!!stakePoolId) {
  var query = stakeQuery;
} else {
  var query = addressQuery;
}

// Define PostgreSQL connection to your cardano-db-sync instance
const pool = new Pool({
  user: 'csyncdb',
  host: 'host',
  database: 'csyncdb',
  port: 5432,
})

pool.query(query, (err, res) => {
  const result = res.rows;
  console.log("Fetching metadata for address " + stakeAddress + "\n");
  for(var i = 0; i < result.length; i++) {
    var obj = result[i];

    console.log("TITLE: " + obj['json']['title']);
    var body = obj['json']['content'].join('');
    console.log("BODY:  " + body);
    console.log("LINK:  " + obj['json']['link']);
    console.log("\n\t ~~ \n")

}
  pool.end()
})
