import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const data = [150, 150, 200, 200, 100, 100];

const Card = ({ height, number }) => (
    <View style={[styles.card, { height }]}>
        <Text>Card {number + 1}</Text>
    </View>
);

const TaskOneScreen = () => {
    const [numColumns, setNumColumns] = useState(2);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        const cardWidth = 150;
        const newNumColumns = Math.floor(containerWidth / cardWidth);
        setNumColumns(newNumColumns);
    }, [containerWidth]);

    const renderItem = ({ item, index }) => {
        const rowIndex = Math.floor(index / numColumns);
        const maxHeight = Math.max(...data.slice(rowIndex * numColumns, (rowIndex + 1) * numColumns));
        return <Card height={maxHeight} number={index} />;
    };

    return (
        <View style={styles.container} onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width)}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                numColumns={numColumns}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                key={numColumns}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    listContainer: {
        padding: 10,
    },
    card: {
        backgroundColor: '#f0f0f0',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        shadowColor: 'gray',
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 3,
    },
});

export default TaskOneScreen;
