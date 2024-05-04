import express from 'express'
import { createClass, getClassList, updateClass } from '../controllers/class.controller.js'

const router = express.Router()

// /api/1.0/class

router.get('/', getClassList)

router.post('/', createClass)

router.put('/', updateClass)

router.delete('/:id')
export default router