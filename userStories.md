# User Stories for LeilenMateoPH (English)

---

## Epic 0 – Technical Setup

### Story 0.1 — Project Environment Setup

**User Story:**
As a **developer**, I want to set up the project environment with Vite, React 19, JavaScript, Tailwind CSS, ESLint, Prettier, and Vitest, so I have a consistent and maintainable development environment.

**Acceptance Criteria:**

* Project initialized with Vite, React 19 + JavaScript template.
* Tailwind CSS configured and working.
* ESLint and Prettier installed with standard rules.
* Vitest ready for TDD workflow.

**Definition of Done:**

* Project compiles without lint errors.
* Sample test passes with Vitest.

**Responsible Agents:** scope-rule-architect, tdd-test-first
**Priority:** High

---

### Story 0.2 — Netlify CMS Setup

**User Story:**
As a **developer/content manager**, I want Netlify CMS set up, so galleries and content can be easily maintained.

**Acceptance Criteria:**

* Netlify CMS installed and connected to Git repository.
* Content structure matches session types and subcategories.
* Admin interface allows editing previews and full galleries.

**Definition of Done:**

* Changes made in CMS reflect correctly on the site.
* User roles and permissions configured.

**Responsible Agents:** scope-rule-architect
**Priority:** High

---

### Story 0.3 — Dynamic SEO Setup

**User Story:**
As a **developer**, I want meta tags and Open Graph dynamically generated for each page, so search engines and social previews show accurate content.

**Acceptance Criteria:**

* `<title>` and `<meta description>` generated per page.
* Open Graph (`og:title`, `og:description`, `og:image`) present.
* Sitemap.xml and robots.txt generated automatically.

**Definition of Done:**

* Meta tags correct when inspecting pages.
* Sitemap accessible at `/sitemap.xml`.

**Responsible Agents:** scope-rule-architect, react-mentor
**Priority:** High

---

### Story 0.4 — Plausible Analytics Integration

**User Story:**
As a **developer**, I want to integrate Plausible Analytics, so visitor metrics are captured while respecting privacy.

**Acceptance Criteria:**

* Plausible script added to all pages.
* Metrics capture page views and key events (gallery clicks, contact CTA).
* No cookies required.

**Definition of Done:**

* Metrics visible in Plausible dashboard.
* Page load performance unaffected.

**Responsible Agents:** scope-rule-architect, react-mentor
**Priority:** High

---

## Epic 1 – Homepage

### Story 1.1 — Hero Section

**User Story:**
As a **site visitor**, I want to see a hero section with the photographer's name, so I immediately understand the purpose of the site.

**Acceptance Criteria:**

* Hero section shows the photographer's name and tagline.
* Responsive design for desktop, tablet, and mobile.

**Definition of Done:**

* Section displays correctly on all devices.

**Responsible Agents:** scope-rule-architect, tdd-test-first, react-test-implementer
**Priority:** High

---

### Story 1.2 — About the Photographer Section

**User Story:**
As a **site visitor**, I want a brief “About Me” section, to understand the photographer's experience and style.

**Acceptance Criteria:**

* Content editable via CMS.
* Includes profile image.
* Responsive layout.

**Definition of Done:**

* Section visible on **“Soy Leilen” page** and editable via CMS.

**Responsible Agents:** scope-rule-architect, react-test-implementer
**Priority:** Medium

---

## Epic 2 – Gallery System

### Story 2.1 — Gallery Index by Session Type

**User Story:**
As a **site visitor**, I want to browse galleries by session type (Editorial, Portfolio, Events, Product Photography), so I can quickly find the photo style I’m interested in.

**Acceptance Criteria:**

* Each session type has an explanatory header.
* Small preview grid visible on the index page.
* Click expands to full gallery (filter not active yet).

**Definition of Done:**

* Previews display correctly.
* Clicking preview opens expanded gallery.

**Responsible Agents:** scope-rule-architect, tdd-test-first, react-test-implementer, accessibility-auditor
**Priority:** High

---

### Story 2.2a — Expanded Gallery with Filter

**User Story:**
As a **site visitor**, I want to see the full gallery for a session type and filter by subcategory, so I can find specific photos within that category.

**Acceptance Criteria:**

* Category title and description visible.
* All photos of the category loaded in expanded gallery.
* Subcategory filter active only inside expanded gallery.

**Definition of Done:**

* Photos filtered correctly.
* Gallery is responsive and accessible.

**Responsible Agents:** scope-rule-architect, tdd-test-first, react-test-implementer, accessibility-auditor
**Priority:** High

---

### Story 2.2b — Lightbox and Photo Navigation

