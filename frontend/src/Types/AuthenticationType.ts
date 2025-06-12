type Credentials = {
    email: string;
    password: string;
};

type AuthenticationResponse = {
    token: string;
    student_code?: string;
    platform_user_id?: string;
};

export type { Credentials, AuthenticationResponse };
