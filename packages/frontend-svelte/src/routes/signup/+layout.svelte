<script lang="ts">
  import { page } from "$app/stores";
</script>

<nav class="flex justify-center my-6">
  <ul class="steps">
    <a href="/signup" class="step step-primary">Sign Up</a>
    <a
      href="/signup/gates"
      class="step"
      class:step-primary={$page.route.id?.match(/gates|ceremony|backup/g)}>
      Choose Communities
    </a>
    <a
      href="/signup/ceremony"
      class="step"
      class:step-primary={$page.route.id?.match(/ceremony|backup/g)}>
      Create Identity
    </a>
    <a
      href="/signup/backup"
      class="step"
      class:step-primary={$page.route.id?.match(/backup/g)}>
      Backup Identity
    </a>
  </ul>
</nav>

<main class="card w-4/6 bg-neutral text-neutral-content mx-auto">
  <div class="card-body items-center text-center">
    <slot />
  </div>
</main>