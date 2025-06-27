import { z } from 'zod';
import { SirenClient, WorkflowBulkTriggerRequest } from '@trysiren/node';
import { Context } from '../configuration';
import type { Tool } from '../tools';

const triggerWorkflowBulkSchema = z.object({
  workflowName: z.string().describe('Name of the workflow to trigger'),
  data: z.record(z.any()).describe('Data to pass to the workflow'),
  notify: z.array(z.record(z.any())).describe('Array of notification configurations for bulk execution'),
});

export const triggerWorkflowBulk = async (
  sirenClient: SirenClient,
  context: Context,
  params: z.infer<typeof triggerWorkflowBulkSchema>
) => {
  try {
    const request: WorkflowBulkTriggerRequest = {
      workflowName: params.workflowName,
      data: params.data,
      notify: params.notify
    };
    
    const response = await sirenClient.workflow.triggerBulk(request);
    
    return response;
  } catch (error) {
    return 'Failed to trigger workflow bulk';
  }
};

const tool = (context: Context): Tool => ({
  method: 'trigger_workflow_bulk',
  name: 'Trigger Workflow Bulk',
  description: 'Trigger a workflow in bulk for multiple recipients',
  parameters: triggerWorkflowBulkSchema,
  actions: {
    workflows: {
      trigger: true,
    },
  },
  execute: triggerWorkflowBulk,
});

export default tool;