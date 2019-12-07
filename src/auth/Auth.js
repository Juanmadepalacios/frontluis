export default class Auth {
    isAuthenticated(){
        const expiresAt = JSON.parse(sessionStorage.getItem("expires_at"));
        return new Date().getTime() < expiresAt;
    }
}