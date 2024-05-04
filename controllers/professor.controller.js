import { createProfessorDB, getProfessorClassListDB, getProfessorListDB } from "../database/connectToDB.js"

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
        return res.status(200).send('Professor create successfully.')
    }catch(err){
        console.log("Error in createProfessor controller: ", err)
        return res.status(500).json({ error: "Internal Server Error." })
    }
    
}