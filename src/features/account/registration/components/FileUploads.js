// import React, { useState, useEffect } from "react";
import React, { useState, useContext, useEffect, Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Styled from "styled-components/native";
import {
  TextInput,
  Chip,
  ActivityIndicator,
  MD2Colors,
  FAB,
  Divider,
  Button,
  IconButton,
  MD3Colors,
} from "react-native-paper";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { FileSystemUploadType } from "expo-file-system";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { useTheme } from "react-native-paper";

export const FileUploads = ({ FileArray }) => {
  const imgDir = FileSystem.cacheDirectory + "images/";
  const [images, setImages] = useState(null);
  const { colors } = useTheme();
  //const [fileUploads, setFileUploads] = useState();

  // Checks if gif directory exists. If not, creates it
  async function ensureDirExists() {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    if (!dirInfo.exists) {
      console.log("Gif directory doesn't exist, creating…");
      await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
    }
  }

  const loadingImages = async () => {
    await ensureDirExists();
    const files = await FileSystem.readDirectoryAsync(imgDir);
    if (files.length > 0) {
      setImages(imgDir + files[0]);
    } else {
      setImages(null);
    }
  };

  //loop all files in folder and remove them//
  const clearFiles = async () => {
    await ensureDirExists();
    const files = await FileSystem.readDirectoryAsync(imgDir);
    if (files.length >= 0) {
      files.map((image) => {
        const uri = imgDir + image;
        FileSystem.deleteAsync(uri);
        setImages(null);
      });
    }
  };

  const AddButton = Styled(IconButton).attrs({
    padding: 0,
    IconButtonContentStyle: {
      width: 1,
      height: 1,
    },
    contentContainerStyle: {
      // padding: 12,
    },
  })``;

  const options = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    mediaType: "photo",
    allowsEditing: true,
    aspect: [10, 4],
    quality: 1,
  };

  const selectImage = async () => {
    let result;

    // if (useLibrary) {
    // No permissions request is necessary for launching the image library
    result = await ImagePicker.launchImageLibraryAsync(options);
    // } else {
    //   await ImagePicker.requestCameraPermissionsAsync();
    //   result = await ImagePicker.launchCameraAsync(options);
    // }

    const resizeImage = async () => {
      try {
        const desiredResult = await resizeImage(yourImage);
        console.log(desiredResult);
      } catch (e) {
        console.log(e);
      }
    };

    if (!result.canceled) {
      //handleFileRead(result.assets[0]);
      const image = result.assets[0];
      const fileName = result.assets[0].uri.split("/").pop();
      const fileType = fileName.split(".").pop();
      // result.assets[0].fileName = fileName;
      // console.log(result.fileSize);
      const manipResult = await manipulateAsync(
        image.localUri || image.uri,
        [
          {
            resize: {
              width: 650,
            },
          },
        ],
        [{ rotate: 0 }],
        { compress: 0.5, format: SaveFormat.JPEG }
      );
      // console.log(manipResult);
      //setImage(manipResult);
      saveImage(manipResult.uri);
      let formData = new FormData();
      // Infer the type of the image
      let match = /\.(\w+)$/.exec(fileName);
      let type = match ? `${match[1]}` : "image";
      formData.append("files", {
        uri: result.assets[0],
        name: fileName,
        type: fileType,
      });

      // const response = await fetch("http://127.0.0.1:8000/api/meals", {
      //   method: "POST",
      //   body: formData,
      //   headers: {
      //     "content-type": "multipart/form-data",
      //   },
      // });
      // const response = uploadImage(result.assets[0].uri);
      // console.log(response);
      //handleFileRead(result.assets[0]);
    }
  };

  const saveImage = async (uri: string) => {
    clearFiles();
    await ensureDirExists();
    const filename = new Date().getTime() + ".jpg";
    const dest = imgDir + filename;
    await FileSystem.copyAsync({ from: uri, to: dest });
    setImages(dest);
  };

  // const convertBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);
  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };
  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };

  const deleteImage = async (uri: string) => {
    await FileSystem.deleteAsync(uri);
    setImages(images.filter((i) => i !== uri));
  };

  const uploadImage = async (link) => {
    console.log(link);
    FileArray(link);
  };

  let attachments;
  if (images) {
    attachments = (
      <View
        style={{
          flexDirection: "column",
          margin: 1,
          alignItems: "center",
          gap: 5,
        }}
      >
        <Image
          source={{ uri: images }}
          style={{
            width: 180,
            height: 180,
            marginBottom: 18,
            borderRadius: "100rem",
          }}
        />
        {/* <Text>{filename}</Text> */}

        {/* <IconButton
          icon="close"
          iconColor={MD3Colors.error50}
          size={20}
          onPress={() => uploadImage(images)}
        /> */}
        {/*} <IconButton
          icon="camera"
          iconColor={MD3Colors.error50}
          size={20}
          onPress={() => uploadImage(item)}
        /> */}
      </View>
    );
  }

  const addToFiles = async () => {
    if (images) {
      FileArray(images);
    }
  };

  useEffect(() => {
    // console.log(fileUploads);
    loadingImages();
    uploadImage(images);
  }, [images]);

  // const renderItem = ({ item }) => {
  //   //console.log(item);
  //   const filename = item.split("/").pop();
  //   return (
  //     <View
  //       style={{
  //         flexDirection: "row",
  //         margin: 1,
  //         alignItems: "center",
  //         gap: 5,
  //       }}
  //     >
  //       <Image source={{ uri: item }} style={{ width: 350, height: 100 }} />
  //       {/* <Text>{filename}</Text> */}
  //       <IconButton
  //         icon="close"
  //         iconColor={MD3Colors.error50}
  //         size={20}
  //         onPress={() => deleteImage(item)}
  //       />
  //       {/*} <IconButton
  //         icon="camera"
  //         iconColor={MD3Colors.error50}
  //         size={20}
  //         onPress={() => uploadImage(item)}
  //       /> */}
  //     </View>
  //   );
  // };

  return (
    <>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 4,
          }}
        >
          <View
            style={{
              width: 180,
              height: 180,
              marginBottom: 0,
              borderRadius: "100rem",
              backgroundColor: colors.darkInfo,
            }}
          >
            {attachments}
            <AddButton
              style={{
                borderColor: "transparent",
                marginLeft: 12,
                position: "absolute",
                top: 2,
                right: 2,
              }}
              iconColor={colors.light}
              backgroundColor={colors.darkTwo}
              icon="close"
              mode="outlined"
              size={22}
              onPress={() => clearFiles()}
            ></AddButton>
          </View>
        </View>
        <View
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full border-1 border border-solid border-gray-300 rounded-lg cursor-pointer bg-white light:hover:bg-white dark:bg-white hover:bg-gray-500 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-light"
        >
          {/* <View class="flex flex-col items-center justify-center pt-3 pb-3">
            {/* <Text class="mb-2 text-sm">Click to upload</Text>
            <Text class="text-xs">PDF, PNG, JPG or GIF</Text> 
          </View> */}
          {/* <TextInput
            id="dropzone-file"
            type="file"
            class="hidden"
            onChange={(e) => handleFileRead(e.target.files[0])}
          /> */}

          {/* <Button title="Choose from Device" onPress={() => selectImage(true)}>
            Add meal image
          </Button> */}
          <Button
            style={{
              borderColor: colors.darkTwo,
              right: "auto",
              margin: "auto",
            }}
            mode="contained"
            iconColor={colors.light}
            backgroundColor={colors.darkTwo}
            size={16}
            buttonColor="transparent"
            onPress={() => selectImage(true)}
          >
            Edit profile image
          </Button>
          {/* <Spacer position="top" size="large" /> */}
          {/* <Button title="Choose from Device" onPress={() => selectImage(false)}>
            Take photo
          </Button> */}
        </View>
      </View>
    </>
  );
};
