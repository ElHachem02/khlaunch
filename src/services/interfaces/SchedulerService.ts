import Activity from '../../domain/entities/Activity';

export interface SchedulerService {
  addActivity(activity: Activity): Promise<Activity | null>;
  getActivities(): Promise<Activity[]>;
  removeActivity(id: string): Promise<boolean>;
  findOpenSLots(): Promise<Date[]>;
}