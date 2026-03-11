const git = require("simple-git");

async function pullFrom(path = "/home/viier/notes") {
  const pathslices = path.split("/");
  const reponame = pathslices[pathslices.length - 1];
  try {
    // console.log(" - exec pull on repo " + reponame);

    const repo = await git({ baseDir: path, binary: "git" });

    const pull = await repo.pull();
    return pull.summary.changes;
  } catch (err) {
    console.log(`   ${reponame} may not be a repo`);
  }
  return false;
}

module.exports = pullFrom;
