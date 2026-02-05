# Migration Guide: Publishing Auth Libraries to NPM

This document outlines the steps required to transition the local `@your-org/auth-be` and `@your-org/auth-fe` packages from the current monorepo structure to independent, versioned NPM libraries.

## 1. Build System Implementation
Currently, the libraries are served as raw source. For production distribution, they should be bundled.

### Backend (`auth-be`)
1.  Navigate to `packages/auth-be`.
2.  Install a bundler (e.g., `tsup`): `npm install tsup --save-dev`.
3.  Add build scripts to `package.json`:
    ```json
    "scripts": {
      "build": "tsup src/index.js --format cjs,esm --dts --clean",
      "dev": "tsup src/index.js --format cjs,esm --watch --dts"
    }
    ```

### Frontend (`auth-fe`)
1.  Navigate to `packages/auth-fe`.
2.  Install a bundler (e.g., `microbundle` or `tsup`): `npm install tsup --save-dev`.
3.  Ensure JSX support is configured for `.jsx` files.
4.  Add build scripts to `package.json`:
    ```json
    "scripts": {
      "build": "tsup src/index.js --format esm,cjs --dts --clean --minify --target esnext",
      "dev": "tsup src/index.js --format esm,cjs --watch --dts"
    }
    ```

## 2. Peer Dependency Management
To avoid "Duplicate React" errors or version conflicts in host applications, ensure core libraries are listed as `peerDependencies`.

-   **auth-be**: `express` should be a peer dependency.
-   **auth-fe**: `react`, `react-dom`, `react-router-dom`, `axios`, and `@tanstack/react-query` must be peer dependencies.

## 3. Package Metadata Update
Update the `package.json` for both libraries:
-   **Version**: Start with `1.0.0`.
-   **Exports**:
    ```json
    "main": "./dist/index.js",
    "module": "./dist/index.mjs",
    "types": "./dist/index.d.ts",
    "files": ["dist"]
    ```
-   **Repository**: Link to your private GitHub repository.

## 4. Registry Configuration
If using GitHub Packages, create a `.npmrc` file in each package root:
```text
@your-org:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

## 5. Publishing Process
1.  Login to your registry: `npm login --scope=@your-org`.
2.  Run the build: `npm run build`.
3.  Publish: `npm publish --access restricted`.

## 6. Updating the Main Application
Once published, update the `Login-BE/package.json` and `Login-FE/package.json`:
-   Remove `"@your-org/auth-be": "file:../packages/auth-be"`.
-   Add `"@your-org/auth-be": "^1.0.0"`.
-   Run `npm install` to fetch from the registry.
