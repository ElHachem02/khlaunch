import {Request, Response} from 'express';
import Activity from '../domain/entities/Activity';
import {SchedulerService} from '../services/interfaces/SchedulerService';

export class Controller {
  constructor(private schedulerService: SchedulerService) {}

  // Public Controller Methods
  async getOpenSlots(req: Request, res: Response): Promise<void> {
    try {
      const openSlots = await this.schedulerService.findOpenSLots();
      res.status(200).send(openSlots);
    } catch (error) {
      res.status(500).send({message: `An internal occured while finding empty slots`});
    }
  }

  async addActivity(req: Request, res: Response): Promise<void> {
    try {
      const activity = new Activity(req.body);
      const newActivity = await this.schedulerService.addActivity(activity);
      res.status(201).send(newActivity);
    } catch (error) {
      res.status(500).send({message: `An internal occured while adding an activity`});
    }
  }

  // Private Controller Methods
  async getActivities(req: Request, res: Response): Promise<void> {
    try {
      const activities = await this.schedulerService.getActivities();
      res.status(200).send(activities);
    } catch (error) {
      res.status(500).send({message: `An internal occured while getting activities`});
    }
  }

  async removeActivity(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const removed = await this.schedulerService.removeActivity(id);
      res.status(200).send(removed);
    } catch (error) {
      res.status(500).send({message: `An internal occured while removing an activity`});
    }
  }
}
