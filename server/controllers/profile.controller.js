// newProfile function for post function
const newProfile = (req, res, next) => {
        res.json({ message: "Post new Profile" });
}

//newProfile function to get profile data
const getProfile = (req, res, next) => {
        res.json({ message: "get Profile data" });
}

export { newProfile, getProfile };