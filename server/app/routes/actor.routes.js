const express=require('express');
const router=express.Router();
const controller=require('../controllers/actor.controller')

router.get('/',controller.findAll);
router.post('/',controller.create);


module.exports=router