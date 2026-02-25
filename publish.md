# Publishing Guide: @mhiliger Auth Libraries

This document outlines the process for publishing updates to the `@mhiliger/auth-be` and `@mhiliger/auth-fe` libraries to the NPM registry.

## Prerequisites

1.  **NPM Account**: You must have an account on [npmjs.com](https://www.npmjs.com/) with access to the `@mhiliger` scope.
2.  **Login**: Ensure you are logged into the registry via CLI:
    ```bash
    npm login
    ```
3.  **Clean State**: Ensure all changes are committed to Git before starting the publishing process.

---

## 1. Publishing @mhiliger/auth-be (Backend)

The backend library currently distributes raw JavaScript from the `src/` directory.

### Steps:
1.  **Navigate to the package**:
    ```bash
    cd packages/auth-be
    ```
2.  **Update the version**:
    Choose the appropriate semantic version bump (patch, minor, or major).
    ```bash
    npm version patch
    ```
3.  **Publish to NPM**:
    ```bash
    npm publish --access public
    ```

---

## 2. Publishing @mhiliger/auth-fe (Frontend)

The frontend library must be bundled using Vite before publishing.

### Steps:
1.  **Navigate to the package**:
    ```bash
    cd packages/auth-fe
    ```
2.  **Update the version**:
    ```bash
    npm version patch
    ```
3.  **Build the package**:
    This step generates the `dist/` folder required for distribution.
    ```bash
    npm run build
    ```
4.  **Publish to NPM**:
    ```bash
    npm publish --access public
    ```

---

## 3. Alternative: Publishing via Workspaces

From the **root** directory, you can manage both packages using npm workspace commands.

### Backend:
```bash
# Update version
npm version patch -w @mhiliger/auth-be

# Publish
npm publish -w @mhiliger/auth-be --access public
```

### Frontend:
```bash
# Update version
npm version patch -w @mhiliger/auth-fe

# Build (Required)
npm run build -w @mhiliger/auth-fe

# Publish
npm publish -w @mhiliger/auth-fe --access public
```

---

## 4. Post-Publishing

After publishing, the libraries are available for installation in external projects:

```bash
npm install @mhiliger/auth-be
# or
npm install @mhiliger/auth-fe
```

### Local Application Note
The applications in this monorepo (`Login-BE` and `Login-FE`) currently use `file:` links to point to the local source code. They do **not** need to be updated to use the npm version unless you wish to test the published package behavior specifically.
