import { getMapFromDate } from "@utils/date/getMapFromDate";

describe("Create a DateMap from a Date utility test", () => {

  it("Should transform a Date object into a DateMap object", () => {

    // prepare
    const dateMap = new Date(2020, 10, 10, 12, 30);

    // act
    const dateMapObject = getMapFromDate(dateMap);

    // assert
    expect(dateMapObject).toEqual(
      expect.objectContaining({
        YEAR: 2020,
        MONTH: 10,
        DAY: 10,
        HOUR: 12,
        MINUTE: 30,
      }),
    );
  });
});
