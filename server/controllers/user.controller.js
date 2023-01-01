import User from '../models/user.model.js';

// newProfile function for post function
const newProfile = (req, res, next) => {
        res.json({ message: "Post new Profile" });
}

//get User data
const getUser = async (req, res) => {
        try {
                const { id } = req.params;
                const user = await User.findById(id);
                if (!user) return res.status(404).json({ message: "User not found." })
                user.password = ""
                res.status(200).json(user);
        } catch (err) {
                res.status(500).json({ error: err.message })
        }
}

export { newProfile, getUser };