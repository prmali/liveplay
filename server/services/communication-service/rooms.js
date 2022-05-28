// enums
const permissions = {
    OWNER_ONLY: "owner_only",
    ADMIN_ONLY: "admin_only",
    EVERYONE: "everyone",
}

// objects
const Room = {
    owner: "",
    listenerCount: 1,
    //admins: [],
    listeners: [],
    musicLog: [],
    actionLog: [],
    settings: {
        canQueue: permissions.EVERYONE,
        canChat: permissions.EVERYONE,
    },
    createdAt: Date.now(),
}

/*
create room
remove room
modify room

*/