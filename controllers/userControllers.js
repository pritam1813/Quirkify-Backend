const { auth, signOut } = require("../config/firebase");
require("dotenv").config();

module.exports.profile = async function (req, res) {
  try {
    const user = await auth.currentUser;
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(401).json("Unauthorized");
    }
  } catch (error) {
    res
      .status(500)
      .json({ errorCode: error.code, errorMessage: error.message });
  }
};

module.exports.createUser = async function (req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userAdded = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    const name = firstName + lastName;
    await userAdded.user.updateProfile({
      displayName: name,
      photoURL: process.env.DEFAULT_AVATAR_URL,
    });
    const jwt = await userAdded.user.getIdToken();
    // const userRef = firestore.collection("users").doc(userAdded.user.uid);
    // await userRef.set(userData);
    return res.status(200).json({
      success: true,
      user: userAdded.user,
      token: jwt,
    });
  } catch (error) {
    let errorCode = error.code.replace("auth/", "");
    let errorMessage = error.message
      .replace("Firebase:", "")
      .replace(/\(.*\)/, "")
      .trim();
    return res.status(500).json({
      error: true,
      errorCode,
      message: errorMessage,
    });
  }
};

module.exports.login = async function (req, res) {
  try {
    const { email, password } = req.body;
    const userLogin = await auth.signInWithEmailAndPassword(email, password);
    const jwt = await userLogin.user.getIdToken();
    return res.status(200).json({
      success: true,
      user: userLogin.user,
      token: jwt,
    });
  } catch (error) {
    let errorCode = error.code.replace("auth/", "");
    let errorMessage = error.message
      .replace("Firebase:", "")
      .replace(/\(.*\)/, "")
      .trim();
    return res.status(500).json({
      error: true,
      errorCode,
      message: errorMessage,
    });
  }
};

module.exports.updateUser = async function (req, res) {
  try {
    const user = await auth.currentUser;
    if (user) {
      await user.updateProfile(req.query);
      return res.status(200).json(user);
    } else {
      return res.status(401).json("Unauthorized");
    }
  } catch (error) {
    res
      .status(500)
      .json({ errorCode: error.code, errorMessage: error.message });
  }
};

module.exports.signout = async function (req, res) {
  try {
    const userSignOut = await signOut;
    return res.status(200).json(userSignOut);
  } catch (error) {
    res
      .status(500)
      .json({ errorCode: error.code, errorMessage: error.message });
  }
};

module.exports.deleteUser = async function (req, res) {
  try {
    const user = await auth.currentUser;
    console.log(user);
    if (user) {
      const deleteuser = await user.delete();
      return res.status(200).json(deleteuser);
    } else {
      return res.status(403).json("Invalid Request");
    }
  } catch (error) {
    console.error();
  }
};
