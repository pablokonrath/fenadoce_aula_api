import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
  try {
    const votos = await prisma.voto.findMany({
      include: {
        candidata: true,
        cliente: true
      }
    })
    res.status(200).json(votos)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", async (req, res) => {
  const { candidataId, clienteId, justificativa} = req.body

  if (!candidataId|| !clienteId) {
    res.status(400).json({ "erro": "Informe candidataId e clienteId" })
    return
  }

  try {
    const [voto, candidata] = await prisma.$transaction([
      prisma.voto.create({data: {candidataId, clienteId, justificativa}}),
      prisma.candidata.update({
        where: { id: candidataId}, 
        data: {numVotos: {increment: 1}}
        })
    ])
    res.status(201).json({voto,candidata})
  } catch (error) {
    res.status(400).json(error)
  }
})

// router.delete("/:id", async (req, res) => {
//   const { id } = req.params

//   try {
//     const bebe = await prisma.bebe.delete({
//       where: { id: Number(id) }
//     })
//     res.status(200).json(bebe)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

// router.put("/:id", async (req, res) => {
//   const { id } = req.params
//   const { nome, datanasc, altura, peso, maeId, medicoId } = req.body

//   if (!nome || !datanasc || !altura || !peso|| !maeId || !medicoId) {
//     res.status(400).json({ "erro": "Informe nome, datanasc, altura, peso, maeId, medicoId" })
//     return
//   }

//   try {
//     const bebe = await prisma.bebe.update({
//       where: { id: Number(id) },
//       data: { nome, datanasc: new Date(datanasc), altura, peso, maeId, medicoId }
//     })
//     res.status(200).json(bebe)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

export default router