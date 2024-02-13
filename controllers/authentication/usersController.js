const User = require('../../models/User');

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

const deleteUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
    }
    const result = await user.deleteOne({ _id: req.body.id });
    res.json(result);
}



const updateUser = async (req,res) => {
    if (!req?.params?.email) return res.status(400).json({"message":"Email Id required"});
    
    const user = await User.findOne({email:req.params.email}).exec();
    if(!user){
        return res.status(204).json({ 'message': `User ID ${req.params.email} not found` });
    }
    if (req.body?.firstname) user.firstname = req.body.firstname;
    if (req.body?.lastname) user.lastname = req.body.lastname;
    if (req.body?.schoolname) user.schoolname = req.body.schoolname;
    if (req.body?.stdCode) user.stdcode = req.body.stdCode;
    if (req.body?.mobileNumber) user.mobilenumber = req.body.mobileNumber;
    if (req.body?.whatsmobileNumber) user.whatsmobilenumber = req.body.whatsmobileNumber;
    if (req.body?.altmobileNumber) user.altmobilenumber = req.body.altmobileNumber;
    if (req.body?.userclass) user.class = req.body.userclass;
    if (req.file) user.profilepicture = req.file.filename;
    

    const result = await user.save();
    res.json(result);
}



const getUser = async (req, res) => {
    if (!req?.params?.email) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ email: req.params.email }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.email} not found` });
    }
    res.json(user);
}

module.exports = {
    getAllUsers,
    deleteUser,
    getUser,
    updateUser
}