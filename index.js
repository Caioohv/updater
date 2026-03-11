const gitUtils = require("./app/git-utils");

async function main() {
  const args = process.argv;

  for (arg of args) {
    if (arg == "push") await gitUtils.updateAll();

    if (arg == "pull") await gitUtils.pullAll();
  }
}

main();
