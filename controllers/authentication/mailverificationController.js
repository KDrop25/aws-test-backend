const VerifyEmail = async(req,res) => {
    try{
        const verified = await User.updateOne({_id:req.query.id},{$set:{is_verified:1}});
        res.render("email-verified");
    }catch(error){
        console.log(error.message)
    }
}

module.exports = {VerifyEmail};