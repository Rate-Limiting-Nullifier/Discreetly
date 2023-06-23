<template>
  <header>
    <nav class="navbar fixed-top navbar-dark bg-dark navbar-expand-lg">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Discreetly</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
          aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <NuxtLink to="/" class="nav-link">Home</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/chat" class="nav-link">Chat</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/login" class="nav-link">Login</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>