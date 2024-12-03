
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

const BarFilter = ({ setOrder, setSort_by, filterSelected, setFilterSelected, listFilter, typeSort, setTypeSort }) => {


    const handleSelectFilter = (item) => {
        switch (item) {
            case "Phổ biến":
                setFilterSelected(item);
                setTypeSort(0);
                setOrder("desc");
                setSort_by("favoriteCount");
                break;
            case "Bán chạy":
                setFilterSelected(item);
                setTypeSort(0);
                setOrder("desc");
                setSort_by("quantitySold");
                break;
            case "Hàng mới":
                setFilterSelected(item);
                setTypeSort(0);
                setOrder("desc");
                setSort_by("createAt");
                break;
            case "Giá":
                setFilterSelected(item);
                setTypeSort(typeSort === -1 || 0 ? 1 : -1)
                setOrder(typeSort === -1 ? "desc" : "asc");
                setSort_by("price");
                break;
            default:
                setFilterSelected(item);
                setTypeSort(0);
                setOrder("desc");
                setSort_by("favoriteCount");
                break;
        }

    }
    return (
        <View style={styles.container}>
            {listFilter.map((item, index) => (
                <View style={styles.wrap} key={`${item}-${index}`}>
                    {item === "•" ?
                        <Text style={styles.separator}>•</Text>
                        :
                        <TouchableOpacity onPress={() => handleSelectFilter(item)} style={item === "Giá" && styles.priceContainer}>
                            <Text style={item === filterSelected ? styles.activeText : styles.inactiveText}>{item}</Text>
                            {item === "Giá" && typeSort === 0 &&
                                <View style={styles.wrapArrow}>
                                    <FontAwesomeIcon icon={faArrowUp} style={styles.icon} size={14} color={"black"} />
                                    <FontAwesomeIcon icon={faArrowDown} style={styles.icon} size={14} color={"black"} />
                                </View>
                            }
                            {item === "Giá" && typeSort === 1 &&
                                <View style={styles.wrapArrow}>
                                    <FontAwesomeIcon icon={faArrowUp} style={styles.icon} size={14} color={item === filterSelected ? "#1D4ED8" : "black"} />
                                </View>
                            }
                            {item === "Giá" && typeSort === -1 &&
                                <View style={styles.wrapArrow}>
                                    <FontAwesomeIcon icon={faArrowDown} style={styles.icon} size={14} color={item === filterSelected ? "#1D4ED8" : "black"} />
                                </View>
                            }
                        </TouchableOpacity>
                    }
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "white",
        padding: 16,
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderTopWidth: 8,
        borderColor: "#EEEEEE"
    },
    activeText: {
        color: '#1D4ED8',
        fontSize: 14,
        marginRight: 4,
        fontWeight: "500"
    },
    inactiveText: {
        color: '#000000',
        marginRight: 4,
    },
    separator: {
        color: '#9CA3AF',
        fontSize: 14,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-end"
    },
    wrapArrow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        minWidth: 30
    }
});

export default BarFilter;