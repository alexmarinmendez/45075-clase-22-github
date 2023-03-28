import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.get('/', async(req, res) => {
    res.render('index')
})

router.get('/login', async(req, res) => {
    res.render('login')
})

router.get('/github', passport.authenticate('github', { scope: ['user: email']}), (req, res) => {

})

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login'}), async (req, res) => {
    console.log("Callback: ", req.user)
    req.session.user = req.user
    console.log("User session: ", req.session.user)
    res.redirect('/')
})

router.get('/logout', function(req, res) {
    req.logout(function(err) {
      if (err) { return res.send('LOGOUT not SUCCESSFULLY'); }
      res.redirect('/api/session/login');
    });
  });


export default router