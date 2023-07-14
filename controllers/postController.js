const { auth, firestore } = require("../config/firebase");

module.exports.create = async function (req, res) {
  try {
    console.log(req.body);
    const user = await auth.currentUser;
    if (user) {
      const avatar = user.photoURL;
      const name = user.displayName;
      const { title, content } = req.body;
      const postRef = await firestore.collection("posts").doc();
      await postRef.set({
        id: postRef.id,
        title,
        content,
        user: {
          name,
          avatar,
        },
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
    return res.status(200).json(
      snapshot.docs.map((doc) => {
        return doc.data();
      })
    );
  } catch (error) {
    res
      .status(500)
      .json({ errorCode: error.code, errorMessage: error.message });
  }
};
