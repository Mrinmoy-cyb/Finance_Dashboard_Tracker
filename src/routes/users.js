const router = require("express").Router();
const prisma = require("../prisma");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

// GET all users (Admin only)
router.get("/", auth, authorize(["ADMIN"]), async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, isActive: true }
  });
  res.json(users);
});

// UPDATE user (role / status)
router.put("/:id", auth, authorize(["ADMIN"]), async (req, res) => {
  const { role, isActive } = req.body;

  const user = await prisma.user.update({
    where: { id: Number(req.params.id) },
    data: { role, isActive }
  });

  res.json(user);
});

// DELETE user
router.delete("/:id", auth, authorize(["ADMIN"]), async (req, res) => {
  await prisma.user.delete({
    where: { id: Number(req.params.id) }
  });

  res.json({ message: "User deleted" });
});

module.exports = router;