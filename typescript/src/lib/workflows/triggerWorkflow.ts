import { z } from 'zod';
import { SirenClient, WorkflowTriggerRequest } from '@trysiren/node';
import { Context } from '../configuration';
import type { Tool } from '../tools';

const triggerWorkflowSchema = z.object({
  workflowName: z.string().describe('Name of the workflow to trigger'),
  data: z.record(z.any()).describe('Data to pass to the workflow'),
  notify: z.record(z.any()).describe('Notification configuration'),
});

export const triggerWorkflow = async (
  sirenClient: SirenClient,
  context: Context,
  params: z.infer<typeof triggerWorkflowSchema>
) => {
  try {
    const request: WorkflowTriggerRequest = {
      workflowName: params.workflowName,
      data: params.data,
      notify: params.notify
    };
    
    const response = await sirenClient.workflow.trigger(request);
    
    return response;
  } catch (error) {
    return 'Failed to trigger workflow';
  }
};

const tool = (context: Context): Tool => ({
  method: 'trigger_workflow',
  name: 'Trigger Workflow',
  description: 'Trigger a workflow with given data and notification payloads',
  parameters: triggerWorkflowSchema,
  actions: {
    workflows: {
      trigger: true,
    },
  },
  execute: triggerWorkflow,
});

export default tool;