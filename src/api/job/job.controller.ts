import { db } from "../../database";
import { jobs } from "../../database/schema";
import { handleAsync, HttpStatus } from "../../utils";
import formatedResponse from "../../utils/formatedResponse";

// **handleAsync()** utils function. This funciton handles dynamicly try().catch() blocks

const CREATE_JOB_INTO_DB = handleAsync(async (req, res) => {
  const { userId } = req.user;
  const { company, title, description, salaryRange, address, status } =
    req.body.data;

  // creating job post
  const result = await db.insert(jobs).values({
    company,
    title,
    createdBy: Number(userId),
    description,
    salaryRange,
    address,
  });

  // sending response to client
  formatedResponse(res, {
    statusCode: HttpStatus.OK,
    data: result,
    message: "job post created!",
  });
});

const GET_ALL_JOBS_FROM_DB = handleAsync(async (req, res) => {
  const { userId } = req.user;
  const { company, title, description, salaryRange, address, status } =
    req.body.data;

  // creating job post
  const result = await db.insert(jobs).values({
    company,
    title,
    createdBy: Number(userId),
    description,
    salaryRange,
    address,
  });

  // sending response to client
  formatedResponse(res, {
    statusCode: HttpStatus.OK,
    data: result,
    message: "job post created!",
  });
});


export const JobController = {
  CREATE_JOB_INTO_DB,
};
