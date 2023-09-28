import { createTable } from "../DataBaseHandle";

const fields = [
  { name: 'Microbiology', fields: ['Volume of water Taken', 'Volume of Container', 'Container Type', 'Filtration', 'Preservation'] },
  { name: 'Macrobiology', fields: ['Volume of water Taken', 'Volume of Container', 'Container Type', 'Filtration', 'Preservation'] },
  { name: 'General Chemistry', fields: ['Volume of water Taken', 'Volume of Container', 'Container Type', 'Filtration', 'Preservation'] },
  { name: 'Organics', fields: ['Volume of water Taken', 'Volume of Container', 'Container Type', 'Filtration', 'Preservation'] },
  { name: 'Trace metals', fields: ['Volume of water Taken', 'Volume of Container', 'Container Type', 'Filtration', 'Preservation'] },
  { name: 'TP/TN', fields: ['Volume of water Taken', 'Volume of Container', 'Container Type', 'Filtration', 'Preservation'] },
  { name: 'COD/TOC', fields: ['Volume of water Taken', 'Volume of Container', 'Container Type', 'Filtration', 'Preservation'] },
  { name: 'FOG', fields: ['Volume of water Taken', 'Volume of Container', 'Container Type', 'Filtration', 'Preservation'] },
];

const mn2Sub = ({
  type: { mnType: '' },
  River: {},
})

const Abstraction = ({
  AbstractionSrc: '', MonthlyAverage: '', PermitNo: '', ExpiryDate: new Date(), QuarterlySubmissions: ''
})

const Discharge = ({
  Discharge: '', RecepientSource: '', PermitNo: '', MonthlyAverage: '', ExpiryDate: new Date(), QuarterlySubmissions: ''
})

const IndustryDetails = ({
  TypeofIndustry: '', RawMaterials: '', ChemicalsUsed: '', ProcessingMethods: '', FinalProducts: '', FinalWasteProducts: '', TreatementType: ''
})



const idColumn = { name: 'id', type: 'INTEGER', constrain: 'PRIMARY KEY AUTOINCREMENT' };
const mnTypeColumn = { name: 'mnType', type: 'VARCHAR' };
const sampNo = { name: 'sampNo', type: 'VARCHAR' };


