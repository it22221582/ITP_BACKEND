import jwt from "jsonwebtoken";
const secretKey = "kasundi"; // Replace with your secret key, and consider storing it securely

export function generateToken(payload) {
  console.log("in genarate token function");
  return jwt.sign({ payload }, secretKey, { expiresIn: "1h" }); // Adjust the expiration time as needed
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw error;
  }
}

export function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Token missing" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Attach user information to the request object
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error("Error during token verification:", error);
    res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
}
