/*
  1.  npm i mysql
  2.  const db = require('./Nodesql') 
  3.  const config = require('./config')
  4.  db.config(config);
  5.  db.select(...)
*/

const mysql = require("mysql");

class Nodesql {
  constructor() {
    this.config(config);
  }

  config(config = {}) {
    let database = {
      host: "localhost",
      user: "root",
      password: "root",
      database: "test",
      ...config
    };
    this.pool = mysql.createPool(database);
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

  /*
    创建库
  */
  CREACTE_DATABASE(database) {
    return `CREATE DATABASE IF NOT EXISTS ${database} DEFAULT CHARSET utf8 COLLATE utf8_general_ci;`;
  }
  /*
  创建表
  CREACTE_TABLE(tableName,["name","password"])
  CREACTE_TABLE(tableName,[{ field: "name", type: "varchar(255)" }])
*/

  CREACTE_TABLE(tableName, fields = [{}]) {
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
  }

  /*
  查询
  SELECT_TABLE(tableName)
  SELECT_TABLE(tableName,{name:'cool',age:18})

*/

  SELECT_TABLE(tableName, where) {
    if (where != undefined) {
      let w = Object.keys(where)
        .map(k => {
          return typeof where[k] === "string"
            ? `${k}="${where[k]}"`
            : `${k}=${where[k]}`;
        })
        .join(" and ");
      return `SELECT * FROM ${tableName} WHERE ${w}`;
    }
    return `SELECT * FROM ${tableName}`;
  }
  /*
  插入
  INSERT_TABLE("users",{name:'title',pw:'111111',age:3})
*/

  INSERT_TABLE(tableName, data) {
    let keys = Object.keys(data).join(",");
    let vals = Object.values(data)
      .map(v => {
        return typeof v === "string" ? `"${v}"` : `${v}`;
      })
      .join(",");
    return `INSERT INTO ${tableName} (${keys}) VALUES (${vals})`;
  }

  /*
  更新
  UPDATE_TABLE(tableName,{name:'a',pw:111},{id:1,age:10})
*/

  UPDATE_TABLE(tableName, data, where) {
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
  }

  /*
     删除
     DELETE_TABLE('users',{id:1,age:10})
  */

  DELETE_TABLE(tableName, where) {
    let w = Object.keys(where)
      .map(k => {
        return typeof where[k] === "string"
          ? `${k}="${where[k]}"`
          : `${k}=${where[k]}`;
      })
      .join(" and ");
    return `DELETE FROM ${tableName} WHERE (${w});`;
  }

  // 封装方法
  // db.select(table,*where,*cb)
  select(tableName, where, cb) {
    if (!cb) {
      return this.query(this.SELECT_TABLE(tableName, where));
    }
    this.query(this.SELECT_TABLE(tableName, where)).then(res => {
      cb && cb(res);
    });
  }
  // db.insert(table,data,*cb)
  insert(tableName, data, cb) {
    if (!cb) {
      return this.query(this.INSERT_TABLE(tableName, data));
    }
    this.query(this.INSERT_TABLE(tableName, data)).then(res => {
      cb && cb(res);
    });
  }
  //  db.insert(table,data,where,*cb)
  update(tableName, data, where,cb) {
    if (!cb) {
      return this.query(this.UPDATE_TABLE(tableName, data, where));
    }
    this.query(this.UPDATE_TABLE(tableName, data, where)).then(res => {
      cb && cb(res);
    });
  }
  //  db.delete(table,where,*cb)
  delete(tableName, where, cb) {
    if (!cb) {
      return this.query(this.DELETE_TABLE(tableName, where));
    }
    this.query(this.DELETE_TABLE(tableName, where)).then(res => {
      cb && cb(res);
    });
  }
}

module.exports = new Nodesql();
