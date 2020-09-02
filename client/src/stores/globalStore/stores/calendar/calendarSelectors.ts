export const getCalMode = state => state.calendarReducer.calMode;

export const getIsCalOpen = state => state.calendarReducer.calMode !== "CLOSED";

export const getCalTimePeriod = state => state.calendarReducer.calTimePeriod;

export const getCalCurrentDate = state => state.calendarReducer.calCurrentDate;

export const getCalStartDate = state => state.calendarReducer.calStartDate;

export const getHoveredSegment = state => state.calendarReducer.hoveredSegment;
