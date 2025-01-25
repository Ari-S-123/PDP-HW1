<script lang="ts">
  import * as Table from "$lib/components/ui/table/index.js";
  import { Button } from "$lib/components/ui/button";
  import { Trash } from "lucide-svelte/icons";
  import Trash2 from "lucide-svelte/icons/trash-2";
  import { getContext } from "svelte";
  import type PromptStorageService from "../../solution/classes/PromptStorageService";
  import { toast } from "svelte-sonner";
  import type ITextPrompt from "../../solution/interfaces/ITextPrompt";

  const storageService: PromptStorageService = getContext("storageService");

  interface PromptsTableProps {
    prompts: ITextPrompt[];
  }

  let { prompts }: PromptsTableProps = $props();
</script>

<div
  aria-label="You list of prompts displayed as a table"
  class="flex w-full flex-col items-center justify-center"
>
  {#if prompts.length === 0}
    <p class="text-center text-lg font-medium">No prompts to display.</p>
  {:else}
    {#if prompts.length > 1}
      <Button
        variant="destructive"
        aria-label="Removes all prompts"
        onclick={() => {
          storageService.clearPrompts();
          prompts = storageService.prompts;
          toast.success(`All prompts removed successfully.`);
        }}
        class="m-2"
      >
        <Trash2 class="mr-2 size-4" />
        Remove All Prompts
      </Button>
    {/if}
    <Table.Root>
      <Table.Caption>Your Prompts</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head>ID</Table.Head>
          <Table.Head>Model</Table.Head>
          <Table.Head>Version</Table.Head>
          <Table.Head>Date</Table.Head>
          <Table.Head>Result</Table.Head>
          <Table.Head>Type</Table.Head>
          <Table.Head>Input</Table.Head>
          <Table.Head>Output</Table.Head>
          <Table.Head>Input Attachments</Table.Head>
          <Table.Head>Output Attachments</Table.Head>
          <Table.Head>Remove</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each prompts as prompt, i (i)}
          <Table.Row>
            <!--For some reason this works even though it shouldn't...-->
            <!--This time it's Svelte complaining instead of TypeScript but again there are no runtime errors...-->
            <Table.Cell class="font-medium">{prompt._id}</Table.Cell>
            <Table.Cell>{prompt._model}</Table.Cell>
            <Table.Cell>{prompt._version}</Table.Cell>
            <Table.Cell>
              {new Date(prompt._date).toLocaleDateString()}
            </Table.Cell>
            <Table.Cell>{prompt._result}</Table.Cell>
            <Table.Cell>{prompt._type}</Table.Cell>
            <Table.Cell>
              {prompt._input || "N/A"}
            </Table.Cell>
            <Table.Cell>
              {prompt._output || "N/A"}
            </Table.Cell>
            <Table.Cell>
              {#if prompt._inputAttachments}
                {prompt._inputAttachments.map((a) => a._payload).join(", ")}
              {:else}
                N/A
              {/if}
            </Table.Cell>
            <Table.Cell>
              {#if prompt._outputAttachments}
                {prompt._outputAttachments.map((a) => a._payload).join(", ")}
              {:else}
                N/A
              {/if}
            </Table.Cell>
            <Button
              variant="destructive"
              size="icon"
              aria-label="Removes this prompt"
              onclick={() => {
                storageService.removePromptById(prompt._id);
                prompts = storageService.prompts;
                toast.success(
                  `Prompt made using ${prompt._model} version ${prompt._version} dated ${new Date(prompt._date).toLocaleDateString()} removed successfully.`
                );
              }}
              class="m-2"
            >
              <Trash class="h-6 w-6" />
            </Button>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  {/if}
</div>
