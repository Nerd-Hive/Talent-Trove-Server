import { z } from "zod";

const jobSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title should not exceed 100 characters"),
  employmentType: z
    .string()
    .min(1, "Employment type is required")
    .max(50, "Employment type should not exceed 50 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description should not exceed 1000 characters"),
  location: z
    .string()
    .min(1, "Location is required")
    .max(200, "Location should not exceed 200 characters"),
  applicationDeadline: z.string().datetime({
    message: "Application deadline must be a valid ISO date-time string",
  }),
});

const requirementSchema = z.object({
  requirement: z
    .string()
    .min(1, "Requirement cannot be empty")
    .max(500, "Requirement should not exceed 500 characters"),
});

const salarySchema = z.object({
  minSalary: z
    .number()
    .int()
    .positive("Minimum salary must be a positive integer"),
  maxSalary: z.number(),
  currency: z
    .string()
    .length(3, "Currency must be a 3-letter ISO code (e.g., 'USD')"),
});

const tagSchema = z.object({
  tag: z
    .string()
    .min(1, "Tag cannot be empty")
    .max(100, "Tag should not exceed 100 characters"),
});

const createJobSchema = z.object({
  data: z.object({
    job: jobSchema,
    requirements: z
      .array(requirementSchema)
      .min(1, "At least one requirement is required")
      .optional(),
    salary: salarySchema.optional(),
    tags: z.array(tagSchema).optional(),
  }),
});

export default createJobSchema;

export const JobValidationSchema = {
  createJobSchema,
};
