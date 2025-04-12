require('dotenv').config()//מאפשרת לטעון משתני סביבה מקובץ אי אנ וי .
const http=require('http');//יצירת שרת
const port=process.env.PORT || 5050;// את הפורט 5050מספר הפורט שבו השרת יאזין לבקשות הסימן או זה אם הפרוסס נכשל יש גיבוי
const app=require('./app');//טעינת הקובץ 
const srv=http.createServer(app);//העברת האפליקציה כפרמטר כך שהשרת יוכל לטפל בבקשות באמצעות האפליקציה.
srv.listen(port,()=>{
 console.log("server is up");//האזנה לבקשות בפורט שהגדרנו
});