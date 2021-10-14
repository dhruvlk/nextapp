/* eslint-disable security/detect-object-injection */
const { getUser } = require('../utils/context');

const isRequestingUserAlsoOwner = ({
  ctx, userId, type, typeId,
}) => ctx.db.exists[type]({ id: typeId, user: { id: userId } });

const directiveResolvers = {
  isAuthenticated: async (next, source, args, ctx) => {
    const user = await getUser(ctx.req, ctx.res, ctx.models.User);
    if (!user) {
      throw new Error('User not found!');
    }
    ctx.req.user = user;
    return next();
  },
  hasRole: async (next, source, { roles }, ctx) => {
    const user = await getUser(ctx.req, ctx.res, ctx.models.User);
    if (!user) {
      throw new Error('User not found!');
    }

    if (roles.includes(user.role)) {
      ctx.req.user = user;
      return next();
    }
    throw new Error('Unauthorized, incorrect role');
  },
  isOwner: async (next, source, { type }, ctx) => {
    let typeId = null;

    if (source && source.id) {
      typeId = source.id;
    } else {
      typeId = ctx.req.body.variables.id;
    }
    const user = await getUser(ctx.req, ctx.res, ctx.models.User);
    if (!user) {
      throw new Error('User not found!');
    }
    const isOwner = type === 'User'
      ? user.id === typeId
      : await isRequestingUserAlsoOwner({
        ctx, userId: user.id, type, typeId,
      });
    if (isOwner) {
      return next();
    }
    throw new Error('Unauthorized, must be owner');
  },
  isOwnerOrHasRole: async (next, source, { roles, type }, ctx) => {
    const user = await getUser(ctx.req, ctx.res, ctx.models.User);
    if (roles.includes(user.role)) {
      return next();
    }

    const { id: typeId } = ctx.request.body.variables;
    const isOwner = await isRequestingUserAlsoOwner({
      ctx,
      userId: user.id,
      type,
      typeId,
    });

    if (isOwner) {
      return next();
    }
    throw new Error('Unauthorized, not owner or incorrect role');
  },
};

module.exports = { directiveResolvers };
