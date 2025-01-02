import { z } from "zod";

const createJobSchema = z.object({
  data: z.object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(255, "Title cannot exceed 255 characters"),
    employmentType: z
      .enum(["Full-Time", "Part-Time", "Contract", "Internship"])
      .default("Full-Time"),
    description: z.string().min(1, "Description is required"),
    location: z.string().optional(),
    applicationDeadline: z.preprocess(
      (val) => (typeof val === "string" ? new Date(val) : val),
      z.date().min(new Date(), "Application deadline must be in the future"),
    ),

    minSalary: z
      .number()
      .nonnegative("Minimum salary must be a positive number"),
    maxSalary: z.number(),
    currency: z.string().min(1, "Currency is required").default("USD"),
  }),

  tag_id: z
    .string()
    .min(1, "Tag is required")
    .max(50, "Tag cannot exceed 50 characters"),
});

export const JobValidationSchema = {
  createJobSchema,
};
