import { Router } from "express";
import { AUTH_RULES } from "../../interface";
import auth from "../../middlewares/auth";
import zodValidator from "../../middlewares/common/zodValidation";
import { JobApplicationController } from "./job_application.controller";
import { JobApplicationValidationSchema } from "./job_application.validation";

export const router = Router();

// ALL USER ACCCES

// EMPLOYEE ACCCES
router.get(
  "/:jobId",
  auth(AUTH_RULES.EMPLOYEER),
  JobApplicationController.GET_ALL_JOBS_APPLICATION_BY_JOB_ID,
);
// JOB_SEEKER ACCCES
router.post(
  "/apply",
  auth("job_seeker"),
  zodValidator(JobApplicationValidationSchema.createJobApplicationSchema),
  JobApplicationController.CREATE_JOB_APPLICATION_INTO_DB,
);

router.get(
  "/applied-jobs",
  auth(AUTH_RULES.EMPLOYEER, AUTH_RULES.SEEKER),
  JobApplicationController.GET_ALL_APPLIED_JOB_APPLICATIONS_BY_USER_ID,
);

export { router as jobApplicationRouter };