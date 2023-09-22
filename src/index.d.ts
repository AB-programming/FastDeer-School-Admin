interface AuthOption {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

interface HttpResponse<T> {
    code: string,
    msg: string,
    data: T
}