import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";

const prismaclient = new PrismaClient();

export default prismaclient;