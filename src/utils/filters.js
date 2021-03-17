import moment from 'moment'

const filters = {
  date: [
    {
      id: 'alltime',
      name: 'date',
      text: 'All time',
      value: moment()
        .subtract(7, 'years')
        .format('ddd MMM DD HH:MM:SS [UTC] YYYY'),
    },
    {
      id: 'last24hrs',
      name: 'date',
      text: 'Last 24 hours',
      value: moment()
        .subtract(1, 'days')
        .format('ddd MMM DD HH:MM:SS [UTC] YYYY'),
    },
    {
      id: 'last3days',
      name: 'date',
      text: 'Last 3 days',
      value: moment()
        .subtract(3, 'days')
        .format('ddd MMM DD HH:MM:SS [UTC] YYYY'),
    },
    {
      id: 'last7days',
      name: 'date',
      text: 'Last 7 days',
      value: moment()
        .subtract(7, 'days')
        .format('ddd MMM DD HH:MM:SS [UTC] YYYY'),
    },
  ],
  salary: [
    { id: 'any', name: 'salary', text: 'Any', from: 0, to: 9999999 },
    {
      id: '30k',
      name: 'salary',
      text: 'Of $30k',
      from: 30,
      to: 9999999,
    },
    {
      id: '80k',
      name: 'salary',
      text: 'Of $80k',
      from: 80,
      to: 9999999,
    },
    {
      id: '160k',
      name: 'salary',
      text: 'of $160k',
      from: 160,
      to: 9999999,
    },
    {
      id: 'other',
      name: 'salary',
      text: 'Other',
      from: '',
      to: '',
    },
  ],
  fullOrPartTime: [
    {
      id: 'fullOrPartTime',
      name: 'fullOrPartTime',
      text: 'Full time',
      value: 'fulltime',
    },
    {
      id: 'partTime',
      name: 'fullOrPartTime',
      text: 'Part time',
      value: 'parttime',
    },
  ],
}
export default filters
