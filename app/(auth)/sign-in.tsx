import { Text, ScrollView, SafeAreaView, View, Image } from "react-native";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import OAuth from "@/components/OAuth";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const onSignInPress = async () => {}

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[210px] ">
          <Image source={images.signUpCar} className="z-0 w-full h-[200px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Welcome 👋
          </Text>
        </View>
        <View className="p-5">
          
          <InputField
            label="Email"
            placeholder="Enter your Email"
            icon={icons.email}
            value={form.email }
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            secureTextEntry={false}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomButton title="Sign In" onPress={onSignInPress} className="mt-5"/>

          <OAuth/>

          <Link
           href="/sign-up"
           className="text-lg text-center text-general-200 mt-2" 
          >
            <Text>Don't have an Account?</Text>
            <Text className="text-primary-500">Sign-up</Text>
          </Link>
        </View>

       { /* Verification Model*/} 
      </View>
    </ScrollView>
  );
};

export default SignIn;
