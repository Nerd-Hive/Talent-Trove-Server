import { eq } from "drizzle-orm";
import { db } from "../../database";
import { jobApplications } from "../../database/schema";
import { handleAsync, HttpStatus } from "../../utils";
import formatedResponse from "../../utils/formatedResponse";

// **handleAsync()** utils function. This funciton handles dynamicly try().catch() blocks
const CREATE_JOB_APPLICATION_INTO_DB = handleAsync(async (req, res) => {
  console.log("user");
  const { userId } = req.user;
  const { jobId, coverLetter } = req.body.data;

  // applied to a job
  const result = await db.insert(jobApplications).values({
    userId: Number(userId),
    jobId,
    coverLetter,
  });

  // sending response to client
  formatedResponse(res, {
    statusCode: HttpStatus.OK,
    data: result,
    message: "applied to a job!",
  });
});

const GET_ALL_JOBS_APPLICATION_BY_JOB_ID = handleAsync(async (req, res) => {
  // getting the router param of job post id
  const JOB_POST_ID = req.params.jobId;

  // query a single job post
  const result = await db.query.jobApplications.findMany({
    where: (job_application, { eq }) =>
      eq(job_application.jobId, Number(JOB_POST_ID)),
  });

  // sending response to client
  formatedResponse(res, {
    statusCode: HttpStatus.OK,
    data: result,
    message: "job application retrived by job post id!",
  });
});

const GET_ALL_APPLIED_JOB_APPLICATIONS_BY_USER_ID = handleAsync(
  async (req, res) => {
    // getting the logged in user id
    const userId = req.user.userId;
    console.log(userId);

    // query a single job post
    const result = await db.query.jobApplications.findMany({
      where: (job_application, { eq }) =>
        eq(job_application.userId, Number(userId)),
    });

    // sending response to client
    formatedResponse(res, {
      statusCode: HttpStatus.OK,
      data: result,
      message: "job applications retrived by applied user id!",
    });
  },
);

const jobApplicationStatus = {
  APPLIED: "applied",
  REVIEW: "in_review",
  INTERVIEW: "interview",
  SELECTED: "selected",
  REJECTED: "rejected",
} as const;
const JOB_APPLICATION_CHOOSE_IN_REVIEW = handleAsync(async (req, res) => {
  const { jobApplicationId } = req.params;
  // update the application status applied to in review
  const result = await db
    .update(jobApplications)
    .set({ applicationStatus: jobApplicationStatus.REVIEW })
    .where(eq(jobApplications.id, Number(jobApplicationId)));

  // sending response to client
  formatedResponse(res, {
    statusCode: HttpStatus.OK,
    data: result,
    message: "successfully reviewed to job applicant!",
  });
});

const JOB_APPLICATION_CHOOSE_ON_INTERVIEW = handleAsync(async (req, res) => {
  const { jobApplicationId } = req.params;
  // update the application status in review to interview
  const result = await db
    .update(jobApplications)
    .set({ applicationStatus: jobApplicationStatus.INTERVIEW })
    .where(eq(jobApplications.id, Number(jobApplicationId)));

  // sending response to client
  formatedResponse(res, {
    statusCode: HttpStatus.OK,
    data: result,
    message: "successfully interviewed job applicant!",
  });
});

const JOB_APPLICATION_CHOOSE_ON_SELECTED = handleAsync(async (req, res) => {
  const { jobApplicationId } = req.params;
  // update the application status in interviewed to selected
  const result = await db
    .update(jobApplications)
    .set({ applicationStatus: jobApplicationStatus.SELECTED })
    .where(eq(jobApplications.id, Number(jobApplicationId)));

  // sending response to client
  formatedResponse(res, {
    statusCode: HttpStatus.OK,
    data: result,
    message: "successfully selected!",
  });
});

const JOB_APPLICATION_REJECTED = handleAsync(async (req, res) => {
  const { jobApplicationId } = req.params;
  // update the application status in rejected
  const result = await db
    .update(jobApplications)
    .set({ applicationStatus: jobApplicationStatus.REJECTED })
    .where(eq(jobApplications.id, Number(jobApplicationId)));

  // sending response to client
  formatedResponse(res, {
    statusCode: HttpStatus.OK,
    data: result,
    message: "successfully selected!",
  });
});

export const JobApplicationController = {
  CREATE_JOB_APPLICATION_INTO_DB,
  GET_ALL_JOBS_APPLICATION_BY_JOB_ID,
  GET_ALL_APPLIED_JOB_APPLICATIONS_BY_USER_ID,
  JOB_APPLICATION_CHOOSE_IN_REVIEW,
  JOB_APPLICATION_CHOOSE_ON_INTERVIEW,
  JOB_APPLICATION_CHOOSE_ON_SELECTED,
  JOB_APPLICATION_REJECTED,
};
