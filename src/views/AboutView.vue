<template>
  <div class="row justify-content-center">
    <div class="col-12 col-xl-10">
      <section class="card-tg p-4 p-md-5 mb-4">
        <div class="row align-items-center g-4">
          <div class="col-12 col-lg-8">
            <p class="text-muted-tg small mb-2">About the project</p>
            <h1 class="mb-3">TierGG helps players discover games through 
            community reviews and rankings.</h1>
            <p class="lead text-muted-tg mb-0">
              This Vue 3 application was built for COS30043 
              Interface Design and Development. It combines a game 
              catalogue, review likes, user accounts, tier lists, and 
              an admin dashboard into one responsive single-page app.
            </p>
          </div>
          <div class="col-12 col-lg-4 text-lg-end">
            <i class="bi bi-trophy-fill about-icon"></i>
          </div>
        </div>
      </section>

      <div class="row g-4 mb-4">
        <div class="col-12 col-md-4">
          <div class="card-tg p-4 h-100">
            <i class="bi bi-hand-thumbs-up fs-2 text-danger"></i>
            <h5 class="mt-3">Social reviews</h5>
            <p class="text-muted-tg mb-0">Authenticated users can like reviews, and the votes are stored persistently in the backend.</p>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="card-tg p-4 h-100">
            <i class="bi bi-shield-lock fs-2 text-danger"></i>
            <h5 class="mt-3">Admin control</h5>
            <p class="text-muted-tg mb-0">Admin users can create, edit, delete games, and remove inappropriate review content.</p>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="card-tg p-4 h-100">
            <i class="bi bi-phone fs-2 text-danger"></i>
            <h5 class="mt-3">Responsive design</h5>
            <p class="text-muted-tg mb-0">Bootstrap grid classes and mobile-first layouts keep the interface usable across screen sizes.</p>
          </div>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-12 col-lg-6">
          <div class="card-tg p-4 h-100">
            <h4 class="mb-3">Tech stack</h4>
            <ul class="text-muted-tg mb-0">
              <li>Vue 3 Composition API with component-based pages</li>
              <li>Vue Router route guards for guest, user, and admin pages</li>
              <li>Pinia for authentication state</li>
              <li>Bootstrap 5 grid and responsive utilities</li>
              <li>Axios service layer connected to a RESTful json-server backend</li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <div class="card-tg p-4 h-100">
            <h4 class="mb-3">Team areas</h4>
            <ul class="text-muted-tg mb-0">
              <li>Person 1 — Auth &amp; Profiles</li>
              <li>Person 2 — Games browse and detail pages</li>
              <li>Person 3 — Reviews and ratings</li>
              <li>Person 4 — Tier lists</li>
              <li>Person 5 — Social likes, admin dashboard, and page polish</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
