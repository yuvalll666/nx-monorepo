export default () => ({
    auth: {
        jwt: {
            secret: process.env["JWT_SECRET"],
            expiresIn: "1h",
        },
        password: {
            saltRound: 10,
        },
    },
});
