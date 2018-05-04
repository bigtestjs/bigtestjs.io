# Adds helpers for formatting content
class FormattingHelpers < Middleman::Extension
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

    # ensures the last n words are not widowed
    def no_widow(text, count = 2)
      return unless text
      words = text.split(' ')
      return text unless words.length > 1
      beginwords = words[0, words.length - count].join(' ')
      endwords = words[0 - count, count].join('&nbsp;')
      "#{beginwords} #{endwords}"
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
end

Middleman::Extensions.register(:formatting_helpers, FormattingHelpers)
