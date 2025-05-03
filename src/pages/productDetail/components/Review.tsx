import RatingService from "@/apis/RatingService";
import { Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ReviewForm, ReviewFormSchema } from "@/types/ReviewForm";
import { warningToast, successToast } from "@/utils/toastLogic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Star } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

const Review = ({ productId, userId }: { productId: string; userId: string }) => {
  const [loading, setLoading] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);

  const form = useForm<ReviewForm>({
    resolver: zodResolver(ReviewFormSchema),
    mode: "onChange",
    defaultValues: {
      comment: "",
      score: 0,
    },
  });

  const handleStarClick = (score: number) => {
    setSelectedRating(score);
    form.setValue("score", score);
    form.trigger("score"); // Trigger validation
  };

  const onSubmit = (data: ReviewForm) => {
    const { comment, score } = data;
    setLoading(true);

    RatingService.createRating(comment, score, productId, userId)
      .then((response) => {
        console.log("Review submitted successfully:", response);
        successToast("Review submitted", "Thank you for your feedback!");
        form.reset();
        setSelectedRating(0);
        // Optionally reload the page to show the new review
        window.location.reload();
      })
      .catch((error) => {
        console.error("Review submission failed:", error);
        const action = {
          label: "Try Again",
          onClick: () => {
            // Don't reset form on error to preserve user input
          },
        };

        if (error.response?.status === 401) {
          warningToast("Unauthorized", "Please log in to submit a review.", action);
        } else if (error.response?.status === 403) {
          warningToast("Not allowed", "You don't have permission to submit a review.", action);
        } else {
          warningToast("Submission failed", "An unexpected error occurred.", action);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-medium mb-4">Write a Review</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Star Rating */}
          <FormField
            control={form.control}
            name="score"
            render={() => (
              <FormItem>
                <FormLabel className="font-medium">Rating</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <Star
                        id={`star-${score}`}
                        key={score}
                        className={`h-8 w-8 cursor-pointer transition-colors ${
                          score <= selectedRating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 hover:text-yellow-200"
                        }`}
                        onClick={() => handleStarClick(score)}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      {selectedRating > 0 ? `${selectedRating} out of 5` : "Select a rating"}
                    </span>
                  </div>
                </FormControl>
                {form.formState.errors.score && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.score.message}</p>
                )}
              </FormItem>
            )}
          />

          {/* Comment */}
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Your Review</FormLabel>
                <FormControl>
                  <Textarea
                    id="comment"
                    placeholder="Share your experience with this product..."
                    className="resize-none min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                {form.formState.errors.comment && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.comment.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              id="btn-submit-review"
              type="submit"
              className={loading ? "opacity-70 cursor-not-allowed" : ""}
              disabled={loading || !form.formState.isValid}
            >
              {loading ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Review;
