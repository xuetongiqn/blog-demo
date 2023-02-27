import pg from '../core/db';
import SQL from './sql';

export const getList = async (id) => {
  let sql = SQL`select * from blog `
  if(id){
    sql = sql.append(SQL` where id<${id} `)
  }
  sql = sql.append(SQL` order by id desc limit 20`)

  const { rows: list } = await pg.query(sql);

  return list;
}
