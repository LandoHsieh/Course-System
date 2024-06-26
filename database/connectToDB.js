import mysql from 'mysql2'
import * as dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
}).promise()

const connection = await pool.getConnection()

// 取得所有講師資訊
export const getProfessorListDB = async () => {
    const professorList = await pool.query("select * from professors")
    return professorList[0]
}

// 取得所有課程列表，包含講師資訊
export const getClassListDB = async () => {
    const classList = await pool.query(`
        SELECT 
            c.course_id, 
            c.course_name, 
            c.description, 
            c.start_time, 
            c.end_time, 
            p.professor_id, 
            p.name AS professor_name, 
            p.email AS pprofessor_email 
        FROM 
            courses c 
        INNER JOIN 
            professors p 
        ON 
            c.professor_id = p.professor_id`
    )
    return classList[0]
}

// 取得指定講師的課程列表
export const getProfessorClassListDB = async (professor_name) => {
    const classList = await pool.query(`
        SELECT 
            c.course_id, 
            c.course_name,
            c.description,
            c.start_time, 
            c.end_time
        FROM 
            courses c
        INNER JOIN 
            professors p
        ON 
            c.professor_id = p.professor_id
        WHERE 
            p.name = ?
    `, [professor_name])
    return classList[0]
}

// 建立新講師
export const createProfessorDB = async (name, email) => {
    const result = await pool.query(`INSERT INTO professors (name, email) VALUES (?, ?)`, [name, email])
    console.log(result[0].affectedRows)
    return result[0].insertId
}

//建立新課程
export const createClassDB = async (course_name, description, start_time, end_time, professor_id) => {
    //檢查此professor是否存在
    let professorExist = false
    const checkProfessor = await pool.query(`SELECT 1 FROM professors WHERE professor_id = ?`, [professor_id])
    if (checkProfessor[0].length > 0) professorExist = true
    if (!professorExist) {
        throw new Error("This professor ID doesn't exists")
    }

    const result = await pool.query(`
        INSERT INTO courses
            (course_name, description, start_time, end_time, professor_id)
        VALUES
            (?, ?, ?, ?, ?)
    `, [course_name, description, start_time, end_time, professor_id])
    
    console.log(result[0].insertId)
    return result[0].insertId
}

// 更新課程內容
export const updateClassDB = async (course_id, course_name, description, start_time, end_time, professor_id) => {
    // 檢查課程是否存在
    let classExist = false
    const checkClass = await pool.query(`SELECT 1 FROM courses WHERE course_id = ?`, [course_id])
    if (checkClass[0].length > 0) classExist = true
    if (!classExist) throw new Error("This course ID doesn't exists.")

    const result = await pool.query(`
        UPDATE 
            courses
        SET 
            course_name = ?,
            description = ?,
            start_time = ?,
            end_time = ?,
            professor_id = ?
        WHERE
            course_id = ?
    `, [course_name, description, start_time, end_time, professor_id, course_id])
    return result[0]
}

// 刪除課程
export const deleteClassDB = async (course_id) => {
    const result = await pool.query(`DELETE FROM courses WHERE course_id=?`, [course_id])
    console.log(result[0])
    return result[0].affectedRows
}

export const getClassStudentListDB = async (course_id) => {
    const result = await pool.query(`
        SELECT 
            s.student_id, s.email
        FROM 
            students s
        INNER JOIN 
            student_courses sc 
        ON
            s.student_id = sc.student_id
        WHERE 
            sc.course_id = ?`,[course_id]
    )
    console.log(result[0])
    return result[0]
}