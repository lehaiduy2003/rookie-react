import MockAdapter from "axios-mock-adapter";
import api from "@/configs/axios";
import RatingService from "@/apis/RatingService";

const mock = new MockAdapter(api);

describe("RatingService", () => {
  afterEach(() => {
    mock.reset();
  });

  describe("createRating", () => {
    test("should create a rating successfully", async () => {
      const ratingData = {
        score: 5,
        comment: "Great service!",
        productId: 123,
        customerId: 321,
      };
      mock.onPost("/v1/ratings").reply(201, ratingData);

      const result = await RatingService.createRating(ratingData);
      expect(result).toEqual(ratingData);
    });

    test("should handle error when creating a rating failed", async () => {
      const ratingData = {
        score: NaN,
        comment: "Great service!",
        productId: NaN,
        customerId: 321,
      };
      mock.onPost("/v1/ratings").reply(500);

      await expect(RatingService.createRating(ratingData)).rejects.toThrow();
    });
  });
});
