import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import ModalSelector from 'react-native-modal-selector-searchable';
import styles from './style';

const ModalSelectorCus = ({ data, initValue, onChange, mySearch, value, myBorder, myText, myIcon, disabled, sortNo }) => {
  const handleChange = React.useCallback((option) => {
    onChange(option.label);
  }, [onChange]);

  const sortedData = React.useMemo(() => {
    if (data.length > 2) {
      if (sortNo) {
        return data;
      }
      else {
        return data.slice().sort((a, b) => a.label.localeCompare(b.label));
      }

    } else {
      return data;
    }
  }, [data, sortNo]);

  const modalData = React.useMemo(
    () => sortedData.map((region, index) => ({ key: index, label: region.label })),
    [sortedData]
  );

  const lable = initValue?.replace('*', '');
  // const uniqueLabels = Array.from(new Set(modalData.map(item => item.label)));
  // console.log(uniqueLabels)

  return (
    <View>
      <ModalSelector
        data={modalData}
        initValue={initValue}
        initValueTextStyle={{ color: 'black' }}
        selectStyle={{ borderColor: 'black' }}
        selectTextStyle={{ color: 'green' }}
        onChange={handleChange}
        searchText={'Search for ' + lable + '...'}
        animationType="fade"
        scrollViewAccessibilityLabel={'Scrollable options'}
        cancelButtonAccessibilityLabel={'Cancel Button'}
        style={myBorder ? styles.border : styles.dropdownContainer}
        optionTextStyle={styles.dropdownOptionText}
        cancelStyle={styles.dropdownCancel}
        cancelTextStyle={styles.dropdownCancelText}
        searchStyle={styles.searchInput}
        searchTextStyle={styles.searchTextStyle}
        search={modalData.length > 6 ? true : false}
        optionContainerStyle={styles.optionContainerStyle}
        optionStyle={styles.optionStyle}
        disabled={disabled}
      >
        <TextInput
          style={[styles.inputCell]}
          value={value}
          mode="outlined"
          placeholder={initValue}
          outlineColor='#ccc'
          placeholderTextColor={myText ? myText : '#ccc'}
          editable={false}
          label={initValue}
          right={myIcon && <TextInput.Icon icon={() => myIcon} />}
          disabled={disabled}
        />
      </ModalSelector>
    </View>
  );
}

export default React.memo(ModalSelectorCus);
