const router = require("express").Router();
const prisma= require("../prisma");
const auth = require("../middleware/auth");

router.get("/summary", auth , async(req , res ) =>{
    const income= await prisma.financialRecord.aggregate({
        _sum: { amount : true },
        where:{ type: "income" }
    });

    const expense= await prisma.financialRecord.aggregate({
        _sum :{ amount: true},
        where :{type: "expense"}
    });
    res.json({
        totalIncome: income._sum.amount || 0,
        totalExpense: expense._sum.amount || 0,
        net: (income._sum.amount || 0)- (expense._sum.amount || 0)
    });
});

router.get("/category" , auth , async( req , res )=> {
    const data = await prisma.financialRecord.groupBy({
        by :["category"], 
        _sum: { amount : true }
    });
    res.json(data);
});

module.exports = router;
