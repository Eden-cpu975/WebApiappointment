const { pid } = require('process');
const appointmentsModel=require('../models/appointments');
module.exports={
    GetAll:(req,res)=>{
        try{
            appointmentsModel.find().then((appointments)=>{
                console.log(appointments);
                //return res.status(200).json(appointments)
                let str=" ";
                for(let i=0;i<appointments.length;i++)
                    str+=`<h1> appointment:  ${appointments[i].clientName}</h1>`;
                return res.status(200).send(str);
            });
        }
        catch
        {
            return res.status(500).json({msg:"500 Server Error"});
        }
    },
    GetById:(req,res)=>{
        try{
            appointmentsModel.find({_id:req.params.id}).then((appointments)=>{
            return res.status(200).json(appointments);
        });
    }
        catch
        {
            return res.status(500).json({msg:"500 Server Error"});
        }
    },
    AddNew:(req,res)=>{//post
        try{
            appointmentsModel.insertMany([req.body]).then((data)=>{
                return res.status(200).json(data);
            });
        }
        catch
        {
            return res.status(500).json({msg:"500 Server Error"});
        }
    },
    Update:(req,res)=>{//put
        try{
            appointmentsModel.updateOne({ _id:req.params.id},req.body).then((data)=>{
                return res.status(200).json(data);
            });
        }
        catch
        {
            return res.status(500).json({msg:"500 Server Error"});
        }
    },
    Delete: (req, res) => {
        try {
            appointmentsModel.deleteOne({_id:req.params.id}).then((data)=>{
                return res.status(200).json(data);
            });
        } catch {
            return res.status(500).json({ msg: "500 Server Error" });
        }
    }
}








