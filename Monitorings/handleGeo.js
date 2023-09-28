export const handleMyData = (nameOfField, TotData, v) => {
    try {
        let filteredData;
        if (nameOfField == 'districtname') {
            const uniqueLabels = Array.from(new Set(TotData.map(item => item[nameOfField])));
            filteredData = uniqueLabels.map(item => ({ label: item }));
        }
        else if (nameOfField == 'countyname') {
            const checkData = TotData.filter(m => m.districtname == v.District);
            const uniqueLabels = Array.from(new Set(checkData.map(item => item[nameOfField])));
            filteredData = uniqueLabels.map(item => ({ label: item }));
        }
        else if (nameOfField == 'subcountyname') {
            const checkData = TotData.filter(m => m.districtname == v.District && m.countyname ==v.County );
            const uniqueLabels = Array.from(new Set(checkData.map(item => item[nameOfField])));
            filteredData = uniqueLabels.map(item => ({ label: item }));
        }
        else if (nameOfField == 'parishname') {
            const checkData = TotData.filter(m => m.districtname == v.District && m.countyname ==v.County &&  m.subcountyname ==v.SubCounty);
            const uniqueLabels = Array.from(new Set(checkData.map(item => item[nameOfField])));
            filteredData = uniqueLabels.map(item => ({ label: item }));
        }
        return filteredData;
    } catch (error) {
        console.error(error);
        return [];
    }
};
