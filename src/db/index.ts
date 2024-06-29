import { drizzle } from "drizzle-orm/postgres-js";
import postgres, { Sql } from "postgres";
import * as schema from "./schema/schema";

let queryClient: Sql<{}>;

if (process.env.NODE_ENV === "production") {
  queryClient = postgres(process.env.DATABASE_URL!);
} else {
  let globalConnection = global as typeof globalThis & {
    queryClient: Sql<{}>;
  };

  if (!globalConnection.queryClient)
    globalConnection.queryClient = postgres(process.env.DATABASE_URL!);

  queryClient = globalConnection.queryClient;
}

const db = drizzle(queryClient, { schema });

export default db;
