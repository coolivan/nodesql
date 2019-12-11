/*
  1.  npm i mysql
  2.  const {Database} = require('./Database')
  3.  const {Database} = require('./config')
  4.  const db = new Database(config)
  5.  db.query(...)
*/

const mysql = require("mysql");

class Database {
  constructor(config) {
    this.config = {
      host: "localhost",
      user: "root",
      password: "",
      database: "test",
      ...config
    };
    this.pool = mysql.createPool(this.config);
  }

  // 查询入口
  query(sql, val) {
    console.log("sql", sql);
    return new Promise((resolve, reject) => {
      this.pool.getConnection(function(err, connection) {
        if (err) reject(err);
        connection.query(sql, val, (err, data) => {
          if (err) reject(err);
          resolve(data);
        });
        connection.release();
      });
    });
  }
}

/*
  创建库
*/

const CREACTE_DATABASE = database => {
  return `CREATE DATABASE IF NOT EXISTS ${database} DEFAULT CHARSET utf8 COLLATE utf8_general_ci;`;
};

/*
  创建表
  CREACTE_TABLE(tableName,["name","password"])
  CREACTE_TABLE(tableName,[{ field: "name", type: "varchar(255)" }])
*/

const CREACTE_TABLE = (tableName, fields = [{}]) => {
  let field = fields
    .map(f => {
      if (Object.prototype.toString.call(f) === "[object String]") {
        return `${f} VARCHAR(255)`;
      } else {
        return `${f.field} ${f.type}`;
      }
    })
    .join(",");

  return `CREATE TABLE ${tableName}(id INT AUTO_INCREMENT,${field},PRIMARY KEY (id))`;
};

/*
  查询
  SELECT_TABLE(tableName)
  SELECT_TABLE(tableName,{key:'id',val:1})

*/

const SELECT_TABLE = (tableName, where) => {
  if (where != undefined) {
    let w = Object.keys(where)
      .map(k => {
        return typeof where[k] === "string"
          ? `${k}="${where[k]}"`
          : `${k}=${where[k]}`;
      })
      .join(" and ");
    return `SELECT * FROM ${tableName} WHERE ${w}`;
  } else {
    return `SELECT * FROM ${tableName}`;
  }
};

/*
  插入
  INSERT_TABLE("users",{name:'title',pw:'111111',age:3})
*/

const INSERT_TABLE = (tableName, data) => {
  let keys = Object.keys(data).join(",");
  let vals = Object.values(data)
    .map(v => {
      return typeof v === "string" ? `"${v}"` : `${v}`;
    })
    .join(",");
  return `INSERT INTO ${tableName} (${keys}) VALUES (${vals})`;
};

/*
  更新
  UPDATE_TABLE(tableName,{name:'a',pw:111},{id:1,age:10})
*/

const UPDATE_TABLE = (tableName, data, where) => {
  let d = Object.keys(data)
    .map(k => {
      return typeof data[k] === "string"
        ? `${k}="${data[k]}"`
        : `${k}=${data[k]}`;
    })
    .join(",");
  let w = Object.keys(where)
    .map(k => {
      return typeof where[k] === "string"
        ? `${k}="${where[k]}"`
        : `${k}=${where[k]}`;
    })
    .join(" and ");
  return `UPDATE ${tableName} SET ${d} WHERE (${w});`;
};

/*
  删除
  DELETE_TABLE('users',{id:1,age:10})
*/

DELETE_TABLE = (tableName, where) =>{
  let w = Object.keys(where)
    .map(k => {
      return typeof where[k] === "string"
        ? `${k}="${where[k]}"`
        : `${k}=${where[k]}`;
    })
    .join(" and ");
    return `DELETE FROM ${tableName} WHERE (${w});`;
}

module.exports = {
  Database,
  CREACTE_TABLE,
  SELECT_TABLE,
  INSERT_TABLE,
  UPDATE_TABLE,
  DELETE_TABLE
};

// exports.Database = Database;
