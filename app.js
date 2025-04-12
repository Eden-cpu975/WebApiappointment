const express=require('express');//טעינת הספרייה
const app=express();//מופע של האפליקציה
const morgan=require('morgan');//טעינת הספרייה שמשמשת לרישום בקשות http 
const   { engine } =require('express-handlebars');//קישור לספרייה
const mongoose=require('mongoose');//קישור לספרייה
//const jwt=require('jsonwebtoken');
const appointmentRouter =require('./api/v1/routes/appointments');//טעינת ניתובים מקובץ אחר
const userRouter=require('./api/v1/routes/user');
const auth=require('./api/v1/middlewares/auth');//ייבוא של שכבת האבטחה
const { partials } = require('handlebars');
app.use(morgan('dev'));//הוספת morgan כmiddlewars כדי לרשום בקשות HTTP
app.use(express.json());//מוסיף middleware שמנתח בקשות JSON.
app.use(express.urlencoded());//מוסיף middleware שמנתח בקשות URL-encoded 
//app.use(auth);//הוספת שכבת האבטחה ברמת המערכת ,כל המערכת חייבת אימות
//יצירת שכבה לצורך אימות משתמשים מחוברים
app.set('views',__dirname+ '/api/v1/views');//הגדרת הנתיב לתיקייה בה ייישמרו תבניות התצוגה שלנו
//פרוסס-משתנה שמייצג את האפליקציה .אי אן וי-תפנה לאובייקט שמחזיק את המשתנה סביבה 
const mongoConnstr=`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@ecom.tyino.mongodb.net/WebApi2025`;//מחרוזת חיבור לבסיס נתונים 

mongoose.connect(mongoConnstr).then(()=>{
    console.log('Connected To Mongo');
})//רק אחרי שהפונק מסתיימת אני הולך לדאן .

app.engine('hbs',engine({
    extname:'hbs',//סיומת הקבצים השייכים למערכת התבניות
    defaultview:'index',//תצוגת ברירת מחדל שתוצג במידה ולא ציינו שם תצוגה
    layoutsDir:__dirname +'./api/v1/views/layouts',// נתיב לתיקיית תבניות התצוגה,מעטפת 
    partialsDir:__dirname +'./api/v1/views/partials'//קומפוננטות תצוגה,יחידות תצוגה עצמאיות ומשתנות
}));
app.set('view engine','hbs');//הגדרת מנוע התצוגה הפעיל
app.use(express.static('public'));//דפים שלא עוברים עיבוד בצד השרת 


app.use('/appointments',appointmentRouter);//הוספת הניתובים עבור הפגישות  תחת הנתיב
app.use('/user',userRouter);
app.all('*',(req,res)=>{
 //מוסיף middleware שמטפל בכל הבקשות שלא תואמות לניתובים אחרים ומחזיר הודעת שגיאה
    return res.status(404).json({Msg:"Not Found 404"});
});


module.exports=app;//מייצא את אפליקציית Express כדי שניתן יהיה להשתמש בה במודולים אחרים