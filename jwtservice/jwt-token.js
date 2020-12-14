const jwtLib = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const jwt = {
    expiresIn: "1h",
    issuer: "Blog-app",
    subject: "some@user.com",
    audience: "http://mysoftcorp.in",
    algorithm: "RS256",
}
class JwtTokenService {
    constructor () {
        this.privateKey = fs.readFileSync(
            path.join(__dirname, "../", "configuration", "keys", "private.key")
        );
        this.publicKey = fs.readFileSync(
            path.join(__dirname, "../", "configuration", "keys", "public.key")
        );
        this.signOptions = {
            algorithm: jwt.algorithm,
            expiresIn: jwt.expiresIn,
            issuer: jwt.issuer,
            subject: jwt.subject,
            audience: jwt.audience,
        }
    }
    async generateJwt(payload) {
        const token = await jwtLib.sign(payload, this.privateKey, this.signOptions);
        console.log('token', token);
        return token;
    }
    async verifyToken(request) {
        try {
            const token =
                request.headers.authorization ||
                request.headers.Authorization ||
                request.query["token"];
            const verified = await jwtLib.verify(
                token,
                this.publicKey,
                this.signOptions
            );
            return verified;
        } catch (err) {
            console.log('err', err);
            switch (true) {
                case err instanceof jwtLib.TokenExpiredError:
                    throw {name: "JWT_Expired", message: "Invalid Token"};
                case err instanceof jwtLib.JsonWebTokenError:
                    throw {name: "JsonWebTokenError", message: "Invalid signature"};
                case err instanceof TypeError:
                    throw {name: "INVALID_PARAMETER", message: "Please provide token"};
                default:
                    throw {name: "JWT_Expired", message: "Invalid Token"};
            }
        }
    }
}
module.exports = {
    jwtService: new JwtTokenService(),
};