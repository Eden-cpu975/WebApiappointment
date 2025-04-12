const router=require('express').Router();//מאפשר להגדיר נתבים 
const {GetAll,GetById,AddNew,Update,Delete}=require('../controllers/appointments')//מייבא את הפונקציות מה

router.get('/',GetAll);//שליפת כל הפגישות 

// שליפת פגישה לפי מזהה (ID)
router.get('/:id', GetById);

// יצירת פגישה חדשה
router.post('/', AddNew);

// עדכון פגישה לפי מזהה (ID)
router.put('/:id', Update);

// מחיקת פגישה לפי מזהה (ID)
router.delete('/:id',Delete);


module.exports=router;