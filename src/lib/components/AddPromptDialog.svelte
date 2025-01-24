<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { getContext } from "svelte";
  import type PromptStorageService from "../../solution/classes/PromptStorageService";
  import { PromptResult } from "../../solution/enums";
  import type IPrompt from "../../solution/interfaces/IPrompt";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import MultiModalPrompt from "../../solution/classes/MultiModalPrompt";
  import TextPrompt from "../../solution/classes/TextPrompt";
  import { Trash } from "lucide-svelte/icons";
  import { nanoid } from "nanoid";
  import Attachment from "../../solution/classes/Attachment";
  import { Plus } from "lucide-svelte";
  import { toast } from "svelte-sonner";

  const storageService: PromptStorageService = getContext("storageService");

  interface AddPromptDialogProps {
    prompts: IPrompt[];
  }

  let { prompts = $bindable() }: AddPromptDialogProps = $props();

  // Form fields
  let model = $state("O1");
  let version = $state("o1-2024-12-17");
  let type = $state("Text-to-Text");
  let date = $state(new Date().toISOString().split("T")[0]);
  let result = $state("Success");
  let input = $state("hello");
  let output = $state("hi");
  let formAttachments: parsedAttachment[] = $state([]);
  let dialogIsOpen = $state(false);
  let attachmentInput = $state(""); // For the new attachment input

  // Error messages
  let modelError = $state("");
  let versionError = $state("");
  let typeError = $state("");
  let dateError = $state("");
  let inputError = $state("");
  let outputError = $state("");
  let attachmentsError = $state("");

  interface parsedAttachment {
    id: string;
    type: string;
    filename: string;
  }

  function parseAttachment(input: string): parsedAttachment | undefined {
    try {
      const typeMatch = input.match(/type:\s*([^,]+)/);
      const filenameMatch = input.match(/filename:\s*([^,]+)/);

      if (!typeMatch || !filenameMatch) {
        throw new Error("Invalid format");
      }

      return {
        id: nanoid(),
        type: typeMatch[1].trim(),
        filename: filenameMatch[1].trim()
      };
    } catch (error) {
      attachmentsError = error + ', Please strictly follow "type: abc, filename: xyz"';
      return undefined;
    }
  }

  function addAttachment() {
    if (!attachmentInput) return;

    const newAttachment = parseAttachment(attachmentInput);
    if (newAttachment) {
      formAttachments = [...formAttachments, newAttachment];
      attachmentInput = ""; // Clear input after successful add
      attachmentsError = "";
    }
  }

  function removeAttachment(id: string) {
    formAttachments = formAttachments.filter((a) => a.id !== id);
  }

  function validateForm() {
    let isValid = true;

    // Reset errors:
    modelError = "";
    versionError = "";
    typeError = "";
    dateError = "";
    inputError = "";
    outputError = "";
    attachmentsError = "";

    if (!model.trim()) {
      modelError = "Model is required";
      isValid = false;
    }
    if (!version.trim()) {
      versionError = "Version is required";
      isValid = false;
    }
    if (!type.trim()) {
      typeError = "Type is required";
      isValid = false;
    }
    if (!date.trim()) {
      dateError = "Date is required";
      isValid = false;
    }
    if (!input.trim()) {
      inputError = "Input is required";
      isValid = false;
    }
    if (!output.trim()) {
      outputError = "Output is required";
      isValid = false;
    }

    return isValid;
  }

  function addPrompt() {
    if (!validateForm()) {
      return;
    }

    let newPrompt: IPrompt;

    if (formAttachments.length > 0) {
      newPrompt = new MultiModalPrompt(
        model,
        version,
        type,
        new Date(date),
        result as PromptResult,
        input,
        output,
        formAttachments.map((a) => new Attachment(a.type, a.filename))
      );
    } else {
      newPrompt = new TextPrompt(
        model,
        version,
        type,
        new Date(date),
        result as PromptResult,
        input,
        output
      );
    }
    storageService.addPrompt(newPrompt);
    prompts = storageService.prompts;
    dialogIsOpen = false;
    toast.success(
      `Prompt made using ${newPrompt.model} version ${newPrompt.version} dated ${newPrompt.date.toLocaleDateString()} added successfully.`
    );
  }
