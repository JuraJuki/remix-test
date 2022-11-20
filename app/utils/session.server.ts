import { db } from "~/utils/db.server";
import bcrypt from "bcryptjs";

type LoginForm = {
  username: string;
  password: string;
};

export const login = async ({ username, password }: LoginForm) => {
  const user = await db.user.findUnique({ where: { username } });

  if (!user) return null;

  const isCorrectPW = await bcrypt.compare(password, user.passwordHash);

  if (!isCorrectPW) return null;

  return { id: user.id, username };
};
