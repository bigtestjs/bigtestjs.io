# Adds bigtest docs to middleman's data
class APIDocs < Middleman::Extension
  option :packages, [], 'Package names to find documentation data for'

  def initialize(app, config = {}, &block)
    super
    update_docs options[:packages]
    app.data.callbacks(:docs, proc { @docs })
  end

  helpers do
    def doc_classes(doc)
      classnames = ['doc']
      classnames << 'doc--class' if doc.kind == 'class'
      classnames << 'doc--function' if doc.kind == 'function'
      classnames << 'doc--member' if doc.memberof
      classnames << 'is-private' if doc.private
      classnames << 'is-static' if doc.scope == 'static'
      classnames.join(' ')
    end
  end

  private

  def update_docs(packages)
    @docs = packages.flat_map do |name, package = name|
      {
        name: name,
        pkg: get_pkg(package),
        docs: get_docs(package),
        title: "API Docs | #{name.capitalize}"
      }
    end
  end

  def get_pkg(name)
    json = File.read("./node_modules/#{name}/package.json")
    JSON.parse json, object_class: OpenStruct
  end

  def get_docs(name)
    json = File.read("./node_modules/#{name}/docs/data.json")
    JSON.parse json, object_class: OpenStruct
  end
end

Middleman::Extensions.register(:api_docs, APIDocs)
