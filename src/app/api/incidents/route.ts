import { PrismaClient } from "@/generated/prisma"
import { NextResponse, NextRequest } from "next/server"

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        // console.log(searchParams.get("resolved"))

        const paramValue = searchParams.get("resolved")
        if (!paramValue)
            return NextResponse.json({ status: 422, unresolvedIncidents: {}, message: "No value for param provided" })


        const resolvedFlag = paramValue === "true" ? true : paramValue === "false" ? false : undefined;
        const unresolvedIncidents = await prisma.incident.findMany({
            where: { resolved: resolvedFlag },
            include: { cammera: true }
        })
        
        // console.log(unresolvedIncidents)
        return NextResponse.json({ status: 200, unresolvedIncidents: unresolvedIncidents, message: "data fetched sucesfully" })

    } catch (error) {
        return NextResponse.json({ status: 500, error: error, message: "Something went wrong", })
    }

}