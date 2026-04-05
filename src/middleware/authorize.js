module.exports = (roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};
//ROLE BASED ACCESS CONTROL(RBAC)- It checks if the logged-in user has permission (role) to access a route.