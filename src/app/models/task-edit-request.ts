import { UserResponse } from "./user-response";
import { ProjectResponse } from "./project-response";

export type TaskEditRequest = {
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    project: string;
    user?: UserResponse;
  };