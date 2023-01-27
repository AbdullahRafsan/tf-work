export class User {
    n: string;

    p: string;

    e: string;

    a: string;

    u: string;

    s: string;

    b: string;

    i: string;

    t: string;

    w: Array<unknown>;

    constructor(
        worked: Array<unknown>,
        name: string,
        password: string,
        email: string,
        address: string,
        usertype: string,
        skill: string,
        bio: string,
        img: string
    ) {
        this.n = name;
        this.p = password;
        this.e = email;
        this.a = address;
        this.t = usertype;
        this.s = skill;
        this.b = bio;
        this.i = img;
        this.w = worked;
    }
}

class BidItem {
    name: string;

    price: string;

    duration: string;

    note: string;

    profileID: string;

    constructor(name: string, price: string, duration: string, note: string, profileID: string) {
        this.duration = duration;
        this.profileID = profileID;
        this.note = note;
        this.name = name;
        this.price = price;
    }
}

export class Project {
    title: string;

    price: string;

    details: string;

    isHandovered: boolean;

    bidItem: Array<BidItem>;

    constructor(
        title: string,
        price: string,
        details: string,
        isHandovered: boolean,
        bidItem: Array<BidItem>
    ) {
        this.title = title;
        this.price = price;
        this.details = details;
        this.isHandovered = isHandovered;
        this.bidItem = bidItem;
    }
}

export class ChatList {
    userID: string;

    image: string;

    name: string;

    constructor(userID: string, image: string, name: string) {
        this.userID = userID;
        this.image = image;
        this.name = name;
    }
}
