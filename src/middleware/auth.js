const jwt = require("jsonwebtoken");
const prisma = require("../prisma");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secret");

    // fetch fresh user from DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });

    // check if user exists + active
    if (!user || !user.isActive) {
      return res.status(403).json({ error: "User inactive or not found" });
    }

    req.user = user; // always attach fresh DB user
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};