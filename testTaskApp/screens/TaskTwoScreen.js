import React, { useRef, useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue, useAnimatedReaction } from 'react-native-reanimated';

const images = [
    'https://w2g.ru/wp-content/uploads/2020/06/983279-1.jpg',
    'https://avatars.mds.yandex.net/i?id=53881489e9fadc61895e5f3f56770337_l-4865634-images-thumbs&n=13',
    'https://remlab63.ru/uploads/s/z/y/2/zy2huvqwuety/img/full_RWvdh6qv.png',
    'https://avatars.mds.yandex.net/i?id=afae96a9968fdfca48d571b54c0066d4_l-5220516-images-thumbs&n=13',
    'https://avatars.mds.yandex.net/get-mpic/5346941/img_id1271913977259450143.jpeg/orig',
    'https://avatars.mds.yandex.net/get-mpic/7653749/img_id3164577795161503604.jpeg/orig',
    'https://msk.wadoo.ru/upload/iblock/0aa/0aac9d37b38d534fb8e875cd619777f0.jpg',
];

const { width } = Dimensions.get('window');

const TaskTwoScreen = () => {
    const scrollX = useSharedValue(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    useAnimatedReaction(
        () => scrollX.value,
        (newValue) => {
            const index = Math.round(newValue / width);
            setCurrentIndex(index);
        }
    );

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                {images.map((image, index) => (
                    <Image key={index} source={{ uri: image }} style={styles.image} />
                ))}
            </Animated.ScrollView>
            <Text style={styles.indicator}>{currentIndex + 1} / {images.length}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
    },
    image: {
        width,
        height: 300,
    },
    indicator: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        fontSize: 18,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 5,
        borderRadius: 5,
    },
});

export default TaskTwoScreen;
