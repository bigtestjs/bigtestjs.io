# Adds helpers for formatting content
class FormattingHelpers < Middleman::Extension
  # ensures the last n words are not widowed
  def self.no_widow(text, count = 2)
    return unless text
    words = text.split(%r{ (?=[^>]*?(?:<|$))}m)
    return text unless words.length > 1
    beginwords = words[0, words.length - count].join(' ')
    endwords = words[0 - count, count].join('&nbsp;')
    "#{beginwords} #{endwords}"
  end

  # .erb formatting helpers
  helpers do
    def markdown(text)
      return unless text
      Kramdown::Document
        .new(text, config[:markdown]).to_html
        .gsub(%r{(<(p|li)>)(\X*?)(</\2>)}) { $1 + no_widow($3) + $4 }
    end

    def inline_md(text)
      return unless text
      md_conf = config[:markdown].merge(input: 'Spandown')
      no_widow Kramdown::Document.new(text, md_conf).to_html
    end

    def no_widow(*args)
      FormattingHelpers.no_widow(*args)
    end
  end

  # Custom tilt template
  class KramdownTemplate < ::Tilt::KramdownTemplate
    def initialize(*args, &block)
      super
      @context = @options[:context] if @options.key?(:context)
    end

    def evaluate(context, *)
      Kramdown::Converter::Custom.scope = @context || context

      @output ||= begin
        output, warnings = Kramdown::Converter::Custom.convert(@engine.root, @engine.options)
        @engine.warnings.concat(warnings)
        output
      end
    end
  end
end

module Kramdown
  module Parser
    # Kramdown parser for span level tags only
    class Spandown < GFM
      def initialize(source, options)
        super
        @block_parsers = []
      end
    end
  end

  module Converter
    # Kramdown converter that prevents widows
    class Custom < Html
      cattr_accessor :scope

      def convert_p(el, indent)
        content = FormattingHelpers.no_widow inner(el, indent)

        if el.options[:transparent]
          content
        else
          format_as_block_html(el.type, el.attr, content, indent)
        end
      end
    end
  end
end

Middleman::Extensions.register(:formatting_helpers, FormattingHelpers)
