import { icons } from "@/constants";
import { Tabs } from "expo-router";
import { View, Image, ImageSourcePropType } from "react-native";

const TabIcon = ({source, focused}: {source: ImageSourcePropType; focused: boolean;}) => (
    <View className={`flex flex-row justify-center items-center rounded-full ${focused ? "bg-general-300" : ""}`}>
        <View className={`rounded-full w-12 h-12 items-center justify-center ${focused ? "bg-general-400" : ""}`}>
            <Image source={source}
            tintColor="white"
            resizeMode="contain"
            className="w-7 h-7"/>
        </View>
    </View>
)

const Layout = () => (
    <Tabs initialRouteName="index" screenOptions={{
        tabBarActiveTintColor:"blue",
        tabBarInactiveBackgroundColor: "black",
        tabBarShowLabel: false,
        tabBarStyle: {
            backgroundColor: '#333333',
            borderRadius: 50,
            paddingBottom: 0,
            overflow: 'hidden',
            marginHorizontal: 10,
            marginBottom: 10,
            height: 68,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            position: "absolute"
        }
    }}>
        <Tabs.Screen 
        name="home"
        options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({focused}) =>(
            <TabIcon focused={focused} source={icons.home}/>
        )
        }}/>
        <Tabs.Screen 
        name="rides"
        options={{
            title: 'Rides',
            headerShown: false,
            tabBarIcon: ({focused}) =>(
            <TabIcon focused={focused} source={icons.taxi}/>
        )
        }}/>
        <Tabs.Screen 
        name="chat"
        options={{
            title: 'Chat',
            headerShown: false,
            tabBarIcon: ({focused}) =>(
            <TabIcon focused={focused} source={icons.chat}/>
        )
        }}/>
        <Tabs.Screen 
        name="profile"
        options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({focused}) =>(
            <TabIcon focused={focused} source={icons.profile}/>
        )
        }}/>
    </Tabs>
)

export default Layout