const { auth, firestore } = require("../config/firebase");

module.exports.create = async function (req, res) {
  try {
    console.log(req.body);
    const user = await auth.currentUser;
    if (user) {
      const userId = user.uid;
      const { title, content } = req.body;
      const postRef = firestore.collection("posts").doc();
      await postRef.set({
        title,
        content,
        user: userId,
        comments: [],
        likes: [],
      });
      return res.status(200).json("Post Created");
    } else {
      return res.status(401).json("Unauthorized");
    }
  } catch (error) {
    res
      .status(500)
      .json({ errorCode: error.code, errorMessage: error.message });
  }
};

module.exports.allPosts = async function (req, res) {
  try {
    const snapshot = await firestore.collection("posts").get();
    return res.json(snapshot.docs.map((doc) => doc.data()));
  } catch (error) {
    res
      .status(500)
      .json({ errorCode: error.code, errorMessage: error.message });
  }
};
