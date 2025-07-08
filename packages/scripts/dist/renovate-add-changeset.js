#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";

//#region src/helper.ts
const workspaceRoot = path.join(import.meta.dirname, "..", "..", "..");
const changesetFolder = path.join(workspaceRoot, ".changeset");
function assertNotNil(data, message = `Data was nil`, assertionContext) {
	if (data == void 0) {
		assertionContext ??= {
			actualValue: data,
			expectedValue: "Not null and not undefined"
		};
		throw new Error(message, { cause: assertionContext });
	}
}

//#endregion
//#region src/renovate-add-changeset.ts
function makeStringSafe(value) {
	return value.replaceAll("/", "_").replaceAll("@", "_").replaceAll(".", "_");
}
const { values } = parseArgs({
	allowNegative: false,
	allowPositionals: false,
	strict: true,
	options: {
		currentVersion: { type: "string" },
		newVersion: { type: "string" },
		depName: { type: "string" },
		depType: { type: "string" },
		packageFile: { type: "string" },
		manager: { type: "string" },
		updateType: { type: "string" }
	}
});
const { currentVersion, newVersion, depName, depType, packageFile, manager, updateType } = values;
assertNotNil(packageFile);
assertNotNil(currentVersion);
assertNotNil(depName);
assertNotNil(depType);
assertNotNil(newVersion);
assertNotNil(manager);
function getPackageName(packageFile$1) {
	if (manager === "github-actions") return "@repo/changelog";
	if (!packageFile$1.endsWith("json")) return "@repo/changelog";
	const packageJson = JSON.parse(readFileSync(path.join(workspaceRoot, packageFile$1)).toString());
	const temporaryPackageName = packageJson.name;
	if (temporaryPackageName === void 0) process.exit(0);
	return temporaryPackageName === "@repo/root" ? "@repo/changelog" : temporaryPackageName;
}
const packageName = getPackageName(packageFile);
const packageNameSafe = makeStringSafe(packageName);
if (updateType === "lockFileMaintenance") {
	const content$1 = `---
'${packageName}': patch
---

deps: Updated lockfile
`;
	writeFileSync(path.join(changesetFolder, `zz-deps_${packageNameSafe}-lockFileUpdate-${Date.now()}.md`), content$1);
	process.exit(0);
}
const content = `---
'${packageName}': patch
---

deps: [${updateType}|${depType}] Update package ${depName} from ${currentVersion} to ${newVersion}
`;
writeFileSync(path.join(changesetFolder, `zz-deps-${packageNameSafe}-${makeStringSafe(depName)}-${makeStringSafe(currentVersion)}-${makeStringSafe(newVersion)}.md`), content);

//#endregion