export const AllTablesCreations = () => {

  const abstractionFields = Object.keys(Abstraction).map((field) => ({
    name: `Abstraction_${field}`,
    type: 'VARCHAR'
  }));

  const dischargeFields = Object.keys(Discharge).map((field) => ({
    name: `Discharge_${field}`,
    type: 'VARCHAR'
  }));

  const industryFields = Object.keys(IndustryDetails).map((field) => ({
    name: `IndustryDetails_${field}`,
    type: 'VARCHAR'
  }));

  const SampelCollection = [idColumn, mnTypeColumn, sampNo]
    .concat(
      fields.flatMap(group =>
        group.fields.map(fieldName => ({ name: `${group.name.replace('/', '_').replace(/\s+/g, '')}_${fieldName.replace(/\s+/g, '')}`, type: 'VARCHAR' }))
      )
    );

  const FirstScreenCommonFields = [{ name: 'id', type: 'INTEGER', constrain: 'PRIMARY KEY AUTOINCREMENT' }, { name: 'mnType', type: 'VARCHAR' }, { name: 'date', type: 'VARCHAR' }, { name: 'startTime', type: 'VARCHAR' }, { name: 'DurationTime', type: 'VARCHAR' }, { name: 'sampNo', type: 'VARCHAR' }, { name: 'netwkType', type: 'VARCHAR' }, { name: 'srcName', type: 'VARCHAR' }, { name: 'srcId', type: 'VARCHAR' }, { name: 'siteDesc', type: 'VARCHAR' }, { name: 'sampMatx', type: 'VARCHAR' }, { name: 'sampMatxOther', type: 'VARCHAR' }, { name: 'watType', type: 'VARCHAR' }, { name: 'sampDepth', type: 'VARCHAR' }, { name: 'catchment', type: 'VARCHAR' }, { name: 'subcatchment', type: 'VARCHAR' }, { name: 'wmz', type: 'VARCHAR' }, { name: 'admtvUnit', type: 'VARCHAR' }, { name: 'srcType', type: 'VARCHAR' }, { name: 'srcCat', type: 'VARCHAR' }, { name: 'WastwaterType' }, { type: 'VARCHAR' }];
  const DrinkingWatSubScreen1 = [{ name: 'id', type: 'INTEGER', constrain: 'PRIMARY KEY AUTOINCREMENT' }, { name: 'pipedWatType', type: 'VARCHAR' }, { name: 'srcCat', type: 'VARCHAR' }, { name: 'sampNo', type: 'VARCHAR' }, { name: 'mnType', type: 'VARCHAR' }, { name: 'TypOfPurif', type: 'VARCHAR' }, { name: 'Technology', type: 'VARCHAR' }, { name: 'notesbtlWat', type: 'VARCHAR' }, { name: 'WtrUsrCmty', type: 'VARCHAR' }, { name: 'NoOfVilgSer', type: 'VARCHAR' }, { name: 'notesPoint', type: 'VARCHAR' }, { name: 'NtwkName', type: 'VARCHAR' }, { name: 'NtwkAdmstr', type: 'VARCHAR' }, { name: 'NtwkCvg', type: 'VARCHAR' }, { name: 'srcAbstn', type: 'VARCHAR' }, { name: 'tpeOfTrtmt', type: 'VARCHAR' }, { name: 'RsrvrCap', type: 'VARCHAR' }, { name: 'NoOfClients', type: 'VARCHAR' }, { name: 'cstPerUnit', type: 'VARCHAR' }, { name: 'notesPiped', type: 'VARCHAR' }];
  const SurfaceWaterSubScreen1 = [
    { name: 'id', type: 'INTEGER', constrain: 'PRIMARY KEY AUTOINCREMENT' },
    { name: 'mnType', type: 'VARCHAR' },
    { name: 'sampNo', type: 'VARCHAR' },
    { name: 'srcCat', type: 'VARCHAR' },
    { name: 'catchment', type: 'VARCHAR' },
    { name: 'CatchmentArea', type: 'VARCHAR' },
    { name: 'subCatchment', type: 'VARCHAR' },
    { name: 'waterLevel', type: 'VARCHAR' },
    { name: 'flowRate', type: 'VARCHAR' },
    { name: 'length', type: 'VARCHAR' },
    { name: 'width', type: 'VARCHAR' },
    { name: 'notes', type: 'VARCHAR' }]


  const SecondScreen = [{ name: 'id', type: 'INTEGER', constrain: 'PRIMARY KEY AUTOINCREMENT' }, { name: 'sampNo', type: 'VARCHAR' }, { name: 'mnType', type: 'VARCHAR' }, { name: 'District', type: 'VARCHAR' }, { name: 'County', type: 'VARCHAR' }, { name: 'SubCounty', type: 'VARCHAR' }, { name: 'Parish', type: 'VARCHAR' }, { name: 'Village', type: 'VARCHAR' }, { name: 'lat', type: 'VARCHAR' }, { name: 'lon', type: 'VARCHAR' }, { name: 'WhetherConditions', type: 'VARCHAR' }, { name: 'EC', type: 'VARCHAR' }, { name: 'PH', type: 'VARCHAR' }, { name: 'Turb', type: 'VARCHAR' }, { name: 'PAR', type: 'VARCHAR' }, { name: 'Temp', type: 'VARCHAR' }];
  const WasteWaterScreen2 = [idColumn, mnTypeColumn, sampNo, ...abstractionFields, ...dischargeFields, ...industryFields];
  const Screen3 = [{ name: 'id', type: 'INTEGER', constrain: 'PRIMARY KEY AUTOINCREMENT' }, { name: 'sampNo', type: 'VARCHAR' }, { name: 'mnType', type: 'VARCHAR' }, { name: 'EndTime', type: 'VARCHAR' }, { name: 'fldDup', type: 'VARCHAR' }, { name: 'fldRup', type: 'VARCHAR' }, { name: 'sampNoDup', type: 'VARCHAR' }, { name: 'micDup', type: 'VARCHAR' }, { name: 'micBlank', type: 'VARCHAR' }, { name: 'file', type: 'BLOB' }];

  const USER_MASTER_COLUMNS = [{ name: 'id', type: 'INTEGER', constrain: 'PRIMARY KEY AUTOINCREMENT' }, { name: 'username', type: 'VARCHAR' }, { name: 'password', type: 'VARCHAR' }, { name: 'userid', type: 'INTEGER' }, { name: 'token', type: 'VARCHAR' }];

  const AreaDetails = [{ name: 'id', type: 'INTEGER', constrain: 'PRIMARY KEY AUTOINCREMENT' }, { name: 'districtname', type: 'VARCHAR' }, { name: 'countyname', type: 'VARCHAR' }, { name: 'subcountyname', type: 'VARCHAR' }, { name: 'parishname', type: 'VARCHAR' }];




  createTable('FirstScreenCommonFields', FirstScreenCommonFields);
  createTable('DrinkingWatSubScreen1', DrinkingWatSubScreen1);
  createTable('SurfaceWaterSubScreen1', SurfaceWaterSubScreen1);
  createTable('SecondScreen', SecondScreen);
  createTable('WasteWaterScreen2', WasteWaterScreen2);
  createTable('Screen3', Screen3);
  createTable('SampelCollection', SampelCollection);
  createTable('User_Master', USER_MASTER_COLUMNS);
  createTable('AreaDetails', AreaDetails);
}