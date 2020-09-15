const { userModel } = require("./schema");

module.exports = {
  registerUser: (profile) => {
    return new Promise((resolve, reject) => {
      userModel
        .exists({ phoneNumber: profile.phoneNumber })
        .then((result) => {
          if (result) reject("User Already Exists");
          else {
            const otp = Math.floor(100000 + Math.random() * 900000);
            let user = new userModel({ ...profile, otp });
            console.log(result, user);
            user
              .save()
              .then((result) => {
                resolve(result);
              })
              .catch((err) => {
                reject(err);
              });
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  verifyOTP: (profile) => {
    return new Promise((resolve, reject) => {
      userModel
        .exists({ phoneNumber: profile.phoneNumber, otp: profile.otp })
        .then((result) => {
          if (!result) reject("Invalid Details");
          else {
            resolve("OTP Matched");
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  updateUserProfile: (payload) => {
    return new Promise((resolve, reject) => {
      userModel
        .findOne({ phoneNumber: payload.phoneNumber })
        .then((user) => {
          console.log(user);
          if (!user) reject("User does not exist!");
          else {
            user.name = payload.name;
            user.profile = payload.profile;
            user
              .save()
              .then((result) => {
                resolve(result);
              })
              .catch((err) => reject(err));
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
