import React, { useEffect } from 'react';
import * as Permissions from 'expo-permissions';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, } from 'react-native-elements';

const UserAvatar = ({ sourceURI, onSelectImage }) => {
    useEffect(() => {
        const getPermissionAsync = async () => {
            if (Platform.OS !== 'web') {
                const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        };

        getPermissionAsync();
    }, []);

    const _onSelectImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

           {/*on select event handling */}
           if(onSelectImage) {
               onSelectImage(result);
           }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Avatar
            onPress={_onSelectImage}
            rounded
            icon={{ name: 'user', type: 'font-awesome' }}
            size={150}
            source={{ uri: sourceURI }}
        />
    )
};

export default UserAvatar;
