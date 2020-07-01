import mongoose from "mongoose";
require('../model/stu_reg')
const Student = mongoose.model('Stud_Reg')


class student{ 

    //for dispay studentdata in admin panel
    getData(req, res){
        Student.find((err, docs) => {
            if (!err) {
                res.render("admin/student_data", {
                    list: docs
                });
            }
            else {
                console.log('Error in retrieving Student data :' + err);
            }
        }).lean();
    }


}

module.exports = student