import { createSafeActionClient } from "next-safe-action";
import { createServerClient } from "./supabase/server";

export const action = createSafeActionClient({
  handleReturnedServerError(e) {
    return e.message;
  },
});

export const authAction = action.use(async ({ next }) => {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Session is not valid!");
  }
  return next({ ctx: { user, supabase } });
});
