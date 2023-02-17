const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../lib/auth')
const pool = require('../database')

/* GET users listing. */


router.get('/add',isLoggedIn,(req,res)=>{
  res.render('links/add')
})

router.post('/add',isLoggedIn, async (req,res)=>{
   const {title,url,description} =req.body
  const newLink={
    title,url,description, user_id: req.user.id
  }
  await pool.query('INSERT INTO links SET ?', [newLink])
  // res.send('Recibido')
  req.flash('success','Link saved successfully')
  // console.log(req.body)
  res.redirect('/links')
})

router.get('/', isLoggedIn,async (req, res, next) => {
  const [links] = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id])
  // res.json(links)
  console.log(links)
  // res.send('Lista de links')
  res.render('links/list', {links})
});

router.get('/delete/:id', isLoggedIn, async (req,res) => {

  const {id} = req.params
  await pool.query('DELETE FROM links WHERE id = ?',[id])
  res.redirect('/links')

})

router.get('/edit/:id', isLoggedIn, async (req,res) => {
  const {id} = req.params
  const [link] = await pool.query('SELECT * FROM links WHERE id = ?',[id])
  console.log(link)
  res.render('links/edit', {link: link[0]})


})

router.post('/edit/:id', isLoggedIn, async (req,res) => {
  const {id} = req.params
  const {title,url,description}=req.body
  const newLink={
    title,url,description
  }
  const [link] = await pool.query('UPDATE links set ? WHERE id = ?',[newLink, id])
  console.log(link)
  res.redirect('/links')


})
module.exports = router;
