import { expressjwt } from "express-jwt";
import jwksRsa from "jwks-rsa";

const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://YOUR_AUTH0_DOMAIN/.well-known/jwks.json`,
  }),
  audience: "YOUR_API_AUDIENCE_IDENTIFIER",
  issuer: `https://YOUR_AUTH0_DOMAIN/`,
  algorithms: ["RS256"],
});

export default checkJwt;
