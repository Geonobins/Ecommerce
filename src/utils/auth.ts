export const checkPermissions = (user: any) => {
    console.log("fn")
    if (user && user.nickname) {
        console.log("fn",user)
        if (user.nickname === "admin") {
            return ["add", "delete", "edit"];
        }
    }
    return [];
}
