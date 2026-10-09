variable "cloudflare_api_token" {
  description = "Cloudflare API token. Needs Account: Cloudflare Pages Edit, Zone: Zone Read, Zone: DNS Edit."
  type        = string
  sensitive   = true
}

variable "account_id" {
  description = "Cloudflare account ID."
  type        = string
}

variable "project_name" {
  description = "Cloudflare Pages project name."
  type        = string
  default     = "pmservers-docs"
}

variable "production_branch" {
  description = "Git branch for production deploys."
  type        = string
  default     = "main"
}

variable "github_owner" {
  description = "GitHub user or organization that owns the repository."
  type        = string
  default     = "pretty-manageable-servers"
}

variable "github_repo_name" {
  description = "GitHub repository name."
  type        = string
  default     = "pmservers-docs"
}

variable "zone_name" {
  description = "Cloudflare zone that holds the domain. The infra repo owns this zone."
  type        = string
  default     = "pmservers.org"
}

variable "domain" {
  description = "Custom domain for the site."
  type        = string
  default     = "docs.pmservers.org"
}
