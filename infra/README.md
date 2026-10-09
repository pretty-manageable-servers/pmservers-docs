# Docs infrastructure

OpenTofu config for docs.pmservers.org on Cloudflare Pages.
Cloudflare builds the site from GitHub on each push to `main`. Other branches get preview URLs.

The infra repo owns shared resources, such as the `pmservers.org` zone and the R2 state bucket.
This config only reads the zone.

## Before you start

1. Install the Cloudflare Pages GitHub app on `pretty-manageable-servers/pmservers-docs`.
2. Make sure the `pmservers.org` zone exists in Cloudflare.
3. Make sure the R2 state bucket exists.
4. Create a Cloudflare API token with these permissions:
   - Account: Cloudflare Pages: Edit
   - Zone: Zone: Read
   - Zone: DNS: Edit
5. Create an R2 API token for the state bucket.

## Run

```sh
cp backend.hcl.example backend.hcl
cp terraform.tfvars.example terraform.tfvars
# Fill in both files.

export AWS_ACCESS_KEY_ID=<R2 access key ID>
export AWS_SECRET_ACCESS_KEY=<R2 secret access key>
export TF_VAR_cloudflare_api_token=<Cloudflare API token>

tofu init -backend-config=backend.hcl
tofu plan
tofu apply
```

A new Pages project has no build until the first push to `main`, or a manual deployment.
