import * as sqlite3 from 'sqlite3';
import * as path from 'path';

const db = new sqlite3.Database(path.join(__dirname, 'database/db.sqlite3'));

db.serialize(function () {
  db.run('CREATE TABLE IF NOT EXISTS lorem (info TEXT)');

  const stmt = db.prepare('INSERT INTO lorem VALUES (?)');
  for (let i = 0; i < 10; i++) {
    stmt.run('Ipsum ' + i);
  }
  stmt.finalize();

  db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
    console.log(row.id + ': ' + row.info);
  });
});

db.close();
