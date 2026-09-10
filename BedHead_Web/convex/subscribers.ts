import { v } from "convex/values";
import { mutation } from "./_generated/server";

// Simple RFC-5322-ish check: good enough to catch typos, not exhaustive.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const subscribe = mutation({
  args: { email: v.string() },
  returns: v.object({
    status: v.union(
      v.literal("subscribed"),
      v.literal("already_subscribed"),
      v.literal("invalid_email"),
    ),
  }),
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();
    if (!EMAIL_PATTERN.test(email)) {
      return { status: "invalid_email" as const };
    }

    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();
    if (existing !== null) {
      return { status: "already_subscribed" as const };
    }

    await ctx.db.insert("subscribers", { email });
    return { status: "subscribed" as const };
  },
});
