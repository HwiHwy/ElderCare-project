import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import searchStyle from "./search.style";
import { AppBar, ReusedText, reuse } from "../../components";
import { useNavigation } from "@react-navigation/native";

import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { COLORS, SIZES } from "../../constants";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";
import { SEARCH_RESULT_SCREEN } from "../../constants/nameRoute";

const Search = () => {
  const [selectedTimeshift, setSelectedTimeshift] = useState([]);

  const navigation = useNavigation();
  const ageData = [
    {
      label: "20-25(tuổi)",
      value: "20-25",
      search: "20-25",
    },
    {
      label: "25-30(tuổi)",
      value: "25-30",
      search: "25-30",
    },
    {
      label: "30-35(tuổi)",
      value: "30-35",
      search: "30-35",
    },
    {
      label: "35-40(tuổi)",
      value: "35-40",
      search: "35-40",
    },
  ];
  const timeShilf = [
    {
      label: "Part time",
      value: "Parttime",
      search: "Part time",
    },
    {
      label: "Full Time",
      value: "FullTime",
      search: "Full Time",
    },
  ];
  const genderOptions = [
    {
      label: "Nam",
      value: "Male",
      search: "Nam",
    },
    {
      label: "Nữ",
      value: "Female",
      search: "Nữ",
    },
  ];
  const data = [
    {
      label: "Khả năng nấu nướng Món chay",
      value: "Món chay (Vegetarian dishes)",
      search: "Món chay (Vegetarian dishes)",
    },
    {
      label: "Khả năng nấu nướng Món B/T/N ",
      value: "Món B/T/N (Meat/Fish/Vegetables)",
      search: "Món B/T/N (Meat/Fish/Vegetables)",
    },
    {
      label: "Khả năng dọn dẹp nhà ",
      value: "Housekeeping",
      search: "Housekeeping",
    },
    {
      label: "Khả năng vệ sinh cho người cao tuổi Mất khả năng tự chủ",
      value: "Loss of autonomy",
      search: "Loss of autonomy",
    },
    {
      label: "Khả năng vệ sinh cho người cao tuổi Còn khả năng tự chủ  ",
      value: "Still autonomous",
      search: "Still autonomous",
    },
    {
      label: "Khả năng massage, xoa bóp, bấm huyệt  ",
      value:
        " Khả năng massage, xoa bóp, bấm huyệt (Massage, rubbing, acupressure)",
      search:
        "Khả năng massage, xoa bóp, bấm huyệt (Massage, rubbing, acupressure)",
    },
    {
      label: "Khả năng ngoại ngữ ",
      value: " Khả năng ngoại ngữ (Language proficiency)",
      search: "Khả năng ngoại ngữ (Language proficiency)",
    },
    {
      label: "Y tá",
      value: "Nurse",
      search: "Y tá",
    },
    {
      label: "Điều dưỡng ",
      value: "Caregiver",
      search: "Điều dưỡng ",
    },
    {
      label: "Dược sĩ",
      value: "Pharmacist",
      search: "Dược sĩ",
    },
    {
      label: "Bác sĩ",
      value: "Doctor",
      search: "Bác sĩ",
    },
    {
      label: "Khả năng làm vườn",
      value: "Gardening",
      search: "Khả năng làm vườn",
    },
    {
      label: "Khả năng ca hát, chơi nhạc cụ",
      value: "Singing",
      search: "Khả năng ca hát, chơi nhạc cụ",
    },
    {
      label: "Khả năng chơi cờ vua, cờ tướng",
      value: "Chess",
      search: "Khả năng chơi cờ vua, cờ tướng",
    },
    {
      label: "Khả năng tâm sự, trò chuyện",
      value: "Communication",
      search: "Khả năng tâm sự, trò chuyệng",
    },
    ...genderOptions,
    ...timeShilf,
    ...ageData,
  ];

  const locationData = [
    {
      label: "Huyện Bình Chánh",
      value: "Huyện Bình Chánh",
      search: "Huyện Bình Chánh",
    },
    {
      label: "Huyện Cần Giờ",
      value: "Huyện Cần Giờ",
      search: "Huyện Cần Giờ",
    },
    {
      label: "Huyện Củ Chi",
      value: "Huyện Củ Chi",
      search: "Huyện Củ Chi",
    },
    {
      label: "Huyện Hóc Môn",
      value: "Huyện Hóc Môn",
      search: "Huyện Hóc Môn",
    },
    {
      label: "Huyện Nhà Bè",
      value: "Huyện Nhà Bè",
      search: "Huyện Nhà Bè",
    },
    {
      label: "Quận 1",
      value: "Quận 1",
      search: "Quận 1",
    },
    {
      label: "Quận 11",
      value: "Quận 11",
      search: "Quận 11",
    },
    {
      label: "Quận 12",
      value: "Quận 12",
      search: "Quận 12",
    },
    {
      label: "Quận 3",
      value: "Quận 3",
      search: "Quận 3",
    },
    {
      label: "Quận 4",
      value: "Quận 4",
      search: "Quận 4",
    },
    {
      label: "Quận 5",
      value: "Quận 5",
      search: "Quận 5",
    },
    {
      label: "Quận 6",
      value: "Quận 6",
      search: "Quận 6",
    },
    {
      label: "Quận 7",
      value: "Quận 7",
      search: "Quận 7",
    },
    {
      label: "Quận 8",
      value: "Quận 8",
      search: "Quận 8",
    },
    {
      label: "Quận Bình Thạnh",
      value: "Quận Bình Thạnh",
      search: "Quận Bình Thạnh",
    },
    {
      label: "Quận Tân Bình",
      value: "Quận Tân Bình",
      search: "Quận Tân Bình",
    },
    {
      label: "Quận Gò Vấp",
      value: "Quận Gò Vấp",
      search: "Quận Gò Vấp",
    },
    {
      label: "Quận Phú Nhuận",
      value: "Quận Phú Nhuận",
      search: "Quận Phú Nhuận",
    },

    {
      label: "Quận Tân Phú",
      value: "Quận Tân Phú",
      search: "Quận Tân Phú",
    },
    {
      label: "Thành phố Thủ Đức",
      value: "Thành phố Thủ Đức",
      search: "Thành phố Thủ Đức",
    },
  ];

  const [selected, setSelected] = useState([]);
  const onSelectAll = (isSelectAll = true) => {
    const selectItem = [];
    if (isSelectAll) {
      data.map((item) => {
        selectItem.push(item.value);
      });
    }
    setSelected(selectItem);
  };
  const renderItem = (item) => {
    const isSelectedItem = selected.includes(item.value);

    return (
      <TouchableOpacity onPress={() => onSelectItem(item)}>
        <View
          style={
            isSelectedItem
              ? searchStyle.selectedStyleSelected
              : searchStyle.selectedStyle
          }
        >
          <Text style={searchStyle.textSelectedStyle}>{item.label}</Text>
          {/* <AntDesign style={searchStyle.icon} name="Safety" size={20} /> */}
        </View>
      </TouchableOpacity>
    );
  };
  const onSelectItem = (item) => {
    if (selected.includes(item.value)) {
      setSelected(selected.filter((value) => value !== item.value));
    } else {
      setSelected([...selected, item.value]);
    }
  };

  const renderSelectAllIcon = () => {
    const isSelectAll = selected.length === data.length;
    return (
      <TouchableOpacity
        style={searchStyle.wrapSelectAll}
        onPress={() => onSelectAll(!isSelectAll)}
      >
        <Text style={searchStyle.txtSelectAll}>
          {isSelectAll ? `UnSelect All` : "Select All"}
        </Text>
      </TouchableOpacity>
    );
  };

  const [location, setlocation] = useState([]);

  const onSelectAllLocation = (isSelectAll = true) => {
    const selectItemLocation = [];
    if (isSelectAll) {
      locationData.map((item) => {
        selectItemLocation.push(item.value);
      });
    }
    setlocation(selectItemLocation);
  };
  const renderItemLocation = (item) => {
    const isSelectedItem = location.includes(item.value);

    return (
      <TouchableOpacity onPress={() => onSelectItemLocation(item)}>
        <View
          style={
            isSelectedItem
              ? searchStyle.selectedStyleSelected
              : searchStyle.selectedStyle
          }
        >
          <Text style={searchStyle.textSelectedStyle}>{item.label}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const onSelectItemLocation = (item) => {
    if (location.includes(item.value)) {
      setlocation(location.filter((value) => value !== item.value));
    } else {
      setlocation([...location, item.value.trim()]);
    }
  };

  const renderSelectAllIconLocation = () => {
    const isSelectAllLocation = location.length === locationData.length;
    return (
      <TouchableOpacity
        style={searchStyle.wrapSelectAll}
        onPress={() => onSelectAllLocation(!isSelectAllLocation)}
      >
        <Text style={searchStyle.txtSelectAll}>
          {isSelectAllLocation ? `UnSelect All` : "Select All"}
        </Text>
      </TouchableOpacity>
    );
  };

  // //////////////////////////

  const handleSearch = () => {
    navigation.navigate(SEARCH_RESULT_SCREEN);

    const genderSelected = selected.filter(
      (item) => item === "Male" || item === "Female"
    );

    const timeShiftSelected = selected.filter(
      (item) => item === "Parttime" || item === "FullTime"
    );
    const abilitiesLogData = {
      selectedItems: selected.filter(
        (item) =>
          !genderOptions.some((genderItem) => genderItem.value === item) &&
          !timeShilf.some((timeShiftItem) => timeShiftItem.value === item) &&
          !ageData.some((ageItem) => ageItem.value === item)
      ),
    };

    const ageSelected = selected.filter((item) =>
      ageData.some((ageItem) => ageItem.value === item)
    );
    console.log("Năng lực", abilitiesLogData);
    console.log("Khu vực", location);
    console.log("Giới tính", genderSelected);
    console.log("timeShiftSelected", timeShiftSelected);
    console.log("Tuổi", ageSelected);
  };


  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <ScrollView>
        <View style={searchStyle.wrapper}>
          <StatusBar style="auto" />
          <View style={reuse.textMid("center")}>
            <AppBar backIcon={true} onPress={() => navigation.goBack()} />
            <ReusedText
              text={"Tìm Kiếm"}
              color={COLORS.primary}
              size={SIZES.xLarge}
              family={"bold"}
            ></ReusedText>
          </View>
          <MultiSelect
            style={searchStyle.dropdown}
            placeholderStyle={searchStyle.placeholderStyle}
            selectedTextStyle={searchStyle.selectedTextStyle}
            iconStyle={searchStyle.iconStyle}
            backgroundColor={"rgba(0,0,0,0.2)"}
            maxHeight={450}
            data={locationData}
            mode="auto"
            containerStyle={searchStyle.ContainerStyle}
            labelField="label"
            valueField="value"
            placeholder="Tìm người chăm sóc theo khu vực"
            value={location}
            search
            searchPlaceholder="Search..."
            onChange={(item) => {
              setlocation(item);
            }}
            renderItem={renderItemLocation}
            renderSelectedItem={(item, unSelect) => (
              <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                <View style={searchStyle.selectedStyle}>
                  <Text style={searchStyle.textSelectedStyle}>
                    {item.label}
                  </Text>
                  <AntDesign style={searchStyle.icon} name="home" size={20} />
                </View>
              </TouchableOpacity>
            )}
            renderLeftIcon={() => (
              <AntDesign style={searchStyle.icon} name="rocket1" size={20} />
            )}
            flatListProps={{ ListHeaderComponent: renderSelectAllIconLocation }}
          />

          <MultiSelect
            style={searchStyle.dropdownAbility}
            placeholderStyle={searchStyle.placeholderStyle}
            selectedTextStyle={searchStyle.selectedTextStyle}
            iconStyle={searchStyle.iconStyle}
            backgroundColor={"rgba(0,0,0,0.2)"}
            inverted
            mode="modal"
            containerStyle={searchStyle.ContainerStyle}
            data={data}
            labelField="label"
            valueField="value"
            placeholder="Năng Lực Chung (General Abilities)"
            value={selected}
            // search
            // searchPlaceholder="Search..."
            onChange={(item) => {
              setSelected(item);
            }}
            renderItem={renderItem}
            renderSelectedItem={(item, unSelect) => (
              <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                <View style={searchStyle.selectedStyle}>
                  <Text style={searchStyle.textSelectedStyle}>
                    {item.label}
                  </Text>
                  <AntDesign style={searchStyle.icon} name="Safety" size={20} />
                </View>
              </TouchableOpacity>
            )}
            renderLeftIcon={() => (
              <AntDesign style={searchStyle.icon} name="rocket1" size={20} />
            )}
            flatListProps={{ ListHeaderComponent: renderSelectAllIcon }}
          />
        </View>
      </ScrollView>
      <TouchableOpacity style={searchStyle.submitButton} onPress={handleSearch}>
        <Text style={searchStyle.submitButtonText}>Tìm</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Search;
