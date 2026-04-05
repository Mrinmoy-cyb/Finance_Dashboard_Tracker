module.exports =(roles) => (req, res, next) => {
    if(!roles.includes(req.user.role)) {
        return  res.status(403).send("Forbidden");
    }
    next();
};

//ROLE BASED ACCESS CONTROL(RBAC)- It checks if the logged-in user has permission (role) to access a route.