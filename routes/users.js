const express = require('express');
const router = express.Router();

/* GET users listing. */
// router.get('/', (req, res, next) => {
//   res.send('respond with a resource');
// });

// router.post('/', (req, res) => {
//     console.log(req.body, 'Here', req.data.username);
//     //res.sendStatus(200);

//     res.json({"Hello": "World"});



//     //res.json({'success':true});

// })

router.get('/', (req, res) => {
  res.json({
    is: 'working'
  })
});

module.exports = router;
