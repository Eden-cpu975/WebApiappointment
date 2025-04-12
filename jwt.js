 require('dotenv').config();
 const jwt=require('jsonwebtoken');
 const privateKey=process.env.PRIVATE_KEY;

const token=jwt.sign({userName:"Eden2412@gmail.com"},privateKey,{expiresIn:'1h'});//הצפנה של כתובת המייל והמשתנה השני זה מפתח כדי לפענח 
 console.log(token);
 const fakekey="sdfsff"
 try {
     const obj=jwt.verify(token,fakekey);//אם תקין אשלח לך את המידע המוצפן בobj 
      console.log(obj);
  }
  catch(e)
 {
      console.log(e.message)// ותדפיס את ההודעה הלא נכונה invalid .אם לא תקין   התוכנה תמשיך לעבוד 
}