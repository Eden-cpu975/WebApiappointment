const router=require('express').Router();//יצירת אובייקט ראוטר 
const bcrypt=require('bcrypt');//חיבור לספרייה
const jwt=require('jsonwebtoken');
const userModel=require('../models/user')//חיבור כדי לעבוד מול בסיס הנתונים
router.post('/login',(req,res)=>{
    const {userName,pass}=req.body;//מגדיר אובייקט שמקבל את הבאדי
    userModel.find({userName}).then((data)=>{//חיפוש משתמש עם שם המשתמש שקיבלנו //usermodel-טבלה שבה כל המשתמשים . data-לשם מחזירים את התשובה ממה שחיפשנו 
        if(data.length==0)//  ואין צורך לבצע הרשמה אם גדול מ0 המשתמש כבר קיים
            return res.status(200).json({msg:"User / Pass Not Found"});
        const hashPass=data[0].pass;//לוקח את הסיסמה שהיא לא מוצפנת ומשווה להש הסיסמה המוצפנת ובודק אם הן תואמות 
        bcrypt.compare(pass,hashPass).then((ans)=>{
            if(ans)
            {//הטוקן=מכיל פרטים אודות המשתמש כמו כתובת מייל או שם משתמש והוא ישמור את המידע אודות המשתמש
                const token=jwt.sign({userName},"abcd1234",{expiresIn:'1h'});//נצפין את המייל של המשתמש,נקבל טוקן ונחזיר אותו בתשובה
                return res.status(200).json({msg:"login Succefully",token});
            }
        else
        return res.status(200).json({msg:"User / Pass Not Found"});
        });
    });//נחפש משתמש עם שם המשתמש שהוזן 
});//נקודת קצה עבור התחברות

router.post('/signup',(req,res)=>{
//נקבל את פרטי המשתמש לרישום 
//נצפין את הסיסמה
//נשמור את פרטי המשתמש בבסיס נתונים
// const xxBody={
//     userName:"Eden2412@gmail.com",
//     pass:"123",
//     fullName:"Eden Tasama"
// };
const rounds=10;//הגדרת ערךעבור מספר סבביי יצירת האקראיות בהצפנה
const {userName,pass,fullName}=req.body;
userModel.find({userName}).then((data)=>{
    if(data.length>0)
        return res.status(200).json({msg:"User Already exist "});
})
bcrypt.hash(pass,rounds,(err,hashString)=>{

if(err){//במקרה של שגיאה נחזיר הודעת שגיאה מתאימה
    return res.status(500).json({msg:err.message});
}
 else{
    userModel.insertMany([{userName,pass:hashString,fullName}]).then((data)=>{
        return res.status(200).json(data);
    });
 }
 });
});//נקודת קצה עבור הרשמה



module.exports=router;