</script>

<div aria-label="This dialog lets add a prompt to your list">
  <Dialog.Root bind:open={dialogIsOpen}>
    <Dialog.Trigger class={buttonVariants({ variant: "default" })}>Add Prompt</Dialog.Trigger>

    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Add Prompt</Dialog.Title>
        <Dialog.Description>Fill in the prompt details below.</Dialog.Description>
      </Dialog.Header>

      <div class="grid gap-4 py-4">
        <!-- Model field -->
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="model" class="text-right">Model</Label>
          <Input id="model" bind:value={model} class="col-span-3" />
          {#if modelError}
            <span class="col-span-4 text-red-500">{modelError}</span>
          {/if}
        </div>

        <!-- Version field -->
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="version" class="text-right">Version</Label>
          <Input id="version" bind:value={version} class="col-span-3" />
          {#if versionError}
            <span class="col-span-4 text-red-500">{versionError}</span>
          {/if}
        </div>

        <!-- Type field -->
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="type" class="text-right">Type</Label>
          <Input id="type" bind:value={type} class="col-span-3" />
          {#if typeError}
            <span class="col-span-4 text-red-500">{typeError}</span>
          {/if}
        </div>

        <!-- Date field -->
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="date" class="text-right">Date</Label>
          <!-- You can do type="date" or you can swap to a DatePicker component -->
          <Input id="date" type="date" bind:value={date} class="col-span-3" />
          {#if dateError}
            <span class="col-span-4 text-red-500">{dateError}</span>
          {/if}
        </div>

        <!-- Result field -->
        <div class="grid grid-cols-4 items-center gap-4">
          <Label class="text-right">Result</Label>
          <div class="col-span-3">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger class={buttonVariants({ variant: "outline", class: "w-full" })}>
                Result
              </DropdownMenu.Trigger>
              <DropdownMenu.Content class="max-w-[16rem] min-w-[8rem]">
                <DropdownMenu.Group>
                  <DropdownMenu.GroupHeading>Result</DropdownMenu.GroupHeading>
                  <DropdownMenu.Separator />
                  <DropdownMenu.RadioGroup bind:value={result}>
                    <DropdownMenu.RadioItem value="Success">Success</DropdownMenu.RadioItem>
                    <DropdownMenu.RadioItem value="Failure">Failure</DropdownMenu.RadioItem>
                  </DropdownMenu.RadioGroup>
                </DropdownMenu.Group>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        </div>

        <!-- Input field -->
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="input" class="text-right">Input</Label>
          <Input id="input" bind:value={input} class="col-span-3" />
          {#if inputError}
            <span class="col-span-4 text-red-500">{inputError}</span>
          {/if}
        </div>

        <!-- Output field -->
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="output" class="text-right">Output</Label>
          <Input id="output" bind:value={output} class="col-span-3" />
          {#if outputError}
            <span class="col-span-4 text-red-500">{outputError}</span>
          {/if}
        </div>

        <!-- Display existing attachments -->
        {#each formAttachments as formAttachment (formAttachment.id)}
          <div class="grid grid-cols-4 items-center gap-4">
            <Label class="text-right">Attachment</Label>
            <div class="col-span-2 flex items-center gap-2">
              <span>Type: {formAttachment.type}</span>
              <span>Filename: {formAttachment.filename}</span>
            </div>
            <Button
              variant="destructive"
              size="icon"
              aria-label="Remove attachment"
              onclick={() => removeAttachment(formAttachment.id)}
              class="justify-self-start"
            >
              <Trash class="h-4 w-4" />
            </Button>
          </div>
        {/each}

        <!-- Add new attachment -->
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="attachments" class="text-right">Attachments</Label>
          <div class="col-span-3 flex gap-2">
            <Input
              id="attachments"
              bind:value={attachmentInput}
              placeholder="type: abc, filename: xyz"
            />
            <Button size="icon" onclick={addAttachment}>
              <Plus class="h-4 w-4" />
            </Button>
          </div>
          {#if attachmentsError}
            <span class="col-span-4 text-center text-red-500">{attachmentsError}</span>
          {/if}
        </div>
      </div>

      <Dialog.Footer>
        <Button type="submit" onclick={addPrompt}>Add Prompt</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
</div>
