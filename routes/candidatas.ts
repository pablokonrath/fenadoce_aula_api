import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
  try {
    const candidadas = await prisma.candidata.findMany()
    res.status(200).json(candidadas)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", async (req, res) => {
  const { nome, clube, idade, sonho } = req.body

  if (!nome || !clube || !idade || !sonho) {
    res.status(400).json({ "erro": "Informe nome, clube, idade e sonho" })
    return
  }

  try {
    const candidata = await prisma.candidata.create({
      data: { nome, clube, idade, sonho }
    })
    res.status(201).json(candidata)
  } catch (error) {
    res.status(400).json(error)
  }
})

// router.delete("/:id", async (req, res) => {
//   const { id } = req.params

//   try {
//     const mae = await prisma.mae.delete({
//       where: { id: Number(id) }
//     })
//     res.status(200).json(mae)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

// router.put("/:id", async (req, res) => {
//   const { id } = req.params
//   const { nome, endereco, telefone, datanasc } = req.body

//   if (!nome || !endereco || !telefone || !datanasc) {
//     res.status(400).json({ "erro": "Informe nome, endereco, telefone e datanasc" })
//     return
//   }

//   try {
//     const mae = await prisma.mae.update({
//       where: { id: Number(id) },
//       data: { nome, endereco, telefone, datanasc: new Date(datanasc) }
//     })
//     res.status(200).json(mae)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

export default router