import { createClassDB, deleteClassDB, getClassListDB, updateClassDB } from "../database/connectToDB.js"

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

        // 正規表達式限制hhmm格式
        const regex = /^\d{4}$/
        if(!regex.test(start_time)){
            return res.status(400).json({error: "Invalid start_time format. Must be 'hhmm'"})
        }else if(!regex.test(end_time)){
            return res.status(400).json({ error: "Invalid end_time format. Must be 'hhmm'" })
        }

        //創建課程
        const result = await createClassDB(course_name, description, start_time, end_time, professor_id)
        return res.status(200).send(`Class create successfully. Class ID: ${result}`)
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

        // 正規表達式限制hhmm格式
        const regex = /^\d{4}$/
        if (!regex.test(start_time)) {
            return res.status(400).json({ error: "Invalid start_time format. Must be 'hhmm'" })
        } else if (!regex.test(end_time)) {
            return res.status(400).json({ error: "Invalid end_time format. Must be 'hhmm'" })
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
        const {id} = req.params
        if (!id) return res.status(400).json({ error: "No course ID selected." })
        const result = await deleteClassDB(id)
        if(result > 0) return res.status(200).send("Course delete successfully.")
        return res.status(200).send("No course deleted.")
    }catch(err){
        console.log('Error in deleteClass controller: ', err)
        return res.status(500).json(err)
    }
}