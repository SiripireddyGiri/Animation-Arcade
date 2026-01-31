import * as dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";
import * as fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envTestPath = path.resolve(__dirname, "../../../.env.test");
const envExamplePath = path.resolve(__dirname, "../../../.env.test.example");

if (fs.existsSync(envExamplePath)) {
  dotenv.config({ path: envExamplePath });
}

if (fs.existsSync(envTestPath)) {
  dotenv.config({ path: envTestPath, override: true });
}

const fallback = (val, def) => (val && val.length ? val : def);

export const TEST_USERS = {
  PRIMARY: {
    name: fallback(process.env.TEST_USER_PRIMARY_NAME, "Primary User"),
    email: fallback(process.env.TEST_USER_PRIMARY_EMAIL, "primary@example.com"),
    password: fallback(process.env.TEST_USER_PRIMARY_PASSWORD, "Primary@123"),
  },
  DUPLICATE: {
    name: fallback(process.env.TEST_USER_DUPLICATE_NAME, "Duplicate User"),
    email: fallback(
      process.env.TEST_USER_DUPLICATE_EMAIL,
      "duplicate@example.com",
    ),
    password: fallback(
      process.env.TEST_USER_DUPLICATE_PASSWORD,
      "Duplicate@123",
    ),
  },
  DUPLICATE_ATTEMPT: {
    name: "Duplicate Attempt",
    email: fallback(
      process.env.TEST_USER_DUPLICATE_EMAIL,
      "duplicate@example.com",
    ),
    password: "DifferentPassword@123",
  },
  LOGIN: {
    name: fallback(process.env.TEST_USER_LOGIN_NAME, "Login User"),
    email: fallback(process.env.TEST_USER_LOGIN_EMAIL, "login@example.com"),
    password: fallback(process.env.TEST_USER_LOGIN_PASSWORD, "Login@123"),
  },
  VALID: {
    name: fallback(process.env.TEST_USER_VALID_NAME, "Valid User"),
    email: fallback(process.env.TEST_USER_VALID_EMAIL, "valid@example.com"),
    password: fallback(process.env.TEST_USER_VALID_PASSWORD, "Valid@123"),
  },
  LOGOUT: {
    name: fallback(process.env.TEST_USER_LOGOUT_NAME, "Logout User"),
    email: fallback(process.env.TEST_USER_LOGOUT_EMAIL, "logout@example.com"),
    password: fallback(process.env.TEST_USER_LOGOUT_PASSWORD, "Logout@123"),
  },
};

export const WRONG_PASSWORD = fallback(process.env.WRONG_PASSWORD, "Wrong@123");
