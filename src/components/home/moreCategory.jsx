import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useState } from "react";
import { Image, TouchableOpacity, View, Text, FlatList, StyleSheet } from "react-native";

const MoreCategory = ({ dataChildCatg }) => {
    const { categories = [], nameCatg = "" } = dataChildCatg;
    const [expanded, setExpanded] = useState(false);
    const [visibleCategories, setVisibleCategories] = useState([]);
    useEffect(() => {
        if (categories.length > 0) {
            setVisibleCategories(expanded ? categories : categories.slice(0, 2));
        }
    }, [expanded, categories]);
    if (!categories || categories.length === 0 || !nameCatg) {
        return null; // Không render nếu thiếu dữ liệu
    }
    const renderItem = ({ item }) => {
        return (
            <View style={styles.cardCatg}>
                <Image source={{ uri: item.image }} style={styles.imageCatg} />
                <Text style={styles.nameCatg} numberOfLines={2} ellipsizeMode='tail'>
                    {item.name}
                </Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.wrapTitle}>
                <Text style={styles.titleList}>{nameCatg}</Text>
            </View>
            <Text style={styles.textList}>Khám phá theo danh mục</Text>
            <FlatList
                data={visibleCategories}
                renderItem={renderItem}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                keyExtractor={(item) => item._id}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={{ width: "100%" }}
            />
            <TouchableOpacity
                style={styles.button}
                activeOpacity={1}
                onPress={() => setExpanded(!expanded)}
            >
                <Text style={styles.text}>
                    {expanded ?
                        "Thu gọn "
                        :
                        visibleCategories.length - 2 > 0 ?
                            `Xem thêm ${visibleCategories.length - 2} danh mục`
                            :
                            `Xem thêm danh mục`
                    }
                </Text>
                {expanded ?
                    <FontAwesomeIcon icon={faChevronUp} color="#1D4ED8" size={16} />
                    :
                    <FontAwesomeIcon icon={faChevronDown} color="#1D4ED8" size={16} />
                }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 16,
        paddingTop: 10
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
    },
    text: {
        fontSize: 14,
        fontWeight: "500",
        color: "#1D4ED8",
        marginRight: 4,
    },
    cardCatg: {
        width: "49%",
        height: 75,
        borderRadius: 5,
        // backgroundColor: "pink",
        backgroundColor: "white",
        paddingLeft: 10,
        paddingRight: 5,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        shadowColor: "black",
        elevation: 8
    },
    imageCatg: {
        height: "100%",
        width: 50,
        marginRight: 10
    },
    nameCatg: {
        fontSize: 13,
        fontWeight: "500",
        flex: 1,
    },
    titleList: {
        fontSize: 18,
        fontWeight: "700",
        marginVertical: 10,
    },
    textList: {
        fontSize: 15,
        fontWeight: "500",
        marginBottom: 15,
    },
    wrapTitle: {
        marginBottom: 14,
        borderColor: "#EEEEEE",
        borderBottomWidth: 1,
    }
});
export default MoreCategory;