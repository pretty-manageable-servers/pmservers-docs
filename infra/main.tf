resource "cloudflare_pages_project" "docs" {
  account_id        = var.account_id
  name              = var.project_name
  production_branch = var.production_branch

  build_config = {
    build_command   = "pnpm build"
    destination_dir = "dist"
  }

  # Git-connected source. Cloudflare builds on push.
  # The Cloudflare GitHub app must be installed on the repository first.
  source = {
    type = "github"
    config = {
      owner                          = var.github_owner
      repo_name                      = var.github_repo_name
      production_branch              = var.production_branch
      production_deployments_enabled = true
      preview_deployment_setting     = "all"
      pr_comments_enabled            = true
    }
  }

  # Astro needs Node 22.12 or later.
  deployment_configs = {
    production = { env_vars = { NODE_VERSION = { type = "plain_text", value = "22" } } }
    preview    = { env_vars = { NODE_VERSION = { type = "plain_text", value = "22" } } }
  }
}

# The zone is shared. The infra repo owns it. Here we only read it.
data "cloudflare_zone" "main" {
  filter = {
    name = var.zone_name
  }
}

resource "cloudflare_pages_domain" "docs" {
  account_id   = var.account_id
  project_name = cloudflare_pages_project.docs.name
  name         = var.domain
}

# Pages does not create the DNS record when you use the API.
resource "cloudflare_dns_record" "docs" {
  zone_id = data.cloudflare_zone.main.zone_id
  name    = var.domain
  type    = "CNAME"
  content = cloudflare_pages_project.docs.subdomain
  proxied = true
  ttl     = 1
}
