/**
 * `is-owner` middleware
 */

import type { Core } from "@strapi/strapi";

const isOwner: Core.MiddlewareFactory = (config, { strapi }) => {
  return async (ctx, next) => {
    strapi.log.info("In is-owner middleware.");

    const entryId = ctx.params.id;
    const user = ctx.state.user;
    const userId = user?.documentId;

    // User should be logged
    if (!userId) return ctx.unauthorized("You must be logged in.");

    // Retrieve api uid from name
    const apiName = ctx.state.route.info.apiName;

    function generateUID(apiName) {
      const apiUid = `api::${apiName}.${apiName}`;
      return apiUid;
    }

    const appUid = generateUID(apiName);

    // Strapi findOne: logged user should be the owner of the project
    if (entryId) {
      const entry = await strapi.documents(appUid as any).findOne({
        documentId: entryId,
        populate: "*",
      });

      if (entry && entry.user.documentId !== userId)
        return ctx.unauthorized("You can't access this entry.");
    }

    // Strapi findMany: bypass search by returning projects related to logged user
    // This is required since filters won't work on user.documentId
    //   if leaving search to "next()".
    // FIXME: using this approach, "meta" fields gets lost.
    if (!entryId) {
      const userProjects = await strapi.entityService.findMany(appUid as any, {
        filters: {
          ...(ctx.query.filters as object | undefined),
          user: {
            documentId: userId,
          },
        },
        populate: "*",
      });

      ctx.body = { data: userProjects };
      return;
    }

    await next();
  };
};

export default isOwner;
