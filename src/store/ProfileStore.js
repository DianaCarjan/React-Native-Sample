import { decorate, action, observable } from 'mobx';
import ProfileServices from '../services/ProfileService';
import { generateId } from '../utils/StringUtils';

class ProfileStore {
    profiles = [];

    addProfile = async (profile, image)=> {
        const result = await ProfileServices.addProfile(profile, image);
        this.profiles = [...this.profiles, result];
    }
    updateProfile = async (profile, image) => {
        const index = this.profiles.findIndex(item => item.id === profile.id);
        if(index>-1){
            this.profiles[index] = profile;
        }
        await ProfileServices.updateProfile(profile, image);
    }

    deleteProfile = async(id) => {
        const isDeleted =  await ProfileServices.deleteProfile(id);
        if(isDeleted)
            this.profiles = this.profiles.slice()?.filter(item=> item.id!=id);
    }

    getProfiles = async () => {
        const result = await ProfileServices.getProfiles();
        this.profiles = result;
    }
}

decorate(ProfileStore, {
    profiles: observable,
    getProfiles: action,
    addProfile: action,
    updateProfile: action,
    deleteProfile: action
});

export default new ProfileStore();
