<script lang="ts">
  import PromptsTable from "$lib/components/PromptsTable.svelte";
  import PromptStorageService from "../solution/classes/PromptStorageService";
  import { setContext } from "svelte";
  import AddPromptDialog from "$lib/components/AddPromptDialog.svelte";

  const storageService = new PromptStorageService();
  setContext("storageService", storageService);
  let prompts = $state(storageService.prompts);
</script>

<div class="mx-8 mt-2 flex flex-col items-center justify-center gap-4" aria-label="Page container">
  <PromptsTable {prompts} />
  <AddPromptDialog bind:prompts />
</div>
