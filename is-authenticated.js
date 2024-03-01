function isAuthenticated(req, res, next) {
  // console.log(req.session.cookie);
  console.log("******", req.session?.account?.idTokenClaims?.groups);
  if (!req.session.isAuthenticated) {
    return res.send({ message: "User not authenticated" });
    //   throw new Error('user not authenticated');
    // return res.redirect("/auth/signin"); // redirect to sign-in route
    // return res.send({ url: "http://localhost:3000/auth/signin" });
  }

//   if (
//     !req.session?.account?.idTokenClaims?.groups.includes(
//       process.env.TENANT_AD_GROUPS
//     )
//   )
//     throw new ForbiddenError("You do not have access to this tenant");
  next();
}

module.exports = isAuthenticated