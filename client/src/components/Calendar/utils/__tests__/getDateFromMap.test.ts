import { getDateFromMap } from "@components/Calendar/utils/getDateFromMap";

describe("Transform DateMap to Date utility test", () => {

  it("Should transform a DateMap object into a Date object", () => {
    // prepare
    const dateMap = {
      YEAR: 2020,
      MONTH: 8,
      DAY: 22,
      HOUR: 12,
      MINUTE: 30,
    };

    // act
    const dateObj = getDateFromMap(dateMap);

    // assert
    expect(dateObj).toMatchObject(new Date(2020, 8, 22, 12, 30));
  });
});
