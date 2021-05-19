import React from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {RNCamera} from 'react-native-camera';

const Camera2 = ({setIsOpen, comment, setComment, setImage, placeholder}) => {
  // const Storage = useContext(St);
  // const {setImage} = Storage;
  const takePicture = async function (camera) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    setImage(data);
    setIsOpen(false)
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        {({camera, status, recordAudioPermissionStatus}) => {
          return (
            <View>
              <TextInput style={{ marginTop: 5,
                  // marginBottom: 10,
                  width: 300,
                  height: 'auto',
                  borderRadius: 5,
                  alignSelf: 'center',
                  shadowColor: "#000",
                  backgroundColor: '#fff',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                }}
                placeholder = {placeholder}
                placeholderTextColor='rgba(44, 43, 71, 0.7)'
                value = {comment}
                onChangeText = {e=>setComment(e)}/>
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                  
                <TouchableOpacity
                  onPress={() => takePicture(camera)}
                  style={styles.capture}>
                    <Icon name="camera" size={50} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
};

export default Camera2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    alignSelf: 'center',
    margin: 20,
  },
});
