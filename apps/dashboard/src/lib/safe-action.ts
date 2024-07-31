import { createSafeActionClient } from "next-safe-action";
import { createServerClient } from "./supabase/server";
import { getCurrentUser } from "@hr-toolkit/supabase/user-queries";

export const action = createSafeActionClient({
  handleReturnedServerError(e) {
    return e.message;
  },
});

export const authAction = action.use(async ({ next }) => {
  const supabase = createServerClient();
  const { user, error } = await getCurrentUser(supabase);
  if (!user || error) {
    throw new Error("Session is not valid!");
  }
  return next({ ctx: { user, supabase } });
});

export const adminAction = action.use(async ({ next }) => {
  const supabase = createServerClient({
    isAdmin: true,
  });
  const { user, error } = await getCurrentUser(supabase);
  if (!user || error) {
    throw new Error("You are not authorized to access this page!");
  }
  return next({ ctx: { user, supabase } });
});
