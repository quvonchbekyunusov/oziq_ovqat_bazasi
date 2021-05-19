export function currentDate() {
  var monthNames = [
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER',
  ];
  var days = [' ВС ', ' ПН ', ' ВТ ', ' СР ', ' ЧТ ', ' ПТ ', ' СБ '];
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  //var mm   = monthNames[today.getMonth()];
  var yyyy = today.getFullYear();
  var day = days[today.getDay()];
  today = dd + '.' + mm + '.' + yyyy + '(' + day + ')';
  return today;
}

export function urlDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  var mmm = mm < 10 ? 0 + '' + mm : mm;
  var ddd = dd < 10 ? 0 + '' + dd : dd;
  today = yyyy + '-' + mmm + '-' + ddd;
  return today;
}
export function urlDate2() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  var mmm = mm < 10 ? 0 + '' + mm : mm;
  var ddd = dd < 10 ? 0 + '' + dd : dd;
  today = yyyy + '' + mmm + '' + ddd;
  return today;
}
export function urlDate3() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  var mmm = mm < 10 ? 0 + '' + mm : mm;
  var ddd = dd < 10 ? 0 + '' + dd : dd;
  today = ddd + '.' + mmm + '.' + yyyy;
  return today;
}

// me.GetMonthNames = function (format) {
//     var monthNames = {};

//     var curDate = new Date();
//     for (var i = 0; i < 12; ++i) {
//         monthNames[curDate.getMonth()] = curDate.toLocaleDateString('ru-RU', {
//             month: format ? format : 'long'
//         });

//         curDate.setMonth(curDate.getMonth() + 1);
//     }

//     return monthNames;
// };
export const numberWithSpaces = (props) => {
  return props?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
