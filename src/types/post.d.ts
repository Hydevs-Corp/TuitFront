export type post = {
    _id: string;
    title: string;
    body: string;
    userId: string;
    comments: comment[];
    likes: string[];
    createdAt: string;
};

export type comment = {
    id: string;
    author: string;
    body: string;
};

export type user = {
    _id: string;
    name: string;
    email: string;
    image: string;
    emailVerified?: boolean | null;
};
