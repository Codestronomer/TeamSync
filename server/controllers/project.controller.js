import Project from "../models/project.model.js";

// Create a new project
export const createProject = async (req, res) => {
        try {

                if (req.body === undefined) {
                        return res.status(400).send();
                }
                let { title, description, creator } = req.body;

                const newProject = new Project({
                        title,
                        description,
                        creator
                });

                const savedProject = await newProject.save();
                res.status(201).json(savedProject)
        } catch (err) {
                res.status(500).json({ error: err.message });
        }
}

// get an existing project
export const getProject = async (req, res) => {
        try {
                const { id } = req.params;

                // if id not in request object
                if (!id) return res.status(400).json({ msg: "id not found in request" })

                // get a project
                const project = await Project.findById(id);

                // if project with the above if not found
                if (!project) return res.status(404).json({ message: "Project not found!" });

                // return found project
                res.status(200).json({ project });
        } catch (err) {
                res.status(500).json({ error: err.message });
        }
}

export const getProjects = async (req, res) => {
        try {
                // if the request body doesn't contain the appriopriate data
                if (req.body == undefined) return res.status(500).json({ error: "Bad Request" })
                const { userId } = req.body;

                const projects = Project.find({ creator: userId })
                res.status(200).json(projects);
        } catch (err) {
                res.status(500).json({ error: err.message });
        }
}

export const updateProject = async (req, res) => {
        try {
                if (req.body == undefined) return res.status(500).json({ error: "Bad Request" })
                const { userId } = req.body;

                const projects = Project.find({ creator: userId })
                res.status(200).json(projects);
        } catch (err) {
                res.status(500).json({ error: err.message });
        }

}

export const deleteProject = async (req, res) => {
        try {
                const { id } = req.params;

                await Project.findByIdAndDelete(id);
                res.status(201).json({ msg: "Message deleted" });
        } catch (err) {
                res.status(500).json({ error: err.message })
        }
}