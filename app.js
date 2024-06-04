#! /usr/bin/env node
import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import fs from "fs";
import { passwordStrength } from "./utils/passwordStrength.js";
import { generatePassword } from "./utils/generatePassword.js";

let userName;
let password;

async function welcome() {
  console.log(
    chalk.rgb(255, 0, 0).bold(figlet.textSync("Password Generation"))
  );
  console.log(chalk.yellow("This is a password generation Command line tool!\n"));
  console.log(chalk.bgBlue("Strong password contain:- number, mixed alphabet & symbol"));
  console.log(
    chalk.yellow(
      "PS:-Create a strong password."
    )
  );
  console.log(chalk.yellow("To create password choose the option!\n"));
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "userName",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });
  userName = answers.userName;
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "case",
    type: "list",
    message: "Choose the case:",
    choices: ["lowerCase", "upperCase", "mixed"],
  });
  return answers.case;
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "length",
    type: "list",
    message: "Choose the length:",
    choices: ["8", "10", "12", "14"],
  });
  return parseInt(answers.length);
}

async function question3() {
  const answers = await inquirer.prompt({
    name: "format",
    type: "list",
    message: "Choose the output format:",
    choices: ["plain", "masked"],
  });
  return answers.format;
}

async function question4() {
  const answers = await inquirer.prompt({
    name: "special",
    type: "list",
    message: "Include special symbols?",
    choices: ["yes", "no"],
  });
  return answers.special;
}

async function question5() {
  const answers = await inquirer.prompt({
    name: "number",
    type: "list",
    message: "Include numbers?",
    choices: ["yes", "no"],
  });
  return answers.number;
}

async function getPassword() {
  const caseType = await question1();
  const length = await question2();
  const format = await question3();
  const special = await question4();
  const number = await question5();

  password = generatePassword({ caseType, length, special, number });
  if (format === "masked") {
    savePasswordToFile(password);
    let strength = passwordStrength(password);
    printStrength(strength);
    password = "*".repeat(length);
    return;
  }
  let strength = passwordStrength(password);
  savePasswordToFile(password);
  printStrength(strength);
}
function printStrength(strength) {
  if (strength <= 50) {
    console.log(chalk.red(`password is  week = ${strength}`));
  } else if (strength > 50 && strength <= 75) {
    console.log(chalk.yellow(`password strength is good = ${strength}`));
  } else {
    console.log(chalk.green(`passowrd is strong = ${strength}`));
  }
}



function savePasswordToFile(password) {
  // const fileName = `${userName}_password.txt`;
  const fileName = `password.txt`;
  const currentTime = new Date().toLocaleString();
  const userData  = `${userName}, ${password}, ${currentTime} \n`;
  fs.appendFileSync(fileName, userData);
  console.log(`Password saved to file: ${fileName}`);
}

async function run() {
  await welcome();
  await askName();
  await getPassword();
  console.log(`\nGenerated Password for ${userName}: ${password}\n`);
}

run();
