const git = require("simple-git");

async function addCommitAndPush(
  path = "/home/viier/notes",
  commitMessage = "[UPDATER] Auto Commit",
) {
  try {
    const pathslices = path.split("/");
    const reponame = pathslices[pathslices.length - 1];
    console.log(" - auto updating repo " + reponame);

    const repo = await git({ baseDir: path, binary: "git" });
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
      console.log(`   commiting ${filesToUpdate.length} files and pushing`);
      await repo.add(filesToUpdate);
      await repo.commit(commitMessage, filesToUpdate);
    } else {
      console.log("   nothing committed, pushing anyway");
    }

    await repo.push("origin", status.current);
  } catch (err) {
    console.log(
      "   something went wrong with the repo " + path + ", may not be a repo",
    );
    // console.warn(err);
  }
}

module.exports = addCommitAndPush;
