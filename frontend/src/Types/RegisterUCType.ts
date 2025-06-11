type UserRole = "student" | "tutor" | "admin";

type RegisterDetails = {
    role: UserRole;
    name: string;
    email: string;
    password: string;
};

export type { UserRole, RegisterDetails };