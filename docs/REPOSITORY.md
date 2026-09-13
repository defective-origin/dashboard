# [↤](../README.md) Repository
### Links
- Repository: https://github.com/defective-origin/dashboard

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
