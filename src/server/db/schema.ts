import { relations, sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  index,
  int,
  mysqlEnum,
  mysqlTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `location_explorer_${name}`);

export const difficultyEnum = mysqlEnum("difficulty", ["easy", "medium", "hard"]);

export const locations = mysqlTable(
  "location",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }),
    lat: int("lat"),
    lng: int("lng"),
    description: text("description"),
    rating: int("rating"),
    createdById: varchar("createdById", { length: 255 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),

    // recommendations
    public_transport_accessibility: int("public_transport_accessibility"),
    parking_accessibility: int("parking_accessibility"),
    cost: int("cost"),
    difficulty: difficultyEnum,
    recommended_in_the_summer: boolean("recommended_in_the_summer"),
    recommended_in_the_winter: boolean("recommended_in_the_winter"),
    recommended_in_the_spring: boolean("recommended_in_the_spring"),
    recommended_in_the_fall: boolean("recommended_in_the_fall"),

  },
  (location) => ({
    createdByIdIdx: index("createdById_idx").on(location.createdById),
    nameIndex: index("name_idx").on(location.name),
  })
);

export const comments = mysqlTable(
  "comment",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }),
    description: text("description"),
    rating: int("rating"),
    createdById: varchar("createdById", { length: 255 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),

  },
  (comment) => ({
    createdByIdIdx: index("createdById_idx").on(comment.createdById),
    nameIndex: index("name_idx").on(comment.name),
  })
);

export const location_images = mysqlTable(
  "location_image",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    description: text("description"),
    rating: int("rating"),
    sourceURL: varchar("sourceURL", { length: 255 }),

    locationId: bigint("id", { mode: "number" }),
    createdById: varchar("createdById", { length: 255 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),

  },
  (location_image) => ({
    createdByIdIdx: index("createdById_idx").on(location_image.createdById),
  })
);

export const reviews = mysqlTable(
  "review",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    text: text("text"),
    rating: int("rating"), // 1-5
    
    locationId: bigint("id", { mode: "number" }),
    createdById: varchar("createdById", { length: 255 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),

  },
  (review) => ({
    createdByIdIdx: index("createdById_idx").on(review.createdById),
  })
);


export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar("image", { length: 255 }),
});

export const location_imagesRelations = relations(location_images, ({ one, many }) => ({
  locations: one(locations, { fields: [location_images.locationId], references: [locations.id] }),
  reviews: many(reviews),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  locations: one(locations, { fields: [reviews.locationId], references: [locations.id] }),
  user: one(users, { fields: [reviews.createdById], references: [users.id] }),
}));

export const tags = mysqlTable("tag", {
  name: varchar("name", { length: 255 }).notNull().primaryKey(),
  createdById: varchar("createdById", { length: 255 }).notNull(),
});

export const tags_locations_map = mysqlTable("tags_locations_map", {
  tagName: varchar("tagName", { length: 255 }).notNull(),
  locationId: varchar("locationId", { length: 255 }).notNull(),
});

export const tagRelations = relations(tags, ({ one, many }) => ({
  tags_locations_map: many(tags_locations_map),
  createdBy: one(users, { fields: [tags.createdById], references: [users.id] }),
}));

export const tags_locations_mapRelations = relations(tags_locations_map, ({ one }) => ({
  tag: one(tags, { fields: [tags_locations_map.tagName], references: [tags.name] }),
  location: one(locations, { fields: [tags_locations_map.locationId], references: [locations.id] }),
}));

export const locationsRelations = relations(locations, ({ many, one }) => ({
  images: many(location_images),
  comments: many(comments),
  tags: many(tags_locations_map),
  createdBy: one(users, { fields: [locations.createdById], references: [users.id] }),
}));

export const commentsRelations = relations(comments, ({ many, one }) => ({
  comments: many(comments),
  createdBy: one(users, { fields: [comments.createdById], references: [users.id] }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  locations: many(locations),
  comments: many(comments),
  reviews: many(reviews),
  location_images: many(location_images),
}));

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index("userId_idx").on(account.userId),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = mysqlTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("userId_idx").on(session.userId),
  })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);
