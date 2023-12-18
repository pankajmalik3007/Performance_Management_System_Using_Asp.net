namespace webapi_layer.Middleware.Auth
{
    public interface IJWTAuthManager
    {
        string GenerateJWT(User user, int? manuallyFetchedLeaveId = null);
    }
}
