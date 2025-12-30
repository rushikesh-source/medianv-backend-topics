//operating system

const os =require("os")
console.log(`OS Platform: ${os.platform()}`);
console.log("os type",os.type());
console.log("os userInformation",os.userInfo());


const path = require('path');
const filename = path.basename('/users/91913/file.txt');
console.log(filename);