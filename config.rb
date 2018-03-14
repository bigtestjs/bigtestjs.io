# Activate and configure extensions
activate :autoprefixer do |prefix|
  prefix.browsers = 'last 2 versions'
end

set :markdown_engine, :kramdown
set :markdown,
  fenced_code_blocks: true,
  input: 'GFM',
  hard_wrap: false

# Layouts
page '/docs/*', layout: 'docs'

# Proxy pages

# Helpers
# helpers do
#   def some_helper
#     'Helping'
#   end
# end

# Dev-specific config
configure :development do
  activate :livereload
end

# Build-specific config
configure :build do
  activate :minify_css
  activate :minify_javascript
end
