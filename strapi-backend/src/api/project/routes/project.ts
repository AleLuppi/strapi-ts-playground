/**
 * project router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::project.project", {
  config: {
    find: {
      middlewares: ["api::project.is-owner"],
    },
    findOne: {
      middlewares: ["api::project.is-owner"],
    },
    update: {
      middlewares: ["api::project.is-owner"],
    },
    delete: {
      middlewares: ["api::project.is-owner"],
    },
  },
});
