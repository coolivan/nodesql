const config = require('./config');
const {
  Database,
  CREACTE_TABLE,
  SELECT_TABLE,
  INSERT_TABLE,
  UPDATE_TABLE,
  DELETE_TABLE
} = require("./Database");


const db = new Database(config);

// console.log(db);
// db.query(CREACTE_TABLE("chris", ["name", "pw", "age"])).then(res=>{
//     console.log(res);
// });


db.query(SELECT_TABLE("cool", { id: 1, age: 18 })).then(res => {
  console.log(res);
});

// db.query(SELECT_TABLE("cool")).then(res => {
//   console.log(res);
// });

// db.query(INSERT_TABLE("cool",{name:'title',pw:'111111',age:3})).then(res => {
//   console.log(res);
// });

// db.query("INSERT INTO cool (name,pw,age) VALUES ('title',111111,3)").then(res => {
//   console.log(res);
// });


// db.query("UPDATE cool SET name ='cccddd',pw=200 WHERE age= 3 and id = 5").then(res => {
//   console.log(res);
// });

// db.query(UPDATE_TABLE('cool',{age:444,pw:456789},{id:6,name:'coolivan'})).then(res => {
//   console.log(res);
// });

// db.query(DELETE_TABLE("cool", {age: 3 })).then(res => {
//   console.log(res);
// });





