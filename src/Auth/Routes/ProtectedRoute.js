import checkAuth from "../DeviceStorage";

const ProtectedRoute = () => {
    const isAuth = checkAuth();
    if (!isAuth) {
        return <Redirect to="/" />;
    }

    return (
        <View>
            <Text>Protected Route</Text>

        </View>
    );
};

export default ProtectedRoute;