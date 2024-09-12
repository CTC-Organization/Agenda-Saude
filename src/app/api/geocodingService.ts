const API_KEY = process.env.EXPO_PUBLIC_MAPS_KEY;

export async function getAddressFromCoordinates (latitude: string, longitude: string) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?
    latlng=${latitude},${longitude}&
    key=${API_KEY}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.status === 'OK') {
        const address = data.results[0]?.formatted_address;
        return address;
      } else {
        console.error('Erro ao obter endereço:', data.status);
        return null;
      }
    } catch (error) {
      console.error('Erro ao fazer a solicitação:', error);
      return null;
    }
  };

  export function getMapPreviewUrl(latitude: string, longitude: string) {
    const apiKey = API_KEY;
    return `https://maps.googleapis.com/maps/api/staticmap?
    center=${latitude},${longitude}&
    zoom=15&size=600x300&markers=color:red%7Clabel:A%7C
    ${latitude},${longitude}&key=${apiKey}`;
  }
  