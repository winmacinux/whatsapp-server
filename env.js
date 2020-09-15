module.exports = {
  dbURI:
    "mongodb+srv://cluster0.lvube.mongodb.net/nextapp?retryWrites=true&w=majority",
  dbAuth: {
    auth: {
      user: "admin",
      password: "admin",
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
