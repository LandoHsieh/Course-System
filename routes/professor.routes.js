import express from 'express'
import { createProfessor, getClassStudentList, getProfessorClassList, getProfessorList } from '../controllers/professor.controller.js'


const router = express.Router()

// /api/1.0/professor

router.post('/', createProfessor)

router.get('/', getProfessorList)

router.get('/class/studentList', getClassStudentList)

router.get('/class', getProfessorClassList)



export default router