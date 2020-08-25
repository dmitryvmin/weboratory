import {of} from 'rxjs';
import {switchMap, map, flatMap, catchError} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {ofType} from 'redux-observable';
import {EventsDataActions} from '../constants/eventsDataActions';
// import setDeckId from '../actions/set-deck-id';
// import setCards from '../actions/set-cards';
// import fetchFailure from '../actions/fetch-failure';
// import fetchCardsAction from '../actions/fetch-cards';

export function fetchEventsData(action$) {
  return action$.pipe(
    ofType(EventsDataActions.FETCH_EVENTS_DATA),
    switchMap(() =>
      ajax.getJSON('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').pipe(
        // flatMap((response) => ([setDeckId(response.deck_id), fetchCardsAction(response.deck_id)])),
        // catchError((error) => of(fetchFailure(error.message)))
      ))
  );
}
