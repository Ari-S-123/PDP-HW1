<script lang="ts">
  import "../app.css";
  import { Moon, Sun } from "lucide-svelte";
  import { resetMode, setMode, ModeWatcher } from "mode-watcher";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index";
  import { Button, buttonVariants } from "$lib/components/ui/button/index";
  import { Separator } from "$lib/components/ui/separator/index";
  import { Toaster } from "$lib/components/ui/sonner";
  import { toast } from "svelte-sonner";

  let { children } = $props();
</script>

<svelte:head>
  <title>Gen AI Prompt Tracker</title>
  <meta
    name="description"
    content="Gen AI Prompt Tracker: An app that helps you keep track of all your AI prompts."
  />
</svelte:head>

<ModeWatcher />
<Toaster />

<div class="min-h-screen transition-colors duration-300" aria-label="Root layout">
  <nav class="flex justify-between gap-4 p-4" aria-label="Top navbar">
    <div class="flex items-center justify-center gap-2" aria-label="Website heading with logo">
      <img src="favicon.png" alt="Robot logo" class="h-12 w-12" />
      <h1 class="flex items-center text-5xl font-extrabold">Gen AI Prompt Tracker</h1>
    </div>
    <div class="flex gap-4 p-4" aria-label="Nav button container">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger class={buttonVariants({ variant: "outline", size: "icon" })}>
          <Sun
            class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
          />
          <Moon
            class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
          />
          <span class="sr-only">Toggle theme</span>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group>
            <DropdownMenu.Item
              class="cursor-pointer"
              onclick={() => {
                setMode("light");
                toast.warning("🤮");
              }}
              >Light
            </DropdownMenu.Item>
            <DropdownMenu.Item
              class="cursor-pointer"
              onclick={() => {
                setMode("dark");
                toast.success("You made the right choice! 🌚");
              }}
              >Dark
            </DropdownMenu.Item>
            <DropdownMenu.Item
              class="cursor-pointer"
              onclick={() => {
                resetMode();
                toast.info("Preferences reset.");
              }}
              >System
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <Button
        target="_blank"
        rel="noreferrer noopener"
        href="https://github.com/Ari-S-123/PDP-HW1"
        size="icon"
        variant="outline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-github"
        >
          <path
            d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
          />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      </Button>
    </div>
  </nav>
  <Separator />
  {@render children?.()}
</div>
