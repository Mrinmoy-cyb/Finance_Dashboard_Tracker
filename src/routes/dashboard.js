const router = require("express").Router();
const prisma= require("../prisma");
const auth = require("../middleware/auth");
const authorize= require("../middleware/authorize");

router.get("/summary", auth ,authorize(["VIEWER", "ANALYST", "ADMIN"]) , async(req , res) =>{
    const income= await prisma.financialRecord.aggregate({
        _sum: { amount : true },
        where:{ type: "income" , userId: req.user.id }
    });

    const expense= await prisma.financialRecord.aggregate({
        _sum :{ amount: true},
        where :{type: "expense" ,  userId: req.user.id}
    });
    res.json({
        totalIncome: income._sum.amount || 0,
        totalExpense: expense._sum.amount || 0,
        net: (income._sum.amount || 0)- (expense._sum.amount || 0)
    });
});

router.get("/category" , auth , authorize(["ANALYST", "ADMIN"]),  async( req , res )=> {
    const data = await prisma.financialRecord. groupBy({
        by :["category"], _sum: { amount : true }
    });
res.json(data);
});

router.get("/recent", auth, authorize(["ANALYST", "ADMIN", "VIEWER"]), async(req , res) => {
    const data= await prisma.financialRecord.findMany({
        take: 5,
        orderBy: {date: desc }
    });

    res.json({success : true, data})
});

module.exports = router;