const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().min(1, "Name required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be 6+ chars"),
  role: z.enum(["VIEWER", "ANALYST", "ADMIN"])
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

module.exports = { registerSchema, loginSchema };