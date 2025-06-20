import { z } from 'zod';
import { SirenClient, ScheduleWorkflowRequest } from '@sirenapp/ts-sdk';
import { Context } from '../configuration';
import type { Tool } from '../tools';

const scheduleWorkflowSchema = z.object({
  name: z.string().describe('Name of the scheduled workflow'),
  workflowId: z.string().describe('ID of the workflow to schedule'),
  scheduleTime: z.string().describe('Schedule time in cron format or timestamp'),
  timezoneId: z.string().describe('Timezone ID (e.g., "America/New_York")'),
  startDate: z.string().describe('Start date in ISO 8601 format'),
  workflowType: z.string().describe('Type of workflow'),
  inputData: z.record(z.any()).describe('Input data for the workflow'),
  endDate: z.string().optional().describe('End date in ISO 8601 format'),
});

export const scheduleWorkflow = async (
  sirenClient: SirenClient,
  context: Context,
  params: z.infer<typeof scheduleWorkflowSchema>
) => {
  try {
    const request: ScheduleWorkflowRequest = {
      name: params.name,
      workflowId: params.workflowId,
      scheduleTime: params.scheduleTime,
      timezoneId: params.timezoneId,
      startDate: params.startDate,
      workflowType: params.workflowType,
      inputData: params.inputData,
      endDate: params.endDate
    };
    
    const response = await sirenClient.workflow.schedule(request);
    
    return response;
  } catch (error) {
    return 'Failed to schedule workflow';
  }
};

const tool = (context: Context): Tool => ({
  method: 'schedule_workflow',
  name: 'Schedule Workflow',
  description: 'Schedule a workflow to run at a future time (once or recurring)',
  parameters: scheduleWorkflowSchema,
  actions: {
    workflows: {
      schedule: true,
    },
  },
  execute: scheduleWorkflow,
});

export default tool;