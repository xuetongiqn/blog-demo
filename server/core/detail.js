import pg from '../core/db';
import SQL from './sql';

export const getDetail = async itemId => {
  const id = Number(itemId);

  const sql = SQL`select * from blog where id = ${id}`;
  const { rows } = await pg.query(sql);

  return rows[0];
}

export const updateDetail = async data => {
  const sql = SQL`update blog set `.append(SQL.set(data)).append(SQL` where id=${data.id}`);

  const { rowCount } = await pg.query(sql);

  return rowCount;
}

export const addDetail = async data => {
  const sql = SQL`insert into blog `.append(SQL.values(data));
  const { rowCount } = await pg.query(sql);

  return rowCount;
}