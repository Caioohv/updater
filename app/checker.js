const git = require("simple-git");

async function checkStatus(path = "/home/viier/notes") {
  const pathslices = path.split("/");
  const reponame = pathslices[pathslices.length - 1];
  try {
    console.log(" - getting status on repo " + reponame);

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
      console.log(
        `   \x1b[34mpending ${filesToUpdate.length} files here\x1b[0m\n`,
      );
      return filesToUpdate.length;
    } else {
      console.log("   nothing pending here");
    }
  } catch (err) {
    console.log(`   ${reponame} may not be a repo`);
  }
  return false;
}

module.exports = checkStatus;
