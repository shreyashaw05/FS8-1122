import { PrismaClient } from "../src/generated/prisma";
import { SeedData } from "./dummyData.js";

const prisma = new PrismaClient();

const main = async () => {
  // crwating the user table first 
  for (let camera of SeedData) {
    const cameraCreated = await prisma.camera.create({
      data: {
        name: camera.name,
        location: camera.location,
        incidents: {
          create: camera.incidents.map((incident) => ({
            tsStart: new Date(incident.tsStart),
            tsEnd: new Date(incident.tsEnd),
            thumbnailUrl: incident.thumbnailUrl,
            type:incident.type,
            resolved: incident.resolved
          }))
        }
      }
    })
    console.log(cameraCreated)
  }
}
main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });