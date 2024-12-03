import Joi from "joi";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { updateCustomer } from "../../services/customerService";
import { useSelector } from "react-redux";
import { useModal } from "../../components/modelDialog";
import { useDispatch } from "react-redux";
import { actionUpdate } from "../../store/Action/authAction";
const EditInputScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const dataField = route?.params?.dataField || {};
  const [value, setValue] = useState(dataField.value || "");
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const { openModal } = useModal();
  const dataUser = useSelector((state) => state.auth.user);
  
  // Sử dụng useRef để tham chiếu đến TextInput
  const inputRef = useRef(null);

  // Tự động focus vào TextInput khi màn hình hiển thị
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleTextChange = (text) => {
    setValue(text);
    setIsSaveEnabled(text.trim().length > 0);
  };

  const clearValue = () => {
    setValue("");
    setIsSaveEnabled(false);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSave = async () => {
    // Xây dựng schema validate cho toàn bộ dữ liệu
    const updateSchema = Joi.object({
      customerName: Joi.string()
        .pattern(/^[a-zA-Z_ -]+$/)
        .optional(),
      nickName: Joi.string().optional(),
      birthDate: Joi.date().iso().less("now").greater("1900-01-01").optional(),
      nationality: Joi.string().optional(),
      avatar: Joi.string().optional(),
    });

    // Validate toàn bộ dữ liệu, không chỉ một trường
    const { error } = updateSchema.validate({ [dataField.key]: value });

    if (error) {
      // Hiển thị thông báo lỗi khi validate không thành công
      console.log(error.details[0].message);
      Alert.alert("Lỗi", error.details[0].message);
    } else {
      // Nếu không có lỗi, thực hiện cập nhật dữ liệu
      try {
        const result = await updateCustomer(
          { [dataField.key]: value, id: dataUser._id },
          dataField.key
        );
        if (result.success) {
          // Hiển thị thông báo thành công sau khi cập nhật
          dispatch(actionUpdate({ [dataField.key]: value }));
          openModal("Cập nhật thành công!", "success");
          navigation.goBack(); // Quay lại màn hình trước
        } else {
          // Xử lý nếu có lỗi từ API
          openModal(result.errors[0], "error");
        }
      } catch (error) {
        console.error(error);
        openModal(error.message, "error");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon name="arrow-left" size={30} color="#fff" style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>{dataField.label}</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>{dataField.label}</Text>
        <TextInput
          ref={inputRef} // Gán ref cho TextInput
          style={styles.input}
          value={value}
          onChangeText={handleTextChange}
          placeholder={dataField.placeholder}
        />
        {value !== "" && (
          <TouchableOpacity style={styles.clearButton} onPress={clearValue}>
            <Text style={styles.clearButtonText}>×</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.saveButton,
          isSaveEnabled ? styles.saveButtonActive : styles.saveButtonDisabled,
        ]}
        disabled={!isSaveEnabled}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    paddingTop: 36,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0099ff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: "100%",
  },
  icon: {
    color: "#fff",
    fontSize: 18,
  },
  title: {
    flex: 1,
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  formGroup: {
    width: "90%",
    marginTop: 20,
    position: "relative",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    fontSize: 16,
  },
  saveButton: {
    width: "90%",
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonActive: {
    backgroundColor: "#0099ff",
  },
  saveButtonDisabled: {
    backgroundColor: "#e0e0e0",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  clearButton: {
    height: 20,
    width: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    flexDirection: "row",
    top: "50%",
    right: 10,
    backgroundColor: "#B7B7B7",
  },
  clearButtonText: {
    fontSize: 13,
    color: "black",
  },
});

export default EditInputScreen;
