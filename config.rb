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

# Dev-specific config
configure :development do
  activate :livereload
end

# Build-specific config
configure :build do
  activate :minify_css
  activate :minify_javascript
end

# API Docs
Dir.glob('./node_modules/@bigtest/*').each do |path|
  pkg = JSON.parse(File.read("#{path}/package.json"), object_class: OpenStruct)
  docs = JSON.parse(File.read("#{path}/docs/data.json"), object_class: OpenStruct)

  url_path = pkg.name.gsub(%r{@bigtest/(.*)}, '/docs/\1.html')
  proxy url_path, 'api-doc.html', locals: { pkg: pkg, docs: docs }, ignore: true
end

# Kramdown parser for span level tags only
class Kramdown::Parser::Spandown < Kramdown::Parser::GFM
  def initialize(source, options)
    super
    @block_parsers = []
  end
end

# Helpers
helpers do
  def markdown(text)
    Kramdown::Document.new(text, config[:markdown]).to_html if text
  end

  def markdown_inline(text)
    md_conf = config[:markdown].merge(input: 'Spandown')
    Kramdown::Document.new(text, md_conf).to_html if text
  end
end
