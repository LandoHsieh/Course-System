import { createProfessorDB, getClassStudentListDB, getProfessorClassListDB, getProfessorListDB } from "../database/connectToDB.js"

export const getProfessorList = async (req, res) => {
    try {
        console.log("Get professor list successfully.")
        const professorList = await getProfessorListDB()
        return res.status(200).json(professorList)
    }catch(err){
        console.log("Error in getProfessorList controller: ", err)
        return res.status(500).json({error: "Internal Server Error."})
    }
}

export const getProfessorClassList = async (req, res) => {
    const name = req.query.name
    try{
        const classList = await getProfessorClassListDB(name)
        return res.status(200).json(classList)
    }catch(err){
        console.log("Error in getProfessorClassList controller: ", err)
        return res.status(500).json({error: "Internal Server Error."})
    }
}

export const createProfessor = async (req, res) => {
    try {
        const { name, email } = req.body
        if(!name){
            return res.status(400).send('No professor name.')
        }else if(!email){
            return res.status(400).send('No professor email.')
        }
        const result = await createProfessorDB(name, email)
        return res.status(200).send(`Professor create successfully. Professor ID: ${result}`)
    }catch(err){
        console.log("Error in createProfessor controller: ", err)
        return res.status(500).json({ error: "Internal Server Error." })
    }
}

// 取得指定課程的學生清單
export const getClassStudentList = async (req, res) => {
    const courseId = req.query.courseId
    try {
        const studentList = await getClassStudentListDB(courseId)
        return res.status(200).json(studentList)
    }catch(err){
        console.log("Error in getClassStudentList controller: ", err)
        return res.status(500).json({ error: "Internal Server Error." })
    }
}

