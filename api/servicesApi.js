import apiConfig from "./apiConfig";
export default function (ctx) {
  return {
    async getServices() {
      try{
        const response = await fetch(
          `${apiConfig.baseURL}/service`,
          {
            headers: apiConfig.headers,
          }
        )
        if(response.status == 401){
          window.localStorage.removeItem('access-token');
          navigateTo('/auth');
        }
        const allServices = await response.json();
        return allServices;
      }catch(error){
       console.log(`${error}: getServices()`)
       console.error(error);
      }
    },
    // async getCurrentServices() {
    //   const response = await fetch(
    //     "https://wakeapp-api.testers-site.ru/api/service",
    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("user-token")}`,
    //       },
    //     }
    //   );
    //   const allServices = await response.json();

    //   return allServices;
    // },
    async getServicesById(id, date) {
      try{
        const response = await fetch(
          `${apiConfig.baseURL}/service/${id}`,
          {
            method: "POST",
            headers: apiConfig.headers,
            body: JSON.stringify({
              "date": date
            })
          }
        );
        if(response.status == 401){
          window.localStorage.removeItem('access-token');
          navigateTo('/auth');
        }
    
        return await response.json();
      }catch(error){
        console.log(`${error}: getServicesById()`)
        console.error(error);
      }
    },
    async postServices(
      name,
      timeslotWeekday,
      priceWeekday,
      timeslotWeekend,
      priceWeekend,
      bgImage,
      shortName,
      iconImg,
      startWork,
      endWork
    ) {
      try{
        const response = await fetch(
          `${apiConfig.baseURL}/service`,
          {
            method: "POST",
            headers: apiConfig.headers,
            body: JSON.stringify({
              name: name,
              timeslot_weekday: timeslotWeekday,
              price_weekday: priceWeekday,
              timeslot_weekend: timeslotWeekend,
              price_weekend: priceWeekend,
              bg_image: bgImage,
              shortname: shortName,
              icon_img: iconImg,
              start_work: startWork,
              end_work: endWork,
            }),
          }
        );
        const createdService = await response.json();
      }catch(error){
        console.log(error);
      }
      
    },
    async patchServices(
      name,
      timeslotWeekday,
      priceWeekday,
      timeslotWeekend,
      priceWeekend,
      bgImage,
      shortName,
      iconImg,
      startWork,
      endWork
    ) {
      const response = await fetch(
        `${apiConfig.baseURL}/service`,
        {
          method: "POST",
          headers: apiConfig.headers,
          body: JSON.stringify({
            name: name,
            timeslot_weekday: timeslotWeekday,
            price_weekday: priceWeekday,
            timeslot_weekend: timeslotWeekend,
            price_weekend: priceWeekend,
            bg_image: bgImage,
            shortname: shortName,
            icon_img: iconImg,
            start_work: startWork,
            end_work: endWork,
          }),
        }
      );
      const updatedService = await response.json();
      console.log("success" + updatedService);
    },
  };
}
