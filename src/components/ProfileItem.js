import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import UserAvatar from 'react-native-user-avatar';

const ProfileItem = ({ profile, onDelete, onPress, style }) => {
    return (
        <View style={[styles.item, style]}>
            <TouchableOpacity style={styles.details} onPress={onPress}>
                <UserAvatar size={24} name={profile?.name} />
                <Text style={styles.name}>{profile?.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(profile?.id)}>
                <Icon name='minus-circle' style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        flex: 1,
        height: 50,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'gray'
    },
    details: {
        flexDirection:'row',
        alignItems:'center',
        flex:1
    },
    name: {
        marginLeft:20
    },
    icon: {
        fontSize: 30,
        color: 'red'
    }
});

export default ProfileItem;
