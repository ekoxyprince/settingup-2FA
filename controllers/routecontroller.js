const speakeasy = require("speakeasy")
const QRCode = require("qrcode")
//initializing the user object to have a global scope
let user = {};
//when user visits the home route the user gets a secret generated
exports.getHome = (req,res,next)=>{
    //secret generated after user has visited the route
    let secret = speakeasy.generateSecret();
    //a pro[\perty is added to the user object which holds the secret
    user.two_factor_temp_secret = secret.base32
    //with the generated secrete we can created a qrcode image url
    QRCode.toDataURL(secret.otpauth_url,(err,data_url)=>{
    if(err) throw err
    //this url is then sent to the user so then can scan and get an otp
    res.render("display",{data_url})
    })
}

//when a user has scanned and sent a code for verification
exports.postHome = (req,res,next)=>{
//we fetch the code he has sent for validation
let {otp} = req.body
//we also fetch from our users property the secret
let secret = user.two_factor_temp_secret
//we verify and validate our user
let verify = speakeasy.totp.verify({
    secret:secret,
    encoding:"base32",
    token:otp
})
//response based on the outcome of our verification
if(verify===true){
// response based on success
res.send("Successful with your validation")
}else{
// response based on failure
res.send("Your code doesn't match")
}
}