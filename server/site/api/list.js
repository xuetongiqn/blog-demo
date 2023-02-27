import { getList } from "../../core/list";

export const list = async (ctx, next) => {
  const { id } = ctx.request.query;
  const list = await getList(id);

  ctx.body = {
    ok: true,
    list,
    hasMore: list.length==20,
  };
}