**User Story:**
As a **site visitor**, I want to open a photo in a lightbox and navigate between images, to inspect details comfortably.

**Acceptance Criteria:**

* Lightbox opens on photo click.
* Keyboard navigation: ESC closes, arrows navigate between photos.
* Focus trap and accessibility ensured.

**Definition of Done:**

* Lightbox functional and responsive.
* Photo navigation works correctly and is accessible.

**Responsible Agents:** tdd-test-first, react-test-implementer, accessibility-auditor
**Priority:** High

---

## Epic 3 – Contact Page + WhatsApp Integration

### Story 3.1 — Contact Form & Dynamic Message

**User Story:**
As a **site visitor**, I want to fill out a contact form and preview the WhatsApp message dynamically, to send inquiries quickly.

**Acceptance Criteria:**

* Form fields: Name, Session Type, Estimated Date (Year/Month).
* Dynamic preview updates as fields are filled.
* WhatsApp CTA opens with prefilled message.

**Definition of Done:**

* Form sends correctly to WhatsApp URL.
* Validation prevents empty fields.

**Responsible Agents:** tdd-test-first, react-test-implementer, security-auditor
**Priority:** High

---

## Epic 4 – CMS Integration

### Story 4.1 — Gallery & Preview Management

**User Story:**
As a **photographer/developer**, I want to manage galleries and previews via Netlify CMS, to update content easily and quickly.

**Acceptance Criteria:**

* CMS allows editing category headers and previews.
* Main galleries linked correctly.
* Subcategory filters configurable.

**Definition of Done:**

* CMS changes reflected on site.
* No broken links or missing images.

**Responsible Agents:** scope-rule-architect
**Priority:** High

---

## Epic 5 – SEO, Analytics & Accessibility

### Story 5.1 — Accessibility Compliance

**User Story:**
As a **site visitor**, I want the site to meet WCAG 2.1 AA standards, so it’s usable by everyone.

**Acceptance Criteria:**

* Keyboard navigation functional.
* ARIA labels added where needed.
* Color contrast adequate.

**Definition of Done:**

* Lighthouse accessibility score meets standards.
* Manual screen reader testing passed.

**Responsible Agents:** accessibility-auditor
**Priority:** High

---

### Story 5.2 — SEO & Open Graph

**User Story:**
As a **site visitor**, I want meta tags and previews correct, so pages are well represented in search engines and social media.

**Acceptance Criteria:**

* `<title>` and `<meta description>` per page.
* Open Graph tags correct and accurate.
* Sitemap.xml auto-generated.

**Definition of Done:**

* Meta tags correct on all pages.
* Social previews show correct image and description.

**Responsible Agents:** scope-rule-architect, react-mentor
**Priority:** Medium

---

### Story 5.3 — Plausible Analytics

**User Story:**
As a **developer**, I want Plausible Analytics to capture key events, to understand visitor behavior while respecting privacy.

**Acceptance Criteria:**

* Tracks page views, gallery clicks, and contact submissions.
* No cookies used.
* Script loads asynchronously for performance.

**Definition of Done:**

* Events visible in Plausible dashboard.
* Page performance unaffected.

**Responsible Agents:** scope-rule-architect, react-mentor
**Priority:** Medium

---

## Epic 6 – Future Enhancements / Multilingual Support

### Story 6.1 — Multilingual Pages

**User Story:**
As a **site visitor**, I want to switch between English and Spanish, to read content in my preferred language.

**Acceptance Criteria:**

* All content available in both languages.
* Language toggle visible and persistent across pages.
* SEO meta tags and Open Graph update based on language.

**Definition of Done:**

* Toggle changes content correctly.
* SEO and OG tags reflect chosen language.

**Responsible Agents:** scope-rule-architect, react-test-implementer
**Priority:** Low

---

## Summary Table

| ID  | Story Title                     | Responsible Agents                                           | Priority |
| --- | ------------------------------- | ------------------------------------------------------------ | -------- |
| 0.1 | Project Environment Setup       | scope-rule-architect, tdd-test-first                         | High     |
| 0.2 | Netlify CMS Setup               | scope-rule-architect                                         | High     |
| 0.3 | Dynamic SEO Setup               | scope-rule-architect, react-mentor                           | High     |
| 0.4 | Plausible Analytics Integration | scope-rule-architect, react-mentor                           | High     |
| 1.1 | Hero Section                    | scope-rule-architect, tdd-test-first, react-test-implementer | High     |
| 1.2 | About the Photographer Section  | scope-rule-architect, react-test-implementer                 | Medium   |
| 2.1 | Gallery Index by Session Type   | scope-r                                                      |          |
