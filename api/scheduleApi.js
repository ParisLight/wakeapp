import apiConfig from "./apiConfig";
export default function () {
  return {
    async getSchedule() {
      try{
        const response = await fetch(`${apiConfig.baseURL}/schedule`, {
          headers: apiConfig.headers,
        });
        const shedules = await response.json();
        return shedules;
      }catch(error){
        console.log(`${error}: getSchedule()`)
      }
    },

    async getScheduleById(id) {
      try{
        const response = await fetch(
          `${apiConfig.baseURL}/service/${id}/schedule`,
          {
            headers: apiConfig.headers,
          }
        );
        if(response.status == 401){
          window.localStorage.removeItem('access-token');
          navigateTo('/auth');
        }
        const shedules = await response.json();
  
        shedules.sort((a, b) => {
          return (
            new Date(a["service_date"]).getTime() -
            new Date(b["service_date"]).getTime()
          );
        });
  
        return shedules;
      }catch(error){
        console.log(`${error}: getScheduleById()`)
      }
    },

    async getSchedulesForUser(id) {
      try {
        const response = await fetch(
          `${apiConfig.baseURL}/user/${id}/schedule`,
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
        console.log(`${error} :getSchedulesForUser()`);
      }
    },

    async postSchedule(serviceDate, userId, isWeekend, serviceId, isPassed) {
      const response = await fetch(`${apiConfig.baseURL}/schedule`, {
        method: "POST",
        headers: apiConfig.headers,
        body: JSON.stringify({
          service_date: serviceDate,
          user_id: userId,
          is_weekend: isWeekend,
          service_id: serviceId,
          is_passed: isPassed,
        }),
      });
      if(response.status == 401){
        window.localStorage.removeItem('access-token');
        navigateTo('/auth');
      }
      const schedule = await response.json();
      return schedule;
    },

    async deleteScheduleById(id) {
      const response = await fetch(`${apiConfig.baseURL}/schedule/${id}`, {
        method: "DELETE",
        headers: apiConfig.headers,
      });
      if(response.status == 401){
        window.localStorage.removeItem('access-token');
        navigateTo('/auth');
      }
    },
  };
}
