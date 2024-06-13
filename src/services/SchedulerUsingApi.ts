import Activity from "../domain/entities/Activity";
import { Scheduler } from '../services/interfaces/Scheduler';
import ActivityModel from "../models/ActivityModel"; // Example Sequelize model for Activity

class SchedulerService implements Scheduler {

    async findOpenSlots(): Promise<Date[]> {
        try {
            // Implement logic to find open slots in the scheduler
            return []; // Placeholder
        } catch (error) {
            console.error("Error finding open slots:", error);
            return [];
        }
    }

    async addActivity(activity: Activity): Promise<Activity | null> {
        try {
            const createdActivity = await ActivityModel.create(activity);
            return createdActivity;
        } catch (error) {
            console.error("Error adding activity:", error);
            return null;
        }
    }

    async getActivities(): Promise<Activity[]> {
        try {
            const activities = await ActivityModel.findAll();
            return activities;
        } catch (error) {
            console.error("Error fetching activities:", error);
            return [];
        }
    }

    async removeActivity(id: string): Promise<boolean> {
        try {
            const deletedCount = await ActivityModel.destroy({ where: { id } });
            return deletedCount > 0;
        } catch (error) {
            console.error("Error removing activity:", error);
            return false;
        }
    }

}

export default SchedulerService;
