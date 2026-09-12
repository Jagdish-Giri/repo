export const parsePagination = (query) => {
  const limit = Math.min(Number(query.limit || 20), 100);
  const cursor = query.cursor;
  const page = Number(query.page || 1);
  const offset = Number(query.offset ?? (page - 1) * limit);
  return { limit, cursor, page, offset, useCursor: Boolean(cursor) };
};
