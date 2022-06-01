const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var DB = {
  investments: [
    {
      id: 10,
      company: "Petrobras",
      price: 17,
      amount: 2000,
    },
    {
      id: 67,
      company: "Sinqia",
      price: 8,
      amount: 500,
    },
    {
      id: 3,
      company: "Amazon",
      price: 25,
      amount: 3000,
    },
  ],
};

app.get("/investments", (req, res) => {
  res.statusCode = 200;
  res.json(DB.investments);
});

app.get("/investment/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);

    var investment = DB.investments.find((g) => g.id == id);

    if (investment != undefined) {
      res.statusCode = 200;
      res.json(investment);
    } else {
      res.sendStatus(404);
    }
  }
});

app.post("/investment", (req, res) => {

  var { company, price, amount } = req.body;

  DB.investments.push({
    id: 2323,
    company,
    price,
    amount,
  });
  res.sendStatus(200);
});

app.delete("/investment/:id", (req,res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
      } else {
        var id = parseInt(req.params.id);
    
        var index = DB.investments.findIndex(g => g.id == id);

        if(index == -1){
            res.sendStatus(404)
        }
        else{
            DB.investments.splice(index,1);
            res.sendStatus(200)
        }
      }

})

app.put("/investment/:id", (req,res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
      } else {
        var id = parseInt(req.params.id);
    
        var investment = DB.investments.find((g) => g.id == id);
    
        if (investment != undefined) {
            var { company, price, amount } = req.body;
            
            if(company != undefined){
                investment.company = company;
            }
            if(price != undefined){
                investment.price = price;
            }
            if(amount != undefined){
                investment.amount = amount;
            }

            res.sendStatus(200)

        } else {
          res.sendStatus(404);
        }
      }
})
app.listen(45678, () => {
  console.log("API RODANDO!");
});
