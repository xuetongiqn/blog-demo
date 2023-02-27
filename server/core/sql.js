var SQL = require('sql-template-strings');

if(!SQL.merge){
  //fix append to accept null and undefined;
  const {append}=SQL.SQLStatement.prototype;
  SQL.SQLStatement.prototype.append= function(statement){ return append.call(this, statement!= undefined ? statement:'');};

  SQL.SQLStatement.prototype.blankEnd=function(){
    if(!this.strings[this.strings.length - 1].endsWith(' ')){
      this.strings[this.strings.length - 1] +=' ';
    }
    return this;
  }
  SQL.SQLStatement.prototype.sqlParams=function(){
    return [this.sql].concat(this.values);
  }
  SQL.SQLStatement.prototype.cast=function(type){
    return this.append(`::${type}`);
  }
}

/*
   使用NSQL替换原有的SQL，主要是通过NSQL支持语句中包含SQLStatement的片段，并且自动完成拼装，也就是说实际上支持如下语法，
   sql0=SQL`select * from user`, sql1=SQL`where id=${id}`, sql=SQL`${sql0} ${sql1}`
   但该用法必须保证子语句部分不为空
 */
function NSQL(strings, ...args){
  let sql=NSQL.id(strings[0]);
  for(let i=1;i<strings.length;i++){
    sql.append(NSQL.norm(args[i-1]));
    sql.append(strings[i]);
  }
  return sql;
}
NSQL.reduce={};
NSQL.id=(name)=>SQL``.append(name)
NSQL.norm=(value)=>value instanceof SQL.SQLStatement ? value: SQL`${value}`;
NSQL.merge=(...args)=> args.reduce((ret, item)=>ret.append(item).blankEnd(), SQL``);
NSQL.reduce.merge=(a, b)=>NSQL.merge(a,b)
NSQL.join=(separator, args)=> args.slice(1).reduce((ret, item)=>ret.append(separator).append(item), SQL``.append(args[0]));
NSQL.reduce.joiner=(separator)=> (a, b)=> NSQL.join(separator, [a, b]);
NSQL.reduce.comma=NSQL.reduce.joiner(', ');
NSQL.values=(values)=>{
  if(!Array.isArray(values)){
    values=[values];
  }
  const keys=[...new Set([].concat(...values.map(item=>Object.keys(item))))];
  let ret=NSQL.raw`(${keys.join(', ')}) values `;
  let rows=values.map(value=>SQL`(`.append(keys.map(name=>NSQL.norm(value[name])).reduce(NSQL.reduce.comma)).append(')')).reduce(NSQL.reduce.comma);
  return ret.append(rows);
}
NSQL.as_values=(values)=>{
  if(!Array.isArray(values)){
    values=[values];
  }
  const keys=[...new Set([].concat(...values.map(item=>Object.keys(item))))];
  let ret=NSQL.raw`(${keys.join(', ')}) as (values `;
  let rows=values.map(value=>SQL`(`.append(keys.map(name=>NSQL.norm(value[name])).reduce(NSQL.reduce.comma)).append(')')).reduce(NSQL.reduce.comma);
  return ret.append(rows).append(')');
}
NSQL.set=(values)=>
  Object.entries(values).map(item=> NSQL.id(item[0]).append('=').append(NSQL.norm(item[1]))).reduce(NSQL.reduce.joiner(', '));

NSQL.raw=function(strings, ...args){
  let sql=NSQL.id(strings[0]);
  for(let i=1;i<strings.length;i++){
    sql.append(args[i-1]);
    sql.append(strings[i]);
  }
  return sql;
}
NSQL.SQLStatement=SQL.SQLStatement;
NSQL.now=SQL`now()`;
export const SQLStatement=SQL.SQLStatement;
export default NSQL;
