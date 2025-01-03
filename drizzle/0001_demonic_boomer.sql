ALTER TABLE "job_requirements" ALTER COLUMN "job_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "job_tags" ALTER COLUMN "job_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "job_salaries" ALTER COLUMN "job_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "job_salaries" ALTER COLUMN "min_salary" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "job_salaries" ALTER COLUMN "min_salary" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "job_salaries" ALTER COLUMN "max_salary" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "job_salaries" ALTER COLUMN "max_salary" DROP NOT NULL;