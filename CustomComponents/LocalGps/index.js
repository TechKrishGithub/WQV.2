import * as Location from 'expo-location';

export const getLocationAsync=async (East,North)=> {
  let location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;
  East(latitude.toString());
  North(longitude.toString())
}