import { getFullName, getInitials } from "@/utils/userDataFormat";

describe("test get full name", () => {
  test("test get full name", () => {
    const firstName = "john";
    const lastName = "doe";
    const result = getFullName(firstName, lastName);
    expect(result).toBe("John Doe");
  });

  test("test get initials", () => {
    const firstName = "john";
    const lastName = "doe";
    const result = getInitials(firstName, lastName);
    expect(result).toBe("JD");
  });

  test("test get initials with only first name", () => {
    const firstName = "john";
    const result = getInitials(firstName);
    expect(result).toBe("J");
  });

  test("test get initials with only last name", () => {
    const lastName = "doe";
    const result = getInitials(undefined, lastName);
    expect(result).toBe("D");
  });

  test("test get initials with no name", () => {
    const result = getInitials();
    expect(result).toBe("?");
  });

  test("test get initials with empty string", () => {
    const result = getInitials("", "");
    expect(result).toBe("?");
  });
});
