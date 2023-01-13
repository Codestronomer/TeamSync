import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
        {
                firstName: {
                        type: String,
                        required: true,
                        min: 2,
                        max: 50,
                },
                lastName: {
                        type: String,
                        required: true,
                        min: 2,
                        max: 50
                },
                email: {
                        type: String,
                        required: true,
                        max: 50,
                        unique: true,
                },
                password: {
                        type: String,
                        required: true,
                        min: 5,
                },
                picturePath: {
                        type: String,
                        default: "",
                },
                role: {
                        type: String,
                        enum: ["user", "admin", "superadmin"],
                        default: "admin"
                },
                occupation: {
                        type: String,
                        required: true
                },
                position: String,
                location: String,
        },
        { timestamps: true }
);

const user = mongoose.model("User", userSchema)

export default user;