import RatingService from "@/apis/RatingService";
import { RatingForm, ratingFormSchema } from "@/types/ReviewForm";
import { successToast, warningToast } from "@/utils/toastLogic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

const useRatingForm = (productId: string, userId: string) => {
  const [loading, setLoading] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);

  const form = useForm<RatingForm>({
    resolver: zodResolver(ratingFormSchema),
    mode: "onChange",
    defaultValues: {
      comment: "",
      score: 0,
      productId: Number(productId),
      customerId: Number(userId),
    },
  });

  const handleStarClick = (score: number) => {
    setSelectedRating(score);
    form.setValue("score", score);
    form.trigger("score"); // Trigger validation
  };

  const onSubmit = (data: RatingForm) => {
    setLoading(true);

    RatingService.createRating(data)
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

  return {
    form,
    loading,
    selectedRating,
    handleStarClick,
    onSubmit,
  };
};

export default useRatingForm;
