const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const Formation = require('../models/formation');
const router = express.Router();

const fetch = require('node-fetch');

//API Key= 5edd98ce34fbd27acab549e7451bbafcf13f243565ebf20828fdf4625b7e2962

/*https://apifootball.com/api/?action=get_countries&APIkey=xxxxxxxxxxxxxx*/

router.get('/gifs', isLoggedIn, (req, res) => {
    res.render('gifs', { user : req.user});

    console.log(req.body);

});


router.get('/', (req, res) => {
    res.render('index', { user : req.user });
});

router.get('/register', (req, res) => {
    res.render('register', { });
});

router.post('/register', (req, res, next) => {
    Account.register(new Account({ username : req.body.username, name: req.body.name }), req.body.password, (err, account) => {
        if (err) {
            console.log(err);
          return res.render('register', { error : err.message });
        }

        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/jokes');
            });
        });
    });
});


router.post('/profile', isLoggedIn, (req, res) => {
    console.log('PETER');
    console.log(req.user);
    console.log(req.body, 'Here');
    //res.sendStatus(200);
    let user = req.user
    user.bio = 'HEYYYYY'
     //req.user.markModified('bio');
    user.jokes.push(req.body)
    user.save(function(err) {
      console.log('this is err',err)
    });

   res.json({joke: req.body.joke});
  // res.redirect('back');


    //res.json({'success':true});

})

router.post('/jokes', isLoggedIn, (req, res) => {
    console.log('Friday');
   // console.log(req.user);
    console.log(req.body);
    req.user.jokes.forEach(function(jokeObj, index){
        console.log('this is a joke: ', jokeObj, index)
        if( jokeObj.id = req.body.id) {
            req.user.jokes.splice(index, 1);
        }
    })
    req.user.save();
   // Account.remove();
    res.json({'removed':req.body.id})
})


router.get('/profile', isLoggedIn, (req, res) => { 
    
   
        res.render('profile', {user: req.user, animal: 'panda'});      
    
});

router.get('/jokes', isLoggedIn, (req, res) =>{
   // console.log('Jap Maple', req.user.jokes[req.user.jokes.length -1])
    res.render('jokes', {user: req.user, funny: req.user.jokes[req.user.jokes.length -1]});
})



router.get('/login', (req, res) => {
    res.render('login', { user : req.user, error : req.flash('error')});
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res, next) => {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/jokes');
    });
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/ping', (req, res) => {
    res.status(200).send("pong!");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}

module.exports = router;
