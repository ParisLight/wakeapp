import apiConfig from "./apiConfig";

export default function () {
  return {
    async getUserProfileById(id) {
      try {
        const response = await fetch(
          `${apiConfig.baseURL}/user/${id}/profile`,
          {
            headers: apiConfig.headers,
          }
        );
        if(response.status == 401){
            window.localStorage.removeItem('access-token');
            navigateTo('/auth');
          }
        const userProfile = await response.json();
        return userProfile;
      } catch (error) {
        console.error(`${error}: "getUserProfileById()`);
      }
    },
  };
}
