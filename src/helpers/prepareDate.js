import moment from 'moment';

export const prepareDate = (events = []) => {
    return events.map(
        e => ({
            ...e,
            start: moment(e.start).toDate(),
            end: moment(e.end).toDate()
        })
    )
}