describe("Dummy", () => {
  var one;
  var two;

  beforeEach(() => {
    one = 1;
    two = 2;
  });

  it("one equals 1", () => {
    expect(one).toEqual(1);
  });

  it("two does not equal 1", () => {
    expect(two).not.toEqual(1);
  });

  it("two equals 2", function() {
    expect(two).toEqual(2);
  });
});
