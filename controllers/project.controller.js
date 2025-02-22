const { Project } = require("../models/project.model")
const Joi = require("joi")
// const { User } = require("../models/User.model")


// const ProjectJoiSchema = {
//     createProject: Joi.object().keys({
//         name: Joi.string().required(),
//         description: Joi.string(),
//         date_created: Joi.date(),
//         category: Joi.string().required(),
//         price: Joi.number().required(),
//     })
// }


exports.addUser = async (req, res, next) => {
    console.log("success from addUser");
    const projectId = req.query.projectId;
    const userId = req.query.userId;

    try {
        const project = await Project.findOne({ id: projectId });
        if (project.admin != res.locals.userId) {
            return res.status(400).json({ error: 'Only admin can add users to the project' });
        }
        if (project.admin == userId) { // 2 and not 3 equals cheks if the value is the same even if the types are not the same
            return res.status(400).json({ error: 'Admin cannot be a user' });
        }
        if (project.users.includes(userId)) {
            return res.status(400).json({ error: 'User already exists in the project' });
        }
        project.users.push(userId);
        await project.save();

        res.status(201).send(project);
    } catch (error) {
        next(error);
    }
}

exports.removeUser = async (req, res, next) => {
    console.log("success from removeUser");
    const projectId = req.query.projectId;
    const userId = req.query.userId;
   
    try {
        const project = await Project.findOne({ id: projectId });
        if (project.admin != res.locals.userId) {
            return res.status(400).json({ error: 'Only admin can remove users from the project' });
        }
        const userIndex = project.users.indexOf(userId);
        project.users.splice(userIndex, 1);
        await project.save();

        res.status(201).send(project);
    } catch (error) {
        next(error);
    }
}
exports.addTask = async (req, res, next) => {
    console.log("success from addTask");
    const projectId = req.query.projectId;
    const taskId = req.query.taskId;

    try {
        const project = await Project.findOne({ id: projectId });
        if (project.admin != res.locals.userId) {
            return res.status(400).json({ error: 'Only admin can add tasks to the project' });
        }
        if (project.users.includes(userId)) {
            return res.status(400).json({ error: 'User already exists in the project' });
        }
        project.users.push(userId);
        await project.save();

        res.status(201).send(project);
    } catch (error) {
        next(error);
    }
}

exports.removeTask = async (req, res, next) => {
    console.log("success from removeUser");
    const projectId = req.query.projectId;
    const userId = req.query.userId;
   
    try {
        const project = await Project.findOne({ id: projectId });
        if (project.admin != res.locals.userId) {
            return res.status(400).json({ error: 'Only admin can remove users from the project' });
        }
        const userIndex = project.users.indexOf(userId);
        project.users.splice(userIndex, 1);
        await project.save();

        res.status(201).send(project);
    } catch (error) {
        next(error);
    }
}

exports.editTask = async (req, res, next) => {
    console.log("success from removeUser");
    const projectId = req.query.projectId;
    const userId = req.query.userId;
   
    try {
        const project = await Project.findOne({ id: projectId });
        if (project.admin != res.locals.userId) {
            return res.status(400).json({ error: 'Only admin can remove users from the project' });
        }
        const userIndex = project.users.indexOf(userId);
        project.users.splice(userIndex, 1);
        await project.save();

        res.status(201).send(project);
    } catch (error) {
        next(error);
    }
}

// exports.search = async (req, res, next) => {
//     console.log("success from search");
//     const page = req.query.page;
//     const s = req.query.s;
//     const perPage = 2;
//     const skip = (page - 1) * perPage;


//     try {
//         const Projects = await Project.find({ $or: [{ name: s }, { info: s }] })
//             .skip(skip).limit(perPage);
//         res.send(Projects)
//     } catch (error) {
//         next(error);
//     }
// }

// exports.getProjectByCategory = async (req, res, next) => {
//     console.log("success from getProjectByCategory");
//     const cat = req.params.catname;
//     console.log(cat);
//     try {
//         const Projects = await Project.find({ "category": cat });
//         res.send(Projects);
//     } catch (error) {
//         next(error);
//     }
// }

exports.createProject = async (req, res, next) => {
    console.log("success from createProject");
    const body = req.body;
    try {
        // const validate = ProjectJoiSchema.createProject.validate(body);
        // console.log("validate: ", validate);
        // if (validate.error) {
        //     next(Error(validate.error));
        // }
        const newProject = new Project(body);
        newProject.id = newProject._id;
        // newProject.id_user=res.locals.userId;
        newProject.admin = res.locals.userId;

        await newProject.save();
        return res.status(201).send(newProject)
    } catch (error) {
        next(error)
    }
}

exports.editProject = async (req, res, next) => {
    console.log("success from editProject");
    const id = req.params.id;
    console.log(id);
    const body = req.body
    try {
        const project = await Project.findOne({ id });
        if (project.admin != res.locals.userId) {
            return res.status(400).json({ error: 'Only admin can edit the project' });
        }
        await Project.updateOne({ id }, body);
        res.status(201).send("update Project");
    } catch (error) {
        next(error);
    }
}

exports.deleteProject = async (req, res, next) => {
    console.log("success from deleteProject");


    try {
        const id = req.params.id;
        const project = await Project.findOne({ id });
        if (project.admin != res.locals.userId) {
            return res.status(400).json({ error: 'Only admin can delete a project' });
        }
        await Project.deleteOne({ id });
        res.status(200).send("deleted");
    } catch (error) {
        next(error);
    };
}

exports.findProjectByIdReturnTasks = async (req, res, next) => {
    console.log("success from findProjectByIdReturnTasks");
    const id = req.params.id;
    console.log(id);
    try {
        const Project = await Project.findOne({ "id": id });
        res.send(Project);
    } catch (error) {
        next(error);
    }
}

exports.findProjectByIdReturnUsers = async (req, res, next) => {
    console.log("success from findProjectByIdReturnUsers");
    const id = req.params.id;
    console.log(id);
    try {
        const Project = await Project.findOne({ "id": id });
        console.log(Project.users);
        res.send(Project);
    } catch (error) {
        next(error);
    }
}