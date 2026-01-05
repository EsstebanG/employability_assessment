# System Design - Employability Platform

## Overview
This project is a backend API for managing employability job vacancies and the application process for coders.
The system centralizes vacancies, enforces business rules, and provides role-based access control.

---

## Roles

### ADMIN
- Full access to all system resources.

### GESTOR (Employability Team)
- Create and manage job vacancies.
- Define and update maximum number of applicants.
- Activate or deactivate vacancies.
- View applications for vacancies.

### CODER
- Register and authenticate.
- View available vacancies.
- Apply to vacancies with available slots.

> Note: ADMIN and GESTOR roles are assigned exclusively via seeders.

---

## Entities

### User
Represents a system user.

- id
- name
- email (unique)
- password
- role (ADMIN | GESTOR | CODER)
- createdAt

---

### Vacancy
Represents a job vacancy.

- id
- title
- description
- technologies
- seniority
- softSkills
- location
- modality (remote | hybrid | on-site)
- salaryRange
- company
- maxApplicants
- isActive
- createdAt

---

### Application
Represents a coder's application to a vacancy.

- id
- userId
- vacancyId
- appliedAt

---

## Business Rules

1. A coder cannot apply more than once to the same vacancy.
2. Applications are not allowed when the vacancy has reached its maximum number of applicants.
3. A coder cannot have more than three active applications at the same time.
4. Only active vacancies can receive applications.
5. A coder must be authenticated to apply to a vacancy.

---

## Critical Scenarios

- Applying to a vacancy with no available slots.
- Applying twice to the same vacancy.
- Applying when the coder already has three active applications.
- Attempting to apply to an inactive or non-existent vacancy.
- Attempting to create or modify vacancies with a CODER role.
