export type Song = {
    id: string,
    urlPath: string,
    title: string,
    releaseDate: string
}

export type PlayList = {
    id: string;
    userId: string,
    songId: string,
    urlPath: string,
    title: string,
    orderId: string
}