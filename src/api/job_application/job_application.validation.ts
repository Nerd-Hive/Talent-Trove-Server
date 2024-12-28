import { z } from "zod";

const createJobApplicationSchema = z.object({
  data: z.object({
    jobId: z.number(),
    coverLetter: z.string(),
  }),
});

export const JobApplicationValidationSchema = {
  createJobApplicationSchema,
};
