import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../api/auth/auth.interface";
import config from "../config";
import { CustomError, handleAsync, HttpStatus, verifyToken } from "../utils";

const auth = (...requiredRoles: TUserRole[]) => {
  return handleAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;

      if (!token) {
        throw new CustomError(
          HttpStatus.FORBIDDEN,
          "you are logged out, please login again",
        );
      }

      try {
        const decoded = verifyToken(token, config.jwt_access_secret as string);

        const role = decoded.role;
        console.log("not passed");
        if (
          requiredRoles.length > 0 &&
          !requiredRoles.includes(role as TUserRole)
        ) {
          throw new CustomError(
            HttpStatus.UNAUTHORIZED,
            "you are not authorizeds",
          );
        }

        req.user = decoded;
        console.log("passed");
        next();
      } catch (err) {
        console.log(err);
        throw new CustomError(
          HttpStatus.UNAUTHORIZED,
          "You Are Not Authorized",
        );
      }
    },
  );
};

export default auth;
