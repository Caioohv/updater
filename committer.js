const git = require("simple-git");

async function addCommitAndPush(
  repoName = "notes",
  path = "/home/viier",
  commitMessage = "[UPDATER] Auto Commit",
) {
  const repo = await git({ baseDir: `${path}/${repoName}`, binary: "git" });

  const status = await repo.status();

  const filesThatiShouldIgnore = [".obsidian/workspace.json"];

  const modifiedFiles = status.modified;
  const unstagedFiles = status.not_added;

  const filesToUpdate = modifiedFiles.filter(
    (elem) => filesThatiShouldIgnore.indexOf(elem) == -1,
  );

  unstagedFiles
    .filter((elem) => filesThatiShouldIgnore.indexOf(elem) == -1)
    .forEach((elem) => filesToUpdate.push(elem));

  if (filesToUpdate.length > 0) {
    await repo.add(filesToUpdate);
    await repo.commit(commitMessage, filesToUpdate);
  }

  await repo.push("origin", status.current);
}

module.exports = addCommitAndPush;
