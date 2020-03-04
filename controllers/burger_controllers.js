var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function (req, res) {
   burger.selectAll(function (data) {
      let burgerObj= {
byrger: data
      };
      console.log(burgerObj);
      res.render("index", burgerObj);
    })
  });

router.post("/api/burgers")
outer.post("/api/burgers", function (req, res) {
  burger.insertOne(req.body.name, function (result) {
      res.json({ id: result.insertId });
  })
});

router.put("/api/burgers/:id", function (req, res) {
  let condition = `id=${req.params.id}`;
  console.log(`Condition: ${condition}`);

  burger.updateOne("devoured=true", condition, function (result) {
      if (result.changedRows === 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
      }
      res.status(200).end();
  })
});


// Export routes for server.js to use.
module.exports = router;


