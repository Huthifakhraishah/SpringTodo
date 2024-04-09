import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createUser = async (email: string, auth0Id: string) => {
  return prisma.user.create({
    data: {
      email,
      auth0_id: auth0Id,
    },
  });
};

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const findOrCreateUserByAuth0Id = async (
  email: string,
  auth0Id: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      auth0_id: auth0Id,
    },
  });

  if (!user) {
    return createUser(email, auth0Id);
  }

  return user;
};
