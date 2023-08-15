import apiConfig from "./apiConfig";
export default function () {
  return {
    
    async getProfiles() {
      try{
        const response = await fetch(`${apiConfig.baseURL}/profile`, {
          headers: apiConfig.headers
        })
        if(response.status == 401){
          window.localStorage.removeItem('access-token');
          navigateTo('/auth');
        }
        const profile = await response.json();
        return profile;
      }catch(error){
        console.log(`${error}: getProfiles()`)
      }
    },

    async getProfileById(id){
      try{
        const response = await fetch(`${apiConfig.baseURL}/profile/${id}`, {
          headers: apiConfig.headers
        })
        if(response.status == 401){
          window.localStorage.removeItem('access-token');
          navigateTo('/auth');
        }
        const currentProfile = await response.json();
        return currentProfile;
      }catch(error){
        
        console.log(`${error}: getProfileById()`);
      }
    },

    async postProfile(id, pathImg){
      const response = await fetch(`https://wakeapp-api.testers-site.ru/api/profile`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({
          user_id: id,
          avatar: pathImg
        })
      })
      if(response.status == 401){
        window.localStorage.removeItem('access-token');
        navigateTo('/auth');
      }
      const profile = await response.json();
    },

    async patchProfile(id, name){
      const responseProfile = await fetch(`${apiConfig.baseURL}/profile/${id}`, {
        method: 'PATCH',
        body: {
          user_id: '',
          avatar: '',
          name: name //не хватает на бэке
        }
      })
      if(responseProfile.status == 401){
        window.localStorage.removeItem('access-token');
        navigateTo('/auth');
      }
      return await responseProfile.json();
    }
  };
}
