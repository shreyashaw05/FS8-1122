import { PrismaClient } from "@/generated/prisma"
import { NextResponse, NextRequest } from "next/server"

const prisma = new PrismaClient()

export async function PATCH(req: NextRequest,{ params }:{params:{id:string}}) {
    try {
        const {id} = await params;

        const incident = await prisma.incident.findUnique({
            where:{id}
        })
        if(!incident)
        {
            return NextResponse.json({ status: 404, data: {}, message: "incident not found!" })
        }
        // console.log(incident.resolved)
        const updatedIncident = await prisma.incident.update({
            where:{id},
            data:{
                resolved: !incident.resolved
            }
        })
        // console.log(updatedIncident.resolved)
        return NextResponse.json({ status: 200, data: updatedIncident, message: "incident upodated successfully" })
    } catch (error) {
        return NextResponse.json({ status: 500, data: error, message: "Something went wrong", })
    }
}