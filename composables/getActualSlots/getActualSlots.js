export default function(slots, comparedTime){
  const tmpArray = [];
  slots.forEach(time => {
    const actualDate = new Date().getTime();

    const timeSplit = time.timeslot.split(':');
    let currentTime = new Date();
    let targetTime = new Date();
    targetTime.setHours(+timeSplit[0], +timeSplit[1], 0, 0);
    targetTime.setFullYear(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());

    if(new Date(actualDate) < new Date(comparedTime)){
      tmpArray.push(time)
    }
    else if(currentTime.getTime() < targetTime.getTime()){
      tmpArray.push(time)
    }
  })

  return tmpArray;
}