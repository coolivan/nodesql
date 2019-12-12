  1.  npm i mysql
  2.  const db = require('./Nodesql') 
  3.  const config = require('./config')
  4.  db.config(config);
  5.  db.select(...)



```
const config = require('./config');
const db= require("./Nodesql");

db.config(config);


// 查询
db.select("cool").then(res => {
  console.log(res);
});
// db.select("cool", { name: "cool", age: 18 }, res => {
//   console.log(res);
// });

// 插入
// db.insert("cool", { name: "cool18", pw:123,age: 18 }, res => {
//   console.log(res);
// });
// db.insert("cool", { name: "cool18", pw:123,age: 18 }).then(res=>{
//   console.log(res);
// });

// 更新
// db.update("cool", { name: "cool18", pw: 123, age: 180 }, {id:8}, res => {
//   console.log(res);
// });
// db.update("cool", { name: "cool18", pw: 123, age: 180 }, {id:8}).then(res=>{
//   console.log(res);
// });

// 删除
// db.delete("cool",{id:10},res=>{
//   console.log(res);
// })
// db.delete("cool",{id:10}).then{
//   console.log(res);
// }
```

