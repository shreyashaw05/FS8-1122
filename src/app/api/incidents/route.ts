import { PrismaClient } from "@/generated/prisma"
import { NextResponse, NextRequest } from "next/server"

const prisma = new PrismaClient()

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const { searchParams } = new URL(req.url)
        // console.log(searchParams.get("resolved"))

        const paramValue = searchParams.get("resolved")
        if (!paramValue)
            return NextResponse.json({ status: 422, data: {}, message: "No value for param provided" })


        const resolvedFlag = paramValue === "true" ? true : paramValue === "false" ? false : undefined;
        const unresolvedIncidents = await prisma.incident.findMany({
            where: { resolved: resolvedFlag }
        })
        
        // console.log(unresolvedIncidents)
        return NextResponse.json({ status: 200, data: unresolvedIncidents, message: "data fetched sucesfully" })

    } catch (error) {
        return NextResponse.json({ status: 500, data: error, message: "Something went wrong", })
    }

}