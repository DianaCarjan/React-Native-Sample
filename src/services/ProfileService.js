import { URL } from '../utils/Constants';
import axios from 'axios';

export default class ProfileServices {
    static config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    static getProfiles = async () => {
        try {
            const response = await axios.get(`${URL}/profiles`, ProfileServices.config);
            return response.data;
        } catch (error) {
            console.log('error', error);
            return [];
        }
    };

    static deleteProfile = async (id) => {
        try {
            await axios.delete(`${URL}/profiles/${id}`, ProfileServices.config);
            return true;
        } catch (error) {
            return false;
        }
    };

    static addProfile = async (profile, image) => {
        try {
            const response = await axios.post(`${URL}/profiles`, profile, ProfileServices.config);
            if (image) {
                await ProfileServices.uploadImage(image, response?.data?.id);
            }
            return response?.data;
        } catch (error) {
            console.log('error', error);
            return null;
        }
    };

    static updateProfile = async (profile, image) => {
        try {
            await axios.put(`${URL}/profiles/${profile.id}`, profile, ProfileServices.config);
            if (image) {
                console.log('upload');
                await ProfileServices.uploadImage(image, profile?.id);
            }
            return true;
        } catch (error) {
            console.log('error', error);
            return false;
        }
    };

    static uploadImage = async (image, profileId) => {
        try {
            let uriParts = image?.uri?.split('.');
            let fileType = uriParts[uriParts?.length - 1];

            let formData = new FormData();
            formData.append('files', {
                uri: image?.uri,
                name: `photo.${fileType}`,
                type: `image/${fileType}`,
            });

            formData.append('refId', profileId);
            formData.append('ref', 'profile');
            formData.append('field', 'image');

            await axios({
                method: 'POST',
                url: `${URL}/upload`,

                data: formData
            });


            return true;
        } catch (error) {
            console.log('error', error);
            return false;
        }
    }
}
