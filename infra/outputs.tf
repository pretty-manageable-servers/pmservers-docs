output "pages_subdomain" {
  description = "The pages.dev subdomain of the project."
  value       = cloudflare_pages_project.docs.subdomain
}

output "url" {
  description = "The site URL."
  value       = "https://${var.domain}"
}
