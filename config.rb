require './lib/formatting_helpers'
require './lib/api_docs'

# Activate and configure extensions
activate :directory_indexes
activate :formatting_helpers
activate :api_docs, packages: {
  'convergence' => '@bigtest/convergence',
  'interactor' => '@bigtest/interactor',
  'react' => '@bigtest/react'
}

activate :autoprefixer do |prefix|
  prefix.browsers = 'last 2 versions'
end

set :markdown,
  fenced_code_blocks: true,
  input: 'GFM',
  hard_wrap: false

# Dev-specific config
configure :development do
  activate :livereload
end

# Build-specific config
configure :build do
  activate :minify_css
  activate :minify_javascript
end

# Pages
page '/docs/*', layout: 'doc'
page '/guides/*', layout: 'guide'

# JS & CSS will compile with rollup
ignore '/javascripts/*'
ignore '/stylesheets/*'

# API Docs
data.docs.each do |data|
  proxy "/docs/#{data.name}/index.html", 'doc.html', locals: data, ignore: true
end

# JS & CSS pipeline
activate :external_pipeline,
  name: :js_css,
  command: "yarn #{build? ? 'build' : 'start'}",
  source: './tmp',
  latency: 2

# Misc helpers
helpers do
  def link_active?(url)
    return false unless url
    url = url[1..-1] if url[0] == '/'
    current_page.path.start_with?(url)
  end

  def active_link_to(text, url, match = url)
    opts = { class: [] }
    opts[:class] << 'is-active' if link_active?(match)
    opts[:class] = opts[:class].join(' ')
    link_to(text, url, opts)
  end
end
