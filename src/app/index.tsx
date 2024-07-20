import { router } from "expo-router";
import React from "react";
import { View, Text, Button } from "react-native";

const handleLogin = () => {
  router.replace("(tabs)");
};

const Login = () => {
  return (
    <View>
      <Text className="text-md text-orange-600">exemplo</Text>
      <Button title="vá para tabs" onPress={handleLogin} />
    </View>
  );
};

export default Login;
