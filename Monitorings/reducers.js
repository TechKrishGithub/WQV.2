// screen1Reducer.js
import { createSlice } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';


const initialState1 = {
  date: '',
  startTime: '',
  sampNo: '',
  netwkType: '',

  srcName: '',
  srcId: '',
  siteDesc: '',
  sampMatx: '',
  sampMatxOther: '',
  watType: '',
  sampDepth: '',
  catchment: '',
  subcatchment: '',
  wmz: '',
  admtvUnit: '',
  srcType: '',

  srcCat: '',

  pipedWatType: '',
  NtwkName: '',
  NtwkAdmstr: '',
  NtwkCvg: '',
  srcAbstn: '',
  tpeOfTrtmt: '',
  RsrvrCap: '',
  NoOfClients: '',
  cstPerUnit: '',
  notes: '',

  TypOfPurif: '',
  Technology: '',
  notesbtlWat: '',


  WastwaterType: '',

  WtrUsrCmty: '',
  NoOfVilgSer: '',
  notesPipe: '',
  DurationTime: '',

  CatchmentArea: '', subCatchmentCode: '', waterLevel: '', flowRate: '', length: '', width: '', numClients: '', notes: ''
};

const screen1Slice = createSlice({
  name: 'screen1',
  initialState: initialState1,
  reducers: {
    updateScreen1Data: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetScreen1Data: () => initialState1,
  },
});



const initialState2 = {
  District: '',
  County: '',
  SubCounty: '',
  Parish: '',
  Village: '',
  lat: '',
  lon: '',
  WhetherConditions: [],
  // EC: '',
  // PH: '',
  // Turb: '',
  // PAR: '',
  // Temp: ''
}

const Abstraction = { AbstractionSrc: '', MonthlyAverage: '', PermitNo: '', ExpiryDate: '', QuarterlySubmissions: '' }

const Discharge = { Discharge: '', RecepientSource: '', PermitNo: '', MonthlyAverage: '', ExpiryDate: '', QuarterlySubmissions: '' }

const IndustryDetails = { TypeofIndustry: '', RawMaterials: '', ChemicalsUsed: '', ProcessingMethods: '', FinalProducts: '', FinalWasteProducts: '', TreatementType: '' }


const initialState3 = {
  fldDup: '',
  fldRup: '',
  mySub: false,
  sampNoDup: '',

  EndTime: '',
  file: null,
  size: 3072,
  micDup: '',
  micBlank: ''
}





const screen2Slice = createSlice({
  name: 'screen2',
  initialState: initialState2,
  reducers: {
    updateScreen2Data: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetScreen2Data: () => initialState2,
    updateSelectedOptions: (state, action) => {
      state.WhetherConditions = action.payload;
    },
  },

});



const screen3Slice = createSlice({
  name: 'screen3',
  initialState: initialState3,
  reducers: {
    updateScreen3Data: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetScreen3Data: () => initialState3,
  },
});


const AbstractionSlice = createSlice({
  name: 'Abstraction',
  initialState: Abstraction,
  reducers: {
    updateAbstractionData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetAbstraction: () => Abstraction,
  },
});

const DischargeSlice = createSlice({
  name: 'Discharge',
  initialState: Discharge,
  reducers: {
    updateDischargeData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetDischarge: () => Discharge,
  },
});

const IndustryDetailsSlice = createSlice({
  name: 'IndustryDetails',
  initialState: IndustryDetails,
  reducers: {
    updateIndustryDetailsData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetIndustryDetails: () => IndustryDetails,
  },
});


export const {
  updateScreen1Data,
  resetScreen1Data,
  updateScreen2Data,
  resetScreen2Data,
  updateSelectedOptions,
  updateScreen3Data,
  resetScreen3Data,
  updateAbstractionData,
  resetAbstraction,
  updateDischargeData,
  resetDischarge,
  updateIndustryDetailsData,
  resetIndustryDetails
} = {
  ...screen1Slice.actions,
  ...screen1Slice,
  ...screen2Slice.actions,
  ...screen2Slice,
  ...screen2Slice.actions,
  ...screen3Slice.actions,
  ...screen3Slice,
  ...AbstractionSlice.actions,
  ...AbstractionSlice,
  ...DischargeSlice.actions,
  ...DischargeSlice,
  ...IndustryDetailsSlice.actions,
  ...IndustryDetailsSlice
};

export const reducers = {
  screen1: screen1Slice.reducer,
  resetScreen1Data: screen1Slice.reducer,
  screen2: screen2Slice.reducer,
  resetScreen2Data: screen2Slice.reducer,
  screen3: screen3Slice.reducer,
  resetScreen3Data: screen3Slice.reducer,
  Abstraction: AbstractionSlice.reducer,
  resetAbstraction: AbstractionSlice.reducer,
  Discharge: DischargeSlice.reducer,
  resetDischarge: DischargeSlice.reducer,
  IndustryDetails: IndustryDetailsSlice.reducer,
  resetIndustryDetails: IndustryDetailsSlice.reducer
};








const store = configureStore({
  reducer: reducers,
});

export default store;