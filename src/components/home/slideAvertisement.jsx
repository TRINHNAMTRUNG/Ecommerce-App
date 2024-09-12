import { Image, StyleSheet } from "react-native";
import { View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useRef } from "react";
const SlideAdvertisement = ({ dataAdvertisement, isFixed }) => {
    const [indexSlide, setIndexSlide] = useState(0);
    const intervalDuration = 5000;
    const flatListRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (dataAdvertisement && dataAdvertisement.length !== 0) {
                let nextIndex = indexSlide + 1;
                if (nextIndex >= dataAdvertisement.length) {
                    nextIndex = 0;
                }
                setIndexSlide(nextIndex);
                flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
            }
        }, intervalDuration);
        //function trả về từ useEffect tự động gọi sau khi component unmount
        return () => clearInterval(interval);
    }, [indexSlide, dataAdvertisement.length]);

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50, // Có thể thay đổi nếu cần
    }).current;

    // function xử lý khi có sự thay đổi trong các item hiển thị
    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            const currentIndex = viewableItems[0].index; // Lấy index của item đầu tiên hiển thị
            setIndexSlide(currentIndex); // Cập nhật indexSlide
        }
    }).current;

    return (
        <>
            {dataAdvertisement && dataAdvertisement.length !== 0 &&
                <>
                    <View style={[stylesSlide.slide, isFixed ? stylesSlide.fixScroll : null]}>
                        <FlatList
                            ref={flatListRef}
                            data={dataAdvertisement}
                            renderItem={({ item, id }) => <Image source={item.src} style={stylesSlide.imageAdv} />}
                            keyExtractor={item => `adv-${item.id}`}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled
                            decelerationRate="fast"
                            bounces={false}
                            viewabilityConfig={viewabilityConfig}
                            onViewableItemsChanged={onViewableItemsChanged}
                            style={stylesSlide.flat}
                        />
                    </View>
                    <View style={stylesSlide.wrapSquare}>
                        {
                            dataAdvertisement.map((element, index) => {
                                return (<View key={index} style={[stylesSlide.square, index === indexSlide ? stylesSlide.activeSquare : null]} />)
                            })
                        }
                    </View>
                </>
            }
        </>
    )
}

const stylesSlide = StyleSheet.create({
    imageAdv: {
        height: "100%",
        width: 310,
        borderRadius: 10,
    },
    slide: {
        width: 310,
        height: 160,
        alignItems: "center"
    },
    fixScroll: {
        marginTop: "55%"
    },
    wrapSquare: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        marginTop: 4
    },
    square: {
        width: 20,
        height: 4,
        backgroundColor: "#808089",
        borderRadius: 10,
        marginRight: 10
    },
    activeSquare: {
        width: 35,
        backgroundColor: "#1670FF",
    }
});

export default SlideAdvertisement;