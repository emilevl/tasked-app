import { UserResponse } from "./user-response";
import { TaskResponse } from "./task-response";

export type ProjectResponse = {
    id: string;
    name: string;
    active: boolean;
    description: string;
    company: string;
    tasks ?: TaskResponse[];
    author: UserResponse;
  };