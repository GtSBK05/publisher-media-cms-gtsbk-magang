export function paginate<T>(
  items: T[],
  page: number,
  perPage: number
) {
  const totalItems =
    items.length;

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        totalItems / perPage
      )
    );

  const start =
    (page - 1) * perPage;

  const end =
    start + perPage;

  return {
    data: items.slice(
      start,
      end
    ),

    totalItems,

    totalPages,

    currentPage: page,
  };
}