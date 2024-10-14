import { Text, ScrollView, SafeAreaView, View, Image } from "react-native";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal"

const SignUp = () => {
  const {isLoaded, signUp, setActive} = useSignUp();
  

  const [form, setForm] = useState({
     name: "",
     email: "",
     password: ""
    });

    const [verification, setVerification] = useState({
      state: 'pending',
      error: "",
      code: "",
    })

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setVerification({
        ...verification, state: 'pending'
      })
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        setVerification({...verification, state: 'success'})
      } else {
        setVerification({...verification, error: 'Verification Failed', state: 'failed'})
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setVerification({
        ...verification,
         error: err.errors[0].longMessage,
         state: 'failed'
        })
    }
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[210px] ">
          <Image source={images.signUpCar} className="z-0 w-full h-[200px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
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
          <CustomButton title="Sign Up" onPress={onSignUpPress} className="mt-5"/>

          <OAuth/>

          <Link
           href="/sign-in"
           className="text-lg text-center text-general-200 mt-2" 
          >
            <Text>Already have an Account?</Text>
            <Text className="text-primary-500">Log In</Text>
          </Link>
        </View>

       { /* Verification Model*/}
       <ReactNativeModal isVisible={verification.state === 'success'}>
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <Image source={images.check} className="w-[110px] h-[110px] mx-auto my-5"/>
          <Text className="text-3xl font-JakartaBold text-center">
            Verified
          </Text>
          <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
            Account access has been successfully verified
          </Text>
          <CustomButton title="Browse Home"
          onPress={() => router.replace ('/(root)/(tabs)/home')} 
          className="mt-5"/>
        </View>
       </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
