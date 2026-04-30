<div align="center">
    <h1 align="center">decap-cms-oauth-astro</h1>
    <p align="center">Astro integration for <a href="https://decapcms.org" target="_blank">Decap</a> CMS with custom OAuth backend</p>
    <br/>
</div>

<p align="center">
    <a href="https://npmjs.com/package/decap-cms-oauth-astro">
        <img src="https://img.shields.io/npm/v/decap-cms-oauth-astro" alt="decap-cms-oauth-astro" />
    </a>
    <a href="https://npmjs.com/package/decap-cms-oauth-astro">
        <img src="https://img.shields.io/npm/dt/decap-cms-oauth-astro" alt="npm download count">
    </a>
</p>

A integration plugin that mounts the Decap CMS (or any compatible CMS like Sveltia) admin dashboard and custom OAuth authentication backend routes to `/oauth`&`/oauth/callback` using GitHub as the provider.


## Installation

```bash
npx astro add decap-cms-oauth-astro
```


## Usage

0. By default, the integration looks for the Decap CMS configuration at `public/admin/config.yml`. You can customize this path using the `configPath` option inside `astro.config.mjs`
    ```js
    decapCmsOauth({
        configPath: "./.decap.yml" // Path relative to project root
    })
    ```

1. Configurate your .yml file (see [Decap CMS Docs](https://decapcms.org/docs/add-to-your-site/#configuration) for more info)
    ```yml
    backend:
        name: github
        repo: Foxie-404/decap-cms-oauth-astro # change this to your repo
        branch: main # change this to your branch
        site_domain: decap-cms-oauth-astro.vercel.app # change this to your domain
        base_url: https://decap-cms-oauth-astro.vercel.app # change this to your prod URL
        auth_endpoint: oauth # the oauth route provided by the integration
    ```

2. On GitHub, go to Settings > Developer Settings > OAuth apps > New OAuth app. Or use this [direct link](https://github.com/settings/applications/new).
    **Homepage URL**: This must be the prod URL of your application.
    **Authorization callback URL**: This must be the prod URL of your application followed by `/oauth/callback`.
    **Homepage URL**: This must be the prod URL of your application.
    **Authorization callback URL**: This must be the prod URL of your application followed by `/oauth/callback`.
    Once registered, click on the **Generate a new client secret** button. The app’s **Client ID** and **Client Secret** will be displayed.
    Then navigate to `https://github.com/apps/<app slug>/installations/new` to install it on the repo. You can scope the access tokens further if wanted - details on [this page](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app#using-the-web-application-flow-to-generate-a-user-access-token)
    ```bash
    curl -s 'https://api.github.com/repos/<owner>/<repo>' | jq .id
    ```

    You can then use this ID for the `OAUTH_GITHUB_REPO_ID` environment variable.

3. Set env variables
    ```bash
    # GitHub OAuth App & GitHub App
    OAUTH_GITHUB_CLIENT_ID=
    OAUTH_GITHUB_CLIENT_SECRET=
    # GitHub App only
    OAUTH_GITHUB_REPO_ID=
    ```


## Whitelist and Validation

To ensure compatibility and security, only official Decap CMS fields are allowed in the configuration. These include: `backend`, `site_url`, `display_url`, `logo`, `logo_url`, `media_folder`, `public_folder`, `collections`, `publish_mode`, `show_preview_links`, `slug`, `local_backend`, `i18n`, `media_library`, `editor`, `search`, `locale`.

The fields `backend` and `collections` are **required**. If they are missing or if the configuration file is invalid, the integration will throw an error to terminate the build process.


## Acknowledgements

- [astro-decap-cms-oauth](dorukgezici/astro-decap-cms-oauth)
- [Decap CMS](https://decapcms.org/)