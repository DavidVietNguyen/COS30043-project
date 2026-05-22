<template>
  <section class="not-found-wrap text-center py-5">
    <div class="card-tg p-4 p-md-5 mx-auto not-found-card">
      <i class="bi bi-joystick text-danger not-found-icon"></i>
      <h1 class="display-1 fw-bold mb-2">404</h1>
      <h2 class="h4 mb-3">This page dropped out of the lobby.</h2>
      <p class="lead text-muted-tg mb-4">
        The route you opened does not exist, or the content may have been removed by an admin.
      </p>
      <div class="d-flex flex-column flex-sm-row justify-content-center gap-2">
        <router-link to="/" class="btn btn-accent">
          <i class="bi bi-house-door me-1"></i>Back to home
        </router-link>
        <router-link to="/games" class="btn btn-outline-light">
          <i class="bi bi-search me-1"></i>Browse games
        </router-link>
      </div>
    </div>
  </section>
</template>
