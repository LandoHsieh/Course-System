import { createClassDB, getClassListDB, updateClassDB } from "../database/connectToDB.js"

export const getClassList = async (req, res) => {
    try {
        const classList = await getClassListDB()
        console.log("Get class list successfully.")
        return res.status(200).json(classList)
    }catch(err){
        console.log('Error in getClassList controller: ', err)
        return res.status(500).json({error: "Internal Server Error."})
    }
}

export const createClass = async (req, res) => {
    try {
        const { course_name, description, start_time, end_time, professor_id } = req.body
        if(!course_name || !description || !start_time || !end_time || !professor_id){
            return res.status(400).json({error: "Incomplete information."})
        }
        const result = await createClassDB(course_name, description, start_time, end_time, professor_id)
        return res.status(200).send("Class create successfully.")
    }catch(err){
        console.log('Error in createClass controller: ', err)
        return res.status(500).json({ Error: "This professor ID doesn't exists"})
    }
}

export const updateClass = async (req, res) => {
    try {
        const {course_id, course_name, description, start_time, end_time, professor_id} = req.body
        if (!course_name || !description || !start_time || !end_time || !professor_id) {
            return res.status(400).json({ error: "Incomplete information." })
        }
        const result = await updateClassDB(course_id, course_name, description, start_time, end_time, professor_id)
        return res.status(200).send("Class update successfully.")
    }catch(err) {
        console.log('Error in updateClass controller: ', err)
        return res.status(500).json({ Error: "This course ID doesn't exists." })
    }
}

export const deleteClass = async (req, res) => {
    try {
        
    }catch(err){

    }
}