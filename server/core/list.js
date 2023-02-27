import pg from '../core/db';
import SQL from './sql';

export const getList = async (id) => {
  const sql = SQL`select * from blog order where id<${id} by id desc limit 20`;

  const { rows: list } = await pg.query(sql);

  return list;
}
