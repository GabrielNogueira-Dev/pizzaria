import "dotenv/config"
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_UR}`
const adapter = new PrismaPg({connectionString})

const prismaclient = new PrismaClient({adapter})

export default prismaclient