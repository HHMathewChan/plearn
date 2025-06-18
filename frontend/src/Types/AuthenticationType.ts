type Credentials = {
    email: string;
    password: string;
};

type AuthenticationResponse = {
    platform_user_id?: string;
    role_code?: string;
    role?: string;
    token: string;
    status?: string;
    message?: string;
    error?: string;
};

export type { Credentials, AuthenticationResponse };
