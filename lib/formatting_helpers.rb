# Adds helpers for formatting content
class FormattingHelpers < Middleman::Extension
  helpers do
    def markdown(text)
      Kramdown::Document.new(text, config[:markdown]).to_html if text
    end

    def inline_md(text)
      md_conf = config[:markdown].merge(input: 'Spandown')
      Kramdown::Document.new(text, md_conf).to_html if text
    end

    # ensures the last n words are not widowed
    def no_widow(text, count = 2)
      return unless text
      words = text.split(' ')
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
