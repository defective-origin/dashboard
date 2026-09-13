# [↤](../README.md) Repository

### Links
- Repository: https://github.com/defective-origin/dashboard

### Environments
# Software Development Environments

Software development environments (`feat/*` ➔ `dev (main)` ➔ `test` ➔ `stage` ➔ `prod`) are sequential, isolated spaces that code passes through before being released to real users. Each environment serves a specific purpose in the Software Development Life Cycle (SDLC).

---

#### 1. Dev (Development Environment)
* **Purpose:** Writing, building, and initial debugging of the code.
* **Primary Users:** Software Developers.
* **Key Features:** The code here is raw, unstable, and changes frequently. It uses synthetic or mock data. The environment is isolated, and access is usually restricted to the engineering team.

#### 2. Test (QA / Testing Environment)
* **Purpose:** Bug hunting, feature verification, and integration testing.
* **Primary Users:** QA Engineers / Testers.
* **Key Features:** Relatively stable builds or features are deployed here. The configuration mimics the production environment, but the server capacity is scaled down. It relies entirely on test data.

#### 3. Stage (Staging Environment)
* **Purpose:** Final pre-release verification and real-world simulation.
* **Primary Users:** QA Engineers, Product Owners, and clients (for demos).
* **Key Features:** An exact replica of the Production environment in terms of architecture, configuration, and data volume (often using anonymized/masked production data). This is where User Acceptance Testing (UAT) and performance/load testing take place.

#### 4. Prod (Production / Live Environment)
* **Purpose:** The actual live application running for end-users.
* **Primary Users:** End-users and customers.
* **Key Features:** High stability, strict security, and maximum uptime (SLA). Access is heavily restricted, and all changes must go through rigorous CI/CD pipelines and approval processes.


### Branching
- Types: `main` `release` `feat` `fix` `hotfix` `docs` `perf` `test` `ci` `style` `chore`
- Names: `{type}/{ticket_number}-{ticket_number}-title-branch`
```shell
git checkout -b feat/000000-000001-000002-add-scroll
```

![alt text](https://i0.wp.com/habrastorage.org/storage/4bf7e68c/49e29c35/3a01bd6b/782a1be3.png)


### Commits
- Conventional: https://www.conventionalcommits.org/en/v1.0.0/
- Unnamed tasks should have number `000000`
- Types: `feat` `fix` `hotfix` `docs` `perf` `test` `refactor` `ci` `style` `chore` 
- Pattern: `[type][ticket_number, ticket_number]: Do something`
- Message
  - Use present tense ("add feature" not "added feature")
  - Use imperative mood ("move cursor to ..." not "moves cursor to ...")
```shell
git commit -m "[feat][000000, 000001, 000002]: Add scroll"
```

#### To amend commit
```shell
# change commit message
git commit --amend -m "[feat][000000]: Add scroll"

# save previous commit message
git commit --amend --no-edit

# push commit to override previous one in repository
git push --force
```

### Merge Requests
- Merge request should be merged as `squash` and `rebased`
- Use `Rebase` instead of `Merge` to get last changes from main
#### Rebasing
```shell
git checkout branch-name
git rebase main

# If there are any merge conflicts, then fix them and write
git rebase --continue
```


![alt text](https://www.devguide.at/wp-content/uploads/2019/06/git-rebase-2.png)
