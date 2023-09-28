import React from 'react';
import { View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

const YesNoDropdown = ({ value, setValue }) => {
  const data = [
    { key: '1', value: 'Yes' },
    { key: '2', value: 'No' }
  ];

  return (
      <SelectList
        setSelected={(val) => setValue(val)}
        data={data}
        save="value"
        // arrowicon={<AntDesign name="caretdown" size={10} color="black" />}
        search={false}
        boxStyles={{borderWidth:0 }}
      />
  );
};

export default YesNoDropdown;

// import React, { useState } from 'react';
// import { View, Text } from 'react-native';
// import DropdownMenu from 'react-native-dropdown-menu';

// const YesNoDropdown = () => {
//   const [text, setText] = useState('');

//   const data = [["C", "Java", "JavaScript", "PHP"], ["Python", "Ruby"], ["Swift", "Objective-C"]];

//   const handleSelection = (selection, row) => {
//     setText(data[selection][row]);
//   };

//   return (
  
//       <DropdownMenu
//         bgColor={'green'}
//         tintColor={'#666666'}
//         activityTintColor={'green'}
//         handler={handleSelection}
//         data={data}
//       >
//       </DropdownMenu>
//   );
// };

// export default YesNoDropdown;
