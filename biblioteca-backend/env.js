export const env = {
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshSecret: process.env.REFRESH_TOKEN_SECRET, 
    accessTtl: Number(process.env.JWT_ACCESS_EXPIRES_IN),
    refreshTtl: Number(process.env.JWT_REFRESH_EXPIRES_IN),
};