import {EventsDataActions} from '../constants/eventsDataActions';

const actionCreator = (id) => ({
  type: EventsDataActions.FETCH_EVENTS_DATA,
  id,
});

export default actionCreator;