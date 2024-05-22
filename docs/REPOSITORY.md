# [↤](../README.md) Repository
### Links
- Repository: https://github.com/defective-origin/dashboard

### Rules
- Use conventional: https://www.conventionalcommits.org/en/v1.0.0/
- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to ..." not "moves cursor to ...")
- Use Rebase instead of merge to get last changes from main
- Pull request should be merged as __squash and rebased__
- Branching: __main, release, feat, fix, hotfix, docs, perf, test, ci, style, chore__ 

### Names
- __Branch__: feat/ticket_number-ticket_number-title-branch
- __Commit__: [feat][ticket_number, ticket_number]: Do something
- __Unnamed tasks__ has number [000000]

### Branching

```shell
git checkout -b feat/000000-000001-000002-add-scroll
```

![alt text](https://i0.wp.com/habrastorage.org/storage/4bf7e68c/49e29c35/3a01bd6b/782a1be3.png)


### Commit names
```shell
git commit -m "[feat][000000, 000001, 000002]: Add scroll"
```

#### To amend commit
- Base tags: __docs, feat, fix, hotfix, perf, refactor, style__
- component view: __component | screen | page__
- component type: __markup | popup | form | action | content | table | app__
- task name [tag][000000][view][type] ComponentName + actions

```shell
git commit --amend -m "[feat][000000]: Add scroll"
```

### If commit already was pushed to repository then use flag __--force__
```shell
git push --force
```

### Rebasing
![alt text](https://res.cloudinary.com/practicaldev/image/fetch/s--LaqH_xzc--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wmhc1lvw6pvjgisaodi3.png)

#### Use rebase instead of merge to get last changes from main branch 
```shell
git checkout branch-name
git rebase main
```

#### If there are any merge conflicts, then fix them and write
```shell
git rebase --continue
```

### TODO and FIXME comments
```typescript
// TODO: [firstname_secondname] necessary actions
```
