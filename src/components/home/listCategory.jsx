import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const dataCategory = [
    {
        id: 1,
        title: "Nhà sách",
        src: require(`../../assets/listCatg/catg1.png`)
    },
    {
        id: 2,
        title: "Nhà cửa - đời sống",
        src: require(`../../assets/listCatg/catg2.png`)
    },
    {
        id: 3,
        title: "Điện thoại - máy tính",
        src: require(`../../assets/listCatg/catg3.png`)
    },
    {
        id: 4,
        title: "Phụ kiện - thiết bị số",
        src: require(`../../assets/listCatg/catg4.png`)
    },
    {
        id: 5,
        title: "Điện gia dụng",
        src: require(`../../assets/listCatg/catg5.png`)
    },
    {
        id: 6,
        title: "Làm đẹp",
        src: require(`../../assets/listCatg/catg6.png`)
    },
    {
        id: 7,
        title: "Thời trang nam",
        src: require(`../../assets/listCatg/catg7.png`)
    },
    {
        id: 8,
        title: "Thời trang nữ",
        src: require(`../../assets/listCatg/catg8.png`)
    },
    {
        id: 9,
        title: "Giày - dép nam",
        src: require(`../../assets/listCatg/catg9.png`)
    },
    {
        id: 10,
        title: "Giày - dép nữ",
        src: require(`../../assets/listCatg/catg10.png`)
    },
]
const colors = ['#BFEFFF', '#FFF2D0', '#F6D2FF', '#FFEAD7', '#BCC5FF', '#CBFEFF', '#D6FFBF', '#FFEBF6', '#FFB2B2', '#D1C8FF'];


const ListCategory = () => {
    return (
        <View style={styleListCategory.LsCategoryContainer}>
            {dataCategory && dataCategory.length !== 0 && colors.length === dataCategory.length &&
                dataCategory.map((item, index) => {
                    return (
                        <View style={styleListCategory.cardCategory} key={`catg-${index}`}>
                            <TouchableOpacity >
                                <LinearGradient colors={[colors[index], '#FFFFFF']} style={styleListCategory.itemCategory}>
                                    <Image source={item.src} style={styleListCategory.imageCategory} />
                                </LinearGradient>
                            </TouchableOpacity>
                            <Text style={styleListCategory.nameCategory} numberOfLines={2}> {item.title} </Text>
                        </View>
                    )
                })
            }
        </View>
    );
}

const styleListCategory = StyleSheet.create({
    LsCategoryContainer: {
        width: "90%",
        maxHeight: 200,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 10,
        marginTop: 4,
        backgroundColor: "#FFFFFF",
        padding: 12,
        paddingBottom: 4,
        overflow: "hidden",
        overflow: "scroll"
    },
    itemCategory: {
        width: 50,
        height: 50,
        borderColor: "gray",
        borderWidth: 0.8,
        borderRadius: 7,
        marginBottom: 5,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
    },
    imageCategory: {
        width: "67%",
        height: "67%",
    },
    cardCategory: {
        justifyContent: "center",
        paddingLeft: 5,
        paddingRight: 5
    },
    nameCategory: {
        textAlign: "center",
        flexWrap: 'wrap',
        width: 50,
        fontSize: 10,
        fontWeight: "500",
        marginBottom: 8,
        height: 25
    }
})

export default ListCategory;