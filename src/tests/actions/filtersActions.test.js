import moment from 'moment';
import { 
  setTextFilter, 
  sortByDate, 
  sortByAmount, 
  setStartDate, 
  setEndDate 
} from '../../actions/filtersActions';

test("should generate text filter action with PROVIDED value", () => {
  const text = setTextFilter('Rent');
  expect(text).toEqual({ 
    type: "SET_TEXT_FILTER", 
    text: "Rent"
  })
});

test("should generate text filter action with DEFAULT value", () => {
  expect(setTextFilter()).toEqual({
    type: "SET_TEXT_FILTER", 
    text: ''
  })
});

test("should generate sort by date filter action", () => {
  expect(sortByDate()).toEqual({ type: "SORT_BY_DATE"})
});

test("should generate sort by amount filter action", () => {
  expect(sortByAmount()).toEqual({ type: "SORT_BY_AMOUNT" })
});

test("should generate set start date filter action", () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: "SET_START_DATE",
    date: moment(0)
  })
});

test("should generate set end date filter action", () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: "SET_END_DATE",
    date: moment(0)
  })
});