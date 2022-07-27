import { getReferenceName } from "../utility/styleUtility";

describe("Separete Key from Name", () => {
  it("Separate Simple Name", () => {
    expect(getReferenceName("Large / Super")).toEqual("large__super");
    expect(getReferenceName("Large /  Super")).toEqual("large__super");
    expect(getReferenceName("Large /Super")).toEqual("large__super");
    expect(getReferenceName("Large/Super")).toEqual("large__super");
    expect(getReferenceName("XXLarge/Super")).toEqual("xXLarge__super");
  });

  it("Lower case on first name", () => {
    expect(getReferenceName("LargeName")).toEqual("largeName");
    expect(getReferenceName("LargeName/SmallName")).toEqual(
      "largeName__smallName"
    );
  });

  it("Separate Name with space", () => {
    expect(getReferenceName("Large / Super man")).toEqual("large__super_man");
    expect(getReferenceName("Large /  Super man")).toEqual("large__super_man");
    expect(getReferenceName("Large /Super man")).toEqual("large__super_man");
    expect(getReferenceName("Large/Super man")).toEqual("large__super_man");
    expect(getReferenceName("XXLarge/Super man")).toEqual("xXLarge__super_man");
  });

  it("Separate two folder", () => {
    expect(getReferenceName("Large / Super / man")).toEqual(
      "large__super__man"
    );
    expect(getReferenceName("Large /  Super / man")).toEqual(
      "large__super__man"
    );
    expect(getReferenceName("Large /Super /man")).toEqual("large__super__man");
    expect(getReferenceName("Large/Super /man")).toEqual("large__super__man");
    expect(getReferenceName("XXLarge/Super /  man")).toEqual(
      "xXLarge__super__man"
    );
  });

  // TODO: Try add "x / / lksdjf" style to figma and check real style name
  it("Ignore Empty Foler", () => {
    expect(getReferenceName("/Large/Super /man")).toEqual("large__super__man");
    expect(getReferenceName("//Large/Super /man")).toEqual("large__super__man");
    expect(getReferenceName("///Large/Super /man")).toEqual(
      "large__super__man"
    );
    expect(getReferenceName("/ /Large/Super /man")).toEqual(
      "__large__super__man"
    );
  });
});
