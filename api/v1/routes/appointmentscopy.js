const router=require('express').Router();//מאפשר להגדיר נתבים 
const {GetAll,get}=require('../controllers/appointmentnew')//מייבא את הפונקציות מה

router.get('/',GetAll);//שליפת כל הפגישות 


module.exports=router;