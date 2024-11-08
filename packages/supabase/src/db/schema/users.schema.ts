import { primaryKey, text, timestamp } from "drizzle-orm/pg-core";
import { pgTable, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey().notNull(),
  email: text("email").notNull().unique(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  avatar_url: text("avatar_url"),
  timezone: text("timezone"),

  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
