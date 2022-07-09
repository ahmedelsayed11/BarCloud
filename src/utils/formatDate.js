export const formatDate = passedDate => {
  const date = new Date(passedDate);
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let year = date.getFullYear();
  let time = formatAMPM(passedDate);

  let finalDate = `${day}.${month}.${year} - ${time}`;

  return finalDate;
};

function formatAMPM(date) {
  let tempDate = new Date(date);

  var hours = tempDate.getHours();
  var minutes = tempDate.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ampm;
  return strTime;
}
