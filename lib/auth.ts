import jwt from "jsonwebtoken";

export function verifyToken(
  authHeader: string | null
) {
  if (!authHeader) {
    throw new Error("Unauthorized");
  }

  const token =
    authHeader.split(" ")[1];

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET!
  );

  return decoded as {
    id: string;
    role: string;
  };
}

export function requireRole(
  role: string,
  allowedRoles: string[]
) {
  if (!allowedRoles.includes(role)) {
    throw new Error("Forbidden");
  }
}