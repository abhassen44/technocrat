import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tutorials = pgTable("tutorials", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  level: text("level").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull()
});

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull()
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  type: text("type").notNull()
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull()
});

export const insertTutorialSchema = createInsertSchema(tutorials);
export const insertBlogSchema = createInsertSchema(blogs);
export const insertEventSchema = createInsertSchema(events);
export const insertProjectSchema = createInsertSchema(projects);

export type Tutorial = typeof tutorials.$inferSelect;
export type Blog = typeof blogs.$inferSelect;
export type Event = typeof events.$inferSelect;
export type Project = typeof projects.$inferSelect;
