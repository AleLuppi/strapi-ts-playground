import type { Core } from "@strapi/strapi";

/**
 * Registers a custom middleware for Strapi's document service.
 *
 * @param strapi - The main Strapi instance.
 */
export const registerDocServiceMiddleware = ({
  strapi,
}: {
  strapi: Core.Strapi;
}) => {
  strapi.documents.use(async (context, next) => {
    // Preprocess "Library" collection
    if (context.uid === "api::library.library") {
      // Capitalize the "name" field for the "Library" collection
      if (context.action === "create" || context.action === "update") {
        const name = context.params.data.name;
        context.params.data.name = name.charAt(0).toUpperCase() + name.slice(1);
      }

      // Derive "slug" field from "name"
      if (context.action === "create" && !context.params.data.slug) {
        const name = context.params.data.name;
        context.params.data.slug = name
          .toLowerCase()
          .replace(/[^A-Za-z0-9-_.~]/g, "-");
      }
    }

    // Let the other middleware finish and allow the document service to return
    const result = await next();

    return result;
  });
};
