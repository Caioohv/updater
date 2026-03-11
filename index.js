const gitUtils = require("./app/git-utils");

async function main() {
  await gitUtils.updateAll();
}

main();
