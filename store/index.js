import { defineStore, skipHydrate, storeToRefs } from "pinia";
import { useDateKit } from "@/composables/useDateKit/useDateKit";
import servicesApi from "@/api/servicesApi";
import sheduleApi from "@/api/scheduleApi";

const { generateDate } = useDateKit();
const { actualDate } = generateDate();
const { dates } = generateDate();
const generatedDates = ([...dates.entries()][0][1].numbersDate);
const { getServicesById } = servicesApi();
const { deleteScheduleById, getScheduleById } = sheduleApi();

export const useStore = defineStore("state", {
  state: () => {
    return {
      isAdmin: false,
      activeDateTab: generatedDates,
      activeServiceSelect: null, //значения в селекте сервисов
      userProfile: {}, //инфа по профилю
      services: [], //все услуги
      timeslots: [], //все слоты
      timeslotsChunks: {}, //утро - день
      bookedTime: [], //забронированные слоты
      actualSkatings: [], //все катания 
      selectSportList: [], //значения в селекте /date
      queueList: [], //таб с очередью
      weather: {
        wind: null,
        water: null,
        temp: null
      },
      queueSports: [//табы /queue
        { name: "вейк", id: 1 },
        { name: "сап", id: 3 },
        // { name: "лжк" },
        // { name: "арнд" },
      ],
      sportTab: 1, //текущий таб
      // success: false, //для админки
    };
  },
  getters: {
    getSelectedService: (state) => {
      return state.selectSportList.filter((sport) => sport.id != state.activeServiceSelect.id);
    },
    convertedBookedTimes: (state) => {
      return state.bookedTime?.map(time => {
        return `${time.date} ${time.timeslot}:00`
      })
    },
    getActualSchedule: (state) => {
      return state.queueList;
    },
    closestSkatings: (state) => {
      return state.actualSkatings.map(skating => ({time: skating.time, date: skating.date}));
    }
  },
  actions: {
    dividedArrayOnHours(state) {
      const tmp = state.map(timeslot => ({...timeslot, hour: timeslot.timeslot.split(":")[0]}));
      let grouped = tmp.reduce((acc, curr) => {
        if (!acc[curr.hour]) acc[curr.hour] = [];
        acc[curr.hour].push(curr);
        return acc;
    }, {});
      return Object.values(grouped);
    },

    divideTimeList(startItem) {
      // делим слоты на 2 части
      this.timeslotsChunks.morning = this.dividedArrayOnHours(this.timeslots).filter(hourGroup => parseInt(hourGroup[0].hour) < startItem );
      this.timeslotsChunks.day = this.dividedArrayOnHours(this.timeslots).filter(hourGroup => parseInt(hourGroup[0].hour) >= startItem);
      // сортируем слоты
      this.timeslotsChunks.morning.sort((a, b) => parseInt(a[0].hour) - parseInt(b[0].hour));
      this.timeslotsChunks.day.sort((a, b) => parseInt(a[0].hour) - parseInt(b[0].hour));
    },
    changeTab(index) {
      this.activeDateTab = index
    },

    changeSelect(item) {
      this.activeServiceSelect = item;
    },

    initActualSports() {
      this.services?.forEach((item) => {
        if (!this.selectSportList.includes(item)) {
          this.selectSportList.push(item);
        }
      });
      this.activeServiceSelect = this.selectSportList[0];
    },

  // делим таймслоты на 2 части (утро и день)
    async loadActualSchedule (){
      try {
        const response = await getServicesById(this.activeServiceSelect.id, this.activeDateTab);
        console.log(this.activeDateTab, 'activeDateTab');
        this.validateActualTimeslots(response);
      } catch (error) {
        console.log(`${error}: loadActualSchedule`)
        console.error(error);
      }
    },

    async fillQueueList (){
      try {
        const responseList = await getScheduleById(this.sportTab);
        this.queueList = responseList;
      } catch (error) {
        console.log(`${error}:fillQueueList()`);
        console.error(error);
      }
    },

    pushTime(item) {
      const idx = this.bookedTime.findIndex(val => val.timeslot == item.timeslot)
      if (idx == -1 && !item.booked){
        item.date = this.activeDateTab;
        this.bookedTime.push(item);
      } else {
        this.bookedTime = this.bookedTime.filter((obj) => obj.timeslot != item.timeslot);
      }
    },
    activeItem(value) {
      return this.bookedTime.findIndex(item => item.timeslot == value.timeslot)
    },

    createCardSkating (response) {
      const listSkatings = [];
      response.forEach(skating => {
        const date = new Date(skating.service_date);
        const day = date.getDate();
        const month = date.toLocaleString('default', {month: 'long'});
        const hours = date.getHours();
        const minutes = date.getMinutes() == '0' ? '00' : date.getMinutes();
        this.services.forEach(product => {
          if(skating.service_id == product.id){
            listSkatings.push({
              id: skating.id,
              name: product.name,
              bg_image: product.bg_image,
              date: `${day} ${month}`,
              time: `${hours}:${minutes}`
            })
          }
        })
      })
      return listSkatings;
    },
    // ??
    validateActualTimeslots(response) {
      const tmpArray = [];
      response.timeslots.forEach(time => {

        const timeSplit = time.timeslot.split(':');
        let currentTime = new Date();
        let targetTime = new Date();
        targetTime.setHours(+timeSplit[0], +timeSplit[1], 0, 0);
        targetTime.setFullYear(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());

        if(new Date(actualDate) < new Date(this.activeDateTab)){
          tmpArray.push(time)
        }
        else if(currentTime.getTime() < targetTime.getTime()){
          tmpArray.push(time)
        }
      })
      this.timeslots = tmpArray;
      this.divideTimeList(13);
    },

    async getWeatherData(){

      const runtimeConfig = useRuntimeConfig();

      const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=Брянск&appid=${runtimeConfig.OPENWEATHERMAP_API_KEY}&units=metric&lang=ru`
    
      const response = await useAsyncData('weather', () => $fetch(urlWeather));
      const weather = await response.data.value;
    
      this.weather.wind = weather.wind.speed;
      this.weather.temp = weather.main.temp;
    },

    sendForm(flag) {
      this.success = flag; // ?
    },
  },
});
