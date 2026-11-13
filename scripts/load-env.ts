/**
 * Load local credentials for maintenance scripts without requiring them in source.
 * Priority: .env.import.local, .env.local, then .env. Existing shell variables win.
 */
import { config } from "dotenv";

config({ path: [".env.import.local", ".env.local", ".env"] });
