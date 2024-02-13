const Application = require("../../models/application")
const Player = require("../../models/player")
const Team = require("../../models/team")


const handleregistration = async (req, res) => {
    const data = req.body;
    const event_name = data.game
    const team_name = data.teamname
    const team_leader = data.teamleader
    const applicant = [data.name, data.email, data.college,data.contact];
    const participants = [];
    


    if (event_name == "Ace") {
        for (let i = 1; i <= 6; i++) {
            const playerdata = await Player.create({
                "name":data[`name${i}`],
                "email":data[`email${i}`],
                "contactNumber":data[`contact${i}`],
                "inGameId":data[`ign${i}`],
                "pfp":data[`pfp${i}`],
                "IdCard":data[`IdCard${i}`],
            })
            participants.push(playerdata)
        }
    }

    else if (event_name == "HotDrop") {
        for (let i = 1; i <= 5; i++) {
            const playerdata = await Player.create({
                "name":data[`name${i}`],
                "email":data[`email${i}`],
                "contactNumber":data[`contact${i}`],
                "inGameId":data[`ign${i}`],
                "pfp":data[`pfp${i}`],
                "IdCard":data[`IdCard${i}`],
            })
            participants.push(playerdata)
        }
    }
    
    const teamdata = await Team.create({
        "name":team_name,
        "teamleader":team_leader,
        "event":event_name,
        "college":applicant[2],
        "players":participants
    })
    
    const applicationdata = await Application.create({
        "name":applicant[0],
        "email":applicant[1],
        "college":applicant[2],
        "contactNumber":applicant[3]
    })


       

    
    
    res.Status(201).json({'Success':`Data Added To All The Collections`});
    
};


module.exports={handleregistration}
