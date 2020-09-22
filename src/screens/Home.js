import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {observer} from 'mobx-react';
import Profile from './Profile';
import ProfileStore from '../store/ProfileStore';
import ProfileItem from '../components/ProfileItem';
import { ScreenMode } from '../utils/Constants';

const Home = observer(({navigation}) => {

  const onDelete = async(id) => {
    await ProfileStore.deleteProfile(id);
  };

  const onAdd = () => {
    navigation.navigate('Profile', {mode: ScreenMode.CREATE});
  };

  const onPress = (profile) => {
    navigation.navigate('Profile', { mode: ScreenMode.EDIT, profile: profile });
  };

  useEffect(() => {
    getProfiles();
  }, []);

  useEffect(()=> {
    const unsubscribe = navigation.addListener('focus', ()=>{
      getProfiles();
    });
    return unsubscribe();
  });

  const getProfiles = async() => {
    await ProfileStore.getProfiles();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profiles</Text>
         {/* Add onPress event handler */}
        <TouchableOpacity onPress={onAdd}>
          <Icon name='plus' style={styles.plusButton}></Icon>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* Add list */}
          {ProfileStore.profiles?.map((profile, index)=> 
            <ProfileItem profile={profile} key={index} onDelete={onDelete} onPress={()=> onPress(profile)} style={index===0 ? styles.firstItem: {}}/>
            )}
        </ScrollView>
      </View>
    </View>
  );
});



const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'column'
  },
  header: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    padding: 10,
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'gray',
    alignItems: 'center',
    minHeight: 60,
  },
  headerTitle: {
    textAlign:'center', 
    flex:1
  },
  plusButton: {
    fontSize: 30
  },
  list: {
    marginVertical: 20
  },
  scrollViewContent: {
    flexGrow: 1
  },
  firstItem: {
    borderTopWidth: 1
  }
});

export default Home;
