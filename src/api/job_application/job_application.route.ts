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
router.patch(
  "/to-reviewed/:jobApplicationId",
  auth(AUTH_RULES.EMPLOYEER),
  JobApplicationController.JOB_APPLICATION_CHOOSE_IN_REVIEW,
);
router.patch(
  "/to-interviewed/:jobApplicationId",
  auth(AUTH_RULES.EMPLOYEER),
  JobApplicationController.JOB_APPLICATION_CHOOSE_ON_INTERVIEW,
);
router.patch(
  "/to-selected/:jobApplicationId",
  auth(AUTH_RULES.EMPLOYEER),
  JobApplicationController.JOB_APPLICATION_CHOOSE_ON_SELECTED,
);
router.patch(
  "/to-rejected/:jobApplicationId",
  auth(AUTH_RULES.EMPLOYEER),
  JobApplicationController.JOB_APPLICATION_REJECTED,
);

// JOB_SEEKER ACCCES
router.get(
  "/jobs/applied-jobs",
  auth(AUTH_RULES.SEEKER),
  JobApplicationController.GET_ALL_APPLIED_JOB_APPLICATIONS_BY_USER_ID,
);
router.post(
  "/apply",
  auth(AUTH_RULES.SEEKER),
  zodValidator(JobApplicationValidationSchema.createJobApplicationSchema),
  JobApplicationController.CREATE_JOB_APPLICATION_INTO_DB,
);

export { router as jobApplicationRouter };
