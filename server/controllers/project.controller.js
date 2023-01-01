import Project from "../models/project.model.js";

// Create a new project
export const createProject = async (req, res) => {
        try {

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

                const project = await Project.findById(id);
                if (!project) return res.status(404).json({ message: "Project not found!" });
                res.status(200).json({ project });
        } catch (err) {
                res.status(500).json({ error: err.message });
        }
}