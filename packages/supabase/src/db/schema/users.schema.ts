import { text } from "drizzle-orm/pg-core";
import { pgTable, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().notNull(),
  email: text("email").notNull().unique(),
});
