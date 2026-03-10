const git = require("simple-git");

const homedir = "/home/viier";

async function main() {
  const repo = await git({ baseDir: `${homedir}/notes`, binary: "git" });

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
    await repo.commit("[UPDATER] auto commit", filesToUpdate);
  }

  await repo.push("origin", status.current);
}

main();
