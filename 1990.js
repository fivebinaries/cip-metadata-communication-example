const { Pool } = require('pg')

const stakePoolId = process.argv.slice(2)[0];

const query = `
SELECT json
FROM tx_metadata txm
JOIN tx_in txi ON (txm.tx_id = txi.tx_in_id)
JOIN tx_out txo ON (txi.tx_out_id = txo.tx_id)
WHERE txo.stake_address_id IN
    (SELECT id
     FROM stake_address sa
     WHERE (RIGHT(sa.hash_raw::VARCHAR, LENGTH(sa.hash_raw::VARCHAR)-4)) IN
         (SELECT encode(po.hash, 'hex')
          FROM pool_owner po
          JOIN pool_hash ph ON (po.pool_hash_id = ph.id)
          WHERE registered_tx_id =
              (SELECT MAX(registered_tx_id)
               FROM pool_owner po
               JOIN pool_hash ph ON (po.pool_hash_id = ph.id)
               WHERE encode(hash_raw, 'hex') = '${stakePoolId}')))
  AND txm.key = 1990;`

// Define PostgreSQL connection to your cardano-db-sync instance
const pool = new Pool({
  user: 'csyncdb',
  host: 'localhost',
  database: 'csyncdb',
  port: 5432,
})

pool.query(query, (err, res) => {
  const result = res.rows;
  console.log("Fetching metadata for stake pool " + stakePoolId + "\n");
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
