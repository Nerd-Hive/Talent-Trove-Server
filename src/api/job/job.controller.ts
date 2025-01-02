import { eq } from "drizzle-orm";
import { db } from "../../database";
import {
  jobRequirements,
  jobs,
  jobSalaries,
  jobTags,
} from "../../database/schema";
import { handleAsync, HttpStatus } from "../../utils";
import formatedResponse from "../../utils/formatedResponse";
import { IJobRequirement, TJobTags } from "./job.type";

// **handleAsync()** utils function. This funciton handles dynamicly try().catch() blocks

const CREATE_JOB_INTO_DB = handleAsync(async (req, res) => {
  const { userId } = req.user;
  const { job, requirements, salary, tags } = req.body.data;
  console.log(req.body);
  let result;
  // Start a transaction of Drizzle ORM
  await db.transaction(async (tx) => {
    // Insert the main job details
    const [newJob] = await tx
      .insert(jobs) // Replace with your Drizzle ORM job table
      .values({
        title: job.title,
        employmentType: job.employmentType,
        description: job.description,
        createdBy: Number(userId),
        location: job.location,
        applicationDeadline: job.applicationDeadline,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning(); // Get the inserted job back

    result = newJob;
    const jobId = newJob.id;

    // Insert requirements, if provided
    if (requirements && requirements.length > 0) {
      await tx.insert(jobRequirements).values(
        requirements.map((req: IJobRequirement) => ({
          jobId,
          requirement: req.requirement,
        })),
      );
    }

    // Insert salary, if provided
    if (salary) {
      await tx.insert(jobSalaries).values({
        jobId,
        minSalary: salary.minSalary,
        maxSalary: salary.maxSalary,
        currency: salary.currency,
      });
    }

    // Insert tags, if provided
    if (tags && tags.length > 0) {
      await tx
        .insert(jobTags)
        .values(tags.map((tag: TJobTags) => ({ jobId, tag: tag.tag })));
    }
  });

  // sending response to client
  formatedResponse(res, {
    statusCode: HttpStatus.OK,
    data: result,
    message: "job post created!",
  });
});

const GET_ALL_JOBS_FROM_DB = handleAsync(async (req, res) => {
  // query all job post from database
  const result = await db.query.jobs.findMany();

  // sending response to client
  formatedResponse(res, {
    statusCode: HttpStatus.OK,
    data: result,
    message: "job posts retrived!",
  });
});

const GET_SINGLE_JOB_POST_BY_ID = handleAsync(async (req, res) => {
  // getting the router param of job post id
  const JOB_POST_ID = req.params.jobId;

  // query a single job post
  const result = await db.query.jobs.findFirst({
    where: (jobPost, { eq }) => eq(jobPost.id, Number(JOB_POST_ID)),
    with: {
      salaries: true,
      requirements: true,
      tags: true,
    },
  });

  // sending response to client
  formatedResponse(res, {
    statusCode: HttpStatus.OK,
    data: result,
    message: "job posts retrived!",
  });
});

export const JobController = {
  CREATE_JOB_INTO_DB,
  GET_ALL_JOBS_FROM_DB,
  GET_SINGLE_JOB_POST_BY_ID,
};
