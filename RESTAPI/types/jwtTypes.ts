export interface JWTContent {
    user_id: string,
    email: string,
    fullname: { first: string, last: string; },
    profile_picture_path: string;
}