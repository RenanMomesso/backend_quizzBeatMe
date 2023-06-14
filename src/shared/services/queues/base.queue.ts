import * as Queue from 'bull';
import Logger from 'bunyan';
import {
  ExpressAdapter,
  createBullBoard,
  BullAdapter,
} from '@bull-board/express';
import { config } from '@root/config';
import { IAuthJob } from '@auth/interfaces/auth.interface';

type IBaseJobData = IAuthJob;
let bullAdapters: BullAdapter[] = [];

export let serverAdapter: ExpressAdapter;

export abstract class BaseQueue {
  queue: Queue.Queue;
  log: Logger;

  constructor(queueName: string) {
    this.queue = new Queue.default(queueName, `${config.REDIS_HOST}`);
    bullAdapters.push(new BullAdapter(this.queue));
    bullAdapters = [...new Set(bullAdapters)];
    serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath('/queues');

    createBullBoard({
      queues: bullAdapters,
      serverAdapter,
    });

    this.log = config.createLogger(`bull:${queueName}`);

    this.queue.on('completed', (job: Queue.Job) => {
      console.log('------------------> completed job');
      job.remove();
    });

    this.queue.on('global:completed', (jobId: string) => {
      console.log('------------------> global:completed');
      this.log.info(`Job with id ${jobId} has been completed`);
    });

    this.queue.on('global:stalled', (jobId: string) => {
      console.log('------------------> global:stalled');
      this.log.info(`Job with id ${jobId} has been stalled`);
    });
  }

  protected addJob(name: string, data: IBaseJobData): void {
    this.queue.add(name, data, {
      attempts: 3,
      backoff: {
        type: 'fixed',
        delay: 5000,
      },
    });
  }

  protected processJob(
    name: string,
    concurrency: number,
    callBack: Queue.ProcessCallbackFunction<void>
  ): void {
    this.queue.process(name, concurrency, callBack);
  }
}
