#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import prompts from "prompts";
import degit from "degit";
import chalk from "chalk";

(async () => {
  try {
    console.log(chalk.cyan("🚀 Create My Next App"));

    const { projectName } = await prompts({
      type: "text",
      name: "projectName",
      message: "Project name?",
      initial: "my-next-project",
    });

    if (!projectName) {
      console.log(chalk.red("❌ Project name is required"));
      process.exit(1);
    }

    const targetDir = path.resolve(process.cwd(), projectName);

    // Check if directory already exists
    if (fs.existsSync(targetDir)) {
      console.log(chalk.red(`❌ Directory ${projectName} already exists`));
      process.exit(1);
    }

    // 1. Copy template
    console.log(chalk.yellow("📦 Getting things ready..."));
    const emitter = degit("iforddow/direct-next");
    await emitter.clone(targetDir);

    // 2. Install dependencies
    console.log(chalk.yellow("📥 Installing dependencies..."));
    execSync("npm install", { cwd: targetDir, stdio: "inherit" });

    console.log(chalk.green(`✅ Done! cd ${projectName} && npm run dev`));
  } catch (error) {
    console.error(chalk.red("❌ An error occurred:"), error.message);
    process.exit(1);
  }
})();
