<script lang="ts">
  import PromptsTable from "$lib/components/PromptsTable.svelte";
  import PromptStorageService from "../solution/classes/PromptStorageService";
  import { setContext } from "svelte";
  import AddPromptDialog from "$lib/components/AddPromptDialog.svelte";
  import { Input } from "$lib/components/ui/input";

  const storageService = new PromptStorageService();
  setContext("storageService", storageService);
  let prompts = $state(storageService.prompts);
  let searchTerm = $state("");
</script>

<div class="mx-8 mt-2 flex flex-col items-center justify-center gap-4" aria-label="Page container">
  <Input
    type="search"
    id="search-bar"
    placeholder="Begin typing to search..."
    bind:value={searchTerm}
    oninput={() => {
      prompts = storageService.searchPrompts(searchTerm);
    }}
    class="my-4"
  />
  <PromptsTable {prompts} />
  <AddPromptDialog bind:prompts />
</div>
