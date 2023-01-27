prisma.$use(async (params, next) => {
  if (params.args.cursor) {
    const key = _.lowerFirst(params.model);
    const result = await prisma[key].findUniqueOrThrow({
      where: params.args.cursor,
      select: _(params.args.orderBy)
        .mapValues((x) => true)
        .value(),
    });
    delete params.args.cursor;
    params.args.where = {
      ...params.args.where,
      ..._(params.args.orderBy)
        .mapValues((x, k) => ({
          [x === "desc" ? "lte" : "gte"]: result[k],
        }))
        .value(),
    };
  }
  return await next(params);
});
