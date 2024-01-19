import moment from 'moment'

export default (second) => moment.utc(second * 1000).format('mm:ss')