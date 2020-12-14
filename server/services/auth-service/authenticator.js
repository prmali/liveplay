module.exports.genRandomString = (size) => {
    let text = "";
    let possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let len = possibleChars.length

    for (let i = 0; i < size; i++) {
        text += possibleChars.charAt(Math.floor(Math.random() * len));
    }

    return text;
};