import {userAgent} from "koa-useragent";

function getFormattedUA(
  userAgent,
  whitelist,
) {
  if (!userAgent) return {};
  return Object.entries(userAgent).reduce((acc, [key, value]) => {
    if (whitelist.includes(key)) {
      acc[key] = value;
    }
    return acc;
  }, {});
}

const userAgentHandler = async (ctx, next) => {
  await userAgent(ctx, next);
  ctx.formattedUA = getFormattedUA(ctx.userAgent, [
    "os",
    "platform",
    "version",
    "browser",
    "isMobile",
    "isDesktop"
  ]);
};

export {userAgentHandler};
