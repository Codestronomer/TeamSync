import mongoose from 'mongoose';
const { Schema } = mongoose;

const teamSchema = Schema({
        teamname: {
                type: String,
                trim: true,
                required: "Team Name is Required"
        },
        description: {
                type: String
        },
        teamMembers: [{
                type: Schema.Types.ObjectId,
                ref: "User"
        }],
        admin: [{
                type: Schema.Types.ObjectId,
                ref: "User"
        }],
        tasks: [{
                type: Schema.Types.ObjectId,
                ref: "Task"
        }]
});

const Team = mongoose.model('Team', teamSchema);

export default Team;