const router = require("express").Router();
const authProvider = require("./provider");
const isAuthenticated = require('../is-authenticated')

// MSAL
router.get(
  "/login",
  authProvider.login({
    scopes: ["User.Read"],
    redirectUri: process.env.BACKEND_API + "/auth/redirect", // internal redirection for checking if authentication is successfull, and get idToken
    successRedirect: "/auth/set-cookie", // redirect to frontend after ms auth
  })
);
router.post("/redirect", authProvider.handleRedirect());
router.get("/set-cookie", (req, res) => {
  return res.redirect(process.env.ORIGIN);
});
// this route is not being used 🔽
router.get(
  "/acquireToken",
  authProvider.acquireToken({
    scopes: ["User.Read"],
    redirectUri: process.env.BACKEND_API + "/auth/redirect",
    successRedirect: "/auth/profile",
  })
);
router.get(
  "/profile",
  isAuthenticated, // check if user is authenticated
  async (req, res) => {
    try {
      return res.send(
        successResponse({
          account: req.session.account,
        })
      );
    } catch (error) {
      console.log(error);
      res.status(500).send("Error");
    }
  }
);
router.get(
  "/signout",
  authProvider.logout({
    postLogoutRedirectUri: process.env.ORIGIN,
  })
);

module.exports = router;
