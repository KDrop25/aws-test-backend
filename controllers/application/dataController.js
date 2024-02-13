const Player = require('../../models/player');

const getAllPlayers = async (req, res) => {
    const players = await Player.find();
    if (!players) return res.status(204).json({ 'message': 'No players found' });
    res.json(players);
}

const deletePlayer = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'Player ID required' });
    const player = await Player.findOne({ _id: req.body.id }).exec();
    if (!player) {
        return res.status(204).json({ 'message': `Player ID ${req.body.id} not found` });
    }
    const result = await player.deleteOne({ _id: req.body.id });
    res.json(result);
}







const getPlayer = async (req, res) => {
    if (!req?.params?.barcode) return res.status(400).json({ "message": 'Player Barcode required' });
    console.log(req.params.barcode)
    const player = await Player.findOne({ barcode: req.params.barcode }).exec();
    console.log(player)
    if (!player) {
        return res.status(204).json({ 'message': `Player Barcode ${req.params.barcode} not found` });
    }
    
    res.json(player);
}











// const updatePlayer = async (req,res) => {
//     if (!req?.params?.email) return res.status(400).json({"message":"Email Id required"});
    
//     const player = await Player.findOne({email:req.params.email}).exec();
//     if(!player){
//         return res.status(204).json({ 'message': `Player ID ${req.params.email} not found` });
//     }
//     if (req.body?.firstname) player.firstname = req.body.firstname;
//     if (req.body?.lastname) player.lastname = req.body.lastname;
//     if (req.body?.schoolname) player.schoolname = req.body.schoolname;
//     if (req.body?.stdCode) player.stdcode = req.body.stdCode;
//     if (req.body?.mobileNumber) player.mobilenumber = req.body.mobileNumber;
//     if (req.body?.whatsmobileNumber) player.whatsmobilenumber = req.body.whatsmobileNumber;
//     if (req.body?.altmobileNumber) player.altmobilenumber = req.body.altmobileNumber;
//     if (req.body?.playerclass) player.class = req.body.playerclass;
//     if (req.file) player.profilepicture = req.file.filename;
    

//     const result = await player.save();
//     res.json(result);
// }











module.exports = {
    getAllPlayers,
    deletePlayer,
    getPlayer,
}