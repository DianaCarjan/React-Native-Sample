import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, TextInput } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CoverImage from '../components/CoverImage';
import UserAvatar from "../components/UserAvatar";
import ProfileStore from "../store/ProfileStore";
import {URL} from '../utils/Constants';
const Profile = ({ route, navigation }) => {
    const { profile, mode } = route.params;

    const [data, setData] = useState(profile);

    const [imageURI, setImageURI]= useState(`${URL}${profile?.image?.url}`);
    const [image, setImage]= useState(null);

    const onSelectImage = (result) => {
        setImage(result);
        setImageURI(result.uri);
    };

    const onSave = async() => {
        const actions = {
            'Create': ProfileStore.addProfile,
            'Edit': ProfileStore.updateProfile
        };

        await actions[mode](data, image);
        navigation.pop();
    };

    const onBack = () => {
        navigation.pop();
    };
    const windowHeight = Math.round(Dimensions.get('window').height);

    return (
        <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <CoverImage source={require('../../assets/images/background.png')} size={windowHeight / 3} />
            <View style={styles.header}>
                <TouchableOpacity style={styles.saveButton} onPress={onBack}>
                    <Text>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={onSave}>
                    <Text>Save</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.coverView} >
                <View style={styles.avatar}>
                    <UserAvatar onSelectImage={onSelectImage} sourceURI={imageURI} />
                </View>
            </View>
            <View style={{ padding: 15, flexDirection: 'column', margin: 30 }}>
                {/* Add text input fields */}
                <TextInput style={styles.text} 
                    value={data?.name}
                    onChangeText={newValue=> setData({...data, name: newValue})}
                    placeholder={'Name'}
                />
                <TextInput style={styles.text} 
                    placeholder={'Email'}
                    onChangeText={newValue=> setData({...data, email: newValue})}
                    value={data?.email}
                />
                <TextInput style={styles.text}
                    placeholder={'Description'}
                    onChangeText={newValue=> setData({...data, description: newValue})}
                    value={data?.description}
                    multiline
                />
            </View>
        </KeyboardAwareScrollView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    coverView: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingRight: 15,
        paddingLeft: 15,
        height: Math.round(Dimensions.get('window').height) / 3 + Math.round(Dimensions.get('window').height) / 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    avatar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100 + '%',
    },
    label: {
        fontSize: 20,
        marginBottom: 10,
    },
    text: {
        marginBottom: 12,
        fontSize: 14,
        color: '#C5C5C5',
        padding: 10,
        flex: 1
    },
    saveButton: {
        marginTop: 30,
        paddingTop: 20,
        margin: 10,
        zIndex: 999
    },
});
