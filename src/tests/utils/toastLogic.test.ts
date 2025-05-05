import { successToast } from "@/utils/toastLogic";

describe("toast logic success test", () => {
  test("test success toast", () => {
    const message = "Success";
    const description = "This is a success toast";
    const action = {
      label: "Undo",
      onClick: () => {
        console.log("Undo clicked");
      },
    };
    const result = successToast(message, description, action);
    expect(result).toBeUndefined();
  });
});
