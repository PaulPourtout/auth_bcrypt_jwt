const { encode, compare } = require("../auth/pwd");

const baconHashed =
  "$2a$10$qD9o5y4E8EmwlPCKOzR1z.wnnIvzhyvIttq/vvCoksiuqjruVZ.pu";

test("encoded hash is defined", () => {
  return encode("bacon").then(hash => {
    console.log(hash);
    expect(hash).toBeDefined();
  });
});

test("compare return 'true' for 'bacon'", () => {
  return compare("bacon", baconHashed).then(result => {
    expect(result).toBe(true);
  });
});
