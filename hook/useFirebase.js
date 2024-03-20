import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { storage } from "../firebaseConfig";
import "firebase/storage";

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

    return {
        uploadImage,
        updateImage,
        deleteImage
    };
};

export default useFirebase;
