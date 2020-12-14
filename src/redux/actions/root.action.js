export function authorize(userObj) {
    return { type: "user/set", payload: userObj };
}

export function unauthorize() {
    return { type: "user/remove" };
}