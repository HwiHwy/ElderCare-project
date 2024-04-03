import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { storage } from "../firebaseConfig";
import "firebase/storage";
import { uploadBytesResumable } from "firebase/storage";
import * as Notifications from 'expo-notifications';
import { getMessaging, getToken } from "firebase/messaging";
import Constants from 'expo-constants';
import * as Device from 'expo-device';

// import firebase from "firebase/app";
const useFirebase = () => {
  const uploadImage = async (imageurl, path) => {
    const response = await fetch(imageurl);
    const blobFile = await response.blob();
    const reference = ref(storage, path + "/" + Date.now());
    const result = await uploadBytes(reference, blobFile);
    const image = await getDownloadURL(result.ref);
    return image;
  };

  const updateImage = async (newImageurl, oldImageurl, path) => {
    const image = await uploadImage(newImageurl, path);
    const desertRef = ref(storage, oldImageurl);

    deleteObject(desertRef)
      .then(() => {
        console.log("Image deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });

    return image;
  };

  const deleteImage = (oldImageurl) => {
    return new Promise((resolve, reject) => {
      const desertRef = ref(storage, oldImageurl);

      deleteObject(desertRef)
        .then(() => {
          console.log("Image deleted successfully");
          resolve();
        })
        .catch((error) => {
          console.error("Error deleting image:", error);
          reject(error);
        });
    });
  };

  const uploadImageFirebase = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, "images/" + new Date().getTime());

    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log("Upload is " + snapshot.ref);
      },
      (error) => {
        // handle error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          return downloadURL;
          // save record
          //   await saveRecord(fileType, downloadURL, new Date().toISOString());
          //   setImage("");
          //   setVideo("");
        });
      }
    );
  };

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }


    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
  
    return token.data;
  }

  async function getToken() {
    const token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    return token.data;
  }

  return {
    uploadImage,
    updateImage,
    deleteImage,
    uploadImageFirebase,
    registerForPushNotificationsAsync,
    getToken
  };
};

export default useFirebase;
