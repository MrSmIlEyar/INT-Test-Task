import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';

const validationSchema = Yup.object().shape({
    name: Yup.string().matches(/^[а-яА-ЯёЁ]+$/, 'Имя должно содержать только кириллицу').required('Имя обязательно'),
    description: Yup.string().min(10, 'Описание должно быть не менее 10 символов').required('Описание обязательно'),
    image: Yup.mixed().required('Картинка обязательна'),
});

const TaskThreeScreen = () => {
    const [imageUri, setImageUri] = useState(null);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Разрешение на доступ к галерее не предоставлено!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const removeImage = () => {
        setImageUri(null);
    };

    return (
        <View style={styles.container}>
            <Formik
                initialValues={{ name: '', description: '', image: null }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Имя"
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                        />
                        {errors.name && touched.name && <Text style={styles.error}>{errors.name}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Описание"
                            onChangeText={handleChange('description')}
                            onBlur={handleBlur('description')}
                            value={values.description}
                        />
                        {errors.description && touched.description && <Text style={styles.error}>{errors.description}</Text>}

                        {imageUri ? (
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: imageUri }} style={styles.image} />
                                <TouchableOpacity onPress={removeImage} style={styles.removeButton}>
                                    <Text style={styles.removeButtonText}>Удалить</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.imageContainer}>
                                <TouchableOpacity style={styles.submit} onPress={pickImage}>
                                    <Text style={styles.removeButtonText}>ВЫБРАТЬ КАРТИНКУ</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        {errors.image && touched.image && <Text style={styles.error}>{errors.image}</Text>}
                        <View style={styles.imageContainer}>
                            <TouchableOpacity style={styles.submit} onPress={() => {
                                setFieldValue('image', imageUri);
                                handleSubmit();
                            }}>
                                <Text style={styles.removeButtonText}>ОТПРАВИТЬ</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    imageContainer: {
        marginBottom: 10,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    removeButton: {
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5,
    },
    removeButtonText: {
        color: 'white',
    },
    submit: {
        backgroundColor: 'blue',
        borderRadius: 5,
        margin: 15,
        width: '100%',
        padding: 5,
        alignItems: 'center',
    }
});

export default TaskThreeScreen;
