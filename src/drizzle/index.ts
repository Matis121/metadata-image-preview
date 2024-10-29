import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "@/drizzle/schema";

export const db = drizzle(process.env.DATABASE_URL!, { schema });