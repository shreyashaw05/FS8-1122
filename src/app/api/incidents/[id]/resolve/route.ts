import { PrismaClient } from "@/generated/prisma"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

        const incident = await prisma.incident.findUnique({
            where:{id}
        })
        if(!incident)
        {
            return NextResponse.json({ status: 404, updatedIncident: {}, message: "incident not found!" })
        }
        // console.log(incident.resolved)
        const updatedIncident = await prisma.incident.update({
            where:{id},
            data:{
                resolved: !incident.resolved
            }
        })
        // console.log(updatedIncident.resolved)
        return NextResponse.json({ status: 200, updatedIncident: updatedIncident, message: "incident upodated successfully" })
    } catch (error) {
        return NextResponse.json({ status: 500, error: error, message: "Something went wrong", })
    }
}