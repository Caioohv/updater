const fs = require("fs");

const committer = require("./committer");
const checker = require("./checker");

const { toUpdate, toCheckInside } = require("./settings");

async function checkEverythingInside() {
  let reposThatNeedCheck = [];
  for (elem of toCheckInside) {
    const folders = await fs.readdirSync(elem);
    for (folder of folders) {
      let needCheck = await checker(`${elem}/${folder}`);
      if (needCheck)
        reposThatNeedCheck.push(
          `${elem}/${folder} - \x1b[34m${needCheck} files\x1b[0m`,
        );
    }
  }

  console.log("=========== need check: ===========");
  reposThatNeedCheck.forEach((elem) => console.log(elem));
}

async function autoCommit() {
  console.log(" [UPDATER] Starting auto commit");
  for (elem of toUpdate) {
    await committer(elem);
  }
}

async function updateAll() {
  await this.autoCommit();
  await this.checkEverythingInside();
}

module.exports = {
  autoCommit,
  checkEverythingInside,
  updateAll,
  //todo: auto pull
};
