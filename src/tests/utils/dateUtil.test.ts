import { distanceToNow } from "@/utils/dateUtil";

describe("test dateUtil", () => {
  test("test a seconds ago", () => {
    const date = new Date();
    const result = distanceToNow(date);
    expect(result).toBe("0 seconds ago");
  });

  test("test a minutes ago", () => {
    const date = new Date();
    date.setSeconds(date.getSeconds() - 60);
    const result = distanceToNow(date);
    expect(result).toBe("1 minutes ago");
  });

  test("test an hour ago", () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 60);
    const result = distanceToNow(date);
    expect(result).toBe("1 hours ago");
  });

  test("test a day ago", () => {
    const date = new Date();
    date.setHours(date.getHours() - 24);
    const result = distanceToNow(date);
    expect(result).toBe("1 days ago");
  });

  test("test a month ago", () => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    const result = distanceToNow(date);
    expect(result).toBe("30 days ago");
  });

  test("test a year ago", () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    const result = distanceToNow(date);
    expect(result).toBe("365 days ago");
  });
});
