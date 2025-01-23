<script lang="ts">
  import * as Table from "$lib/components/ui/table/index.js";
  import { Button } from "$lib/components/ui/button";
  import { Trash } from "lucide-svelte/icons";
  import type IPrompt from "../../solution/interfaces/IPrompt";
  import { getContext } from "svelte";
  import type PromptStorageService from "../../solution/classes/PromptStorageService";

  const storageService: PromptStorageService = getContext("storageService");

  interface PromptsTableProps {
    prompts: IPrompt[];
  }

  let { prompts }: PromptsTableProps = $props();
</script>

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
      <Table.Head>Attachments</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each prompts as prompt, i (i)}
      <Table.Row>
        <!--For some reason this works even though it shouldn't...-->
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
          {#if prompt._attachments}
            {prompt._attachments.map((a) => a._payload).join(", ")}
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
          }}
          class="m-2"
        >
          <Trash class="h-6 w-6" />
        </Button>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
