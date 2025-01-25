<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { getContext } from "svelte";
  import type PromptStorageService from "../../solution/classes/PromptStorageService";
  import MultiModalPrompt from "../../solution/classes/MultiModalPrompt";
  import { Trash } from "lucide-svelte/icons";
  import { nanoid } from "nanoid";
  import Attachment from "../../solution/classes/Attachment";
  import { Plus } from "lucide-svelte";
  import { toast } from "svelte-sonner";
  import type ITextPrompt from "../../solution/interfaces/ITextPrompt";
  import TextPrompt from "../../solution/classes/TextPrompt";

  const storageService: PromptStorageService = getContext("storageService");

  interface AddPromptDialogProps {
    prompts: ITextPrompt[];
  }

  let { prompts = $bindable() }: AddPromptDialogProps = $props();

  // Form fields
  let model = $state("O1");
  let version = $state("o1-2024-12-17");
  let type = $state("Text-to-Text");
  let date = $state(new Date().toISOString().split("T")[0]);
  let result = $state("Successful");
  let input = $state("hello");
  let output = $state("hi");
  let formInputAttachments: parsedAttachment[] = $state([]);
  let formOutputAttachments: parsedAttachment[] = $state([]);
  let dialogIsOpen = $state(false);
  let inputAttachmentText = $state(""); // For the new input attachment text
  let outputAttachmentText = $state(""); // For the new output attachment text

  // Error messages
  let modelError = $state("");
  let versionError = $state("");
  let typeError = $state("");
  let dateError = $state("");
  let resultError = $state("");
  let inputError = $state("");
  let outputError = $state("");
  let inputAttachmentsError = $state("");
  let outputAttachmentsError = $state("");

  interface parsedAttachment {
    id: string;
    type: string;
    filename: string;
  }

  function parseAttachment(input: string, isInput: boolean): parsedAttachment | undefined {
    try {
      const typeMatch = input.match(/type:\s*([^,]+)/);
      const filenameMatch = input.match(/filename:\s*([^,]+)/);

      if (!typeMatch || !filenameMatch) {
        throw new Error('Invalid format, Please strictly follow "type: abc, filename: xyz"');
      }

      return {
        id: nanoid(),
        type: typeMatch[1].trim(),
        filename: filenameMatch[1].trim()
      };
    } catch (error) {
      if (isInput)
        inputAttachmentsError = error + ""; // kinda dirty
      else outputAttachmentsError = error + ""; // kinda dirty
      return undefined;
    }
  }

  function addInputAttachment() {
    if (!inputAttachmentText) return;
    const newAttachment = parseAttachment(inputAttachmentText, true);
    if (newAttachment) {
      formInputAttachments = [...formInputAttachments, newAttachment];
      inputAttachmentText = ""; // Clear text after successful add
      inputAttachmentsError = "";
    } else {
      inputAttachmentsError = 'Invalid format, Please strictly follow "type: abc, filename: xyz"';
    }
  }

  function addOutputAttachment() {
    if (!outputAttachmentText) return;
    const newAttachment = parseAttachment(outputAttachmentText, false);
    if (newAttachment) {
      formOutputAttachments = [...formOutputAttachments, newAttachment];
      outputAttachmentText = ""; // Clear text after successful add
      outputAttachmentsError = "";
    } else {
      outputAttachmentsError = 'Invalid format, Please strictly follow "type: abc, filename: xyz"';
    }
  }

  function removeAttachment(id: string, isInput: boolean) {
    if (isInput) formInputAttachments = formInputAttachments.filter((a) => a.id !== id);
    else formOutputAttachments = formOutputAttachments.filter((a) => a.id !== id);
  }

  function validateForm() {
    let isValid = true;

    // Reset errors:
    modelError = "";
    versionError = "";
    typeError = "";
    dateError = "";
    resultError = "";
    inputError = "";
    outputError = "";
    inputAttachmentsError = "";
    outputAttachmentsError = "";

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
    if (!result.trim()) {
      resultError = "Result is required";
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
    let newPrompt: ITextPrompt;
    if (formInputAttachments.length > 0 || formOutputAttachments.length > 0) {
      newPrompt = new MultiModalPrompt(
        model,
        version,
        type,
        new Date(date),
        result,
        input,
        output,
        formInputAttachments.map((a) => new Attachment(a.type, a.filename)),
        formOutputAttachments.map((a) => new Attachment(a.type, a.filename))
      );
    } else {
      newPrompt = new TextPrompt(model, version, type, new Date(date), result, input, output);
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
      <Dialog.Header class="flex items-center justify-center">
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
          <Input
            id="date"
            type="date"
            bind:value={date}
            class="relative col-span-3 m-auto block cursor-pointer text-center"
          />
          {#if dateError}
            <span class="col-span-4 text-red-500">{dateError}</span>
          {/if}
        </div>

        <!-- Result field -->
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="result" class="text-right">Result</Label>
          <Input id="result" bind:value={result} class="col-span-3" />
          {#if resultError}
            <span class="col-span-4 text-red-500">{resultError}</span>
          {/if}
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

        <!-- Display existing input attachments -->
        {#each formInputAttachments as formInputAttachment (formInputAttachment.id)}
          <div class="grid grid-cols-4 items-center gap-4">
            <Label class="text-right">Input Attachments</Label>
            <div class="col-span-2 flex items-center gap-2">
              <span>Type: {formInputAttachment.type}</span>
              <span>Filename: {formInputAttachment.filename}</span>
            </div>
            <Button
              variant="destructive"
              size="icon"
              aria-label="Remove input attachment"
              onclick={() => removeAttachment(formInputAttachment.id, true)}
              class="justify-self-start"
            >
              <Trash class="h-4 w-4" />
            </Button>
          </div>
        {/each}

        <!-- Add new input attachment -->
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="input attachments" class="text-right">Input Attachments</Label>
          <div class="col-span-3 flex gap-2">
            <Input
              id="input attachments"
              bind:value={inputAttachmentText}
              placeholder="type: abc, filename: xyz"
              onkeypress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addInputAttachment();
                }
              }}
            />
            <Button size="icon" disabled={!inputAttachmentText} onclick={addInputAttachment}>
              <Plus class="h-4 w-4" />
            </Button>
          </div>
          {#if inputAttachmentsError}
            <span class="col-span-4 text-center text-red-500">{inputAttachmentsError}</span>
          {/if}
        </div>

        <!-- Display existing output attachments -->
        {#each formOutputAttachments as formOutputAttachment (formOutputAttachment.id)}
          <div class="grid grid-cols-4 items-center gap-4">
            <Label class="text-right">Output Attachment</Label>
            <div class="col-span-2 flex items-center gap-2">
              <span>Type: {formOutputAttachment.type}</span>
              <span>Filename: {formOutputAttachment.filename}</span>
            </div>
            <Button
              variant="destructive"
              size="icon"
              aria-label="Remove output attachment"
              onclick={() => removeAttachment(formOutputAttachment.id, false)}
              class="justify-self-start"
            >
              <Trash class="h-4 w-4" />
            </Button>
          </div>
        {/each}

        <!-- Add new output attachment -->
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="output attachments" class="text-right">Output Attachments</Label>
          <div class="col-span-3 flex gap-2">
            <Input
              id="output attachments"
              bind:value={outputAttachmentText}
              placeholder="type: abc, filename: xyz"
              onkeypress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addOutputAttachment();
                }
              }}
            />
            <Button size="icon" disabled={!outputAttachmentText} onclick={addOutputAttachment}>
              <Plus class="h-4 w-4" />
            </Button>
          </div>
          {#if outputAttachmentsError}
            <span class="col-span-4 text-center text-red-500">{outputAttachmentsError}</span>
          {/if}
        </div>
      </div>
      <Dialog.Footer class="m-auto">
        <Button type="submit" onclick={addPrompt}>Add Prompt</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
</div>
