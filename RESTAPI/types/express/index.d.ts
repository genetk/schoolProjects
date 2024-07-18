
declare namespace Express {
    interface Request {
        tokenInfo: JWTContent;
    }
}