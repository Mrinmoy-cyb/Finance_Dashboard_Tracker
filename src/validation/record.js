const { z } = require("zod");

const recordSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  type: z.enum(["income", "expense"]),
  category: z.string().min(1, "Category required"),
  date: z.string(),
  note: z.string().optional()
});

module.exports = recordSchema;