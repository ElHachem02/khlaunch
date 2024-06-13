import Activity from "../../domain/entities/Activity";

export interface Scheduler {
  addActivity(activity: Activity): Promise<Activity | null>;
  getActivities(): Promise<Activity[]>;
  removeActivity(id: string): Promise<boolean>;
  findOpenSlots(): Promise<Date[]>;
}