import react from 'react';
import { View, Text, Button} from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from "../Utils/Constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import { getToken } from "../Auth/TokenProvider";


const ProfileItem = () => {
    const [user, setUser] = useState({});
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(API_URL+'users/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + await getToken(),
                },
            });
            const json = await response.json();
            setUser(json);
            setNickname(json.nickname);
        } catch (error) {
            console.error(error);
        }
    };
    fetchData();
}, []);

const handleUpdate = async () => {
    try {
        const response = await fetch(API_URL+'users/me', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await AsyncStorage.getItem('token'),
            },
            body: JSON.stringify({
                nickname,
                bio,
                imageUrl,
            }),
        });
        const json = await response.json();
        if (json.nickname) {
            setError('');
        } else {
            setError('Something went wrong, please try again');
        }
    } catch (error) {
        console.error(error);
    }
};

const handleLogout = async () => {
    try {
        await AsyncStorage.removeItem('token');
        navigation.navigate('Login');
    } catch (error) {
        console.error(error);
    }
};

return (
  <View style={styles.container}>
    <View style={styles.profileView}>
        <Image
            style={styles.profileImage}
            source={{uri: user.imageUrl}}
        />
        <Text style={styles.profileText}>{user.email}</Text>
        <Text style={styles.profileText}>{user.nickname}</Text>
        <Text style={styles.profileText}>{user.bio}</Text>
    </View>
    <View style={styles.inputView}>
      <TextInput
        style={styles.TextInput}
        placeholder="Nickname"
        placeholderTextColor="#003f5c"
        onChangeText={(nickname) => setNickname(nickname)}
        value={nickname}
        />
    </View>
    <View style={styles.inputView}>
        <TextInput
            style={styles.TextInput}
            placeholder="Bio"
            placeholderTextColor="#003f5c"
            onChangeText={(bio) => setBio(bio)}
            value={bio}
        />
    </View>
    <View style={styles.inputView}>
        <TextInput
            style={styles.TextInput}
            placeholder="Image URL"
            placeholderTextColor="#003f5c"
            onChangeText={(imageUrl) => setImageUrl(imageUrl)}
            value={imageUrl}
        />
    </View>
    <View style={styles.inputView}>
        <Button

            title="Update"
            onPress={handleUpdate}
        />
    </View>
    <View style={styles.inputView}>
        <Button
            title="Logout" 
            onPress={handleLogout}
        />
    </View>
</View>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#003f5c',
},
profileView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#003f5c',
},
});

export default ProfileItem;
