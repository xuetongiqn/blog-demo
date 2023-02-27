import { getDetail, addDetail, updateDetail } from "../../core/detail"

export const detail = async (ctx, next) => {
  const { id } = ctx.request.query;
  const detail = await getDetail(id);
  ctx.body = {
    ok: true,
    detail
  }
}

export const patchDetail = async (ctx, next) => {
  const data = ctx.request.body;
  let result;
  if (data.id) {
    result = await updateDetail(data);
  } else {
    result = await addDetail(data);
  }
  if (result) {
    ctx.body = { ok: true }
  } else {
    ctx.body = { ok: false, msg: 'update failed' }
  }
}